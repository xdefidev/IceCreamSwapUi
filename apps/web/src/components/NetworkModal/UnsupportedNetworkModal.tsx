import {Button, Grid, Message, MessageText, Modal, Select, Text} from '@pancakeswap/uikit'
import { useLocalNetworkChain } from 'hooks/useActiveChainId'
import { useTranslation } from '@pancakeswap/localization'
import { useSwitchNetwork, useSwitchNetworkLocal } from 'hooks/useSwitchNetwork'
import useAuth from '../../hooks/useAuth'
import { useMenuItems } from '../Menu/hooks/useMenuItems'
import { useRouter } from 'next/router'
import { getActiveMenuItem, getActiveSubMenuItem } from '../Menu/utils'
import { useAccount, useNetwork } from 'wagmi'
import { useMemo } from 'react'
// import Dots from '../Loader/Dots'
import { defaultChainId } from '@icecreamswap/constants'
// import { CHAIN_QUERY_NAME } from "config/chains";
import { ChainLogo } from "components/Logo/ChainLogo";
import chainName from "config/constants/chainName";

// Where chain is not supported or page not supported
export function UnsupportedNetworkModal({ pageSupportedChains }: { pageSupportedChains: number[] }) {
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const switchNetworkLocal = useSwitchNetworkLocal()
  const { chains } = useNetwork()
  const chainId = useLocalNetworkChain() || defaultChainId
  const { isConnected } = useAccount()
  const { logout } = useAuth()
  const { t } = useTranslation()
  const menuItems = useMenuItems()
  const { pathname } = useRouter()

  const title = useMemo(() => {
    const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
    const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

    return activeSubMenuItem?.label || activeMenuItem?.label
  }, [menuItems, pathname])

  const supportedMainnetChains = useMemo(
    () => chains.filter((chain) => !chain.testnet && pageSupportedChains?.includes(chain.id)),
    [chains, pageSupportedChains],
  )

  const chainIdToSwitchTo = useMemo(
    () => {
      if (supportedMainnetChains.length === 0) return null
      return supportedMainnetChains.map((c) => c.id).includes(chainId) ? chainId: supportedMainnetChains[0].id
    },
    [chains, pageSupportedChains],
  )

  const chainSelectionOptions = useMemo(
    () =>
      supportedMainnetChains
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

  return (
    <Modal title={t('Check your network')} hideCloseButton headerBackground="gradientCardHeader">
      <Grid style={{ gap: '16px' }} maxWidth="336px">
        <Text style={{ textAlign: 'center' }}>
          {t('Currently %feature% is supported on', { feature: typeof title === 'string' ? title : t('this page') })}{' '}
          {
            supportedMainnetChains.length < 5?
              supportedMainnetChains?.map((c) => c.name).join(', '):
              String(supportedMainnetChains.length) + " Chains"
          }
        </Text>
        <div style={{ textAlign: 'center' }}>
          {t("Switch to one of them")}
        </div>
        {/*
        <Message variant="warning">
          <MessageText>{t('Please switch your network to continue.')}</MessageText>
        </Message>
        */}
        {canSwitch && supportedMainnetChains.length !== 0 ? (
          <div style={{ height: '250px' }}>
            <Select
              options={chainSelectionOptions}
              onOptionChange={(option) => switchNetworkAsync(option.value)}
              placeHolderText={"Select Chain"}
              width={"100px"}
            />
          </div>
        ) : (
          <Message variant="danger">
            <MessageText>{t('Unable to switch network. Please try it on your wallet')}</MessageText>
          </Message>
        )}
        {isConnected && (
          <Button
            variant="secondary"
            onClick={() =>
              logout().then(() => {
                switchNetworkLocal(chainIdToSwitchTo)
              })
            }
          >
            {t('Disconnect Wallet')}
          </Button>
        )}
      </Grid>
    </Modal>
  )
}
