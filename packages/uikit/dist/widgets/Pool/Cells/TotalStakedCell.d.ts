import BigNumber from "bignumber.js";
interface TotalStakedCellProps {
    stakingTokenDecimals: number;
    stakingTokenSymbol: string;
    totalStaked?: BigNumber;
}
export declare function TotalStakedCell({ stakingTokenSymbol, totalStaked, stakingTokenDecimals }: TotalStakedCellProps): import("react/jsx-runtime").JSX.Element;
export {};
