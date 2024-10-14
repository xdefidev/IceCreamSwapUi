import { BigintIsh, ChainId } from '@pancakeswap/sdk';
import { PublicClient } from 'viem';
import { CallMultipleFunctionsOnSameContractParams, CallSameFunctionOnContractWithMultipleParams, CallSameFunctionOnMultipleContractsParams, IMulticallProvider, Result } from './multicallProvider';
export type PancakeMulticallConfig = {
    gasLimitPerCall?: BigintIsh;
    gasLimit?: BigintIsh;
    gasBuffer?: BigintIsh;
    dropUnexecutedCalls?: boolean;
};
/**
 * The PancakeswapMulticall contract has added functionality for limiting the amount of gas
 * that each call within the multicall can consume. This is useful for operations where
 * a call could consume such a large amount of gas that it causes the node to error out
 * with an out of gas error.
 *
 * @export
 * @class PancakeMulticallProvider
 */
export declare class PancakeMulticallProvider extends IMulticallProvider<PancakeMulticallConfig> {
    protected chainId: ChainId;
    protected provider: PublicClient;
    protected gasLimitPerCall: number;
    static abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "getCurrentBlockTimestamp";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "timestamp";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "addr";
            readonly type: "address";
        }];
        readonly name: "getEthBalance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "balance";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                /**
                 * The PancakeswapMulticall contract has added functionality for limiting the amount of gas
                 * that each call within the multicall can consume. This is useful for operations where
                 * a call could consume such a large amount of gas that it causes the node to error out
                 * with an out of gas error.
                 *
                 * @export
                 * @class PancakeMulticallProvider
                 */
                readonly name: "gasLimit";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct PancakeInterfaceMulticall.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "multicall";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "uint256";
                readonly name: "gasUsed";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct PancakeInterfaceMulticall.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    constructor(chainId: ChainId, provider: PublicClient, gasLimitPerCall?: number);
    callSameFunctionOnMultipleContracts<TFunctionParams extends any[] | undefined, TReturn = any>(params: CallSameFunctionOnMultipleContractsParams<TFunctionParams>): Promise<{
        blockNumber: bigint;
        results: Result<TReturn>[];
        approxGasUsedPerSuccessCall: number;
        approxGasUsedPerFailCall: number;
    }>;
    callSameFunctionOnContractWithMultipleParams<TFunctionParams extends any[] | undefined, TReturn>(params: CallSameFunctionOnContractWithMultipleParams<TFunctionParams, PancakeMulticallConfig>): Promise<{
        blockNumber: bigint;
        results: Result<TReturn>[];
        approxGasUsedPerSuccessCall: number;
        approxGasUsedPerFailCall: number;
    }>;
    callMultipleFunctionsOnSameContract<TFunctionParams extends any[] | undefined, TReturn>(params: CallMultipleFunctionsOnSameContractParams<TFunctionParams, PancakeMulticallConfig>): Promise<{
        blockNumber: bigint;
        results: Result<TReturn>[];
        approxGasUsedPerSuccessCall: number;
        approxGasUsedPerFailCall: number;
    }>;
}
//# sourceMappingURL=multicallSwapProvider.d.ts.map