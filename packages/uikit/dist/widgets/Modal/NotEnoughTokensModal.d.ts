/// <reference types="react" />
interface NotEnoughTokensModalProps {
    tokenSymbol: string;
    tokenAddress?: string;
    onDismiss?: () => void;
    hideLocateAddress?: boolean;
}
declare const NotEnoughTokensModal: React.FC<React.PropsWithChildren<NotEnoughTokensModalProps>>;
export default NotEnoughTokensModal;
