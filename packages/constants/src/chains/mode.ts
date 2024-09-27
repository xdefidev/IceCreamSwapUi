import IceChain from '../ice-chain'

export const mode: IceChain = {
  id: 34443,
  name: 'Mode',
  features: ['swap'],
  network: 'mode',
  rpcUrls: {
    public: { http: ['https://1rpc.io/mode',] },
    default: { http: ['https://1rpc.io/mode',] },
  },
  blockExplorers: {
    default: { name: 'Mode explorer', url: 'https://explorer.mode.network' },
  },
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 6815747,
    },
  },
  blockInterval: 3,
  wrappedNative: {
    address: '0x4200000000000000000000000000000000000006',
    decimals: 18,
    symbol: 'WETH',
    name: 'Wrapped Ether',
  },
  stableToken: {
    address: '0xf0F161fDA2712DB8b566946122a5af183995e2eD',
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