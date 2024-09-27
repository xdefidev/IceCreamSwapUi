import { AtomBox, Checkbox, Flex, Heading, Input, Select, Text } from '@pancakeswap/uikit'
import { AppBody } from 'components/App'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { chains } from 'utils/wagmi'
import { getChain } from '@icecreamswap/constants'
import Page from '../Page'
import { StyledBridgeBody, StyledBridgeContainer, StyledInputCurrencyWrapper } from './styles'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useMemo } from 'react'
import { useBridge } from './BridgeProvider'
import { useBridgeTax } from './hooks/useBridgeTax'
import Divider from 'views/Farms/components/Divider'
import FormError from './components/FormError'
import { useFormErrors } from './hooks/useFormErrors'
import { useRouter } from 'next/router'
import DepositButton from './components/DepositButton'
import { formatAmount } from './formatter'
import chainName from 'config/constants/chainName'
import { SUPPORT_BRIDGE } from 'config/constants/supportChains'
import { useSupportedChainList } from 'hooks/useSupportedChains'
import { useTranslation } from '@pancakeswap/localization'

const Bridge = () => {
  const { t } = useTranslation()
  const { account, chainId: accountChainId } = useWeb3React()
  const { switchNetworkAsync } = useSwitchNetwork()
  const { chainId: routerChainId } = useRouter().query
  const chainId = accountChainId ?? (typeof routerChainId === 'string' ? parseInt(routerChainId) : undefined)
  const {
    currency,
    setCurrency,
    depositAmount,
    setDepositAmount,
    tokens,
    setDestinationChainId,
    destinationChainId,
    recipient,
    setRecipient,
    setToOtherAddress,
    toOtherAddress,
    showNative,
  } = useBridge()

  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const tax = useBridgeTax()
  const { formErrors, validateForm, setHasSubmitted } = useFormErrors(tax.bridgeFee, tax.bridgeFeeToken)
  const supportedNames = useSupportedChainList()

  const homeChainOptions = useMemo(
    () =>
      chains
        .filter((chain) => SUPPORT_BRIDGE.includes(chain.id))
        .map((chain) => ({
          label: (
            <>
              <ChainLogo chainId={chain.id} />
              {chainName[chain.id]}
            </>
          ),
          value: chain.id,
        })),
    [],
  )

  const targetChainOptions = useMemo(
    () =>
      chains
        .filter((chain) => chain.id !== chainId)
        .filter((chain) => SUPPORT_BRIDGE.includes(chain.id))
        .map((chain) => ({
          label: (
            <>
              <ChainLogo chainId={chain.id} />
              {chainName[chain.id]}
            </>
          ),
          value: chain.id,
        })),
    [chainId],
  )

  return (
    <Page>
      <Flex marginBottom="4em" width={['328px', , '100%']} height="100%" justifyContent="center">
        <Flex flexDirection="column">
          <StyledBridgeContainer>
            <StyledInputCurrencyWrapper mt="0">
              <AppBody>
                <AtomBox width="auto" alignItems="center" flexDirection="column" padding="24px" borderBottom="1">
                  <AtomBox display="flex" width="auto" alignItems="center" justifyContent="center">
                    <Heading as="h2">{t('Bridge')}</Heading>
                  </AtomBox>
                  <Text color="textSubtle" fontSize="14px" textAlign="center">
                    {t('Transfer tokens between chains')}
                  </Text>
                </AtomBox>
                <StyledBridgeBody>
                  {t('Source Chain')}
                  <Select
                    options={homeChainOptions}
                    onOptionChange={(option) => {
                      switchNetworkAsync(option.value)
                    }}
                    value={chainId}
                  />
                  {t('Destination Chain')}
                  <Select
                    options={targetChainOptions}
                    onOptionChange={(option) => {
                      setDestinationChainId(option.value)
                    }}
                    value={destinationChainId}
                  />
                  <div>
                    <CurrencyInputPanel
                      label="Amount"
                      value={depositAmount}
                      showMaxButton
                      showQuickInputButton
                      maxAmount={balance}
                      onUserInput={(value) => {
                        setDepositAmount(value)
                      }}
                      onPercentInput={(percent) => {
                        setDepositAmount((+balance?.toExact() * 0.01 * percent).toString())
                      }}
                      onMax={() => {
                        setDepositAmount(balance?.toExact() || '0')
                      }}
                      onCurrencySelect={setCurrency}
                      currency={currency}
                      id="bridge-currency-input"
                      tokens={tokens}
                      hideManage
                      showCommonBases={false}
                      showNative={showNative}
                    />
                    {formErrors.currency && <FormError>{formErrors.currency}</FormError>}
                  </div>
                  {
                    /*
                    <Flex alignItems="center">
                      <Checkbox
                        name="own-address"
                        type="checkbox"
                        checked={toOtherAddress}
                        onChange={() => setToOtherAddress(!toOtherAddress)}
                        scale="sm"
                      />
                      <Text ml="10px" style={{ userSelect: 'none' }} onClick={() => setToOtherAddress(!toOtherAddress)}>
                        {t('Send tokens to a different address')}
                      </Text>
                    </Flex>
                    {toOtherAddress && (
                      <Flex flexDirection="column">
                        <Text>{t('Recipient Address')}</Text>
                        <Input
                          placeholder="0xXXXXXXXXXXXXXXX…"
                          value={recipient}
                          onChange={(e) => setRecipient(e.target.value)}
                        />
                        {formErrors.recipient && <FormError>{formErrors.recipient}</FormError>}
                      </Flex>
                  )}
                    */
                  }
                  <Divider margin="0px" />
                  {currency && !!tax.bridgeFeeNative && !!tax.bridgeFee && !!tax.hasBridgeFee && tax.bridgeFeeCurrency && (
                    <>
                      <Flex justifyContent="space-between">
                        <span>{t('Receive')}</span>
                        <pre>
                          {formatAmount(Number(depositAmount) - tax.bridgeFee)} {currency.name}
                        </pre>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <span>{t('Gas fee')}</span>
                        <pre>
                          {formatAmount(tax.bridgeFeeNative)} {getChain(chainId).nativeCurrency.symbol}
                        </pre>
                      </Flex>
                    </>
                  )}
                  <DepositButton validateForm={validateForm} setHasSubmitted={setHasSubmitted} nativeFeeWei={tax.bridgeFeeNativeWei} />
                </StyledBridgeBody>
              </AppBody>
            </StyledInputCurrencyWrapper>
          </StyledBridgeContainer>
          {/* <Text lineHeight="125%" padding="24px" marginTop="36px" maxWidth="560px"> */}
          {/*   <Heading marginBottom="16px">About our Bridge</Heading> */}
          {/*   The Bridge allows you to transfer tokens between chains. We charge a small fee to cover the cost of the gas, */}
          {/*   the tax is 1% of the transfer amount. Transactions are processed by our bridge smart contract - this way */}
          {/*   transactions can never get lost. We are currently supporting {supportedNames}. For more information, please */}
          {/*   visit our{' '} */}
          {/*   <Link href="https://wiki.icecreamswap.com/dex/bridge" display="inline-flex" external target="_blank"> */}
          {/*     Wiki */}
          {/*   </Link> */}
          {/*   . */}
          {/* </Text> */}
        </Flex>
      </Flex>
    </Page>
  )
}

export default Bridge
