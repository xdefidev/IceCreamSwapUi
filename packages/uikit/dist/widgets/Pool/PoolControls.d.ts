import { ReactElement } from "react";
import { ViewMode } from "../../components/ToggleView/ToggleView";
import { DeserializedPool } from "./types";
interface ChildrenReturn<T> {
    chosenPools: DeserializedPool<T>[];
    viewMode: ViewMode;
    stakedOnly: boolean;
    showFinishedPools: boolean;
    normalizedUrlSearch: string;
}
interface PoolControlsPropsType<T> {
    pools: DeserializedPool<T>[];
    children: (childrenReturn: ChildrenReturn<T>) => ReactElement;
    stakedOnly: boolean;
    setStakedOnly: (s: boolean) => void;
    viewMode: ViewMode;
    setViewMode: (s: ViewMode) => void;
    account: string;
    threshHold: number;
    hideViewMode?: boolean;
}
export declare function PoolControls<T>({ pools, children, stakedOnly, setStakedOnly, viewMode, setViewMode, account, threshHold, hideViewMode, }: PoolControlsPropsType<T>): import("react/jsx-runtime").JSX.Element;
export {};
