import { ReactNode } from "react";
import { ColumnType, ColumnDataType, UseTableReturnType, UseTableOptionsType } from "./types";
export declare const makeRender: <T extends ColumnDataType>(value: any, render: (({ value, row }: {
    value: any;
    row: T;
}) => ReactNode) | undefined, row: T) => (() => React.ReactNode);
export declare const useTable: <T extends ColumnDataType>(columns: ColumnType<T>[], data: T[], options?: UseTableOptionsType<T> | undefined) => UseTableReturnType<T>;
