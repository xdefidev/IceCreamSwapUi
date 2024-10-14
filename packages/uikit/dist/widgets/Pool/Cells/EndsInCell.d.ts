/// <reference types="react" />
import { DeserializedPool } from "../types";
interface EndsInCellProps<T> {
    pool: DeserializedPool<T>;
    getNow: () => number;
}
interface EndTimeTooltipComponentProps {
    endTime: number;
}
export declare const EndTimeTooltipComponent: React.FC<React.PropsWithChildren<EndTimeTooltipComponentProps>>;
export declare function TimeCountdownDisplay({ timestamp, getNow, }: {
    timestamp: number;
    getNow?: () => number;
}): import("react/jsx-runtime").JSX.Element;
export declare function EndsInCell<T>({ pool, getNow }: EndsInCellProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
