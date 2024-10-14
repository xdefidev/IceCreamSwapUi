import { ElementType } from "react";
import { SvgProps } from "../Svg";
interface CopyButtonProps extends SvgProps {
    text: string;
    tooltipMessage: string;
    buttonColor?: string;
    icon?: ElementType;
}
export declare const CopyButton: React.FC<React.PropsWithChildren<CopyButtonProps>>;
export {};
