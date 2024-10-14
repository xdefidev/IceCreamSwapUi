import React from "react";
type State = {
    [key: string]: boolean;
};
export type BreakpointChecks = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
} & State;
export declare const MatchBreakpointsContext: React.Context<BreakpointChecks>;
export declare const getBreakpointChecks: (state: State) => BreakpointChecks;
export declare const MatchBreakpointsProvider: React.FC<React.PropsWithChildren>;
export {};
