import { ChainId, WETH9, ERC20Token } from '@pancakeswap/sdk'
import {ICE} from "./common";

export const baseTokens = {
  weth: WETH9[ChainId.BASE],
  ice: ICE[ChainId.BASE],
  usdt: new ERC20Token(ChainId.BASE, '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44', 18, 'USDT', 'Tether USD'),
}
