import { CSSProperties, ReactElement } from "react";
import { BaseCurrency } from "@pancakeswap/swap-sdk-core";
interface CurrencyLogoPropsType<T> {
    currency?: T;
    size?: string;
    style?: React.CSSProperties;
}
export declare function withCurrencyLogo<T extends BaseCurrency>(CurrencyLogo: (props: CurrencyLogoPropsType<T>) => ReactElement): ({ token, style, dim, onCurrencySelect, list, isActive, children, }: {
    token: T;
    style?: CSSProperties | undefined;
    dim?: boolean | undefined;
    onCurrencySelect?: ((currency: T) => void) | undefined;
    list: any;
    isActive: boolean;
    children: ReactElement;
}) => import("react/jsx-runtime").JSX.Element;
export {};
