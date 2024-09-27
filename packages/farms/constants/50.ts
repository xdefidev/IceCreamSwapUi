import { getAddress } from "viem";
import { SerializedFarmConfig } from "../src";

const farms: SerializedFarmConfig[] = [
    /*
    ,
    {
        pid: 4,
        lpSymbol: 'US+-ICE LP',
        lpAddress: '0x632636d9f2dfbe6cda2afbaab5ecd55d82d5ef67',
        token: xdcTokens.usplus,
        quoteToken: xdcTokens.ice,
    },
    {
        pid: 5,
        lpSymbol: 'US+-XDC LP',
        lpAddress: '0x0acace3153134de8fc25a759a967a18e1edd5ac1',
        token: xdcTokens.usplus,
        quoteToken: xdcTokens.wxdc,
    }
    */
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize, lpAddress: getAddress(p.lpAddress), }))

export default farms
