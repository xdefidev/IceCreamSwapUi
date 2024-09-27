import IceChain from '../ice-chain'

export const moonriver: IceChain = {
  id: 1285,
  name: 'Moonbeam',
  features: ['swap'],
  network: 'moonriver',
  rpcUrls: {
    public: { http: ['https://moonriver-rpc.dwellir.com',] },
    default: { http: ['https://moonriver-rpc.dwellir.com',] },
  },
  blockExplorers: {
    default: { name: 'Moonriver Mainnet Explorer', url: 'https://moonriver.moonscan.io' },
  },
  nativeCurrency: {
    name: 'MOVR',
    symbol: 'MOVR',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 6596454,
    },
  },
  blockInterval: 10,
  wrappedNative: {
    address: '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
    decimals: 18,
    symbol: 'WMOVR',
    name: 'Wrapped MOVR',
  },
  stableToken: {
    address: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
    decimals: 18,
    symbol: 'USDC',
    name: 'USD Coin',
  },
  swap: {
    factoryAddress: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    routerAddress: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}