import { Dispatch, SetStateAction } from "react";
export declare enum PairDataTimeWindowEnum {
    DAY = 0,
    WEEK = 1,
    MONTH = 2,
    YEAR = 3
}
export type SwapLineChartNewProps = {
    data?: any[] | {
        time: Date;
        value: number;
    }[];
    setHoverValue?: Dispatch<SetStateAction<number | undefined>>;
    setHoverDate?: Dispatch<SetStateAction<string | undefined>>;
    isChangePositive: boolean;
    isChartExpanded: boolean;
    timeWindow: PairDataTimeWindowEnum;
    priceLineData?: {
        title: string;
        color: string;
        price: number;
    }[];
} & React.HTMLAttributes<HTMLDivElement>;
export declare const SwapLineChart: React.FC<SwapLineChartNewProps>;
export default SwapLineChart;
