import { DeserializedPool } from "../types";
interface EarningsCellProps<T> {
    pool: DeserializedPool<T>;
    account: string;
}
export declare function EarningsCell<T>({ pool, account }: EarningsCellProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
