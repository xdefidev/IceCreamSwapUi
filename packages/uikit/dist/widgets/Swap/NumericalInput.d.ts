/// <reference types="react" />
import { InputVariants } from "./SwapWidget.css";
export type NumericalInputProps = {
    value: string | number;
    onUserInput: (input: string) => void;
    fontSize?: string;
} & InputVariants & Omit<React.HTMLProps<HTMLInputElement>, "ref" | "onChange" | "as">;
export declare const NumericalInput: import("react").NamedExoticComponent<{
    value: string | number;
    onUserInput: (input: string) => void;
    fontSize?: string | undefined;
} & {
    error?: boolean | undefined;
    loading?: boolean | undefined;
    align?: "left" | "right" | "center" | undefined;
} & Omit<import("react").HTMLProps<HTMLInputElement>, "ref" | "onChange" | "as">>;
