/// <reference types="react" />
import { NumericalInputProps } from "./NumericalInput";
interface CurrencyInputPanelProps extends Omit<NumericalInputProps, "onBlur"> {
    onInputBlur?: () => void;
    id: string;
    top?: React.ReactNode;
    bottom?: React.ReactNode;
    showBridgeWarning?: boolean;
}
export declare function CurrencyInputPanel({ value, onUserInput, onInputBlur, top, bottom, id, disabled, error, loading, showBridgeWarning, }: CurrencyInputPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
