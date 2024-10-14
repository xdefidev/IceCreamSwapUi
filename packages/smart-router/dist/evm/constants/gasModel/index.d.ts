import { ChainId, Token } from '@pancakeswap/sdk';
export declare const usdGasTokensByChain: {
    [chainId in ChainId]?: Token[];
};
export declare const nativeWrappedTokenByChain: {
    [chainId in ChainId]?: Token;
};
export * from './v2';
export * from './v3';
export * from './stableSwap';
//# sourceMappingURL=index.d.ts.map