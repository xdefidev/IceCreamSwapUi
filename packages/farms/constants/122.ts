import { getAddress } from "viem";
import { SerializedFarmConfig } from '..';

const farms: SerializedFarmConfig[] = [

].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize, lpAddress: getAddress(p.lpAddress), }))

export default farms
