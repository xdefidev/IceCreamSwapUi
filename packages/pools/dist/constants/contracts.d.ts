import { ChainId } from '@pancakeswap/sdk';
import { Address } from 'viem';
import { SupportedChainId } from './supportedChains';
export type ContractAddresses<T extends ChainId = SupportedChainId> = {
    [chainId in T]: Address;
};
export declare const IICE: ContractAddresses<ChainId>;
export declare const ICE_VAULT: ContractAddresses<ChainId>;
export declare const ICE_FLEXIBLE_SIDE_VAULT: ContractAddresses<ChainId>;
//# sourceMappingURL=contracts.d.ts.map