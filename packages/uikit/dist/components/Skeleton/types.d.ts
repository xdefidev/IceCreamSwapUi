/// <reference types="react" />
import { LayoutProps, SpaceProps, BorderRadiusProps } from "styled-system";
export declare const animation: {
    readonly WAVES: "waves";
    readonly PULSE: "pulse";
};
export declare const variant: {
    readonly RECT: "rect";
    readonly ROUND: "round";
    readonly CIRCLE: "circle";
};
export type Animation = (typeof animation)[keyof typeof animation];
export type Variant = (typeof variant)[keyof typeof variant];
export interface SkeletonProps extends SpaceProps, LayoutProps, BorderRadiusProps {
    animation?: Animation;
    variant?: Variant;
    isDark?: boolean;
    style?: React.CSSProperties;
}
export interface SkeletonV2Props extends SpaceProps, LayoutProps, BorderRadiusProps {
    animation?: Animation;
    variant?: Variant;
    isDataReady?: boolean;
    wrapperProps?: SpaceProps & LayoutProps;
    skeletonTop?: string;
    skeletonLeft?: string;
    style?: React.CSSProperties;
}
