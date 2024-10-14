/// <reference types="react" />
import { BoxProps } from "../Box";
export interface SelectProps extends BoxProps {
    options: OptionProps[];
    onOptionChange?: (option: OptionProps) => void;
    placeHolderText?: string;
    defaultOptionIndex?: number;
    value?: any;
}
export interface OptionProps {
    label: React.ReactNode;
    value: any;
}
declare const Select: React.FunctionComponent<React.PropsWithChildren<SelectProps>>;
export default Select;
