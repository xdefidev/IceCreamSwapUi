import { Flex, Modal, useModalContext, Text, Button, Spinner } from '@pancakeswap/uikit'
import { useState } from 'react'
import { useToken } from 'hooks/Tokens'
import { Address, useAccount } from "wagmi";
import ConnectWalletButton from 'components/ConnectWalletButton'
import { BigNumber, utils } from 'ethers'
import { useTokenBalances } from 'state/wallet/hooks'
import { CurrencyAmount } from '@pancakeswap/sdk'
import { useTransactionAdder } from 'state/transactions/hooks'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useContract } from 'hooks/useContract'
import useSWR from 'swr'
import { useActiveChain } from 'hooks/useActiveChain'
import { useKycDelegationSignature } from '../../../strict/hooks/useDelegationSignature'
import { useSubmitDelegation } from '../../../strict/hooks/useSubmitDelegation'
import { kycMinterABI } from "config/abi/kycMinter";
import { usePublicNodeWaitForTransaction } from "hooks/usePublicNodeWaitForTransaction";

interface DepositModalProps {
  target: string
}

type Steps = 'preview' | 'transfer' | 'completed'

const BuyModal: React.FC<DepositModalProps> = (props) => {
  const { target } = props
  const [step, setStep] = useState<Steps>('preview')
  const { onDismiss } = useModalContext()
  const chain = useActiveChain()
  const { address, status } = useAccount()
  const submitDelegation = useSubmitDelegation(chain.id, address, target)
  const minter = useContract(chain.kyc?.contractKycDelegator, kycMinterABI)
  const fee = useSWR(minter && 'kyc/fee', async () => {
    const feeAmount = await minter.read.feeAmount()
    const feeToken = await minter.read.feeToken()
    const feeAmountFormatted = utils.formatUnits(feeAmount, 18)
    return { feeAmount, feeToken, feeAmountFormatted }
  })
  const token = useToken(fee.data?.feeToken)
  const balances = useTokenBalances(address, token && [token])
  const balance = (balances ?? {})[token?.address ?? '']
  const addTransaction = useTransactionAdder()
  const sig = useKycDelegationSignature({ chainId: chain.id, sourceAddress: address, targetAddress: target })
  const { waitForTransaction } = usePublicNodeWaitForTransaction()

  const handleDeposit = async () => {
    if (!minter || !sig.data) return
    const { signature, tokenId, targetAddress } = sig.data
    console.log('args', targetAddress, tokenId, signature)
    const txHash = await minter.write.delegate([targetAddress as Address, BigInt(tokenId), signature as `0x${string}`], {})
    setStep('transfer')
    addTransaction({hash: txHash}, {
      summary: `Minting KYC delegation for ${target}`,
    })
    await waitForTransaction({hash: txHash})
    await submitDelegation.mutateAsync({
      chainId: chain.id,
      sourceAddress: address,
      targetAddress: target,
    })
    setStep('completed')
  }

  const handleDismiss = () => {
    onDismiss()
  }

  const {approvalState, approveCallback: approve} = useApproveCallback(
    token &&
      CurrencyAmount.fromRawAmount(
        token,
        utils.parseUnits(
          Number(fee.data?.feeAmountFormatted) ? fee.data.feeAmountFormatted : '0',
          token?.decimals || 18,
        ) as any,
      ),
    chain.kyc?.contractKycDelegator,
    {addToTransaction: true}
  )

  const preview = (
    <>
      <Flex flexDirection="column" gap="1em">
        <Text>Delegate your KYC to {target}</Text>
        <Text>
          Fee: {fee.data?.feeAmountFormatted} {token?.symbol}
        </Text>
        {status === 'connected' ? (
          balance &&
          fee.data?.feeAmount &&
          fee.data?.feeAmount &&
          (balance.greaterThan(fee.data?.feeAmount.toString()) || balance.equalTo(fee.data?.feeAmount.toString())) ? (
            approvalState !== ApprovalState.APPROVED ? (
              <Button style={{ flexGrow: 1 }} onClick={approve} isLoading={approvalState === ApprovalState.PENDING}>
                Approve
              </Button>
            ) : (
              <Button style={{ flexGrow: 1 }} onClick={handleDeposit}>
                Mint KYC Delegation
              </Button>
            )
          ) : (
            <Button disabled>Insufficient Funds</Button>
          )
        ) : (
          <ConnectWalletButton />
        )}
      </Flex>
    </>
  )

  const transferCompleted = (
    <>
      <Text>Mint successful!</Text>
      <Button onClick={handleDismiss} variant="secondary">
        Close
      </Button>
    </>
  )

  const waitingForTransfer = (
    <>
      <Flex justifyContent="center">
        <Spinner />
      </Flex>
      <Text>Processing Transaction</Text>
    </>
  )

  const steps = {
    preview,
    transfer: waitingForTransfer,
    completed: transferCompleted,
  }

  return (
    <Modal title="Mint KYC Delegation" onDismiss={handleDismiss} minWidth="min(100vw, 426px)">
      <Flex flexDirection="column" alignItems="stretch" style={{ gap: '1em' }}>
        {steps[step]}
      </Flex>
    </Modal>
  )
}

export default BuyModal
