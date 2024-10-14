import { ReactNode } from "react";
import { Currency, CurrencyAmount } from "@pancakeswap/sdk";
interface Props {
    value: string | number;
    onChange: (val: string) => void;
    currency?: Currency;
    balance?: CurrencyAmount<Currency>;
    balanceText?: ReactNode;
    maxText?: ReactNode;
}
export declare function CurrencyInput({ currency, balance, value, onChange, balanceText, maxText }: Props): import("react/jsx-runtime").JSX.Element;
export {};
