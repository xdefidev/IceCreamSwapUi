import { Box, Button, Flex, Heading, Input, Link, PageHeader, Text, useModal, tokens } from '@pancakeswap/uikit'
import { isMobile } from 'react-device-detect'
import useSWR from 'swr'
import { useActiveChain } from 'hooks/useActiveChain'
import styled, { useTheme } from 'styled-components'
import kycAsset from './images/KYC.png'
import Page from 'components/Layout/Page'
import { useState } from 'react'
import { useToken } from 'hooks/Tokens'
import { useAccount, useWalletClient } from "wagmi";
import { useTransactionAdder } from 'state/transactions/hooks'
import { useContract } from 'hooks/useContract'
import { utils } from 'ethers'
import { useUser } from '../../strict/hooks/useUser'
import { useDelegateKyc } from '../../strict/hooks/useDelegateKyc'
import { useKycDelegation } from '../../strict/hooks/useKycDelegation'
import { useOnLogin } from '../../strict/hooks/useLogin'
import BuyModal from './components/MintModal'
import { kycMinterABI } from "config/abi/kycMinter";
import useAccountActiveChain from "hooks/useAccountActiveChain";
import { useTranslation } from '@pancakeswap/localization'

const H1 = styled(Heading)`
  font-size: 32px;
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 64px;
    margin-bottom: 24px;
  }
`
const H2 = styled(Heading)`
  font-size: 16px;
  margin-bottom: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 24px;
    margin-bottom: 18px;
  }
`

const ImgWrapper = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 24px;
  }
`

export const KycDelegator: React.FC = () => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const chain = useActiveChain()
  const { address, status } = useAccount()
  const minter = useContract(chain.kyc?.contractKycDelegator, kycMinterABI)
  const fee = useSWR('kyc/fee', async () => {
    const feeAmount = await minter.read.feeAmount()
    const feeToken = await minter.read.feeToken()
    const feeAmountFormatted = utils.formatUnits(feeAmount, 18)
    return { feeAmount, feeToken, feeAmountFormatted }
  })
  const token = useToken(fee.data?.feeToken)
  const { data: walletClient } = useWalletClient()
  const { account } = useAccountActiveChain()
  const addTransaction = useTransactionAdder()
  const paid = useSWR(
    address ? `kyc/${address}` : null,
    async () => {
      const response = await fetch(`api/kyc-info/${address}`)
      const data = await response.json()
      return data.status
    },
    { refreshInterval: 2000 },
  )
  const { isDark } = useTheme()
  const user = useUser()
  const delegate = useDelegateKyc()
  const onLogin = useOnLogin(address, walletClient, account)
  const [onPresentBuyModal] = useModal(<BuyModal target={input} />, true, true, `buyModal-${input}`)
  const delegation = useKycDelegation({
    chainId: chain.id,
    targetAddress: input,
    sourceAddress: user.data?.wallet,
  })
  let action: React.ReactNode
  if (delegation.data?.status === 'PENDING') {
    action = <Heading>{t('Waiting for Validation')}</Heading>
  } else if (delegation.data?.status === 'REJECTED') {
    action = <Heading>{t('Your Delegation was Rejected')}</Heading>
  } else if (delegation.data?.status === 'MINTED') {
    action = <Heading>{t('Your Delegation was Minted')} ✔️</Heading>
  } else if (delegation.data?.status === 'APPROVED') {
    action = <Button onClick={onPresentBuyModal}>{t('Mint KYC NFT')}</Button>
  } else {
    action = !user.data?.isLoggedIn ? (
      <Button onClick={onLogin}>{t('Login')}</Button>
    ) : (
      <Button
        onClick={() => {
          delegate
            .mutateAsync({
              chainId: chain.id,
              targetAddress: input,
              sourceAddress: user.data.wallet,
            })
            .then(() => {
              delegation.refetch()
            })
        }}
        isLoading={delegate.isLoading}
      >
        {t('Send for validation')}
      </Button>
    )
  }

  return (
    <Box background={isDark ? 'linear-gradient(135deg, #1d1c21 0%, #141317 100%)' : undefined}>
      <PageHeader
        background={isMobile ? `url(${kycAsset.src})` : '#E66280'}
        style={{
          backgroundPosition: 'right center',
          backgroundColor: '#E66280',
          backgroundRepeat: 'no-repeat',
        }}
        padding="0"
        // extra={<Bg />}
      >
        <Flex maxWidth="800px" margin="auto">
          <Box>
            <H1 as="h1" color={tokens.colors.dark.secondary} scale="xxl">
              {t('KYC Delegator')}
            </H1>
            <H2 color="#F4EEFF">{t('Delegator your KYC to your own contracts')}</H2>
          </Box>
          <ImgWrapper>
            <img src={kycAsset.src} alt="kyc" />
          </ImgWrapper>
        </Flex>
      </PageHeader>
      <Page style={{ maxWidth: '800px' }}>
        {paid.data === 'unverified' ? (
          <Flex flexDirection="column" gap="0.75em">
            <Heading>{t('You are not KYCed yet please KYC your wallet first')}</Heading>
            <Link href="/kyc">{t('Get your KYC')}</Link>
          </Flex>
        ) : (
          <Flex flexDirection="column" gap="0.75em">
            <Text>{t('Enter the address of the contract you want to delegate your KYC status to.')}</Text>
            <Text>{t('E.g. your token address.')}</Text>
            <Flex alignItems="center" gap="1em" flexDirection="column" justifyContent="stretch" marginTop="1em">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="0x12345..." />
            </Flex>
            <Text>
              {t('After verification, you pay %fee% %symbol% to delegate your KYC status to this contract.', {fee: fee.data?.feeAmountFormatted, symbol: token?.symbol})}
            </Text>
            {action}
          </Flex>
        )}
      </Page>
    </Box>
  )
}
