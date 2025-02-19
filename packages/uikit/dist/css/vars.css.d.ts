declare const baseVars: {
    fonts: {
        readonly normal: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly mono: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    borderWidths: {
        readonly "0": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "1": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "2": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    radii: {
        readonly "0": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "8px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "12px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "20px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "32px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly small: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly default: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly card: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly circle: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    space: {
        readonly "0px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "1rem": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "1px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "2px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "6px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "4px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "8px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "12px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "14px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "16px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "20px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "24px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "32px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "48px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "56px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "64px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    fontSizes: {
        readonly "10px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "12px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "16px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "14px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "20px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        readonly "40px": `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
    shadows: {
        level1: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        active: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        success: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warning: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        danger: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        focus: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        inset: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        tooltip: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
};
export declare const modeVars: {
    colors: {
        secondary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        secondary80: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        background: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        backgroundDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        backgroundAlt: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        backgroundAlt2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        cardBorder: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        contrast: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        dropdown: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        dropdownDeep: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        invertedContrast: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        input: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        inputSecondary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        tertiary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text99: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        textDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        textSubtle: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        disabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientBubblegum: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientInverseBubblegum: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientCardHeader: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientBlue: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientViolet: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientVioletAlt: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientGold: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientBold: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        binance: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        overlay: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gold: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        silver: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        bronze: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        white: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        failure: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        failure33: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primary0f: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primary3D: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primaryBright: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primaryDark: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        success: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        success19: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warning: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warning2D: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warning33: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    } | {
        secondary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        secondary80: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        background: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        backgroundDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        backgroundAlt: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        backgroundAlt2: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        cardBorder: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        contrast: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        dropdown: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        dropdownDeep: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        invertedContrast: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        input: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        inputSecondary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primaryDark: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        tertiary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        text99: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        textDisabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        textSubtle: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        disabled: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientBubblegum: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientInverseBubblegum: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientCardHeader: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientBlue: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientViolet: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientVioletAlt: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientGold: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gradientBold: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        binance: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        overlay: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        gold: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        silver: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        bronze: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        white: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        failure: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        failure33: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primary: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primary0f: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primary3D: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        primaryBright: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        success: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        success19: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warning: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warning2D: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
        warning33: `var(--${string})` | `var(--${string}, ${string})` | `var(--${string}, ${number})`;
    };
};
type BaseVars = typeof baseVars;
type ModeVars = typeof modeVars;
type Vars = BaseVars & ModeVars;
export declare const vars: Vars;
export {};
