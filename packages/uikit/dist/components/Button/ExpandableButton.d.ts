import React from "react";
interface Props {
    onClick?: () => void;
    expanded?: boolean;
}
export declare const ExpandableButton: React.FC<React.PropsWithChildren<Props>>;
export declare const ExpandableLabel: React.FC<React.PropsWithChildren<Props>>;
export {};
