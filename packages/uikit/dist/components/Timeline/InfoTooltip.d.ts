/// <reference types="react" />
import { BoxProps } from "../Box";
type InfoTooltip = {
    text: string;
    iconColor?: string;
} & BoxProps;
declare const InfoTooltip: React.FC<React.PropsWithChildren<InfoTooltip>>;
export default InfoTooltip;
