export interface CollectModalProps {
    formattedBalance: string;
    fullBalance: string;
    earningTokenSymbol: string;
    earningsDollarValue: number;
    sousId: number;
    isBnbPool: boolean;
    onDismiss?: () => void;
    poolAddress?: string;
    earningTokenAddress?: string;
}
export interface CollectModalWithHandlerProps extends Omit<CollectModalProps, "isBnbPool" | "sousId"> {
    handleHarvestConfirm: () => Promise<any>;
    pendingTx: boolean;
}
export declare function CollectModal({ formattedBalance, earningTokenSymbol, earningsDollarValue, onDismiss, handleHarvestConfirm, pendingTx, }: CollectModalWithHandlerProps): import("react/jsx-runtime").JSX.Element;
