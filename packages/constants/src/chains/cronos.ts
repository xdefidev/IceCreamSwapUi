import IceChain from '../ice-chain'

export const cronos: IceChain = {
  id: 25,
  name: 'Cronos',
  features: ['swap'],
  network: 'cronos',
  rpcUrls: {
    public: { http: ['https://evm.cronos.org',] },
    default: { http: ['https://evm.cronos.org',] },
  },
  blockExplorers: {
    default: { name: 'Cronos Chain Explorer', url: 'https://explorer.cronos.org' },
  },
  nativeCurrency: {
    name: 'CRO',
    symbol: 'CRO',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 13596285,
    },
  },
  blockInterval: 1,
  wrappedNative: {
    address: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    decimals: 18,
    symbol: 'WCRO',
    name: 'Wrapped CRO',
  },
  stableToken: {
    address: '0x66e428c3f67a68878562e79A0234c1F83c208770',
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