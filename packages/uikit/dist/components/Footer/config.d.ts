/// <reference types="react" />
import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
export declare const footerLinks: FooterLinkType[];
export declare const socials: ({
    label: string;
    icon: import("react").FC<import("react").PropsWithChildren<import("../Svg").SvgProps>>;
    href: string;
    items?: undefined;
} | {
    label: string;
    icon: import("react").FC<import("react").PropsWithChildren<import("../Svg").SvgProps>>;
    items: {
        label: string;
        href: string;
    }[];
    href?: undefined;
})[];
export declare const langs: Language[];
