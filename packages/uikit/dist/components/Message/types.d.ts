import React from "react";
import { SpaceProps } from "styled-system";
export declare const variants: {
    readonly WARNING: "warning";
    readonly DANGER: "danger";
    readonly SUCCESS: "success";
    readonly INFO: "info";
    readonly PRIMARY: "primary";
};
export type Variant = (typeof variants)[keyof typeof variants];
export interface MessageProps extends SpaceProps {
    variant: Variant;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    actionInline?: boolean;
}
