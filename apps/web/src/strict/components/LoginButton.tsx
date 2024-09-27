import { trpc, trpcClient } from '@icecreamswap/backend'
import { useTranslation } from '@pancakeswap/localization'
import { LogoutIcon, UserMenuItem } from '@pancakeswap/uikit'
import { useAccount, useWalletClient } from "wagmi";

const LoginButton: React.FC = () => {
  const { t } = useTranslation()
  const { address } = useAccount()
  // @ts-ignore
  const user = trpc.session.user.useQuery(undefined, {
    refetchInterval: false,
  })

  const { data: walletClient } = useWalletClient()

  const onLogin = async () => {
    if (!walletClient || !address) return

    // @ts-ignore
    const { nonce } = await trpcClient.session.nonce.query()
    const signature = await walletClient.signMessage({ message: nonce, account: address })
    // @ts-ignore
    await trpcClient.session.login.mutate({
      signature,
      address: address!,
    })
  }

  const onLogout = async () => {
    // @ts-ignore
    await trpcClient.session.logout.mutate()
  }

  return user.data?.isLoggedIn ? (
    <UserMenuItem as="button" disabled={false} onClick={onLogout}>
      {t('Logout')} {`(${user.data?.role === 'KYC' ? 'KYC' : user.data?.name})`}
      <LogoutIcon />
    </UserMenuItem>
  ) : (
    <UserMenuItem as="button" disabled={false} onClick={onLogin}>
      {t('Login')}
    </UserMenuItem>
  )
}

export default LoginButton
