import { ChainMap, BatchMulticallConfigs } from '../types'
import { chains } from '@icecreamswap/constants'


const DEFAULT: BatchMulticallConfigs = {
  defaultConfig: {
    gasLimitPerCall: 1_000_000,
  },
  gasErrorFailureOverride: {
    gasLimitPerCall: 2_000_000,
  },
  successRateFailureOverrides: {
    gasLimitPerCall: 2_000_000,
  },
}

export const BATCH_MULTICALL_CONFIGS: ChainMap<BatchMulticallConfigs> = chains.reduce((acc, chain) => {
  return {...acc, [chain.id]: DEFAULT}
}, {})
