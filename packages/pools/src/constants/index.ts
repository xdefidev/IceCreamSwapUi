import { getChain } from '@icecreamswap/constants'

export * from './pools'
export * from './contracts'
export * from './supportedChains'



export const SECONDS_IN_YEAR = 31536000 // 365 * 24 * 60 * 60


export const blockTime = (chainId: number) => {
  const chain = getChain(chainId)
  return chain? chain.blockInterval: 3
}

export const blocksPerYear = (chainId: number) => {
  return SECONDS_IN_YEAR / blockTime(chainId)
}
