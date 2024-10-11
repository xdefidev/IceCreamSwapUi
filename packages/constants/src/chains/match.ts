import IceChain from '../ice-chain';

export const match: IceChain = {
    id: 698,
    name: 'Matchain',
    features: ['swap'],
    network: 'match',
    rpcUrls: {
        public: { http: ['https://rpc.matchain.io'] },
        default: { http: ['https://rpc.matchain.io'] },
    },
    blockExplorers: {
        default: { name: 'Gate Explorer', url: 'https://www.matchscan.io' },
    },
    nativeCurrency: {
        name: 'Matchain',
        symbol: 'BNB',
        decimals: 18,
    },
    contracts: {
        multicall3: {
            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
            blockCreated: 6952626,
        },
    },
    tokenDeployerDividend: {
        address: '0x5c39F20A0d75Cc8695cfBa8d97178aB64e60d848',
        feeToken: '0x493a8A12706Ad08b8c866b65d226cF675A10049e',
    },
    locks: {
        factoryAddress: '0xFDfD00471d8bebA97B40f5D1599b7A84C16dd7d2',
        factoryAddress2: '0xA48E76d95619f4c9838Df19FDeE690a06581b5dD',
    },
    blockInterval: 3,
    wrappedNative: {
        address: '0x672f30407A71fa8737A3A14474ff37E09c7Fc44a',
        decimals: 18,
        symbol: 'WGT',
        name: 'Wrapped Gate',
    },
    iceAddress: '0xA625f0Efc6f9cba33233A9c9B2AE36AE716a370e',
    stableToken: {
        address: '0xB6dc6C8b71e88642cEAD3be1025565A9eE74d1C6',
        decimals: 18,
        symbol: 'USDT',
        name: 'Tether USD',
    },
    swap: {
        factoryAddress: "0x1d9e11881Fca0e692B09AF0C0cbE70A643CB06FB",
        routerAddress: "0x493a8A12706Ad08b8c866b65d226cF675A10049e",
        initCodeHash: "0x856bc05cfa06ab7d0813d5edc87a2cccbce2cba77f18be30e33e4c1e67ff52d1",
        deploymentTs: 1728659065,
    },
    smartRouterAddress: '0xBd8BB286Cd14124720F3f8C5F3fdD7fa13735Dc2',
    farmV2Address: '0xe3277bb0f3C4b9C6FC1DBf81E328E14F3C9368C3',
    campaignFactory: '0x79218D6d562a435ec258f2f4D8D17f1DEbbb114a',
    kyc: {
        feeToken: '0x493a8A12706Ad08b8c866b65d226cF675A10049e',
        fee: 10,
        feeWallet: '0x2Bfd1fc5e25a8F55C2E849492ad7966EA8A0dd9E',
        contractKyced: '0x913E332d552b98355587BBa82b1256BCAdbCeD48',
        contractKycDelegator: '0x682EAb822E5896dF1cD33C1Cd6EE99a3154Dd47E',
        contractKycDelegations: '0x790C138B110Bfb517cE5FaB8CF1a51ffDaAa9754',
    },
    v3SubgraphStart: 9212906,
}

// features: ['swap', 'swapV3', 'farms', 'farmsV3', 'info', 'infoV3', 'locks', 'staking', 'kyc', 'launchpad', 'tokenDeployer'],