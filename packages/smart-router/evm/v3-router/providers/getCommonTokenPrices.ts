import { ChainId, Currency, Token } from '@pancakeswap/sdk'
import { gql } from 'graphql-request'
import { getAddress, Address } from 'viem'

import { getCheckAgainstBaseTokens } from '../functions'
import { SubgraphProvider } from '../types'
import { CHAIN_ID_TO_CHAIN_NAME } from '../../constants'
import { withFallback } from '../../utils/withFallback'

const tokenPriceQuery = gql`
  query getTokens($pageSize: Int!, $tokenAddrs: [ID!]) {
    tokens(first: $pageSize, where: { id_in: $tokenAddrs }) {
      id
      derivedUSD
    }
  }
`

export type GetCommonTokenPricesParams = {
  currencyA?: Currency
  currencyB?: Currency
}

interface BySubgraphEssentials {
  // V3 subgraph provider
  provider?: SubgraphProvider
}

type ParamsWithFallback = GetCommonTokenPricesParams & {
  v3SubgraphProvider?: SubgraphProvider
}

export type TokenUsdPrice = {
  address: string
  priceUSD: string
}

export type GetTokenPrices<T> = (params: { addresses: string[]; chainId?: ChainId } & T) => Promise<TokenUsdPrice[]>

export type CommonTokenPriceProvider<T> = (
  params: GetCommonTokenPricesParams & T,
) => Promise<Map<Address, number> | null>

export function createCommonTokenPriceProvider<T = any>(
  getTokenPrices: GetTokenPrices<T>,
): CommonTokenPriceProvider<T> {
  return async function getCommonTokenPrices({ currencyA, currencyB, ...rest }: GetCommonTokenPricesParams & T) {
    const baseTokens: Token[] = getCheckAgainstBaseTokens(currencyA, currencyB)
    if (!baseTokens) {
      return null
    }
    const map = new Map<Address, number>()
    const idToToken: { [key: string]: Currency } = {}
    const addresses = baseTokens.map((t) => {
      const address = getAddress(t.address)
      idToToken[address] = t
      return address
    })
    const tokenPrices = await getTokenPrices({ addresses, chainId: currencyA?.chainId, ...(rest as T) })
    for (const { address, priceUSD } of tokenPrices) {
      const token = idToToken[getAddress(address)]
      if (token) {
        map.set(token.wrapped.address, parseFloat(priceUSD) || 0)
      }
    }

    return map
  }
}

export const getTokenUsdPricesBySubgraph: GetTokenPrices<BySubgraphEssentials> = async ({
  addresses,
  chainId,
  provider,
}) => {
  const client = provider?.({ chainId })
  if (!client) {
    throw new Error('No valid subgraph data provider')
  }
  const { tokens: tokenPrices } = await client.request<{ tokens: { id: string; derivedUSD: string }[] }>(
    tokenPriceQuery,
    {
      pageSize: 1000,
      tokenAddrs: addresses.map((addr) => addr.toLocaleLowerCase()),
    },
  )
  return tokenPrices.map(({ id, derivedUSD }) => ({
    address: id,
    priceUSD: derivedUSD,
  }))
}

export const getCommonTokenPricesBySubgraph =
  createCommonTokenPriceProvider<BySubgraphEssentials>(getTokenUsdPricesBySubgraph)

const createGetTokenPriceFromLlmaWithCache = (): GetTokenPrices<BySubgraphEssentials> => {
  // Add cache in case we reach the rate limit of llma api
  const cache = new Map<string, TokenUsdPrice>()

  return async ({ addresses, chainId }) => {
    if (!chainId) {
      throw new Error(`Invalid chain id ${chainId}`)
    }
    const [cachedResults, addressesToFetch] = addresses.reduce<[TokenUsdPrice[], string[]]>(
      ([cachedAddrs, newAddrs], address) => {
        const cached = cache.get(address)
        if (!cached) {
          newAddrs.push(address)
        } else {
          cachedAddrs.push(cached)
        }
        return [cachedAddrs, newAddrs]
      },
      [[], []],
    )

    if (!addressesToFetch.length) {
      return cachedResults
    }

    const list = addressesToFetch
      .map(
        (address) =>
          `${address.toLocaleLowerCase()}`,
      )
      .join(',')
    const result: { [key: string]: string } = await fetch(
      `https://pricing.icecreamswap.com/${chainId}?token=${list}`,
    )
      .then((res) => res.json())
      .catch(reason => {
        console.warn("Error while getting token price", reason)
        return {}
      })

    return [
      ...cachedResults,
      ...Object.entries(result || {}).map(([key, value]) => {
        const address = key
        const tokenPrice = { address, priceUSD: value }
        cache.set(getAddress(address), tokenPrice)
        return tokenPrice
      }),
    ]
  }
}

export const getCommonTokenPricesByLlma = createCommonTokenPriceProvider<BySubgraphEssentials>(
  createGetTokenPriceFromLlmaWithCache(),
)

export const getCommonTokenPrices = withFallback([
  {
    asyncFn: ({ currencyA, currencyB }: ParamsWithFallback) => getCommonTokenPricesByLlma({ currencyA, currencyB }),
    timeout: 3000,
  },
  {
    asyncFn: ({ currencyA, currencyB, v3SubgraphProvider }: ParamsWithFallback) =>
      getCommonTokenPricesBySubgraph({ currencyA, currencyB, provider: v3SubgraphProvider }),
  },
])
