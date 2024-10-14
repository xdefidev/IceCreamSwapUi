import BigNumber from "bignumber.js";
import { ReactNode } from "react";
import { DeserializedPool } from "../types";
interface NameCellProps<T> {
    pool: DeserializedPool<T>;
    userShares?: BigNumber;
    totalCakeInVault?: BigNumber;
    tokenPairImage: ReactNode;
}
export declare function NameCell<T>({ pool, totalCakeInVault, userShares, tokenPairImage }: NameCellProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
