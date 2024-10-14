/// <reference types="react" />
import { Placement } from "../../hooks";
import { BoxProps } from "../Box";
interface Props extends BoxProps {
    text: string | React.ReactNode;
    placement?: Placement;
    size?: string;
    color?: string;
}
export declare const QuestionHelper: React.FC<React.PropsWithChildren<Props>>;
export {};
