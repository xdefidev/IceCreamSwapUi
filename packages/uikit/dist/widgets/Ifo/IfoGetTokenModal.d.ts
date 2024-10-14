/// <reference types="react" />
interface Props {
    symbol: string;
    address: string;
    imageSrc: string;
    onDismiss?: () => void;
}
declare const IfoGetTokenModal: React.FC<React.PropsWithChildren<Props>>;
export default IfoGetTokenModal;
