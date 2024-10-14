import BigNumber from "bignumber.js";
export declare const MIN_LOCK_AMOUNT: BigNumber;
export declare const ENABLE_EXTEND_LOCK_AMOUNT: BigNumber;
export declare const convertSharesToCake: (shares: BigNumber, cakePerFullShare: BigNumber, decimals?: number, decimalsToRound?: number, fee?: BigNumber) => {
    cakeAsNumberBalance: number;
    cakeAsBigNumber: BigNumber;
    cakeAsDisplayBalance: string;
};
export declare const getCakeVaultEarnings: (account: string, cakeAtLastUserAction: BigNumber, userShares: BigNumber, pricePerFullShare: BigNumber, earningTokenPrice: number, fee?: BigNumber) => {
    hasAutoEarnings: boolean | "";
    autoCakeToDisplay: number;
    autoUsdToDisplay: number;
};
export default getCakeVaultEarnings;
