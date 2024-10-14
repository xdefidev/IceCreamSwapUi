import { RecipeVariants } from "@vanilla-extract/recipes";
export declare const severityVariants: import("@vanilla-extract/recipes").RuntimeFn<{
    severity: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
    };
}>;
export type SeverityVariants = RecipeVariants<typeof severityVariants>;
