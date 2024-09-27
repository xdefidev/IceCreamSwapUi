import { ChainId } from '@pancakeswap/sdk'

import { StableSwapPool } from './types'
import { pools as bscPools } from './56'

export type StableSwapPoolMap<TChainId extends number> = {
  [chainId in TChainId]: StableSwapPool[]
}

export const isStableSwapSupported = (chainId: number): chainId is StableSupportedChainId =>
  STABLE_SUPPORTED_CHAIN_IDS.includes(chainId)

export const STABLE_SUPPORTED_CHAIN_IDS: ReadonlyArray<ChainId> = [] as const // [ChainId.BSC]

export type StableSupportedChainId = (typeof STABLE_SUPPORTED_CHAIN_IDS)[number]

export const STABLE_POOL_MAP: {[p: number]: StableSwapPool[]} = {
  // [ChainId.BSC]: bscPools,
} satisfies StableSwapPoolMap<StableSupportedChainId>
