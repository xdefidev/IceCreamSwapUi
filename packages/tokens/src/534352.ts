import { ChainId, ERC20Token, WETH9 } from '@pancakeswap/sdk'
import {ICE} from "./common";

export const scrollTokens = {
  weth: WETH9[ChainId.SCROLL],
  ice: ICE[ChainId.SCROLL],
  usdt: new ERC20Token(ChainId.SCROLL, '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44', 18, 'USDT', 'Tether USD'),
}
