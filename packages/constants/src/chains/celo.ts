import IceChain from '../ice-chain'

export const celo: IceChain = {
  id: 42220,
  name: 'Celo',
  features: ['swap'],
  network: 'celo',
  rpcUrls: {
    public: { http: ['https://forno.celo.org',] },
    default: { http: ['https://forno.celo.org',] },
  },
  blockExplorers: {
    default: { name: 'Celo Chain Explorer', url: 'https://celoscan.io' },
  },
  nativeCurrency: {
    name: 'CELO',
    symbol: 'CELO',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 25188248,
    },
  },
  blockInterval: 5,
  wrappedNative: {
    address: '0x471EcE3750Da237f93B8E339c536989b8978a438',
    decimals: 18,
    symbol: 'CELO',
    name: 'CELO',
  },
  stableToken: {
    address: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
    decimals: 6,
    symbol: 'cUSD',
    name: 'Celo Dollar',
  },
  swap: {
    factoryAddress: '0xFABbD5f4a53725266a4fA84D4140276794572cD6',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    routerAddress: '0xA1d3462AFbFFe3BA45A5044FB899e6E219Ec842A',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}