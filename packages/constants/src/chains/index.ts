import { fireChain } from "./5irechain"
import { base } from "./base"
import { bitfinitytestnet } from "./bitfinitytestnet"
import { bitgert } from './bitgert'
import { blast } from "./blast"
import { bob } from "./bob"
import { boba } from "./boba"
import { bsc } from './bsc'
import { core } from './core'
import { degen } from "./degen"
import { dogechain } from './dogechain'
import { fuse } from './fuse'
import { gravityalpha } from "./gravityalpha"
import { lightlink } from "./lightlink"
import { mint } from "./mint"
import { neon } from "./neon"
import { oneWorld } from "./oneworld"
import { qitmeer } from "./qitmeer"
import { rari } from "./rari"
import { rootstock } from "./rootstock"
import { scroll } from "./scroll"
import { shardeumTestnet } from "./shardeumTestnet"
import { shimmer } from "./shimmer"
import { shimmerTestnet } from "./shimmerTestnet"
import { stratovmTestnet } from "./stratovmTestnet"
import { swanmainnet } from "./swanmainnet"
import { taikomainnet } from "./taikomainnet"
import { telos } from "./telos"
import { ternoatestnet } from "./ternoatestnet"
import { xdc } from './xdc'
import { xodex } from "./xodex"

export const chainMap = {
  core,
  // bsc,
  // bob,
  // boba,
  // base,
  // fireChain,
  // qitmeer,
  // lightlink,
  // neon,
  // rari,
  // degen,
  // blast,
  // bitgert,
  // telos,
  // shimmer,
  // scroll,
  // oneWorld,
  // xdc,
  // dogechain,
  // fuse,
  // xodex,
  // gravityalpha,
  // shardeumTestnet,
  // shimmerTestnet,
  // mint,
  // rootstock,
  // swanmainnet,
  // stratovmTestnet,
  // bitfinitytestnet,
  // ternoatestnet,
  // taikomainnet,
}
export const chains = Object.values(chainMap)

export const getChain = (chainId: number) => {
  return chains.find((chain) => chain.id === chainId)
}

export enum ChainId {
  CORE = core.id,
  BLAST = blast.id,
  NEON = neon.id,
  SHIMMER = shimmer.id,
  BSC = bsc.id,
  SCROLL = scroll.id,
  XDC = xdc.id,
  TELOS = telos.id,
  BITGERT = bitgert.id,
  BASE = base.id,
  DOGE = dogechain.id,
  FUSE = fuse.id,
  XODEX = xodex.id,
  QITMEER = qitmeer.id,
  DEGEN = degen.id,
  RARI = rari.id,
  BOB = bob.id,
  BOBA = boba.id,
  LIGHTLINK = lightlink.id,
  MINT = mint.id,
  ONE_WORLD = oneWorld.id,
  SWAN = swanmainnet.id,
  TAIKO = taikomainnet.id,
  SHARDEUM_TEST = shardeumTestnet.id,
  SHIMMER_TEST = shimmerTestnet.id,
  STRATOM_TEST = stratovmTestnet.id,
  BITFINITY_TEST = bitfinitytestnet.id,
  TERNOA_TEST = ternoatestnet.id,
  GRAVITY_ALPHA = gravityalpha.id,
  FIRE = fireChain.id,
  ROOTSTOCK = rootstock.id,
}

export const defaultChainId = ChainId.CORE
