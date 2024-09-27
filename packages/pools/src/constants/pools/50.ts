import { xdcTokens } from "@pancakeswap/tokens";

import { PoolCategory, SerializedPool } from '../../types'

export const livePools: SerializedPool[] = [
  // {
  //   sousId: 2,
  //   stakingToken: xdcTokens.ice,
  //   earningToken: xdcTokens.btcx,
  //   contractAddress: '0x7b7387513444D4336e5a7E9cF75A2Bc7a38721A9',
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.02093',
  //   version: 2,
  // },
  // {
  //   sousId: 3,
  //   stakingToken: xdcTokens.btcx,
  //   earningToken: xdcTokens.btcx,
  //   contractAddress: '0x788C14Ddb3D4e9036D1fC98D2324f3F86FD43fCf',
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.02093',
  //   version: 2,
  // },
].map((p: any) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

// known finished pools
const finishedPools = [].map((p: any) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

export const pools: SerializedPool[] = [...livePools, ...finishedPools]
