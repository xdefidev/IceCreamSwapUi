/// <reference types="react" />
import { SpaceProps } from "styled-system";
import { CardTheme } from "./types";
export interface CardHeaderProps extends SpaceProps {
    variant?: keyof CardTheme["cardHeaderBackground"];
}
declare const CardHeader: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, CardHeaderProps>>;
export default CardHeader;
