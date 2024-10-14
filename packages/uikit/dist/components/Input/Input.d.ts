/// <reference types="react" />
import { InputProps } from "./types";
declare const Input: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & {
    ref?: ((instance: HTMLInputElement | null) => void) | import("react").RefObject<HTMLInputElement> | null | undefined;
}, InputProps>>;
export default Input;
