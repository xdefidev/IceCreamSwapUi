import { useEffect, useState } from 'react'
import { utils } from 'ethers'
import { useBridge } from '../BridgeProvider'
import { ERC20Token } from '@pancakeswap/sdk'
import { useContract, useERC20 } from "hooks/useContract";
import { bridgeABI } from "config/abi/bridge";
import { useWeb3React } from "@pancakeswap/wagmi";
import { erc20ABI, useWalletClient } from "wagmi";
import { getContract } from "utils/contractHelpers";
import { useActiveChainId } from "hooks/useActiveChainId";

export const useBridgeTax = () => {
  const {
    homeChainConfig,
    currency,
    depositAmount,
    destinationChainConfig,
    tokenBalances,
  } = useBridge()
  const { chainId } = useActiveChainId()
  const { data: walletClient } = useWalletClient()
  const { account} = useWeb3React()
  const [bridgeFeeNativeWei, setBridgeFeeNativeWei] = useState<bigint | undefined>()
  const [bridgeFee, setBridgeFee] = useState<number | undefined>()
  const [bridgeFeeToken, setBridgeFeeToken] = useState<string | undefined>()
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>()

  const homeBridge = useContract(homeChainConfig.bridgeAddress, bridgeABI)

  useEffect(() => {
    const getRelayerThreshold = async () => {
      const threshold = await homeBridge.read._relayerThreshold()
      setRelayerThreshold(threshold)
    }
    getRelayerThreshold()
  }, [homeBridge])

  const selectedToken =
    currency instanceof ERC20Token
      ? currency.address
      : currency?.isNative
      ? '0x0000000000000000000000000000000000000001'
      : undefined
  const destinationDomainId = destinationChainConfig?.domainId

  useEffect(() => {
    const getBridgeFee = async () => {
      if (
        homeBridge &&
        selectedToken &&
        homeChainConfig &&
        depositAmount &&
        destinationDomainId
      ) {
        const token = homeChainConfig.tokens.find((t) => t.address === selectedToken)
        if (!token) {
          console.error('Token not found')
          return
        }
        const recipient = account
        const erc20 = getContract({
          abi: erc20ABI,
          address: token.address,
          chainId,
          signer: walletClient,
        })
        const isNative = token.address === '0x0000000000000000000000000000000000000001'
        const erc20Decimals = homeChainConfig.decimals || (isNative ? 18 : await erc20.read.decimals())

        const data: `0x${string}` = `0x${utils
          .hexZeroPad(utils.parseUnits(depositAmount.toString(), erc20Decimals).toHexString(), 32)
          .substring(2)}${utils.hexZeroPad(utils.hexlify((recipient.length - 2) / 2), 32).substring(2)}${
          recipient.substring(2) // recipientAddress (?? bytes)
        }`

        try {
          const [ feeToken, fee ] = await homeBridge.read.calculateHandlerFee([
            destinationDomainId,
            token.resourceId as `0x${string}`,
            data,
          ])

          const feeNative = await homeBridge.read.calculateBridgeFee([
            destinationDomainId,
            token.resourceId as `0x${string}`,
            data,
          ])
          const feeTokenInfos = homeChainConfig.tokens.find((t) => t.address === feeToken)
          let decimals: number
          if (feeToken === '0x0000000000000000000000000000000000000001') {
            decimals = 18
          } else if (!feeTokenInfos) {
            const feeTokenErc20 = getContract({
              abi: erc20ABI,
              address: feeToken,
              chainId,
              signer: walletClient,
            })
            decimals = await feeTokenErc20.read.decimals()
          } else {
            decimals = homeChainConfig.decimals
          }
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const bridgeFee = Number(utils.formatUnits(fee, decimals))
          setBridgeFeeNativeWei(feeNative)
          setBridgeFee(bridgeFee)
          setBridgeFeeToken(feeToken)
        } catch (e) {
          console.error(e)
          setBridgeFee(undefined)
          setBridgeFeeToken(undefined)
        }
      }
    }
    getBridgeFee()
  }, [depositAmount, destinationDomainId, homeBridge, homeChainConfig, selectedToken])

  const bridgeFeeCurrency = homeChainConfig?.tokens.find((t) => t.address === bridgeFeeToken)

  const checkFee = () => {
    if (depositAmount && tokenBalances[selectedToken || '']) {
      return bridgeFeeToken && typeof bridgeFee !== 'undefined'
    }
    return false
  }

  return {
    bridgeFee,
    bridgeFeeToken,
    bridgeFeeNativeWei,
    bridgeFeeNative: bridgeFeeNativeWei? Number(utils.formatUnits(bridgeFeeNativeWei, 18)): undefined,
    relayerThreshold,
    bridgeFeeCurrency,
    hasBridgeFee: checkFee(),
  }
}
