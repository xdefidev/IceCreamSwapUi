import { Breakpoint, breakpointNames } from "./breakpoints";
export declare const sprinkles: ((props: {
    display?: ("none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | {
        xs?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        sm?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        md?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        lg?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        xl?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
        xxl?: "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "none" | "flex" | "grid" | "block" | "inline" | "inline-block" | "inline-flex" | null>;
    flexDirection?: ("column" | "column-reverse" | "row" | {
        xs?: "column" | "column-reverse" | "row" | undefined;
        sm?: "column" | "column-reverse" | "row" | undefined;
        md?: "column" | "column-reverse" | "row" | undefined;
        lg?: "column" | "column-reverse" | "row" | undefined;
        xl?: "column" | "column-reverse" | "row" | undefined;
        xxl?: "column" | "column-reverse" | "row" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "column" | "column-reverse" | "row" | null>;
    alignItems?: ("inherit" | "center" | "stretch" | "end" | "flex-end" | "flex-start" | "start" | "baseLine" | {
        xs?: "inherit" | "center" | "stretch" | "end" | "flex-end" | "flex-start" | "start" | "baseLine" | undefined;
        sm?: "inherit" | "center" | "stretch" | "end" | "flex-end" | "flex-start" | "start" | "baseLine" | undefined;
        md?: "inherit" | "center" | "stretch" | "end" | "flex-end" | "flex-start" | "start" | "baseLine" | undefined;
        lg?: "inherit" | "center" | "stretch" | "end" | "flex-end" | "flex-start" | "start" | "baseLine" | undefined;
        xl?: "inherit" | "center" | "stretch" | "end" | "flex-end" | "flex-start" | "start" | "baseLine" | undefined;
        xxl?: "inherit" | "center" | "stretch" | "end" | "flex-end" | "flex-start" | "start" | "baseLine" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "inherit" | "center" | "stretch" | "end" | "flex-end" | "flex-start" | "start" | "baseLine" | null>;
    alignSelf?: ("center" | "stretch" | "flex-end" | "flex-start" | "start" | {
        xs?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        sm?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        md?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        lg?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        xl?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        xxl?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "center" | "stretch" | "flex-end" | "flex-start" | "start" | null>;
    flexWrap?: ("nowrap" | "wrap" | {
        xs?: "nowrap" | "wrap" | undefined;
        sm?: "nowrap" | "wrap" | undefined;
        md?: "nowrap" | "wrap" | undefined;
        lg?: "nowrap" | "wrap" | undefined;
        xl?: "nowrap" | "wrap" | undefined;
        xxl?: "nowrap" | "wrap" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "nowrap" | "wrap" | null>;
    flexGrow?: (number | {
        xs?: number | undefined;
        sm?: number | undefined;
        md?: number | undefined;
        lg?: number | undefined;
        xl?: number | undefined;
        xxl?: number | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, number | null>;
    overflow?: ("unset" | "auto" | "scroll" | "hidden" | {
        xs?: "unset" | "auto" | "scroll" | "hidden" | undefined;
        sm?: "unset" | "auto" | "scroll" | "hidden" | undefined;
        md?: "unset" | "auto" | "scroll" | "hidden" | undefined;
        lg?: "unset" | "auto" | "scroll" | "hidden" | undefined;
        xl?: "unset" | "auto" | "scroll" | "hidden" | undefined;
        xxl?: "unset" | "auto" | "scroll" | "hidden" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "unset" | "auto" | "scroll" | "hidden" | null>;
    overflowY?: ("auto" | "scroll" | "hidden" | {
        xs?: "auto" | "scroll" | "hidden" | undefined;
        sm?: "auto" | "scroll" | "hidden" | undefined;
        md?: "auto" | "scroll" | "hidden" | undefined;
        lg?: "auto" | "scroll" | "hidden" | undefined;
        xl?: "auto" | "scroll" | "hidden" | undefined;
        xxl?: "auto" | "scroll" | "hidden" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "auto" | "scroll" | "hidden" | null>;
    overflowX?: ("auto" | "scroll" | "hidden" | {
        xs?: "auto" | "scroll" | "hidden" | undefined;
        sm?: "auto" | "scroll" | "hidden" | undefined;
        md?: "auto" | "scroll" | "hidden" | undefined;
        lg?: "auto" | "scroll" | "hidden" | undefined;
        xl?: "auto" | "scroll" | "hidden" | undefined;
        xxl?: "auto" | "scroll" | "hidden" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "auto" | "scroll" | "hidden" | null>;
    position?: ("fixed" | "absolute" | "relative" | "sticky" | {
        xs?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        sm?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        md?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        lg?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        xl?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
        xxl?: "fixed" | "absolute" | "relative" | "sticky" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "fixed" | "absolute" | "relative" | "sticky" | null>;
    textAlign?: ("left" | "right" | "center" | {
        xs?: "left" | "right" | "center" | undefined;
        sm?: "left" | "right" | "center" | undefined;
        md?: "left" | "right" | "center" | undefined;
        lg?: "left" | "right" | "center" | undefined;
        xl?: "left" | "right" | "center" | undefined;
        xxl?: "left" | "right" | "center" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "left" | "right" | "center" | null>;
    justifyContent?: ("center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | {
        xs?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        sm?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        md?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        lg?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        xl?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        xxl?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | null>;
    justifyItems?: ("center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | {
        xs?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        sm?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        md?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        lg?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        xl?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        xxl?: "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "center" | "space-around" | "space-between" | "stretch" | "flex-end" | "flex-start" | "start" | null>;
    justifySelf?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "center" | "stretch" | "flex-end" | "flex-start" | "start" | null> | ("center" | "stretch" | "flex-end" | "flex-start" | "start" | {
        xs?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        sm?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        md?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        lg?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        xl?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
        xxl?: "center" | "stretch" | "flex-end" | "flex-start" | "start" | undefined;
    } | undefined);
    inset?: ("0px" | {
        xs?: "0px" | undefined;
        sm?: "0px" | undefined;
        md?: "0px" | undefined;
        lg?: "0px" | undefined;
        xl?: "0px" | undefined;
        xxl?: "0px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | null>;
    height?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | null>;
    marginBottom?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null>;
    marginLeft?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    marginRight?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    marginTop?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    margin?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    padding?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined);
    maxHeight?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    maxWidth?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "none" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "none" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "none" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "none" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "none" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "none" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "none" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "none" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | null>;
    minHeight?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "100vh" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
    } | undefined);
    minWidth?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    paddingBottom?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    paddingLeft?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    paddingRight?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    paddingTop?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    fontSize?: ("12px" | "14px" | "16px" | "20px" | "10px" | "40px" | "inherit" | {
        xs?: "12px" | "14px" | "16px" | "20px" | "10px" | "40px" | "inherit" | undefined;
        sm?: "12px" | "14px" | "16px" | "20px" | "10px" | "40px" | "inherit" | undefined;
        md?: "12px" | "14px" | "16px" | "20px" | "10px" | "40px" | "inherit" | undefined;
        lg?: "12px" | "14px" | "16px" | "20px" | "10px" | "40px" | "inherit" | undefined;
        xl?: "12px" | "14px" | "16px" | "20px" | "10px" | "40px" | "inherit" | undefined;
        xxl?: "12px" | "14px" | "16px" | "20px" | "10px" | "40px" | "inherit" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "12px" | "14px" | "16px" | "20px" | "10px" | "40px" | "inherit" | null>;
    flex?: ("initial" | "none" | "auto" | 1 | {
        xs?: "initial" | "none" | "auto" | 1 | undefined;
        sm?: "initial" | "none" | "auto" | 1 | undefined;
        md?: "initial" | "none" | "auto" | 1 | undefined;
        lg?: "initial" | "none" | "auto" | 1 | undefined;
        xl?: "initial" | "none" | "auto" | 1 | undefined;
        xxl?: "initial" | "none" | "auto" | 1 | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "initial" | "none" | "auto" | 1 | null>;
    boxShadow?: ("level1" | "active" | "success" | "warning" | "danger" | "focus" | "inset" | "tooltip" | {
        xs?: "level1" | "active" | "success" | "warning" | "danger" | "focus" | "inset" | "tooltip" | undefined;
        sm?: "level1" | "active" | "success" | "warning" | "danger" | "focus" | "inset" | "tooltip" | undefined;
        md?: "level1" | "active" | "success" | "warning" | "danger" | "focus" | "inset" | "tooltip" | undefined;
        lg?: "level1" | "active" | "success" | "warning" | "danger" | "focus" | "inset" | "tooltip" | undefined;
        xl?: "level1" | "active" | "success" | "warning" | "danger" | "focus" | "inset" | "tooltip" | undefined;
        xxl?: "level1" | "active" | "success" | "warning" | "danger" | "focus" | "inset" | "tooltip" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "level1" | "active" | "success" | "warning" | "danger" | "focus" | "inset" | "tooltip" | null>;
    width?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
    } | undefined);
    zIndex?: ("0" | "1" | "dropdown" | "auto" | "ribbon" | "10" | "20" | "30" | "40" | "50" | "75" | "99" | "100" | "modal" | {
        xs?: "0" | "1" | "dropdown" | "auto" | "ribbon" | "10" | "20" | "30" | "40" | "50" | "75" | "99" | "100" | "modal" | undefined;
        sm?: "0" | "1" | "dropdown" | "auto" | "ribbon" | "10" | "20" | "30" | "40" | "50" | "75" | "99" | "100" | "modal" | undefined;
        md?: "0" | "1" | "dropdown" | "auto" | "ribbon" | "10" | "20" | "30" | "40" | "50" | "75" | "99" | "100" | "modal" | undefined;
        lg?: "0" | "1" | "dropdown" | "auto" | "ribbon" | "10" | "20" | "30" | "40" | "50" | "75" | "99" | "100" | "modal" | undefined;
        xl?: "0" | "1" | "dropdown" | "auto" | "ribbon" | "10" | "20" | "30" | "40" | "50" | "75" | "99" | "100" | "modal" | undefined;
        xxl?: "0" | "1" | "dropdown" | "auto" | "ribbon" | "10" | "20" | "30" | "40" | "50" | "75" | "99" | "100" | "modal" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0" | "1" | "dropdown" | "auto" | "ribbon" | "10" | "20" | "30" | "40" | "50" | "75" | "99" | "100" | "modal" | null>;
    borderTop?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "1" | null> | ("1" | {
        xs?: "1" | undefined;
        sm?: "1" | undefined;
        md?: "1" | undefined;
        lg?: "1" | undefined;
        xl?: "1" | undefined;
        xxl?: "1" | undefined;
    } | undefined);
    borderRadius?: ("8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | {
        xs?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        sm?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        md?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        lg?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xxl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | null>;
    borderTopLeftRadius?: ("8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | {
        xs?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        sm?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        md?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        lg?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xxl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | null>;
    borderBottomRightRadius?: ("8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | {
        xs?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        sm?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        md?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        lg?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xxl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | null>;
    borderTopRightRadius?: ("8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | {
        xs?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        sm?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        md?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        lg?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xxl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | null>;
    borderBottomLeftRadius?: ("8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | {
        xs?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        sm?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        md?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        lg?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xxl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | null>;
    gap?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
    } | undefined);
    rowGap?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
    } | undefined);
    columnGap?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "sm" | "md" | "lg" | null>;
    gridAutoRows?: ("auto" | {
        xs?: "auto" | undefined;
        sm?: "auto" | undefined;
        md?: "auto" | undefined;
        lg?: "auto" | undefined;
        xl?: "auto" | undefined;
        xxl?: "auto" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "auto" | null>;
    opacity?: ("0.5" | "0.6" | {
        xs?: "0.5" | "0.6" | undefined;
        sm?: "0.5" | "0.6" | undefined;
        md?: "0.5" | "0.6" | undefined;
        lg?: "0.5" | "0.6" | undefined;
        xl?: "0.5" | "0.6" | undefined;
        xxl?: "0.5" | "0.6" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0.5" | "0.6" | null>;
    lineHeight?: ("16px" | {
        xs?: "16px" | undefined;
        sm?: "16px" | undefined;
        md?: "16px" | undefined;
        lg?: "16px" | undefined;
        xl?: "16px" | undefined;
        xxl?: "16px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "16px" | null>;
    borderBottomColor?: ("white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | {
        xs?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        sm?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        md?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        lg?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        xl?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        xxl?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | null>;
    border?: ("1" | {
        xs?: "1" | undefined;
        sm?: "1" | undefined;
        md?: "1" | undefined;
        lg?: "1" | undefined;
        xl?: "1" | undefined;
        xxl?: "1" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "1" | null>;
    borderBottom?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "1" | null> | ("1" | {
        xs?: "1" | undefined;
        sm?: "1" | undefined;
        md?: "1" | undefined;
        lg?: "1" | undefined;
        xl?: "1" | undefined;
        xxl?: "1" | undefined;
    } | undefined);
    borderLeftRadius?: ("8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | {
        xs?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        sm?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        md?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        lg?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xxl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | null>;
    borderRightRadius?: ("8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | {
        xs?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        sm?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        md?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        lg?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xxl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | null>;
    borderTopRadius?: ("8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | {
        xs?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        sm?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        md?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        lg?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xxl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | null>;
    borderBottomRadius?: ("8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | {
        xs?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        sm?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        md?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        lg?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
        xxl?: "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "8px" | "12px" | "20px" | "32px" | "0" | "small" | "default" | "card" | "circle" | null>;
    mt?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    mb?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null>;
    m?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    ml?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    mr?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    marginX?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    mx?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    marginY?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    my?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | undefined;
    } | undefined);
    pl?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    pr?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    pt?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    pb?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    p?: import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null> | ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined);
    paddingX?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    px?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    paddingY?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    py?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | null>;
    size?: ("0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | {
        xs?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        sm?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        md?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        lg?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        xl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
        xxl?: "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | undefined;
    } | undefined) | import("@vanilla-extract/sprinkles").ResponsiveArray<1 | 5 | 2 | 3 | 4 | 6, "0px" | "1rem" | "1px" | "2px" | "6px" | "4px" | "8px" | "12px" | "14px" | "16px" | "20px" | "24px" | "32px" | "48px" | "56px" | "64px" | "auto" | "fit-content" | "100%" | "420px" | "screenSm" | "screenMd" | "screenLg" | "screenXl" | null>;
} & {
    isolation?: "isolate" | undefined;
    objectFit?: "none" | "contain" | "cover" | undefined;
    pointerEvents?: "none" | undefined;
    textTransform?: "capitalize" | "lowercase" | "uppercase" | undefined;
    cursor?: "default" | "not-allowed" | "pointer" | undefined;
    visibility?: "hidden" | "visible" | undefined;
    whiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap" | undefined;
    wordBreak?: "break-word" | undefined;
    wordWrap?: "normal" | "break-word" | undefined;
} & {
    background?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | {
        base?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        hover?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        focus?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        active?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
    } | undefined;
    backgroundColor?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | {
        base?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        hover?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        focus?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        active?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
    } | undefined;
    borderColor?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | {
        base?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        hover?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        focus?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        active?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
    } | undefined;
    color?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | {
        base?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        hover?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        focus?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        active?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
    } | undefined;
    outlineColor?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | {
        base?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        hover?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        focus?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        active?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
    } | undefined;
    bgc?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | {
        base?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        hover?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        focus?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        active?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
    } | undefined;
    bg?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | {
        base?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        hover?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        focus?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
        active?: "white" | "success" | "warning" | "secondary" | "secondary80" | "background" | "backgroundDisabled" | "backgroundAlt" | "backgroundAlt2" | "cardBorder" | "contrast" | "dropdown" | "dropdownDeep" | "invertedContrast" | "input" | "inputSecondary" | "tertiary" | "text" | "text99" | "textDisabled" | "textSubtle" | "disabled" | "gradientBubblegum" | "gradientInverseBubblegum" | "gradientCardHeader" | "gradientBlue" | "gradientViolet" | "gradientVioletAlt" | "gradientGold" | "gradientBold" | "binance" | "overlay" | "gold" | "silver" | "bronze" | "failure" | "failure33" | "primary" | "primary0f" | "primary3D" | "primaryBright" | "primaryDark" | "success19" | "warning2D" | "warning33" | undefined;
    } | undefined;
}) => string) & {
    properties: Set<"inset" | "background" | "size" | "alignItems" | "alignSelf" | "backgroundColor" | "borderBottomColor" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderTopLeftRadius" | "borderTopRightRadius" | "boxShadow" | "color" | "columnGap" | "cursor" | "display" | "flexDirection" | "flexGrow" | "flexWrap" | "fontSize" | "gridAutoRows" | "height" | "isolation" | "justifyContent" | "justifyItems" | "justifySelf" | "lineHeight" | "marginBottom" | "marginLeft" | "marginRight" | "marginTop" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "objectFit" | "opacity" | "outlineColor" | "overflowX" | "overflowY" | "paddingBottom" | "paddingLeft" | "paddingRight" | "paddingTop" | "pointerEvents" | "position" | "rowGap" | "textAlign" | "textTransform" | "visibility" | "whiteSpace" | "width" | "wordBreak" | "wordWrap" | "zIndex" | "border" | "borderBottom" | "borderColor" | "borderRadius" | "borderTop" | "flex" | "gap" | "margin" | "overflow" | "padding" | "borderLeftRadius" | "borderRightRadius" | "borderTopRadius" | "borderBottomRadius" | "mt" | "mb" | "m" | "ml" | "mr" | "marginX" | "mx" | "marginY" | "my" | "pl" | "pr" | "pt" | "pb" | "p" | "paddingX" | "px" | "paddingY" | "py" | "bgc" | "bg">;
};
export type Sprinkles = Parameters<typeof sprinkles>[0];
export type OptionalResponsiveObject<Value> = Value | Partial<Record<Breakpoint, Value>>;
export type RequiredResponsiveObject<Value> = Partial<Record<Breakpoint, Value>> & Record<(typeof breakpointNames)[0], Value>;
