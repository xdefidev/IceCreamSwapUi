/// <reference types="react" />
import { DividerFill, ClipFill } from "./types";
interface CurvedDividerProps extends WrapperProps {
    svgFill?: string;
    dividerComponent?: React.ReactNode;
    dividerPosition?: "top" | "bottom";
    concave?: boolean;
    clipFill?: ClipFill;
}
interface WrapperProps {
    index: number;
    dividerFill?: DividerFill;
}
declare const CurvedDivider: React.FC<React.PropsWithChildren<CurvedDividerProps>>;
export default CurvedDivider;
