import { ChainId, ERC20Token, WETH9 } from '@pancakeswap/sdk'
import { ICE } from "./common";

export const bobaTokens = {
  weth: WETH9[ChainId.BOBA],
  ice: ICE[ChainId.BOBA],
  usdt: new ERC20Token(ChainId.BOBA, '0x7D5a56742C082FcDfc240cd7D1775f00e059771F', 18, 'USDT', 'Tether USD'),
  boba: new ERC20Token(ChainId.BOBA, '0xa18bF3994C0Cc6E3b63ac420308E5383f53120D7', 18, 'BOBA', 'Boba Token'),
  usdc: new ERC20Token(ChainId.BOBA, '0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc', 6, 'USDC', 'USD Coin'),
}
