import { FACTORY_ADDRESS, INIT_CODE_HASH, ROUTER_ADDRESS } from "../common/swap";
import IceChain from '../ice-chain';

export const core: IceChain = {
  id: 86,
  name: 'Gatechain',
  features: ['swap'],
  network: 'gate',
  rpcUrls: {
    public: { http: ['https://evm.nodeinfo.cc'] },
    default: { http: ['https://evm.nodeinfo.cc'] },
  },
  blockExplorers: {
    default: { name: 'Gate Explorer', url: 'https://www.gatescan.org' },
  },
  nativeCurrency: {
    name: 'GATE',
    symbol: 'GT',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0x903E57428d36d4B12487fA22db2cBE8Dda56465B',
      blockCreated: 14752042,
    },
  },
  tokenDeployerDividend: {
    address: '0x5c39F20A0d75Cc8695cfBa8d97178aB64e60d848',
    feeToken: '0x493a8A12706Ad08b8c866b65d226cF675A10049e',
  },
  locks: {
    factoryAddress: '0xFDfD00471d8bebA97B40f5D1599b7A84C16dd7d2',
    factoryAddress2: '0xA48E76d95619f4c9838Df19FDeE690a06581b5dD',
  },
  blockInterval: 3,
  wrappedNative: {
    address: '0x672f30407A71fa8737A3A14474ff37E09c7Fc44a',
    decimals: 18,
    symbol: 'WGT',
    name: 'Wrapped Gate',
  },
  iceAddress: '0x493a8A12706Ad08b8c866b65d226cF675A10049e',
  stableToken: {
    address: '0x4151Ab5072198D0843CD2999590Ef292F49d6c66',
    decimals: 18,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    routerAddress: ROUTER_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
    deploymentTs: 1727245347,
  },
  smartRouterAddress: '0xBd8BB286Cd14124720F3f8C5F3fdD7fa13735Dc2',
  farmV2Address: '0xe3277bb0f3C4b9C6FC1DBf81E328E14F3C9368C3',
  campaignFactory: '0x79218D6d562a435ec258f2f4D8D17f1DEbbb114a',
  kyc: {
    feeToken: '0x493a8A12706Ad08b8c866b65d226cF675A10049e',
    fee: 10,
    feeWallet: '0x2Bfd1fc5e25a8F55C2E849492ad7966EA8A0dd9E',
    contractKyced: '0x913E332d552b98355587BBa82b1256BCAdbCeD48',
    contractKycDelegator: '0x682EAb822E5896dF1cD33C1Cd6EE99a3154Dd47E',
    contractKycDelegations: '0x790C138B110Bfb517cE5FaB8CF1a51ffDaAa9754',
  },
  v3SubgraphStart: 9212906,
}

// features: ['swap', 'swapV3', 'farms', 'farmsV3', 'info', 'infoV3', 'locks', 'staking', 'kyc', 'launchpad', 'tokenDeployer'],