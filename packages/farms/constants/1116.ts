import { SerializedFarmConfig } from '..'
import { defineFarmV3Configs } from '../src/defineFarmV3Configs'
import { coreTokens } from '@pancakeswap/tokens'
import { getAddress } from "viem";
import {FeeAmount} from "@pancakeswap/v3-sdk";

export const farmsV3 = defineFarmV3Configs([
    // make sure token0 as int is smaller than token1
    {
        pid: 2,
        token0: coreTokens.wcore,
        token1: coreTokens.ice,
        lpAddress: '0xBe49470bdbb3c5b05Ad5555205DD0a505f8DCcA7',
        feeAmount: FeeAmount.LOW,
    },
    {
        pid: 5,
        token0: coreTokens.usdtl0,
        token1: coreTokens.wcore,
        lpAddress: '0x6063D72aB87A879ba25c68AD09af3937F55A99a8',
        feeAmount: FeeAmount.LOWEST,
    },
    {
        pid: 11,
        token0: coreTokens.wcore,
        token1: coreTokens.stCore,
        lpAddress: '0xb3B315c10C9183224Ec6a49839B80A7799F70727',
        feeAmount: FeeAmount.LOWEST,
    },
    {
        pid: 7,
        token0: coreTokens.usdtl0,
        token1: coreTokens.usdcl0,
        lpAddress: '0x86a9a9368DC9a55D2A92c372AbEF83350d4D5fEb',
        feeAmount: FeeAmount.LOWEST,
    },
    {
        pid: 6,
        token0: coreTokens.usdt,
        token1: coreTokens.usdtl0,
        lpAddress: '0x53433de7e902d0CA281d823a40f036A2FE8266ef',
        feeAmount: FeeAmount.LOWEST,
    },
    {
        pid: 12,
        token0: coreTokens.solvBtcb,
        token1: coreTokens.solvBtcm,
        lpAddress: '0xfcA579dcA9791327eE8c6876881913d2bE89347f',
        feeAmount: FeeAmount.LOWEST,
    },
    {
        pid: 13,
        token0: coreTokens.solvBtcb,
        token1: coreTokens.coreBTC,
        lpAddress: '0x8ec0D046deB1d9e1C7837647B4147B9A7b61299c',
        feeAmount: FeeAmount.LOWEST,
    },
    {
        pid: 14,
        token0: coreTokens.wcore,
        token1: coreTokens.asx,
        lpAddress: '0x77E4805B77265E9725E305F45EEC304097894e98',
        feeAmount: FeeAmount.LOW,
    },




    {
        pid: 1,
        token0: coreTokens.usdt,
        token1: coreTokens.ice,
        lpAddress: '0x0e1a82C5733D51b5c2d8BcD745d0cB9b2B7dE554',
        feeAmount: FeeAmount.LOW,
    },
    {
        pid: 8,
        token0: coreTokens.usdtl0,
        token1: coreTokens.ice,
        lpAddress: '0xE2407c758c31358A01970fDd44FB6bE850E2117F',
        feeAmount: FeeAmount.LOW,
    },
    {
        pid: 10,
        token0: coreTokens.wcore,
        token1: coreTokens.asx,
        lpAddress: '0xdc935f1c4679466210aB02603881775542BCe668',
        feeAmount: FeeAmount.MEDIUM,
    },
    {
        pid: 9,
        token0: coreTokens.wcore,
        token1: coreTokens.youngparrot,
        lpAddress: '0x33EdeA45492a06B1bE26Af25e72E28A2d6B20336',
        feeAmount: FeeAmount.LOW,
    },
    {
        pid: 3,
        token0: coreTokens.usdt,
        token1: coreTokens.wcore,
        lpAddress: '0x553DB750D2c18a424A145b9440D3AA788b1BAEE7',
        feeAmount: FeeAmount.LOW,
    },
    {
        pid: 4,
        token0: coreTokens.btcb,
        token1: coreTokens.wcore,
        lpAddress: '0xaB9D068F9A4e7C5eD89acE8b70C7Edf15D831466',
        feeAmount: FeeAmount.LOW,
    },
])

const farms: SerializedFarmConfig[] = [
    {
        pid: 0,
        lpSymbol: 'ICE-USDT LP',
        lpAddress: '0xf1a996efba43dcbd7945d2b91fa78420d9c23bf0',
        token: coreTokens.ice,
        quoteToken: coreTokens.usdt,
    },
    {
        pid: 1,
        lpSymbol: 'USDT-CORE LP',
        lpAddress: '0x5ebAE3A840fF34B107D637c8Ed07C3D1D2017178',
        token: coreTokens.usdt,
        quoteToken: coreTokens.wcore_old,
    },
    {
        pid: 17,
        lpSymbol: 'USDT(l0)-CORE LP',
        lpAddress: '0x23A776980962CF489130d8A936D2953fdf3E6Aa1',
        token: coreTokens.usdtl0,
        quoteToken: coreTokens.wcore_old,
    },
    {
        pid: 9,
        lpSymbol: 'ICE-SCORE LP',
        lpAddress: '0xa2710913b9a9a0a34d87bd8a9cf91e8f533ecac7',
        token: coreTokens.ice,
        quoteToken: coreTokens.score,
    },
    {
        pid: 16,
        lpSymbol: 'ICE-CORE LP',
        lpAddress: '0xfee8f527e3909b3f16cbda437da6876deea132ca',
        token: coreTokens.ice,
        quoteToken: coreTokens.wcore_old,
    },
    {
        pid: 4,
        lpSymbol: 'ICE-ETH LP',
        lpAddress: '0x53c55f7CA1B99bed1F8E3C876992abE28d91187A',
        token: coreTokens.eth,
        quoteToken: coreTokens.ice,
    },
    {
        pid: 20,
        lpSymbol: 'ICE-UCORE LP',
        lpAddress: '0xb7f513A716D78a4148d02C1b4Ec33E60e5887AB4',
        token: coreTokens.ucore,
        quoteToken: coreTokens.ice,
    },
    {
        pid: 10,
        lpSymbol: 'SCORE-USDT LP',
        lpAddress: '0x64ead682Ce296B1167d614AEF19bE58F7BAa7288',
        token: coreTokens.score,
        quoteToken: coreTokens.usdt,
    },
    {
        pid: 19,
        lpSymbol: 'USDT-USDT(l0) LP',
        lpAddress: '0x1424f74af91Ae42938fea515e94B4c88161F0C64',
        token: coreTokens.usdtl0,
        quoteToken: coreTokens.usdt,
    },
    {
        pid: 6,
        lpSymbol: 'SCORE-CORE LP',
        lpAddress: '0x876C62C8C94ca04aFE45a9Ef9DB39799D3CddF34',
        token: coreTokens.score,
        quoteToken: coreTokens.wcore_old,
    },
    {
        pid: 3,
        lpSymbol: 'ICE-USDC LP',
        lpAddress: '0x3BEC22289EA5E8Ef13e3Ddf536306193F19449B5',
        token: coreTokens.usdc,
        quoteToken: coreTokens.ice,
    },
    {
        pid: 5,
        lpSymbol: 'ICE-BNB LP',
        lpAddress: '0x69dE3b3fbbC5AA0201a8028F90cE5eebfCD0cBd3',
        token: coreTokens.bnb,
        quoteToken: coreTokens.ice,
    },
    {
        pid: 18,
        lpSymbol: 'USDC(l0)-CORE LP',
        lpAddress: '0x3A43bBf95106d477230Df2e4C432adEd973deD03',
        token: coreTokens.usdcl0,
        quoteToken: coreTokens.wcore_old,
    },
    {
        pid: 23,
        lpSymbol: 'PIPI-CORE LP',
        lpAddress: '0xa5da4314d0729626ed7c92a240105ba80acf54ab',
        token: coreTokens.pipi,
        quoteToken: coreTokens.wcore_old,
    },
    {
        pid: 22,
        lpSymbol: 'CTS-CORE LP',
        lpAddress: '0xe06f2645fbddd88e98c5a5d01722ff1499bf51b1',
        token: coreTokens.cts,
        quoteToken: coreTokens.wcore_old,
    },
    {
        pid: 21,
        lpSymbol: 'WOOF-CORE LP',
        lpAddress: '0xc1816acdd64e380b5f69203df96e3d30603e29fc',
        token: coreTokens.woof,
        quoteToken: coreTokens.wcore_old,
    },
    {
        pid: 11,
        lpSymbol: 'CTOMB-SCORE LP',
        lpAddress: '0x529be42298329b3296b591ea3e5e48af0d99ef53',
        token: coreTokens.ctomb,
        quoteToken: coreTokens.score,
    },
    {
        pid: 12,
        lpSymbol: 'CSHARE-SCORE LP',
        lpAddress: '0x0954069e3e8cd91bea14dfce40f51a46e71e3454',
        token: coreTokens.cshare,
        quoteToken: coreTokens.score,
    },
    {
        pid: 14,
        lpSymbol: 'HOBO-SCORE LP',
        lpAddress: '0xd16aa6313adf04c02b64898efd96cedc59d2d167',
        token: coreTokens.hobo,
        quoteToken: coreTokens.score,
    },
    {
        pid: 2,
        lpSymbol: 'HUC-CORE LP',
        lpAddress: '0xA51C53fb5B6Ce3755a03AeFa86dFE8340850e33c',
        token: coreTokens.huc,
        quoteToken: coreTokens.wcore_old,
    },
    {
        pid: 13,
        lpSymbol: 'LUNG-SCORE LP',
        lpAddress: '0x2e1c068299028e3b5bbd3def5ea3047b78ed92b5',
        token: coreTokens.lung,
        quoteToken: coreTokens.score,
    },
    {
        pid: 15,
        lpSymbol: 'CKISHU-SCORE LP',
        lpAddress: '0xfa4374bfaCbcdf9139A1Ac0A0236D9DD6974DF66',
        token: coreTokens.kishu,
        quoteToken: coreTokens.score,
    },
    {
        pid: 7,
        lpSymbol: 'CKISHU-CORE LP',
        lpAddress: '0xb737cb83f5e7c365b95e54517f37a67eb3de88a6',
        token: coreTokens.kishu,
        quoteToken: coreTokens.wcore_old,
    },
    {
        pid: 8,
        lpSymbol: 'CoreShib-USDT LP',
        lpAddress: '0x77d1e8bfcb738039cbfe70390e8e9c9b28829167',
        token: coreTokens.cshib,
        quoteToken: coreTokens.usdt,
    }
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize, lpAddress: getAddress(p.lpAddress), }))

export default farms
