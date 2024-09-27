import { Currency, CurrencyAmount, TradeType, Percent, ONE_HUNDRED_PERCENT } from '@pancakeswap/sdk'
import { SmartRouterTrade, SmartRouter } from '@pancakeswap/smart-router/evm'
import { FeeAmount } from '@pancakeswap/v3-sdk'

import { BIPS_BASE, INPUT_FRACTION_AFTER_FEE } from 'config/constants/exchange'
import {useStablecoinPrice} from "hooks/useBUSDPrice";

// computes price breakdown for the trade based on $ value change
export function useTradePriceBreakdown(trade?: SmartRouterTrade<TradeType> | null): {
    priceImpactWithoutFee?: Percent | null
    lpFeeAmount?: CurrencyAmount<Currency> | null
} {
    const tokenInPrice = useStablecoinPrice(trade?.inputAmount?.currency, {hideIfPriceImpactTooHigh: true})
    const tokenOutPrice = useStablecoinPrice(trade?.outputAmount?.currency, {hideIfPriceImpactTooHigh: true})

    if (!trade) {
        return {
            priceImpactWithoutFee: undefined,
            lpFeeAmount: null,
        }
    }

    const { routes, outputAmount, inputAmount } = trade
    let feePercent = new Percent(0)
    for (const route of routes) {
        const { pools, percent } = route
        const routeFeePercent = ONE_HUNDRED_PERCENT.subtract(
            pools.reduce<Percent>((currentFee, pool) => {
                if (SmartRouter.isV2Pool(pool)) {
                    return currentFee.multiply(INPUT_FRACTION_AFTER_FEE)
                }
                if (SmartRouter.isStablePool(pool)) {
                    return currentFee.multiply(ONE_HUNDRED_PERCENT.subtract(pool.fee))
                }
                if (SmartRouter.isV3Pool(pool)) {
                    return currentFee.multiply(ONE_HUNDRED_PERCENT.subtract(v3FeeToPercent(pool.fee)))
                }
                return currentFee
            }, ONE_HUNDRED_PERCENT),
        )
        // Not accurate since for stable swap, the lp fee is deducted on the output side
        feePercent = feePercent.add(routeFeePercent.multiply(new Percent(percent, 100)))

    }

    const lpFeeAmount = inputAmount.multiply(feePercent)

    if (!tokenInPrice || !tokenOutPrice) {
        return {
            priceImpactWithoutFee: new Percent(0, 100),
            lpFeeAmount,
        }
    }

    const valueInUsd = tokenInPrice.quote(inputAmount)
    const valueOutUsd = tokenOutPrice.quote(outputAmount)
    const priceImpactRaw = valueInUsd.subtract(valueOutUsd).divide(valueInUsd)
    const priceImpactPercent = new Percent(priceImpactRaw.numerator, priceImpactRaw.denominator)
    const priceImpactWithoutFee = priceImpactPercent.subtract(feePercent)

    return {
        priceImpactWithoutFee,
        lpFeeAmount,
    }
}
export function v3FeeToPercent(fee: FeeAmount): Percent {
    return new Percent(fee, BIPS_BASE * 100n)
}
