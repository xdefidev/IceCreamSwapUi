import {ChainId, ERC20Token, WETH9} from '@pancakeswap/sdk'
import {ICE} from "./common";

export const xodexTokens = {
  wxodex: WETH9[ChainId.XODEX],
  ice: ICE[ChainId.XODEX],
  usdt: new ERC20Token(ChainId.XODEX, '0x54051D9DbE99687867090d95fe15C3D3E35512Ba', 18, 'USDT', 'Tether USD'),
}
