/// <reference types="react" />
import { SvgProps } from "./types";
declare const Svg: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<Omit<import("react").SVGProps<SVGSVGElement>, "ref"> & {
    ref?: ((instance: SVGSVGElement | null) => void) | import("react").RefObject<SVGSVGElement> | null | undefined;
}, SvgProps>>;
export default Svg;
