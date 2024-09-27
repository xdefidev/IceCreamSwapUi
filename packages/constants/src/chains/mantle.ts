import IceChain from '../ice-chain'

export const mantle: IceChain = {
  id: 5000,
  name: 'Mantle',
  features: ['swap'],
  network: 'mantle',
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/mantle',] },
    default: { http: ['https://rpc.ankr.com/mantle',] },
  },
  blockExplorers: {
    default: { name: 'Mantle Mainnet Explorer', url: 'https://explorer.mantle.xyz' },
  },
  nativeCurrency: {
    name: 'Mantle',
    symbol: 'MNT',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 62741137,
    },
  },
  blockInterval: 1,
  wrappedNative: {
    address: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
    decimals: 18,
    symbol: 'WMNT',
    name: 'Wrapped Mantle',
  },
  stableToken: {
    address: '0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9',
    decimals: 6,
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