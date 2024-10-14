import React, { PropsWithChildren } from "react";
import { ModalProps, ModalWrapperProps } from "./types";
export declare const MODAL_SWIPE_TO_CLOSE_VELOCITY = 300;
export declare const ModalWrapper: ({ children, onDismiss, hideCloseButton, ...props }: PropsWithChildren<ModalWrapperProps>) => import("react/jsx-runtime").JSX.Element;
declare const Modal: React.FC<React.PropsWithChildren<ModalProps>>;
export default Modal;
