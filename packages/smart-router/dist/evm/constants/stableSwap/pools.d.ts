import { ChainId } from '@pancakeswap/sdk';
import { StableSwapPool } from './types';
export type StableSwapPoolMap<TChainId extends number> = {
    [chainId in TChainId]: StableSwapPool[];
};
export declare const isStableSwapSupported: (chainId: number) => chainId is ChainId;
export declare const STABLE_SUPPORTED_CHAIN_IDS: ReadonlyArray<ChainId>;
export type StableSupportedChainId = (typeof STABLE_SUPPORTED_CHAIN_IDS)[number];
export declare const STABLE_POOL_MAP: {
    [p: number]: StableSwapPool[];
};
//# sourceMappingURL=pools.d.ts.map