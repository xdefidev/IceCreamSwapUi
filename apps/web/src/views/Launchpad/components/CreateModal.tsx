import { Flex, Modal, useModalContext, Text, Button, Heading, Spinner } from '@pancakeswap/uikit'
import { formatAmount } from '../../Bridge/formatter'
import { useCallback, useState } from 'react'
import { FormValues } from '../create-schema'
import styled from 'styled-components'
import { useAddUserToken } from 'state/user/hooks'
import { useToken } from 'hooks/Tokens'
import useUserAddedTokens from 'state/user/hooks/useUserAddedTokens'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { BigNumber, utils } from 'ethers'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCampaignFactory } from '../hooks'
import { useActiveChain } from 'hooks/useActiveChain'
import { usePublicNodeWaitForTransaction } from "hooks/usePublicNodeWaitForTransaction";

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
  const { formValues } = props
  const [step, setStep] = useState<Steps>('preview')
  const { onDismiss } = useModalContext()
  const { chainId } = useActiveChainId()
  const token = useToken(formValues?.tokenAddress)
  const { address, status } = useAccount()
  const campaignFactory = useCampaignFactory()
  const chain = useActiveChain()
  const { waitForTransaction } = usePublicNodeWaitForTransaction()

  const createCampaign = async () => {
    // const initialSupply = utils.parseUnits(String(formValues?.initialSupply || '0'), 18)
    // const maxSupply = utils.parseUnits(String(formValues?.maxSupply || '0'), 18)
    const txHash = await campaignFactory.write.createCampaign(
      [
        {
          rate: BigInt(formValues?.rate || 0),
          hardCap: BigInt(formValues?.hardCap || 0),
          softCap: BigInt(formValues?.softCap || 0),
          min_allowed: BigInt(formValues?.minAllowed || 0),
          max_allowed: BigInt(formValues?.maxAllowed || 0),
          start_date: BigInt(Math.floor(formValues?.startDate.valueOf() / 1000)),
          end_date: BigInt(Math.floor(formValues?.endDate.valueOf() / 1000)),
          pool_rate: BigInt(formValues?.poolRate || 0),
          liquidity_rate: BigInt(formValues?.liquidityRate || 0),
          lock_duration: BigInt(60 * 60 * 24 * 30),
          whitelist_enabled: false,
        },
        formValues?.tokenAddress as `0x${string}`,
        BigInt(0),
        '0x0000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000',
      ], {}
    )
    setStep('transfer')
    await waitForTransaction({hash: txHash})
  }

  const addToken = useAddUserToken()
  const userAddedTokens = useUserAddedTokens()

  const handleAddToken = useCallback(() => {
    if (token) {
      addToken(token)
    } else {
      console.error('No token found')
    }
  }, [addToken, token])

  const handleDismiss = () => {
    onDismiss()
  }

  const preview = (
    <>
      {/* {formValues?.burnable && ( */}
      {/*   <Flex alignItems="center" justifyContent="space-between"> */}
      {/*     <Text fontSize="1em">Burnable</Text> */}
      {/*     <Text fontSize="1em">Yes</Text> */}
      {/*   </Flex> */}
      {/* )} */}
      {status === 'connected' ? (
        <Button style={{ flexGrow: 1 }} onClick={createCampaign}>
          Confirm
        </Button>
      ) : (
        <ConnectWalletButton />
      )}
    </>
  )

  const transferCompleted = (
    <>
      <Text>Campaign Created</Text>
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
      <Text>Your Token is being created</Text>
    </>
  )

  const steps = {
    preview,
    transfer: waitingForTransfer,
    completed: transferCompleted,
  }

  return (
    <Modal title="Creating Token" onDismiss={handleDismiss} minWidth="min(100vw, 426px)">
      <Flex flexDirection="column" alignItems="stretch" style={{ gap: '1em' }}>
        {steps[step]}
      </Flex>
    </Modal>
  )
}

export default CreateModal
