import { RecipeVariants } from "@vanilla-extract/recipes";
export declare const rowVariants: import("@vanilla-extract/recipes").RuntimeFn<{
    gap: {
        sm: {
            rowGap: "8px";
        };
        md: {
            rowGap: "12px";
        };
        lg: {
            rowGap: "24px";
        };
    };
}>;
export type Variants = RecipeVariants<typeof rowVariants>;
