import type { Bridge } from '@chainsafe/chainbridge-contracts'
import type { BridgeChain } from './config'
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { erc20ABI, useBalance, usePublicClient, useWalletClient } from "wagmi";
import { useWeb3React } from '@pancakeswap/wagmi'
import { bridgeChains } from './config'
import { Currency, CurrencyAmount, ERC20Token, Native } from '@pancakeswap/sdk'
import { useTokenBalances } from 'state/wallet/hooks'
import { useRouter } from 'next/router'
import { useContract, useERC20 } from "hooks/useContract";
import { bridgeABI } from 'config/abi/bridge'
import { parseUnits } from "viem";
import { getContract } from "utils/contractHelpers";
import {useActiveChainId} from "hooks/useActiveChainId";

type Tokens = { [address: string]: ERC20Token }

export interface TransactionError {
  status: number
  message: string
}

export type TransactionStatus =
  | 'Initializing Transfer'
  | 'Approve 0'
  | 'Approve'
  | 'Deposit'
  | 'In Transit'
  | 'Transfer Completed'
  | 'Transfer Aborted'
  | TransactionError

export const isTransactionError = (status: TransactionStatus): status is TransactionError =>
  typeof status === 'object' && 'status' in status && 'message' in status

interface BridgeContext {
  homeChainConfig: BridgeChain
  destinationChainConfig: BridgeChain
  setDestinationChainId: (id: number) => void
  destinationChainId: number
  currency?: Currency
  setCurrency: (currency: Currency) => void
  depositAmount: string
  setDepositAmount: (amount: string) => void
  recipient?: string
  setRecipient: (recipient: string) => void
  toOtherAddress: boolean
  setToOtherAddress: (toOtherAddress: boolean) => void
  tokens: Tokens
  tokenBalances: ReturnType<typeof useTokenBalances>

  transactionStatus?: TransactionStatus
  setTransactionStatus: (status: TransactionStatus) => void
  depositNonce?: string
  setDepositNonce: (nonce: string) => void
  homeTransferTxHash?: string
  setHomeTransferTxHash: (hash: string) => void
  showNative: boolean
  showApprovalFlow: boolean
  hasApproval: boolean
  setHasApproval: (hasApproval: boolean) => void
}

const BridgeContext = createContext<BridgeContext | undefined>(undefined)

export const BridgeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { chainId } = useActiveChainId()
  const { account } = useWeb3React()
  const [currency, setCurrency] = useState<Currency | undefined>()
  const [depositAmount, setDepositAmount] = useState('')
  const [destinationChainId, setDestinationChainId] = useState<number | undefined>()
  useEffect(() => {
    setDestinationChainId(bridgeChains.find((chain) => chain.networkId !== chainId)?.networkId)
  }, [chainId])
  const homeChainConfig = useMemo(() => bridgeChains.find((chain) => chain.networkId === chainId), [chainId])
  const destinationChainConfig = useMemo(
    () => bridgeChains.find((chain) => chain.networkId === destinationChainId),
    [destinationChainId],
  )
  const { data: walletClient } = useWalletClient()
  const bridge = useContract(homeChainConfig.bridgeAddress as `0x${string}`, bridgeABI)
  const [recipient, setRecipient] = useState<string>()
  const [toOtherAddress, setToOtherAddress] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus | undefined>()
  const [depositNonce, setDepositNonce] = useState<string | undefined>()
  const [homeTransferTxHash, setHomeTransferTxHash] = useState<string | undefined>()
  const [showApprovalFlow, setShowApprovalFlow] = useState(false)
  const [hasApproval, setHasApproval] = useState(false)

  useEffect(() => {
    const setApprovalFlow = async () => {
      if (!homeChainConfig || !bridge || !depositAmount || !currency) return
      if (currency.isNative) {
        setHasApproval(true)
        setShowApprovalFlow(false)
      }
      const tokenAddress = currency instanceof ERC20Token ? currency.address : undefined
      if (!tokenAddress) return
      const erc20 = getContract({
        abi: erc20ABI,
        address: tokenAddress,
        chainId,
        signer: walletClient,
      })
      const token = homeChainConfig.tokens.find((t) => t.address === tokenAddress)
      if (!token) return
      const handlerAddress = await bridge.read._resourceIDToHandlerAddress([token.resourceId as `0x${string}`])
      const currentAllowance = await erc20.read.allowance([account, handlerAddress])
      const erc20Decimals = await erc20.read.decimals()
      const amountBI = parseUnits(depositAmount, erc20Decimals)

      setShowApprovalFlow(currentAllowance < amountBI)
      setHasApproval(currentAllowance >= amountBI)
    }
    setApprovalFlow()
  }, [homeChainConfig, currency, bridge, depositAmount])

  useEffect(() => {
    if (homeChainConfig && destinationChainConfig) {
      setCurrency(undefined)
      setDepositAmount('')
    }
  }, [homeChainConfig, destinationChainConfig])
  const destPublicClient = usePublicClient({ chainId: destinationChainId })

  useEffect(() => {
    if (!destinationChainConfig) return () => undefined

    const destinationBridge = getContract({
      abi: bridgeABI,
      address: destinationChainConfig.bridgeAddress as `0x${string}`,
      chainId: destinationChainId,
      publicClient: destPublicClient
    })

    const unwatch = destPublicClient.watchContractEvent({
      address: destinationBridge.address,
      abi: bridgeABI,
      eventName: 'ProposalEvent',
      onLogs: logs => {
        logs.forEach(log => {
          // const originDomainId = log.args.originDomainID
          // const nonce = log.args.depositNonce
          // const status = log.args.status
          const {originDomainID , depositNonce: nonce, status} = log.args
          console.log('ProposalEvent', originDomainID, nonce?.toString(), status)
          if (originDomainID !== homeChainConfig?.domainId) return
          if (nonce.toString() !== depositNonce) return
          if (status === 3) setTransactionStatus('Transfer Completed')
          if (status === 4) setTransactionStatus('Transfer Aborted')
        })
      }
    })

    return unwatch
  }, [depositNonce, homeChainConfig?.domainId, destPublicClient, destinationChainConfig])

  const [tokens, setTokens] = useState<Tokens>({})
  useEffect(() => {
    const tokensWithoutDecimals = homeChainConfig?.tokens.reduce<Tokens>((acc, current) => {
      if (!destinationChainConfig?.tokens.find((token) => token.resourceId === current.resourceId)) return acc
      if (current.address === '0x0000000000000000000000000000000000000001') return acc
      return {
        ...acc,
        [current.address]: new ERC20Token(
          chainId,
          current.address as `0x${string}`,
          homeChainConfig.decimals,
          current.symbol,
          current.name,
        ),
      }
    }, {})
    setTokens(tokensWithoutDecimals)
    let cancelled = false
    const calculateDecimals = async () => {
      const tokensWithDecimals: Tokens = {}
      await Promise.all(
        homeChainConfig?.tokens.map(async (current) => {
          if (!destinationChainConfig?.tokens.find((token) => token.resourceId === current.resourceId)) return
          if (current.address === '0x0000000000000000000000000000000000000001') return
          const erc20 = getContract({
            abi: erc20ABI,
            address: current.address as `0x${string}`,
            chainId,
            signer: walletClient,
          })

          const decimals = await erc20.read.decimals()
          tokensWithDecimals[current.address] = new ERC20Token(
            chainId,
            current.address as `0x${string}`,
            decimals,
            current.symbol,
            current.name,
          )
        }),
      )
      if (cancelled) return
      setTokens(tokensWithDecimals)
    }
    calculateDecimals()
    return () => {
      cancelled = true
    }
  }, [chainId, destinationChainConfig?.tokens, homeChainConfig?.decimals, homeChainConfig?.tokens])
  const nativeBalance = useBalance({ chainId, address: account }).data
  const tokenBalances = {
    ...useTokenBalances(
      account,
      useMemo(() => Object.values(tokens || {}), [tokens]),
    ),
  }
  if (homeChainConfig && nativeBalance?.value) {
    Object.assign(tokenBalances, {
      [homeChainConfig?.tokens.find((token) => token.address === '0x0000000000000000000000000000000000000001')
        ?.address]: CurrencyAmount.fromRawAmount(Native.onChain(chainId), nativeBalance?.value?.toString()),
    })
  }
  const showNative = useMemo(() => {
    const nativeToken = homeChainConfig?.tokens.find(
      (token) => token.address === '0x0000000000000000000000000000000000000001',
    )
    if (!nativeToken) return false
    return destinationChainConfig?.tokens.some((token) => token.resourceId === nativeToken.resourceId)
  }, [destinationChainConfig?.tokens, homeChainConfig?.tokens])

  return (
    <BridgeContext.Provider
      value={{
        homeChainConfig,
        destinationChainConfig,
        setDestinationChainId,
        currency,
        setCurrency,
        depositAmount,
        setDepositAmount,
        destinationChainId,
        recipient: toOtherAddress ? recipient : account,
        setRecipient,
        toOtherAddress,
        setToOtherAddress,
        tokens,
        tokenBalances,
        depositNonce,
        setDepositNonce,
        transactionStatus,
        setTransactionStatus,
        homeTransferTxHash,
        setHomeTransferTxHash,
        showNative,
        showApprovalFlow,
        hasApproval,
        setHasApproval,
      }}
    >
      {children}
    </BridgeContext.Provider>
  )
}

export const useBridge = () => {
  const context = useContext(BridgeContext)
  if (context === undefined) {
    throw new Error('useBridgeContext must be used within a BridgeProvider')
  }
  return context
}
