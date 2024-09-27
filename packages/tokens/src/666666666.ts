import {ChainId, WETH9} from '@pancakeswap/sdk'
import { ICE, USD } from "./common";

export const degenTokens = {
  wdegen: WETH9[ChainId.DEGEN],
  ice: ICE[ChainId.DEGEN],
  usdt: USD[ChainId.DEGEN]
}
