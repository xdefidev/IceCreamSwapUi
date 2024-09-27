import { getFarmsPriceHelperLpFiles } from '@pancakeswap/farms'
import { ChainId } from '@pancakeswap/sdk'
import PoolsBitgertPriceHelper from './pools/32520'
import PoolsCorePriceHelper from './pools/1116'
import PoolsNeonPriceHelper from './pools/245022934'

export { getFarmsPriceHelperLpFiles }

export const getPoolsPriceHelperLpFiles = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.BITGERT:
      return PoolsBitgertPriceHelper
    case ChainId.CORE:
      return PoolsCorePriceHelper
    case ChainId.NEON:
      return PoolsNeonPriceHelper
    default:
      return []
  }
}
