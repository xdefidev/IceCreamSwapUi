/// <reference types="react" />
import { BoxProps } from "../Box";
export interface PageHeaderProps extends BoxProps {
    background?: string;
    extra?: React.ReactNode;
}
