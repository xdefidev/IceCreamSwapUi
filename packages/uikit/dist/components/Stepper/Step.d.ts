import React from "react";
import { StatusProps, StepProps } from "./types";
export declare const StepNumber: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StatusProps>>;
/**
 * ChildrenLeftWrapper and ChildrenRightWrapper are used on the non mobile version, to force the alternate layout.
 * One of the child is hidden based on the step number.
 */
export declare const Step: React.FC<React.PropsWithChildren<StepProps>>;
