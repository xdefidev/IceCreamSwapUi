import { FACTORY_ADDRESS, INIT_CODE_HASH } from "../common/swap";
import IceChain from '../ice-chain'

export const shardeumTestnet: IceChain = {
  id: 8082,
  name: 'Shardeum Sphinx 1.X',
  features: ['swap'],
  network: 'shardeumTestnet',
  rpcUrls: {
    public: { http: ['https://sphinx.shardeum.org'] },
    default: { http: ['https://sphinx.shardeum.org'] },
  },
  blockExplorers: {
    default: { name: 'Shardeum(Testnet) Explorer', url: 'https://explorer-sphinx.shardeum.org' },
  },
  nativeCurrency: {
    name: 'Shardeum',
    symbol: 'SHM',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0xBD2e577dEa54602C7c367fa144981c8ACA6FD570',
      blockCreated: 57501,
    },
  },
  blockInterval: 60,
  wrappedNative: {
    address: '0x5eB65C6feC23d4eb36bC9966aA110Fe13FBd7c7F',
    decimals: 18,
    symbol: 'WSHM',
    name: 'Wrapped Shardeum',
  },
  iceAddress: '0xb5C7882e37359572FD1cCFAA276e7Fdf70145D42',
  stableToken: {
    address: '0x43891084581fD07Ee1189f3a2f04e51c26a95B77',
    decimals: 18,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  swap: {
    factoryAddress: FACTORY_ADDRESS,
    initCodeHash: INIT_CODE_HASH,
    routerAddress: "0xf3a3dAf360161B2f10c645EF039C709A3Fd4Ea62",
  },
  smartRouterAddress: '0xe0627818b29D2f28E62f54bC988E6e02C8dbC300',
}
