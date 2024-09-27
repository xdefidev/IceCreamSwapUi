import {ChainId, ERC20Token, WETH9} from '@pancakeswap/sdk'
import {ICE} from "./common";

export const bscTokens = {
  wbnb: WETH9[ChainId.BSC],
  ice: ICE[ChainId.BSC],
  usdt: new ERC20Token(ChainId.BSC, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD'),
}
