import IceChain from '../ice-chain'

export const avalanche: IceChain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  features: ['swap'],
  network: 'avalanche',
  rpcUrls: {
    public: { http: ['https://api.avax.network/ext/bc/C/rpc',] },
    default: { http: ['https://api.avax.network/ext/bc/C/rpc',] },
  },
  blockExplorers: {
    default: { name: 'Avalanche C-Chain Explorer', url: 'https://snowtrace.io' },
  },
  nativeCurrency: {
    name: 'Avax',
    symbol: 'AVAX',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 44439977,
    },
  },
  blockInterval: 2,
  wrappedNative: {
    address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    decimals: 18,
    symbol: 'WAVAX',
    name: 'Wrapped Avax',
  },
  stableToken: {
    address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
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