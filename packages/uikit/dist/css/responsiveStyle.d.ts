import { StyleRule } from "@vanilla-extract/css";
type CSSProps = Omit<StyleRule, "@media" | "@supports">;
type ResponsiveStyle = {
    xs?: CSSProps;
    sm?: CSSProps;
    md?: CSSProps;
    lg?: CSSProps;
    xl?: CSSProps;
    xxl?: CSSProps;
};
export declare const responsiveStyle: ({ xs, sm, md, lg, xl, xxl }: ResponsiveStyle) => StyleRule;
export {};
