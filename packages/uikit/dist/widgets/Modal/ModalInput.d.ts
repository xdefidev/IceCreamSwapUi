/// <reference types="react" />
import BigNumber from "bignumber.js";
interface ModalInputProps {
    max: string;
    maxAmount?: BigNumber;
    symbol: string;
    onSelectMax?: () => void;
    onPercentInput?: (percent: number) => void;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value: string;
    valueUSDPrice?: BigNumber;
    addLiquidityUrl?: string;
    inputTitle?: string;
    decimals?: number;
    needEnable?: boolean;
}
declare const ModalInput: React.FC<React.PropsWithChildren<ModalInputProps>>;
export default ModalInput;
