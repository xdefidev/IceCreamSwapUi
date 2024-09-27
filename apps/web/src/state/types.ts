import { parseEther } from 'viem'
import { SerializedFarmsState } from '@pancakeswap/farms'
import { SerializedPoolWithInfo } from '@pancakeswap/pools'
import { Address } from 'wagmi'
import BigNumber from 'bignumber.js'
import { Team } from 'config/constants/types'

export enum GAS_PRICE {
  default = '3',
  fast = '4',
  instant = '5',
  testnet = '10',
}

export const GAS_PRICE_GWEI = {
  rpcDefault: 'rpcDefault',
  default: parseEther(GAS_PRICE.default, 'gwei').toString(),
  fast: parseEther(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseEther(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseEther(GAS_PRICE.testnet, 'gwei').toString(),
}

export interface BigNumberToJson {
  type: 'BigNumber'
  hex: string
}

export type SerializedBigNumber = string

export enum VaultKey {
  CakeVaultV1 = 'cakeVaultV1',
  CakeVault = 'cakeVault',
  CakeFlexibleSideVault = 'cakeFlexibleSideVault',
  IfoPool = 'ifoPool',
}

export type SerializedPool = SerializedPoolWithInfo & {
  numberSecondsForUserLimit?: number
}

export interface Profile {
  userId: number
  points: number
  teamId: number
  collectionAddress: Address
  tokenId: number
  isActive: boolean
  username: string
  team?: Team
  hasRegistered: boolean
}

// Slices states
export interface SerializedVaultFees {
  performanceFee: number
  withdrawalFee: number
  withdrawalFeePeriod: number
}

export interface DeserializedVaultFees extends SerializedVaultFees {
  performanceFeeAsDecimal: number
}

export interface SerializedVaultUser {
  isLoading: boolean
  userShares: SerializedBigNumber
  cakeAtLastUserAction: SerializedBigNumber
  lastDepositedTime: string
  lastUserActionTime: string
}

export interface SerializedLockedVaultUser extends SerializedVaultUser {
  lockStartTime: string
  lockEndTime: string
  userBoostedShare: SerializedBigNumber
  locked: boolean
  lockedAmount: SerializedBigNumber
  currentPerformanceFee: SerializedBigNumber
  currentOverdueFee: SerializedBigNumber
}

export interface DeserializedVaultUser {
  isLoading: boolean
  userShares: BigNumber
  cakeAtLastUserAction: BigNumber
  lastDepositedTime: string
  lastUserActionTime: string
  lockedAmount: BigNumber
  balance: {
    cakeAsNumberBalance: number
    cakeAsBigNumber: BigNumber
    cakeAsDisplayBalance: string
  }
}

export interface DeserializedLockedVaultUser extends DeserializedVaultUser {
  lastDepositedTime: string
  lastUserActionTime: string
  lockStartTime: string
  lockEndTime: string
  burnStartTime: string
  userBoostedShare: BigNumber
  locked: boolean
  lockedAmount: BigNumber
  currentPerformanceFee: BigNumber
  currentOverdueFee: BigNumber
}

export interface DeserializedCakeVault {
  totalShares?: BigNumber
  totalLockedAmount?: BigNumber
  pricePerFullShare?: BigNumber
  totalCakeInVault?: BigNumber
  fees?: DeserializedVaultFees
  userData?: DeserializedVaultUser
}

export interface DeserializedLockedCakeVault extends Omit<DeserializedCakeVault, 'userData'> {
  totalLockedAmount?: BigNumber
  userData?: DeserializedLockedVaultUser
}

export interface SerializedLockedCakeVault extends Omit<SerializedCakeVault, 'userData'> {
  totalLockedAmount?: SerializedBigNumber
  userData?: SerializedLockedVaultUser
}

export interface SerializedCakeVault {
  totalShares?: SerializedBigNumber
  pricePerFullShare?: SerializedBigNumber
  totalCakeInVault?: SerializedBigNumber
  fees?: SerializedVaultFees
  userData?: SerializedVaultUser
}

// Ifo
export interface IfoState extends PublicIfoData {
  credit: string
}

export interface PublicIfoData {
  ceiling: string
}

export interface PoolsState {
  data: SerializedPool[]
  ifo: IfoState
  cakeVault: SerializedLockedCakeVault
  cakeFlexibleSideVault: SerializedCakeVault
  userDataLoaded: boolean
}

// Global state

export interface State {
  farms: SerializedFarmsState
  farmsV1: SerializedFarmsState
  pools: PoolsState
}
