import { ChainId, ERC20Token, WETH9 } from '@pancakeswap/sdk'
import {ICE} from "./common";

export const neonTokens = {
  wneon: WETH9[ChainId.NEON],
  ice: ICE[ChainId.NEON],
  usdt: new ERC20Token(ChainId.NEON, '0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44', 18, 'USDT', 'Tether USD'),
  chonk: new ERC20Token(ChainId.NEON, '0xF335ae40F387Bdc60477F0B306326A233D35227f', 18, 'CHONK', 'NeonChonk'),
}
