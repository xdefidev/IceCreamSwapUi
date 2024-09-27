import { ChainId } from "@pancakeswap/sdk";

export const SUPPORTED_CHAIN_IDS = [ChainId.CORE, ChainId.NEON, ChainId.BITGERT, ChainId.XDC]

export type SupportedChainId = (typeof SUPPORTED_CHAIN_IDS)[number]
