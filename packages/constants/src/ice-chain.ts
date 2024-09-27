import { Chain } from "wagmi";
import { Address, Hash } from 'viem'

type ChainFeature = 'swap' | 'swapV3' | 'farms' | 'farmsV3' | 'info' | 'infoV3' | 'bridge' | 'staking' | 'locks' | 'launchpad' | 'tokenDeployer'  | 'kyc'

interface SwapConfig {
  factoryAddress: Address
  routerAddress: Address
  initCodeHash: Hash
  deploymentTs?: number
}

interface LocksConfig {
  factoryAddress: Address
  factoryAddress2?: Address
}

interface TokenDeployerConfig {
  address: Address
  feeToken: Address
}

interface KycConfig {
  feeToken: Address
  fee: number
  feeWallet: Address
  contractKyced?: Address
  contractKycDelegator?: Address
  contractKycDelegations?: Address
}

interface ChainBase {
  features: ChainFeature[]
  swap?: SwapConfig
  smartRouterAddress?: Address,
  farmV2Address?: Address,
  locks?: LocksConfig
  tokenDeployerDividend?: TokenDeployerConfig
  blockInterval: number
  wrappedNative: {
    name: string
    symbol: string
    address: Address
    decimals: number
  }
  iceAddress?: Address
  stableToken?: {
    name: string
    symbol: string
    address: Address
    decimals: number
  }
  v3SubgraphStart?: number
  campaignFactory?: Address
  kyc?: KycConfig
}

type IceChain = ChainBase & Chain

export default IceChain
