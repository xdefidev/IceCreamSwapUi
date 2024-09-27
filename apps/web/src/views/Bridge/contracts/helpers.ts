import { BridgeChain, TokenConfig } from '../config'
import { utils } from 'ethers'
import { erc20ABI } from "wagmi";
import { getContract } from "utils/contractHelpers";
import { bridgeABI } from "config/abi/bridge";
import { bridgeErc20HandlerABI } from "config/abi/bridgeErc20Handler";
import { publicClient } from "utils/wagmi";

export const hasTokenSupplies = async (destinationChain: BridgeChain, token: TokenConfig, amount: number) => {
  const destinationToken = destinationChain?.tokens.find(
    (_token: TokenConfig) => _token.resourceId === token.resourceId,
  )
  if (destinationToken && destinationChain !== undefined && destinationChain.type === 'Ethereum') {
    const destPublicClient = publicClient({ chainId: destinationChain.networkId })

    const destinationBridge = getContract({
      abi: bridgeABI,
      address: destinationChain.bridgeAddress as `0x${string}`,
      chainId: destinationChain.networkId,
      publicClient: destPublicClient
    })

    const erc20destinationToken = getContract({
      abi: erc20ABI,
      address: destinationToken.address as `0x${string}`,
      chainId: destinationChain.networkId,
      publicClient: destPublicClient
    })
    const destinationNativeCoin = destinationToken.address === '0x0000000000000000000000000000000000000001'

    const destinationErc20Handler = await destinationBridge.read._resourceIDToHandlerAddress([destinationToken.resourceId as `0x${string}`])

    const destinationErc20DHandlerInstance = getContract({
      abi: bridgeErc20HandlerABI,
      address: destinationErc20Handler,
      chainId: destinationChain.networkId,
      publicClient: destPublicClient
    })

    const isMintable = await destinationErc20DHandlerInstance.read._burnList([destinationToken.address as `0x${string}`])
    if (isMintable) {
      console.log('token mintable on destination chain')
      return true
    }
    let balanceTokens: bigint
    let erc20Decimals: number | undefined
    if (!destinationNativeCoin) {
      balanceTokens = await erc20destinationToken.read.balanceOf([destinationErc20Handler])
      erc20Decimals = await erc20destinationToken.read.decimals()
    } else {
      balanceTokens = await destPublicClient.getBalance({ address: destinationErc20Handler })
      erc20Decimals = 18
    }

    const amountAvailable = Number(utils.formatUnits(balanceTokens, erc20Decimals))
    if (amountAvailable < amount) {
      console.log('Not enough token balance on destination chain! wanted:', amount, 'available:', amountAvailable)
      return false
    }
    return true
  }
  return false
}
