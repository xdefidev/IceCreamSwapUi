import { Currency, Price } from "@pancakeswap/swap-sdk-core";
import { FeeAmount } from "@pancakeswap/v3-sdk";
import { Bound, ChartEntry, TickDataRaw, ZoomLevels } from "./types";
export declare function LiquidityChartRangeInput({ currencyA, currencyB, feeAmount, ticksAtLimit, price, priceLower, priceUpper, onBothRangeInput, onLeftRangeInput, onRightRangeInput, interactive, isLoading, error, zoomLevel, formattedData, }: {
    tickCurrent?: number;
    liquidity?: bigint;
    isLoading?: boolean;
    error?: Error;
    currencyA?: Currency;
    currencyB?: Currency;
    feeAmount?: FeeAmount;
    ticks?: TickDataRaw[];
    ticksAtLimit?: {
        [bound in Bound]?: boolean;
    };
    price?: number;
    priceLower?: Price<Currency, Currency>;
    priceUpper?: Price<Currency, Currency>;
    onLeftRangeInput?: (typedValue: string) => void;
    onRightRangeInput?: (typedValue: string) => void;
    onBothRangeInput?: (leftTypedValue: string, rightTypedValue: string) => void;
    interactive?: boolean;
    zoomLevel?: ZoomLevels;
    formattedData: ChartEntry[] | undefined;
}): import("react/jsx-runtime").JSX.Element;
