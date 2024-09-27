import { ChainId, Percent, Token, WETH9 } from '@pancakeswap/sdk'
import { coreTokens, USD, ICE, bobaTokens } from '@pancakeswap/tokens'
import { chains } from '@icecreamswap/constants'
import { ChainMap, ChainTokenList } from './types'

export {
  ADDITIONAL_BASES,
  V2_ROUTER_ADDRESS,
  BASES_TO_CHECK_TRADES_AGAINST,
  CUSTOM_BASES,
} from '@pancakeswap/smart-router/evm'

export const CHAIN_REFRESH_TIME: ChainMap<number> = chains.reduce(
  (acc, chain) => ({...acc, [chain.id]: 6_000}),
  {}
)

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = chains.reduce((acc, chain) => {
  const tokens: Token[] = []
  USD[chain.id] && tokens.push(USD[chain.id])
  ICE[chain.id] && tokens.push(ICE[chain.id])
  return {...acc, [chain.id]: tokens}
}, {})

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...chains.reduce((acc, chain) => {
    const tokens: Token[] = []
    WETH9[chain.id] && tokens.push(WETH9[chain.id])
    USD[chain.id] && tokens.push(USD[chain.id])
    ICE[chain.id] && tokens.push(ICE[chain.id])
    return {...acc, [chain.id]: tokens}
  }, {}),
  [ChainId.CORE]: [coreTokens.wcore, coreTokens.wcore_old, coreTokens.score, coreTokens.ice, coreTokens.usdt, coreTokens.usdtl0],
  [ChainId.BOBA]: [bobaTokens.weth, bobaTokens.ice, bobaTokens.usdt, bobaTokens.boba, bobaTokens.usdc],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  ...chains.reduce((acc, chain) => {
    const pairs: [Token, Token][] = []
    WETH9[chain.id] && USD[chain.id] && pairs.push([WETH9[chain.id], USD[chain.id]])
    WETH9[chain.id] && ICE[chain.id] && pairs.push([WETH9[chain.id], ICE[chain.id]])
    return {...acc, [chain.id]: pairs}
  }, {}),
}

export const BIG_INT_ZERO = 0n
export const BIG_INT_TEN = 10n

// one basis point
export const BIPS_BASE = 10000n
export const ONE_BIPS = new Percent(1n, BIPS_BASE)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(100n, BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(300n, BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(500n, BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(1000n, BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(1500n, BIPS_BASE) // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: bigint = BIG_INT_TEN ** 15n // .001 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(50n, BIPS_BASE)

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const BASE_FEE = new Percent(30n, BIPS_BASE)
export const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE)

// BNB
export const DEFAULT_INPUT_CURRENCY = 'BNB'
// ICE
export const DEFAULT_OUTPUT_CURRENCY = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'

// Handler string is passed to Gelato to use PCS router
export const GELATO_HANDLER = 'pancakeswap'
export const GENERIC_GAS_LIMIT_ORDER_EXECUTION = 500000n

export const LIMIT_ORDERS_DOCS_URL = 'https://docs.icecreamswap.com/products/pancakeswap-exchange/limit-orders'

export const EXCHANGE_PAGE_PATHS = ['/swap', '/limit-orders', 'liquidity', '/add', '/find', '/remove']
