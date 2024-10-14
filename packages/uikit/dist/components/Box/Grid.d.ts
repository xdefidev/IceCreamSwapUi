/// <reference types="react" />
import { GridProps } from "./types";
declare const Grid: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<Omit<{
    ref?: import("react").LegacyRef<HTMLDivElement> | undefined;
    key?: import("react").Key | null | undefined;
} & import("./types").BoxProps, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, GridProps>>;
export default Grid;
