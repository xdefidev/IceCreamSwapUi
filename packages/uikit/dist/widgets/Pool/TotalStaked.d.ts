/// <reference types="react" />
import BigNumber from "bignumber.js";
export declare const TotalToken: ({ total, tokenDecimals, decimalsToShow, symbol, }: {
    total: BigNumber;
    tokenDecimals: number;
    decimalsToShow: number;
    symbol: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const TotalStaked: React.FC<React.PropsWithChildren<{
    totalStaked: BigNumber;
    tokenDecimals: number;
    decimalsToShow: number;
    symbol: string;
}>>;
