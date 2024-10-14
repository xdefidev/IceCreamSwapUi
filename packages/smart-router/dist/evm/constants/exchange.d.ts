import { ChainId, Token } from '@pancakeswap/sdk';
import { ChainMap, ChainTokenList } from '../types';
import { Address } from "viem";
export declare const SMART_ROUTER_ADDRESSES: Record<ChainId, Address>;
export declare const V2_ROUTER_ADDRESS: ChainMap<Address>;
export declare const STABLE_SWAP_INFO_ADDRESS: ChainMap<Address>;
export declare const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList;
/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export declare const ADDITIONAL_BASES: {
    [chainId in ChainId]?: {
        [tokenAddress: string]: Token[];
    };
};
/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WNATIVE[ChainId.BSC]]
 */
export declare const CUSTOM_BASES: {
    [chainId in ChainId]?: {
        [tokenAddress: string]: Token[];
    };
};
//# sourceMappingURL=exchange.d.ts.map