import { ChainId } from '@pancakeswap/sdk';
import { chains } from '@icecreamswap/constants';
import { getContract } from 'viem';

// ../utils/toBigInt.ts
function toBigInt(num) {
  return BigInt(num.toString());
}
var MULTICALL_ADDRESS = {
  [ChainId.CORE]: "0x7bfaa2D0Dc774bA417877Be8252dcede580Ba287"
};
var DEFAULT_BLOCK_CONFLICT_TOLERANCE = 5;
var BLOCK_CONFLICT_TOLERANCE = chains.reduce((acc, chain) => {
  return { ...acc, [chain.id]: DEFAULT_BLOCK_CONFLICT_TOLERANCE };
}, {});
var DEFAULT_GAS_LIMIT = 150000000n;
var DEFAULT_GAS_LIMIT_BY_CHAIN = chains.reduce((acc, chain) => {
  return { ...acc, [chain.id]: DEFAULT_GAS_LIMIT };
}, {});
var DEFAULT_GAS_BUFFER = 3000000n;
var DEFAULT_GAS_BUFFER_BY_CHAIN = chains.reduce((acc, chain) => {
  return { ...acc, [chain.id]: DEFAULT_GAS_BUFFER };
}, {});

// src/abis/IMulticall.ts
var iMulticallABI = [
  {
    inputs: [],
    name: "gasLeft",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "gaslimit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "bytes", name: "callData", type: "bytes" }
        ],
        internalType: "struct MultiCallV2.Call[]",
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "multicall",
    outputs: [
      { internalType: "uint256", name: "blockNumber", type: "uint256" },
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "uint256", name: "gasUsed", type: "uint256" },
          { internalType: "bytes", name: "returnData", type: "bytes" }
        ],
        internalType: "struct MultiCallV2.Result[]",
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "bytes", name: "callData", type: "bytes" }
        ],
        internalType: "struct MultiCallV2.Call[]",
        name: "calls",
        type: "tuple[]"
      },
      { internalType: "uint256", name: "gasBuffer", type: "uint256" }
    ],
    name: "multicallWithGasLimitation",
    outputs: [
      { internalType: "uint256", name: "blockNumber", type: "uint256" },
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "uint256", name: "gasUsed", type: "uint256" },
          { internalType: "bytes", name: "returnData", type: "bytes" }
        ],
        internalType: "struct MultiCallV2.Result[]",
        name: "returnData",
        type: "tuple[]"
      },
      { internalType: "uint256", name: "lastSuccessIndex", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/getMulticallContract.ts
function getMulticallContract({
  chainId,
  client
}) {
  const address = MULTICALL_ADDRESS[chainId];
  if (!address) {
    throw new Error(`PancakeMulticall not supported on chain ${chainId}`);
  }
  return getContract({ abi: iMulticallABI, address, publicClient: client });
}

// src/getGasLimit.ts
function getDefaultGasLimit(chainId) {
  const gasLimitOnChain = chainId && DEFAULT_GAS_LIMIT_BY_CHAIN[chainId];
  return gasLimitOnChain !== void 0 ? gasLimitOnChain : DEFAULT_GAS_LIMIT;
}
function getDefaultGasBuffer(chainId) {
  const gasBufferOnChain = chainId && DEFAULT_GAS_BUFFER_BY_CHAIN[chainId];
  return gasBufferOnChain !== void 0 ? gasBufferOnChain : DEFAULT_GAS_BUFFER;
}
async function getGasLimitOnChain({ chainId, client }) {
  const multicall = getMulticallContract({ chainId, client });
  const gasLeft = await multicall.read.gasLeft();
  return gasLeft;
}
async function getGasLimit({
  chainId,
  gasLimit: gasLimitInput,
  maxGasLimit: maxGasLimitInput = getDefaultGasLimit(chainId),
  gasBuffer: gasBufferInput = getDefaultGasBuffer(chainId),
  client
}) {
  const gasLimitOverride = gasLimitInput && toBigInt(gasLimitInput);
  const maxGasLimit = toBigInt(maxGasLimitInput);
  const gasBuffer = toBigInt(gasBufferInput);
  const gasLimit = gasLimitOverride || await getGasLimitOnChain({ chainId, client }) || maxGasLimit;
  const minGasLimit = gasLimit < maxGasLimit ? gasLimit : maxGasLimit;
  return minGasLimit - gasBuffer;
}

// src/getBlockConflictTolerance.ts
function getBlockConflictTolerance(chainId) {
  return BLOCK_CONFLICT_TOLERANCE[chainId] || DEFAULT_BLOCK_CONFLICT_TOLERANCE;
}

// src/multicall.ts
async function multicallByGasLimit(calls, { chainId, gasBuffer = getDefaultGasBuffer(chainId), client, dropUnexecutedCalls, ...rest }) {
  const gasLimit = await getGasLimit({
    chainId,
    gasBuffer,
    client,
    ...rest
  });
  const callChunks = splitCallsIntoChunks(calls, gasLimit);
  return callByChunks(callChunks, { gasBuffer, client, chainId, dropUnexecutedCalls });
}
function formatCallReturn([blockNumber, results, successIndex]) {
  const lastSuccessIndex = Number(successIndex);
  return {
    lastSuccessIndex,
    blockNumber,
    results: results.slice(0, lastSuccessIndex + 1).map(({ gasUsed, success, returnData }) => ({
      gasUsed,
      success,
      result: returnData
    }))
  };
}
async function call(calls, params) {
  const {
    chainId,
    client,
    gasBuffer = getDefaultGasBuffer(chainId),
    blockConflictTolerance = getBlockConflictTolerance(chainId),
    dropUnexecutedCalls = false
  } = params;
  if (!calls.length) {
    return {
      results: [],
      blockNumber: 0n
    };
  }
  const contract = getMulticallContract({ chainId, client });
  const { result } = await contract.simulate.multicallWithGasLimitation([calls, gasBuffer]);
  const { results, lastSuccessIndex, blockNumber } = formatCallReturn(result);
  if (lastSuccessIndex === calls.length - 1) {
    return {
      results,
      blockNumber
    };
  }
  console.warn(
    `Gas limit reached. Total num of ${calls.length} calls. First ${lastSuccessIndex + 1} calls executed. The remaining ${calls.length - lastSuccessIndex - 1} calls are not executed. Pls try adjust the gas limit per call.`
  );
  const remainingCalls = calls.slice(lastSuccessIndex + 1);
  if (dropUnexecutedCalls) {
    return {
      results: [...results, ...remainingCalls.map(() => ({ result: "0x", gasUsed: 0n, success: false }))],
      blockNumber
    };
  }
  const { results: remainingResults, blockNumber: nextBlockNumber } = await call(
    calls.slice(lastSuccessIndex + 1),
    params
  );
  if (Number(nextBlockNumber - blockNumber) > blockConflictTolerance) {
    throw new Error(
      `Multicall failed because of block conflict. Latest calls are made at block ${nextBlockNumber} while last calls made at block ${blockNumber}. Block conflict tolerance is ${blockConflictTolerance}`
    );
  }
  return {
    results: [...results, ...remainingResults],
    // Use the latest block number
    blockNumber: nextBlockNumber
  };
}
async function callByChunks(chunks, params) {
  const { blockConflictTolerance = getBlockConflictTolerance(params.chainId) } = params;
  const callReturns = await Promise.all(chunks.map((chunk) => call(chunk, params)));
  let minBlock = 0n;
  let maxBlock = 0n;
  let results = [];
  for (const { results: callResults, blockNumber } of callReturns) {
    if (minBlock === 0n || blockNumber < minBlock) {
      minBlock = blockNumber;
    }
    if (blockNumber > maxBlock) {
      maxBlock = blockNumber;
    }
    if (Number(maxBlock - minBlock) > blockConflictTolerance) {
      throw new Error(
        `Multicall failed because of block conflict. Min block is ${minBlock} while max block is ${maxBlock}. Block conflict tolerance is ${blockConflictTolerance}`
      );
    }
    results = [...results, ...callResults];
  }
  return {
    results,
    blockNumber: maxBlock
  };
}
function splitCallsIntoChunks(calls, gasLimit) {
  const chunks = [[]];
  let gasLeft = gasLimit;
  for (const callRequest of calls) {
    const { target, callData, gasLimit: gasCostLimit } = callRequest;
    const singleGasLimit = toBigInt(gasCostLimit);
    const currentChunk = chunks[chunks.length - 1];
    if (singleGasLimit > gasLeft) {
      chunks.push([callRequest]);
      gasLeft = gasLimit - singleGasLimit;
      if (gasLeft < 0n) {
        console.warn(
          `Multicall request may fail as the gas cost of a single call exceeds the gas limit ${gasLimit}. Gas cost: ${singleGasLimit}. To: ${target}. Data: ${callData}`
        );
      }
      continue;
    }
    currentChunk.push(callRequest);
    gasLeft -= singleGasLimit;
  }
  return chunks;
}

export { BLOCK_CONFLICT_TOLERANCE, DEFAULT_BLOCK_CONFLICT_TOLERANCE, DEFAULT_GAS_BUFFER, DEFAULT_GAS_BUFFER_BY_CHAIN, DEFAULT_GAS_LIMIT, DEFAULT_GAS_LIMIT_BY_CHAIN, MULTICALL_ADDRESS, getBlockConflictTolerance, getDefaultGasBuffer, getDefaultGasLimit, getGasLimit, getGasLimitOnChain, getMulticallContract, iMulticallABI, multicallByGasLimit };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map