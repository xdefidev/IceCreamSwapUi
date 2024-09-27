import useSWR from 'swr'
import { ChainId } from '@pancakeswap/sdk'
import { fetchCProxyAddress } from 'state/farms/fetchFarmUser'
import { farmFetcher } from 'state/farms'
import { Address } from 'wagmi'

export const useFarmCProxyAddress = (account?: string, chainId?: number) => {
  const { data } = useSWR(account && chainId && ['cProxyAddress', account, chainId], async () =>
    fetchCProxyAddress(account as Address, chainId),
  )

  return {
    cProxyAddress: data,
  }
}
