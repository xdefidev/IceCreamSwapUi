import { useBridge } from '../BridgeProvider'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useContract, useERC20 } from "hooks/useContract";
import { bridgeABI } from "config/abi/bridge";
import { decodeEventLog, encodeAbiParameters, formatUnits, parseAbiParameters, parseUnits } from "viem";
import { usePublicNodeWaitForTransaction } from "hooks/usePublicNodeWaitForTransaction";
import { erc20ABI, usePublicClient, useWalletClient } from "wagmi";
import { getContract } from "utils/contractHelpers";
import { useActiveChainId } from "hooks/useActiveChainId";


export const useDeposit = (bridgeFeeWei: bigint = 0n) => {
  const { account } = useWeb3React()
  const { chainId } = useActiveChainId()
  const { setTransactionStatus, setDepositNonce, setHomeTransferTxHash, homeChainConfig } = useBridge()

  const homeBridge = useContract(homeChainConfig.bridgeAddress, bridgeABI)
  const { waitForTransaction } = usePublicNodeWaitForTransaction()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const approve = async (amount: number, tokenAddress: `0x${string}`, setHasApproval: (approval: boolean) => void) => {
    if (!homeChainConfig) {
      console.error('Home bridge contract is not instantiated')
      return
    }
    if (!account) {
      console.log('No signer')
      return
    }
    const token = homeChainConfig.tokens.find((t) => t.address === tokenAddress)
    if (!token) {
      console.log('Invalid token selected')
      return
    }
    const isNative = token.address === '0x0000000000000000000000000000000000000001'
    // const erc20 = Erc20DetailedFactory.connect(tokenAddress, signer)
    const erc20 = getContract({
      abi: erc20ABI,
      address: tokenAddress,
      chainId,
      signer: walletClient,
    })
    const erc20Decimals = isNative ? 18 : await erc20.read.decimals()
    const handlerAddress = await homeBridge.read._resourceIDToHandlerAddress([token.resourceId as `0x${string}`])
    const currentAllowance = isNative ? 0n : await erc20.read.allowance([account, handlerAddress])
    console.log('🚀  currentAllowance', formatUnits(currentAllowance, erc20Decimals))
    // TODO extract token allowance logic to separate function
    const MAX_UINT256 = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
    if (!isNative && Number(formatUnits(currentAllowance, erc20Decimals)) < amount) {
      const txHash = await erc20.write.approve([
          handlerAddress,
          MAX_UINT256, // parseUnits(amount.toString(), erc20Decimals),
        ], {})
      setHasApproval(true)
    }
  }

  const deposit = async (amount: string, recipient: `0x${string}`, tokenAddress: `0x${string}`, destinationDomainId: number) => {
    if (!homeChainConfig || !homeBridge) {
      console.error('Home bridge contract is not instantiated')
      return
    }
    if (!account) {
      console.log('No signer')
      return
    }

    const token = homeChainConfig.tokens.find((t) => t.address === tokenAddress)

    if (!token) {
      console.log('Invalid token selected')
      return
    }

    setTransactionStatus('Initializing Transfer')
    const erc20 = getContract({
      abi: erc20ABI,
      address: tokenAddress,
      chainId,
      signer: walletClient,
    })
    const isNative = token.address === '0x0000000000000000000000000000000000000001'

    const erc20Decimals = isNative ? 18 : await erc20.read.decimals()

    const amountBI = parseUnits(amount, erc20Decimals)

    const data = encodeAbiParameters(
      parseAbiParameters('uint256 amount, uint256 addressLength'),
      [amountBI, BigInt((recipient.length - 2) / 2)]
    ) + recipient.substring(2) as `0x${string}`

    try {
      const handlerAddress = await homeBridge.read._resourceIDToHandlerAddress([token.resourceId as `0x${string}`])
      const currentAllowance = isNative ? 0n : await erc20.read.allowance([account, handlerAddress])
      console.log('🚀  currentAllowance', formatUnits(currentAllowance, erc20Decimals))
      // TODO extract token allowance logic to separate function
      if (!isNative && Number(formatUnits(currentAllowance, erc20Decimals)) < parseFloat(amount)) {
        setTransactionStatus('Approve')
        const MAX_UINT256 = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
        const txHash = await erc20.write.approve([
          handlerAddress,
          MAX_UINT256, // parseUnits(amount.toString(), erc20Decimals),
        ], {})
        await waitForTransaction({hash: txHash})
      }

      setTransactionStatus('Deposit')

      let value = bridgeFeeWei
      if (isNative) {
        value += amountBI
      }

      const depositTransaction = await homeBridge.write.deposit(
        [destinationDomainId, token.resourceId as `0x${string}`, data],
        { value }
      )
      const depositReceipt = await publicClient.waitForTransactionReceipt({hash: depositTransaction})
      // const depositReceipt = await waitForTransaction({hash: depositTransaction})
      const depositLogs = depositReceipt.logs.map(log => {
        try {
          const event = decodeEventLog({
            abi: bridgeABI,
            data: log.data,
            topics: log.topics,
          })
          return event
        } catch {
          return undefined
        }
      }).filter(log => !!log)

      setHomeTransferTxHash(depositTransaction)
      const depositEvent = depositLogs.find((event) => event.eventName === 'Deposit')
      setDepositNonce(`${depositEvent!.args!.depositNonce.toString()}`)
      setTransactionStatus('In Transit')

    } catch (error) {
      console.error(error)
      if (typeof error === 'object' && 'code' in error && 'message' in error) {
        setTransactionStatus({
          status: (error as any).code as number,
          message: (error as any).message as string,
        })
      } else {
        setTransactionStatus('Transfer Aborted')
      }
    }
  }
  return { deposit, approve }
}
