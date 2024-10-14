import { Currency } from "@pancakeswap/sdk";
import { FeeAmount } from "@pancakeswap/v3-sdk";
import { ChartEntry, TickProcessed, TickDataRaw } from "./types";
export declare function useDensityChartData(poolInfo: {
    liquidity?: bigint;
    tickCurrent?: number;
    feeAmount?: FeeAmount;
    currencyA?: Currency;
    currencyB?: Currency;
    ticks?: TickDataRaw[];
}): {
    formattedData: ChartEntry[] | undefined;
};
export declare function usePoolActiveLiquidity({ liquidity, currencyA, currencyB, feeAmount, ticks, tickCurrent, }: {
    liquidity?: bigint;
    tickCurrent?: number;
    feeAmount?: FeeAmount;
    currencyA?: Currency;
    currencyB?: Currency;
    ticks?: TickDataRaw[];
}): {
    activeTick?: number;
    data?: TickProcessed[];
};
