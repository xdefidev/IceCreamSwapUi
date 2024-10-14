import BigNumber from "bignumber.js";
import { DeserializedPool } from "./types";
interface CardActionsProps<T> {
    pool: DeserializedPool<T>;
    stakedBalance?: BigNumber;
    hideLocateAddress?: boolean;
}
export declare function withTableActions<T>(HarvestActionsComp: any, StakeActionsComp: any): ({ pool, stakedBalance, hideLocateAddress, ...rest }: {
    pool: DeserializedPool<T>;
    account?: string | undefined;
    hideLocateAddress?: boolean | undefined;
    stakedBalance?: BigNumber | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export declare function withCardActions<T>(HarvestActionsComp: any, StakeActionsComp: any): ({ pool, stakedBalance, hideLocateAddress }: CardActionsProps<T>) => import("react/jsx-runtime").JSX.Element;
export {};
