import { PropsWithChildren, ReactNode } from "react";
import { TextProps } from "../../components";
type SwapInfoType = {
    price: ReactNode;
    allowedSlippage?: number;
    onSlippageClick?: () => void;
    allowedSlippageSlot?: React.ReactNode;
};
export declare const SwapInfoLabel: (props: PropsWithChildren<TextProps>) => import("react/jsx-runtime").JSX.Element;
export declare const SwapInfo: ({ allowedSlippage, price, onSlippageClick, allowedSlippageSlot }: SwapInfoType) => import("react/jsx-runtime").JSX.Element;
export {};
