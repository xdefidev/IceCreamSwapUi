import { ReactElement } from "react";
import { DeserializedPool } from "./types";
interface PoolCardPropsType<T> {
    pool: DeserializedPool<T>;
    cardContent: ReactElement;
    aprRow: ReactElement;
    cardFooter: ReactElement;
    tokenPairImage: ReactElement;
    isStaked: boolean;
}
export declare function PoolCard<T>({ pool, cardContent, aprRow, isStaked, cardFooter, tokenPairImage }: PoolCardPropsType<T>): import("react/jsx-runtime").JSX.Element;
export {};
