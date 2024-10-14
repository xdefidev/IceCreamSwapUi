import { Price, Currency } from "@pancakeswap/swap-sdk-core";
interface TradePriceProps {
    price?: Price<Currency, Currency>;
    loading?: boolean;
}
export declare function TradePrice({ price, loading }: TradePriceProps): import("react/jsx-runtime").JSX.Element;
export {};
