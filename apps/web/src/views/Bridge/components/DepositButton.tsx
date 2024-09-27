import { Button, useModal } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useEffect } from 'react'
import { useBridge } from '../BridgeProvider'
import { useDeposit } from '../hooks/useDeposit'
import DepositModal from './DepositModal'
import { useTranslation } from '@pancakeswap/localization'

interface DepositButtonProps {
  validateForm: () => Promise<boolean>
  setHasSubmitted: (hasSubmitted: boolean) => void
  nativeFeeWei: bigint
}

const DepositButton: React.FC<DepositButtonProps> = (props) => {
  const { t } = useTranslation()
  const { validateForm, setHasSubmitted, nativeFeeWei } = props
  const { account } = useWeb3React()

  const bridge = useBridge()
  const { deposit, approve } = useDeposit(nativeFeeWei)

  const [onPresentDepositModal, , isOpen] = useModal(
    <DepositModal bridge={bridge as any} deposit={deposit} approve={approve} />,
    true,
    true,
    'bridgeDepositModal',
  )

  const { setTransactionStatus } = bridge
  useEffect(() => {
    if (!isOpen) {
      setTransactionStatus(null)
    }
  }, [isOpen, setTransactionStatus])

  if (!account) return <ConnectWalletButton />

  return (
    <Button
      onClick={() => {
        validateForm().then((isValid) => {
          if (isValid) {
            setTransactionStatus(null)
            onPresentDepositModal()
          }
        })
        setHasSubmitted(true)
      }}
    >
      {t('Bridge Now')}
    </Button>
  )
}

export default DepositButton
