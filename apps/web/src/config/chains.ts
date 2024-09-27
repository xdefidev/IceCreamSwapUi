import { ChainId } from '@pancakeswap/sdk'
import memoize from 'lodash/memoize'
import invert from 'lodash/invert'
import { chains } from '@icecreamswap/constants'

export const CHAIN_QUERY_NAME: Record<number, string> = chains
  .reduce((acc, chain) => {
    const queryNames = acc
    queryNames[chain.id] = chain.network
    return queryNames
  }, {} as Record<number, string>)

const CHAIN_QUERY_NAME_TO_ID = invert(CHAIN_QUERY_NAME)

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined
  return CHAIN_QUERY_NAME_TO_ID[chainName] ? +CHAIN_QUERY_NAME_TO_ID[chainName] : undefined
})

export const L2_CHAIN_IDS: ChainId[] = []

export const CHAINS = chains