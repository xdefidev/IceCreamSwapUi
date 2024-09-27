import { useContract } from 'hooks/useContract'
import { useActiveChain } from 'hooks/useActiveChain'
import { tokenLockFactoryABI}  from 'config/abi/tokenLockFactory'
import useSWR from 'swr'
import { Address, useAccount } from "wagmi";
import { useActiveChainId } from 'hooks/useActiveChainId'
import { BigNumber } from 'ethers'
import { publicClient } from "utils/wagmi";
import { campaignABI } from "config/abi/campaign";

/** Based on solidity struct */
export interface LockingData {
  owner: string
  token: string
  amount: BigNumber
  // eslint-disable-next-line camelcase
  start_time: BigNumber
  duration: BigNumber
  amountUnlocked: BigNumber
}

export const useLocks = () => {
  const chain = useActiveChain()

  return useContract(chain.locks?.factoryAddress, tokenLockFactoryABI)
}

export const useLockingData = (lockIds?: readonly bigint[]) => {
  const locks = useLocks()
  const { chainId } = useActiveChainId()

  return useSWR(
    lockIds && locks ? ['lock', JSON.stringify(lockIds.map(lockId => lockId.toString()))] : null,
    async () => {
      const multicallResult = await publicClient({ chainId }).multicall({
        contracts: lockIds
          .map((lockId) => [
              {
                abi: tokenLockFactoryABI,
                address: locks.address,
                functionName: 'tokensLocked',
                args: [lockId],
              } as const,
              {
                abi: tokenLockFactoryABI,
                address: locks.address,
                functionName: 'amountToUnlock',
                args: [lockId],
              } as const,
          ]).flat(),
        allowFailure: false,
      })
      let i = 0
      return lockIds
        .map((lockId) => {
          const lockingData = multicallResult[i] as [`0x${string}`, `0x${string}`, bigint, bigint, bigint, bigint]
          const amountToUnlock = multicallResult[i + 1] as bigint
          i += 2
          return {
            lockId,
            owner: lockingData[0],
            token: lockingData[1],
            amount: lockingData[2],
            start_time: lockingData[3],
            duration: lockingData[4],
            amountUnlocked: lockingData[5],
            amountToUnlock,
          }
        })
        .reverse()
    },
    {
      refreshInterval: 10000,
    },
  )
}

export type Lock = ReturnType<typeof useLockingData>['data'][number]

export const useLocksByUser = (account?: Address) => {
  const locks = useLocks()

  const activeAccount = useAccount()
  const user = account ?? activeAccount.address

  const { data: lockIds } = useSWR(user && locks ? ['locks', user] : null, () => locks.read.getUserLocks([user]), {
    refreshInterval: 10000,
  })
  return useLockingData(lockIds)
}

export const useLocksByToken = (tokenAddress?: Address) => {
  const locks = useLocks()

  const { data: lockIds } = useSWR(
    tokenAddress && locks ? ['locks', tokenAddress] : null,
    () => locks.read.getTokenLocks([tokenAddress]),
    {
      refreshInterval: 10000,
    },
  )
  return useLockingData(lockIds)
}
