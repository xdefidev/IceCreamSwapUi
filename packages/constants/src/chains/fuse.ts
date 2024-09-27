import { FACTORY_ADDRESS, INIT_CODE_HASH, ROUTER_ADDRESS } from "../common/swap";
import IceChain from '../ice-chain'

export const fuse: IceChain = {
  id: 122,
  name: 'Fuse Mainnet',
  features: ['swap'],
  network: 'fuse',
  rpcUrls: {
    public: { http: ['https://rpc.fuse.io'] },
    default: { http: ['https://rpc.fuse.io'] },
  },
  blockExplorers: {
    default: { name: 'Fuse Explorer', url: 'https://explorer.fuse.io' },
  },
  nativeCurrency: {
    name: 'Fuse',
    symbol: 'FUSE',
    decimals: 18,
  },
  blockInterval: 5,
  contracts: {
    multicall3: {
      address: '0x43891084581fD07Ee1189f3a2f04e51c26a95B77',
      blockCreated: 20060779,
    },
  },
  wrappedNative: {
    address: '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629',
    decimals: 18,
    symbol: 'WFUSE',
    name: 'Wrapped Fuse',
  },
  iceAddress: '0x867f08A3ab824b42e8058a1B48e32E1dF205b092',
  stableToken: {
    address: '0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10',
    decimals: 18,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    routerAddress: ROUTER_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
  },
  smartRouterAddress: '0x698a912F8CA34Df9b46E6Ea4A2B2DB0B7151b083',
  farmV2Address: '0xBbB4CCfc93657AC125F4b1f734111349d1bFF611',
}
