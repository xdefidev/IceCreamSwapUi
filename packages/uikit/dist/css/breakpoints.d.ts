export declare const breakpoints: {
    readonly xs: 370;
    readonly sm: 576;
    readonly md: 852;
    readonly lg: 968;
    readonly xl: 1080;
    readonly xxl: 1200;
};
export declare const mediaQueries: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
};
export type Breakpoint = keyof typeof breakpoints;
export declare const breakpointNames: ("xs" | "sm" | "md" | "lg" | "xl" | "xxl")[];
