import { ChainId } from '@pancakeswap/sdk'
import { masterChefAddresses , masterChefV3Addresses } from '@pancakeswap/farms'
import { DEPLOYER_ADDRESSES } from '@pancakeswap/v3-sdk'
import { V3_QUOTER_ADDRESSES } from '@pancakeswap/smart-router/evm'
import { chains } from "@icecreamswap/constants";
import { Address } from "wagmi";

export default {
  masterChef: masterChefAddresses,
  masterChefV3: masterChefV3Addresses,
  masterChefV1: {},
  multiCall: chains.reduce((acc, chain) => {
    if (!chain.contracts || !chain.contracts.multicall3) return acc
    return {...acc, [chain.id]: chain.contracts.multicall3.address}
  }, {}) as { [key in ChainId]: Address },
  sousChef: {},
  lotteryV2: {},
  pancakeProfile: {},
  pancakeBunnies: {},
  bunnyFactory: {},
  claimRefund: {},
  pointCenterIfo: {},
  bunnySpecial: {},
  tradingCompetitionEaster: {},
  tradingCompetitionFanToken: {},
  tradingCompetitionMobox: {},
  tradingCompetitionMoD: {},
  easterNft: {},
  cakeVault: {},
  cakeFlexibleSideVault: {},
  predictionsBNB: {},
  predictionsICE: {},
  chainlinkOracleBNB: {},
  chainlinkOracleICE: {},
  predictionsV1: {},
  bunnySpecialCakeVault: {},
  bunnySpecialPrediction: {},
  bunnySpecialLottery: {},
  bunnySpecialXmas: {},
  farmAuction: {},
  AnniversaryAchievement: {},
  nftMarket: {},
  nftSale: {},
  pancakeSquad: {},
  potteryDraw: {},
  zap: {},
  stableSwapNativeHelper: {},
  iCake: {},
  bCakeFarmBooster: {},
  bCakeFarmBoosterProxyFactory: {},
  nonBscVault: {},
  crossFarmingSender: {},
  crossFarmingReceiver: {},
  mmLinkedPool: {},
  tradingReward: {},
  nftPositionManager: {
    [ChainId.CORE]: '0xe944Fa9AE06680FDfDc782f8bEfE2F03bf9a902C',
  },
  v3PoolDeployer: DEPLOYER_ADDRESSES,
  v3Migrator: {
    [ChainId.CORE]: '0x2b28Cf5C0b50f8fDFC35Dc74a898711664266071',
  },
  quoter: V3_QUOTER_ADDRESSES,
  v3Airdrop: {},
  affiliateProgram: {},
  tradingRewardTopTrades: {},
  vCake: {},
  revenueSharingPool: {},
} as const satisfies Record<string, Record<number, `0x${string}`>>
