import { bitgertTokens } from "@pancakeswap/tokens";

import { PoolCategory, SerializedPool } from '../../types'

export const livePools: SerializedPool[] = [
  // {
  //   sousId: 4,
  //   stakingToken: bitgertTokens.miidas,
  //   earningToken: bitgertTokens.miidas,
  //   contractAddress: '0xf4c78d403527ba2fb67ab599efea0a739d3d6547',
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '12.5',
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
