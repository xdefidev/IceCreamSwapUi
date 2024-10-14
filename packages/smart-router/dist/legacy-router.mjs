import { __export, wrappedCurrency, BASES_TO_CHECK_TRADES_AGAINST, ADDITIONAL_BASES, CUSTOM_BASES, STABLE_SUPPORTED_CHAIN_IDS, BETTER_TRADE_LESS_HOPS_THRESHOLD, pancakePairABI, getStableSwapPools, wrappedCurrencyAmount, stableSwapPairABI, STABLE_SWAP_INFO_ADDRESS } from './chunk-WPJALI3Q.mjs';
import flatMap from 'lodash/flatMap.js';
import { ERC20Token, Price, Percent, TradeType, isTradeBetter, Pair, CurrencyAmount, Trade, ZERO, Fraction, ONE, computePriceImpact } from '@pancakeswap/sdk';
import { deserializeToken } from '@pancakeswap/token-lists';
import fromPairs_ from 'lodash/fromPairs.js';
import invariant from 'tiny-invariant';

// legacy-router/types/bestTrade.ts
var RouteType = /* @__PURE__ */ ((RouteType2) => {
  RouteType2[RouteType2["V2"] = 0] = "V2";
  RouteType2[RouteType2["STABLE_SWAP"] = 1] = "STABLE_SWAP";
  RouteType2[RouteType2["MIXED"] = 2] = "MIXED";
  return RouteType2;
})(RouteType || {});

// legacy-router/legacyRouter.ts
var legacyRouter_exports = {};
__export(legacyRouter_exports, {
  createStableSwapPair: () => createStableSwapPair,
  getAllCommonPairs: () => getAllCommonPairs,
  getBestTradeExactIn: () => getBestTradeExactIn,
  getBestTradeExactOut: () => getBestTradeExactOut,
  isStableSwapPair: () => isStableSwapPair,
  stableSwapPairsByChainId: () => stableSwapPairsByChainId
});
async function getPairs(currencyPairs, { provider, chainId }) {
  const tokens = currencyPairs.map(([currencyA, currencyB]) => [
    wrappedCurrency(currencyA, chainId),
    wrappedCurrency(currencyB, chainId)
  ]);
  const pairAddresses = tokens.map(getPairAddress);
  const client = provider({ chainId });
  const results = await client.multicall({
    contracts: pairAddresses.map(
      (address) => ({
        abi: pancakePairABI,
        address,
        functionName: "getReserves"
      })
    ),
    allowFailure: true
  });
  const resultWithState = results.map((result, i) => {
    if (!result || result.status !== "success")
      return [1 /* NOT_EXISTS */, null];
    const tokenA = tokens[i][0];
    const tokenB = tokens[i][1];
    if (!tokenA || !tokenB || tokenA.equals(tokenB))
      return [3 /* INVALID */, null];
    const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
    const [reserve0, reserve1] = result.result;
    return [
      2 /* EXISTS */,
      new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1))
    ];
  });
  const successfulResult = resultWithState.filter(
    (result) => Boolean(result[0] === 2 /* EXISTS */ && result[1])
  );
  return successfulResult.map(([, pair]) => pair);
}
function getPairAddress([tokenA, tokenB]) {
  let addr = "0x";
  try {
    addr = tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : "0x";
  } catch (error) {
    console.error(error.msg, `- pairAddresses: ${tokenA?.address}-${tokenB?.address}`, `chainId: ${tokenA?.chainId}`);
  }
  return addr;
}

// legacy-router/utils/pair.ts
function involvesToken(pair, token) {
  const { token0, token1 } = pair;
  return token0.wrapped.equals(token.wrapped) || token1.wrapped.equals(token.wrapped);
}
function isSamePair(one, another) {
  return involvesToken(another, one.token0) && involvesToken(another, one.token1);
}
function getOutputToken(pair, inputToken) {
  return inputToken.wrapped.equals(pair.token0.wrapped) ? pair.token1 : pair.token0;
}
function isStableSwapPair(pair) {
  return !!pair.stableSwapAddress;
}

// legacy-router/onchain/getStableSwapOutputAmount.ts
async function getStableSwapOutputAmount(pair, inputAmount, { provider }) {
  const wrappedInputAmount = wrappedCurrencyAmount(inputAmount, inputAmount.currency.chainId);
  if (!wrappedInputAmount) {
    throw new Error(`No wrapped token amount found for input amount: ${inputAmount.currency.name}`);
  }
  const chainId = inputAmount.currency.chainId;
  const inputToken = wrappedInputAmount.currency;
  const outputToken = getOutputToken(pair, inputToken);
  const inputRawAmount = inputAmount.wrapped.quotient;
  const isOutputToken0 = pair.token0.equals(outputToken);
  const args = isOutputToken0 ? [1n, 0n, inputRawAmount] : [0n, 1n, inputRawAmount];
  const client = provider({ chainId });
  const [result] = await client.multicall({
    contracts: [
      {
        abi: stableSwapPairABI,
        address: pair.stableSwapAddress,
        functionName: "get_dy",
        args
      }
    ],
    allowFailure: false
  });
  return CurrencyAmount.fromRawAmount(outputToken, result);
}

// evm/abis/InfoStableSwap.ts
var infoStableSwapABI = [
  {
    inputs: [],
    name: "FEE_DENOMINATOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "N_COINS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PRECISION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      }
    ],
    name: "PRECISION_MUL",
    outputs: [
      {
        internalType: "uint256[2]",
        name: "swapPRECISION_MUL",
        type: "uint256[2]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      }
    ],
    name: "RATES",
    outputs: [
      {
        internalType: "uint256[2]",
        name: "swapRATES",
        type: "uint256[2]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      },
      {
        internalType: "uint256[2]",
        name: "_balances",
        type: "uint256[2]"
      }
    ],
    name: "_xp_mem",
    outputs: [
      {
        internalType: "uint256[2]",
        name: "result",
        type: "uint256[2]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      }
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256[2]",
        name: "swapBalances",
        type: "uint256[2]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "calc_coins_amount",
    outputs: [
      {
        internalType: "uint256[2]",
        name: "",
        type: "uint256[2]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      },
      {
        internalType: "uint256[2]",
        name: "_balances",
        type: "uint256[2]"
      },
      {
        internalType: "uint256",
        name: "amp",
        type: "uint256"
      }
    ],
    name: "get_D_mem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      },
      {
        internalType: "uint256[2]",
        name: "amounts",
        type: "uint256[2]"
      }
    ],
    name: "get_add_liquidity_fee",
    outputs: [
      {
        internalType: "uint256[2]",
        name: "liquidityFee",
        type: "uint256[2]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      },
      {
        internalType: "uint256[2]",
        name: "amounts",
        type: "uint256[2]"
      }
    ],
    name: "get_add_liquidity_mint_amount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "i",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "j",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "dx",
        type: "uint256"
      }
    ],
    name: "get_exchange_fee",
    outputs: [
      {
        internalType: "uint256",
        name: "exFee",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "exAdminFee",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      },
      {
        internalType: "uint256[2]",
        name: "amounts",
        type: "uint256[2]"
      }
    ],
    name: "get_remove_liquidity_imbalance_fee",
    outputs: [
      {
        internalType: "uint256[2]",
        name: "liquidityFee",
        type: "uint256[2]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_token_amount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "i",
        type: "uint256"
      }
    ],
    name: "get_remove_liquidity_one_coin_fee",
    outputs: [
      {
        internalType: "uint256",
        name: "adminFee",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_swap",
        type: "address"
      }
    ],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// legacy-router/onchain/getStableSwapFee.ts
function getStableSwapFeeCall(pair, inputAmount) {
  const { chainId } = inputAmount.currency;
  const wrappedInputAmount = wrappedCurrencyAmount(inputAmount, chainId);
  if (!wrappedInputAmount) {
    throw new Error(`No wrapped token amount found for input amount: ${inputAmount.currency.name}`);
  }
  const { stableSwapAddress } = pair;
  const inputToken = wrappedInputAmount.currency;
  const outputToken = getOutputToken(pair, inputToken);
  const inputRawAmount = inputAmount.wrapped.quotient;
  const isOutputToken0 = pair.token0.equals(outputToken);
  const args = isOutputToken0 ? [stableSwapAddress, 1n, 0n, inputRawAmount] : [stableSwapAddress, 0n, 1n, inputRawAmount];
  return {
    abi: infoStableSwapABI,
    address: pair.infoStableSwapAddress || STABLE_SWAP_INFO_ADDRESS[chainId],
    functionName: "get_exchange_fee",
    args
  };
}
async function getStableSwapFee(pair, inputAmount, { provider }) {
  const chainId = inputAmount.currency.chainId;
  const call = getStableSwapFeeCall(pair, inputAmount);
  const outputToken = getOutputToken(pair, inputAmount.currency);
  const client = provider({ chainId });
  const [[feeRaw, adminFeeRaw]] = await client.multicall({
    contracts: [call],
    allowFailure: false
  });
  return {
    fee: CurrencyAmount.fromRawAmount(outputToken, feeRaw),
    adminFee: CurrencyAmount.fromRawAmount(outputToken, adminFeeRaw)
  };
}

// legacy-router/getAllCommonPairs.ts
async function getAllCommonPairs(currencyA, currencyB, { provider }) {
  const chainId = currencyA.chainId;
  if (!chainId || chainId !== currencyB.chainId) {
    return [];
  }
  const [tokenA, tokenB] = chainId ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)] : [void 0, void 0];
  const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? [];
  const additionalA = tokenA ? ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? [] : [];
  const additionalB = tokenB ? ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? [] : [];
  const bases = [...common, ...additionalA, ...additionalB];
  const basePairs = flatMap(
    bases,
    (base) => bases.map((otherBase) => [base, otherBase])
  );
  const allPairCombinations = getAllPairCombinations(tokenA, tokenB, bases, basePairs, chainId);
  const allPairs = await getPairs(allPairCombinations, { chainId, provider });
  return Object.values(
    allPairs.reduce((memo, curr) => {
      memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr;
      return memo;
    }, {})
  );
}
var getAllPairCombinations = (tokenA, tokenB, bases, basePairs, chainId) => {
  return tokenA && tokenB ? [
    // the direct pair
    [tokenA, tokenB],
    // token A against all bases
    ...bases.map((base) => [tokenA, base]),
    // token B against all bases
    ...bases.map((base) => [tokenB, base]),
    // each base against all bases
    ...basePairs
  ].filter((tokens) => Boolean(tokens[0] && tokens[1])).filter(([t0, t1]) => t0.address !== t1.address).filter(([tokenA_, tokenB_]) => {
    if (!chainId)
      return true;
    const customBases = CUSTOM_BASES[chainId];
    const customBasesA = customBases?.[tokenA_.address];
    const customBasesB = customBases?.[tokenB_.address];
    if (!customBasesA && !customBasesB)
      return true;
    if (customBasesA && !customBasesA.find((base) => tokenB_.equals(base)))
      return false;
    if (customBasesB && !customBasesB.find((base) => tokenA_.equals(base)))
      return false;
    return true;
  }) : [];
};
function createStableSwapPair(pair, stableSwapAddress = "0x", lpAddress = "0x", infoStableSwapAddress = "0x", stableLpFee = 0, stableLpFeeRateOfTotalFee = 0) {
  return {
    ...pair,
    stableSwapAddress,
    lpAddress,
    infoStableSwapAddress,
    liquidityToken: new ERC20Token(pair.token0.chainId, lpAddress, 18, "Stable-LP", "Pancake StableSwap LPs"),
    // default price & fees are zero, need to get the actual price from chain
    price: new Price(pair.token0, pair.token1, "0", "1"),
    fee: new Percent(0),
    adminFee: new Percent(0),
    involvesToken: (token) => token.equals(pair.token0) || token.equals(pair.token1),
    stableLpFee,
    stableLpFeeRateOfTotalFee
  };
}
function createRouteWithStableSwap({
  routeType,
  input,
  pairs,
  output
}) {
  const wrappedInput = input.wrapped;
  const path = [wrappedInput];
  for (const [i, pair] of pairs.entries()) {
    const out = getOutputToken(pair, path[i]);
    path.push(out);
  }
  return {
    routeType,
    input,
    output,
    pairs,
    path
  };
}
function createTradeWithStableSwap({
  routeType,
  pairs,
  inputAmount,
  outputAmount,
  tradeType
}) {
  return {
    tradeType,
    inputAmount,
    outputAmount,
    route: createRouteWithStableSwap({
      routeType,
      pairs,
      input: inputAmount.currency,
      output: outputAmount.currency
    })
  };
}
function createTradeWithStableSwapFromV2Trade({
  tradeType,
  inputAmount,
  outputAmount,
  route: { pairs }
}) {
  return createTradeWithStableSwap({
    routeType: 0 /* V2 */,
    pairs,
    inputAmount,
    outputAmount,
    tradeType
  });
}
function getFeePercent(inputAmount, outputAmount, { fee, adminFee }) {
  invariant(fee.currency.equals(outputAmount.currency), "FEE_CURRENCY_MATCH");
  invariant(adminFee.currency.equals(outputAmount.currency), "FEE_CURRENCY_MATCH");
  const priceWithoutFee = new Price({ baseAmount: outputAmount.add(fee), quoteAmount: inputAmount });
  const inputFee = priceWithoutFee.quote(fee);
  const inputAdminFee = priceWithoutFee.quote(adminFee);
  return {
    fee: new Percent(inputFee.quotient, inputAmount.quotient),
    adminFee: new Percent(inputAdminFee.quotient, inputAmount.quotient)
  };
}

// legacy-router/getStableSwapPairs.ts
function getStableSwapPairs(chainId) {
  const pools = getStableSwapPools(chainId);
  return pools.map(
    ({
      token,
      quoteToken,
      stableSwapAddress,
      lpAddress,
      infoStableSwapAddress,
      stableLpFee,
      stableLpFeeRateOfTotalFee
    }) => {
      const token0 = deserializeToken(token);
      const token1 = deserializeToken(quoteToken);
      return createStableSwapPair(
        {
          token0,
          token1,
          reserve0: CurrencyAmount.fromRawAmount(token0, "0"),
          reserve1: CurrencyAmount.fromRawAmount(token1, "0")
        },
        stableSwapAddress,
        lpAddress,
        infoStableSwapAddress,
        stableLpFee,
        stableLpFeeRateOfTotalFee
      );
    }
  );
}
var stableSwapPairsByChainId = fromPairs_(
  STABLE_SUPPORTED_CHAIN_IDS.map((chainId) => [chainId, getStableSwapPairs(chainId)])
);

// legacy-router/getBestTradeFromStablePools.ts
async function getBestTradeFromStablePools(amount, output, { maxHops, provider }) {
  const {
    currency: { chainId }
  } = amount;
  const pairs = stableSwapPairsByChainId[chainId] || [];
  const routes = computeAllRoutes(amount.currency, output, pairs, maxHops);
  const trades = await Promise.all(routes.map((r) => getStableTrade(amount, r, { provider })));
  if (!trades.length) {
    return null;
  }
  let bestTrade = trades[0];
  for (let i = 1; i < trades.length; i += 1) {
    const trade = trades[i];
    if (trade.outputAmount.greaterThan(bestTrade.outputAmount)) {
      bestTrade = trade;
    }
  }
  return bestTrade;
}
async function getStableTrade(amountIn, pairs, { provider }) {
  let outputToken = amountIn.currency;
  let outputAmount = amountIn;
  const pairsWithPrice = [];
  for (const pair of pairs) {
    const inputAmount = outputAmount;
    const results = await Promise.all([
      getStableSwapOutputAmount(pair, inputAmount, { provider }),
      getStableSwapFee(pair, inputAmount, { provider })
    ]);
    outputAmount = results[0];
    const fees = results[1];
    outputToken = getOutputToken(pair, outputToken);
    const { fee, adminFee } = getFeePercent(inputAmount, outputAmount, fees);
    pairsWithPrice.push({
      ...pair,
      price: new Price({ baseAmount: inputAmount, quoteAmount: outputAmount.add(fees.fee) }),
      fee,
      adminFee
    });
  }
  return createTradeWithStableSwap({
    routeType: 1 /* STABLE_SWAP */,
    inputAmount: amountIn,
    outputAmount,
    pairs: pairsWithPrice,
    tradeType: TradeType.EXACT_INPUT
  });
}
function computeAllRoutes(input, output, pairs, maxHops = 3) {
  const poolsUsed = Array(pairs.length).fill(false);
  const routes = [];
  const computeRoutes = (currencyIn, currencyOut, currentRoute, _previousCurrencyOut) => {
    if (currentRoute.length > maxHops) {
      return;
    }
    if (currentRoute.length > 0 && involvesToken(currentRoute[currentRoute.length - 1], currencyOut)) {
      routes.push([...currentRoute]);
      return;
    }
    for (let i = 0; i < pairs.length; i++) {
      if (poolsUsed[i]) {
        continue;
      }
      const curPool = pairs[i];
      const previousCurrencyOut = _previousCurrencyOut || currencyIn;
      if (!involvesToken(curPool, previousCurrencyOut)) {
        continue;
      }
      const currentTokenOut = getOutputToken(curPool, previousCurrencyOut);
      currentRoute.push(curPool);
      poolsUsed[i] = true;
      computeRoutes(currencyIn, currencyOut, currentRoute, currentTokenOut);
      poolsUsed[i] = false;
      currentRoute.pop();
    }
  };
  computeRoutes(input, output, []);
  return routes;
}
var getBestTradeFromV2ExactIn = createGetBestTradeFromV2(TradeType.EXACT_INPUT);
var getBestTradeFromV2ExactOut = createGetBestTradeFromV2(TradeType.EXACT_OUTPUT);
function createGetBestTradeFromV2(tradeType) {
  function getBestTrade(pairs, amountIn, output, options) {
    if (tradeType === TradeType.EXACT_INPUT) {
      return Trade.bestTradeExactIn(pairs, amountIn, output, options);
    }
    return Trade.bestTradeExactOut(pairs, output, amountIn, options);
  }
  return async function bestTradeFromV2(amountIn, output, options) {
    const { provider, allCommonPairs, ...restOptions } = options;
    const { maxHops = 3 } = restOptions;
    const getAllowedPairs = async () => {
      if (Array.isArray(allCommonPairs)) {
        return allCommonPairs;
      }
      if (allCommonPairs) {
        return allCommonPairs(amountIn.currency, output);
      }
      return getAllCommonPairs(amountIn.currency, output, { provider });
    };
    const allowedPairs = await getAllowedPairs();
    if (!allowedPairs.length) {
      return null;
    }
    if (maxHops === 1) {
      return getBestTrade(allowedPairs, amountIn, output, restOptions)[0] ?? null;
    }
    let bestTradeSoFar = null;
    for (let i = 1; i <= maxHops; i++) {
      const currentTrade = getBestTrade(allowedPairs, amountIn, output, {
        ...restOptions,
        maxHops: i,
        maxNumResults: 1
      })[0] ?? null;
      if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
        bestTradeSoFar = currentTrade;
      }
    }
    return bestTradeSoFar;
  };
}
async function getBestTradeWithStableSwap(baseTrade, stableSwapPairs, options) {
  const { provider } = options;
  const { inputAmount, route, tradeType } = baseTrade;
  if (!stableSwapPairs.length) {
    return createTradeWithStableSwapFromV2Trade(baseTrade);
  }
  const findStableSwapPair = (pair) => stableSwapPairs.find((p) => isSamePair(p, pair));
  let outputAmount = inputAmount;
  let outputToken = inputAmount.currency;
  const shouldRecalculateOutputAmount = () => !outputToken.equals(outputAmount.currency);
  const getLatestOutputAmount = async () => {
    if (outputAmount.currency.equals(inputAmount.currency) && outputToken.equals(baseTrade.outputAmount.currency)) {
      return baseTrade.outputAmount;
    }
    return shouldRecalculateOutputAmount() ? getOutputAmountFromV2(outputAmount, outputToken, options) : outputAmount;
  };
  let routeType = null;
  const setCurrentRouteType = (type) => {
    routeType = routeType === null || routeType === type ? type : 2 /* MIXED */;
  };
  const pairsWithStableSwap = [];
  for (const [index, pair] of route.pairs.entries()) {
    const stableSwapPair = findStableSwapPair(pair);
    if (stableSwapPair) {
      const stableInputAmount = await getLatestOutputAmount();
      const results = await Promise.all([
        getStableSwapOutputAmount(stableSwapPair, stableInputAmount, { provider }),
        getStableSwapFee(stableSwapPair, stableInputAmount, { provider })
      ]);
      outputAmount = results[0];
      const fees = results[1];
      outputToken = getOutputToken(stableSwapPair, outputToken);
      const { fee, adminFee } = getFeePercent(stableInputAmount, outputAmount, fees);
      pairsWithStableSwap.push({
        ...stableSwapPair,
        price: new Price({ baseAmount: stableInputAmount, quoteAmount: outputAmount.add(fees.fee) }),
        fee,
        adminFee
      });
      setCurrentRouteType(1 /* STABLE_SWAP */);
      continue;
    }
    outputToken = getOutputToken(pair, outputToken);
    if (index === route.pairs.length - 1) {
      outputAmount = await getLatestOutputAmount();
    }
    pairsWithStableSwap.push(pair);
    setCurrentRouteType(0 /* V2 */);
  }
  if (routeType === null) {
    throw new Error(`No valid route found`);
  }
  return createTradeWithStableSwap({
    routeType,
    pairs: pairsWithStableSwap,
    inputAmount,
    // Make sure the output currency is the same as the output currency of v2 trade
    outputAmount: CurrencyAmount.fromFractionalAmount(
      baseTrade.outputAmount.currency,
      outputAmount.numerator,
      outputAmount.denominator
    ),
    tradeType
  });
}
async function getOutputAmountFromV2(inputAmount, outputToken, options) {
  const trade = await getBestTradeFromV2ExactIn(inputAmount, outputToken, options);
  if (!trade) {
    throw new Error(`Cannot get valid trade from ${inputAmount.currency.name} to ${outputToken.name}`);
  }
  return trade.outputAmount;
}

// legacy-router/getBestTrade.ts
var getBestTradeExactIn = createGetBestTrade(TradeType.EXACT_INPUT);
var getBestTradeExactOut = createGetBestTrade(TradeType.EXACT_OUTPUT);
function createGetBestTrade(tradeType) {
  const isExactIn = tradeType === TradeType.EXACT_INPUT;
  const getBestTradeFromV2 = isExactIn ? getBestTradeFromV2ExactIn : getBestTradeFromV2ExactOut;
  return async function getBestTrade(amountIn, output, options) {
    const { provider } = options;
    const {
      currency: { chainId }
    } = amountIn;
    const bestTradeV2 = await getBestTradeFromV2(amountIn, output, options);
    const bestTradeStable = (bestTradeV2 || isExactIn) && await getBestTradeFromStablePools(
      bestTradeV2?.inputAmount || amountIn,
      bestTradeV2?.outputAmount.currency || output,
      options
    );
    if (!bestTradeV2) {
      if (bestTradeStable) {
        return bestTradeStable;
      }
      return null;
    }
    const stableSwapPairs = stableSwapPairsByChainId[chainId] || [];
    const bestTradeWithStableSwap = await getBestTradeWithStableSwap(bestTradeV2, stableSwapPairs, { provider });
    const { outputAmount: outputAmountWithStableSwap } = bestTradeWithStableSwap;
    if (bestTradeStable && bestTradeStable.outputAmount.greaterThan(outputAmountWithStableSwap) && bestTradeStable.outputAmount.greaterThan(bestTradeV2.outputAmount)) {
      return bestTradeStable;
    }
    if (outputAmountWithStableSwap.lessThan(bestTradeV2.outputAmount)) {
      return createTradeWithStableSwapFromV2Trade(bestTradeV2);
    }
    return bestTradeWithStableSwap;
  };
}
function getMidPrice(route) {
  const prices = [];
  for (const [i, pair] of route.pairs.entries()) {
    if (isStableSwapPair(pair)) {
      prices.push(route.path[i].wrapped.equals(pair.price.baseCurrency.wrapped) ? pair.price : pair.price.invert());
      continue;
    }
    prices.push(
      route.path[i].wrapped.equals(pair.token0.wrapped) ? new Price(pair.reserve0.currency, pair.reserve1.currency, pair.reserve0.quotient, pair.reserve1.quotient) : new Price(pair.reserve1.currency, pair.reserve0.currency, pair.reserve1.quotient, pair.reserve0.quotient)
    );
  }
  const reduced = prices.slice(1).reduce((accumulator, currentValue) => accumulator.multiply(currentValue), prices[0]);
  return new Price(route.input, route.output, reduced.denominator, reduced.numerator);
}

// legacy-router/route.ts
var Route = {
  midPrice: getMidPrice
};
var Trade4 = {
  maximumAmountIn,
  minimumAmountOut,
  executionPrice,
  priceImpact
};
function maximumAmountIn(trade, slippageTolerance) {
  invariant(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE");
  if (trade.tradeType === TradeType.EXACT_INPUT) {
    return trade.inputAmount;
  }
  const slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(trade.inputAmount.quotient).quotient;
  return CurrencyAmount.fromRawAmount(trade.inputAmount.currency, slippageAdjustedAmountIn);
}
function minimumAmountOut(trade, slippageTolerance) {
  invariant(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE");
  if (trade.tradeType === TradeType.EXACT_OUTPUT) {
    return trade.outputAmount;
  }
  const slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(trade.outputAmount.quotient).quotient;
  return CurrencyAmount.fromRawAmount(trade.outputAmount.currency, slippageAdjustedAmountOut);
}
function executionPrice({
  inputAmount,
  outputAmount
}) {
  return new Price(inputAmount.currency, outputAmount.currency, inputAmount.quotient, outputAmount.quotient);
}
function priceImpact({
  route,
  inputAmount,
  outputAmount
}) {
  return computePriceImpact(getMidPrice(route), inputAmount, outputAmount);
}

export { Route as LegacyRoute, RouteType as LegacyRouteType, legacyRouter_exports as LegacyRouter, Trade4 as LegacyTrade };
