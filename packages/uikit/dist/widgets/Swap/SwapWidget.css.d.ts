import { RecipeVariants } from "@vanilla-extract/recipes";
export declare const inputVariants: import("@vanilla-extract/recipes").RuntimeFn<{
    error: {
        true: {
            color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
    loading: {
        true: {
            color: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        };
    };
    align: {
        left: {
            textAlign: "left";
        };
        center: {
            textAlign: "center";
        };
        right: {
            textAlign: "right";
        };
    };
}>;
export type InputVariants = RecipeVariants<typeof inputVariants>;
export declare const inputContainerVariants: import("@vanilla-extract/recipes").RuntimeFn<{
    error: {
        true: string;
        false: string;
    };
    showBridgeWarning: {
        true: string;
    };
}>;
export declare const pageVariants: import("@vanilla-extract/recipes").RuntimeFn<{
    removePadding: {
        true: {
            padding: "0!important";
        };
    };
    noMinHeight: {
        true: import("@vanilla-extract/css").StyleRule;
    };
}>;
export type PageVariants = RecipeVariants<typeof pageVariants>;
export declare const iconButtonClass: string;
