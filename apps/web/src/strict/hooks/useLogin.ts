import { trpcClient } from '@icecreamswap/backend'
import { Address, useWalletClient } from "wagmi";
import useAccountActiveChain from "hooks/useAccountActiveChain";
import { WalletClient } from "viem/dist/types/clients/createWalletClient";

export const useOnLogin = (address: string, walletClient: WalletClient, account: Address) => async () => {
  if (!address) return
  // @ts-ignore
  const { nonce } = await trpcClient.session.nonce.query()
  if (!walletClient) return
  const signature = await walletClient.signMessage({message: nonce, account})
  // @ts-ignore
  await trpcClient.session.login.mutate({
    signature,
    address: address!,
  })
}
