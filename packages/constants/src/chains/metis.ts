import IceChain from '../ice-chain'

export const metis: IceChain = {
  id: 1088,
  name: 'Metis',
  features: ['swap'],
  network: 'metis',
  rpcUrls: {
    public: { http: ['https://andromeda.metis.io/?owner=1088',] },
    default: { http: ['https://andromeda.metis.io/?owner=1088',] },
  },
  blockExplorers: {
    default: { name: 'Metis Andromeda explorer', url: 'https://andromeda-explorer.metis.io' },
  },
  nativeCurrency: {
    name: 'METIS',
    symbol: 'METIS',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 16733683,
    },
  },
  blockInterval: 4,
  wrappedNative: {
    address: '0x75cb093E4D61d2A2e65D8e0BBb01DE8d89b53481',
    decimals: 18,
    symbol: 'WMETIS',
    name: 'Wrapped METIS',
  },
  stableToken: {
    address: '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC',
    decimals: 6,
    symbol: 'm.USDT',
    name: 'USDT Token',
  },
  swap: {
    factoryAddress: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    routerAddress: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}