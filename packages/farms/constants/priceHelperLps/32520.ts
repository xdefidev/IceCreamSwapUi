import { SerializedFarmConfig } from "../../src";

const priceHelperLps: SerializedFarmConfig[] = [
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default priceHelperLps
