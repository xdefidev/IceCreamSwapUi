import { FeeAmount } from '@pancakeswap/v3-sdk'
import { ZOOM_LEVELS, ZoomLevels } from '@pancakeswap/uikit'

export enum SELECTOR_TYPE {
  V3,
  STABLE,
  V2,
}

interface HandleFeePoolSelectArgs {
  type: SELECTOR_TYPE
  feeAmount?: FeeAmount
}

export const QUICK_ACTION_CONFIGS: Record<FeeAmount, { [percentage: number]: ZoomLevels }> = {
  [FeeAmount.LOWEST]: {
    1: {
      initialMin: 0.99,
      initialMax: 1.01,
      min: 0.00001,
      max: 1.5,
    },
    5: {
      initialMin: 0.95,
      initialMax: 1.054,
      min: 0.00001,
      max: 1.5,
    },
    20: {
      initialMin: 0.8,
      initialMax: 1.25,
      min: 0.00001,
      max: 1.5,
    },
  },
  [FeeAmount.LOW]: {
    10: {
      initialMin: 0.9,
      initialMax: 1.11,
      min: 0.00001,
      max: 20,
    },
    20: {
      initialMin: 0.8,
      initialMax: 1.25,
      min: 0.00001,
      max: 20,
    },
    50: ZOOM_LEVELS[FeeAmount.MEDIUM],
  },
  [FeeAmount.MEDIUM]: {
    10: {
      initialMin: 0.9,
      initialMax: 1.1,
      min: 0.00001,
      max: 1.5,
    },
    20: {
      initialMin: 0.8,
      initialMax: 1.25,
      min: 0.00001,
      max: 20,
    },
    50: ZOOM_LEVELS[FeeAmount.HIGH],
  },
  [FeeAmount.HIGH]: {
    20: {
      initialMin: 0.8,
      initialMax: 1.25,
      min: 0.00001,
      max: 20,
    },
    50: ZOOM_LEVELS[FeeAmount.HIGH],
    80: {
      initialMin: 0.2,
      initialMax: 5,
      min: 0.00001,
      max: 20,
    },
  },
}

export type HandleFeePoolSelectFn = (arg: HandleFeePoolSelectArgs) => void
