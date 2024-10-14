import BigNumber from "bignumber.js";
import { FunctionComponent } from "react";
import { DeserializedPool } from "../types";
interface AprCellProps<T> {
    pool: DeserializedPool<T>;
    aprComp: FunctionComponent<{
        pool: DeserializedPool<T>;
        stakedBalance: BigNumber;
        showIcon: boolean;
    }>;
}
export declare function AprCell<T>({ pool, aprComp }: AprCellProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
