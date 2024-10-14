import { Percent } from '@pancakeswap/swap-sdk-core';
import { ERC20Token } from './entities/token';
import { ChainId } from '@icecreamswap/constants';
export declare const ZERO_PERCENT: Percent;
export declare const ONE_HUNDRED_PERCENT: Percent;
export { ChainId };
export declare const FACTORY_ADDRESS_MAP: Record<ChainId, `0x${string}`>;
export declare const INIT_CODE_HASH_MAP: Record<ChainId, `0x${string}`>;
export declare const WETH9: Record<ChainId, ERC20Token>;
export declare const WNATIVE: Record<ChainId, ERC20Token>;
export declare const NATIVE: Record<ChainId, {
    symbol: string;
    decimals: number;
    name: string;
}>;
//# sourceMappingURL=constants.d.ts.map