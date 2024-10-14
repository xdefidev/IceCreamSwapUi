import { ReactNode } from "react";
import { SpaceProps, TypographyProps } from "styled-system";
export declare const variants: {
    readonly PRIMARY: "primary";
    readonly SECONDARY: "secondary";
    readonly SUCCESS: "success";
    readonly TEXTDISABLED: "textDisabled";
    readonly TEXTSUBTLE: "textSubtle";
    readonly BINANCE: "binance";
    readonly FAILURE: "failure";
    readonly WARNING: "warning";
    readonly GRADIENTBOLD: "gradientBold";
};
export declare const scales: {
    readonly MD: "md";
    readonly SM: "sm";
};
export type Scale = (typeof scales)[keyof typeof scales];
export type Variant = (typeof variants)[keyof typeof variants];
export interface TagProps extends SpaceProps, TypographyProps {
    variant?: Variant;
    scale?: Scale;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    outline?: boolean;
    textTransform?: "uppercase" | "lowercase" | "capitalize";
    style?: React.CSSProperties;
}
