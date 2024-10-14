/// <reference types="react" />
import { InjectedModalProps } from "../Modal";
interface ExpertModalProps extends InjectedModalProps {
    setShowConfirmExpertModal: (show: boolean) => void;
    setShowExpertModeAcknowledgement: (show: boolean) => void;
    toggleExpertMode: () => void;
}
export declare const ExpertModal: React.FC<React.PropsWithChildren<ExpertModalProps>>;
export {};
