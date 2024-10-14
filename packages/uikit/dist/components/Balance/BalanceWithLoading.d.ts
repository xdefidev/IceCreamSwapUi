/// <reference types="react" />
import { TextProps } from "../Text";
interface BalanceProps extends TextProps {
    value: number;
    decimals?: number;
    unit?: string;
    isDisabled?: boolean;
    prefix?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
declare const BalanceWithLoading: React.FC<React.PropsWithChildren<Omit<BalanceProps, "value"> & {
    value: string | number;
}>>;
export default BalanceWithLoading;
