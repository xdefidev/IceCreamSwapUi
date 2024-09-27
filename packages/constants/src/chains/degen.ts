import IceChain from '../ice-chain'

export const degen: IceChain = {
  id: 666666666,
  name: 'Degen Chain',
  features: ['swap', 'bridge'],
  network: 'degen',
  rpcUrls: {
    public: { http: ['https://rpc.degen.tips'] },
    default: { http: ['https://rpc.degen.tips'] },
  },
  blockExplorers: {
    default: { name: 'Degen Explorer', url: 'https://explorer.degen.tips' },
  },
  nativeCurrency: {
    name: 'DEGEN',
    symbol: 'DEGEN',
    decimals: 18,
  },
  blockInterval: 0.1,
  contracts: {
    multicall3: {
      address: '0x79035Dc4436bA9C95016D3bF6304e5bA78B1066A',
      blockCreated: 2279171,
    },
  },
  wrappedNative: {
    address: '0xEb54dACB4C2ccb64F8074eceEa33b5eBb38E5387',
    decimals: 18,
    symbol: 'WDEGEN',
    name: 'Wrapped DEGEN',
  },
  iceAddress: '0x7b2a5C88AB9367147F6ac384F857CbaDF5aA70a7',
  stableToken: {
    address: '0x8ACeb2687B59F97Da274FE9135C3fAda0751ecb2',
    decimals: 18,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: "0x064b3B79A13A3D8959614AC45ffb7907A135f57a",
    routerAddress: "0x4Cbd6DE8819237d43EA44b8F14fd4d39bCc3c2D5",
    initCodeHash: "0x0b6b499b70a5c571677814eaf859942ef2336f97496a25dfb5a151a02e7f1c5d",
  },
  smartRouterAddress: '0xb6D5B39F96d379569d47cC84024f3Cd78c5Ef651',
}
