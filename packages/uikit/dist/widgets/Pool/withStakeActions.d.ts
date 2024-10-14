import BigNumber from "bignumber.js";
import { ReactElement } from "react";
import { DeserializedPool } from "./types";
interface StakeActionsPropsType<T> {
    pool: DeserializedPool<T>;
    stakingTokenBalance: BigNumber;
    stakedBalance: BigNumber;
    isBnbPool: boolean;
    isStaked: ConstrainBoolean;
    isLoading?: boolean;
    hideLocateAddress?: boolean;
}
export interface StakeModalPropsType<T> {
    isBnbPool: boolean;
    pool: DeserializedPool<T>;
    stakingTokenBalance: BigNumber;
    stakingTokenPrice: number;
    isRemovingStake?: boolean;
    onDismiss?: () => void;
}
export declare function withStakeActions<T>(StakeModal: (props: StakeModalPropsType<T>) => ReactElement): ({ pool, stakingTokenBalance, stakedBalance, isBnbPool, isStaked, isLoading, hideLocateAddress, }: StakeActionsPropsType<T>) => import("react/jsx-runtime").JSX.Element;
export {};
