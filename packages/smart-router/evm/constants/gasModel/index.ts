import {ChainId, ERC20Token, Token, WETH9} from '@pancakeswap/sdk'
import { USD } from "@pancakeswap/tokens";
import { chains } from '@icecreamswap/constants'

export const usdGasTokensByChain: { [chainId in ChainId]?: Token[] } = chains.reduce((acc, chain) => {
  return {...acc, [chain.id]: [USD[chain.id] || new ERC20Token(chain.id, "0x1230000000000000000000000000000000000321", 18, "UnknownUSD")]}
}, {})

export const nativeWrappedTokenByChain: { [chainId in ChainId]?: Token } = WETH9

export * from './v2'
export * from './v3'
export * from './stableSwap'
