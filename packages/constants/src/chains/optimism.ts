import IceChain from '../ice-chain'

export const optimism: IceChain = {
  id: 10,
  name: 'Optimism',
  features: ['swap'],
  network: 'optimism',
  rpcUrls: {
    public: { http: ['https://mainnet.optimism.io',] },
    default: { http: ['https://mainnet.optimism.io',] },
  },
  blockExplorers: {
    default: { name: 'OP Mainnet Explorer', url: 'https://optimistic.etherscan.io' },
  },
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 118918618,
    },
  },
  blockInterval: 2,
  wrappedNative: {
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  stableToken: {
    address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    routerAddress: '0x3FFc2315A992b01dc4B3f79C8EEa1921091Ee24f',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}