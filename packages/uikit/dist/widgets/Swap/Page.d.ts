import { ReactNode } from "react";
import { AtomBoxProps } from "../../components/AtomBox";
type SwapPageProps = AtomBoxProps & {
    removePadding?: boolean;
    hideFooterOnDesktop?: boolean;
    noMinHeight?: boolean;
    helpUrl?: string;
    helpImage?: ReactNode;
    externalText?: string;
    externalLinkUrl?: string;
};
export declare const SwapPage: ({ removePadding, noMinHeight, children, hideFooterOnDesktop, helpUrl, helpImage, externalText, externalLinkUrl, ...props }: SwapPageProps) => import("react/jsx-runtime").JSX.Element;
export {};
