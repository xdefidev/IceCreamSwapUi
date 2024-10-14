/// <reference types="react" />
import { DefaultTheme } from "styled-components";
import { CardProps } from "./types";
interface StyledCardProps extends CardProps {
    theme: DefaultTheme;
}
export declare const StyledCard: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyledCardProps>>;
export declare const StyledCardInner: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<Omit<{
    ref?: import("react").LegacyRef<HTMLDivElement> | undefined;
    key?: import("react").Key | null | undefined;
} & import("../Box").BoxProps, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, {
    background?: string | undefined;
    hasCustomBorder: boolean;
}>>;
export {};
