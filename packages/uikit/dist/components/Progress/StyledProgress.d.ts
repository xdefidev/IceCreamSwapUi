/// <reference types="react" />
import { ProgressProps } from "./types";
interface ProgressBarProps {
    primary?: boolean;
    $useDark: boolean;
    $background?: string;
}
export declare const Bar: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ProgressBarProps>>;
interface StyledProgressProps {
    variant: ProgressProps["variant"];
    scale: ProgressProps["scale"];
    $useDark: boolean;
}
declare const StyledProgress: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyledProgressProps>>;
export default StyledProgress;
