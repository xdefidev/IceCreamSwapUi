import { ChainId, WETH9, ERC20Token } from '@pancakeswap/sdk'
import {ICE} from "./common";

export const shardeumTestnetTokens = {
  wshm: WETH9[ChainId.SHARDEUM_TEST],
  ice: ICE[ChainId.SHARDEUM_TEST],
  usdt: new ERC20Token(ChainId.SHARDEUM_TEST, '0x43891084581fD07Ee1189f3a2f04e51c26a95B77', 18, 'USDT', 'Tether USD'),
}
