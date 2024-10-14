import { HarvestActionsProps } from "../types";
export declare const withStakeActionContainer: (StakeActionsComp: any, connectWalletButtonElement: any) => ({ account, stakingTokenSymbol, ...props }: {
    account?: string | undefined;
    stakingTokenSymbol?: string | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export declare function HarvestAction({ earningTokenPrice, onPresentCollect, account, earningTokenBalance, earningTokenDollarBalance, earningTokenSymbol, earnings, }: HarvestActionsProps & {
    account: string;
    earningTokenSymbol: string;
}): import("react/jsx-runtime").JSX.Element;
