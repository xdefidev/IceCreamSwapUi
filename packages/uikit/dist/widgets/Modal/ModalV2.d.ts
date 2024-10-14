import React from "react";
import { BoxProps } from "../../components/Box";
export interface ModalV2Props {
    isOpen?: boolean;
    onDismiss?: () => void;
    closeOnOverlayClick?: boolean;
    children?: React.ReactNode;
}
export declare const ModalV2Context: React.Context<{
    onDismiss?: (() => void) | undefined;
}>;
export type UseModalV2Props = ReturnType<typeof useModalV2>;
export declare function useModalV2(): {
    onDismiss: () => void;
    onOpen: () => void;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare function ModalV2({ isOpen, onDismiss, closeOnOverlayClick, children, disableOutsidePointerEvents, ...props }: ModalV2Props & BoxProps & {
    disableOutsidePointerEvents?: boolean;
}): React.ReactPortal | null;
