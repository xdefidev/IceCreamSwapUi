import { Flex, Modal, useModalContext, Text, Button, Heading, Spinner } from '@pancakeswap/uikit'
import { useCallback, useState } from 'react'
import { FormValues } from '../create-schema'
import styled from 'styled-components'
import { useAddUserToken } from 'state/user/hooks'
import { useToken } from 'hooks/Tokens'
import useUserAddedTokens from 'state/user/hooks/useUserAddedTokens'
import AddToWallet from './AddToWallet'
import { useAccount, usePublicClient } from "wagmi";
import ConnectWalletButton from 'components/ConnectWalletButton'
import { utils } from 'ethers'
import { useTranslation } from '@pancakeswap/localization'
import useTokenDeployerDividend, { useDeploymentFee } from '../useTokenDeployer'
import { CurrencyAmount } from '@pancakeswap/sdk'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import Divider from 'views/Farms/components/Divider'
import { decodeEventLog, parseUnits } from "viem";
import { bridgeABI } from "config/abi/bridge";
import { tokenDeployerABI } from "config/abi/tokenDeployer";

interface DepositModalProps {
  formValues: FormValues
}

const Logo = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`

const Subtitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSubtle};
`

type Steps = 'preview' | 'transfer' | 'completed'

const CreateModal: React.FC<DepositModalProps> = (props) => {
  const { t } = useTranslation()
  const { formValues } = props
  const [step, setStep] = useState<Steps>('preview')
  const { onDismiss } = useModalContext()
  const [tokenAddress, setTokenAddress] = useState<string | null>(null)
  const token = useToken(tokenAddress)
  const tokenDeployer = useTokenDeployerDividend()
  const { address, status } = useAccount()
  const publicClient = usePublicClient()

  const handleDeposit = async () => {
    const initialSupply = parseUnits(String(formValues?.initialSupply || '0'), 18)
    const deployTransaction = await tokenDeployer.write.deploy([
      formValues?.tokenSymbol,
      formValues?.tokenName,
      initialSupply,
      BigInt(formValues?.buyTax * 100),
      BigInt(formValues?.sellTax * 100),
      BigInt(formValues?.marketingDistribution * 100),
      BigInt(formValues?.dividendDistribution * 100),
      BigInt(formValues?.liquidityDistribution * 100),
      ],
      { gasLimit: 10_000_000 },
    )
    setStep('transfer')
    const deployReceipt = await publicClient.waitForTransactionReceipt({hash: deployTransaction})
    const deployLogs = deployReceipt.logs.map(log => {
      const event = decodeEventLog({
        abi: tokenDeployerABI,
        data: log.data,
        topics: log.topics
      })
      return event
    })
    const tokenDeployedEvent = deployLogs.find((event) => event.eventName === 'TokenDeployed')

    setTokenAddress(tokenDeployedEvent.args.token)
    setStep('completed')
  }

  const addToken = useAddUserToken()
  const userAddedTokens = useUserAddedTokens()
  const { feeToken, feeAmount, deployerAddress } = useDeploymentFee()
  const feeTokenToken = useToken(feeToken)
  const { approvalState, approveCallback: approve } = useApproveCallback(
    feeTokenToken &&
      feeAmount &&
      CurrencyAmount.fromRawAmount(feeTokenToken, utils.parseUnits(feeAmount.toString(), 0) as any),
    deployerAddress,
    {
      addToTransaction: true,
    }
  )

  const handleAddToken = useCallback(() => {
    if (token) {
      addToken(token)
    } else {
      console.error(t('No token found'))
    }
  }, [addToken, t, token])

  const handleDismiss = () => {
    onDismiss()
  }

  const preview = (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em" display="flex" style={{ alignItems: 'center', gap: '0.5em' }}>
          {/* <CurrencyLogo currency={amount.currency} /> */}
          <Logo src={formValues?.logo?.blob} />
          <div>
            <Heading>{formValues?.tokenName}</Heading>
            <Subtitle>{formValues?.tokenSymbol}</Subtitle>
          </div>
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em">{t('Initial Supply')}</Text>
        <Text fontSize="1em">{formValues?.initialSupply}</Text>
      </Flex>
      <Divider />
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em">{t('Buy Tax')}</Text>
        <Text fontSize="1em">{formValues?.buyTax}%</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em">{t('Sell Tax')}</Text>
        <Text fontSize="1em">{formValues?.sellTax}%</Text>
      </Flex>
      <Flex marginTop="0.5em" alignItems="center" justifyContent="space-between">
        <Text fontSize="1em">{t('Marketing Distribution')}</Text>
        <Text fontSize="1em">{formValues?.marketingDistribution}%</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em">{t('Dividend Distribution')}</Text>
        <Text fontSize="1em">{formValues?.dividendDistribution}%</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em">{t('Liquidity Distribution')}</Text>
        <Text fontSize="1em">{formValues?.liquidityDistribution}%</Text>
      </Flex>

      <Divider />
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="1em">{t('Creation Fee')}</Text>
        <Text fontSize="1em">{feeAmount ? utils.formatUnits(feeAmount, 18).toString() : null} ICE</Text>
      </Flex>
      {status === 'connected' ? (
        approvalState !== ApprovalState.APPROVED ? (
          <Button style={{ flexGrow: 1 }} onClick={approve}>
            {t('Approve')}
          </Button>
        ) : (
          <Button style={{ flexGrow: 1 }} onClick={handleDeposit}>
            {t('Confirm')}
          </Button>
        )
      ) : (
        <ConnectWalletButton />
      )}
    </>
  )

  const transferCompleted = (
    <>
      <Text>Token created Successful!</Text>
      <Text display="inline" style={{ wordBreak: 'break-all' }}>
        {t('Token Address')}: {tokenAddress}
      </Text>
      <Text>{t("What's next?")}</Text>
      <Button
        onClick={handleAddToken}
        disabled={userAddedTokens?.some((addedToken) => addedToken.address === tokenAddress)}
      >
        {userAddedTokens?.some((addedToken) => addedToken.address === tokenAddress)
          ? t('Imported')
          : t('Import to Swap')}
      </Button>
      <AddToWallet
        tokenAddress={tokenAddress!}
        tokenSymbol={formValues?.tokenSymbol}
        tokenDecimals={18}
        tokenImage={formValues?.logo?.blob}
      />
      <Button onClick={handleDismiss} variant="secondary">
        {t('Close')}
      </Button>
    </>
  )

  const waitingForTransfer = (
    <>
      <Flex justifyContent="center">
        <Spinner />
      </Flex>
      <Text>{t('Your Token is being created')}</Text>
    </>
  )

  const steps = {
    preview,
    transfer: waitingForTransfer,
    completed: transferCompleted,
  }

  return (
    <Modal title={t('Creating Token')} onDismiss={handleDismiss} minWidth="min(100vw, 426px)">
      <Flex flexDirection="column" alignItems="stretch" style={{ gap: '1em' }}>
        {steps[step]}
      </Flex>
    </Modal>
  )
}

export default CreateModal
