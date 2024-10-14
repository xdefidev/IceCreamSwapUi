import { BigintIsh } from '@pancakeswap/sdk';
import { Options as RetryOptions } from 'async-retry';
import { OnChainProvider, QuoteProvider } from '../types';
import { BatchMulticallConfigs, ChainMap } from '../../types';
interface ProviderConfig {
    onChainProvider: OnChainProvider;
    gasLimit?: BigintIsh;
    multicallConfigs?: ChainMap<BatchMulticallConfigs>;
}
export declare class BlockConflictError extends Error {
    name: string;
}
export declare class SuccessRateError extends Error {
    name: string;
}
export declare class ProviderBlockHeaderError extends Error {
    name: string;
}
export declare class ProviderTimeoutError extends Error {
    name: string;
}
/**
 * This error typically means that the gas used by the multicall has
 * exceeded the total call gas limit set by the node provider.
 *
 * This can be resolved by modifying BatchParams to request fewer
 * quotes per call, or to set a lower gas limit per quote.
 *
 * @export
 * @class ProviderGasError
 */
export declare class ProviderGasError extends Error {
    name: string;
}
export type QuoteRetryOptions = RetryOptions;
export declare const createMixedRouteOnChainQuoteProvider: ({ onChainProvider, gasLimit, multicallConfigs: multicallConfigsOverride, }: ProviderConfig) => QuoteProvider;
export declare const createV3OnChainQuoteProvider: ({ onChainProvider, gasLimit, multicallConfigs: multicallConfigsOverride, }: ProviderConfig) => QuoteProvider;
export {};
//# sourceMappingURL=onChainQuoteProvider.d.ts.map