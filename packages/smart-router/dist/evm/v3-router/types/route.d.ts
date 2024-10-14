import { Currency, CurrencyAmount } from '@pancakeswap/sdk';
import { GasCost } from './gasCost';
import { Pool } from './pool';
export declare enum RouteType {
    V2 = 0,
    V3 = 1,
    STABLE = 2,
    MIXED = 3,
    MM = 4
}
export interface BaseRoute {
    type: RouteType;
    pools: Pool[];
    path: Currency[];
    input: Currency;
    output: Currency;
}
export interface RouteWithoutQuote extends BaseRoute {
    percent: number;
    amount: CurrencyAmount<Currency>;
}
export type RouteEssentials = Omit<RouteWithoutQuote, 'input' | 'output' | 'amount'>;
export interface Route extends RouteEssentials {
    inputAmount: CurrencyAmount<Currency>;
    outputAmount: CurrencyAmount<Currency>;
}
export interface RouteQuote extends GasCost {
    quoteAdjustedForGas: CurrencyAmount<Currency>;
    quote: CurrencyAmount<Currency>;
}
export type RouteWithQuote = RouteWithoutQuote & RouteQuote;
export type RouteWithoutGasEstimate = Omit<RouteWithQuote, 'quoteAdjustedForGas' | 'gasEstimate' | 'gasCostInToken' | 'gasCostInUSD'>;
export interface BestRoutes {
    gasEstimate: bigint;
    gasEstimateInUSD: CurrencyAmount<Currency>;
    routes: Route[];
    inputAmount: CurrencyAmount<Currency>;
    outputAmount: CurrencyAmount<Currency>;
}
//# sourceMappingURL=route.d.ts.map