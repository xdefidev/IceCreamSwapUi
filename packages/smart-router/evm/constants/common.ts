import { Percent } from '@pancakeswap/sdk'
import { chains } from "@icecreamswap/constants";

export const BIG_INT_TEN = 10n
// one basis point
export const BIPS_BASE = 10000n

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: bigint = BIG_INT_TEN ** 16n // .01 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(50n, BIPS_BASE)


export const CHAIN_ID_TO_CHAIN_NAME = chains.reduce((acc, chain) => (
  {...acc, [chain.id]: chain.network}
), {})
