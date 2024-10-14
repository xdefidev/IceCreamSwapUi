/// <reference types="react" />
import { BaseButtonProps } from "./types";
declare const StyledButton: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<Omit<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, "ref"> & {
    ref?: ((instance: HTMLButtonElement | null) => void) | import("react").RefObject<HTMLButtonElement> | null | undefined;
}, BaseButtonProps>>;
export default StyledButton;
