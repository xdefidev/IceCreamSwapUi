import { Percent } from "@pancakeswap/swap-sdk-core";
import { ContextApi } from "@pancakeswap/localization";
/**
 * Given the price impact, get user confirmation.
 *
 * @param priceImpactWithoutFee price impact of the trade without the fee.
 * @param t Translation
 */
export declare function confirmPriceImpactWithoutFee(priceImpactWithoutFee: Percent, priceImpactWithoutFeeConfirmMin: Percent, allowedPriceImpactHigh: Percent, t: ContextApi["t"]): boolean;
