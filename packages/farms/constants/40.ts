import { SerializedFarmConfig } from '@pancakeswap/farms'
import { telosTokens } from "@pancakeswap/tokens";

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'ICE-USDT',
    lpAddress: '0xCA393dfA16c590a79a7419176B097aE12F5726f1',
    token: telosTokens.ice,
    quoteToken: telosTokens.usdt,
  },
  {
    pid: 1,
    lpSymbol: 'ICE-TLOS',
    lpAddress: '0xe6c634a64e35Cf35879126f8dA952AAa7B7C51eb',
    token: telosTokens.ice,
    quoteToken: telosTokens.wtlos,
  },
  {
    pid: 3,
    lpSymbol: 'TLOS-USDT',
    lpAddress: '0x86CA8345bDa0D6052E93f07BE4dcC680Af927d53',
    token: telosTokens.usdt,
    quoteToken: telosTokens.wtlos,
  },
  {
    pid: 2,
    lpSymbol: 'TLOS-USDT(Multi-depeg)',
    lpAddress: '0x722A5e8adbCD9929ebe8Bc6BE916F827823Ae65e',
    token: telosTokens.usdt_m,
    quoteToken: telosTokens.wtlos,
  },
  {
    pid: 4,
    lpSymbol: 'TLOS-USDC(Multi-depeg)',
    lpAddress: '0xAC58b49eB3B74F0FF14833C1c1aA100a453929a8',
    token: telosTokens.usdc_m,
    quoteToken: telosTokens.wtlos,
  }
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
