import { getAddress } from "viem";
import { SerializedFarmConfig } from '@pancakeswap/farms'
import { neonTokens } from '@pancakeswap/tokens'

const priceHelperLps: SerializedFarmConfig[] = [
    // {
    //     pid: null,
    //     lpSymbol: '',
    //     lpAddress: '0x8EA822e85D2eABFE8cfbAF90F153B393f802aAEa',
    //     token: neonTokens.wneon,
    //     quoteToken: neonTokens.usdt,
    // },
    // {
    //     pid: null,
    //     lpSymbol: '',
    //     lpAddress: '0x5008Cb86d50A71192eFFF2b2888c836689CEaAbc',
    //     token: neonTokens.chonk,
    //     quoteToken: neonTokens.wneon,
    // },
].map((p) => ({
    ...p,
    token: p.token.serialize,
    quoteToken: p.quoteToken.serialize,
    lpAddress: getAddress(p.lpAddress),
}))

export default priceHelperLps