import IceChain from '../ice-chain'

export const kroma: IceChain = {
  id: 255,
  name: 'kroma',
  features: ['swap'],
  network: 'kroma',
  rpcUrls: {
    public: { http: ['https://1rpc.io/kroma',] },
    default: { http: ['https://1rpc.io/kroma',] },
  },
  blockExplorers: {
    default: { name: 'Kroma Mainnet Explorer', url: 'https://kromascan.com' },
  },
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 9915378,
    },
  },
  blockInterval: 2,
  wrappedNative: {
    address: '0x4200000000000000000000000000000000000001',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  stableToken: {
    address: '0x0Cf7c2A584988871b654Bd79f96899e4cd6C41C0',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    routerAddress: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}