/// <reference types="react" />
import { TextProps } from "../Text";
interface BalanceProps extends TextProps {
    value: number;
    decimals?: number;
    unit?: string;
    isDisabled?: boolean;
    prefix?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    strikeThrough?: boolean;
    startFromValue?: boolean;
}
declare const Balance: React.FC<React.PropsWithChildren<BalanceProps>>;
export default Balance;
