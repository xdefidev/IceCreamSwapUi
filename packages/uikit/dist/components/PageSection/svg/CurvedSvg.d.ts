/// <reference types="react" />
import { ClipFill } from "../types";
interface CurveProps {
    clipFill?: ClipFill;
}
export declare const ConvexTop: React.FC<React.PropsWithChildren<CurveProps>>;
export declare const ConvexBottom: React.FC<React.PropsWithChildren<CurveProps>>;
export declare const ConcaveTop: React.FC<React.PropsWithChildren<CurveProps>>;
export declare const ConcaveBottom: React.FC<React.PropsWithChildren<CurveProps>>;
export {};
