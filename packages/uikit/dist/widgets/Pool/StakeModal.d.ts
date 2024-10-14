/// <reference types="react" />
import BigNumber from "bignumber.js";
interface StakeModalProps {
    stakingTokenDecimals: number;
    stakingTokenSymbol: string;
    stakingTokenAddress: string;
    earningTokenPrice: number;
    apr: number;
    stakingLimit: BigNumber;
    earningTokenSymbol: string;
    userDataStakedBalance: BigNumber;
    userDataStakingTokenBalance: BigNumber;
    enableEmergencyWithdraw: boolean;
    stakingTokenBalance: BigNumber;
    stakingTokenPrice: number;
    isRemovingStake?: boolean;
    needEnable?: boolean;
    enablePendingTx?: boolean;
    setAmount?: (value: string) => void;
    onDismiss?: () => void;
    handleEnableApprove?: () => void;
    account: string;
    handleConfirmClick: any;
    pendingTx: boolean;
    imageUrl?: string;
    warning?: React.ReactElement;
}
export declare const StakeModal: React.FC<React.PropsWithChildren<StakeModalProps>>;
export {};
