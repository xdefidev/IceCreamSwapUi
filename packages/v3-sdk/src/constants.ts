import { ChainId } from '@pancakeswap/sdk'
import { Address, Hash } from 'viem'

const FACTORY_ADDRESS = '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865'

/**
 * To compute Pool address use DEPLOYER_ADDRESSES instead
 */
export const FACTORY_ADDRESSES = {
} as const satisfies Record<ChainId, Address>

const DEPLOYER_ADDRESS = '0x41ff9AA7e16B8B1a8a8dc4f0eFacd93D02d071c9'

export const DEPLOYER_ADDRESSES = {
  [ChainId.CORE]: '0xF9f83b79ca3A623da98ad431A52Aa42eD0f3d5Ef',
} as const satisfies Record<ChainId, Address>

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

const POOL_INIT_CODE_HASH = '0x0c6b99bf88dc3398a8573e3192de0eb19c858afd9ac36e33030e16c4f569e598'

export const POOL_INIT_CODE_HASHES = {
  [ChainId.CORE]: POOL_INIT_CODE_HASH,
} as const satisfies Record<ChainId, Hash>

/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export enum FeeAmount {
  LOWEST = 1000,
  LOW = 3000,
  MEDIUM = 10000,
  HIGH = 50000,
}

/**
 * The default factory tick spacings by fee amount.
 */
export const TICK_SPACINGS: { [amount in FeeAmount]: number } = {
  [FeeAmount.LOWEST]: 20,
  [FeeAmount.LOW]: 60,
  [FeeAmount.MEDIUM]: 200,
  [FeeAmount.HIGH]: 1000,
}
