import IceChain from '../ice-chain'

export const moonbeam: IceChain = {
  id: 1284,
  name: 'Moonbeam',
  features: ['swap'],
  network: 'moonbeam',
  rpcUrls: {
    public: { http: ['https://rpc.api.moonbeam.network',] },
    default: { http: ['https://rpc.api.moonbeam.network',] },
  },
  blockExplorers: {
    default: { name: 'Moonbeam Mainnet Explorer', url: 'https://moonbeam.moonscan.io' },
  },
  nativeCurrency: {
    name: 'GLMR',
    symbol: 'GLMR',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c',
      blockCreated: 5983928,
    },
  },
  blockInterval: 10,
  wrappedNative: {
    address: '0xAcc15dC74880C9944775448304B263D191c6077F',
    decimals: 18,
    symbol: 'WGLMR',
    name: 'Wrapped GLMR',
  },
  stableToken: {
    address: '0x322E86852e492a7Ee17f28a78c663da38FB33bfb',
    decimals: 18,
    symbol: 'FRAX',
    name: 'Frax',
  },
  swap: {
    factoryAddress: '0x63d3C7Ab37ca36A2A0A338076C163fF60c72527c',
    initCodeHash: '0x0437378fc27e93c612c5c385779bf540ca2064b54705e48c313aa216da380100',
    routerAddress: '0xb4FE60CD05A3e68668007Cee83DDFD9A50A45B36',
  },
  smartRouterAddress: '0x16A3247Db4588176c24C6A5F6d3fd2C174122DF5',
}