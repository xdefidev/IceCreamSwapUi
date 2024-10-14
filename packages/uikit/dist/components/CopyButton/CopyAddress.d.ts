/// <reference types="react" />
import { FlexProps } from "../Box";
interface CopyAddressProps extends FlexProps {
    account: string;
    tooltipMessage: string;
}
export declare const CopyAddress: React.FC<React.PropsWithChildren<CopyAddressProps>>;
export {};
