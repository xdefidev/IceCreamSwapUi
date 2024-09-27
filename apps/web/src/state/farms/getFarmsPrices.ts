import {ChainId, FACTORY_ADDRESS_MAP, Pair, WETH9} from "@pancakeswap/sdk";
import { chains } from "@icecreamswap/constants";
import {coreTokens, ICE, USD} from "@pancakeswap/tokens";

export const nativeStableLpMap = {...chains.reduce((acc, chain) => {
  if (!WETH9[chain.id] || !USD[chain.id] || !FACTORY_ADDRESS_MAP[chain.id]) return acc
  return {...acc, [chain.id]: {
      address: Pair.getAddress(WETH9[chain.id], USD[chain.id]),
      wNative: WETH9[chain.id].symbol,
      stable: USD[chain.id].symbol,
    }}
}, {}),
  [ChainId.CORE]: {
    address: Pair.getAddress(coreTokens.wcore_old, USD[ChainId.CORE]),
    wNative: coreTokens.wcore_old.symbol,
    stable: USD[ChainId.CORE].symbol,
  }
}