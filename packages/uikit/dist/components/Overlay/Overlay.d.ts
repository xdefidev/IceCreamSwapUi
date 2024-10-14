/// <reference types="react" />
import { BoxProps } from "../Box";
interface OverlayProps extends BoxProps {
    isUnmounting?: boolean;
}
export declare const Overlay: React.FC<React.PropsWithChildren<OverlayProps>>;
export default Overlay;
