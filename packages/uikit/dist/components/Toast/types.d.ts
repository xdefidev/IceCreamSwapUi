import { ReactNode } from "react";
export declare const types: {
    SUCCESS: string;
    DANGER: string;
    WARNING: string;
    INFO: string;
};
export type Types = (typeof types)[keyof typeof types];
export interface ToastData {
    id: string;
    type: Types;
    title: string;
    description?: ReactNode;
}
export interface ToastContainerProps {
    toasts: ToastData[];
    stackSpacing?: number;
    ttl?: number;
    onRemove: (id: string) => void;
}
export interface ToastProps {
    toast: ToastData;
    onRemove: ToastContainerProps["onRemove"];
    ttl: number;
    style: Partial<CSSStyleDeclaration>;
}
