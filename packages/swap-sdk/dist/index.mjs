import { Percent, Token, BaseCurrency, Price, ZERO, InsufficientReservesError, _9975, _10000, CurrencyAmount, InsufficientInputAmountError, ONE, sqrt, MINIMUM_LIQUIDITY, TradeType, computePriceImpact, Fraction, sortedInsert, NativeCurrency, FIVE } from '@pancakeswap/swap-sdk-core';
export * from '@pancakeswap/swap-sdk-core';
import invariant5 from 'tiny-invariant';
import { getAddress, keccak256, encodePacked, getContract, toBytes, pad, isBytes, slice, concat, createPublicClient, http } from 'viem';
import warning from 'tiny-warning';
import { chains, ChainId, getChain } from '@icecreamswap/constants';
export { ChainId } from '@icecreamswap/constants';

// src/constants.ts
function validateAndParseAddress(address) {
  try {
    const checksummedAddress = getAddress(address);
    warning(address === checksummedAddress, `${address} is not checksummed.`);
    return checksummedAddress;
  } catch (error) {
    invariant5(false, `${address} is not a valid address.`);
  }
}

// src/entities/token.ts
var ERC20Token = class extends Token {
  constructor(chainId, address, decimals, symbol, name, projectLink) {
    super(chainId, validateAndParseAddress(address), decimals, symbol, name, projectLink);
  }
};
var OnRampCurrency = class extends BaseCurrency {
  constructor(chainId, address, decimals, symbol, name, projectLink) {
    super(chainId, decimals, symbol, name);
    this.address = address;
    this.projectLink = projectLink;
    this.isNative = address === "0x" && true;
    this.isToken = address !== "0x" && true;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  equals(other) {
    return other.isToken && this.chainId === other.chainId && this.address === other.address;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  sortsBefore(other) {
    if (!other.isToken)
      return false;
    invariant5(this.chainId === other.chainId, "CHAIN_IDS");
    invariant5(this.address !== other.address, "ADDRESSES");
    return this.address.toLowerCase() < other.address.toLowerCase();
  }
  /**
   * Return this token, which does not need to be wrapped
   */
  get wrapped() {
    return this;
  }
  get serialize() {
    return {
      address: this.address,
      chainId: this.chainId,
      decimals: this.decimals,
      symbol: this.symbol,
      name: this.name,
      projectLink: this.projectLink
    };
  }
};
var ZERO_PERCENT = new Percent("0");
var ONE_HUNDRED_PERCENT = new Percent("1");
var FACTORY_ADDRESS_MAP = chains.filter((chain) => chain.swap).reduce((acc, chain) => {
  const factoryAddresses = acc;
  if (chain.swap)
    factoryAddresses[chain.id] = chain.swap.factoryAddress;
  return factoryAddresses;
}, {});
var INIT_CODE_HASH_MAP = chains.filter((chain) => chain.swap).reduce((acc, chain) => {
  const initCodeHashes = acc;
  if (chain.swap)
    initCodeHashes[chain.id] = chain.swap.initCodeHash;
  return initCodeHashes;
}, {});
var WETH9 = chains.reduce((acc, chain) => {
  const weth9s = acc;
  if (chain.wrappedNative)
    weth9s[chain.id] = new ERC20Token(
      chain.id,
      chain.wrappedNative.address,
      18,
      chain.wrappedNative.symbol,
      chain.wrappedNative.name
    );
  return weth9s;
}, {});
var WNATIVE = WETH9;
var NATIVE = chains.reduce(
  (acc, chain) => {
    const natives = acc;
    if (chain.nativeCurrency)
      natives[chain.id] = {
        symbol: chain.nativeCurrency.symbol,
        decimals: chain.nativeCurrency.decimals,
        name: chain.nativeCurrency.name
      };
    return natives;
  },
  {}
);

// src/trade.ts
function isTradeBetter(tradeA, tradeB, minimumDelta = ZERO_PERCENT) {
  if (tradeA && !tradeB)
    return false;
  if (tradeB && !tradeA)
    return true;
  if (!tradeA || !tradeB)
    return void 0;
  if (tradeA.tradeType !== tradeB.tradeType || !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) || !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency)) {
    throw new Error("Trades are not comparable");
  }
  if (minimumDelta.equalTo(ZERO_PERCENT)) {
    return tradeA.executionPrice.lessThan(tradeB.executionPrice);
  }
  return tradeA.executionPrice.asFraction.multiply(minimumDelta.add(ONE_HUNDRED_PERCENT)).lessThan(tradeB.executionPrice);
}
var PAIR_ADDRESS_CACHE = {};
var composeKey = (token0, token1) => `${token0.chainId}-${token0.address}-${token1.address}`;
function getCreate2Address(from_, salt_, initCodeHash) {
  const from = toBytes(getAddress(from_));
  const salt = pad(isBytes(salt_) ? salt_ : toBytes(salt_), {
    size: 32
  });
  return getAddress(slice(keccak256(concat([toBytes("0xff"), from, salt, toBytes(initCodeHash)])), 12));
}
var computePairAddress = ({
  factoryAddress,
  tokenA,
  tokenB
}) => {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
  const key = composeKey(token0, token1);
  if (PAIR_ADDRESS_CACHE?.[key] === void 0) {
    PAIR_ADDRESS_CACHE = {
      ...PAIR_ADDRESS_CACHE,
      [key]: getCreate2Address(
        factoryAddress,
        keccak256(encodePacked(["address", "address"], [token0.address, token1.address])),
        INIT_CODE_HASH_MAP[token0.chainId]
      )
    };
  }
  return PAIR_ADDRESS_CACHE[key];
};
var Pair = class {
  static getAddress(tokenA, tokenB) {
    return computePairAddress({
      factoryAddress: FACTORY_ADDRESS_MAP[tokenA.chainId],
      tokenA,
      tokenB
    });
  }
  constructor(currencyAmountA, tokenAmountB) {
    const tokenAmounts = currencyAmountA.currency.sortsBefore(tokenAmountB.currency) ? [currencyAmountA, tokenAmountB] : [tokenAmountB, currencyAmountA];
    this.liquidityToken = new ERC20Token(
      tokenAmounts[0].currency.chainId,
      Pair.getAddress(tokenAmounts[0].currency, tokenAmounts[1].currency),
      18,
      "ICELP",
      "icecreamswap.com LP"
    );
    this.tokenAmounts = tokenAmounts;
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  get token0Price() {
    const result = this.tokenAmounts[1].divide(this.tokenAmounts[0]);
    return new Price(this.token0, this.token1, result.denominator, result.numerator);
  }
  /**
   * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
   */
  get token1Price() {
    const result = this.tokenAmounts[0].divide(this.tokenAmounts[1]);
    return new Price(this.token1, this.token0, result.denominator, result.numerator);
  }
  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  priceOf(token) {
    invariant5(this.involvesToken(token), "TOKEN");
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pair.
   */
  get chainId() {
    return this.token0.chainId;
  }
  get token0() {
    return this.tokenAmounts[0].currency;
  }
  get token1() {
    return this.tokenAmounts[1].currency;
  }
  get reserve0() {
    return this.tokenAmounts[0];
  }
  get reserve1() {
    return this.tokenAmounts[1];
  }
  reserveOf(token) {
    invariant5(this.involvesToken(token), "TOKEN");
    return token.equals(this.token0) ? this.reserve0 : this.reserve1;
  }
  getOutputAmount(inputAmount) {
    invariant5(this.involvesToken(inputAmount.currency), "TOKEN");
    if (this.reserve0.quotient === ZERO || this.reserve1.quotient === ZERO) {
      throw new InsufficientReservesError();
    }
    const inputReserve = this.reserveOf(inputAmount.currency);
    const outputReserve = this.reserveOf(inputAmount.currency.equals(this.token0) ? this.token1 : this.token0);
    const inputAmountWithFee = inputAmount.quotient * _9975;
    const numerator = inputAmountWithFee * outputReserve.quotient;
    const denominator = inputReserve.quotient * _10000 + inputAmountWithFee;
    const outputAmount = CurrencyAmount.fromRawAmount(
      inputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
      numerator / denominator
    );
    if (outputAmount.quotient === ZERO) {
      throw new InsufficientInputAmountError();
    }
    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  }
  getInputAmount(outputAmount) {
    invariant5(this.involvesToken(outputAmount.currency), "TOKEN");
    if (this.reserve0.quotient === ZERO || this.reserve1.quotient === ZERO || outputAmount.quotient >= this.reserveOf(outputAmount.currency).quotient) {
      throw new InsufficientReservesError();
    }
    const outputReserve = this.reserveOf(outputAmount.currency);
    const inputReserve = this.reserveOf(outputAmount.currency.equals(this.token0) ? this.token1 : this.token0);
    const numerator = inputReserve.quotient * outputAmount.quotient * _10000;
    const denominator = (outputReserve.quotient - outputAmount.quotient) * _9975;
    const inputAmount = CurrencyAmount.fromRawAmount(
      outputAmount.currency.equals(this.token0) ? this.token1 : this.token0,
      numerator / denominator + ONE
    );
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  }
  getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB) {
    invariant5(totalSupply.currency.equals(this.liquidityToken), "LIQUIDITY");
    const tokenAmounts = tokenAmountA.currency.sortsBefore(tokenAmountB.currency) ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    invariant5(tokenAmounts[0].currency.equals(this.token0) && tokenAmounts[1].currency.equals(this.token1), "TOKEN");
    let liquidity;
    if (totalSupply.quotient === ZERO) {
      liquidity = sqrt(tokenAmounts[0].quotient * tokenAmounts[1].quotient) - MINIMUM_LIQUIDITY;
    } else {
      const amount0 = tokenAmounts[0].quotient * totalSupply.quotient / this.reserve0.quotient;
      const amount1 = tokenAmounts[1].quotient * totalSupply.quotient / this.reserve1.quotient;
      liquidity = amount0 <= amount1 ? amount0 : amount1;
    }
    if (!(liquidity > ZERO)) {
      throw new InsufficientInputAmountError();
    }
    return CurrencyAmount.fromRawAmount(this.liquidityToken, liquidity);
  }
  getLiquidityValue(token, totalSupply, liquidity, feeOn = false, kLast) {
    invariant5(this.involvesToken(token), "TOKEN");
    invariant5(totalSupply.currency.equals(this.liquidityToken), "TOTAL_SUPPLY");
    invariant5(liquidity.currency.equals(this.liquidityToken), "LIQUIDITY");
    invariant5(liquidity.quotient <= totalSupply.quotient, "LIQUIDITY");
    let totalSupplyAdjusted;
    if (!feeOn) {
      totalSupplyAdjusted = totalSupply;
    } else {
      invariant5(!!kLast, "K_LAST");
      const kLastParsed = BigInt(kLast);
      if (!(kLastParsed === ZERO)) {
        const rootK = sqrt(this.reserve0.quotient * this.reserve1.quotient);
        const rootKLast = sqrt(kLastParsed);
        if (rootK > rootKLast) {
          const numerator = totalSupply.quotient * (rootK - rootKLast);
          const denominator = rootK * FIVE + rootKLast;
          const feeLiquidity = numerator / denominator;
          totalSupplyAdjusted = totalSupply.add(CurrencyAmount.fromRawAmount(this.liquidityToken, feeLiquidity));
        } else {
          totalSupplyAdjusted = totalSupply;
        }
      } else {
        totalSupplyAdjusted = totalSupply;
      }
    }
    return CurrencyAmount.fromRawAmount(
      token,
      liquidity.quotient * this.reserveOf(token).quotient / totalSupplyAdjusted.quotient
    );
  }
};
var Route = class {
  constructor(pairs, input, output) {
    this._midPrice = null;
    invariant5(pairs.length > 0, "PAIRS");
    const { chainId } = pairs[0];
    invariant5(
      pairs.every((pair) => pair.chainId === chainId),
      "CHAIN_IDS"
    );
    const wrappedInput = input.wrapped;
    invariant5(pairs[0].involvesToken(wrappedInput), "INPUT");
    invariant5(typeof output === "undefined" || pairs[pairs.length - 1].involvesToken(output.wrapped), "OUTPUT");
    const path = [wrappedInput];
    for (const [i, pair] of pairs.entries()) {
      const currentInput = path[i];
      invariant5(currentInput.equals(pair.token0) || currentInput.equals(pair.token1), "PATH");
      const output2 = currentInput.equals(pair.token0) ? pair.token1 : pair.token0;
      path.push(output2);
    }
    this.pairs = pairs;
    this.path = path;
    this.input = input;
    this.output = output;
  }
  get midPrice() {
    if (this._midPrice !== null)
      return this._midPrice;
    const prices = [];
    for (const [i, pair] of this.pairs.entries()) {
      prices.push(
        this.path[i].equals(pair.token0) ? new Price(pair.reserve0.currency, pair.reserve1.currency, pair.reserve0.quotient, pair.reserve1.quotient) : new Price(pair.reserve1.currency, pair.reserve0.currency, pair.reserve1.quotient, pair.reserve0.quotient)
      );
    }
    const reduced = prices.slice(1).reduce((accumulator, currentValue) => accumulator.multiply(currentValue), prices[0]);
    return this._midPrice = new Price(this.input, this.output, reduced.denominator, reduced.numerator);
  }
  get chainId() {
    return this.pairs[0].chainId;
  }
};
function inputOutputComparator(a, b) {
  invariant5(a.inputAmount.currency.equals(b.inputAmount.currency), "INPUT_CURRENCY");
  invariant5(a.outputAmount.currency.equals(b.outputAmount.currency), "OUTPUT_CURRENCY");
  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      return 0;
    }
    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    }
    return 1;
  }
  if (a.outputAmount.lessThan(b.outputAmount)) {
    return 1;
  }
  return -1;
}
function tradeComparator(a, b) {
  const ioComp = inputOutputComparator(a, b);
  if (ioComp !== 0) {
    return ioComp;
  }
  if (a.priceImpact.lessThan(b.priceImpact)) {
    return -1;
  }
  if (a.priceImpact.greaterThan(b.priceImpact)) {
    return 1;
  }
  return a.route.path.length - b.route.path.length;
}
var Trade = class {
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  static exactIn(route, amountIn) {
    return new Trade(route, amountIn, TradeType.EXACT_INPUT);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route route of the exact out trade
   * @param amountOut the amount returned by the trade
   */
  static exactOut(route, amountOut) {
    return new Trade(route, amountOut, TradeType.EXACT_OUTPUT);
  }
  constructor(route, amount, tradeType) {
    this.route = route;
    this.tradeType = tradeType;
    const tokenAmounts = new Array(route.path.length);
    if (tradeType === TradeType.EXACT_INPUT) {
      invariant5(amount.currency.equals(route.input), "INPUT");
      tokenAmounts[0] = amount.wrapped;
      for (let i = 0; i < route.path.length - 1; i++) {
        const pair = route.pairs[i];
        const [outputAmount] = pair.getOutputAmount(tokenAmounts[i]);
        tokenAmounts[i + 1] = outputAmount;
      }
      this.inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
      this.outputAmount = CurrencyAmount.fromFractionalAmount(
        route.output,
        tokenAmounts[tokenAmounts.length - 1].numerator,
        tokenAmounts[tokenAmounts.length - 1].denominator
      );
    } else {
      invariant5(amount.currency.equals(route.output), "OUTPUT");
      tokenAmounts[tokenAmounts.length - 1] = amount.wrapped;
      for (let i = route.path.length - 1; i > 0; i--) {
        const pair = route.pairs[i - 1];
        const [inputAmount] = pair.getInputAmount(tokenAmounts[i]);
        tokenAmounts[i - 1] = inputAmount;
      }
      this.inputAmount = CurrencyAmount.fromFractionalAmount(
        route.input,
        tokenAmounts[0].numerator,
        tokenAmounts[0].denominator
      );
      this.outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);
    }
    this.executionPrice = new Price(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.inputAmount.quotient,
      this.outputAmount.quotient
    );
    this.priceImpact = computePriceImpact(route.midPrice, this.inputAmount, this.outputAmount);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  minimumAmountOut(slippageTolerance) {
    invariant5(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE");
    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return this.outputAmount;
    }
    const slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(this.outputAmount.quotient).quotient;
    return CurrencyAmount.fromRawAmount(this.outputAmount.currency, slippageAdjustedAmountOut);
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  maximumAmountIn(slippageTolerance) {
    invariant5(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE");
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return this.inputAmount;
    }
    const slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(this.inputAmount.quotient).quotient;
    return CurrencyAmount.fromRawAmount(this.inputAmount.currency, slippageAdjustedAmountIn);
  }
  /**
   * Given a list of pairs, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  static bestTradeExactIn(pairs, currencyAmountIn, currencyOut, { maxNumResults = 3, maxHops = 3 } = {}, currentPairs = [], nextAmountIn = currencyAmountIn, bestTrades = []) {
    invariant5(pairs.length > 0, "PAIRS");
    invariant5(maxHops > 0, "MAX_HOPS");
    invariant5(currencyAmountIn === nextAmountIn || currentPairs.length > 0, "INVALID_RECURSION");
    const amountIn = nextAmountIn.wrapped;
    const tokenOut = currencyOut.wrapped;
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      if (!pair.token0.equals(amountIn.currency) && !pair.token1.equals(amountIn.currency))
        continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO))
        continue;
      let amountOut;
      try {
        ;
        [amountOut] = pair.getOutputAmount(amountIn);
      } catch (error) {
        if (error.isInsufficientInputAmountError) {
          continue;
        }
        throw error;
      }
      if (amountOut.currency.equals(tokenOut)) {
        sortedInsert(
          bestTrades,
          new Trade(
            new Route([...currentPairs, pair], currencyAmountIn.currency, currencyOut),
            currencyAmountIn,
            TradeType.EXACT_INPUT
          ),
          maxNumResults,
          tradeComparator
        );
      } else if (maxHops > 1 && pairs.length > 1) {
        const pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length));
        Trade.bestTradeExactIn(
          pairsExcludingThisPair,
          currencyAmountIn,
          currencyOut,
          {
            maxNumResults,
            maxHops: maxHops - 1
          },
          [...currentPairs, pair],
          amountOut,
          bestTrades
        );
      }
    }
    return bestTrades;
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   */
  worstExecutionPrice(slippageTolerance) {
    return new Price(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.maximumAmountIn(slippageTolerance).quotient,
      this.minimumAmountOut(slippageTolerance).quotient
    );
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pairs, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param nextAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param currencyAmountOut used in recursion; the original value of the currencyAmountOut parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  static bestTradeExactOut(pairs, currencyIn, currencyAmountOut, { maxNumResults = 3, maxHops = 3 } = {}, currentPairs = [], nextAmountOut = currencyAmountOut, bestTrades = []) {
    invariant5(pairs.length > 0, "PAIRS");
    invariant5(maxHops > 0, "MAX_HOPS");
    invariant5(currencyAmountOut === nextAmountOut || currentPairs.length > 0, "INVALID_RECURSION");
    const amountOut = nextAmountOut.wrapped;
    const tokenIn = currencyIn.wrapped;
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];
      if (!pair.token0.equals(amountOut.currency) && !pair.token1.equals(amountOut.currency))
        continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO))
        continue;
      let amountIn;
      try {
        ;
        [amountIn] = pair.getInputAmount(amountOut);
      } catch (error) {
        if (error.isInsufficientReservesError) {
          continue;
        }
        throw error;
      }
      if (amountIn.currency.equals(tokenIn)) {
        sortedInsert(
          bestTrades,
          new Trade(
            new Route([pair, ...currentPairs], currencyIn, currencyAmountOut.currency),
            currencyAmountOut,
            TradeType.EXACT_OUTPUT
          ),
          maxNumResults,
          tradeComparator
        );
      } else if (maxHops > 1 && pairs.length > 1) {
        const pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length));
        Trade.bestTradeExactOut(
          pairsExcludingThisPair,
          currencyIn,
          currencyAmountOut,
          {
            maxNumResults,
            maxHops: maxHops - 1
          },
          [pair, ...currentPairs],
          amountIn,
          bestTrades
        );
      }
    }
    return bestTrades;
  }
};
var _Native = class extends NativeCurrency {
  constructor({
    chainId,
    decimals,
    name,
    symbol
  }) {
    super(chainId, decimals, symbol, name);
  }
  get wrapped() {
    const wnative = WNATIVE[this.chainId];
    invariant5(!!wnative, "WRAPPED");
    return wnative;
  }
  static onChain(chainId) {
    if (chainId in this.cache) {
      return this.cache[chainId];
    }
    invariant5(!!NATIVE[chainId], "NATIVE_CURRENCY");
    const { decimals, name, symbol } = NATIVE[chainId];
    return this.cache[chainId] = new _Native({ chainId, decimals, symbol, name });
  }
  equals(other) {
    return other.isNative && other.chainId === this.chainId;
  }
};
var Native = _Native;
Native.cache = {};
function toHex(currencyAmount) {
  return `0x${currencyAmount.quotient.toString(16)}`;
}
var ZERO_HEX = "0x0";
var Router = class {
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  static swapCallParameters(trade, options) {
    const etherIn = trade.inputAmount.currency.isNative;
    const etherOut = trade.outputAmount.currency.isNative;
    invariant5(!(etherIn && etherOut), "ETHER_IN_OUT");
    invariant5(!("ttl" in options) || options.ttl > 0, "TTL");
    const to = validateAndParseAddress(options.recipient);
    const amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage));
    const amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage));
    const path = trade.route.path.map((token) => token.address);
    const deadline = "ttl" in options ? `0x${(Math.floor(( new Date()).getTime() / 1e3) + options.ttl).toString(16)}` : `0x${options.deadline.toString(16)}`;
    const useFeeOnTransfer = Boolean(options.feeOnTransfer);
    let methodName;
    let args;
    let value;
    switch (trade.tradeType) {
      case TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer ? "swapExactETHForTokensSupportingFeeOnTransferTokens" : "swapExactETHForTokens";
          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = useFeeOnTransfer ? "swapExactTokensForETHSupportingFeeOnTransferTokens" : "swapExactTokensForETH";
          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = useFeeOnTransfer ? "swapExactTokensForTokensSupportingFeeOnTransferTokens" : "swapExactTokensForTokens";
          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        }
        break;
      case TradeType.EXACT_OUTPUT:
        invariant5(!useFeeOnTransfer, "EXACT_OUT_FOT");
        if (etherIn) {
          methodName = "swapETHForExactTokens";
          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = "swapTokensForExactETH";
          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = "swapTokensForExactTokens";
          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        }
        break;
    }
    return {
      methodName,
      args,
      value
    };
  }
};
var _Ether = class extends NativeCurrency {
  constructor(chainId) {
    super(chainId, 18, "ETH", "Ether");
  }
  get wrapped() {
    const weth9 = WETH9[this.chainId];
    invariant5(!!weth9, "WRAPPED");
    return weth9;
  }
  static onChain(chainId) {
    if (!this._etherCache[chainId]) {
      this._etherCache[chainId] = new _Ether(chainId);
    }
    return this._etherCache[chainId];
  }
  equals(other) {
    return other.isNative && other.chainId === this.chainId;
  }
};
var Ether = _Ether;
Ether._etherCache = {};

// src/abis/ERC20.ts
var erc20ABI = [
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

// src/abis/IPancakePair.ts
var pancakePairV2ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "Burn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256"
      }
    ],
    name: "Mint",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "Swap",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve0",
        type: "uint112"
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve1",
        type: "uint112"
      }
    ],
    name: "Sync",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "pure",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    payable: false,
    stateMutability: "pure",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "burn",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    payable: false,
    stateMutability: "pure",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      {
        internalType: "uint112",
        name: "reserve0",
        type: "uint112"
      },
      {
        internalType: "uint112",
        name: "reserve1",
        type: "uint112"
      },
      {
        internalType: "uint32",
        name: "blockTimestampLast",
        type: "uint32"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "kLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "pure",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "skim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "swap",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "pure",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "sync",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "token0",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "token1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/fetcher.ts
var TOKEN_DECIMALS_CACHE = {
  [ChainId.BSC]: {}
};
var getDefaultClient = (chainId) => {
  return createPublicClient({ chain: getChain(chainId), transport: http() });
};
var Fetcher = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  constructor() {
  }
  /**
   * Fetch information for a given token on the given chain, using the given viem provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol symbol of the token
   * @param name optional name of the token
   */
  static async fetchTokenData(chainId, address, publicClient = getDefaultClient(chainId), symbol, name) {
    const erc20 = getContract({
      abi: erc20ABI,
      address,
      publicClient
    });
    const parsedDecimals = typeof TOKEN_DECIMALS_CACHE?.[chainId]?.[address] === "number" ? TOKEN_DECIMALS_CACHE[chainId][address] : await erc20.read.decimals().then((decimals) => {
      TOKEN_DECIMALS_CACHE = {
        ...TOKEN_DECIMALS_CACHE,
        [chainId]: {
          ...TOKEN_DECIMALS_CACHE?.[chainId],
          [address]: decimals
        }
      };
      return decimals;
    });
    return new Token(chainId, address, parsedDecimals, symbol, name);
  }
  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  static async fetchPairData(tokenA, tokenB, publicClient = getDefaultClient(tokenA.chainId)) {
    invariant5(tokenA.chainId === tokenB.chainId, "CHAIN_ID");
    const address = Pair.getAddress(tokenA, tokenB);
    const pairContract = getContract({
      abi: pancakePairV2ABI,
      address,
      publicClient
    });
    const [reserves0, reserves1] = await pairContract.read.getReserves();
    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
    return new Pair(
      CurrencyAmount.fromRawAmount(tokenA, balances[0]),
      CurrencyAmount.fromRawAmount(tokenB, balances[1])
    );
  }
};

export { ERC20Token, Ether, FACTORY_ADDRESS_MAP, Fetcher, INIT_CODE_HASH_MAP, NATIVE, Native, ONE_HUNDRED_PERCENT, OnRampCurrency, Pair, Route, Router, Trade, WETH9, WNATIVE, ZERO_PERCENT, computePairAddress, inputOutputComparator, isTradeBetter, pancakePairV2ABI, tradeComparator, validateAndParseAddress };
