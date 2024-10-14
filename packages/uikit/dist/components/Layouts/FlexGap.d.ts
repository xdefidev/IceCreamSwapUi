/// <reference types="react" />
import { FlexProps } from "../Box";
export interface FlexGapProps extends FlexProps {
    gap?: string;
    rowGap?: string;
    columnGap?: string;
}
declare const FlexGap: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<{
    key?: import("react").Key | null | undefined;
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
} & FlexProps, FlexGapProps>>;
export default FlexGap;
