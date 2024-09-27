import { Token, ChainId } from '@pancakeswap/sdk'
import { coreWarningTokens } from 'config/constants/warningTokens'

interface WarningTokenList {
  [chainId: number]: {
    [key: string]: Token
  }
}

const SwapWarningTokens = <WarningTokenList>{
  [ChainId.CORE]: coreWarningTokens,
}

export default SwapWarningTokens
