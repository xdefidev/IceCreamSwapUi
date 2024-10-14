/// <reference types="react" />
import BigNumber from "bignumber.js";
interface IfoVestingAvailableToClaimProps {
    amountToReceive: BigNumber;
    percentage: number;
    decimals: number;
    displayDecimals: number;
}
declare const IfoVestingAvailableToClaim: React.FC<React.PropsWithChildren<IfoVestingAvailableToClaimProps>>;
export default IfoVestingAvailableToClaim;
