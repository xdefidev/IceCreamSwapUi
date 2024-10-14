'use strict';

var chunkELMVPKZS_js = require('./chunk-ELMVPKZS.js');
var sdk = require('@pancakeswap/sdk');
var invariant5 = require('tiny-invariant');
var flatMap = require('lodash/flatMap');
var memoize = require('lodash/memoize');
var v3Sdk = require('@pancakeswap/v3-sdk');
var viem = require('viem');
var swapSdkCore = require('@pancakeswap/swap-sdk-core');
var debug = require('debug');
var FixedReverseHeap = require('mnemonist/fixed-reverse-heap.js');
var Queue = require('mnemonist/queue.js');
var flatMap2 = require('lodash/flatMap.js');
var mapValues = require('lodash/mapValues.js');
var sum = require('lodash/sum.js');
var chunk = require('lodash/chunk.js');
var graphqlRequest = require('graphql-request');
var tokenLists = require('@pancakeswap/token-lists');
var constants = require('@icecreamswap/constants');
var retry = require('async-retry');
var stats = require('stats-lite');
var multicall = require('@pancakeswap/multicall');
var zod = require('zod');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var invariant5__default = /*#__PURE__*/_interopDefault(invariant5);
var flatMap__default = /*#__PURE__*/_interopDefault(flatMap);
var memoize__default = /*#__PURE__*/_interopDefault(memoize);
var debug__default = /*#__PURE__*/_interopDefault(debug);
var FixedReverseHeap__default = /*#__PURE__*/_interopDefault(FixedReverseHeap);
var Queue__default = /*#__PURE__*/_interopDefault(Queue);
var flatMap2__default = /*#__PURE__*/_interopDefault(flatMap2);
var mapValues__default = /*#__PURE__*/_interopDefault(mapValues);
var sum__default = /*#__PURE__*/_interopDefault(sum);
var chunk__default = /*#__PURE__*/_interopDefault(chunk);
var retry__default = /*#__PURE__*/_interopDefault(retry);
var stats__default = /*#__PURE__*/_interopDefault(stats);

// evm/stableSwap/index.ts
var stableSwap_exports = {};
chunkELMVPKZS_js.__export(stableSwap_exports, {
  getD: () => getD,
  getLPOutput: () => getLPOutput,
  getLPOutputWithoutFee: () => getLPOutputWithoutFee,
  getSwapInput: () => getSwapInput,
  getSwapInputWithtouFee: () => getSwapInputWithtouFee,
  getSwapOutput: () => getSwapOutput,
  getSwapOutputWithoutFee: () => getSwapOutputWithoutFee
});
function getD({ amplifier, balances }) {
  const numOfCoins = balances.length;
  invariant5__default.default(numOfCoins > 1, "To get constant D, pool should have at least two coins.");
  const sum2 = balances.reduce((s, cur) => s + BigInt(cur), sdk.ZERO);
  if (sum2 === sdk.ZERO) {
    return sdk.ZERO;
  }
  const n = BigInt(numOfCoins);
  const precision = sdk.ONE;
  const ann = BigInt(amplifier) * n;
  let dPrev = sdk.ZERO;
  let d = sum2;
  for (let i = 0; i < 255; i += 1) {
    let dp = d;
    for (const b of balances) {
      dp = dp * d / (BigInt(b) * n + 1n);
    }
    dPrev = d;
    d = (ann * sum2 + dp * n) * d / ((ann - sdk.ONE) * d + (n + sdk.ONE) * dp);
    if (d > dPrev && d - dPrev <= precision) {
      break;
    }
    if (d <= dPrev && dPrev - d <= precision) {
      break;
    }
  }
  return d;
}
function getY({ amplifier, balances, i, j, x }) {
  const numOfCoins = balances.length;
  invariant5__default.default(numOfCoins > 1, "To get y, pool should have at least two coins.");
  invariant5__default.default(i !== j && i >= 0 && j >= 0 && i < numOfCoins && j < numOfCoins, `Invalid i: ${i} and j: ${j}`);
  const n = BigInt(numOfCoins);
  const d = getD({ amplifier, balances });
  let sum2 = sdk.ZERO;
  let c = d;
  const ann = BigInt(amplifier) * n;
  for (const [index, b2] of balances.entries()) {
    if (index === j) {
      continue;
    }
    let balanceAfterDeposit = BigInt(b2);
    if (index === i) {
      balanceAfterDeposit += BigInt(x);
    }
    invariant5__default.default(balanceAfterDeposit > sdk.ZERO, "Insufficient liquidity");
    sum2 += balanceAfterDeposit;
    c = c * d / (balanceAfterDeposit * n);
  }
  c = c * d / (ann * n);
  const b = sum2 + d / ann;
  const precision = sdk.ONE;
  let yPrev = sdk.ZERO;
  let y = d;
  for (let k = 0; k < 255; k += 1) {
    yPrev = y;
    y = (y * y + c) / (2n * y + b - d);
    if (y > yPrev && y - yPrev <= precision) {
      break;
    }
    if (y <= yPrev && yPrev - y <= precision) {
      break;
    }
  }
  return y;
}
var PRECISION = 10n ** 18n;
var getRawAmount = (amount) => {
  return amount.quotient * PRECISION / 10n ** BigInt(amount.currency.decimals);
};
var parseAmount = (currency, rawAmount) => {
  return sdk.CurrencyAmount.fromRawAmount(currency, rawAmount * 10n ** BigInt(currency.decimals) / PRECISION);
};

// evm/stableSwap/getLPOutput.ts
function getLPOutput({
  amplifier,
  balances,
  totalSupply,
  amounts,
  fee
}) {
  const lpToken = totalSupply.currency;
  const lpTotalSupply = totalSupply.quotient;
  if (lpTotalSupply === sdk.ZERO || !balances.length || balances.every((b) => b.quotient === sdk.ZERO)) {
    const d = getD({ amplifier, balances: amounts.map(getRawAmount) });
    return sdk.CurrencyAmount.fromRawAmount(lpToken, d);
  }
  const currentBalances = [];
  const newBalances = [];
  for (const [i, balance] of balances.entries()) {
    const amount = amounts[i] || sdk.CurrencyAmount.fromRawAmount(balance.currency, 0);
    invariant5__default.default(
      amount.currency.wrapped.equals(balance.currency.wrapped),
      "User input currency should be the same as pool balance currency."
    );
    const balanceRaw = getRawAmount(balance);
    const amountRaw = getRawAmount(amount);
    currentBalances.push(balanceRaw);
    newBalances.push(balanceRaw + amountRaw);
  }
  const d0 = getD({ amplifier, balances: currentBalances });
  const d1 = getD({ amplifier, balances: newBalances });
  invariant5__default.default(d1 >= d0, "D1 should be greater than or equal than d0.");
  const isFirstSupply = lpTotalSupply <= sdk.ZERO;
  if (isFirstSupply) {
    return sdk.CurrencyAmount.fromRawAmount(totalSupply.currency, d1);
  }
  const n = currentBalances.length;
  const eachTokenFee = fee.multiply(n).divide(4 * (n - 1));
  let d2 = d1;
  for (const [i, b] of currentBalances.entries()) {
    const idealBalance = d1 * b / d0;
    let diff = sdk.ZERO;
    if (idealBalance > newBalances[i]) {
      diff = idealBalance - newBalances[i];
    } else {
      diff = newBalances[i] - idealBalance;
    }
    const feeAmount = eachTokenFee.multiply(diff).quotient;
    newBalances[i] = newBalances[i] - feeAmount;
  }
  d2 = getD({ amplifier, balances: newBalances });
  const expectedMintLP = lpTotalSupply * (d2 - d0) / d0;
  return sdk.CurrencyAmount.fromRawAmount(totalSupply.currency, expectedMintLP);
}

// evm/stableSwap/getLPOutputWithoutFee.ts
function getLPOutputWithoutFee(params) {
  return getLPOutput({ ...params, fee: new sdk.Percent(0) });
}
function getSwapOutput({
  amplifier,
  balances: balanceAmounts,
  outputCurrency,
  amount,
  fee
}) {
  const validateAmountOut = (a) => invariant5__default.default(!a.lessThan(sdk.ZERO), "Insufficient liquidity to perform the swap");
  let i = null;
  let j = null;
  const balances = [];
  for (const [index, b] of balanceAmounts.entries()) {
    balances.push(getRawAmount(b));
    if (b.currency.wrapped.equals(amount.currency.wrapped)) {
      i = index;
      continue;
    }
    if (b.currency.wrapped.equals(outputCurrency.wrapped)) {
      j = index;
      continue;
    }
  }
  invariant5__default.default(
    i !== null && j !== null && i !== j,
    "Input currency or output currency does not match currencies of token balances."
  );
  if (amount.quotient < sdk.ZERO) {
    const x = sdk.ONE_HUNDRED_PERCENT.subtract(fee).invert().multiply(getRawAmount(amount)).quotient;
    const y2 = getY({ amplifier, balances, i, j, x });
    const dy2 = y2 - balances[j];
    const amountOut2 = parseAmount(outputCurrency, dy2);
    validateAmountOut(amountOut2);
    return amountOut2;
  }
  const y = getY({ amplifier, balances, i, j, x: getRawAmount(amount) });
  const dy = balances[j] - y;
  const feeAmount = fee.multiply(dy).quotient;
  const amountOut = parseAmount(outputCurrency, dy - feeAmount);
  validateAmountOut(amountOut);
  return amountOut;
}
function getSwapOutputWithoutFee(params) {
  return getSwapOutput({ ...params, fee: new sdk.Percent(0) });
}
function getSwapInput({ amount, ...rest }) {
  return getSwapOutput({
    ...rest,
    amount: sdk.CurrencyAmount.fromRawAmount(amount.currency, -amount.quotient)
  });
}
function getSwapInputWithtouFee(params) {
  return getSwapInput({ ...params, fee: new sdk.Percent(0) });
}

// evm/v3-router/smartRouter.ts
var smartRouter_exports = {};
chunkELMVPKZS_js.__export(smartRouter_exports, {
  APISchema: () => schema_exports,
  PancakeMulticallProvider: () => PancakeMulticallProvider,
  Transformer: () => transformer_exports,
  createCommonTokenPriceProvider: () => createCommonTokenPriceProvider,
  createGetV2CandidatePools: () => createGetV2CandidatePools,
  createGetV3CandidatePools: () => createGetV3CandidatePools,
  createGetV3CandidatePoolsWithFallbacks: () => createGetV3CandidatePools,
  createHybridPoolProvider: () => createHybridPoolProvider,
  createOffChainQuoteProvider: () => createOffChainQuoteProvider,
  createPoolProvider: () => createPoolProvider,
  createQuoteProvider: () => createQuoteProvider,
  createStaticPoolProvider: () => createStaticPoolProvider,
  createV2PoolsProviderByCommonTokenPrices: () => createV2PoolsProviderByCommonTokenPrices,
  getAllV3PoolsFromSubgraph: () => getAllV3PoolsFromSubgraph,
  getBestTrade: () => getBestTrade,
  getCandidatePools: () => getCandidatePools,
  getCheckAgainstBaseTokens: () => getCheckAgainstBaseTokens,
  getCommonTokenPrices: () => getCommonTokenPrices,
  getCommonTokenPricesByLlma: () => getCommonTokenPricesByLlma,
  getCommonTokenPricesBySubgraph: () => getCommonTokenPricesBySubgraph,
  getExecutionPrice: () => getExecutionPrice,
  getMidPrice: () => getMidPrice,
  getPairCombinations: () => getPairCombinations,
  getPoolAddress: () => getPoolAddress,
  getStableCandidatePools: () => getStableCandidatePools,
  getStablePoolsOnChain: () => getStablePoolsOnChain,
  getTokenUsdPricesBySubgraph: () => getTokenUsdPricesBySubgraph,
  getV2CandidatePools: () => getV2CandidatePools,
  getV2PoolSubgraph: () => getV2PoolSubgraph,
  getV2PoolsOnChain: () => getV2PoolsOnChain,
  getV2PoolsWithTvlByCommonTokenPrices: () => getV2PoolsWithTvlByCommonTokenPrices,
  getV3CandidatePools: () => getV3CandidatePools,
  getV3PoolSubgraph: () => getV3PoolSubgraph,
  getV3PoolsWithTvlFromOnChain: () => getV3PoolsWithTvlFromOnChain,
  getV3PoolsWithTvlFromOnChainFallback: () => getV3PoolsWithTvlFromOnChainFallback,
  getV3PoolsWithTvlFromOnChainStaticFallback: () => getV3PoolsWithTvlFromOnChainStaticFallback,
  getV3PoolsWithoutTicksOnChain: () => getV3PoolsWithoutTicksOnChain,
  involvesCurrency: () => involvesCurrency,
  isStablePool: () => isStablePool,
  isV2Pool: () => isV2Pool,
  isV3Pool: () => isV3Pool,
  log: () => log,
  maximumAmountIn: () => maximumAmountIn,
  metric: () => metric,
  minimumAmountOut: () => minimumAmountOut,
  v2PoolSubgraphSelection: () => v2PoolTvlSelector,
  v2PoolTvlSelector: () => v2PoolTvlSelector,
  v3PoolSubgraphSelection: () => v3PoolTvlSelector,
  v3PoolTvlSelector: () => v3PoolTvlSelector,
  v3PoolsOnChainProviderFactory: () => v3PoolsOnChainProviderFactory
});
function getAmountDistribution(amount, distributionPercent) {
  const percents = [];
  const amounts = [];
  for (let i = 1; i <= 100 / distributionPercent; i++) {
    percents.push(i * distributionPercent);
    amounts.push(amount.multiply(new sdk.Fraction(i * distributionPercent, 100)));
  }
  return [percents, amounts];
}
function tryParseAmount(value, currency) {
  if (!value || !currency) {
    return void 0;
  }
  try {
    const typedValueParsed = viem.parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== "0") {
      return swapSdkCore.CurrencyAmount.fromRawAmount(currency, BigInt(typedValueParsed));
    }
  } catch (error) {
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  return void 0;
}
var tryParseAmount_default = tryParseAmount;

// evm/v3-router/types/pool.ts
var PoolType = /* @__PURE__ */ ((PoolType2) => {
  PoolType2[PoolType2["V2"] = 0] = "V2";
  PoolType2[PoolType2["V3"] = 1] = "V3";
  PoolType2[PoolType2["STABLE"] = 2] = "STABLE";
  return PoolType2;
})(PoolType || {});

// evm/v3-router/types/route.ts
var RouteType = /* @__PURE__ */ ((RouteType2) => {
  RouteType2[RouteType2["V2"] = 0] = "V2";
  RouteType2[RouteType2["V3"] = 1] = "V3";
  RouteType2[RouteType2["STABLE"] = 2] = "STABLE";
  RouteType2[RouteType2["MIXED"] = 3] = "MIXED";
  RouteType2[RouteType2["MM"] = 4] = "MM";
  return RouteType2;
})(RouteType || {});

// evm/v3-router/utils/pool.ts
function isV2Pool(pool) {
  return pool.type === 0 /* V2 */;
}
function isV3Pool(pool) {
  return pool.type === 1 /* V3 */;
}
function isStablePool(pool) {
  return pool.type === 2 /* STABLE */ && pool.balances.length >= 2;
}
function involvesCurrency(pool, currency) {
  const token = currency.wrapped;
  if (isV2Pool(pool)) {
    const { reserve0, reserve1 } = pool;
    return reserve0.currency.equals(token) || reserve1.currency.equals(token);
  }
  if (isV3Pool(pool)) {
    const { token0, token1 } = pool;
    return token0.equals(token) || token1.equals(token);
  }
  if (isStablePool(pool)) {
    const { balances } = pool;
    return balances.some((b) => b.currency.equals(token));
  }
  return false;
}
function getOutputCurrency(pool, currencyIn) {
  const tokenIn = currencyIn.wrapped;
  if (isV2Pool(pool)) {
    const { reserve0, reserve1 } = pool;
    return reserve0.currency.equals(tokenIn) ? reserve1.currency : reserve0.currency;
  }
  if (isV3Pool(pool)) {
    const { token0, token1 } = pool;
    return token0.equals(tokenIn) ? token1 : token0;
  }
  if (isStablePool(pool)) {
    const { balances } = pool;
    return balances[0].currency.equals(tokenIn) ? balances[1].currency : balances[0].currency;
  }
  throw new Error("Cannot get output currency by invalid pool");
}
var computeV3PoolAddress = memoize__default.default(
  v3Sdk.computePoolAddress,
  ({ deployerAddress, tokenA, tokenB, fee }) => `${tokenA.chainId}_${deployerAddress}_${tokenA.address}_${tokenB.address}_${fee}`
);
var computeV2PoolAddress = memoize__default.default(
  sdk.Pair.getAddress,
  (tokenA, tokenB) => `${tokenA.chainId}_${tokenA.address}_${tokenB.address}`
);
var getPoolAddress = memoize__default.default(
  function getAddress(pool) {
    if (isStablePool(pool) || isV3Pool(pool)) {
      return pool.address;
    }
    if (isV2Pool(pool)) {
      const { reserve0, reserve1 } = pool;
      return computeV2PoolAddress(reserve0.currency.wrapped, reserve1.currency.wrapped);
    }
    return "";
  },
  (pool) => {
    if (isStablePool(pool)) {
      const { balances } = pool;
      const tokenAddresses = balances.map((b) => b.currency.wrapped.address);
      return `${pool.type}_${balances[0]?.currency.chainId}_${tokenAddresses.join("_")}`;
    }
    const [token0, token1] = isV2Pool(pool) ? [pool.reserve0.currency.wrapped, pool.reserve1.currency.wrapped] : [pool.token0.wrapped, pool.token1.wrapped];
    return `${pool.type}_${token0.chainId}_${token0.address}_${token1.address}`;
  }
);
function getTokenPrice(pool, base, quote) {
  if (isV3Pool(pool)) {
    const { token0, token1, fee, liquidity, sqrtRatioX96, tick } = pool;
    const v3Pool = new v3Sdk.Pool(token0.wrapped, token1.wrapped, fee, sqrtRatioX96, liquidity, tick);
    return v3Pool.priceOf(base.wrapped);
  }
  if (isV2Pool(pool)) {
    const pair = new sdk.Pair(pool.reserve0.wrapped, pool.reserve1.wrapped);
    return pair.priceOf(base.wrapped);
  }
  if (isStablePool(pool)) {
    const { amplifier, balances, fee } = pool;
    const baseIn = tryParseAmount_default("1", base);
    if (!baseIn) {
      throw new Error(`Cannot parse amount for ${base.symbol}`);
    }
    const quoteOut = getSwapOutput({
      amplifier,
      balances,
      fee,
      outputCurrency: quote,
      amount: baseIn
    });
    return new sdk.Price({
      baseAmount: baseIn,
      quoteAmount: quoteOut
    });
  }
  return new sdk.Price(base, quote, 1n, 0n);
}

// evm/v3-router/utils/isCurrenciesSameChain.ts
function isCurrenciesSameChain(...currencies) {
  const chainId = currencies[0]?.chainId;
  for (const currency of currencies) {
    if (currency.chainId !== chainId) {
      return false;
    }
  }
  return true;
}

// evm/v3-router/utils/route.ts
function buildBaseRoute(pools, currencyIn, currencyOut) {
  const path = [currencyIn.wrapped];
  let prevIn = path[0];
  let routeType = null;
  const updateRouteType = (pool, currentRouteType) => {
    if (currentRouteType === null) {
      return getRouteTypeFromPool(pool);
    }
    if (currentRouteType === 3 /* MIXED */ || currentRouteType !== getRouteTypeFromPool(pool)) {
      return 3 /* MIXED */;
    }
    return currentRouteType;
  };
  for (const pool of pools) {
    prevIn = getOutputCurrency(pool, prevIn);
    path.push(prevIn);
    routeType = updateRouteType(pool, routeType);
  }
  if (routeType === null) {
    throw new Error(`Invalid route type when constructing base route`);
  }
  return {
    path,
    pools,
    type: routeType,
    input: currencyIn,
    output: currencyOut
  };
}
function getRouteTypeFromPool(pool) {
  switch (pool.type) {
    case 0 /* V2 */:
      return 0 /* V2 */;
    case 1 /* V3 */:
      return 1 /* V3 */;
    case 2 /* STABLE */:
      return 2 /* STABLE */;
    default:
      return 3 /* MIXED */;
  }
}
function getQuoteCurrency({ input, output }, baseCurrency) {
  return baseCurrency.equals(input) ? output : input;
}
function getMidPrice({ path, pools }) {
  let i = 0;
  let price = null;
  for (const pool of pools) {
    const input = path[i].wrapped;
    const output = path[i + 1].wrapped;
    const poolPrice = getTokenPrice(pool, input, output);
    price = price ? price.multiply(poolPrice) : poolPrice;
    i += 1;
  }
  if (!price) {
    throw new Error("Get mid price failed");
  }
  return price;
}
function encodeMixedRouteToPath(route, exactOutput) {
  const firstInputToken = route.input.wrapped;
  const { path, types } = route.pools.reduce(
    ({ inputToken, path: path2, types: types2 }, pool, index) => {
      const outputToken = getOutputCurrency(pool, inputToken).wrapped;
      const fee = isV3Pool(pool) ? pool.fee : chunkELMVPKZS_js.V2_FEE_PATH_PLACEHOLDER;
      if (index === 0) {
        return {
          inputToken: outputToken,
          types: ["address", "uint24", "address"],
          path: [inputToken.address, fee, outputToken.address]
        };
      }
      return {
        inputToken: outputToken,
        types: [...types2, "uint24", "address"],
        path: [...path2, fee, outputToken.address]
      };
    },
    { inputToken: firstInputToken, path: [], types: [] }
  );
  return exactOutput ? viem.encodePacked(types.reverse(), path.reverse()) : viem.encodePacked(types, path);
}
function encodeV3RouteToForeignPath(route, exactOutput) {
  const firstInputToken = route.input.wrapped;
  const { path, types } = route.pools.reduce(
    ({ inputToken, path: path2, types: types2 }, pool, index) => {
      const outputToken = getOutputCurrency(pool, inputToken).wrapped;
      const poolAddress = isV3Pool(pool) ? pool.address : "0x0000000000000000000000000000000000000000";
      if (index === 0) {
        return {
          inputToken: outputToken,
          types: ["address", "address", "address"],
          path: [inputToken.address, poolAddress, outputToken.address]
        };
      }
      return {
        inputToken: outputToken,
        types: [...types2, "address", "address"],
        path: [...path2, poolAddress, outputToken.address]
      };
    },
    { inputToken: firstInputToken, path: [], types: [] }
  );
  return exactOutput ? viem.encodePacked(types.reverse(), path.reverse()) : viem.encodePacked(types, path);
}

// evm/v3-router/utils/getUsdGasToken.ts
function getUsdGasToken(chainId) {
  return chunkELMVPKZS_js.usdGasTokensByChain[chainId]?.[0] ?? null;
}
function getNativeWrappedToken(chainId) {
  return sdk.WNATIVE[chainId] ?? null;
}
function getExecutionPrice(trade) {
  if (!trade) {
    return null;
  }
  const { inputAmount, outputAmount } = trade;
  if (inputAmount.quotient === sdk.ZERO || outputAmount.quotient === sdk.ZERO) {
    return null;
  }
  return new sdk.Price(inputAmount.currency, outputAmount.currency, inputAmount.quotient, outputAmount.quotient);
}
function maximumAmountIn(trade, slippage, amountIn = trade.inputAmount) {
  if (trade.tradeType === sdk.TradeType.EXACT_INPUT) {
    return amountIn;
  }
  const slippageAdjustedAmountIn = new sdk.Fraction(sdk.ONE).add(slippage).multiply(amountIn.quotient).quotient;
  return sdk.CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
}
function minimumAmountOut(trade, slippage, amountOut = trade.outputAmount) {
  if (trade.tradeType === sdk.TradeType.EXACT_OUTPUT) {
    return amountOut;
  }
  const slippageAdjustedAmountOut = new sdk.Fraction(sdk.ONE).add(slippage).invert().multiply(amountOut.quotient).quotient;
  return sdk.CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
}
var metric = debug__default.default("smart-router:metric");
var log = debug__default.default("smart-router:log");

// evm/v3-router/utils/transformer.ts
var transformer_exports = {};
chunkELMVPKZS_js.__export(transformer_exports, {
  parseCurrency: () => parseCurrency,
  parseCurrencyAmount: () => parseCurrencyAmount,
  parsePool: () => parsePool,
  parseRoute: () => parseRoute,
  parseTrade: () => parseTrade,
  serializeCurrency: () => serializeCurrency,
  serializeCurrencyAmount: () => serializeCurrencyAmount,
  serializePool: () => serializePool,
  serializeRoute: () => serializeRoute,
  serializeTrade: () => serializeTrade
});
var ONE_HUNDRED = 100n;
function serializeCurrency(currency) {
  return {
    address: currency.isNative ? v3Sdk.ADDRESS_ZERO : currency.wrapped.address,
    decimals: currency.decimals,
    symbol: currency.symbol
  };
}
function serializeCurrencyAmount(amount) {
  return {
    currency: serializeCurrency(amount.currency),
    value: amount.quotient.toString()
  };
}
function serializePool(pool) {
  if (isV2Pool(pool)) {
    return {
      ...pool,
      reserve0: serializeCurrencyAmount(pool.reserve0),
      reserve1: serializeCurrencyAmount(pool.reserve1)
    };
  }
  if (isV3Pool(pool)) {
    return {
      ...pool,
      token0: serializeCurrency(pool.token0),
      token1: serializeCurrency(pool.token1),
      liquidity: pool.liquidity.toString(),
      sqrtRatioX96: pool.sqrtRatioX96.toString(),
      token0ProtocolFee: pool.token0ProtocolFee.toFixed(0),
      token1ProtocolFee: pool.token1ProtocolFee.toFixed(0)
    };
  }
  if (isStablePool(pool)) {
    return {
      ...pool,
      balances: pool.balances.map(serializeCurrencyAmount),
      amplifier: pool.amplifier.toString(),
      fee: pool.fee.toSignificant(6)
    };
  }
  throw new Error("Cannot serialize unsupoorted pool");
}
function serializeRoute(route) {
  return {
    ...route,
    pools: route.pools.map(serializePool),
    path: route.path.map(serializeCurrency),
    inputAmount: serializeCurrencyAmount(route.inputAmount),
    outputAmount: serializeCurrencyAmount(route.outputAmount)
  };
}
function serializeTrade(trade) {
  return {
    ...trade,
    inputAmount: serializeCurrencyAmount(trade.inputAmount),
    outputAmount: serializeCurrencyAmount(trade.outputAmount),
    routes: trade.routes.map(serializeRoute),
    gasEstimate: trade.gasEstimate.toString(),
    gasEstimateInUSD: serializeCurrencyAmount(trade.gasEstimateInUSD)
  };
}
function parseCurrency(chainId, currency) {
  if (currency.address === v3Sdk.ADDRESS_ZERO) {
    return sdk.Native.onChain(chainId);
  }
  const { address, decimals, symbol } = currency;
  return new sdk.ERC20Token(chainId, address, decimals, symbol);
}
function parseCurrencyAmount(chainId, amount) {
  return sdk.CurrencyAmount.fromRawAmount(parseCurrency(chainId, amount.currency), amount.value);
}
function parsePool(chainId, pool) {
  if (pool.type === 0 /* V2 */) {
    return {
      ...pool,
      reserve0: parseCurrencyAmount(chainId, pool.reserve0),
      reserve1: parseCurrencyAmount(chainId, pool.reserve1)
    };
  }
  if (pool.type === 1 /* V3 */) {
    return {
      ...pool,
      token0: parseCurrency(chainId, pool.token0),
      token1: parseCurrency(chainId, pool.token1),
      liquidity: BigInt(pool.liquidity),
      sqrtRatioX96: BigInt(pool.sqrtRatioX96),
      token0ProtocolFee: new sdk.Percent(pool.token0ProtocolFee, ONE_HUNDRED),
      token1ProtocolFee: new sdk.Percent(pool.token1ProtocolFee, ONE_HUNDRED)
    };
  }
  if (pool.type === 2 /* STABLE */) {
    return {
      ...pool,
      balances: pool.balances.map((b) => parseCurrencyAmount(chainId, b)),
      amplifier: BigInt(pool.amplifier),
      fee: new sdk.Percent(parseFloat(pool.fee) * 1e6, ONE_HUNDRED * 1000000n)
    };
  }
  throw new Error("Cannot parse unsupoorted pool");
}
function parseRoute(chainId, route) {
  return {
    ...route,
    pools: route.pools.map((p) => parsePool(chainId, p)),
    path: route.path.map((c) => parseCurrency(chainId, c)),
    inputAmount: parseCurrencyAmount(chainId, route.inputAmount),
    outputAmount: parseCurrencyAmount(chainId, route.outputAmount)
  };
}
function parseTrade(chainId, trade) {
  return {
    ...trade,
    inputAmount: parseCurrencyAmount(chainId, trade.inputAmount),
    outputAmount: parseCurrencyAmount(chainId, trade.outputAmount),
    routes: trade.routes.map((r) => parseRoute(chainId, r)),
    gasEstimate: BigInt(trade.gasEstimate),
    gasEstimateInUSD: parseCurrencyAmount(chainId, trade.gasEstimateInUSD),
    fee: trade.fee,
    treasury_address: trade.treasury_address
  };
}

// evm/v3-router/functions/getPairCombinations.ts
var resolver = (currencyA, currencyB) => {
  if (!currencyA || !currencyB || currencyA.wrapped.equals(currencyB.wrapped)) {
    return `${currencyA?.chainId}_${currencyA?.wrapped?.address}_${currencyB?.wrapped?.address}`;
  }
  const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA.wrapped, currencyB.wrapped] : [currencyB.wrapped, currencyA.wrapped];
  return `${token0.chainId}_${token0.address}_${token1.address}`;
};
var getCheckAgainstBaseTokens = memoize__default.default((currencyA, currencyB) => {
  const chainId = currencyA?.chainId;
  if (!chainId || !currencyA || !currencyB || !isCurrenciesSameChain(currencyA, currencyB)) {
    return [];
  }
  const [tokenA, tokenB] = chainId ? [chunkELMVPKZS_js.wrappedCurrency(currencyA, chainId), chunkELMVPKZS_js.wrappedCurrency(currencyB, chainId)] : [void 0, void 0];
  if (!tokenA || !tokenB) {
    return [];
  }
  const common = chunkELMVPKZS_js.BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? [];
  const additionalA = tokenA ? chunkELMVPKZS_js.ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? [] : [];
  const additionalB = tokenB ? chunkELMVPKZS_js.ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? [] : [];
  return [...common, ...additionalA, ...additionalB];
}, resolver);
var getPairCombinations = memoize__default.default((currencyA, currencyB) => {
  const chainId = currencyA?.chainId;
  if (!chainId || !currencyA || !currencyB || !isCurrenciesSameChain(currencyA, currencyB)) {
    return [];
  }
  const [tokenA, tokenB] = chainId ? [chunkELMVPKZS_js.wrappedCurrency(currencyA, chainId), chunkELMVPKZS_js.wrappedCurrency(currencyB, chainId)] : [void 0, void 0];
  if (!tokenA || !tokenB) {
    return [];
  }
  const bases = getCheckAgainstBaseTokens(currencyA, currencyB);
  const basePairs = flatMap__default.default(
    bases,
    (base) => bases.map((otherBase) => [base, otherBase])
  );
  return [
    // the direct pair
    [tokenA, tokenB],
    // token A against all bases
    ...bases.map((base) => [tokenA, base]),
    // token B against all bases
    ...bases.map((base) => [tokenB, base]),
    // each base against all bases
    ...basePairs
  ].filter((tokens) => Boolean(tokens[0] && tokens[1])).filter(([t0, t1]) => !t0.equals(t1)).filter(([tokenA_, tokenB_]) => {
    if (!chainId)
      return true;
    const customBases = chunkELMVPKZS_js.CUSTOM_BASES[chainId];
    const customBasesA = customBases?.[tokenA_.wrapped.address];
    const customBasesB = customBases?.[tokenB_.wrapped.address];
    if (!customBasesA && !customBasesB)
      return true;
    if (customBasesA && !customBasesA.find((base) => tokenB_.equals(base)))
      return false;
    if (customBasesB && !customBasesB.find((base) => tokenA_.equals(base)))
      return false;
    return true;
  });
}, resolver);

// evm/v3-router/functions/computeAllRoutes.ts
function computeAllRoutes(input, output, candidatePools, maxHops = 3) {
  metric("Computing routes from", candidatePools.length, "pools");
  const poolsUsed = Array(candidatePools.length).fill(false);
  const routes = [];
  const computeRoutes = (currencyIn, currencyOut, currentRoute, _previousCurrencyOut) => {
    if (currentRoute.length > maxHops) {
      return;
    }
    if (currentRoute.length > 0 && involvesCurrency(currentRoute[currentRoute.length - 1], currencyOut)) {
      routes.push(buildBaseRoute([...currentRoute], currencyIn, currencyOut));
      return;
    }
    for (let i = 0; i < candidatePools.length; i++) {
      if (poolsUsed[i]) {
        continue;
      }
      const curPool = candidatePools[i];
      const previousCurrencyOut = _previousCurrencyOut || currencyIn;
      if (!involvesCurrency(curPool, previousCurrencyOut)) {
        continue;
      }
      const currentTokenOut = getOutputCurrency(curPool, previousCurrencyOut);
      currentRoute.push(curPool);
      poolsUsed[i] = true;
      computeRoutes(currencyIn, currencyOut, currentRoute, currentTokenOut);
      poolsUsed[i] = false;
      currentRoute.pop();
    }
  };
  computeRoutes(input, output, []);
  metric("Computed routes from", candidatePools.length, "pools", routes.length, "routes");
  return routes;
}
function getBestRouteCombinationByQuotes(amount, quoteCurrency, routesWithQuote, tradeType, config) {
  const chainId = amount.currency.chainId;
  const percents = [];
  const percentToQuotes = {};
  for (const routeWithQuote of routesWithQuote) {
    if (!percentToQuotes[routeWithQuote.percent]) {
      percentToQuotes[routeWithQuote.percent] = [];
      percents.push(routeWithQuote.percent);
    }
    percentToQuotes[routeWithQuote.percent].push(routeWithQuote);
  }
  const swapRoute = getBestSwapRouteBy(
    tradeType,
    percentToQuotes,
    percents.sort((a, b) => a - b),
    chainId,
    (rq) => rq.quoteAdjustedForGas,
    config
  );
  if (!swapRoute) {
    return null;
  }
  const { routes: routeAmounts } = swapRoute;
  const totalAmount = routeAmounts.reduce(
    (total, routeAmount) => total.add(routeAmount.amount),
    sdk.CurrencyAmount.fromRawAmount(routeAmounts[0].amount.currency, 0)
  );
  const missingAmount = amount.subtract(totalAmount);
  if (missingAmount.greaterThan(0)) {
    console.log(
      {
        missingAmount: missingAmount.quotient.toString()
      },
      `Optimal route's amounts did not equal exactIn/exactOut total. Adding missing amount to last route in array.`
    );
    routeAmounts[routeAmounts.length - 1].amount = routeAmounts[routeAmounts.length - 1].amount.add(missingAmount);
  }
  console.log(
    {
      routes: routeAmounts,
      numSplits: routeAmounts.length,
      amount: amount.toExact(),
      quote: swapRoute.quote.toExact(),
      quoteGasAdjusted: swapRoute.quoteGasAdjusted.toFixed(Math.min(swapRoute.quoteGasAdjusted.currency.decimals, 2)),
      estimatedGasUSD: swapRoute.estimatedGasUsedUSD.toFixed(
        Math.min(swapRoute.estimatedGasUsedUSD.currency.decimals, 2)
      ),
      estimatedGasToken: swapRoute.estimatedGasUsedQuoteToken.toFixed(
        Math.min(swapRoute.estimatedGasUsedQuoteToken.currency.decimals, 2)
      )
    },
    `Found best swap route. ${routeAmounts.length} split.`
  );
  const { routes, quote: quoteAmount, estimatedGasUsed, estimatedGasUsedUSD } = swapRoute;
  const quote = sdk.CurrencyAmount.fromRawAmount(quoteCurrency, quoteAmount.quotient);
  const isExactIn = tradeType === sdk.TradeType.EXACT_INPUT;
  return {
    routes: routes.map(({ type, amount: routeAmount, quote: routeQuoteAmount, pools, path, percent }) => {
      const routeQuote = sdk.CurrencyAmount.fromRawAmount(quoteCurrency, routeQuoteAmount.quotient);
      return {
        percent,
        type,
        pools,
        path,
        inputAmount: isExactIn ? routeAmount : routeQuote,
        outputAmount: isExactIn ? routeQuote : routeAmount
      };
    }),
    gasEstimate: estimatedGasUsed,
    gasEstimateInUSD: estimatedGasUsedUSD,
    inputAmount: isExactIn ? amount : quote,
    outputAmount: isExactIn ? quote : amount
  };
}
function getBestSwapRouteBy(tradeType, percentToQuotes, percents, chainId, by, { maxSplits = 4, minSplits = 0 }) {
  const percentToSortedQuotes = mapValues__default.default(percentToQuotes, (routeQuotes) => {
    return routeQuotes.sort((routeQuoteA, routeQuoteB) => {
      if (tradeType === sdk.TradeType.EXACT_INPUT) {
        return by(routeQuoteA).greaterThan(by(routeQuoteB)) ? -1 : 1;
      }
      return by(routeQuoteA).lessThan(by(routeQuoteB)) ? -1 : 1;
    });
  });
  const quoteCompFn = tradeType === sdk.TradeType.EXACT_INPUT ? (a, b) => a.greaterThan(b) : (a, b) => a.lessThan(b);
  const sumFn = (currencyAmounts) => {
    let sum2 = currencyAmounts[0];
    for (let i = 1; i < currencyAmounts.length; i++) {
      sum2 = sum2.add(currencyAmounts[i]);
    }
    return sum2;
  };
  let bestQuote;
  let bestSwap;
  const bestSwapsPerSplit = new FixedReverseHeap__default.default(
    Array,
    (a, b) => {
      return quoteCompFn(a.quote, b.quote) ? -1 : 1;
    },
    3
  );
  if (!percentToSortedQuotes[100] || minSplits > 1) {
    console.log(
      {
        percentToSortedQuotes: mapValues__default.default(percentToSortedQuotes, (p) => p.length)
      },
      "Did not find a valid route without any splits. Continuing search anyway."
    );
  } else {
    bestQuote = by(percentToSortedQuotes[100][0]);
    bestSwap = [percentToSortedQuotes[100][0]];
    for (const routeWithQuote of percentToSortedQuotes[100].slice(0, 5)) {
      bestSwapsPerSplit.push({
        quote: by(routeWithQuote),
        routes: [routeWithQuote]
      });
    }
  }
  const queue = new Queue__default.default();
  for (let i = percents.length; i >= 0; i--) {
    const percent = percents[i];
    if (!percentToSortedQuotes[percent]) {
      continue;
    }
    queue.enqueue({
      curRoutes: [percentToSortedQuotes[percent][0]],
      percentIndex: i,
      remainingPercent: 100 - percent,
      special: false
    });
    if (!percentToSortedQuotes[percent] || !percentToSortedQuotes[percent][1]) {
      continue;
    }
    queue.enqueue({
      curRoutes: [percentToSortedQuotes[percent][1]],
      percentIndex: i,
      remainingPercent: 100 - percent,
      special: true
    });
  }
  let splits = 1;
  while (queue.size > 0) {
    console.log(
      {
        top5: Array.from(bestSwapsPerSplit.consume()).map(
          (q) => `${q.quote.toExact()} (${q.routes.map(
            (r) => `${r.percent}% ${r.amount.toExact()} ${r.pools.map((p) => {
              if (isV2Pool(p)) {
                return `V2 ${p.reserve0.currency.symbol}-${p.reserve1.currency.symbol}`;
              }
              if (isV3Pool(p)) {
                return `V3 fee ${p.fee} ${p.token0.symbol}-${p.token1.symbol}`;
              }
              return `Stable ${p.balances.map((b) => b.currency).join("-")}`;
            }).join(", ")} ${r.quote.toExact()}`
          ).join(", ")})`
        ),
        onQueue: queue.size
      },
      `Top 3 with ${splits} splits`
    );
    bestSwapsPerSplit.clear();
    let layer = queue.size;
    splits++;
    if (splits >= 3 && bestSwap && bestSwap.length < splits - 1) {
      break;
    }
    if (splits > maxSplits) {
      console.log("Max splits reached. Stopping search.");
      break;
    }
    while (layer > 0) {
      layer--;
      const { remainingPercent, curRoutes, percentIndex, special } = queue.dequeue();
      for (let i = percentIndex; i >= 0; i--) {
        const percentA = percents[i];
        if (percentA > remainingPercent) {
          continue;
        }
        if (!percentToSortedQuotes[percentA]) {
          continue;
        }
        const candidateRoutesA = percentToSortedQuotes[percentA];
        const routeWithQuoteA = findFirstRouteNotUsingUsedPools(curRoutes, candidateRoutesA);
        if (!routeWithQuoteA) {
          continue;
        }
        const remainingPercentNew = remainingPercent - percentA;
        const curRoutesNew = [...curRoutes, routeWithQuoteA];
        if (remainingPercentNew === 0 && splits >= minSplits) {
          const quotesNew = curRoutesNew.map((r) => by(r));
          const quoteNew = sumFn(quotesNew);
          const gasCostL1QuoteToken2 = sdk.CurrencyAmount.fromRawAmount(quoteNew.currency, 0);
          const quoteAfterL1Adjust = tradeType === sdk.TradeType.EXACT_INPUT ? quoteNew.subtract(gasCostL1QuoteToken2) : quoteNew.add(gasCostL1QuoteToken2);
          bestSwapsPerSplit.push({
            quote: quoteAfterL1Adjust,
            routes: curRoutesNew
          });
          if (!bestQuote || quoteCompFn(quoteAfterL1Adjust, bestQuote)) {
            bestQuote = quoteAfterL1Adjust;
            bestSwap = curRoutesNew;
          }
        } else {
          queue.enqueue({
            curRoutes: curRoutesNew,
            remainingPercent: remainingPercentNew,
            percentIndex: i,
            special
          });
        }
      }
    }
  }
  if (!bestSwap) {
    console.log(`Could not find a valid swap`);
    return null;
  }
  let quoteGasAdjusted = sumFn(bestSwap.map((routeWithValidQuote) => routeWithValidQuote.quoteAdjustedForGas));
  const estimatedGasUsed = bestSwap.map((routeWithValidQuote) => routeWithValidQuote.gasEstimate).reduce((sum2, routeWithValidQuote) => sum2 + routeWithValidQuote, 0n);
  if (!chunkELMVPKZS_js.usdGasTokensByChain[chainId] || !chunkELMVPKZS_js.usdGasTokensByChain[chainId][0]) {
    throw new Error(`Could not find a USD token for computing gas costs on ${chainId}`);
  }
  const usdToken = chunkELMVPKZS_js.usdGasTokensByChain[chainId][0];
  const usdTokenDecimals = usdToken.decimals;
  const gasCostsL1ToL2 = {
    gasUsedL1: 0n,
    gasCostL1USD: sdk.CurrencyAmount.fromRawAmount(usdToken, 0),
    gasCostL1QuoteToken: sdk.CurrencyAmount.fromRawAmount(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      bestSwap[0]?.quote.currency.wrapped,
      0
    )
  };
  const { gasCostL1USD, gasCostL1QuoteToken } = gasCostsL1ToL2;
  const estimatedGasUsedUSDs = bestSwap.map((routeWithValidQuote) => {
    const decimalsDiff = usdTokenDecimals - routeWithValidQuote.gasCostInUSD.currency.decimals;
    if (decimalsDiff === 0) {
      return sdk.CurrencyAmount.fromRawAmount(usdToken, routeWithValidQuote.gasCostInUSD.quotient);
    }
    return sdk.CurrencyAmount.fromRawAmount(
      usdToken,
      routeWithValidQuote.gasCostInUSD.quotient * 10n ** BigInt(decimalsDiff)
    );
  });
  let estimatedGasUsedUSD = sumFn(estimatedGasUsedUSDs);
  if (!estimatedGasUsedUSD.currency.equals(gasCostL1USD.currency)) {
    const decimalsDiff = usdTokenDecimals - gasCostL1USD.currency.decimals;
    estimatedGasUsedUSD = estimatedGasUsedUSD.add(
      sdk.CurrencyAmount.fromRawAmount(usdToken, gasCostL1USD.quotient * 10n ** BigInt(decimalsDiff))
    );
  } else {
    estimatedGasUsedUSD = estimatedGasUsedUSD.add(gasCostL1USD);
  }
  const estimatedGasUsedQuoteToken = sumFn(
    bestSwap.map((routeWithValidQuote) => routeWithValidQuote.gasCostInToken)
  ).add(gasCostL1QuoteToken);
  const quote = sumFn(bestSwap.map((routeWithValidQuote) => routeWithValidQuote.quote));
  if (tradeType === sdk.TradeType.EXACT_INPUT) {
    const quoteGasAdjustedForL1 = quoteGasAdjusted.subtract(gasCostL1QuoteToken);
    quoteGasAdjusted = quoteGasAdjustedForL1;
  } else {
    const quoteGasAdjustedForL1 = quoteGasAdjusted.add(gasCostL1QuoteToken);
    quoteGasAdjusted = quoteGasAdjustedForL1;
  }
  const routeWithQuotes = bestSwap.sort(
    (routeAmountA, routeAmountB) => routeAmountB.amount.greaterThan(routeAmountA.amount) ? 1 : -1
  );
  return {
    quote,
    quoteGasAdjusted,
    estimatedGasUsed,
    estimatedGasUsedUSD,
    estimatedGasUsedQuoteToken,
    routes: routeWithQuotes
  };
}
var findFirstRouteNotUsingUsedPools = (usedRoutes, candidateRouteQuotes) => {
  const poolAddressSet = /* @__PURE__ */ new Set();
  const usedPoolAddresses = flatMap2__default.default(usedRoutes, ({ pools }) => pools.map(getPoolAddress));
  for (const poolAddress of usedPoolAddresses) {
    poolAddressSet.add(poolAddress);
  }
  for (const routeQuote of candidateRouteQuotes) {
    const { pools } = routeQuote;
    const poolAddresses = pools.map(getPoolAddress);
    if (poolAddresses.some((poolAddress) => poolAddressSet.has(poolAddress))) {
      continue;
    }
    return routeQuote;
  }
  return null;
};
async function createGasModel({
  gasPriceWei,
  poolProvider,
  quoteCurrency,
  blockNumber
}) {
  const { chainId } = quoteCurrency;
  const usdToken = getUsdGasToken(chainId);
  if (!usdToken) {
    throw new Error(`No valid usd token found on chain ${chainId}`);
  }
  const nativeWrappedToken = getNativeWrappedToken(chainId);
  if (!nativeWrappedToken) {
    throw new Error(`Unsupported chain ${chainId}. Native wrapped token not found.`);
  }
  const gasPrice = BigInt(typeof gasPriceWei === "function" ? await gasPriceWei() : gasPriceWei);
  const [usdPool, nativePool] = await Promise.all([
    getHighestLiquidityUSDPool(poolProvider, chainId, blockNumber),
    getHighestLiquidityNativePool(poolProvider, quoteCurrency, blockNumber)
  ]);
  const estimateGasCost = ({ pools }, { initializedTickCrossedList }) => {
    const isQuoteNative = nativeWrappedToken.equals(quoteCurrency.wrapped);
    const totalInitializedTicksCrossed = BigInt(Math.max(1, sum__default.default(initializedTickCrossedList)));
    const poolTypeSet = /* @__PURE__ */ new Set();
    let baseGasUse = 0n;
    for (const pool of pools) {
      const { type } = pool;
      if (isV2Pool(pool)) {
        if (!poolTypeSet.has(type)) {
          baseGasUse += chunkELMVPKZS_js.BASE_SWAP_COST_V2;
          poolTypeSet.add(type);
          continue;
        }
        baseGasUse += chunkELMVPKZS_js.COST_PER_EXTRA_HOP_V2;
        continue;
      }
      if (isV3Pool(pool)) {
        if (!poolTypeSet.has(type)) {
          baseGasUse += chunkELMVPKZS_js.BASE_SWAP_COST_V3(chainId);
          poolTypeSet.add(type);
        }
        baseGasUse += chunkELMVPKZS_js.COST_PER_HOP_V3(chainId);
        continue;
      }
      if (isStablePool(pool)) {
        if (!poolTypeSet.has(type)) {
          baseGasUse += chunkELMVPKZS_js.BASE_SWAP_COST_STABLE_SWAP;
          poolTypeSet.add(type);
          continue;
        }
        baseGasUse += chunkELMVPKZS_js.COST_PER_EXTRA_HOP_STABLE_SWAP;
        continue;
      }
    }
    const tickGasUse = chunkELMVPKZS_js.COST_PER_INIT_TICK(chainId) * totalInitializedTicksCrossed;
    const uninitializedTickGasUse = chunkELMVPKZS_js.COST_PER_UNINIT_TICK * 0n;
    baseGasUse = baseGasUse + tickGasUse + uninitializedTickGasUse;
    const baseGasCostWei = gasPrice * baseGasUse;
    const totalGasCostNativeCurrency = sdk.CurrencyAmount.fromRawAmount(nativeWrappedToken, baseGasCostWei);
    let gasCostInToken = sdk.CurrencyAmount.fromRawAmount(quoteCurrency.wrapped, 0);
    let gasCostInUSD = sdk.CurrencyAmount.fromRawAmount(usdToken, 0);
    try {
      if (isQuoteNative) {
        gasCostInToken = totalGasCostNativeCurrency;
      }
      if (!isQuoteNative && nativePool) {
        const price = getTokenPrice(nativePool, nativeWrappedToken, quoteCurrency.wrapped);
        gasCostInToken = price.quote(totalGasCostNativeCurrency);
      }
      if (usdPool) {
        const nativeTokenUsdPrice = getTokenPrice(usdPool, nativeWrappedToken, usdToken);
        gasCostInUSD = nativeTokenUsdPrice.quote(totalGasCostNativeCurrency);
      }
    } catch (e) {
    }
    return {
      gasEstimate: baseGasUse,
      gasCostInToken,
      gasCostInUSD
    };
  };
  return {
    estimateGasCost
  };
}
async function getHighestLiquidityNativePool(poolProvider, currency, blockNumber) {
  const nativeWrappedToken = getNativeWrappedToken(currency.chainId);
  if (!nativeWrappedToken || currency.wrapped.equals(nativeWrappedToken)) {
    return null;
  }
  const pools = await poolProvider.getCandidatePools({
    blockNumber,
    pairs: [[nativeWrappedToken, currency]],
    currencyA: nativeWrappedToken,
    currencyB: currency
  });
  return pools[0] ?? null;
}
async function getHighestLiquidityUSDPool(poolProvider, chainId, blockNumber) {
  const usdToken = getUsdGasToken(chainId);
  const nativeWrappedToken = getNativeWrappedToken(chainId);
  if (!usdToken || !nativeWrappedToken) {
    return null;
  }
  const pools = await poolProvider.getCandidatePools({
    blockNumber,
    pairs: [[nativeWrappedToken, usdToken]],
    currencyA: nativeWrappedToken,
    currencyB: usdToken
  });
  return pools[0] ?? null;
}
async function getRoutesWithValidQuote({
  amount,
  baseRoutes,
  distributionPercent,
  quoteProvider,
  tradeType,
  blockNumber,
  gasModel,
  quoterOptimization = true
}) {
  const [percents, amounts] = getAmountDistribution(amount, distributionPercent);
  const routesWithoutQuote = amounts.reduce(
    (acc, curAmount, i) => [
      ...acc,
      ...baseRoutes.map((r) => ({
        ...r,
        amount: curAmount,
        percent: percents[i]
      }))
    ],
    []
  );
  const getRoutesWithQuote = tradeType === sdk.TradeType.EXACT_INPUT ? quoteProvider.getRouteWithQuotesExactIn : quoteProvider.getRouteWithQuotesExactOut;
  if (!quoterOptimization) {
    return getRoutesWithQuote(routesWithoutQuote, { blockNumber, gasModel });
  }
  const requestCallback = typeof window === "undefined" ? setTimeout : window.requestIdleCallback || window.setTimeout;
  metric("Get quotes", "from", routesWithoutQuote.length, "routes", routesWithoutQuote);
  const getQuotes = (routes) => new Promise((resolve, reject) => {
    requestCallback(async () => {
      try {
        const result2 = await getRoutesWithQuote(routes, { blockNumber, gasModel });
        resolve(result2);
      } catch (e) {
        reject(e);
      }
    });
  });
  const chunks = chunk__default.default(routesWithoutQuote, 10);
  const result = await Promise.all(chunks.map(getQuotes));
  const quotes = result.reduce((acc, cur) => [...acc, ...cur], []);
  metric("Get quotes", "success, got", quotes.length, "quoted routes", quotes);
  return quotes;
}

// evm/v3-router/constants/poolSelector.ts
var DEFAULT_POOL_SELECTOR_CONFIG = {
  topN: 2,
  topNDirectSwaps: 2,
  topNTokenInOut: 2,
  topNSecondHop: 1,
  topNWithEachBaseToken: 3,
  topNWithBaseToken: 3
};
var V3_DEFAULT_POOL_SELECTOR_CONFIG = {};
var V2_DEFAULT_POOL_SELECTOR_CONFIG = {};
var V3_TOKEN_POOL_SELECTOR_CONFIG = {};
var V2_TOKEN_POOL_SELECTOR_CONFIG = {};

// evm/v3-router/constants/routeConfig.ts
var ROUTE_CONFIG_BY_CHAIN = {};

// evm/v3-router/getBestTrade.ts
async function getBestTrade(amount, currency, tradeType, config) {
  const { blockNumber: blockNumberFromConfig } = config;
  const blockNumber = typeof blockNumberFromConfig === "function" ? await blockNumberFromConfig() : blockNumberFromConfig;
  const bestRoutes = await getBestRoutes(amount, currency, tradeType, {
    ...config,
    blockNumber
  });
  if (!bestRoutes || bestRoutes.outputAmount.equalTo(sdk.ZERO)) {
    throw new Error("Cannot find a valid swap route");
  }
  const { routes, gasEstimateInUSD, gasEstimate, inputAmount, outputAmount } = bestRoutes;
  return {
    tradeType,
    routes,
    gasEstimate,
    gasEstimateInUSD,
    inputAmount,
    outputAmount,
    blockNumber
  };
}
async function getBestRoutes(amount, currency, tradeType, routeConfig) {
  const { chainId } = currency;
  const {
    maxHops = 3,
    maxSplits = 4,
    distributionPercent = 5,
    poolProvider,
    quoteProvider,
    blockNumber,
    gasPriceWei,
    allowedPoolTypes,
    quoterOptimization
  } = {
    ...routeConfig,
    ...ROUTE_CONFIG_BY_CHAIN[chainId] || {}
  };
  const isExactIn = tradeType === sdk.TradeType.EXACT_INPUT;
  const inputCurrency = isExactIn ? amount.currency : currency;
  const outputCurrency = isExactIn ? currency : amount.currency;
  const candidatePools = await poolProvider?.getCandidatePools({
    currencyA: amount.currency,
    currencyB: currency,
    blockNumber,
    protocols: allowedPoolTypes
  });
  let baseRoutes = computeAllRoutes(inputCurrency, outputCurrency, candidatePools, maxHops);
  if (tradeType === sdk.TradeType.EXACT_OUTPUT) {
    baseRoutes = baseRoutes.filter(({ type }) => type !== 3 /* MIXED */);
  }
  const gasModel = await createGasModel({ gasPriceWei, poolProvider, quoteCurrency: currency, blockNumber });
  const routesWithValidQuote = await getRoutesWithValidQuote({
    amount,
    baseRoutes,
    distributionPercent,
    quoteProvider,
    tradeType,
    blockNumber,
    gasModel,
    quoterOptimization
  });
  return getBestRouteCombinationByQuotes(amount, currency, routesWithValidQuote, tradeType, { maxSplits });
}

// evm/v3-router/providers/poolProviders/poolProviderWithCache.ts
function createPoolProviderWithCache(provider) {
  return provider;
}
function formatFraction(fraction, precision = 6) {
  if (!fraction || fraction.denominator === 0n) {
    return void 0;
  }
  if (fraction.greaterThan(10n ** BigInt(precision))) {
    return fraction.toFixed(0);
  }
  return fraction.toSignificant(precision);
}
function formatPrice(price, precision) {
  if (!price) {
    return void 0;
  }
  return formatFraction(price?.asFraction.multiply(price?.scalar), precision);
}

// evm/utils/withFallback.ts
function withTimeout(fn, duration) {
  return function callWithTimeout(...args) {
    return Promise.race([
      fn(...args),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Request timeout ${duration}ms`)), duration);
      })
    ]);
  };
}
function withFallback(calls) {
  return async function asyncCall(...args) {
    const numOfCalls = calls.length;
    if (numOfCalls === 0) {
      throw new Error("No valid calls");
    }
    for (const [index, { timeout = 2e3, asyncFn }] of calls.entries()) {
      const fn = index < numOfCalls - 1 ? withTimeout(asyncFn, timeout) : asyncFn;
      try {
        const result = await fn(...args);
        return result;
      } catch (e) {
        if (index === numOfCalls - 1) {
          throw e;
        }
        console.error("Call failed with error", e, "Try next fallback");
      }
    }
    throw new Error("Unexpected end of call");
  };
}
function createAsyncCallWithFallbacks(defaultCall, options) {
  const { fallbacks = [], fallbackTimeout: timeout = 3e3 } = options || {};
  return withFallback(
    [defaultCall, ...fallbacks].map((asyncFn) => ({
      asyncFn,
      timeout
    }))
  );
}
function subgraphPoolProviderFactory({
  id,
  getPoolMetas,
  getPoolsFromSubgraph
}) {
  return async function subgraphPoolProvider({
    provider,
    pairs
  }) {
    if (!provider) {
      throw new Error("No valid subgraph data provider");
    }
    const chainId = pairs[0]?.[0]?.chainId;
    if (!chainId) {
      return [];
    }
    const client = provider({ chainId });
    if (!client) {
      console.error("No subgraph client found for chainId", chainId);
      return [];
    }
    metric(`SUBGRAPH_POOLS_START(${id})`, pairs);
    const metaMap = /* @__PURE__ */ new Map();
    for (const pair of pairs) {
      const metas = getPoolMetas(pair);
      for (const meta of metas) {
        metaMap.set(meta.address.toLocaleLowerCase(), meta);
      }
    }
    const addresses = Array.from(metaMap.keys());
    const pools = await getPoolsFromSubgraph({
      addresses,
      getPoolMetaByAddress: (address) => metaMap.get(address.toLocaleLowerCase()) ?? null,
      client
    });
    metric(`SUBGRAPH_POOLS_END(${id})`, pools);
    return pools.filter((p) => !!p);
  };
}
var getV3PoolMeta = memoize__default.default(
  ([currencyA, currencyB, feeAmount]) => ({
    address: v3Sdk.Pool.getAddress(currencyA.wrapped, currencyB.wrapped, feeAmount),
    currencyA,
    currencyB,
    fee: feeAmount
  }),
  ([currencyA, currencyB, feeAmount]) => {
    if (currencyA.wrapped.equals(currencyB.wrapped)) {
      return [currencyA.chainId, currencyA.wrapped.address, feeAmount].join("_");
    }
    const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA.wrapped, currencyB.wrapped] : [currencyB.wrapped, currencyA.wrapped];
    return [token0.chainId, token0.address, token1.address, feeAmount].join("_");
  }
);
var getV3PoolMetas = memoize__default.default(
  (pair) => [v3Sdk.FeeAmount.LOWEST, v3Sdk.FeeAmount.LOW, v3Sdk.FeeAmount.MEDIUM, v3Sdk.FeeAmount.HIGH].map((fee) => getV3PoolMeta([...pair, fee])),
  ([currencyA, currencyB]) => {
    if (currencyA.wrapped.equals(currencyB.wrapped)) {
      return [currencyA.chainId, currencyA.wrapped.address].join("_");
    }
    const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA.wrapped, currencyB.wrapped] : [currencyB.wrapped, currencyA.wrapped];
    return [token0.chainId, token0.address, token1.address].join("_");
  }
);
var queryV3Pools = graphqlRequest.gql`
  query getPools($pageSize: Int!, $poolAddrs: [String]) {
    pools(first: $pageSize, where: { id_in: $poolAddrs }) {
      id
      tick
      sqrtPrice
      feeTier
      liquidity
      feeProtocol
      totalValueLockedUSD
    }
  }
`;
var getV3PoolSubgraph = subgraphPoolProviderFactory({
  id: "V3",
  getPoolMetas: getV3PoolMetas,
  getPoolsFromSubgraph: async ({ addresses, getPoolMetaByAddress, client }) => {
    const { pools: poolsFromSubgraph } = await client.request(queryV3Pools, {
      pageSize: 1e3,
      poolAddrs: addresses
    });
    return poolsFromSubgraph.map(({ id, liquidity, sqrtPrice, tick, totalValueLockedUSD, feeProtocol }) => {
      const meta = getPoolMetaByAddress(id);
      if (!meta) {
        return null;
      }
      const { fee, currencyA, currencyB, address } = meta;
      const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA, currencyB] : [currencyB, currencyA];
      const [token0ProtocolFee, token1ProtocolFee] = v3Sdk.parseProtocolFees(feeProtocol);
      return {
        type: 1 /* V3 */,
        fee,
        token0,
        token1,
        liquidity: BigInt(liquidity),
        sqrtRatioX96: BigInt(sqrtPrice),
        tick: Number(tick),
        address,
        tvlUSD: BigInt(Number.parseInt(totalValueLockedUSD)),
        token0ProtocolFee,
        token1ProtocolFee
      };
    });
  }
});
var queryV2Pools = graphqlRequest.gql`
  query getPools($pageSize: Int!, $poolAddrs: [ID!]) {
    pairs(first: $pageSize, where: { id_in: $poolAddrs }) {
      id
      reserve0
      reserve1
      reserveUSD
    }
  }
`;
var getV2PoolSubgraph = subgraphPoolProviderFactory({
  id: "V2",
  getPoolMetas: ([currencyA, currencyB]) => [
    {
      currencyA,
      currencyB,
      address: computeV2PoolAddress(currencyA.wrapped, currencyB.wrapped)
    }
  ],
  getPoolsFromSubgraph: async ({ addresses, getPoolMetaByAddress, client }) => {
    const { pairs: poolsFromSubgraph } = await client.request(queryV2Pools, {
      pageSize: 1e3,
      poolAddrs: addresses
    });
    return poolsFromSubgraph.map(({ id, reserveUSD, reserve0, reserve1 }) => {
      const meta = getPoolMetaByAddress(id);
      if (!meta) {
        return null;
      }
      const { currencyA, currencyB, address } = meta;
      const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA, currencyB] : [currencyB, currencyA];
      const reserve0Amount = tryParseAmount_default(reserve0, token0);
      const reserve1Amount = tryParseAmount_default(reserve1, token1);
      if (!reserve0Amount || !reserve1Amount) {
        return null;
      }
      return {
        address,
        type: 0 /* V2 */,
        reserve0: reserve0Amount,
        reserve1: reserve1Amount,
        tvlUSD: BigInt(Number.parseInt(reserveUSD))
      };
    });
  }
});
function subgraphAllPoolsQueryFactory({
  getPoolsFromSubgraph,
  getPoolId
}) {
  return async function getAllPools({
    provider,
    chainId,
    pageSize = 1e3
  }) {
    if (!provider || !chainId) {
      throw new Error("No valid subgraph data provider");
    }
    const client = provider({ chainId });
    if (!client) {
      throw new Error(`No subgraph client found for chainId ${chainId}`);
    }
    let hasMorePools = true;
    let lastId = "";
    let pools = [];
    while (hasMorePools) {
      const poolsAtCurrentPage = await getPoolsFromSubgraph({ client, lastId, pageSize, chainId });
      if (poolsAtCurrentPage.length < pageSize) {
        hasMorePools = false;
        pools = [...pools, ...poolsAtCurrentPage];
        break;
      }
      lastId = getPoolId(poolsAtCurrentPage[poolsAtCurrentPage.length - 1]);
      pools = [...pools, ...poolsAtCurrentPage];
    }
    return pools;
  };
}
var queryAllV3Pools = graphqlRequest.gql`
  query getPools($pageSize: Int!, $id: String) {
    pools(first: $pageSize, where: { id_gt: $id }) {
      id
      tick
      token0 {
        symbol
        id
        decimals
      }
      token1 {
        symbol
        id
        decimals
      }
      sqrtPrice
      feeTier
      liquidity
      feeProtocol
      totalValueLockedUSD
    }
  }
`;
var getAllV3PoolsFromSubgraph = subgraphAllPoolsQueryFactory({
  id: "getAllV3PoolsFromSubgraph",
  getPoolsFromSubgraph: async ({ lastId, pageSize, client, chainId }) => {
    const { pools: poolsFromSubgraph } = await client.request(
      queryAllV3Pools,
      {
        pageSize,
        id: lastId
      }
    );
    return poolsFromSubgraph.map(
      ({ id, liquidity, sqrtPrice, tick, totalValueLockedUSD, feeProtocol, token0, token1, feeTier }) => {
        const [token0ProtocolFee, token1ProtocolFee] = v3Sdk.parseProtocolFees(feeProtocol);
        return {
          type: 1 /* V3 */,
          fee: Number(feeTier),
          token0: new sdk.Token(chainId, viem.getAddress(token0.id), Number(token0.decimals), token0.symbol),
          token1: new sdk.Token(chainId, viem.getAddress(token1.id), Number(token1.decimals), token1.symbol),
          liquidity: BigInt(liquidity),
          sqrtRatioX96: BigInt(sqrtPrice),
          tick: Number(tick),
          address: viem.getAddress(id),
          tvlUSD: BigInt(Number.parseInt(totalValueLockedUSD)),
          token0ProtocolFee,
          token1ProtocolFee
        };
      }
    );
  },
  getPoolId: (p) => p.address
});

// evm/abis/IPancakeV3Pool.ts
var pancakeV3PoolABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "int24", name: "tickLower", type: "int24" },
      { indexed: true, internalType: "int24", name: "tickUpper", type: "int24" },
      { indexed: false, internalType: "uint128", name: "amount", type: "uint128" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    name: "Burn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: false, internalType: "address", name: "recipient", type: "address" },
      { indexed: true, internalType: "int24", name: "tickLower", type: "int24" },
      { indexed: true, internalType: "int24", name: "tickUpper", type: "int24" },
      { indexed: false, internalType: "uint128", name: "amount0", type: "uint128" },
      { indexed: false, internalType: "uint128", name: "amount1", type: "uint128" }
    ],
    name: "Collect",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "uint128", name: "amount0", type: "uint128" },
      { indexed: false, internalType: "uint128", name: "amount1", type: "uint128" }
    ],
    name: "CollectProtocol",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "paid0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "paid1", type: "uint256" }
    ],
    name: "Flash",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint16", name: "observationCardinalityNextOld", type: "uint16" },
      { indexed: false, internalType: "uint16", name: "observationCardinalityNextNew", type: "uint16" }
    ],
    name: "IncreaseObservationCardinalityNext",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint160", name: "sqrtPriceX96", type: "uint160" },
      { indexed: false, internalType: "int24", name: "tick", type: "int24" }
    ],
    name: "Initialize",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "int24", name: "tickLower", type: "int24" },
      { indexed: true, internalType: "int24", name: "tickUpper", type: "int24" },
      { indexed: false, internalType: "uint128", name: "amount", type: "uint128" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    name: "Mint",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint32", name: "feeProtocol0Old", type: "uint32" },
      { indexed: false, internalType: "uint32", name: "feeProtocol1Old", type: "uint32" },
      { indexed: false, internalType: "uint32", name: "feeProtocol0New", type: "uint32" },
      { indexed: false, internalType: "uint32", name: "feeProtocol1New", type: "uint32" }
    ],
    name: "SetFeeProtocol",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "addr", type: "address" }],
    name: "SetLmPoolEvent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "int256", name: "amount0", type: "int256" },
      { indexed: false, internalType: "int256", name: "amount1", type: "int256" },
      { indexed: false, internalType: "uint160", name: "sqrtPriceX96", type: "uint160" },
      { indexed: false, internalType: "uint128", name: "liquidity", type: "uint128" },
      { indexed: false, internalType: "int24", name: "tick", type: "int24" },
      { indexed: false, internalType: "uint128", name: "protocolFeesToken0", type: "uint128" },
      { indexed: false, internalType: "uint128", name: "protocolFeesToken1", type: "uint128" }
    ],
    name: "Swap",
    type: "event"
  },
  {
    inputs: [
      { internalType: "int24", name: "tickLower", type: "int24" },
      { internalType: "int24", name: "tickUpper", type: "int24" },
      { internalType: "uint128", name: "amount", type: "uint128" }
    ],
    name: "burn",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "int24", name: "tickLower", type: "int24" },
      { internalType: "int24", name: "tickUpper", type: "int24" },
      { internalType: "uint128", name: "amount0Requested", type: "uint128" },
      { internalType: "uint128", name: "amount1Requested", type: "uint128" }
    ],
    name: "collect",
    outputs: [
      { internalType: "uint128", name: "amount0", type: "uint128" },
      { internalType: "uint128", name: "amount1", type: "uint128" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint128", name: "amount0Requested", type: "uint128" },
      { internalType: "uint128", name: "amount1Requested", type: "uint128" }
    ],
    name: "collectProtocol",
    outputs: [
      { internalType: "uint128", name: "amount0", type: "uint128" },
      { internalType: "uint128", name: "amount1", type: "uint128" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "fee",
    outputs: [{ internalType: "uint24", name: "", type: "uint24" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "feeGrowthGlobal0X128",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "feeGrowthGlobal1X128",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" }
    ],
    name: "flash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint16", name: "observationCardinalityNext", type: "uint16" }],
    name: "increaseObservationCardinalityNext",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint160", name: "sqrtPriceX96", type: "uint160" }],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "liquidity",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lmPool",
    outputs: [{ internalType: "contract IPancakeV3LmPool", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maxLiquidityPerTick",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "int24", name: "tickLower", type: "int24" },
      { internalType: "int24", name: "tickUpper", type: "int24" },
      { internalType: "uint128", name: "amount", type: "uint128" },
      { internalType: "bytes", name: "data", type: "bytes" }
    ],
    name: "mint",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "observations",
    outputs: [
      { internalType: "uint32", name: "blockTimestamp", type: "uint32" },
      { internalType: "int56", name: "tickCumulative", type: "int56" },
      { internalType: "uint160", name: "secondsPerLiquidityCumulativeX128", type: "uint160" },
      { internalType: "bool", name: "initialized", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint32[]", name: "secondsAgos", type: "uint32[]" }],
    name: "observe",
    outputs: [
      { internalType: "int56[]", name: "tickCumulatives", type: "int56[]" },
      { internalType: "uint160[]", name: "secondsPerLiquidityCumulativeX128s", type: "uint160[]" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "positions",
    outputs: [
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint256", name: "feeGrowthInside0LastX128", type: "uint256" },
      { internalType: "uint256", name: "feeGrowthInside1LastX128", type: "uint256" },
      { internalType: "uint128", name: "tokensOwed0", type: "uint128" },
      { internalType: "uint128", name: "tokensOwed1", type: "uint128" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "protocolFees",
    outputs: [
      { internalType: "uint128", name: "token0", type: "uint128" },
      { internalType: "uint128", name: "token1", type: "uint128" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint32", name: "feeProtocol0", type: "uint32" },
      { internalType: "uint32", name: "feeProtocol1", type: "uint32" }
    ],
    name: "setFeeProtocol",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_lmPool", type: "address" }],
    name: "setLmPool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "slot0",
    outputs: [
      { internalType: "uint160", name: "sqrtPriceX96", type: "uint160" },
      { internalType: "int24", name: "tick", type: "int24" },
      { internalType: "uint16", name: "observationIndex", type: "uint16" },
      { internalType: "uint16", name: "observationCardinality", type: "uint16" },
      { internalType: "uint16", name: "observationCardinalityNext", type: "uint16" },
      { internalType: "uint32", name: "feeProtocol", type: "uint32" },
      { internalType: "bool", name: "unlocked", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "int24", name: "tickLower", type: "int24" },
      { internalType: "int24", name: "tickUpper", type: "int24" }
    ],
    name: "snapshotCumulativesInside",
    outputs: [
      { internalType: "int56", name: "tickCumulativeInside", type: "int56" },
      { internalType: "uint160", name: "secondsPerLiquidityInsideX128", type: "uint160" },
      { internalType: "uint32", name: "secondsInside", type: "uint32" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "bool", name: "zeroForOne", type: "bool" },
      { internalType: "int256", name: "amountSpecified", type: "int256" },
      { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" },
      { internalType: "bytes", name: "data", type: "bytes" }
    ],
    name: "swap",
    outputs: [
      { internalType: "int256", name: "amount0", type: "int256" },
      { internalType: "int256", name: "amount1", type: "int256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "int16", name: "", type: "int16" }],
    name: "tickBitmap",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "tickSpacing",
    outputs: [{ internalType: "int24", name: "", type: "int24" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "int24", name: "", type: "int24" }],
    name: "ticks",
    outputs: [
      { internalType: "uint128", name: "liquidityGross", type: "uint128" },
      { internalType: "int128", name: "liquidityNet", type: "int128" },
      { internalType: "uint256", name: "feeGrowthOutside0X128", type: "uint256" },
      { internalType: "uint256", name: "feeGrowthOutside1X128", type: "uint256" },
      { internalType: "int56", name: "tickCumulativeOutside", type: "int56" },
      { internalType: "uint160", name: "secondsPerLiquidityOutsideX128", type: "uint160" },
      { internalType: "uint32", name: "secondsOutside", type: "uint32" },
      { internalType: "bool", name: "initialized", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "token0",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "token1",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  }
];

// evm/v3-router/providers/poolProviders/onChainPoolProviders.ts
var getV2PoolsOnChain = createOnChainPoolFactory({
  abi: chunkELMVPKZS_js.pancakePairABI,
  getPossiblePoolMetas: ([currencyA, currencyB]) => [
    { address: computeV2PoolAddress(currencyA.wrapped, currencyB.wrapped), currencyA, currencyB }
  ],
  buildPoolInfoCalls: (address) => [
    {
      address,
      functionName: "getReserves",
      args: []
    }
  ],
  buildPool: ({ currencyA, currencyB }, [reserves]) => {
    if (!reserves) {
      return null;
    }
    const [reserve0, reserve1] = reserves;
    const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA, currencyB] : [currencyB, currencyA];
    return {
      type: 0 /* V2 */,
      reserve0: sdk.CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
      reserve1: sdk.CurrencyAmount.fromRawAmount(token1, reserve1.toString())
    };
  }
});
var getStablePoolsOnChain = createOnChainPoolFactory({
  abi: chunkELMVPKZS_js.stableSwapPairABI,
  getPossiblePoolMetas: ([currencyA, currencyB]) => {
    const poolConfigs = chunkELMVPKZS_js.getStableSwapPools(currencyA.chainId);
    return poolConfigs.filter(({ token, quoteToken }) => {
      const tokenA = tokenLists.deserializeToken(token);
      const tokenB = tokenLists.deserializeToken(quoteToken);
      return tokenA.equals(currencyA.wrapped) && tokenB.equals(currencyB.wrapped) || tokenA.equals(currencyB.wrapped) && tokenB.equals(currencyA.wrapped);
    }).map(({ stableSwapAddress }) => ({
      address: stableSwapAddress,
      currencyA,
      currencyB
    }));
  },
  buildPoolInfoCalls: (address) => [
    {
      address,
      functionName: "balances",
      args: [0]
    },
    {
      address,
      functionName: "balances",
      args: [1]
    },
    {
      address,
      functionName: "A",
      args: []
    },
    {
      address,
      functionName: "fee",
      args: []
    },
    {
      address,
      functionName: "FEE_DENOMINATOR",
      args: []
    }
  ],
  buildPool: ({ currencyA, currencyB, address }, [balance0, balance1, a, fee, feeDenominator]) => {
    if (!balance0 || !balance1 || !a || !fee || !feeDenominator) {
      return null;
    }
    const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA, currencyB] : [currencyB, currencyA];
    return {
      address,
      type: 2 /* STABLE */,
      balances: [
        sdk.CurrencyAmount.fromRawAmount(token0, balance0.toString()),
        sdk.CurrencyAmount.fromRawAmount(token1, balance1.toString())
      ],
      amplifier: BigInt(a.toString()),
      fee: new sdk.Percent(BigInt(fee.toString()), BigInt(feeDenominator.toString()))
    };
  }
});
var getV3PoolsWithoutTicksOnChain = createOnChainPoolFactory({
  abi: pancakeV3PoolABI,
  getPossiblePoolMetas: ([currencyA, currencyB]) => {
    const deployerAddress = v3Sdk.DEPLOYER_ADDRESSES[currencyA.chainId];
    if (!deployerAddress) {
      return [];
    }
    return [v3Sdk.FeeAmount.LOWEST, v3Sdk.FeeAmount.LOW, v3Sdk.FeeAmount.MEDIUM, v3Sdk.FeeAmount.HIGH].map((fee) => ({
      address: computeV3PoolAddress({
        deployerAddress,
        tokenA: currencyA.wrapped,
        tokenB: currencyB.wrapped,
        fee
      }),
      currencyA,
      currencyB,
      fee
    }));
  },
  buildPoolInfoCalls: (address) => [
    {
      address,
      functionName: "liquidity"
    },
    {
      address,
      functionName: "slot0"
    }
  ],
  buildPool: ({ currencyA, currencyB, fee, address }, [liquidity, slot0]) => {
    if (!slot0) {
      return null;
    }
    const [sqrtPriceX96, tick, , , , feeProtocol] = slot0;
    const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA, currencyB] : [currencyB, currencyA];
    const [token0ProtocolFee, token1ProtocolFee] = v3Sdk.parseProtocolFees(feeProtocol);
    return {
      type: 1 /* V3 */,
      token0,
      token1,
      fee,
      liquidity: BigInt(liquidity.toString()),
      sqrtRatioX96: BigInt(sqrtPriceX96.toString()),
      tick: Number(tick),
      address,
      token0ProtocolFee,
      token1ProtocolFee
    };
  }
});
function createOnChainPoolFactory({ abi, getPossiblePoolMetas, buildPoolInfoCalls, buildPool }) {
  return async function poolFactory(pairs, provider, blockNumber) {
    if (!provider) {
      throw new Error("No valid onchain data provider");
    }
    const chainId = pairs[0]?.[0]?.chainId;
    const client = provider({ chainId });
    if (!chainId || !client) {
      return [];
    }
    const poolAddressSet = /* @__PURE__ */ new Set();
    const poolMetas = [];
    for (const pair of pairs) {
      const possiblePoolMetas = getPossiblePoolMetas(pair);
      for (const meta of possiblePoolMetas) {
        if (!poolAddressSet.has(meta.address)) {
          poolMetas.push(meta);
          poolAddressSet.add(meta.address);
        }
      }
    }
    let calls = [];
    let poolCallSize = 0;
    for (const { address } of poolMetas) {
      const poolCalls = buildPoolInfoCalls(address);
      if (!poolCallSize) {
        poolCallSize = poolCalls.length;
      }
      if (!poolCallSize || poolCallSize !== poolCalls.length) {
        throw new Error("Inconsistent pool data call");
      }
      calls = [...calls, ...poolCalls];
    }
    if (!calls.length) {
      return [];
    }
    const results = await client.multicall({
      contracts: calls.map((call) => ({
        abi,
        address: call.address,
        functionName: call.functionName,
        args: call.args
      })),
      allowFailure: true,
      blockNumber: blockNumber ? BigInt(Number(BigInt(blockNumber))) : void 0
    });
    const pools = [];
    for (let i = 0; i < poolMetas.length; i += 1) {
      const poolResults = results.slice(i * poolCallSize, (i + 1) * poolCallSize);
      const pool = buildPool(
        poolMetas[i],
        poolResults.map((result) => result.result)
      );
      if (pool) {
        pools.push(pool);
      }
    }
    return pools;
  };
}
var tokenPriceQuery = graphqlRequest.gql`
  query getTokens($pageSize: Int!, $tokenAddrs: [ID!]) {
    tokens(first: $pageSize, where: { id_in: $tokenAddrs }) {
      id
      derivedUSD
    }
  }
`;
function createCommonTokenPriceProvider(getTokenPrices) {
  return async function getCommonTokenPrices2({ currencyA, currencyB, ...rest }) {
    const baseTokens = getCheckAgainstBaseTokens(currencyA, currencyB);
    if (!baseTokens) {
      return null;
    }
    const map = /* @__PURE__ */ new Map();
    const idToToken = {};
    const addresses = baseTokens.map((t) => {
      const address = viem.getAddress(t.address);
      idToToken[address] = t;
      return address;
    });
    const tokenPrices = await getTokenPrices({ addresses, chainId: currencyA?.chainId, ...rest });
    for (const { address, priceUSD } of tokenPrices) {
      const token = idToToken[viem.getAddress(address)];
      if (token) {
        map.set(token.wrapped.address, parseFloat(priceUSD) || 0);
      }
    }
    return map;
  };
}
var getTokenUsdPricesBySubgraph = async ({
  addresses,
  chainId,
  provider
}) => {
  const client = provider?.({ chainId });
  if (!client) {
    throw new Error("No valid subgraph data provider");
  }
  const { tokens: tokenPrices } = await client.request(
    tokenPriceQuery,
    {
      pageSize: 1e3,
      tokenAddrs: addresses.map((addr) => addr.toLocaleLowerCase())
    }
  );
  return tokenPrices.map(({ id, derivedUSD }) => ({
    address: id,
    priceUSD: derivedUSD
  }));
};
var getCommonTokenPricesBySubgraph = createCommonTokenPriceProvider(getTokenUsdPricesBySubgraph);
var createGetTokenPriceFromLlmaWithCache = () => {
  const cache = /* @__PURE__ */ new Map();
  return async ({ addresses, chainId }) => {
    if (!chainId) {
      throw new Error(`Invalid chain id ${chainId}`);
    }
    const [cachedResults, addressesToFetch] = addresses.reduce(
      ([cachedAddrs, newAddrs], address) => {
        const cached = cache.get(address);
        if (!cached) {
          newAddrs.push(address);
        } else {
          cachedAddrs.push(cached);
        }
        return [cachedAddrs, newAddrs];
      },
      [[], []]
    );
    if (!addressesToFetch.length) {
      return cachedResults;
    }
    const list = addressesToFetch.map(
      (address) => `${address.toLocaleLowerCase()}`
    ).join(",");
    const result = await fetch(
      `https://pricing.icecreamswap.com/${chainId}?token=${list}`
    ).then((res) => res.json()).catch((reason) => {
      console.warn("Error while getting token price", reason);
      return {};
    });
    return [
      ...cachedResults,
      ...Object.entries(result || {}).map(([key, value]) => {
        const address = key;
        const tokenPrice = { address, priceUSD: value };
        cache.set(viem.getAddress(address), tokenPrice);
        return tokenPrice;
      })
    ];
  };
};
var getCommonTokenPricesByLlma = createCommonTokenPriceProvider(
  createGetTokenPriceFromLlmaWithCache()
);
var getCommonTokenPrices = withFallback([
  {
    asyncFn: ({ currencyA, currencyB }) => getCommonTokenPricesByLlma({ currencyA, currencyB }),
    timeout: 3e3
  },
  {
    asyncFn: ({ currencyA, currencyB, v3SubgraphProvider }) => getCommonTokenPricesBySubgraph({ currencyA, currencyB, provider: v3SubgraphProvider })
  }
]);

// evm/v3-router/utils/mergePoolSelectorConfig.ts
function mergePoolSelectorConfig(baseConfig, customConfig) {
  if (!customConfig) {
    return baseConfig;
  }
  const merged = { ...baseConfig };
  const keys = Object.keys(merged);
  for (const key of keys) {
    merged[key] = Math.max(merged[key], customConfig[key] || 0);
  }
  return merged;
}

// evm/v3-router/utils/getPoolSelectorConfig.ts
function poolSelectorConfigFactory(poolSelecorConfigMap, tokenPoolSelectorConfigMap) {
  return function getPoolSelectorConfig(currencyA, currencyB) {
    const chainId = currencyA?.chainId;
    if (!chainId || !poolSelecorConfigMap[chainId]) {
      return DEFAULT_POOL_SELECTOR_CONFIG;
    }
    const additionalConfigA = tokenPoolSelectorConfigMap[chainId]?.[currencyA?.wrapped?.address || "0x"];
    const additionalConfigB = tokenPoolSelectorConfigMap[chainId]?.[currencyB?.wrapped?.address || "0x"];
    return mergePoolSelectorConfig(
      mergePoolSelectorConfig(poolSelecorConfigMap[chainId], additionalConfigA),
      additionalConfigB
    );
  };
}
var getV3PoolSelectorConfig = poolSelectorConfigFactory(
  V3_DEFAULT_POOL_SELECTOR_CONFIG,
  V3_TOKEN_POOL_SELECTOR_CONFIG
);
var getV2PoolSelectorConfig = poolSelectorConfigFactory(
  V2_DEFAULT_POOL_SELECTOR_CONFIG,
  V2_TOKEN_POOL_SELECTOR_CONFIG
);

// evm/v3-router/providers/poolProviders/poolTvlSelectors.ts
var sortByTvl = (a, b) => a.tvlUSD >= b.tvlUSD ? -1 : 1;
function poolSelectorFactory({
  getPoolSelectorConfig,
  getToken0,
  getToken1,
  getPoolAddress: getPoolAddress2
}) {
  return function tvlSelector(currencyA, currencyB, unorderedPoolsWithTvl) {
    const POOL_SELECTION_CONFIG = getPoolSelectorConfig(currencyA, currencyB);
    if (!currencyA || !currencyB || !unorderedPoolsWithTvl.length) {
      return [];
    }
    const poolsFromSubgraph = unorderedPoolsWithTvl.sort(sortByTvl);
    const { chainId } = getToken0(poolsFromSubgraph[0]);
    const baseTokens = chunkELMVPKZS_js.BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? [];
    const poolSet = /* @__PURE__ */ new Set();
    const addToPoolSet = (pools2) => {
      for (const pool of pools2) {
        poolSet.add(getPoolAddress2(pool));
      }
    };
    const topByBaseWithTokenIn = baseTokens.map((token) => {
      return poolsFromSubgraph.filter((subgraphPool) => {
        return getToken0(subgraphPool).wrapped.equals(token) && getToken1(subgraphPool).wrapped.equals(currencyA.wrapped) || getToken1(subgraphPool).wrapped.equals(token) && getToken0(subgraphPool).wrapped.equals(currencyA.wrapped);
      }).sort(sortByTvl).slice(0, POOL_SELECTION_CONFIG.topNWithEachBaseToken);
    }).reduce((acc, cur) => [...acc, ...cur], []).sort(sortByTvl).slice(0, POOL_SELECTION_CONFIG.topNWithBaseToken);
    addToPoolSet(topByBaseWithTokenIn);
    const topByBaseWithTokenOut = baseTokens.map((token) => {
      return poolsFromSubgraph.filter((subgraphPool) => {
        if (poolSet.has(getPoolAddress2(subgraphPool))) {
          return false;
        }
        return getToken0(subgraphPool).wrapped.equals(token) && getToken1(subgraphPool).wrapped.equals(currencyB.wrapped) || getToken1(subgraphPool).wrapped.equals(token) && getToken0(subgraphPool).wrapped.equals(currencyB.wrapped);
      }).sort(sortByTvl).slice(0, POOL_SELECTION_CONFIG.topNWithEachBaseToken);
    }).reduce((acc, cur) => [...acc, ...cur], []).sort(sortByTvl).slice(0, POOL_SELECTION_CONFIG.topNWithBaseToken);
    addToPoolSet(topByBaseWithTokenOut);
    const top2DirectPools = poolsFromSubgraph.filter((subgraphPool) => {
      if (poolSet.has(getPoolAddress2(subgraphPool))) {
        return false;
      }
      return getToken0(subgraphPool).wrapped.equals(currencyA.wrapped) && getToken1(subgraphPool).wrapped.equals(currencyB.wrapped) || getToken1(subgraphPool).wrapped.equals(currencyA.wrapped) && getToken0(subgraphPool).wrapped.equals(currencyB.wrapped);
    }).slice(0, POOL_SELECTION_CONFIG.topNDirectSwaps);
    addToPoolSet(top2DirectPools);
    const nativeToken = sdk.WNATIVE[chainId];
    const top2EthBaseTokenPool = nativeToken ? poolsFromSubgraph.filter((subgraphPool) => {
      if (poolSet.has(getPoolAddress2(subgraphPool))) {
        return false;
      }
      return getToken0(subgraphPool).wrapped.equals(nativeToken) && getToken1(subgraphPool).wrapped.equals(currencyA.wrapped) || getToken1(subgraphPool).wrapped.equals(nativeToken) && getToken0(subgraphPool).wrapped.equals(currencyA.wrapped);
    }).slice(0, 1) : [];
    addToPoolSet(top2EthBaseTokenPool);
    const top2EthQuoteTokenPool = nativeToken ? poolsFromSubgraph.filter((subgraphPool) => {
      if (poolSet.has(getPoolAddress2(subgraphPool))) {
        return false;
      }
      return getToken0(subgraphPool).wrapped.equals(nativeToken) && getToken1(subgraphPool).wrapped.equals(currencyB.wrapped) || getToken1(subgraphPool).wrapped.equals(nativeToken) && getToken0(subgraphPool).wrapped.equals(currencyB.wrapped);
    }).slice(0, 1) : [];
    addToPoolSet(top2EthQuoteTokenPool);
    const topByTVL = poolsFromSubgraph.slice(0, POOL_SELECTION_CONFIG.topN).filter((pool) => !poolSet.has(getPoolAddress2(pool)));
    addToPoolSet(topByTVL);
    const topByTVLUsingTokenBase = poolsFromSubgraph.filter((subgraphPool) => {
      if (poolSet.has(getPoolAddress2(subgraphPool))) {
        return false;
      }
      return getToken0(subgraphPool).wrapped.equals(currencyA.wrapped) || getToken1(subgraphPool).wrapped.equals(currencyA.wrapped);
    }).slice(0, POOL_SELECTION_CONFIG.topNTokenInOut);
    addToPoolSet(topByTVLUsingTokenBase);
    const topByTVLUsingTokenQuote = poolsFromSubgraph.filter((subgraphPool) => {
      if (poolSet.has(getPoolAddress2(subgraphPool))) {
        return false;
      }
      return getToken0(subgraphPool).wrapped.equals(currencyB.wrapped) || getToken1(subgraphPool).wrapped.equals(currencyB.wrapped);
    }).slice(0, POOL_SELECTION_CONFIG.topNTokenInOut);
    addToPoolSet(topByTVLUsingTokenQuote);
    const getTopByTVLUsingTokenSecondHops = (base, tokenToCompare) => base.map((subgraphPool) => {
      return getToken0(subgraphPool).wrapped.equals(tokenToCompare.wrapped) ? getToken1(subgraphPool) : getToken0(subgraphPool);
    }).map((secondHopToken) => {
      return poolsFromSubgraph.filter((subgraphPool) => {
        if (poolSet.has(getPoolAddress2(subgraphPool))) {
          return false;
        }
        return getToken0(subgraphPool).wrapped.equals(secondHopToken.wrapped) || getToken1(subgraphPool).wrapped.equals(secondHopToken.wrapped);
      }).slice(0, POOL_SELECTION_CONFIG.topNSecondHop);
    }).reduce((acc, cur) => [...acc, ...cur], []).sort(sortByTvl).slice(0, POOL_SELECTION_CONFIG.topNSecondHop);
    const topByTVLUsingTokenInSecondHops = getTopByTVLUsingTokenSecondHops(
      [...topByTVLUsingTokenBase, ...topByBaseWithTokenIn],
      currencyA
    );
    addToPoolSet(topByTVLUsingTokenInSecondHops);
    const topByTVLUsingTokenOutSecondHops = getTopByTVLUsingTokenSecondHops(
      [...topByTVLUsingTokenQuote, ...topByBaseWithTokenOut],
      currencyB
    );
    addToPoolSet(topByTVLUsingTokenOutSecondHops);
    const pools = [
      ...topByBaseWithTokenIn,
      ...topByBaseWithTokenOut,
      ...top2DirectPools,
      ...top2EthBaseTokenPool,
      ...top2EthQuoteTokenPool,
      ...topByTVL,
      ...topByTVLUsingTokenBase,
      ...topByTVLUsingTokenQuote,
      ...topByTVLUsingTokenInSecondHops,
      ...topByTVLUsingTokenOutSecondHops
    ];
    return pools.map(({ tvlUSD, ...rest }) => rest);
  };
}
var v3PoolTvlSelector = poolSelectorFactory({
  getPoolSelectorConfig: getV3PoolSelectorConfig,
  getToken0: (p) => p.token0,
  getToken1: (p) => p.token1,
  getPoolAddress: (p) => p.address
});
var v2PoolTvlSelector = poolSelectorFactory({
  getPoolSelectorConfig: getV2PoolSelectorConfig,
  getToken0: (p) => p.reserve0.currency,
  getToken1: (p) => p.reserve1.currency,
  getPoolAddress: (p) => getPoolAddress(p) || "0x"
});

// evm/v3-router/providers/poolProviders/getV2CandidatePools.ts
function createV2PoolsProviderByCommonTokenPrices(getCommonTokenPrices2) {
  return async function getV2Pools({
    currencyA,
    currencyB,
    pairs: providedPairs,
    onChainProvider,
    blockNumber,
    ...rest
  }) {
    const pairs = providedPairs || getPairCombinations(currencyA, currencyB);
    const [poolsFromOnChain, baseTokenUsdPrices] = await Promise.all([
      getV2PoolsOnChain(pairs, onChainProvider, blockNumber),
      getCommonTokenPrices2({ currencyA, currencyB, ...rest })
    ]);
    if (!poolsFromOnChain) {
      throw new Error("Failed to get v2 candidate pools");
    }
    if (!baseTokenUsdPrices) {
      console.debug("Failed to get base token prices");
      return poolsFromOnChain.map((pool) => {
        return {
          ...pool,
          tvlUSD: BigInt(0),
          address: getPoolAddress(pool)
        };
      });
    }
    return poolsFromOnChain.map((pool) => {
      const getAmountUsd = (amount) => {
        if (amount.equalTo(sdk.ZERO)) {
          return 0;
        }
        const price = baseTokenUsdPrices.get(amount.currency.wrapped.address);
        if (price !== void 0) {
          return parseFloat(amount.toExact()) * price;
        }
        const againstAmount = pool.reserve0.currency.equals(amount.currency) ? pool.reserve1 : pool.reserve0;
        const againstUsdPrice = baseTokenUsdPrices.get(againstAmount.currency.wrapped.address);
        if (againstUsdPrice) {
          const poolPrice = new sdk.Price({ baseAmount: amount, quoteAmount: againstAmount });
          return parseFloat(amount.toExact()) * parseFloat(formatPrice(poolPrice, 6) || "0");
        }
        return 0;
      };
      return {
        ...pool,
        tvlUSD: BigInt(Math.floor(getAmountUsd(pool.reserve0) + getAmountUsd(pool.reserve1))),
        address: getPoolAddress(pool)
      };
    });
  };
}
var getV2PoolsWithTvlByCommonTokenPrices = createV2PoolsProviderByCommonTokenPrices(getCommonTokenPrices);
function createGetV2CandidatePools(defaultGetV2Pools, options) {
  const getV2PoolsWithFallbacks = createAsyncCallWithFallbacks(defaultGetV2Pools, options);
  return async function getV2Pools(params) {
    const { currencyA, currencyB } = params;
    const pools = await getV2PoolsWithFallbacks(params);
    return v2PoolTvlSelector(currencyA, currencyB, pools);
  };
}
async function getV2CandidatePools(params) {
  const fallbacks = [
    ({ pairs: providedPairs, currencyA, currencyB, v2SubgraphProvider }) => {
      const pairs = providedPairs || getPairCombinations(currencyA, currencyB);
      return getV2PoolSubgraph({ provider: v2SubgraphProvider, pairs });
    }
  ];
  const getV2PoolsWithFallbacks = createGetV2CandidatePools(getV2PoolsWithTvlByCommonTokenPrices, {
    fallbacks,
    fallbackTimeout: 3e3
  });
  return getV2PoolsWithFallbacks(params);
}
var getV3PoolTvl = memoize__default.default(
  (pools, poolAddress) => {
    const poolWithTvl = pools.find((p) => p.address === poolAddress);
    return poolWithTvl?.tvlUSD || 0n;
  },
  (_, poolAddress) => poolAddress
);
var v3PoolsOnChainProviderFactory = (tvlReferenceProvider) => {
  return async function getV3PoolsWithTvlFromOnChain2(params) {
    const { currencyA, currencyB, pairs: providedPairs, onChainProvider, blockNumber } = params;
    const pairs = providedPairs || getPairCombinations(currencyA, currencyB);
    const [fromOnChain, tvlReference] = await Promise.allSettled([
      getV3PoolsWithoutTicksOnChain(pairs, onChainProvider, blockNumber),
      tvlReferenceProvider(params)
    ]);
    if (fromOnChain.status === "fulfilled" && tvlReference.status === "fulfilled") {
      const { value: poolsFromOnChain } = fromOnChain;
      const { value: poolTvlReferences } = tvlReference;
      if (!Array.isArray(poolTvlReferences)) {
        throw new Error("Failed to get tvl references");
      }
      return poolsFromOnChain.map((pool) => {
        const tvlUSD = BigInt(getV3PoolTvl(poolTvlReferences, pool.address));
        return {
          ...pool,
          tvlUSD
        };
      });
    }
    throw new Error(`Getting v3 pools failed. Onchain ${fromOnChain.status}, tvl references ${tvlReference.status}`);
  };
};
var getV3PoolsWithTvlFromOnChain = v3PoolsOnChainProviderFactory((params) => {
  const { currencyA, currencyB, pairs: providedPairs, subgraphProvider } = params;
  const pairs = providedPairs || getPairCombinations(currencyA, currencyB);
  return getV3PoolSubgraph({ provider: subgraphProvider, pairs });
});
var createFallbackTvlRefGetter = () => {
  const cache = /* @__PURE__ */ new Map();
  return async (params) => {
    const { currencyA } = params;
    if (!currencyA?.chainId) {
      throw new Error(`Cannot get tvl references at chain ${currencyA?.chainId}`);
    }
    const cached = cache.get(currencyA.chainId);
    if (cached) {
      return cached;
    }
    const res = await fetch(`https://routing-api.pancakeswap.com/v0/v3-pools-tvl/${currencyA.chainId}`);
    const refs = await res.json();
    cache.set(currencyA.chainId, refs);
    return refs;
  };
};
var getV3PoolsWithTvlFromOnChainFallback = v3PoolsOnChainProviderFactory(createFallbackTvlRefGetter());
var getV3PoolsWithTvlFromOnChainStaticFallback = v3PoolsOnChainProviderFactory(() => Promise.resolve([]));
function createGetV3CandidatePools(defaultGetV3Pools, options) {
  const getV3PoolsWithFallbacks = createAsyncCallWithFallbacks(defaultGetV3Pools, options);
  return async function getV3Pools(params) {
    const { currencyA, currencyB } = params;
    const chainId = currencyA?.chainId || currencyB?.chainId || constants.defaultChainId;
    if (!constants.getChain(chainId)?.features.includes("swapV3")) {
      return [];
    }
    const pools = await getV3PoolsWithFallbacks(params);
    return v3PoolTvlSelector(currencyA, currencyB, pools);
  };
}
async function getV3CandidatePools(params) {
  const {
    subgraphCacheFallback = true,
    subgraphFallback = true,
    staticFallback = true,
    fallbackTimeout,
    ...rest
  } = params;
  const fallbacks = [];
  if (subgraphCacheFallback) {
    fallbacks.push(getV3PoolsWithTvlFromOnChainFallback);
  }
  if (subgraphFallback) {
    fallbacks.push(async (p) => {
      const { currencyA, currencyB, pairs: providedPairs, subgraphProvider } = p;
      const pairs = providedPairs || getPairCombinations(currencyA, currencyB);
      return getV3PoolSubgraph({ provider: subgraphProvider, pairs });
    });
  }
  if (staticFallback) {
    fallbacks.push(getV3PoolsWithTvlFromOnChainStaticFallback);
  }
  const getV3PoolsWithFallback = createGetV3CandidatePools(getV3PoolsWithTvlFromOnChain, {
    fallbacks,
    fallbackTimeout
  });
  return getV3PoolsWithFallback(rest);
}

// evm/v3-router/providers/poolProviders/getStableCandidatePools.ts
async function getStableCandidatePools(params) {
  const { onChainProvider, currencyA, currencyB, pairs: providedPairs, blockNumber } = params;
  const pairs = providedPairs || getPairCombinations(currencyA, currencyB);
  return getStablePoolsOnChain(pairs, onChainProvider, blockNumber);
}

// evm/v3-router/providers/poolProviders/getCandidatePools.ts
async function getCandidatePools({
  protocols = [1 /* V3 */, 0 /* V2 */, 2 /* STABLE */],
  v2SubgraphProvider,
  v3SubgraphProvider,
  ...rest
}) {
  const { currencyA } = rest;
  const chainId = currencyA?.chainId;
  if (!chainId) {
    return [];
  }
  const poolSets = await Promise.all(
    protocols.map((protocol) => {
      if (protocol === 0 /* V2 */) {
        return getV2CandidatePools({ ...rest, v2SubgraphProvider, v3SubgraphProvider });
      }
      if (protocol === 1 /* V3 */) {
        return getV3CandidatePools({ ...rest, subgraphProvider: v3SubgraphProvider });
      }
      return getStableCandidatePools(rest);
    })
  );
  return poolSets.reduce((acc, cur) => [...acc, ...cur], []);
}

// evm/v3-router/providers/poolProviders/hybridPoolProvider.ts
function createHybridPoolProvider({
  onChainProvider,
  v2SubgraphProvider,
  v3SubgraphProvider
}) {
  const hybridPoolProvider = {
    getCandidatePools: async (params) => {
      return getCandidatePools({ ...params, onChainProvider, v2SubgraphProvider, v3SubgraphProvider });
    }
  };
  return createPoolProviderWithCache(hybridPoolProvider);
}

// evm/v3-router/providers/poolProviders/staticPoolProvider.ts
function createStaticPoolProvider(pools) {
  const defaultAllowedProtocols = [0 /* V2 */, 2 /* STABLE */, 1 /* V3 */];
  return {
    getCandidatePools: async ({ protocols = defaultAllowedProtocols, pairs }) => {
      if (!pools) {
        return [];
      }
      if (!pairs) {
        return pools.filter((pool) => protocols.includes(pool.type));
      }
      const relatedPools = [];
      for (const [currencyA, currencyB] of pairs) {
        for (const pool of pools) {
          if (involvesCurrency(pool, currencyA) && involvesCurrency(pool, currencyB) && protocols.includes(pool.type)) {
            relatedPools.push(pool);
          }
        }
      }
      return relatedPools;
    }
  };
}

// evm/v3-router/providers/poolProviders/index.ts
function createPoolProvider(config) {
  const hybridPoolProvider = createHybridPoolProvider(config);
  return hybridPoolProvider;
}
function createOffChainQuoteProvider() {
  const createGetRoutesWithQuotes = (isExactIn = true) => {
    const getV2Quote = createGetV2Quote(isExactIn);
    const getStableQuote = createGetStableQuote(isExactIn);
    const getV3Quote = createGetV3Quote(isExactIn);
    function* each(pools) {
      let i = isExactIn ? 0 : pools.length - 1;
      const hasNext = () => isExactIn ? i < pools.length : i >= 0;
      while (hasNext()) {
        yield [pools[i], i];
        if (isExactIn) {
          i += 1;
        } else {
          i -= 1;
        }
      }
    }
    const adjustQuoteForGas = (quote, gasCostInToken) => {
      if (isExactIn) {
        return quote.subtract(gasCostInToken);
      }
      return quote.add(gasCostInToken);
    };
    return async function getRoutesWithQuotes(routes, { gasModel }) {
      const routesWithQuote = [];
      for (const route of routes) {
        try {
          const { pools, amount } = route;
          let quote = amount;
          const initializedTickCrossedList = Array(pools.length).fill(0);
          let quoteSuccess = true;
          for (const [pool, i] of each(pools)) {
            if (isV2Pool(pool)) {
              quote = getV2Quote(pool, quote);
              continue;
            }
            if (isStablePool(pool)) {
              quote = getStableQuote(pool, quote);
              continue;
            }
            if (isV3Pool(pool)) {
              const v3QuoteResult = await getV3Quote(pool, quote);
              if (!v3QuoteResult || v3QuoteResult.quote.quotient === sdk.ZERO) {
                quoteSuccess = false;
                break;
              }
              const { quote: v3Quote, numOfTicksCrossed } = v3QuoteResult;
              quote = v3Quote;
              initializedTickCrossedList[i] = numOfTicksCrossed;
            }
          }
          if (!quoteSuccess) {
            continue;
          }
          const { gasEstimate, gasCostInUSD, gasCostInToken } = gasModel.estimateGasCost(
            {
              ...route,
              quote
            },
            { initializedTickCrossedList }
          );
          routesWithQuote.push({
            ...route,
            quote,
            quoteAdjustedForGas: adjustQuoteForGas(quote, gasCostInToken),
            gasEstimate,
            gasCostInUSD,
            gasCostInToken
          });
        } catch (e) {
        }
      }
      return routesWithQuote;
    };
  };
  return {
    getRouteWithQuotesExactIn: createGetRoutesWithQuotes(true),
    getRouteWithQuotesExactOut: createGetRoutesWithQuotes(false)
  };
}
function createGetV2Quote(isExactIn = true) {
  return function getV2Quote({ reserve0, reserve1 }, amount) {
    const pair = new sdk.Pair(reserve0.wrapped, reserve1.wrapped);
    const [quote] = isExactIn ? pair.getOutputAmount(amount.wrapped) : pair.getInputAmount(amount.wrapped);
    return quote;
  };
}
function createGetStableQuote(isExactIn = true) {
  const getQuote = isExactIn ? getSwapOutput : getSwapInput;
  return function getStableQuote(pool, amount) {
    const { amplifier, balances, fee } = pool;
    return getQuote({
      amount,
      balances,
      amplifier,
      outputCurrency: getOutputCurrency(pool, amount.currency),
      fee
    });
  };
}
function createGetV3Quote(isExactIn = true) {
  return async function getV3Quote(pool, amount) {
    const { token0, token1, fee, sqrtRatioX96, liquidity, ticks, tick } = pool;
    if (!ticks?.length) {
      return null;
    }
    try {
      const v3Pool = new v3Sdk.Pool(token0.wrapped, token1.wrapped, fee, sqrtRatioX96, liquidity, tick, ticks);
      const [quote, poolAfter] = isExactIn ? await v3Pool.getOutputAmount(amount.wrapped) : await v3Pool.getInputAmount(amount.wrapped);
      if (quote.quotient <= 0n) {
        return null;
      }
      const { tickCurrent: tickAfter } = poolAfter;
      const numOfTicksCrossed = v3Sdk.TickList.countInitializedTicksCrossed(ticks, tick, tickAfter);
      return {
        quote,
        numOfTicksCrossed
      };
    } catch (e) {
      return null;
    }
  };
}

// evm/abis/IMixedRouteQuoterV1.ts
var mixedRouteQuoterV1ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_deployer",
        type: "address"
      },
      {
        internalType: "address",
        name: "_factory",
        type: "address"
      },
      {
        internalType: "address",
        name: "_factoryV2",
        type: "address"
      },
      {
        internalType: "address",
        name: "_factoryStable",
        type: "address"
      },
      {
        internalType: "address",
        name: "_WETH9",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "WETH9",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "deployer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factoryStable",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factoryV2",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "amount0Delta",
        type: "int256"
      },
      {
        internalType: "int256",
        name: "amount1Delta",
        type: "int256"
      },
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      }
    ],
    name: "pancakeV3SwapCallback",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      },
      {
        internalType: "uint256[]",
        name: "flag",
        type: "uint256[]"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      }
    ],
    name: "quoteExactInput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160[]",
        name: "v3SqrtPriceX96AfterList",
        type: "uint160[]"
      },
      {
        internalType: "uint32[]",
        name: "v3InitializedTicksCrossedList",
        type: "uint32[]"
      },
      {
        internalType: "uint256",
        name: "v3SwapGasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "flag",
            type: "uint256"
          }
        ],
        internalType: "struct IMixedRouteQuoterV1.QuoteExactInputSingleStableParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingleStable",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256"
          }
        ],
        internalType: "struct IMixedRouteQuoterV1.QuoteExactInputSingleV2Params",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingleV2",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256"
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24"
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160"
          }
        ],
        internalType: "struct IMixedRouteQuoterV1.QuoteExactInputSingleV3Params",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingleV3",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160",
        name: "sqrtPriceX96After",
        type: "uint160"
      },
      {
        internalType: "uint32",
        name: "initializedTicksCrossed",
        type: "uint32"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// evm/abis/IQuoterV2.ts
var quoterV2ABI = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      }
    ],
    name: "quoteExactInput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160[]",
        name: "sqrtPriceX96AfterList",
        type: "uint160[]"
      },
      {
        internalType: "uint32[]",
        name: "initializedTicksCrossedList",
        type: "uint32[]"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256"
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24"
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160"
          }
        ],
        internalType: "struct IQuoterV2.QuoteExactInputSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160",
        name: "sqrtPriceX96After",
        type: "uint160"
      },
      {
        internalType: "uint32",
        name: "initializedTicksCrossed",
        type: "uint32"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      }
    ],
    name: "quoteExactOutput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        internalType: "uint160[]",
        name: "sqrtPriceX96AfterList",
        type: "uint160[]"
      },
      {
        internalType: "uint32[]",
        name: "initializedTicksCrossedList",
        type: "uint32[]"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24"
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160"
          }
        ],
        internalType: "struct IQuoterV2.QuoteExactOutputSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactOutputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        internalType: "uint160",
        name: "sqrtPriceX96After",
        type: "uint160"
      },
      {
        internalType: "uint32",
        name: "initializedTicksCrossed",
        type: "uint32"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// evm/abis/InterfaceMulticall.ts
var InterfaceMulticall_default = [
  {
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
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
        name: "addr",
        type: "address"
      }
    ],
    name: "getEthBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "gasLimit",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          }
        ],
        internalType: "struct PancakeInterfaceMulticall.Call[]",
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool"
          },
          {
            internalType: "uint256",
            name: "gasUsed",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes"
          }
        ],
        internalType: "struct PancakeInterfaceMulticall.Result[]",
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// evm/v3-router/providers/multicallProvider.ts
var IMulticallProvider = class {
};

// evm/v3-router/providers/multicallSwapProvider.ts
var PancakeMulticallProvider = class extends IMulticallProvider {
  constructor(chainId, provider, gasLimitPerCall = 1e6) {
    super();
    this.chainId = chainId;
    this.provider = provider;
    this.gasLimitPerCall = gasLimitPerCall;
    this.provider = provider;
  }
  async callSameFunctionOnMultipleContracts(params) {
    const { addresses, functionName, functionParams, abi, additionalConfig } = params;
    const gasLimitPerCall = additionalConfig?.gasLimitPerCall ?? this.gasLimitPerCall;
    const callData = viem.encodeFunctionData({
      abi,
      functionName,
      args: functionParams
    });
    const calls = addresses.map((address) => {
      return {
        target: address,
        callData,
        gasLimit: BigInt(gasLimitPerCall)
      };
    });
    const { results: result, blockNumber } = await multicall.multicallByGasLimit(calls, {
      gasLimit: additionalConfig?.gasLimit,
      gasBuffer: additionalConfig?.gasBuffer,
      dropUnexecutedCalls: additionalConfig?.dropUnexecutedCalls,
      chainId: this.chainId,
      client: this.provider
    });
    const results = [];
    const gasUsedForSuccess = [];
    const gasUsedForFail = [];
    for (const { result: callResult, success, gasUsed } of result) {
      if (callResult === "0x" || !success) {
        results.push({
          success: false,
          returnData: callResult
        });
        gasUsedForFail.push(Number(gasUsed));
        continue;
      }
      try {
        results.push({
          success: true,
          result: viem.decodeFunctionResult({
            abi,
            functionName,
            data: callResult
          })
        });
        gasUsedForSuccess.push(Number(gasUsed));
      } catch (e) {
        results.push({
          success: false,
          returnData: callResult
        });
      }
    }
    return {
      blockNumber,
      results,
      approxGasUsedPerSuccessCall: stats__default.default.percentile(gasUsedForSuccess, 99),
      approxGasUsedPerFailCall: stats__default.default.percentile(gasUsedForFail, 99)
    };
  }
  async callSameFunctionOnContractWithMultipleParams(params) {
    const { address, functionName, functionParams, abi, additionalConfig } = params;
    const gasLimitPerCall = additionalConfig?.gasLimitPerCall ?? this.gasLimitPerCall;
    const calls = functionParams.map((functionParam) => {
      const callData = viem.encodeFunctionData({
        abi,
        functionName,
        args: functionParam
      });
      return {
        target: address,
        callData,
        gasLimit: BigInt(gasLimitPerCall)
      };
    });
    const { results: result, blockNumber } = await multicall.multicallByGasLimit(calls, {
      gasLimit: additionalConfig?.gasLimit,
      gasBuffer: additionalConfig?.gasBuffer,
      dropUnexecutedCalls: additionalConfig?.dropUnexecutedCalls,
      chainId: this.chainId,
      client: this.provider
    });
    const results = [];
    const gasUsedForSuccess = [];
    const gasUsedForFail = [];
    for (const { result: callResult, success, gasUsed } of result) {
      if (callResult === "0x" || !success) {
        results.push({
          success: false,
          returnData: callResult
        });
        gasUsedForFail.push(Number(gasUsed));
        continue;
      }
      try {
        results.push({
          success: true,
          result: viem.decodeFunctionResult({
            abi,
            functionName,
            data: callResult
          })
        });
        gasUsedForSuccess.push(Number(gasUsed));
      } catch (e) {
        results.push({
          success: false,
          returnData: callResult
        });
      }
    }
    return {
      blockNumber,
      results,
      approxGasUsedPerSuccessCall: stats__default.default.percentile(gasUsedForSuccess, 99),
      approxGasUsedPerFailCall: stats__default.default.percentile(gasUsedForFail, 99)
    };
  }
  async callMultipleFunctionsOnSameContract(params) {
    const { address, functionNames, functionParams, additionalConfig, abi } = params;
    const gasLimitPerCall = additionalConfig?.gasLimitPerCall ?? this.gasLimitPerCall;
    const calls = functionNames.map((functionName, i) => {
      const callData = viem.encodeFunctionData({
        abi,
        functionName,
        args: functionParams ? functionParams[i] : []
      });
      return {
        target: address,
        callData,
        gasLimit: BigInt(gasLimitPerCall)
      };
    });
    const { results: result, blockNumber } = await multicall.multicallByGasLimit(calls, {
      gasLimit: additionalConfig?.gasLimit,
      gasBuffer: additionalConfig?.gasBuffer,
      dropUnexecutedCalls: additionalConfig?.dropUnexecutedCalls,
      chainId: this.chainId,
      client: this.provider
    });
    const results = [];
    const gasUsedForSuccess = [];
    const gasUsedForFail = [];
    for (const [i, { result: callResult, success, gasUsed }] of result.entries()) {
      if (callResult === "0x" || !success) {
        results.push({
          success: false,
          returnData: callResult
        });
        gasUsedForFail.push(Number(gasUsed));
        continue;
      }
      try {
        results.push({
          success: true,
          result: viem.decodeFunctionResult({
            abi,
            functionName: functionNames[i],
            data: callResult
          })
        });
        gasUsedForSuccess.push(Number(gasUsed));
      } catch (e) {
        results.push({
          success: false,
          returnData: callResult
        });
      }
    }
    return {
      blockNumber,
      results,
      approxGasUsedPerSuccessCall: stats__default.default.percentile(gasUsedForSuccess, 99),
      approxGasUsedPerFailCall: stats__default.default.percentile(gasUsedForFail, 99)
    };
  }
};
PancakeMulticallProvider.abi = InterfaceMulticall_default;
var DEFAULT_BATCH_RETRIES = 2;
var SUCCESS_RATE_CONFIG = constants.chains.reduce((acc, chain) => {
  return { ...acc, [chain.id]: 0.1 };
}, {});
constants.chains.reduce((acc, chain) => {
  return { ...acc, [chain.id]: 5 };
}, {});
var BlockConflictError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "BlockConflictError";
  }
};
var SuccessRateError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "SuccessRateError";
  }
};
var ProviderBlockHeaderError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ProviderBlockHeaderError";
  }
};
var ProviderTimeoutError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ProviderTimeoutError";
  }
};
var ProviderGasError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ProviderGasError";
  }
};
var retryControllerFactory = () => {
  const errors = [];
  return {
    shouldRetry: (error) => errors.every((err) => err.name !== error.name),
    onRetry: (error) => {
      errors.push(error);
    },
    getErrorsOnPreviousRetries: () => errors
  };
};
function onChainQuoteProviderFactory({ getQuoteFunctionName, getQuoterAddress, abi, getCallInputs }) {
  return function createOnChainQuoteProvider({
    onChainProvider,
    gasLimit,
    multicallConfigs: multicallConfigsOverride
  }) {
    const createGetRoutesWithQuotes = (isExactIn = true) => {
      const functionName = getQuoteFunctionName(isExactIn);
      const adjustQuoteForGas = (quote, gasCostInToken) => isExactIn ? quote.subtract(gasCostInToken) : quote.add(gasCostInToken);
      return async function getRoutesWithQuote(routes, { blockNumber: blockNumberFromConfig, gasModel }) {
        if (!routes.length) {
          return [];
        }
        const {
          amount: {
            currency: { chainId }
          }
        } = routes[0];
        const quoterAddress = getQuoterAddress(chainId);
        const minSuccessRate = SUCCESS_RATE_CONFIG[chainId];
        const multicallConfigs = multicallConfigsOverride?.[chainId] || chunkELMVPKZS_js.BATCH_MULTICALL_CONFIGS[chainId];
        const {
          defaultConfig: { gasLimitPerCall: defaultGasLimitPerCall, dropUnexecutedCalls }
        } = multicallConfigs;
        const chainProvider = onChainProvider({ chainId });
        const providerConfig = { blockNumber: blockNumberFromConfig };
        const multicall2Provider = new PancakeMulticallProvider(chainId, chainProvider, defaultGasLimitPerCall);
        const inputs = routes.map((route) => getCallInputs(route, isExactIn));
        const { shouldRetry, onRetry } = retryControllerFactory();
        async function getQuotes({ gasLimitPerCall }) {
          try {
            const { results, blockNumber, approxGasUsedPerSuccessCall } = await multicall2Provider.callSameFunctionOnContractWithMultipleParams({
              address: quoterAddress,
              abi,
              functionName,
              functionParams: inputs,
              providerConfig,
              additionalConfig: {
                dropUnexecutedCalls,
                gasLimitPerCall,
                gasLimit
              }
            });
            const successRateError = validateSuccessRate(results, minSuccessRate);
            if (successRateError) {
              throw successRateError;
            }
            return {
              results,
              blockNumber,
              approxGasUsedPerSuccessCall
            };
          } catch (err) {
            if (err instanceof SuccessRateError || err instanceof BlockConflictError) {
              throw err;
            }
            const slicedErrMsg = err.message.slice(0, 500);
            if (err.message.includes("header not found")) {
              throw new ProviderBlockHeaderError(slicedErrMsg);
            }
            if (err.message.includes("timeout")) {
              throw new ProviderTimeoutError(`Request had ${inputs.length} inputs. ${slicedErrMsg}`);
            }
            if (err.message.includes("out of gas")) {
              throw new ProviderGasError(slicedErrMsg);
            }
            throw new Error(`Unknown error from provider: ${slicedErrMsg}`);
          }
        }
        const quoteResult = await retry__default.default(
          async (bail) => {
            try {
              const quotes = await getQuotes({
                gasLimitPerCall: defaultGasLimitPerCall
              });
              return quotes;
            } catch (e) {
              const error = e instanceof Error ? e : new Error(`Unexpected error type ${e}`);
              if (!shouldRetry(error)) {
                return bail(error);
              }
              if (error instanceof SuccessRateError) {
                onRetry(error);
                const { successRateFailureOverrides } = multicallConfigs;
                return getQuotes({
                  gasLimitPerCall: successRateFailureOverrides.gasLimitPerCall
                });
              }
              if (error instanceof ProviderGasError) {
                onRetry(error);
                const { gasErrorFailureOverride } = multicallConfigs;
                return getQuotes({
                  gasLimitPerCall: gasErrorFailureOverride.gasLimitPerCall
                });
              }
              throw error;
            }
          },
          {
            retries: DEFAULT_BATCH_RETRIES,
            minTimeout: 25,
            maxTimeout: 250
          }
        );
        if (!quoteResult) {
          throw new Error(`Unexpected empty quote result ${quoteResult}`);
        }
        const { results: quoteResults } = quoteResult;
        const routesWithQuote = processQuoteResults(quoteResults, routes, gasModel, adjustQuoteForGas);
        return routesWithQuote;
      };
    };
    return {
      getRouteWithQuotesExactIn: createGetRoutesWithQuotes(true),
      getRouteWithQuotesExactOut: createGetRoutesWithQuotes(false)
    };
  };
}
function validateSuccessRate(allResults, quoteMinSuccessRate) {
  const numResults = allResults.length;
  const numSuccessResults = allResults.filter((result) => result.success).length;
  const successRate = 1 * numSuccessResults / numResults;
  if (successRate < quoteMinSuccessRate) {
    return new SuccessRateError(`Quote success rate below threshold of ${quoteMinSuccessRate}: ${successRate}`);
  }
  return void 0;
}
function processQuoteResults(quoteResults, routes, gasModel, adjustQuoteForGas) {
  const routesWithQuote = [];
  for (let i = 0; i < quoteResults.length; i += 1) {
    const route = routes[i];
    const quoteResult = quoteResults[i];
    if (!quoteResult) {
      continue;
    }
    const { success } = quoteResult;
    if (!success) {
      continue;
    }
    const quoteCurrency = getQuoteCurrency(route, route.amount.currency);
    const quote = sdk.CurrencyAmount.fromRawAmount(quoteCurrency.wrapped, quoteResult.result[0].toString());
    const { gasEstimate, gasCostInToken, gasCostInUSD } = gasModel.estimateGasCost(
      {
        ...route,
        quote
      },
      { initializedTickCrossedList: quoteResult.result[2] }
    );
    routesWithQuote.push({
      ...route,
      quote,
      quoteAdjustedForGas: adjustQuoteForGas(quote, gasCostInToken),
      // sqrtPriceX96AfterList: quoteResult.result[1],
      gasEstimate,
      gasCostInToken,
      gasCostInUSD
    });
  }
  return routesWithQuote;
}
var createMixedRouteOnChainQuoteProvider = onChainQuoteProviderFactory({
  getQuoterAddress: (chainId) => chunkELMVPKZS_js.MIXED_ROUTE_QUOTER_ADDRESSES[chainId],
  getQuoteFunctionName: () => "quoteExactInput",
  abi: mixedRouteQuoterV1ABI,
  getCallInputs: (route, isExactIn) => [
    encodeMixedRouteToPath(route, !isExactIn),
    route.pools.map((pool) => {
      if (isV3Pool(pool)) {
        return 0;
      }
      if (isV2Pool(pool)) {
        return 1;
      }
      if (isStablePool(pool)) {
        if (pool.balances.length === 2) {
          return 2;
        }
        if (pool.balances.length === 3) {
          return 3;
        }
      }
      return -1;
    }).filter((index) => index >= 0),
    `0x${route.amount.quotient.toString(16)}`
  ]
});
var createV3OnChainQuoteProvider = onChainQuoteProviderFactory({
  getQuoterAddress: (chainId) => chunkELMVPKZS_js.V3_QUOTER_ADDRESSES[chainId],
  getQuoteFunctionName: (isExactIn) => isExactIn ? "quoteExactInput" : "quoteExactOutput",
  abi: quoterV2ABI,
  getCallInputs: (route, isExactIn) => [
    encodeMixedRouteToPath(route, !isExactIn),
    `0x${route.amount.quotient.toString(16)}`
  ]
});

// evm/v3-router/providers/quoteProviders.ts
function createQuoteProvider(config) {
  const { onChainProvider, multicallConfigs, gasLimit } = config;
  const offChainQuoteProvider = createOffChainQuoteProvider();
  const mixedRouteOnChainQuoteProvider = createMixedRouteOnChainQuoteProvider({
    onChainProvider,
    multicallConfigs,
    gasLimit
  });
  const v3OnChainQuoteProvider = createV3OnChainQuoteProvider({ onChainProvider, multicallConfigs, gasLimit });
  const createGetRouteWithQuotes = (isExactIn = true) => {
    const getOffChainQuotes = isExactIn ? offChainQuoteProvider.getRouteWithQuotesExactIn : offChainQuoteProvider.getRouteWithQuotesExactOut;
    const getMixedRouteQuotes = isExactIn ? mixedRouteOnChainQuoteProvider.getRouteWithQuotesExactIn : mixedRouteOnChainQuoteProvider.getRouteWithQuotesExactOut;
    const getV3Quotes = isExactIn ? v3OnChainQuoteProvider.getRouteWithQuotesExactIn : v3OnChainQuoteProvider.getRouteWithQuotesExactOut;
    return async function getRoutesWithQuotes(routes, { blockNumber, gasModel }) {
      const v3Routes = [];
      const mixedRoutesHaveV3Pool = [];
      const routesCanQuoteOffChain = [];
      for (const route of routes) {
        if (route.type === 0 /* V2 */ || route.type === 2 /* STABLE */) {
          routesCanQuoteOffChain.push(route);
          continue;
        }
        if (route.type === 1 /* V3 */) {
          v3Routes.push(route);
          continue;
        }
        const { pools } = route;
        if (pools.some((pool) => isV3Pool(pool))) {
          mixedRoutesHaveV3Pool.push(route);
          continue;
        }
        routesCanQuoteOffChain.push(route);
      }
      const results = await Promise.allSettled([
        getOffChainQuotes(routesCanQuoteOffChain, { blockNumber, gasModel }),
        getMixedRouteQuotes(mixedRoutesHaveV3Pool, { blockNumber, gasModel }),
        getV3Quotes(v3Routes, { blockNumber, gasModel })
      ]);
      if (results.every((result) => result.status === "rejected")) {
        throw new Error(results.map((result) => result.reason).join(","));
      }
      return results.filter((result) => result.status === "fulfilled").reduce((acc, cur) => [...acc, ...cur.value], []);
    };
  };
  return {
    getRouteWithQuotesExactIn: createGetRouteWithQuotes(true),
    getRouteWithQuotesExactOut: createGetRouteWithQuotes(false),
    getConfig: () => config
  };
}

// evm/v3-router/schema.ts
var schema_exports = {};
chunkELMVPKZS_js.__export(schema_exports, {
  zPools: () => zPools,
  zRouterGetParams: () => zRouterGetParams,
  zRouterPostParams: () => zRouterPostParams
});
var zChainId = zod.z.nativeEnum(sdk.ChainId);
var zFee = zod.z.nativeEnum(v3Sdk.FeeAmount);
var zTradeType = zod.z.nativeEnum(sdk.TradeType);
var zPoolType = zod.z.nativeEnum(PoolType);
var zPoolTypes = zod.z.array(zPoolType);
var zAddress = zod.z.custom((val) => /^0x[a-fA-F0-9]{40}$/.test(val));
var zBigNumber = zod.z.string().regex(/^[0-9]+$/);
var zCurrency = zod.z.object({
  address: zAddress,
  decimals: zod.z.number(),
  symbol: zod.z.string()
}).required();
var zCurrencyAmount = zod.z.object({
  currency: zCurrency.required(),
  value: zBigNumber
}).required();
var zV2Pool = zod.z.object({
  type: zPoolType,
  reserve0: zCurrencyAmount,
  reserve1: zCurrencyAmount
}).required();
var zV3Pool = zod.z.object({
  type: zPoolType,
  token0: zCurrency,
  token1: zCurrency,
  fee: zFee,
  liquidity: zBigNumber,
  sqrtRatioX96: zBigNumber,
  tick: zod.z.number(),
  address: zAddress,
  token0ProtocolFee: zod.z.string(),
  token1ProtocolFee: zod.z.string()
}).required();
var zStablePool = zod.z.object({
  type: zPoolType,
  balances: zod.z.array(zCurrencyAmount),
  amplifier: zBigNumber,
  fee: zod.z.string()
}).required();
var zPools = zod.z.array(zod.z.union([zV2Pool, zV3Pool, zStablePool]));
var zRouterGetParams = zod.z.object({
  chainId: zChainId,
  tradeType: zTradeType,
  amount: zCurrencyAmount,
  currency: zCurrency,
  gasPriceWei: zBigNumber.optional(),
  maxHops: zod.z.number().optional(),
  maxSplits: zod.z.number().optional(),
  blockNumber: zBigNumber.optional(),
  poolTypes: zPoolTypes.optional()
}).required({
  chainId: true,
  tradeType: true,
  amount: true,
  currency: true,
  candidatePools: true
});
var zRouterPostParams = zod.z.object({
  chainId: zChainId,
  tradeType: zTradeType,
  amount: zCurrencyAmount,
  currency: zCurrency,
  candidatePools: zPools,
  gasPriceWei: zBigNumber.optional(),
  maxHops: zod.z.number().optional(),
  maxSplits: zod.z.number().optional(),
  blockNumber: zBigNumber.optional(),
  poolTypes: zPoolTypes.optional(),
  onChainQuoterGasLimit: zBigNumber.optional()
}).required({
  chainId: true,
  tradeType: true,
  amount: true,
  currency: true,
  candidatePools: true
});

// evm/abis/ISwapRouter02.ts
var swapRouter02Abi = [
  {
    inputs: [
      { internalType: "address", name: "_factoryV2", type: "address" },
      { internalType: "address", name: "_deployer", type: "address" },
      { internalType: "address", name: "_factoryV3", type: "address" },
      { internalType: "address", name: "_positionManager", type: "address" },
      { internalType: "address", name: "_stableFactory", type: "address" },
      { internalType: "address", name: "_stableInfo", type: "address" },
      { internalType: "address", name: "_WETH9", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "factory", type: "address" },
      { indexed: true, internalType: "address", name: "info", type: "address" }
    ],
    name: "SetStableSwap",
    type: "event"
  },
  {
    inputs: [],
    name: "WETH9",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveMax",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveMaxMinusOne",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveZeroThenMax",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveZeroThenMaxMinusOne",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "callPositionManager",
    outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes[]", name: "paths", type: "bytes[]" },
      { internalType: "uint128[]", name: "amounts", type: "uint128[]" },
      { internalType: "uint24", name: "maximumTickDivergence", type: "uint24" },
      { internalType: "uint32", name: "secondsAgo", type: "uint32" }
    ],
    name: "checkOracleSlippage",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes", name: "path", type: "bytes" },
      { internalType: "uint24", name: "maximumTickDivergence", type: "uint24" },
      { internalType: "uint32", name: "secondsAgo", type: "uint32" }
    ],
    name: "checkOracleSlippage",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "deployer",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes", name: "path", type: "bytes" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMinimum", type: "uint256" }
        ],
        internalType: "struct IV3SwapRouter.ExactInputParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactInput",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "pool", type: "address" },
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMinimum", type: "uint256" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" }
        ],
        internalType: "struct IV3SwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "uint256[]", name: "flag", type: "uint256[]" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" }
    ],
    name: "exactInputStableSwap",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes", name: "path", type: "bytes" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "amountInMaximum", type: "uint256" }
        ],
        internalType: "struct IV3SwapRouter.ExactOutputParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactOutput",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "pool", type: "address" },
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "amountInMaximum", type: "uint256" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" }
        ],
        internalType: "struct IV3SwapRouter.ExactOutputSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactOutputSingle",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "uint256[]", name: "flag", type: "uint256[]" },
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address", name: "to", type: "address" }
    ],
    name: "exactOutputStableSwap",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factoryV2",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "getApprovalType",
    outputs: [{ internalType: "enum IApproveAndCall.ApprovalType", name: "", type: "uint8" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "token0", type: "address" },
          { internalType: "address", name: "token1", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" }
        ],
        internalType: "struct IApproveAndCall.IncreaseLiquidityParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "increaseLiquidity",
    outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "token0", type: "address" },
          { internalType: "address", name: "token1", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "int24", name: "tickLower", type: "int24" },
          { internalType: "int24", name: "tickUpper", type: "int24" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "address", name: "recipient", type: "address" }
        ],
        internalType: "struct IApproveAndCall.MintParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "mint",
    outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "previousBlockhash", type: "bytes32" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" }
    ],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" }
    ],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "int256", name: "amount0Delta", type: "int256" },
      { internalType: "int256", name: "amount1Delta", type: "int256" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "pancakeV3SwapCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "positionManager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" }
    ],
    name: "pull",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  { inputs: [], name: "refundETH", outputs: [], stateMutability: "payable", type: "function" },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    name: "selfPermit",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    name: "selfPermitAllowed",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    name: "selfPermitAllowedIfNecessary",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    name: "selfPermitIfNecessary",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_factory", type: "address" },
      { internalType: "address", name: "_info", type: "address" }
    ],
    name: "setStableSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "stableSwapFactory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stableSwapInfo",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" }
    ],
    name: "swapExactTokensForTokens",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "pools", type: "address[]" },
      { internalType: "address", name: "tokenIn", type: "address" },
      { internalType: "address", name: "tokenOut", type: "address" },
      { internalType: "address", name: "to", type: "address" }
    ],
    name: "swapExactTokensForTokensExternal",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" }
    ],
    name: "swapTokensForExactTokens",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" }
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" }
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" }
    ],
    name: "sweepTokenWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" }
    ],
    name: "sweepTokenWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" }
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" }
    ],
    name: "unwrapWETH9WithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" }
    ],
    name: "unwrapWETH9WithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "wrapETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  { stateMutability: "payable", type: "receive" }
];

// evm/abis/IApproveAndCall.ts
var approveAndCallAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "approveMax",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "approveMaxMinusOne",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "approveZeroThenMax",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "approveZeroThenMaxMinusOne",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "callPositionManager",
    outputs: [
      {
        internalType: "bytes",
        name: "result",
        type: "bytes"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "getApprovalType",
    outputs: [
      {
        internalType: "enum IApproveAndCall.ApprovalType",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token0",
            type: "address"
          },
          {
            internalType: "address",
            name: "token1",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amount0Min",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amount1Min",
            type: "uint256"
          }
        ],
        internalType: "struct IApproveAndCall.IncreaseLiquidityParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "increaseLiquidity",
    outputs: [
      {
        internalType: "bytes",
        name: "result",
        type: "bytes"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token0",
            type: "address"
          },
          {
            internalType: "address",
            name: "token1",
            type: "address"
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24"
          },
          {
            internalType: "int24",
            name: "tickLower",
            type: "int24"
          },
          {
            internalType: "int24",
            name: "tickUpper",
            type: "int24"
          },
          {
            internalType: "uint256",
            name: "amount0Min",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amount1Min",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          }
        ],
        internalType: "struct IApproveAndCall.MintParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bytes",
        name: "result",
        type: "bytes"
      }
    ],
    stateMutability: "payable",
    type: "function"
  }
];

// evm/v3-router/utils/approveAndCall.ts
function isMint(options) {
  return Object.keys(options).some((k) => k === "recipient");
}
var _ApproveAndCall = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {
  }
  static encodeApproveMax(token) {
    return viem.encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "approveMax",
      args: [token.address]
    });
  }
  static encodeApproveMaxMinusOne(token) {
    return viem.encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "approveMaxMinusOne",
      args: [token.address]
    });
  }
  static encodeApproveZeroThenMax(token) {
    return viem.encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "approveZeroThenMax",
      args: [token.address]
    });
  }
  static encodeApproveZeroThenMaxMinusOne(token) {
    return viem.encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "approveZeroThenMaxMinusOne",
      args: [token.address]
    });
  }
  static encodeCallPositionManager(calldatas) {
    invariant5__default.default(calldatas.length > 0, "NULL_CALLDATA");
    if (calldatas.length === 1) {
      return viem.encodeFunctionData({
        abi: _ApproveAndCall.ABI,
        functionName: "callPositionManager",
        args: calldatas
      });
    }
    const encodedMulticall = viem.encodeFunctionData({
      abi: v3Sdk.NonfungiblePositionManager.ABI,
      functionName: "multicall",
      args: [calldatas]
    });
    return viem.encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "callPositionManager",
      args: [encodedMulticall]
    });
  }
  /**
   * Encode adding liquidity to a position in the nft manager contract
   * @param position Forcasted position with expected amount out from swap
   * @param minimalPosition Forcasted position with custom minimal token amounts
   * @param addLiquidityOptions Options for adding liquidity
   * @param slippageTolerance Defines maximum slippage
   */
  static encodeAddLiquidity(position, minimalPosition, addLiquidityOptions, slippageTolerance) {
    let { amount0: amount0Min, amount1: amount1Min } = position.mintAmountsWithSlippage(slippageTolerance);
    if (minimalPosition.amount0.quotient < amount0Min) {
      amount0Min = minimalPosition.amount0.quotient;
    }
    if (minimalPosition.amount1.quotient < amount1Min) {
      amount1Min = minimalPosition.amount1.quotient;
    }
    if (isMint(addLiquidityOptions)) {
      return viem.encodeFunctionData({
        abi: _ApproveAndCall.ABI,
        functionName: "mint",
        args: [
          {
            token0: position.pool.token0.address,
            token1: position.pool.token1.address,
            fee: position.pool.fee,
            tickLower: position.tickLower,
            tickUpper: position.tickUpper,
            amount0Min,
            amount1Min,
            recipient: addLiquidityOptions.recipient
          }
        ]
      });
    }
    return viem.encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "increaseLiquidity",
      args: [
        {
          token0: position.pool.token0.address,
          token1: position.pool.token1.address,
          amount0Min,
          amount1Min,
          tokenId: BigInt(addLiquidityOptions.tokenId)
        }
      ]
    });
  }
  static encodeApprove(token, approvalType) {
    switch (approvalType) {
      case 1 /* MAX */:
        return _ApproveAndCall.encodeApproveMax(token.wrapped);
      case 2 /* MAX_MINUS_ONE */:
        return _ApproveAndCall.encodeApproveMaxMinusOne(token.wrapped);
      case 3 /* ZERO_THEN_MAX */:
        return _ApproveAndCall.encodeApproveZeroThenMax(token.wrapped);
      case 4 /* ZERO_THEN_MAX_MINUS_ONE */:
        return _ApproveAndCall.encodeApproveZeroThenMaxMinusOne(token.wrapped);
      default:
        throw new Error("Error: invalid ApprovalType");
    }
  }
};
var ApproveAndCall = _ApproveAndCall;
ApproveAndCall.ABI = approveAndCallAbi;

// evm/abis/IMulticallExtended.ts
var multicallExtendedAbi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "previousBlockhash",
        type: "bytes32"
      },
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]"
      }
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]"
      }
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]"
      }
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  }
];

// evm/v3-router/utils/multicallExtended.ts
function validateAndParseBytes32(bytes32) {
  if (!bytes32.match(/^0x[0-9a-fA-F]{64}$/)) {
    throw new Error(`${bytes32} is not valid bytes32.`);
  }
  return bytes32.toLowerCase();
}
var _MulticallExtended = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {
  }
  static encodeMulticall(calldatas, validation) {
    if (typeof validation === "undefined") {
      return v3Sdk.Multicall.encodeMulticall(calldatas);
    }
    if (!Array.isArray(calldatas)) {
      calldatas = [calldatas];
    }
    if (typeof validation === "string" && validation.startsWith("0x")) {
      const previousBlockhash = validateAndParseBytes32(validation);
      return viem.encodeFunctionData({
        abi: _MulticallExtended.ABI,
        functionName: "multicall",
        args: [previousBlockhash, calldatas]
      });
    }
    const deadline = BigInt(validation);
    return viem.encodeFunctionData({
      abi: _MulticallExtended.ABI,
      functionName: "multicall",
      args: [deadline, calldatas]
    });
  }
};
var MulticallExtended = _MulticallExtended;
MulticallExtended.ABI = multicallExtendedAbi;

// evm/abis/IPeripheryPaymentsWithFeeExtended.ts
var peripheryPaymentsWithFeeExtendedAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "pull",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "refundETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      }
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      }
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "feeBips",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address"
      }
    ],
    name: "sweepTokenWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "feeBips",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address"
      }
    ],
    name: "sweepTokenWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      }
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      }
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "feeBips",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address"
      }
    ],
    name: "unwrapWETH9WithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "feeBips",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address"
      }
    ],
    name: "unwrapWETH9WithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "wrapETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];

// evm/v3-router/utils/paymentsExtended.ts
function encodeFeeBips(fee) {
  return fee.multiply(1e4).quotient;
}
var _PaymentsExtended = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {
  }
  static encodeUnwrapWETH9(amountMinimum, recipient, feeOptions) {
    if (typeof recipient === "string") {
      return v3Sdk.Payments.encodeUnwrapWETH9(amountMinimum, recipient, feeOptions);
    }
    if (!!feeOptions) {
      const feeBips = encodeFeeBips(feeOptions.fee);
      const feeRecipient = sdk.validateAndParseAddress(feeOptions.recipient);
      return viem.encodeFunctionData({
        abi: _PaymentsExtended.ABI,
        functionName: "unwrapWETH9WithFee",
        args: [amountMinimum, feeBips, feeRecipient]
      });
    }
    return viem.encodeFunctionData({
      abi: _PaymentsExtended.ABI,
      functionName: "unwrapWETH9",
      args: [amountMinimum]
    });
  }
  static encodeSweepToken(token, amountMinimum, recipient, feeOptions) {
    if (typeof recipient === "string") {
      return v3Sdk.Payments.encodeSweepToken(token, amountMinimum, recipient, feeOptions);
    }
    if (!!feeOptions) {
      const feeBips = encodeFeeBips(feeOptions.fee);
      const feeRecipient = sdk.validateAndParseAddress(feeOptions.recipient);
      return viem.encodeFunctionData({
        abi: _PaymentsExtended.ABI,
        functionName: "sweepTokenWithFee",
        args: [token.address, amountMinimum, feeBips, feeRecipient]
      });
    }
    return viem.encodeFunctionData({
      abi: _PaymentsExtended.ABI,
      functionName: "sweepToken",
      args: [token.address, amountMinimum]
    });
  }
  static encodePull(token, amount) {
    return viem.encodeFunctionData({ abi: _PaymentsExtended.ABI, functionName: "pull", args: [token.address, amount] });
  }
  static encodeWrapETH(amount) {
    return viem.encodeFunctionData({ abi: _PaymentsExtended.ABI, functionName: "wrapETH", args: [amount] });
  }
};
var PaymentsExtended = _PaymentsExtended;
PaymentsExtended.ABI = peripheryPaymentsWithFeeExtendedAbi;

// evm/v3-router/utils/partitionMixedRouteByProtocol.ts
var partitionMixedRouteByProtocol = (route) => {
  const acc = [];
  let left = 0;
  let right = 0;
  while (right < route.pools.length) {
    if (route.pools[left].type !== route.pools[right].type) {
      acc.push(route.pools.slice(left, right));
      left = right;
    }
    right++;
    if (right === route.pools.length) {
      acc.push(route.pools.slice(left, right));
    }
  }
  return acc;
};

// evm/v3-router/utils/getOutputOfPools.ts
var getOutputOfPools = (pools, firstInputToken) => {
  const { inputToken: outputToken } = pools.reduce(
    ({ inputToken }, pool) => {
      if (!involvesCurrency(pool, inputToken))
        throw new Error("PATH");
      const output = getOutputCurrency(pool, inputToken);
      return {
        inputToken: output
      };
    },
    { inputToken: firstInputToken }
  );
  return outputToken;
};
function getPriceImpact(trade) {
  let spotOutputAmount = sdk.CurrencyAmount.fromRawAmount(trade.outputAmount.currency.wrapped, 0);
  for (const route of trade.routes) {
    const { inputAmount } = route;
    const midPrice = getMidPrice(route);
    spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount.wrapped));
  }
  const priceImpact = spotOutputAmount.subtract(trade.outputAmount.wrapped).divide(spotOutputAmount);
  return new sdk.Percent(priceImpact.numerator, priceImpact.denominator);
}

// evm/v3-router/utils/swapRouter.ts
var ZERO8 = 0n;
var REFUND_ETH_PRICE_IMPACT_THRESHOLD = new sdk.Percent(50n, 100n);
var _SwapRouter = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {
  }
  /**
   * @notice Generates the calldata for a Swap with a V2 Route.
   * @param trade The V2Trade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  static encodeV2Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    const amountIn = maximumAmountIn(trade, options.slippageTolerance).quotient;
    const amountOut = minimumAmountOut(trade, options.slippageTolerance).quotient;
    const route = trade.routes[0];
    const path = route.path.map((token) => token.wrapped.address);
    const recipient = routerMustCustody ? chunkELMVPKZS_js.ADDRESS_THIS : typeof options.recipient === "undefined" ? chunkELMVPKZS_js.MSG_SENDER : sdk.validateAndParseAddress(options.recipient);
    if (trade.tradeType === sdk.TradeType.EXACT_INPUT) {
      const pools = route.pools.map((pool) => pool.address ? pool.address : sdk.Pair.getAddress(pool.reserve0.currency.wrapped, pool.reserve1.currency.wrapped));
      const exactInputParams = [
        amountIn,
        // amountIn
        performAggregatedSlippageCheck ? 0n : amountOut,
        // amountOutMin
        pools,
        // pools
        route.inputAmount.currency.wrapped.address,
        // tokenIn
        route.outputAmount.currency.wrapped.address,
        // tokenOut
        recipient
        // to
      ];
      return viem.encodeFunctionData({
        abi: _SwapRouter.ABI,
        functionName: "swapExactTokensForTokensExternal",
        args: exactInputParams
      });
    }
    const exactOutputParams = [amountOut, amountIn, path, recipient];
    return viem.encodeFunctionData({
      abi: _SwapRouter.ABI,
      functionName: "swapTokensForExactTokens",
      args: exactOutputParams
    });
  }
  /**
   * @notice Generates the calldata for a Swap with a Stable Route.
   * @param trade The Trade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  static encodeStableSwap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    const amountIn = maximumAmountIn(trade, options.slippageTolerance).quotient;
    const amountOut = minimumAmountOut(trade, options.slippageTolerance).quotient;
    if (trade.routes.length > 1 || trade.routes[0].pools.some((p) => !isStablePool(p))) {
      throw new Error("Unsupported trade to encode");
    }
    const route = trade.routes[0];
    const path = route.path.map((token) => token.wrapped.address);
    const flags = route.pools.map((p) => BigInt(p.balances.length));
    const recipient = routerMustCustody ? chunkELMVPKZS_js.ADDRESS_THIS : typeof options.recipient === "undefined" ? chunkELMVPKZS_js.MSG_SENDER : sdk.validateAndParseAddress(options.recipient);
    if (trade.tradeType === sdk.TradeType.EXACT_INPUT) {
      const exactInputParams = [
        path,
        flags,
        amountIn,
        performAggregatedSlippageCheck ? 0n : amountOut,
        recipient
      ];
      return viem.encodeFunctionData({
        abi: _SwapRouter.ABI,
        functionName: "exactInputStableSwap",
        args: exactInputParams
      });
    }
    const exactOutputParams = [path, flags, amountOut, amountIn, recipient];
    return viem.encodeFunctionData({
      abi: _SwapRouter.ABI,
      functionName: "exactOutputStableSwap",
      args: exactOutputParams
    });
  }
  /**
   * @notice Generates the calldata for a Swap with a V3 Route.
   * @param trade The V3Trade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  static encodeV3Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    const calldatas = [];
    for (const route of trade.routes) {
      const { inputAmount, outputAmount, pools, path } = route;
      const amountIn = maximumAmountIn(trade, options.slippageTolerance, inputAmount).quotient;
      const amountOut = minimumAmountOut(trade, options.slippageTolerance, outputAmount).quotient;
      const singleHop = pools.length === 1;
      const recipient = routerMustCustody ? chunkELMVPKZS_js.ADDRESS_THIS : typeof options.recipient === "undefined" ? chunkELMVPKZS_js.MSG_SENDER : sdk.validateAndParseAddress(options.recipient);
      if (singleHop) {
        if (trade.tradeType === sdk.TradeType.EXACT_INPUT) {
          const exactInputSingleParams = {
            pool: pools[0].address,
            tokenIn: path[0].wrapped.address,
            tokenOut: path[1].wrapped.address,
            recipient,
            amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0n : amountOut,
            sqrtPriceLimitX96: 0n
          };
          calldatas.push(
            viem.encodeFunctionData({
              abi: _SwapRouter.ABI,
              functionName: "exactInputSingle",
              args: [exactInputSingleParams]
            })
          );
        } else {
          const exactOutputSingleParams = {
            pool: pools[0].address,
            tokenIn: path[0].wrapped.address,
            tokenOut: path[1].wrapped.address,
            recipient,
            amountOut,
            amountInMaximum: amountIn,
            sqrtPriceLimitX96: 0n
          };
          calldatas.push(
            viem.encodeFunctionData({
              abi: _SwapRouter.ABI,
              functionName: "exactOutputSingle",
              args: [exactOutputSingleParams]
            })
          );
        }
      } else {
        const pathStr = encodeV3RouteToForeignPath(
          { ...route, input: inputAmount.currency, output: outputAmount.currency },
          trade.tradeType === sdk.TradeType.EXACT_OUTPUT
        );
        if (trade.tradeType === sdk.TradeType.EXACT_INPUT) {
          const exactInputParams = {
            path: pathStr,
            recipient,
            amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0n : amountOut
          };
          calldatas.push(
            viem.encodeFunctionData({
              abi: _SwapRouter.ABI,
              functionName: "exactInput",
              args: [exactInputParams]
            })
          );
        } else {
          const exactOutputParams = {
            path: pathStr,
            recipient,
            amountOut,
            amountInMaximum: amountIn
          };
          calldatas.push(
            viem.encodeFunctionData({
              abi: _SwapRouter.ABI,
              functionName: "exactOutput",
              args: [exactOutputParams]
            })
          );
        }
      }
    }
    return calldatas;
  }
  /**
   * @notice Generates the calldata for a MixedRouteSwap. Since single hop routes are not MixedRoutes, we will instead generate
   *         them via the existing encodeV3Swap and encodeV2Swap methods.
   * @param trade The MixedRouteTrade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  static encodeMixedRouteSwap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    let calldatas = [];
    const isExactIn = trade.tradeType === sdk.TradeType.EXACT_INPUT;
    for (const route of trade.routes) {
      const { inputAmount, outputAmount, pools } = route;
      const amountIn = maximumAmountIn(trade, options.slippageTolerance, inputAmount).quotient;
      const amountOut = minimumAmountOut(trade, options.slippageTolerance, outputAmount).quotient;
      const singleHop = pools.length === 1;
      const recipient = routerMustCustody ? chunkELMVPKZS_js.ADDRESS_THIS : typeof options.recipient === "undefined" ? chunkELMVPKZS_js.MSG_SENDER : sdk.validateAndParseAddress(options.recipient);
      const mixedRouteIsAllV3 = (r) => {
        return r.pools.every(isV3Pool);
      };
      const mixedRouteIsAllV2 = (r) => {
        return r.pools.every(isV2Pool);
      };
      const mixedRouteIsAllStable = (r) => {
        return r.pools.every(isStablePool);
      };
      if (singleHop) {
        if (mixedRouteIsAllV3(route)) {
          calldatas = [
            ...calldatas,
            ..._SwapRouter.encodeV3Swap(
              {
                ...trade,
                routes: [route],
                inputAmount,
                outputAmount
              },
              options,
              routerMustCustody,
              performAggregatedSlippageCheck
            )
          ];
        } else if (mixedRouteIsAllV2(route)) {
          calldatas = [
            ...calldatas,
            _SwapRouter.encodeV2Swap(
              {
                ...trade,
                routes: [route],
                inputAmount,
                outputAmount
              },
              options,
              routerMustCustody,
              performAggregatedSlippageCheck
            )
          ];
        } else if (mixedRouteIsAllStable(route)) {
          calldatas = [
            ...calldatas,
            _SwapRouter.encodeStableSwap(
              {
                ...trade,
                routes: [route],
                inputAmount,
                outputAmount
              },
              options,
              routerMustCustody,
              performAggregatedSlippageCheck
            )
          ];
        } else {
          throw new Error("Unsupported route to encode");
        }
      } else {
        const sections = partitionMixedRouteByProtocol(route);
        const isLastSectionInRoute = (i) => {
          return i === sections.length - 1;
        };
        let outputToken;
        let inputToken = inputAmount.currency.wrapped;
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          outputToken = getOutputOfPools(section, inputToken);
          const newRoute = buildBaseRoute([...section], inputToken, outputToken);
          inputToken = outputToken.wrapped;
          const lastSectionInRoute = isLastSectionInRoute(i);
          const recipientAddress = lastSectionInRoute ? recipient : chunkELMVPKZS_js.ADDRESS_THIS;
          const inAmount = i === 0 ? amountIn : 0n;
          const outAmount = !lastSectionInRoute ? 0n : amountOut;
          if (mixedRouteIsAllV3(newRoute)) {
            const pathStr = encodeV3RouteToForeignPath(newRoute, !isExactIn);
            if (isExactIn) {
              const exactInputParams = {
                path: pathStr,
                recipient: recipientAddress,
                amountIn: inAmount,
                amountOutMinimum: outAmount
              };
              calldatas.push(
                viem.encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "exactInput",
                  args: [exactInputParams]
                })
              );
            } else {
              const exactOutputParams = {
                path: pathStr,
                recipient,
                amountOut: outAmount,
                amountInMaximum: inAmount
              };
              calldatas.push(
                viem.encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "exactOutput",
                  args: [exactOutputParams]
                })
              );
            }
          } else if (mixedRouteIsAllV2(newRoute)) {
            if (isExactIn) {
              const pools2 = newRoute.pools.map((pool) => pool.address ? pool.address : sdk.Pair.getAddress(pool.reserve0.currency.wrapped, pool.reserve1.currency.wrapped));
              const exactInputParams = [
                inAmount,
                // amountIn
                outAmount,
                // amountOutMin
                pools2,
                // pools
                newRoute.input.wrapped.address,
                // tokenIn
                newRoute.output.wrapped.address,
                // tokenOut
                recipientAddress
                // to
              ];
              calldatas.push(
                viem.encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "swapExactTokensForTokensExternal",
                  args: exactInputParams
                })
              );
            } else {
              const path = newRoute.path.map((token) => token.wrapped.address);
              const exactOutputParams = [outAmount, inAmount, path, recipientAddress];
              calldatas.push(
                viem.encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "swapTokensForExactTokens",
                  args: exactOutputParams
                })
              );
            }
          } else if (mixedRouteIsAllStable(newRoute)) {
            const path = newRoute.path.map((token) => token.wrapped.address);
            const flags = newRoute.pools.map((pool) => BigInt(pool.balances.length));
            if (isExactIn) {
              const exactInputParams = [
                path,
                // path
                flags,
                // stable pool types
                inAmount,
                // amountIn
                outAmount,
                // amountOutMin
                recipientAddress
                // to
              ];
              calldatas.push(
                viem.encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "exactInputStableSwap",
                  args: exactInputParams
                })
              );
            } else {
              const exactOutputParams = [path, flags, outAmount, inAmount, recipientAddress];
              calldatas.push(
                viem.encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "exactOutputStableSwap",
                  args: exactOutputParams
                })
              );
            }
          } else {
            throw new Error("Unsupported route");
          }
        }
      }
    }
    return calldatas;
  }
  static encodeSwaps(anyTrade, options, isSwapAndAdd) {
    const trades = !Array.isArray(anyTrade) ? [anyTrade] : anyTrade;
    trades.reduce((numOfTrades, trade) => numOfTrades + trade.routes.length, 0);
    const sampleTrade = trades[0];
    invariant5__default.default(
      trades.every((trade) => trade.inputAmount.currency.equals(sampleTrade.inputAmount.currency)),
      "TOKEN_IN_DIFF"
    );
    invariant5__default.default(
      trades.every((trade) => trade.outputAmount.currency.equals(sampleTrade.outputAmount.currency)),
      "TOKEN_OUT_DIFF"
    );
    invariant5__default.default(
      trades.every((trade) => trade.tradeType === sampleTrade.tradeType),
      "TRADE_TYPE_DIFF"
    );
    const calldatas = [];
    const inputIsNative = sampleTrade.inputAmount.currency.isNative;
    const outputIsNative = sampleTrade.outputAmount.currency.isNative;
    const performAggregatedSlippageCheck = sampleTrade.tradeType === sdk.TradeType.EXACT_INPUT;
    const routerMustCustody = true;
    if (options.inputTokenPermit) {
      invariant5__default.default(sampleTrade.inputAmount.currency.isToken, "NON_TOKEN_PERMIT");
      calldatas.push(v3Sdk.SelfPermit.encodePermit(sampleTrade.inputAmount.currency, options.inputTokenPermit));
    }
    for (const trade of trades) {
      if (trade.routes.length === 1 && trade.routes[0].type === 0 /* V2 */) {
        calldatas.push(_SwapRouter.encodeV2Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck));
      } else if (trade.routes.every((r) => r.type === 1 /* V3 */)) {
        for (const calldata of _SwapRouter.encodeV3Swap(
          trade,
          options,
          routerMustCustody,
          performAggregatedSlippageCheck
        )) {
          calldatas.push(calldata);
        }
      } else {
        for (const calldata of _SwapRouter.encodeMixedRouteSwap(
          trade,
          options,
          routerMustCustody,
          performAggregatedSlippageCheck
        )) {
          calldatas.push(calldata);
        }
      }
    }
    const ZERO_IN = sdk.CurrencyAmount.fromRawAmount(sampleTrade.inputAmount.currency, 0);
    const ZERO_OUT = sdk.CurrencyAmount.fromRawAmount(sampleTrade.outputAmount.currency, 0);
    const minAmountOut = trades.reduce(
      (sum2, trade) => sum2.add(minimumAmountOut(trade, options.slippageTolerance)),
      ZERO_OUT
    );
    const quoteAmountOut = trades.reduce(
      (sum2, trade) => sum2.add(trade.outputAmount),
      ZERO_OUT
    );
    const totalAmountIn = trades.reduce(
      (sum2, trade) => sum2.add(maximumAmountIn(trade, options.slippageTolerance)),
      ZERO_IN
    );
    return {
      calldatas,
      sampleTrade,
      routerMustCustody,
      inputIsNative,
      outputIsNative,
      totalAmountIn,
      minimumAmountOut: minAmountOut,
      quoteAmountOut
    };
  }
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  static swapCallParameters(trades, options) {
    const {
      calldatas,
      sampleTrade,
      routerMustCustody,
      inputIsNative,
      outputIsNative,
      totalAmountIn,
      minimumAmountOut: minAmountOut
    } = _SwapRouter.encodeSwaps(trades, options);
    if (routerMustCustody) {
      if (outputIsNative) {
        calldatas.push(PaymentsExtended.encodeUnwrapWETH9(minAmountOut.quotient, options.recipient, options.fee));
      } else {
        calldatas.push(
          PaymentsExtended.encodeSweepToken(
            sampleTrade.outputAmount.currency.wrapped,
            minAmountOut.quotient,
            options.recipient,
            options.fee
          )
        );
      }
    }
    if (inputIsNative && (sampleTrade.tradeType === sdk.TradeType.EXACT_OUTPUT || _SwapRouter.riskOfPartialFill(trades))) {
      calldatas.push(v3Sdk.Payments.encodeRefundETH());
    }
    return {
      calldata: MulticallExtended.encodeMulticall(calldatas, options.deadlineOrPreviousBlockhash),
      value: v3Sdk.toHex(inputIsNative ? totalAmountIn.quotient : ZERO8)
    };
  }
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  static swapAndAddCallParameters(trades, options, position, addLiquidityOptions, tokenInApprovalType, tokenOutApprovalType) {
    const {
      calldatas,
      inputIsNative,
      outputIsNative,
      sampleTrade,
      totalAmountIn: totalAmountSwapped,
      quoteAmountOut,
      minimumAmountOut: minAmountOut
    } = _SwapRouter.encodeSwaps(trades, options, true);
    if (options.outputTokenPermit) {
      invariant5__default.default(quoteAmountOut.currency.isToken, "NON_TOKEN_PERMIT_OUTPUT");
      calldatas.push(v3Sdk.SelfPermit.encodePermit(quoteAmountOut.currency, options.outputTokenPermit));
    }
    const {
      inputAmount: {
        currency: { chainId }
      }
    } = sampleTrade;
    const zeroForOne = position.pool.token0.wrapped.address === totalAmountSwapped.currency.wrapped.address;
    const { positionAmountIn, positionAmountOut } = _SwapRouter.getPositionAmounts(position, zeroForOne);
    const tokenIn = inputIsNative ? sdk.WNATIVE[chainId] : positionAmountIn.currency.wrapped;
    const tokenOut = outputIsNative ? sdk.WNATIVE[chainId] : positionAmountOut.currency.wrapped;
    const amountOutRemaining = positionAmountOut.subtract(quoteAmountOut.wrapped);
    if (amountOutRemaining.greaterThan(sdk.CurrencyAmount.fromRawAmount(positionAmountOut.currency, 0))) {
      if (outputIsNative) {
        calldatas.push(PaymentsExtended.encodeWrapETH(amountOutRemaining.quotient));
      } else {
        calldatas.push(PaymentsExtended.encodePull(tokenOut, amountOutRemaining.quotient));
      }
    }
    if (inputIsNative) {
      calldatas.push(PaymentsExtended.encodeWrapETH(positionAmountIn.quotient));
    } else {
      calldatas.push(PaymentsExtended.encodePull(tokenIn, positionAmountIn.quotient));
    }
    if (tokenInApprovalType !== 0 /* NOT_REQUIRED */)
      calldatas.push(ApproveAndCall.encodeApprove(tokenIn, tokenInApprovalType));
    if (tokenOutApprovalType !== 0 /* NOT_REQUIRED */)
      calldatas.push(ApproveAndCall.encodeApprove(tokenOut, tokenOutApprovalType));
    const minimalPosition = v3Sdk.Position.fromAmounts({
      pool: position.pool,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper,
      amount0: zeroForOne ? position.amount0.quotient.toString() : minAmountOut.quotient.toString(),
      amount1: zeroForOne ? minAmountOut.quotient.toString() : position.amount1.quotient.toString(),
      useFullPrecision: false
    });
    calldatas.push(
      ApproveAndCall.encodeAddLiquidity(position, minimalPosition, addLiquidityOptions, options.slippageTolerance)
    );
    if (inputIsNative) {
      calldatas.push(PaymentsExtended.encodeUnwrapWETH9(ZERO8));
    } else {
      calldatas.push(PaymentsExtended.encodeSweepToken(tokenIn, ZERO8));
    }
    if (outputIsNative) {
      calldatas.push(PaymentsExtended.encodeUnwrapWETH9(ZERO8));
    } else {
      calldatas.push(PaymentsExtended.encodeSweepToken(tokenOut, ZERO8));
    }
    let value;
    if (inputIsNative) {
      value = totalAmountSwapped.wrapped.add(positionAmountIn.wrapped).quotient;
    } else if (outputIsNative) {
      value = amountOutRemaining.quotient;
    } else {
      value = ZERO8;
    }
    return {
      calldata: MulticallExtended.encodeMulticall(calldatas, options.deadlineOrPreviousBlockhash),
      value: v3Sdk.toHex(value.toString())
    };
  }
  // if price impact is very high, there's a chance of hitting max/min prices resulting in a partial fill of the swap
  static riskOfPartialFill(trades) {
    if (Array.isArray(trades)) {
      return trades.some((trade) => {
        return _SwapRouter.v3TradeWithHighPriceImpact(trade);
      });
    }
    return _SwapRouter.v3TradeWithHighPriceImpact(trades);
  }
  static v3TradeWithHighPriceImpact(trade) {
    return !(trade.routes.length === 1 && trade.routes[0].type === 0 /* V2 */) && getPriceImpact(trade).greaterThan(REFUND_ETH_PRICE_IMPACT_THRESHOLD);
  }
  static getPositionAmounts(position, zeroForOne) {
    const { amount0, amount1 } = position.mintAmounts;
    const currencyAmount0 = sdk.CurrencyAmount.fromRawAmount(position.pool.token0, amount0);
    const currencyAmount1 = sdk.CurrencyAmount.fromRawAmount(position.pool.token1, amount1);
    const [positionAmountIn, positionAmountOut] = zeroForOne ? [currencyAmount0, currencyAmount1] : [currencyAmount1, currencyAmount0];
    return { positionAmountIn, positionAmountOut };
  }
};
var SwapRouter = _SwapRouter;
SwapRouter.ABI = swapRouter02Abi;

Object.defineProperty(exports, 'ADDITIONAL_BASES', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.ADDITIONAL_BASES; }
});
Object.defineProperty(exports, 'ADDRESS_THIS', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.ADDRESS_THIS; }
});
Object.defineProperty(exports, 'BASES_TO_CHECK_TRADES_AGAINST', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.BASES_TO_CHECK_TRADES_AGAINST; }
});
Object.defineProperty(exports, 'BASE_SWAP_COST_STABLE_SWAP', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.BASE_SWAP_COST_STABLE_SWAP; }
});
Object.defineProperty(exports, 'BASE_SWAP_COST_V2', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.BASE_SWAP_COST_V2; }
});
Object.defineProperty(exports, 'BASE_SWAP_COST_V3', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.BASE_SWAP_COST_V3; }
});
Object.defineProperty(exports, 'BATCH_MULTICALL_CONFIGS', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.BATCH_MULTICALL_CONFIGS; }
});
Object.defineProperty(exports, 'BETTER_TRADE_LESS_HOPS_THRESHOLD', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.BETTER_TRADE_LESS_HOPS_THRESHOLD; }
});
Object.defineProperty(exports, 'BIG_INT_TEN', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.BIG_INT_TEN; }
});
Object.defineProperty(exports, 'BIPS_BASE', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.BIPS_BASE; }
});
Object.defineProperty(exports, 'CHAIN_ID_TO_CHAIN_NAME', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.CHAIN_ID_TO_CHAIN_NAME; }
});
Object.defineProperty(exports, 'COST_PER_EXTRA_HOP_STABLE_SWAP', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.COST_PER_EXTRA_HOP_STABLE_SWAP; }
});
Object.defineProperty(exports, 'COST_PER_EXTRA_HOP_V2', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.COST_PER_EXTRA_HOP_V2; }
});
Object.defineProperty(exports, 'COST_PER_HOP_V3', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.COST_PER_HOP_V3; }
});
Object.defineProperty(exports, 'COST_PER_INIT_TICK', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.COST_PER_INIT_TICK; }
});
Object.defineProperty(exports, 'COST_PER_UNINIT_TICK', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.COST_PER_UNINIT_TICK; }
});
Object.defineProperty(exports, 'CUSTOM_BASES', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.CUSTOM_BASES; }
});
Object.defineProperty(exports, 'MIN_BNB', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.MIN_BNB; }
});
Object.defineProperty(exports, 'MIXED_ROUTE_QUOTER_ADDRESSES', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.MIXED_ROUTE_QUOTER_ADDRESSES; }
});
Object.defineProperty(exports, 'MSG_SENDER', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.MSG_SENDER; }
});
Object.defineProperty(exports, 'SMART_ROUTER_ADDRESSES', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.SMART_ROUTER_ADDRESSES; }
});
Object.defineProperty(exports, 'STABLE_SWAP_INFO_ADDRESS', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.STABLE_SWAP_INFO_ADDRESS; }
});
Object.defineProperty(exports, 'V2_FEE_PATH_PLACEHOLDER', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.V2_FEE_PATH_PLACEHOLDER; }
});
Object.defineProperty(exports, 'V2_ROUTER_ADDRESS', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.V2_ROUTER_ADDRESS; }
});
Object.defineProperty(exports, 'V3_QUOTER_ADDRESSES', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.V3_QUOTER_ADDRESSES; }
});
Object.defineProperty(exports, 'getStableSwapPools', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.getStableSwapPools; }
});
Object.defineProperty(exports, 'isStableSwapSupported', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.isStableSwapSupported; }
});
Object.defineProperty(exports, 'nativeWrappedTokenByChain', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.nativeWrappedTokenByChain; }
});
Object.defineProperty(exports, 'usdGasTokensByChain', {
  enumerable: true,
  get: function () { return chunkELMVPKZS_js.usdGasTokensByChain; }
});
exports.PoolType = PoolType;
exports.RouteType = RouteType;
exports.SmartRouter = smartRouter_exports;
exports.StableSwap = stableSwap_exports;
exports.SwapRouter = SwapRouter;
exports.Transformer = transformer_exports;
