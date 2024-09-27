import BigNumber from 'bignumber.js'
import { masterChefV2ABI } from 'config/abi/masterchefV2'
import { getMasterChefV2Address } from 'utils/addressHelpers'
import { SerializedFarmConfig } from 'config/constants/types'
import { getCrossFarmingReceiverContract } from 'utils/contractHelpers'
import { Address, erc20ABI } from 'wagmi'
import { publicClient } from 'utils/wagmi'
import { ContractFunctionResult } from 'viem'

export const fetchFarmUserAllowances = async (
  account: Address,
  farmsToFetch: SerializedFarmConfig[],
  chainId: number,
  proxyAddress?: Address,
) => {
  // const isBscNetwork = verifyBscNetwork(chainId)
  const masterChefAddress = getMasterChefV2Address(chainId) // isBscNetwork ? getMasterChefAddress(chainId) : getNonBscVaultAddress(chainId)

  const lpAllowances = await publicClient({ chainId }).multicall({
    contracts: farmsToFetch.map((farm) => {
      const lpContractAddress = farm.lpAddress
      return {
        abi: erc20ABI,
        address: lpContractAddress,
        functionName: 'allowance',
        args: [account, proxyAddress || masterChefAddress] as const,
      } as const
    }),
    allowFailure: false,
  })

  const parsedLpAllowances = lpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance.toString()).toJSON()
  })

  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (
  account: string,
  farmsToFetch: SerializedFarmConfig[],
  chainId: number,
) => {
  const rawTokenBalances = await publicClient({ chainId }).multicall({
    contracts: farmsToFetch.map((farm) => {
      const lpContractAddress = farm.lpAddress
      return {
        abi: erc20ABI,
        address: lpContractAddress,
        functionName: 'balanceOf',
        args: [account as Address] as const,
      } as const
    }),
    allowFailure: false,
  })

  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance.toString()).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (
  account: string,
  farmsToFetch: SerializedFarmConfig[],
  chainId: number,
) => {
  // const isBscNetwork = verifyBscNetwork(chainId)
  const masterChefAddress = getMasterChefV2Address(chainId) // isBscNetwork ? getMasterChefAddress(chainId) : getNonBscVaultAddress(chainId)

  const rawStakedBalances = (await publicClient({ chainId }).multicall({
    contracts: farmsToFetch.map((farm) => {
      return {
        abi: masterChefV2ABI,
        address: masterChefAddress,
        functionName: 'userInfo',
        args: [BigInt(farm.vaultPid ?? farm.pid), account as Address] as const,
      } as const
    }),
    allowFailure: false,
  })) as ContractFunctionResult<typeof masterChefV2ABI, 'userInfo'>[]

  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0].toString()).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (
  account: Address,
  farmsToFetch: SerializedFarmConfig[],
  chainId: number,
) => {
  // const isBscNetwork = verifyBscNetwork(chainId)
  const multiCallChainId = chainId
  const userAddress = account
  const masterChefAddress = getMasterChefV2Address(multiCallChainId)

  const rawEarnings = await publicClient({ chainId: multiCallChainId }).multicall({
    contracts: farmsToFetch.map((farm) => {
      return {
        abi: masterChefV2ABI,
        address: masterChefAddress,
        functionName: 'pendingIce',
        args: [BigInt(farm.pid), userAddress as Address] as const,
      } as const
    }),
    allowFailure: false,
  })

  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings.toString()).toJSON()
  })
  return parsedEarnings
}

export const fetchCProxyAddress = async (address: Address, chainId: number) => {
  try {
    const crossFarmingAddress = getCrossFarmingReceiverContract(null, chainId)
    const cProxyAddress = await crossFarmingAddress.read.cProxy([address])
    return cProxyAddress
  } catch (error) {
    console.error('Failed Fetch CProxy Address', error)
    return address
  }
}
