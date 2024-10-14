import BigNumber from "bignumber.js";
import { DeserializedPool } from "./types";
import { FlexProps } from "../../components";
interface AprProps<T> extends FlexProps {
    pool: DeserializedPool<T>;
    stakedBalance: BigNumber;
    showIcon: boolean;
    performanceFee?: number;
    fontSize?: string;
    shouldShowApr: boolean;
    forceApy?: boolean;
    account: string;
    autoCompoundFrequency: number;
}
export declare function Apr<T>({ pool, showIcon, stakedBalance, fontSize, performanceFee, shouldShowApr, forceApy, account, autoCompoundFrequency, ...props }: AprProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
