import { ReactNode } from "react";
import { Currency } from "@pancakeswap/sdk";
interface SwapPendingModalContentProps {
    title: string;
    showIcon?: boolean;
    currencyA: Currency;
    currencyB: Currency;
    amountA: string;
    amountB: string;
    children?: ReactNode;
}
export declare const SwapPendingModalContent: React.FC<SwapPendingModalContentProps>;
export {};
