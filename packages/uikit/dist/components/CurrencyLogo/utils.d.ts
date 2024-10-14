/// <reference types="lodash" />
import { Token, Currency } from "@pancakeswap/sdk";
export declare const getTokenLogoURL: ((token?: Token) => string | null) & import("lodash").MemoizedFunction;
export declare const getTokenLogoURLByAddress: ((address?: string, chainId?: number) => string | null) & import("lodash").MemoizedFunction;
export declare const getCurrencyLogoUrls: ((currency?: Currency) => string[]) & import("lodash").MemoizedFunction;
