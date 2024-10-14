import BigNumber from "bignumber.js";
import { ReactElement } from "react";
import { CollectModalProps } from "./CollectModal";
interface WithHarvestActionsProps {
    earnings: BigNumber;
    earningTokenSymbol: string;
    sousId: number;
    isBnbPool: boolean;
    earningTokenPrice: number;
    isLoading?: boolean;
    earningTokenDecimals: number;
    earningTokenAddress?: string;
    poolAddress?: string;
}
export declare const withCollectModalTableAction: (CollectModalComponent: (props: CollectModalProps) => ReactElement) => ({ earnings, earningTokenSymbol, earningTokenAddress, earningTokenDecimals, sousId, isBnbPool, earningTokenPrice, isLoading, poolAddress, ...props }: WithHarvestActionsProps) => import("react/jsx-runtime").JSX.Element;
export declare const withCollectModalCardAction: (CollectModalComponent: (props: CollectModalProps) => ReactElement) => ({ earnings, earningTokenSymbol, earningTokenAddress, earningTokenDecimals, sousId, isBnbPool, earningTokenPrice, isLoading, poolAddress, ...props }: WithHarvestActionsProps) => import("react/jsx-runtime").JSX.Element;
export {};
