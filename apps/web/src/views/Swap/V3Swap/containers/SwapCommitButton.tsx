import { useTranslation } from '@pancakeswap/localization'
import { Percent, TradeType } from '@pancakeswap/sdk'
import {
  Button,
  Text,
  useModal,
  confirmPriceImpactWithoutFee,
  Box,
  Message,
  MessageText,
  AutoColumn,
  Dots,
} from '@pancakeswap/uikit'
import { useCallback, useEffect, useState, memo } from 'react'
import { SMART_ROUTER_ADDRESSES, SmartRouterTrade } from '@pancakeswap/smart-router/evm'
import { logGTMClickSwapEvent } from 'utils/customGTMEventTracking'

import { useIsTransactionUnsupported } from 'hooks/Trades'
import { GreyCard } from 'components/Card'
import { CommitButton } from 'components/CommitButton'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { AutoRow } from 'components/Layout/Row'
import SettingsModal, { RoutingSettingsButton, withCustomOnDismiss } from 'components/Menu/GlobalSettings/SettingsModal'
import { SettingsMode } from 'components/Menu/GlobalSettings/types'
import {
  BIG_INT_ZERO,
  PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN,
  ALLOWED_PRICE_IMPACT_HIGH,
} from 'config/constants/exchange'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { Field } from 'state/swap/actions'
import { useExpertMode } from '@pancakeswap/utils/user'
import { warningSeverity } from 'utils/exchange'
import { useSwapState } from 'state/swap/hooks'
import { useCurrency } from 'hooks/Tokens'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { useCurrencyBalances } from 'state/wallet/hooks'
import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { useRoutingSettingChanged } from 'state/user/smartRouter'

import { useAccount } from 'wagmi'
import { useSlippageAdjustedAmounts, useSwapInputError, useParsedAmounts, useSwapCallback } from '../hooks'
import { ConfirmSwapModal } from './ConfirmSwapModal'
import { useTradePriceBreakdown } from "hooks/useTradePriceBreakdown";

const SettingsModalWithCustomDismiss = withCustomOnDismiss(SettingsModal)

interface SwapCommitButtonPropsType {
  trade?: SmartRouterTrade<TradeType>
  tradeError?: Error
  tradeLoading?: boolean
}

export const SwapCommitButton = memo(function SwapCommitButton({
  trade,
  tradeError,
  tradeLoading,
}: SwapCommitButtonPropsType) {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const [isExpertMode] = useExpertMode()
  const {
    typedValue,
    independentField,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)
  const swapIsUnsupported = useIsTransactionUnsupported(inputCurrency, outputCurrency)
  const { onUserInput } = useSwapActionHandlers()
  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(inputCurrency, outputCurrency, typedValue)
  const showWrap = wrapType !== WrapType.NOT_APPLICABLE
  const [isRoutingSettingChange, resetRoutingSetting] = useRoutingSettingChanged()
  const slippageAdjustedAmounts = useSlippageAdjustedAmounts(trade)
  const routerAddress = SMART_ROUTER_ADDRESSES[trade?.inputAmount?.currency?.chainId]
  const amountToApprove = slippageAdjustedAmounts[Field.INPUT]
  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ])
  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  }
  // check whether the user has approved the router on the input token
  const { approvalState, approveCallback, revokeCallback, currentAllowance, isPendingError } = useApproveCallback(
    amountToApprove,
    routerAddress,
  )
  const { priceImpactWithoutFee } = useTradePriceBreakdown(!showWrap ? trade : null)
  const swapInputError = useSwapInputError(trade, currencyBalances)
  const parsedAmounts = useParsedAmounts(trade, currencyBalances, showWrap)
  const parsedIndepentFieldAmount = parsedAmounts[independentField]

  // the callback to execute the swap
  const deadline = useTransactionDeadline()
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback({
    trade,
    deadline,
    ...(trade?.fee &&
      trade?.treasury_address && {
        feeOptions: {
          fee: new Percent(Math.round(trade.fee * 10_000), 10_000),
          recipient: trade.treasury_address
        },
      }),
  })

  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: SmartRouterTrade<TradeType> | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // Handlers
  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash, setSwapState])

  const handleSwap = useCallback(() => {
    if (
      priceImpactWithoutFee &&
      !confirmPriceImpactWithoutFee(
        priceImpactWithoutFee,
        PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN,
        ALLOWED_PRICE_IMPACT_HIGH,
        t,
      )
    ) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then((res) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: res.hash })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: typeof error === 'string' ? error : error.message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, tradeToConfirm, t, swapCallback])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({ tradeToConfirm: trade, swapErrorMessage, txHash, attemptingTxn })
  }, [attemptingTxn, swapErrorMessage, trade, txHash, setSwapState])
  // End Handlers

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee)

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED ||
      approvalState === ApprovalState.PENDING ||
      (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  // Modals
  const [indirectlyOpenConfirmModalState, setIndirectlyOpenConfirmModalState] = useState(false)

  const [onPresentSettingsModal] = useModal(
    <SettingsModalWithCustomDismiss
      customOnDismiss={() => setIndirectlyOpenConfirmModalState(true)}
      mode={SettingsMode.SWAP_LIQUIDITY}
    />,
  )

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      txHash={txHash}
      approval={approvalState}
      attemptingTxn={attemptingTxn}
      originalTrade={tradeToConfirm}
      isPendingError={isPendingError}
      showApproveFlow={showApproveFlow}
      currencyBalances={currencyBalances}
      swapErrorMessage={swapErrorMessage}
      currentAllowance={currentAllowance}
      onConfirm={handleSwap}
      approveCallback={approveCallback}
      revokeCallback={revokeCallback}
      onAcceptChanges={handleAcceptChanges}
      customOnDismiss={handleConfirmDismiss}
      openSettingModal={onPresentSettingsModal}
    />,
    true,
    true,
    'confirmSwapModal',
  )
  // End Modals

  const onSwapHandler = useCallback(() => {
    setSwapState({
      tradeToConfirm: trade,
      attemptingTxn: false,
      swapErrorMessage: undefined,
      txHash: undefined,
    })
    onPresentConfirmModal()
    logGTMClickSwapEvent()
  }, [trade, onPresentConfirmModal])

  // useEffect
  useEffect(() => {
    if (indirectlyOpenConfirmModalState) {
      setIndirectlyOpenConfirmModalState(false)
      setSwapState((state) => ({
        ...state,
        swapErrorMessage: undefined,
      }))
      onPresentConfirmModal()
    }
  }, [indirectlyOpenConfirmModalState, onPresentConfirmModal, setSwapState])

  // Reset approval flow if input currency changed
  useEffect(() => {
    setApprovalSubmitted(false)
  }, [trade?.inputAmount?.currency])

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted])

  if (swapIsUnsupported) {
    return (
      <Button width="100%" disabled>
        {t('Unsupported Asset')}
      </Button>
    )
  }

  if (!account) {
    return <ConnectWalletButton width="100%" />
  }

  if (showWrap) {
    return (
      <CommitButton width="100%" disabled={Boolean(wrapInputError)} onClick={onWrap}>
        {wrapInputError ?? (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)}
      </CommitButton>
    )
  }

  const noRoute = !(trade?.routes?.length > 0) || tradeError

  const userHasSpecifiedInputOutput = Boolean(
    inputCurrency && outputCurrency && parsedIndepentFieldAmount?.greaterThan(BIG_INT_ZERO),
  )

  if (noRoute && userHasSpecifiedInputOutput && !tradeLoading) {
    return (
      <AutoColumn gap="12px">
        <GreyCard style={{ textAlign: 'center', padding: '0.75rem' }}>
          <Text color="textSubtle">{t('Insufficient liquidity for this trade.')}</Text>
        </GreyCard>
        {isRoutingSettingChange && (
          <Message variant="warning" icon={<></>}>
            <AutoColumn gap="8px">
              <MessageText>{t('Unable to establish trading route due to customized routing.')}</MessageText>
              <AutoRow gap="4px">
                <RoutingSettingsButton
                  buttonProps={{
                    scale: 'xs',
                    p: 0,
                  }}
                  showRedDot={false}
                >
                  {t('Check your settings')}
                </RoutingSettingsButton>
                <MessageText>{t('or')}</MessageText>
                <Button variant="text" scale="xs" p="0" onClick={resetRoutingSetting}>
                  {t('Reset to default')}
                </Button>
              </AutoRow>
            </AutoColumn>
          </Message>
        )}
      </AutoColumn>
    )
  }

  const isValid = !swapInputError && !tradeLoading

  return (
    <Box mt="0.25rem">
      <CommitButton
        id="swap-button"
        width="100%"
        variant={isValid && priceImpactSeverity > 2 && !swapCallbackError ? 'danger' : 'primary'}
        disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
        onClick={() => onSwapHandler()}
      >
        {swapInputError ||
          (tradeLoading && <Dots>{t('Searching For The Best Price')}</Dots>) ||
          (priceImpactSeverity > 3 && !isExpertMode
            ? t('Price Impact Too High')
            : priceImpactSeverity > 2
              ? t('Swap Anyway')
              : t('Swap'))}
      </CommitButton>
    </Box>
  )
})
