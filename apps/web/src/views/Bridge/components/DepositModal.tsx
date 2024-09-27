import { ERC20Token } from '@pancakeswap/sdk'
import { Flex, Modal, useModalContext, Text, ArrowDownIcon, Button, Spinner, Column } from '@pancakeswap/uikit'
import { CurrencyLogo } from 'components/Logo'
import { ChainLogo } from 'components/Logo/ChainLogo'
import Divider from 'views/Farms/components/Divider'
import { isTransactionError, TransactionError, TransactionStatus, useBridge } from '../BridgeProvider'
import { formatAmount } from '../formatter'
import { useDeposit } from '../hooks/useDeposit'
import ProgressSteps from 'views/Swap/components/ProgressSteps'
import { useState } from 'react'
import Image from 'next/image'
import BridgeSuccess from '../assets/bridge-success.png'
import chainName from 'config/constants/chainName'
import { useTranslation } from '@pancakeswap/localization'

interface DepositModalProps {
  bridge: ReturnType<typeof useBridge>
  deposit: ReturnType<typeof useDeposit>['deposit']
  approve: ReturnType<typeof useDeposit>['approve']
}

const DepositModal: React.FC<DepositModalProps> = ({ bridge, deposit, approve }) => {
  const {
    currency,
    depositAmount,
    recipient,
    destinationChainConfig,
    homeChainConfig,
    transactionStatus,
    hasApproval,
    setHasApproval,
    showApprovalFlow,
  } = bridge
  const { onDismiss } = useModalContext()
  const [waitingForApproval, setWaitingForApproval] = useState(false)
  const { t } = useTranslation()

  const titleByStatus: Record<Exclude<TransactionStatus, TransactionError>, string> = {
    'Approve 0': t('Waiting for approval'),
    Approve: t('Waiting for approval'),
    Deposit: t('Waiting for deposit'),
    'In Transit': t('Transit'),
    'Transfer Completed': t('Transfer Completed'),
    'Transfer Aborted': t('Transfer Failed'),
    'Initializing Transfer': t('Initializing Transfer'),
  }

  const title = transactionStatus
    ? isTransactionError(transactionStatus)
      ? t('Transaction Failed')
      : titleByStatus[transactionStatus]
    : t('Confirm Bridge Transfer')

  const selectedToken =
    currency instanceof ERC20Token
      ? currency.address
      : currency?.isNative
      ? '0x0000000000000000000000000000000000000001'
      : undefined
  const handleDeposit = () => {
    deposit(depositAmount, recipient as `0x${string}`, selectedToken, destinationChainConfig.domainId)
  }

  const handleApprove = () => {
    setWaitingForApproval(true)
    approve(parseFloat(depositAmount), selectedToken, setHasApproval).then(() => {
      setWaitingForApproval(false)
    })
  }

  const handleDismiss = () => {
    onDismiss()
  }

  const waitingForDeposit = (
    <>
      <Flex justifyContent="center">
        <Spinner />
      </Flex>
      <Text>{t('Please confirm the transaction in your wallet')}</Text>
    </>
  )

  const waitingForTransfer = (
    <>
      <Flex justifyContent="center">
        <Spinner />
      </Flex>
      <Text>{t('Please wait for the transfer to complete')}</Text>
    </>
  )

  const transferInTransit = (
    <>
      <Flex justifyContent="center">
        <Spinner />
      </Flex>
      <Text>{t('Transfer in transit')}</Text>
      <Text>{t('Please wait, the transaction will take a few minutes')}</Text>
    </>
  )

  const preview = (
    <>
      <Flex alignItems="center" style={{ gap: '0.5em' }}>
        <ChainLogo chainId={homeChainConfig.networkId} />
        <Text fontSize="1.5em">{chainName[homeChainConfig.networkId]}</Text>
      </Flex>
      <span>
        <ArrowDownIcon />
      </span>
      <Flex alignItems="center" style={{ gap: '0.5em' }}>
        <ChainLogo chainId={destinationChainConfig.networkId} />
        <Text fontSize="1.5em">{chainName[destinationChainConfig.networkId]}</Text>
      </Flex>
      <Divider margin="0px" />
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em" display="flex" style={{ alignItems: 'center', gap: '0.5em' }}>
          <CurrencyLogo currency={currency} />
          <span>{t('Amount')}</span>
        </Text>
        <Text fontSize="1em">
          {formatAmount(depositAmount)} {currency?.symbol}
        </Text>
      </Flex>
      {showApprovalFlow ? (
        <>
          <Flex style={{ gap: '0.5em' }} alignItems="stretch">
            <Button
              style={{ flexGrow: 1 }}
              onClick={handleApprove}
              disabled={hasApproval}
              isLoading={waitingForApproval}
            >
              {t('Approve')}
            </Button>
            <Button style={{ flexGrow: 1 }} onClick={handleDeposit} disabled={!hasApproval}>
              {t('Confirm')}
            </Button>
          </Flex>
          <Column style={{ marginTop: '1rem' }}>
            <ProgressSteps steps={[hasApproval]} />
          </Column>
        </>
      ) : (
        <Button style={{ flexGrow: 1 }} onClick={handleDeposit}>
          {t('Confirm')}
        </Button>
      )}
    </>
  )

  const transferCompleted = (
    <>
      <Flex justifyContent="center">
        <span style={{ maxWidth: '200px' }}>
          <Image src={BridgeSuccess} alt="success" />
        </span>
      </Flex>
      <Text>{t('Congratulations! Your transfer has been completed.')}</Text>
      <Button onClick={handleDismiss}>{t('Close')}</Button>
    </>
  )

  const mapping = {
    Deposit: waitingForDeposit,
    'In Transit': transferInTransit,
    'Transfer Completed': transferCompleted,
    'Transfer Aborted': <Text>{t('Transfer Failed')}</Text>,
    'Initializing Transfer': waitingForTransfer,
  }

  const content = transactionStatus ? (
    isTransactionError(transactionStatus) ? (
      <TransactionError error={transactionStatus} />
    ) : (
      mapping[transactionStatus]
    )
  ) : (
    preview
  )

  return (
    <Modal title={title} onDismiss={handleDismiss} minWidth="min(100vw, 426px)">
      <Flex flexDirection="column" alignItems="stretch" style={{ gap: '1em' }}>
        {content}
      </Flex>
    </Modal>
  )
}

const TransactionError: React.FC<{ error: TransactionError }> = ({ error }) => {
  let { message } = error
  const { t } = useTranslation()
  if (error.status === 4001) message = t('Action has been rejected by the user.')
  return (
    <>
      <Flex justifyContent="center" flexDirection="column">
        {error.status > 5000 && <Text fontSize="1.5em">RPC Error</Text>}
        <Text>{message}</Text>
        {error.status > 5000 && (
          <Text fontSize="1.5em">{t('Please try again later. When this issue persists please contact the support.')}</Text>
        )}
      </Flex>
    </>
  )
}

export default DepositModal
