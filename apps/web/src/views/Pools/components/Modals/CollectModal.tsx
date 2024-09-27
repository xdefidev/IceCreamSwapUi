import { useCallback } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { Pool, useToast } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import { useAppDispatch } from 'state'
import { updateUserBalance, updateUserPendingReward, updateUserStakedBalance } from 'state/pools'

import useHarvestPool from '../../hooks/useHarvestPool'
import { useActiveChainId } from '../../../../hooks/useActiveChainId'

export const CollectModalContainer = ({
  earningTokenSymbol,
  sousId,
  isBnbPool,
  onDismiss,
  ...rest
}: React.PropsWithChildren<Pool.CollectModalProps>) => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { chainId } = useActiveChainId()
  const { address: account } = useAccount()
  const dispatch = useAppDispatch()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { onReward } = useHarvestPool(sousId, isBnbPool)

  const handleHarvestConfirm = useCallback(async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onReward()
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Harvested')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your %symbol% earnings have been sent to your wallet!', { symbol: earningTokenSymbol })}
        </ToastDescriptionWithTx>,
      )
      dispatch(updateUserStakedBalance({ sousId, account, chainId }))
      dispatch(updateUserPendingReward({ sousId, account, chainId }))
      dispatch(updateUserBalance({ sousId, account, chainId }))
      onDismiss?.()
    }
  }, [
    account,
    dispatch,
    earningTokenSymbol,
    fetchWithCatchTxError,
    onDismiss,
    onReward,
    sousId,
    t,
    toastSuccess,
    chainId,
  ])

  return (
    <Pool.CollectModal
      earningTokenSymbol={earningTokenSymbol}
      onDismiss={onDismiss}
      handleHarvestConfirm={handleHarvestConfirm}
      pendingTx={pendingTx}
      {...rest}
    />
  )
}

export default CollectModalContainer
