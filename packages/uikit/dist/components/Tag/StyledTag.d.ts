/// <reference types="react" />
import { DefaultTheme } from "styled-components";
import { TagProps } from "./types";
interface ThemedProps extends TagProps {
    theme: DefaultTheme;
}
export declare const StyledTag: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ThemedProps>>;
declare const _default: null;
export default _default;
