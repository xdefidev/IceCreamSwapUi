import IceChain from '../ice-chain'

export const fantom: IceChain = {
  id: 250,
  name: 'Fantom Opera',
  features: ['swap'],
  network: 'fantom',
  rpcUrls: {
    public: { http: ['https://rpcapi.fantom.network',] },
    default: { http: ['https://rpcapi.fantom.network',] },
  },
  blockExplorers: {
    default: { name: 'Fantom Mainnet Explorer', url: 'https://ftmscanc.com' },
  },
  nativeCurrency: {
    name: 'Fantom',
    symbol: 'FTM',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 79696343,
    },
  },
  blockInterval: 5,
  wrappedNative: {
    address: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    decimals: 18,
    symbol: 'WFTM',
    name: 'Wrapped Fantom',
  },
  stableToken: {
    address: '0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355',
    decimals: 18,
    symbol: 'FRAX',
    name: 'Frax',
  },
  swap: {
    factoryAddress: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    routerAddress: '0x3FFc2315A992b01dc4B3f79C8EEa1921091Ee24f',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}