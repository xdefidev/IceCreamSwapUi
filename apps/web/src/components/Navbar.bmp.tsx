import { Box, Flex, Image, Text, WalletIcon } from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'
import { useActiveHandle } from 'hooks/useEagerConnect.bmp'
import useTheme from 'hooks/useTheme'
import { useEffect } from 'react'
import { styled } from 'styled-components'
import { bridgeUtils, useSystemInfo } from 'utils/mpBridge'

const title = {
  dark: '/images/coin.png',
  light: '/images/coin.png',
}
const StyledWallet = styled(Flex) <{ isActive: boolean }>`
  padding: 6px 11px;
  position: absolute;
  left: 18px;
  align-items: center;
  background-color: ${({ theme, isActive }) => (isActive ? theme.colors.dropdown : 'transparent')};
  border-radius: 20px;
`
const Wallet = () => {
  const { account } = useActiveWeb3React()
  const { logout } = useAuth()
  const active = useActiveHandle()
  const isActive = !!account
  const handleWalletClick = () => {
    bridgeUtils.toWallet().then((result) => {
      if (result?.method === 'disconnect') {
        logout()
      }
    })
  }
  useEffect(() => {
    window.bn.connect = active
    window.bn.disconnect = logout
  }, [logout, active])
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 2)}` : null
  return (
    <StyledWallet isActive={isActive} onClick={handleWalletClick}>
      <WalletIcon color={isActive ? '#7A6EAA' : '#929AA5'} />
      <Text style={{ marginLeft: '4px' }} color="textSubtle">
        {accountEllipsis}
      </Text>
    </StyledWallet>
  )
}

const Navbar = ({ height = 44 }) => {
  const { theme, isDark } = useTheme()
  const systemInfo = useSystemInfo()
  const top = systemInfo?.statusBarHeight ?? 0
  return (
    <Box>
      <Box
        style={{
          display: 'flex',
          height: `${height}px`,
          alignItems: 'center',
          // px: '24px',
          position: 'fixed',
          top: '0px',
          left: '0px',
          right: '0px',
          justifyContent: 'center',
          width: '100vw',
          zIndex: '100',
          background: theme.colors.backgroundAlt,
          paddingTop: `${top}px`,
          boxSizing: 'content-box',
        }}
      >
        <Wallet />
        <Image height={20} width={130} src={isDark ? title.dark : title.light} />
      </Box>
      <Box style={{ height: `${height + top}px` }} />
    </Box>
  )
}

export default Navbar
