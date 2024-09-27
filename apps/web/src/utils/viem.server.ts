import { ChainId } from '@pancakeswap/sdk'
import { OnChainProvider } from '@pancakeswap/smart-router/evm'
import { CHAINS } from 'config/chains'
import { createPublicClient, fallback, http, PublicClient } from 'viem'

export const viemServerClients = CHAINS.reduce((prev, cur) => {
  return {
    ...prev,
    [cur.id]: createPublicClient({
      chain: cur,
      transport: fallback(
        cur.rpcUrls.default.http.map((url) =>
          http(url, {
            timeout: 15_000,
          }),
        ),
      ),
      batch: {
        multicall: {
          batchSize: 1024 * 200,
        },
      },
    }),
  }
}, {} as Record<ChainId, PublicClient>)

export const getViemClients: OnChainProvider = ({ chainId }: { chainId?: ChainId }) => {
  return viemServerClients[chainId]
}
