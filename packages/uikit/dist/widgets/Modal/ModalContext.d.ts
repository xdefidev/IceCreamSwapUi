import React from "react";
import { Handler } from "./types";
interface ModalsContext {
    isOpen: boolean;
    nodeId: string;
    modalNode: React.ReactNode;
    setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    onPresent: (node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => void;
    onDismiss: Handler;
}
export declare const StyledModalWrapper: import("framer-motion").ForwardRefComponent<HTMLDivElement, import("framer-motion").HTMLMotionProps<"div">>;
export declare const Context: React.Context<ModalsContext>;
declare const ModalProvider: React.FC<React.PropsWithChildren>;
export declare const useModalContext: () => ModalsContext;
export default ModalProvider;
