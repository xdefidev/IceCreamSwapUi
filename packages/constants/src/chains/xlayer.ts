import IceChain from '../ice-chain'

export const xlayer: IceChain = {
  id: 196,
  name: 'X Layer',
  features: ['swap'],
  network: 'xlayer',
  rpcUrls: {
    public: { http: ['https://xlayerrpc.okx.com',] },
    default: { http: ['https://xlayerrpc.okx.com',] },
  },
  blockExplorers: {
    default: { name: 'X Layer explorer', url: 'https://www.oklink.com/xlayer' },
  },
  nativeCurrency: {
    name: 'OKB',
    symbol: 'OKB',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 731723,
    },
  },
  blockInterval: 2,
  wrappedNative: {
    address: '0xe538905cf8410324e03A5A23C1c177a474D59b2b',
    decimals: 18,
    symbol: 'WOKB',
    name: 'Wrapped OKB',
  },
  stableToken: {
    address: '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: '0xC87De04e2EC1F4282dFF2933A2D58199f688fC3d',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    routerAddress: '0xE578184bC88EB48485Bba23a37B5509578d2aE38',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}