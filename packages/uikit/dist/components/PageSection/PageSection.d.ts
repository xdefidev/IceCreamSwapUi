/// <reference types="react" />
import { BoxProps, FlexProps } from "../Box";
import { ClipFill, DividerFill } from "./types";
interface PageSectionProps extends BackgroundColorProps {
    svgFill?: string;
    dividerComponent?: React.ReactNode;
    hasCurvedDivider?: boolean;
    dividerPosition?: "top" | "bottom";
    concaveDivider?: boolean;
    containerProps?: BoxProps;
    innerProps?: BoxProps;
    clipFill?: ClipFill;
    dividerFill?: DividerFill;
}
interface BackgroundColorProps extends FlexProps {
    index: number;
    padding?: string;
}
declare const PageSection: React.FC<React.PropsWithChildren<PageSectionProps>>;
export default PageSection;
