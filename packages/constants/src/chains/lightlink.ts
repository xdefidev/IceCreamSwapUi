import IceChain from '../ice-chain'

export const lightlink: IceChain = {
  id: 1890,
  name: 'Lightlink',
  features: ['swap'],
  network: 'lightlink',
  rpcUrls: {
    public: { http: ['https://replicator.phoenix.lightlink.io/rpc/v1',] },
    default: { http: ['https://replicator.phoenix.lightlink.io/rpc/v1',] },
  },
  blockExplorers: {
    default: { name: 'Lightlink Mainnet Explorer', url: 'https://phoenix.lightlink.io' },
  },
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 79635976,
    },
  },
  blockInterval: 0.3,
  wrappedNative: {
    address: '0x7EbeF2A4b1B09381Ec5B9dF8C5c6f2dBECA59c73',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  stableToken: {
    address: '0x18fB38404DADeE1727Be4b805c5b242B5413Fa40',
    decimals: 6,
    symbol: 'USDC.e',
    name: 'USD Coin',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}