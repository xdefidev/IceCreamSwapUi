import { ChainId, Price, CurrencyAmount, Percent as Percent$1, MaxUint256 as MaxUint256$1, TradeType, Fraction, sortedInsert, validateAndParseAddress, ZERO as ZERO$2, ONE as ONE$1 } from '@pancakeswap/sdk';
import invariant9 from 'tiny-invariant';
import { Percent, MaxUint256, sqrt, Price as Price$1, CurrencyAmount as CurrencyAmount$1, Fraction as Fraction$1, ZERO as ZERO$1, TradeType as TradeType$1 } from '@pancakeswap/swap-sdk-core';
import { keccak256, encodeAbiParameters, parseAbiParameters, encodePacked, encodeFunctionData, toBytes, getAddress, pad, isBytes, slice, concat } from 'viem';

// src/entities/pool.ts
var FACTORY_ADDRESSES = {};
var DEPLOYER_ADDRESSES = {
  [ChainId.CORE]: "0xF9f83b79ca3A623da98ad431A52Aa42eD0f3d5Ef"
};
var ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
var POOL_INIT_CODE_HASH = "0x0c6b99bf88dc3398a8573e3192de0eb19c858afd9ac36e33030e16c4f569e598";
var POOL_INIT_CODE_HASHES = {
  [ChainId.CORE]: POOL_INIT_CODE_HASH
};
var FeeAmount = /* @__PURE__ */ ((FeeAmount4) => {
  FeeAmount4[FeeAmount4["LOWEST"] = 1e3] = "LOWEST";
  FeeAmount4[FeeAmount4["LOW"] = 3e3] = "LOW";
  FeeAmount4[FeeAmount4["MEDIUM"] = 1e4] = "MEDIUM";
  FeeAmount4[FeeAmount4["HIGH"] = 5e4] = "HIGH";
  return FeeAmount4;
})(FeeAmount || {});
var TICK_SPACINGS = {
  [1e3 /* LOWEST */]: 20,
  [3e3 /* LOW */]: 60,
  [1e4 /* MEDIUM */]: 200,
  [5e4 /* HIGH */]: 1e3
};
var NEGATIVE_ONE = BigInt(-1);
var ZERO = 0n;
var ONE = 1n;
var Q96 = 2n ** 96n;
var Q192 = Q96 ** 2n;
var MAX_FEE = 10n ** 6n;
var ONE_HUNDRED_PERCENT = new Percent("1");
var ZERO_PERCENT = new Percent("0");
var Q128 = 2n ** 128n;
function getCreate2Address(from_, salt_, initCodeHash) {
  const from = toBytes(getAddress(from_));
  const salt = pad(isBytes(salt_) ? salt_ : toBytes(salt_), {
    size: 32
  });
  return getAddress(slice(keccak256(concat([toBytes("0xff"), from, salt, toBytes(initCodeHash)])), 12));
}
function computePoolAddress({
  deployerAddress,
  tokenA,
  tokenB,
  fee,
  initCodeHashManualOverride
}) {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
  const salt = keccak256(
    encodeAbiParameters(parseAbiParameters(["address, address, uint24"]), [token0.address, token1.address, fee])
  );
  return getCreate2Address(
    deployerAddress,
    salt,
    initCodeHashManualOverride ?? POOL_INIT_CODE_HASHES[token0.chainId]
  );
}

// src/utils/liquidityMath.ts
var LiquidityMath = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static addDelta(x, y) {
    if (y < ZERO) {
      return x - y * NEGATIVE_ONE;
    }
    return x + y;
  }
};

// src/utils/fullMath.ts
var FullMath = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static mulDivRoundingUp(a, b, denominator) {
    const product = a * b;
    let result = product / denominator;
    if (product % denominator !== ZERO)
      result = result + ONE;
    return result;
  }
};
var MaxUint160 = 2n ** 160n - ONE;
function multiplyIn256(x, y) {
  const product = x * y;
  return product & MaxUint256;
}
function addIn256(x, y) {
  const sum = x + y;
  return sum & MaxUint256;
}
var SqrtPriceMath = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static getAmount0Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp) {
    if (sqrtRatioAX96 > sqrtRatioBX96) {
      sqrtRatioAX96 = sqrtRatioBX96;
      sqrtRatioBX96 = sqrtRatioAX96;
    }
    const numerator1 = liquidity << 96n;
    const numerator2 = sqrtRatioBX96 - sqrtRatioAX96;
    return roundUp ? FullMath.mulDivRoundingUp(FullMath.mulDivRoundingUp(numerator1, numerator2, sqrtRatioBX96), ONE, sqrtRatioAX96) : numerator1 * numerator2 / sqrtRatioBX96 / sqrtRatioAX96;
  }
  static getAmount1Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp) {
    if (sqrtRatioAX96 > sqrtRatioBX96) {
      sqrtRatioAX96 = sqrtRatioBX96;
      sqrtRatioBX96 = sqrtRatioAX96;
    }
    return roundUp ? FullMath.mulDivRoundingUp(liquidity, sqrtRatioBX96 - sqrtRatioAX96, Q96) : liquidity * (sqrtRatioBX96 - sqrtRatioAX96) / Q96;
  }
  static getNextSqrtPriceFromInput(sqrtPX96, liquidity, amountIn, zeroForOne) {
    invariant9(sqrtPX96 > ZERO);
    invariant9(liquidity > ZERO);
    return zeroForOne ? this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amountIn, true) : this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amountIn, true);
  }
  static getNextSqrtPriceFromOutput(sqrtPX96, liquidity, amountOut, zeroForOne) {
    invariant9(sqrtPX96 > ZERO);
    invariant9(liquidity > ZERO);
    return zeroForOne ? this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amountOut, false) : this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amountOut, false);
  }
  static getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amount, add) {
    if (amount === ZERO)
      return sqrtPX96;
    const numerator1 = liquidity << 96n;
    if (add) {
      const product2 = multiplyIn256(amount, sqrtPX96);
      if (product2 / amount === sqrtPX96) {
        const denominator2 = addIn256(numerator1, product2);
        if (denominator2 >= numerator1) {
          return FullMath.mulDivRoundingUp(numerator1, sqrtPX96, denominator2);
        }
      }
      return FullMath.mulDivRoundingUp(numerator1, ONE, numerator1 / sqrtPX96 + amount);
    }
    const product = multiplyIn256(amount, sqrtPX96);
    invariant9(product / amount === sqrtPX96);
    invariant9(numerator1 > product);
    const denominator = numerator1 - product;
    return FullMath.mulDivRoundingUp(numerator1, sqrtPX96, denominator);
  }
  static getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amount, add) {
    if (add) {
      const quotient2 = amount <= MaxUint160 ? (amount << 96n) / liquidity : amount * Q96 / liquidity;
      return sqrtPX96 + quotient2;
    }
    const quotient = FullMath.mulDivRoundingUp(amount, Q96, liquidity);
    invariant9(sqrtPX96 > quotient);
    return sqrtPX96 - quotient;
  }
};

// src/utils/swapMath.ts
var SwapMath = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static computeSwapStep(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, amountRemaining, feePips) {
    const returnValues = {};
    const zeroForOne = sqrtRatioCurrentX96 >= sqrtRatioTargetX96;
    const exactIn = amountRemaining >= ZERO;
    if (exactIn) {
      const amountRemainingLessFee = amountRemaining * (MAX_FEE - BigInt(feePips)) / MAX_FEE;
      returnValues.amountIn = zeroForOne ? SqrtPriceMath.getAmount0Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, true) : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, true);
      if (amountRemainingLessFee >= returnValues.amountIn) {
        returnValues.sqrtRatioNextX96 = sqrtRatioTargetX96;
      } else {
        returnValues.sqrtRatioNextX96 = SqrtPriceMath.getNextSqrtPriceFromInput(
          sqrtRatioCurrentX96,
          liquidity,
          amountRemainingLessFee,
          zeroForOne
        );
      }
    } else {
      returnValues.amountOut = zeroForOne ? SqrtPriceMath.getAmount1Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, false) : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, false);
      if (amountRemaining * NEGATIVE_ONE >= returnValues.amountOut) {
        returnValues.sqrtRatioNextX96 = sqrtRatioTargetX96;
      } else {
        returnValues.sqrtRatioNextX96 = SqrtPriceMath.getNextSqrtPriceFromOutput(
          sqrtRatioCurrentX96,
          liquidity,
          amountRemaining * NEGATIVE_ONE,
          zeroForOne
        );
      }
    }
    const max = sqrtRatioTargetX96 === returnValues.sqrtRatioNextX96;
    if (zeroForOne) {
      returnValues.amountIn = max && exactIn ? returnValues.amountIn : SqrtPriceMath.getAmount0Delta(returnValues.sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, true);
      returnValues.amountOut = max && !exactIn ? returnValues.amountOut : SqrtPriceMath.getAmount1Delta(returnValues.sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, false);
    } else {
      returnValues.amountIn = max && exactIn ? returnValues.amountIn : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, returnValues.sqrtRatioNextX96, liquidity, true);
      returnValues.amountOut = max && !exactIn ? returnValues.amountOut : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, returnValues.sqrtRatioNextX96, liquidity, false);
    }
    if (!exactIn && returnValues.amountOut > amountRemaining * NEGATIVE_ONE) {
      returnValues.amountOut = amountRemaining * NEGATIVE_ONE;
    }
    if (exactIn && returnValues.sqrtRatioNextX96 !== sqrtRatioTargetX96) {
      returnValues.feeAmount = amountRemaining - returnValues.amountIn;
    } else {
      returnValues.feeAmount = FullMath.mulDivRoundingUp(
        returnValues.amountIn,
        BigInt(feePips),
        MAX_FEE - BigInt(feePips)
      );
    }
    return [returnValues.sqrtRatioNextX96, returnValues.amountIn, returnValues.amountOut, returnValues.feeAmount];
  }
};
var TWO = 2n;
var POWERS_OF_2 = [128, 64, 32, 16, 8, 4, 2, 1].map((pow) => [pow, TWO ** BigInt(pow)]);
function mostSignificantBit(x) {
  invariant9(x > ZERO, "ZERO");
  invariant9(x <= MaxUint256, "MAX");
  let msb = 0;
  for (const [power, min] of POWERS_OF_2) {
    if (x >= min) {
      x = x >> BigInt(power);
      msb += power;
    }
  }
  return msb;
}

// src/utils/tickMath.ts
function mulShift(val, mulBy) {
  return val * BigInt(mulBy) >> 128n;
}
var Q32 = 2n ** 32n;
var _TickMath = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  /**
   * Returns the sqrt ratio as a Q64.96 for the given tick. The sqrt ratio is computed as sqrt(1.0001)^tick
   * @param tick the tick for which to compute the sqrt ratio
   */
  static getSqrtRatioAtTick(tick) {
    invariant9(tick >= _TickMath.MIN_TICK && tick <= _TickMath.MAX_TICK && Number.isInteger(tick), "TICK");
    const absTick = tick < 0 ? tick * -1 : tick;
    let ratio = (absTick & 1) != 0 ? BigInt("0xfffcb933bd6fad37aa2d162d1a594001") : BigInt("0x100000000000000000000000000000000");
    if ((absTick & 2) != 0)
      ratio = mulShift(ratio, "0xfff97272373d413259a46990580e213a");
    if ((absTick & 4) != 0)
      ratio = mulShift(ratio, "0xfff2e50f5f656932ef12357cf3c7fdcc");
    if ((absTick & 8) != 0)
      ratio = mulShift(ratio, "0xffe5caca7e10e4e61c3624eaa0941cd0");
    if ((absTick & 16) != 0)
      ratio = mulShift(ratio, "0xffcb9843d60f6159c9db58835c926644");
    if ((absTick & 32) != 0)
      ratio = mulShift(ratio, "0xff973b41fa98c081472e6896dfb254c0");
    if ((absTick & 64) != 0)
      ratio = mulShift(ratio, "0xff2ea16466c96a3843ec78b326b52861");
    if ((absTick & 128) != 0)
      ratio = mulShift(ratio, "0xfe5dee046a99a2a811c461f1969c3053");
    if ((absTick & 256) != 0)
      ratio = mulShift(ratio, "0xfcbe86c7900a88aedcffc83b479aa3a4");
    if ((absTick & 512) != 0)
      ratio = mulShift(ratio, "0xf987a7253ac413176f2b074cf7815e54");
    if ((absTick & 1024) != 0)
      ratio = mulShift(ratio, "0xf3392b0822b70005940c7a398e4b70f3");
    if ((absTick & 2048) != 0)
      ratio = mulShift(ratio, "0xe7159475a2c29b7443b29c7fa6e889d9");
    if ((absTick & 4096) != 0)
      ratio = mulShift(ratio, "0xd097f3bdfd2022b8845ad8f792aa5825");
    if ((absTick & 8192) != 0)
      ratio = mulShift(ratio, "0xa9f746462d870fdf8a65dc1f90e061e5");
    if ((absTick & 16384) != 0)
      ratio = mulShift(ratio, "0x70d869a156d2a1b890bb3df62baf32f7");
    if ((absTick & 32768) != 0)
      ratio = mulShift(ratio, "0x31be135f97d08fd981231505542fcfa6");
    if ((absTick & 65536) != 0)
      ratio = mulShift(ratio, "0x9aa508b5b7a84e1c677de54f3e99bc9");
    if ((absTick & 131072) != 0)
      ratio = mulShift(ratio, "0x5d6af8dedb81196699c329225ee604");
    if ((absTick & 262144) != 0)
      ratio = mulShift(ratio, "0x2216e584f5fa1ea926041bedfe98");
    if ((absTick & 524288) != 0)
      ratio = mulShift(ratio, "0x48a170391f7dc42444e8fa2");
    if (tick > 0)
      ratio = MaxUint256 / ratio;
    return ratio % Q32 > ZERO ? ratio / Q32 + ONE : ratio / Q32;
  }
  /**
   * Returns the tick corresponding to a given sqrt ratio, s.t. #getSqrtRatioAtTick(tick) <= sqrtRatioX96
   * and #getSqrtRatioAtTick(tick + 1) > sqrtRatioX96
   * @param sqrtRatioX96 the sqrt ratio as a Q64.96 for which to compute the tick
   */
  static getTickAtSqrtRatio(sqrtRatioX96) {
    invariant9(sqrtRatioX96 >= _TickMath.MIN_SQRT_RATIO && sqrtRatioX96 < _TickMath.MAX_SQRT_RATIO, "SQRT_RATIO");
    const sqrtRatioX128 = sqrtRatioX96 << 32n;
    const msb = mostSignificantBit(sqrtRatioX128);
    let r;
    if (BigInt(msb) >= 128n) {
      r = sqrtRatioX128 >> BigInt(msb - 127);
    } else {
      r = sqrtRatioX128 << BigInt(127 - msb);
    }
    let log_2 = BigInt(msb) - 128n << 64n;
    for (let i = 0; i < 14; i++) {
      r = r * r >> 127n;
      const f = r >> 128n;
      log_2 = log_2 | f << BigInt(63 - i);
      r = r >> f;
    }
    const log_sqrt10001 = log_2 * 255738958999603826347141n;
    const tickLow = Number(log_sqrt10001 - 3402992956809132418596140100660247210n >> 128n);
    const tickHigh = Number(log_sqrt10001 + 291339464771989622907027621153398088495n >> 128n);
    return tickLow === tickHigh ? tickLow : _TickMath.getSqrtRatioAtTick(tickHigh) <= sqrtRatioX96 ? tickHigh : tickLow;
  }
};
var TickMath = _TickMath;
/**
 * The minimum tick that can be used on any pool.
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
TickMath.MIN_TICK = -887272;
/**
 * The maximum tick that can be used on any pool.
 */
TickMath.MAX_TICK = -_TickMath.MIN_TICK;
/**
 * The sqrt ratio corresponding to the minimum tick that could be used on any pool.
 */
TickMath.MIN_SQRT_RATIO = 4295128739n;
/**
 * The sqrt ratio corresponding to the maximum tick that could be used on any pool.
 */
TickMath.MAX_SQRT_RATIO = 1461446703485210103287273052203988822378723970342n;

// src/entities/tickDataProvider.ts
var _NoTickDataProvider = class {
  async getTick(_tick) {
    throw new Error(_NoTickDataProvider.ERROR_MESSAGE);
  }
  async nextInitializedTickWithinOneWord(_tick, _lte, _tickSpacing) {
    throw new Error(_NoTickDataProvider.ERROR_MESSAGE);
  }
};
var NoTickDataProvider = _NoTickDataProvider;
NoTickDataProvider.ERROR_MESSAGE = "No tick data provider was given";

// src/utils/isSorted.ts
function isSorted(list, comparator) {
  for (let i = 0; i < list.length - 1; i++) {
    if (comparator(list[i], list[i + 1]) > 0) {
      return false;
    }
  }
  return true;
}

// src/utils/tickList.ts
function tickComparator(a, b) {
  return a.index - b.index;
}
var TickList = class {
  /**
   * Cannot be constructed
   */
  constructor() {
  }
  static validateList(ticks, tickSpacing) {
    invariant9(tickSpacing > 0, "TICK_SPACING_NONZERO");
    invariant9(
      ticks.every(({ index }) => index % tickSpacing === 0),
      "TICK_SPACING"
    );
    invariant9(ticks.reduce((accumulator, { liquidityNet }) => accumulator + liquidityNet, ZERO) === ZERO, "ZERO_NET");
    invariant9(isSorted(ticks, tickComparator), "SORTED");
  }
  static isBelowSmallest(ticks, tick) {
    invariant9(ticks.length > 0, "LENGTH");
    return tick < ticks[0].index;
  }
  static isAtOrAboveLargest(ticks, tick) {
    invariant9(ticks.length > 0, "LENGTH");
    return tick >= ticks[ticks.length - 1].index;
  }
  static getTick(ticks, index) {
    const tick = ticks[this.binarySearch(ticks, index)];
    invariant9(tick.index === index, "NOT_CONTAINED");
    return tick;
  }
  /**
   * Finds the largest tick in the list of ticks that is less than or equal to tick
   * @param ticks list of ticks
   * @param tick tick to find the largest tick that is less than or equal to tick
   * @private
   */
  static binarySearch(ticks, tick) {
    invariant9(!this.isBelowSmallest(ticks, tick), "BELOW_SMALLEST");
    let l = 0;
    let r = ticks.length - 1;
    let i;
    while (true) {
      i = Math.floor((l + r) / 2);
      if (ticks[i].index <= tick && (i === ticks.length - 1 || ticks[i + 1].index > tick)) {
        return i;
      }
      if (ticks[i].index < tick) {
        l = i + 1;
      } else {
        r = i - 1;
      }
    }
  }
  static nextInitializedTick(ticks, tick, lte) {
    if (lte) {
      invariant9(!TickList.isBelowSmallest(ticks, tick), "BELOW_SMALLEST");
      if (TickList.isAtOrAboveLargest(ticks, tick)) {
        return ticks[ticks.length - 1];
      }
      const index2 = this.binarySearch(ticks, tick);
      return ticks[index2];
    }
    invariant9(!this.isAtOrAboveLargest(ticks, tick), "AT_OR_ABOVE_LARGEST");
    if (this.isBelowSmallest(ticks, tick)) {
      return ticks[0];
    }
    const index = this.binarySearch(ticks, tick);
    return ticks[index + 1];
  }
  static nextInitializedTickWithinOneWord(ticks, tick, lte, tickSpacing) {
    const compressed = Math.floor(tick / tickSpacing);
    if (lte) {
      const wordPos2 = compressed >> 8;
      const minimum = (wordPos2 << 8) * tickSpacing;
      if (TickList.isBelowSmallest(ticks, tick)) {
        return [minimum, false];
      }
      const { index: index2 } = TickList.nextInitializedTick(ticks, tick, lte);
      const nextInitializedTick2 = Math.max(minimum, index2);
      return [nextInitializedTick2, nextInitializedTick2 === index2];
    }
    const wordPos = compressed + 1 >> 8;
    const maximum = ((wordPos + 1 << 8) - 1) * tickSpacing;
    if (this.isAtOrAboveLargest(ticks, tick)) {
      return [maximum, false];
    }
    const { index } = this.nextInitializedTick(ticks, tick, lte);
    const nextInitializedTick = Math.min(maximum, index);
    return [nextInitializedTick, nextInitializedTick === index];
  }
  static countInitializedTicksCrossed(ticks, tickBefore, tickAfter) {
    if (tickBefore === tickAfter) {
      return 0;
    }
    const beforeIndex = this.binarySearch(ticks, tickBefore);
    const afterIndex = this.binarySearch(ticks, tickAfter);
    return Math.abs(beforeIndex - afterIndex);
  }
};
var Tick = class {
  constructor({ index, liquidityGross, liquidityNet }) {
    invariant9(index >= TickMath.MIN_TICK && index <= TickMath.MAX_TICK, "TICK");
    this.index = index;
    this.liquidityGross = BigInt(liquidityGross);
    this.liquidityNet = BigInt(liquidityNet);
  }
};

// src/entities/tickListDataProvider.ts
var TickListDataProvider = class {
  constructor(ticks) {
    const ticksMapped = ticks.map((t) => t instanceof Tick ? t : new Tick(t));
    this.ticks = ticksMapped;
  }
  async getTick(tick) {
    return TickList.getTick(this.ticks, tick);
  }
  async nextInitializedTickWithinOneWord(tick, lte, tickSpacing) {
    return TickList.nextInitializedTickWithinOneWord(this.ticks, tick, lte, tickSpacing);
  }
};

// src/entities/pool.ts
var NO_TICK_DATA_PROVIDER_DEFAULT = new NoTickDataProvider();
var Pool = class {
  static getAddress(tokenA, tokenB, fee, initCodeHashManualOverride, deployerAddressOverride) {
    return computePoolAddress({
      deployerAddress: deployerAddressOverride ?? DEPLOYER_ADDRESSES[tokenA.chainId],
      fee,
      tokenA,
      tokenB,
      initCodeHashManualOverride
    });
  }
  /**
   * Construct a pool
   * @param tokenA One of the tokens in the pool
   * @param tokenB The other token in the pool
   * @param fee The fee in hundredths of a bips of the input amount of every swap that is collected by the pool
   * @param sqrtRatioX96 The sqrt of the current ratio of amounts of token1 to token0
   * @param liquidity The current value of in range liquidity
   * @param tickCurrent The current tick of the pool
   * @param ticks The current state of the pool ticks or a data provider that can return tick data
   */
  constructor(tokenA, tokenB, fee, sqrtRatioX96, liquidity, tickCurrent, ticks = NO_TICK_DATA_PROVIDER_DEFAULT) {
    invariant9(Number.isInteger(fee) && fee < 1e6, "FEE");
    [this.token0, this.token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
    this.fee = fee;
    this.sqrtRatioX96 = BigInt(sqrtRatioX96);
    this.liquidity = BigInt(liquidity);
    this.tickCurrent = tickCurrent;
    this.tickDataProvider = Array.isArray(ticks) ? new TickListDataProvider(ticks) : ticks;
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token The token to check
   * @returns True if token is either token0 or token
   */
  involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pool in terms of token0, i.e. the ratio of token1 over token0
   */
  get token0Price() {
    return this._token0Price ?? (this._token0Price = new Price(this.token0, this.token1, Q192, this.sqrtRatioX96 * this.sqrtRatioX96));
  }
  /**
   * Returns the current mid price of the pool in terms of token1, i.e. the ratio of token0 over token1
   */
  get token1Price() {
    return this._token1Price ?? (this._token1Price = new Price(this.token1, this.token0, this.sqrtRatioX96 * this.sqrtRatioX96, Q192));
  }
  /**
   * Return the price of the given token in terms of the other token in the pool.
   * @param token The token to return price of
   * @returns The price of the given token, in terms of the other.
   */
  priceOf(token) {
    invariant9(this.involvesToken(token), "TOKEN");
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pool.
   */
  get chainId() {
    return this.token0.chainId;
  }
  /**
   * Given an input amount of a token, return the computed output amount, and a pool with state updated after the trade
   * @param inputAmount The input amount for which to quote the output amount
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit
   * @returns The output amount and the pool with updated state
   */
  async getOutputAmount(inputAmount, sqrtPriceLimitX96) {
    invariant9(this.involvesToken(inputAmount.currency), "TOKEN");
    const zeroForOne = inputAmount.currency.equals(this.token0);
    const {
      amountCalculated: outputAmount,
      sqrtRatioX96,
      liquidity,
      tickCurrent
    } = await this.swap(zeroForOne, inputAmount.quotient, sqrtPriceLimitX96);
    const outputToken = zeroForOne ? this.token1 : this.token0;
    return [
      CurrencyAmount.fromRawAmount(outputToken, outputAmount * NEGATIVE_ONE),
      new Pool(this.token0, this.token1, this.fee, sqrtRatioX96, liquidity, tickCurrent, this.tickDataProvider)
    ];
  }
  /**
   * Given a desired output amount of a token, return the computed input amount and a pool with state updated after the trade
   * @param outputAmount the output amount for which to quote the input amount
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns The input amount and the pool with updated state
   */
  async getInputAmount(outputAmount, sqrtPriceLimitX96) {
    invariant9(outputAmount.currency.isToken && this.involvesToken(outputAmount.currency), "TOKEN");
    const zeroForOne = outputAmount.currency.equals(this.token1);
    const {
      amountSpecifiedRemaining,
      amountCalculated: inputAmount,
      sqrtRatioX96,
      liquidity,
      tickCurrent
    } = await this.swap(zeroForOne, outputAmount.quotient * NEGATIVE_ONE, sqrtPriceLimitX96);
    invariant9(amountSpecifiedRemaining === ZERO, "INSUFICIENT_LIQUIDITY");
    const inputToken = zeroForOne ? this.token0 : this.token1;
    return [
      CurrencyAmount.fromRawAmount(inputToken, inputAmount),
      new Pool(this.token0, this.token1, this.fee, sqrtRatioX96, liquidity, tickCurrent, this.tickDataProvider)
    ];
  }
  /**
   * Executes a swap
   * @param zeroForOne Whether the amount in is token0 or token1
   * @param amountSpecified The amount of the swap, which implicitly configures the swap as exact input (positive), or exact output (negative)
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns amountCalculated
   * @returns sqrtRatioX96
   * @returns liquidity
   * @returns tickCurrent
   */
  async swap(zeroForOne, amountSpecified, sqrtPriceLimitX96) {
    if (!sqrtPriceLimitX96)
      sqrtPriceLimitX96 = zeroForOne ? TickMath.MIN_SQRT_RATIO + ONE : TickMath.MAX_SQRT_RATIO - ONE;
    if (zeroForOne) {
      invariant9(sqrtPriceLimitX96 > TickMath.MIN_SQRT_RATIO, "RATIO_MIN");
      invariant9(sqrtPriceLimitX96 < this.sqrtRatioX96, "RATIO_CURRENT");
    } else {
      invariant9(sqrtPriceLimitX96 < TickMath.MAX_SQRT_RATIO, "RATIO_MAX");
      invariant9(sqrtPriceLimitX96 > this.sqrtRatioX96, "RATIO_CURRENT");
    }
    const exactInput = amountSpecified >= ZERO;
    const state = {
      amountSpecifiedRemaining: amountSpecified,
      amountCalculated: ZERO,
      sqrtPriceX96: this.sqrtRatioX96,
      tick: this.tickCurrent,
      liquidity: this.liquidity
    };
    while (state.amountSpecifiedRemaining !== ZERO && state.sqrtPriceX96 != sqrtPriceLimitX96) {
      const step = {};
      step.sqrtPriceStartX96 = state.sqrtPriceX96;
      [step.tickNext, step.initialized] = await this.tickDataProvider.nextInitializedTickWithinOneWord(
        state.tick,
        zeroForOne,
        this.tickSpacing
      );
      if (step.tickNext < TickMath.MIN_TICK) {
        step.tickNext = TickMath.MIN_TICK;
      } else if (step.tickNext > TickMath.MAX_TICK) {
        step.tickNext = TickMath.MAX_TICK;
      }
      step.sqrtPriceNextX96 = TickMath.getSqrtRatioAtTick(step.tickNext);
      [state.sqrtPriceX96, step.amountIn, step.amountOut, step.feeAmount] = SwapMath.computeSwapStep(
        state.sqrtPriceX96,
        (zeroForOne ? step.sqrtPriceNextX96 < sqrtPriceLimitX96 : step.sqrtPriceNextX96 > sqrtPriceLimitX96) ? sqrtPriceLimitX96 : step.sqrtPriceNextX96,
        state.liquidity,
        state.amountSpecifiedRemaining,
        this.fee
      );
      if (exactInput) {
        state.amountSpecifiedRemaining = state.amountSpecifiedRemaining - (step.amountIn + step.feeAmount);
        state.amountCalculated = state.amountCalculated - step.amountOut;
      } else {
        state.amountSpecifiedRemaining = state.amountSpecifiedRemaining + step.amountOut;
        state.amountCalculated = state.amountCalculated + (step.amountIn + step.feeAmount);
      }
      if (state.sqrtPriceX96 === step.sqrtPriceNextX96) {
        if (step.initialized) {
          let liquidityNet = BigInt((await this.tickDataProvider.getTick(step.tickNext)).liquidityNet);
          if (zeroForOne)
            liquidityNet = liquidityNet * NEGATIVE_ONE;
          state.liquidity = LiquidityMath.addDelta(state.liquidity, liquidityNet);
        }
        state.tick = zeroForOne ? step.tickNext - 1 : step.tickNext;
      } else if (state.sqrtPriceX96 !== step.sqrtPriceStartX96) {
        state.tick = TickMath.getTickAtSqrtRatio(state.sqrtPriceX96);
      }
    }
    return {
      amountSpecifiedRemaining: state.amountSpecifiedRemaining,
      amountCalculated: state.amountCalculated,
      sqrtRatioX96: state.sqrtPriceX96,
      liquidity: state.liquidity,
      tickCurrent: state.tick
    };
  }
  get tickSpacing() {
    return TICK_SPACINGS[this.fee];
  }
};

// src/utils/maxLiquidityForAmounts.ts
function maxLiquidityForAmount0Imprecise(sqrtRatioAX96, sqrtRatioBX96, amount0) {
  if (sqrtRatioAX96 > sqrtRatioBX96) {
    sqrtRatioAX96 = sqrtRatioBX96;
    sqrtRatioBX96 = sqrtRatioAX96;
  }
  const intermediate = sqrtRatioAX96 * sqrtRatioBX96 / Q96;
  return BigInt(amount0) * intermediate / (sqrtRatioBX96 - sqrtRatioAX96);
}
function maxLiquidityForAmount0Precise(sqrtRatioAX96, sqrtRatioBX96, amount0) {
  if (sqrtRatioAX96 > sqrtRatioBX96) {
    sqrtRatioAX96 = sqrtRatioBX96;
    sqrtRatioBX96 = sqrtRatioAX96;
  }
  const numerator = BigInt(amount0) * sqrtRatioAX96 * sqrtRatioBX96;
  const denominator = Q96 * (sqrtRatioBX96 - sqrtRatioAX96);
  return numerator / denominator;
}
function maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1) {
  if (sqrtRatioAX96 > sqrtRatioBX96) {
    sqrtRatioAX96 = sqrtRatioBX96;
    sqrtRatioBX96 = sqrtRatioAX96;
  }
  return BigInt(amount1) * Q96 / (sqrtRatioBX96 - sqrtRatioAX96);
}
function maxLiquidityForAmounts(sqrtRatioCurrentX96, sqrtRatioAX96, sqrtRatioBX96, amount0, amount1, useFullPrecision) {
  if (sqrtRatioAX96 > sqrtRatioBX96) {
    sqrtRatioAX96 = sqrtRatioBX96;
    sqrtRatioBX96 = sqrtRatioAX96;
  }
  const maxLiquidityForAmount0 = useFullPrecision ? maxLiquidityForAmount0Precise : maxLiquidityForAmount0Imprecise;
  if (sqrtRatioCurrentX96 <= sqrtRatioAX96) {
    return maxLiquidityForAmount0(sqrtRatioAX96, sqrtRatioBX96, amount0);
  }
  if (sqrtRatioCurrentX96 < sqrtRatioBX96) {
    const liquidity0 = maxLiquidityForAmount0(sqrtRatioCurrentX96, sqrtRatioBX96, amount0);
    const liquidity1 = maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioCurrentX96, amount1);
    return liquidity0 < liquidity1 ? liquidity0 : liquidity1;
  }
  return maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1);
}
function encodeSqrtRatioX96(amount1, amount0) {
  const numerator = BigInt(amount1) << 192n;
  const denominator = BigInt(amount0);
  const ratioX192 = numerator / denominator;
  return sqrt(ratioX192);
}

// src/utils/priceTickConversions.ts
function tickToPrice(baseToken, quoteToken, tick) {
  const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(tick);
  const ratioX192 = sqrtRatioX96 * sqrtRatioX96;
  return baseToken.sortsBefore(quoteToken) ? new Price$1(baseToken, quoteToken, Q192, ratioX192) : new Price$1(baseToken, quoteToken, ratioX192, Q192);
}
function priceToClosestTick(price) {
  const sorted = price.baseCurrency.sortsBefore(price.quoteCurrency);
  const sqrtRatioX96 = sorted ? encodeSqrtRatioX96(price.numerator, price.denominator) : encodeSqrtRatioX96(price.denominator, price.numerator);
  let tick = TickMath.getTickAtSqrtRatio(sqrtRatioX96);
  const nextTickPrice = tickToPrice(price.baseCurrency, price.quoteCurrency, tick + 1);
  if (sorted) {
    if (!price.lessThan(nextTickPrice)) {
      tick++;
    }
  } else if (!price.greaterThan(nextTickPrice)) {
    tick++;
  }
  return tick;
}

// src/utils/positionMath.ts
function getToken0Amount(tickCurrent, tickLower, tickUpper, sqrtRatioX96, liquidity) {
  if (tickCurrent < tickLower) {
    return SqrtPriceMath.getAmount0Delta(
      TickMath.getSqrtRatioAtTick(tickLower),
      TickMath.getSqrtRatioAtTick(tickUpper),
      liquidity,
      false
    );
  }
  if (tickCurrent < tickUpper) {
    return SqrtPriceMath.getAmount0Delta(sqrtRatioX96, TickMath.getSqrtRatioAtTick(tickUpper), liquidity, false);
  }
  return ZERO;
}
function getToken1Amount(tickCurrent, tickLower, tickUpper, sqrtRatioX96, liquidity) {
  if (tickCurrent < tickLower) {
    return ZERO;
  }
  if (tickCurrent < tickUpper) {
    return SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(tickLower), sqrtRatioX96, liquidity, false);
  }
  return SqrtPriceMath.getAmount1Delta(
    TickMath.getSqrtRatioAtTick(tickLower),
    TickMath.getSqrtRatioAtTick(tickUpper),
    liquidity,
    false
  );
}
var PositionMath = {
  getToken0Amount,
  getToken1Amount
};

// src/entities/position.ts
var Position = class {
  /**
   * Constructs a position for a given pool with the given liquidity
   * @param pool For which pool the liquidity is assigned
   * @param liquidity The amount of liquidity that is in the position
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   */
  constructor({ pool, liquidity, tickLower, tickUpper }) {
    // cached resuts for the getters
    this._token0Amount = null;
    this._token1Amount = null;
    this._mintAmounts = null;
    invariant9(tickLower < tickUpper, "TICK_ORDER");
    invariant9(tickLower >= TickMath.MIN_TICK && tickLower % pool.tickSpacing === 0, "TICK_LOWER");
    invariant9(tickUpper <= TickMath.MAX_TICK && tickUpper % pool.tickSpacing === 0, "TICK_UPPER");
    this.pool = pool;
    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.liquidity = BigInt(liquidity);
  }
  /**
   * Returns the price of token0 at the lower tick
   */
  get token0PriceLower() {
    return tickToPrice(this.pool.token0, this.pool.token1, this.tickLower);
  }
  /**
   * Returns the price of token0 at the upper tick
   */
  get token0PriceUpper() {
    return tickToPrice(this.pool.token0, this.pool.token1, this.tickUpper);
  }
  /**
   * Returns the amount of token0 that this position's liquidity could be burned for at the current pool price
   */
  get amount0() {
    if (this._token0Amount === null) {
      this._token0Amount = CurrencyAmount.fromRawAmount(
        this.pool.token0,
        PositionMath.getToken0Amount(
          this.pool.tickCurrent,
          this.tickLower,
          this.tickUpper,
          this.pool.sqrtRatioX96,
          this.liquidity
        )
      );
    }
    return this._token0Amount;
  }
  /**
   * Returns the amount of token1 that this position's liquidity could be burned for at the current pool price
   */
  get amount1() {
    if (this._token1Amount === null) {
      this._token1Amount = CurrencyAmount.fromRawAmount(
        this.pool.token1,
        PositionMath.getToken1Amount(
          this.pool.tickCurrent,
          this.tickLower,
          this.tickUpper,
          this.pool.sqrtRatioX96,
          this.liquidity
        )
      );
    }
    return this._token1Amount;
  }
  /**
   * Returns the lower and upper sqrt ratios if the price 'slips' up to slippage tolerance percentage
   * @param slippageTolerance The amount by which the price can 'slip' before the transaction will revert
   * @returns The sqrt ratios after slippage
   */
  ratiosAfterSlippage(slippageTolerance) {
    const priceLower = this.pool.token0Price.asFraction.multiply(new Percent$1(1).subtract(slippageTolerance));
    const priceUpper = this.pool.token0Price.asFraction.multiply(slippageTolerance.add(1));
    let sqrtRatioX96Lower = encodeSqrtRatioX96(priceLower.numerator, priceLower.denominator);
    if (sqrtRatioX96Lower <= TickMath.MIN_SQRT_RATIO) {
      sqrtRatioX96Lower = TickMath.MIN_SQRT_RATIO + 1n;
    }
    let sqrtRatioX96Upper = encodeSqrtRatioX96(priceUpper.numerator, priceUpper.denominator);
    if (sqrtRatioX96Upper >= TickMath.MAX_SQRT_RATIO) {
      sqrtRatioX96Upper = TickMath.MAX_SQRT_RATIO - 1n;
    }
    return {
      sqrtRatioX96Lower,
      sqrtRatioX96Upper
    };
  }
  /**
   * Returns the minimum amounts that must be sent in order to safely mint the amount of liquidity held by the position
   * with the given slippage tolerance
   * @param slippageTolerance Tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */
  mintAmountsWithSlippage(slippageTolerance) {
    const { sqrtRatioX96Upper, sqrtRatioX96Lower } = this.ratiosAfterSlippage(slippageTolerance);
    const poolLower = new Pool(
      this.pool.token0,
      this.pool.token1,
      this.pool.fee,
      sqrtRatioX96Lower,
      0,
      TickMath.getTickAtSqrtRatio(sqrtRatioX96Lower)
    );
    const poolUpper = new Pool(
      this.pool.token0,
      this.pool.token1,
      this.pool.fee,
      sqrtRatioX96Upper,
      0,
      TickMath.getTickAtSqrtRatio(sqrtRatioX96Upper)
    );
    const positionThatWillBeCreated = Position.fromAmounts({
      pool: this.pool,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper,
      ...this.mintAmounts,
      // the mint amounts are what will be passed as calldata
      useFullPrecision: false
    });
    const { amount0 } = new Position({
      pool: poolUpper,
      liquidity: positionThatWillBeCreated.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts;
    const { amount1 } = new Position({
      pool: poolLower,
      liquidity: positionThatWillBeCreated.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts;
    return { amount0, amount1 };
  }
  /**
   * Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
   * position with the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */
  burnAmountsWithSlippage(slippageTolerance) {
    const { sqrtRatioX96Upper, sqrtRatioX96Lower } = this.ratiosAfterSlippage(slippageTolerance);
    const poolLower = new Pool(
      this.pool.token0,
      this.pool.token1,
      this.pool.fee,
      sqrtRatioX96Lower,
      0,
      TickMath.getTickAtSqrtRatio(sqrtRatioX96Lower)
    );
    const poolUpper = new Pool(
      this.pool.token0,
      this.pool.token1,
      this.pool.fee,
      sqrtRatioX96Upper,
      0,
      TickMath.getTickAtSqrtRatio(sqrtRatioX96Upper)
    );
    const { amount0 } = new Position({
      pool: poolUpper,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    });
    const { amount1 } = new Position({
      pool: poolLower,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    });
    return { amount0: amount0.quotient, amount1: amount1.quotient };
  }
  /**
   * Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
   * the current price for the pool
   */
  get mintAmounts() {
    if (this._mintAmounts === null) {
      if (this.pool.tickCurrent < this.tickLower) {
        return {
          amount0: SqrtPriceMath.getAmount0Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            true
          ),
          amount1: ZERO
        };
      }
      if (this.pool.tickCurrent < this.tickUpper) {
        return {
          amount0: SqrtPriceMath.getAmount0Delta(
            this.pool.sqrtRatioX96,
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            true
          ),
          amount1: SqrtPriceMath.getAmount1Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            this.pool.sqrtRatioX96,
            this.liquidity,
            true
          )
        };
      }
      return {
        amount0: ZERO,
        amount1: SqrtPriceMath.getAmount1Delta(
          TickMath.getSqrtRatioAtTick(this.tickLower),
          TickMath.getSqrtRatioAtTick(this.tickUpper),
          this.liquidity,
          true
        )
      };
    }
    return this._mintAmounts;
  }
  /**
   * Computes the maximum amount of liquidity received for a given amount of token0, token1,
   * and the prices at the tick boundaries.
   * @param pool The pool for which the position should be created
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   * @param amount0 token0 amount
   * @param amount1 token1 amount
   * @param useFullPrecision If false, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The amount of liquidity for the position
   */
  static fromAmounts({
    pool,
    tickLower,
    tickUpper,
    amount0,
    amount1,
    useFullPrecision
  }) {
    const sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower);
    const sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper);
    return new Position({
      pool,
      tickLower,
      tickUpper,
      liquidity: maxLiquidityForAmounts(
        pool.sqrtRatioX96,
        sqrtRatioAX96,
        sqrtRatioBX96,
        amount0,
        amount1,
        useFullPrecision
      )
    });
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token0, assuming an unlimited amount of token1
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount0 The desired amount of token0
   * @param useFullPrecision If true, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The position
   */
  static fromAmount0({
    pool,
    tickLower,
    tickUpper,
    amount0,
    useFullPrecision
  }) {
    return Position.fromAmounts({ pool, tickLower, tickUpper, amount0, amount1: MaxUint256$1, useFullPrecision });
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token1, assuming an unlimited amount of token0
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount1 The desired amount of token1
   * @returns The position
   */
  static fromAmount1({
    pool,
    tickLower,
    tickUpper,
    amount1
  }) {
    return Position.fromAmounts({ pool, tickLower, tickUpper, amount0: MaxUint256$1, amount1, useFullPrecision: true });
  }
};
var Route = class {
  /**
   * Creates an instance of route.
   * @param pools An array of `Pool` objects, ordered by the route the swap will take
   * @param input The input token
   * @param output The output token
   */
  constructor(pools, input, output) {
    this._midPrice = null;
    invariant9(pools.length > 0, "POOLS");
    const { chainId } = pools[0];
    const allOnSameChain = pools.every((pool) => pool.chainId === chainId);
    invariant9(allOnSameChain, "CHAIN_IDS");
    const wrappedInput = input.wrapped;
    invariant9(pools[0].involvesToken(wrappedInput), "INPUT");
    invariant9(pools[pools.length - 1].involvesToken(output.wrapped), "OUTPUT");
    const tokenPath = [wrappedInput];
    for (const [i, pool] of pools.entries()) {
      const currentInputToken = tokenPath[i];
      invariant9(currentInputToken.equals(pool.token0) || currentInputToken.equals(pool.token1), "PATH");
      const nextToken = currentInputToken.equals(pool.token0) ? pool.token1 : pool.token0;
      tokenPath.push(nextToken);
    }
    this.pools = pools;
    this.tokenPath = tokenPath;
    this.input = input;
    this.output = output ?? tokenPath[tokenPath.length - 1];
  }
  get chainId() {
    return this.pools[0].chainId;
  }
  /**
   * Returns the mid price of the route
   */
  get midPrice() {
    if (this._midPrice !== null)
      return this._midPrice;
    const { price } = this.pools.slice(1).reduce(
      ({ nextInput, price: price2 }, pool) => {
        return nextInput.equals(pool.token0) ? {
          nextInput: pool.token1,
          price: price2.multiply(pool.token0Price)
        } : {
          nextInput: pool.token0,
          price: price2.multiply(pool.token1Price)
        };
      },
      this.pools[0].token0.equals(this.input.wrapped) ? {
        nextInput: this.pools[0].token1,
        price: this.pools[0].token0Price
      } : {
        nextInput: this.pools[0].token0,
        price: this.pools[0].token1Price
      }
    );
    return this._midPrice = new Price$1(this.input, this.output, price.denominator, price.numerator);
  }
};
function tradeComparator(a, b) {
  invariant9(a.inputAmount.currency.equals(b.inputAmount.currency), "INPUT_CURRENCY");
  invariant9(a.outputAmount.currency.equals(b.outputAmount.currency), "OUTPUT_CURRENCY");
  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      const aHops = a.swaps.reduce((total, cur) => total + cur.route.tokenPath.length, 0);
      const bHops = b.swaps.reduce((total, cur) => total + cur.route.tokenPath.length, 0);
      return aHops - bHops;
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
var Trade = class {
  /**
   * @deprecated Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
   * this will return an error.
   *
   * When the trade consists of just a single route, this returns the route of the trade,
   * i.e. which pools the trade goes through.
   */
  get route() {
    invariant9(this.swaps.length == 1, "MULTIPLE_ROUTES");
    return this.swaps[0].route;
  }
  /**
   * The input amount for the trade assuming no slippage.
   */
  get inputAmount() {
    if (this._inputAmount) {
      return this._inputAmount;
    }
    const inputCurrency = this.swaps[0].inputAmount.currency;
    const totalInputFromRoutes = this.swaps.map(({ inputAmount }) => inputAmount).reduce((total, cur) => total.add(cur), CurrencyAmount.fromRawAmount(inputCurrency, 0));
    this._inputAmount = totalInputFromRoutes;
    return this._inputAmount;
  }
  /**
   * The output amount for the trade assuming no slippage.
   */
  get outputAmount() {
    if (this._outputAmount) {
      return this._outputAmount;
    }
    const outputCurrency = this.swaps[0].outputAmount.currency;
    const totalOutputFromRoutes = this.swaps.map(({ outputAmount }) => outputAmount).reduce((total, cur) => total.add(cur), CurrencyAmount.fromRawAmount(outputCurrency, 0));
    this._outputAmount = totalOutputFromRoutes;
    return this._outputAmount;
  }
  /**
   * The price expressed in terms of output amount/input amount.
   */
  get executionPrice() {
    return this._executionPrice ?? (this._executionPrice = new Price(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.inputAmount.quotient,
      this.outputAmount.quotient
    ));
  }
  /**
   * Returns the percent difference between the route's mid price and the price impact
   */
  get priceImpact() {
    if (this._priceImpact) {
      return this._priceImpact;
    }
    let spotOutputAmount = CurrencyAmount.fromRawAmount(this.outputAmount.currency, 0);
    for (const { route, inputAmount } of this.swaps) {
      const { midPrice } = route;
      spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount));
    }
    const priceImpact = spotOutputAmount.subtract(this.outputAmount).divide(spotOutputAmount);
    this._priceImpact = new Percent$1(priceImpact.numerator, priceImpact.denominator);
    return this._priceImpact;
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The route of the exact in trade
   * @param amountIn The amount being passed in
   * @returns The exact in trade
   */
  static async exactIn(route, amountIn) {
    return Trade.fromRoute(route, amountIn, TradeType.EXACT_INPUT);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The route of the exact out trade
   * @param amountOut The amount returned by the trade
   * @returns The exact out trade
   */
  static async exactOut(route, amountOut) {
    return Trade.fromRoute(route, amountOut, TradeType.EXACT_OUTPUT);
  }
  /**
   * Constructs a trade by simulating swaps through the given route
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param route route to swap through
   * @param amount the amount specified, either input or output, depending on tradeType
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The route
   */
  static async fromRoute(route, amount, tradeType) {
    const amounts = new Array(route.tokenPath.length);
    let inputAmount;
    let outputAmount;
    if (tradeType === TradeType.EXACT_INPUT) {
      invariant9(amount.currency.equals(route.input), "INPUT");
      amounts[0] = amount.wrapped;
      for (let i = 0; i < route.tokenPath.length - 1; i++) {
        const pool = route.pools[i];
        const [outputAmount2] = await pool.getOutputAmount(amounts[i]);
        amounts[i + 1] = outputAmount2;
      }
      inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
      outputAmount = CurrencyAmount.fromFractionalAmount(
        route.output,
        amounts[amounts.length - 1].numerator,
        amounts[amounts.length - 1].denominator
      );
    } else {
      invariant9(amount.currency.equals(route.output), "OUTPUT");
      amounts[amounts.length - 1] = amount.wrapped;
      for (let i = route.tokenPath.length - 1; i > 0; i--) {
        const pool = route.pools[i - 1];
        const [inputAmount2] = await pool.getInputAmount(amounts[i]);
        amounts[i - 1] = inputAmount2;
      }
      inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amounts[0].numerator, amounts[0].denominator);
      outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);
    }
    return new Trade({
      routes: [{ inputAmount, outputAmount, route }],
      tradeType
    });
  }
  /**
   * Constructs a trade from routes by simulating swaps
   *
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param routes the routes to swap through and how much of the amount should be routed through each
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The trade
   */
  static async fromRoutes(routes, tradeType) {
    const populatedRoutes = [];
    for (const { route, amount } of routes) {
      const amounts = new Array(route.tokenPath.length);
      let inputAmount;
      let outputAmount;
      if (tradeType === TradeType.EXACT_INPUT) {
        invariant9(amount.currency.equals(route.input), "INPUT");
        inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
        amounts[0] = CurrencyAmount.fromFractionalAmount(route.input.wrapped, amount.numerator, amount.denominator);
        for (let i = 0; i < route.tokenPath.length - 1; i++) {
          const pool = route.pools[i];
          const [outputAmount2] = await pool.getOutputAmount(amounts[i]);
          amounts[i + 1] = outputAmount2;
        }
        outputAmount = CurrencyAmount.fromFractionalAmount(
          route.output,
          amounts[amounts.length - 1].numerator,
          amounts[amounts.length - 1].denominator
        );
      } else {
        invariant9(amount.currency.equals(route.output), "OUTPUT");
        outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);
        amounts[amounts.length - 1] = CurrencyAmount.fromFractionalAmount(
          route.output.wrapped,
          amount.numerator,
          amount.denominator
        );
        for (let i = route.tokenPath.length - 1; i > 0; i--) {
          const pool = route.pools[i - 1];
          const [inputAmount2] = await pool.getInputAmount(amounts[i]);
          amounts[i - 1] = inputAmount2;
        }
        inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amounts[0].numerator, amounts[0].denominator);
      }
      populatedRoutes.push({ route, inputAmount, outputAmount });
    }
    return new Trade({
      routes: populatedRoutes,
      tradeType
    });
  }
  /**
   * Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  static createUncheckedTrade(constructorArguments) {
    return new Trade({
      ...constructorArguments,
      routes: [
        {
          inputAmount: constructorArguments.inputAmount,
          outputAmount: constructorArguments.outputAmount,
          route: constructorArguments.route
        }
      ]
    });
  }
  /**
   * Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  static createUncheckedTradeWithMultipleRoutes(constructorArguments) {
    return new Trade(constructorArguments);
  }
  /**
   * Construct a trade by passing in the pre-computed property values
   * @param routes The routes through which the trade occurs
   * @param tradeType The type of trade, exact input or exact output
   */
  constructor({
    routes,
    tradeType
  }) {
    const inputCurrency = routes[0].inputAmount.currency;
    const outputCurrency = routes[0].outputAmount.currency;
    invariant9(
      routes.every(({ route }) => inputCurrency.wrapped.equals(route.input.wrapped)),
      "INPUT_CURRENCY_MATCH"
    );
    invariant9(
      routes.every(({ route }) => outputCurrency.wrapped.equals(route.output.wrapped)),
      "OUTPUT_CURRENCY_MATCH"
    );
    const numPools = routes.map(({ route }) => route.pools.length).reduce((total, cur) => total + cur, 0);
    const poolAddressSet = /* @__PURE__ */ new Set();
    for (const { route } of routes) {
      for (const pool of route.pools) {
        poolAddressSet.add(Pool.getAddress(pool.token0, pool.token1, pool.fee));
      }
    }
    invariant9(numPools == poolAddressSet.size, "POOLS_DUPLICATED");
    this.swaps = routes;
    this.tradeType = tradeType;
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */
  minimumAmountOut(slippageTolerance, amountOut = this.outputAmount) {
    invariant9(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE");
    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return amountOut;
    }
    const slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(amountOut.quotient).quotient;
    return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */
  maximumAmountIn(slippageTolerance, amountIn = this.inputAmount) {
    invariant9(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE");
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return amountIn;
    }
    const slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient;
    return CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
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
   * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact in trade
   */
  static async bestTradeExactIn(pools, currencyAmountIn, currencyOut, { maxNumResults = 3, maxHops = 3 } = {}, currentPools = [], nextAmountIn = currencyAmountIn, bestTrades = []) {
    invariant9(pools.length > 0, "POOLS");
    invariant9(maxHops > 0, "MAX_HOPS");
    invariant9(currencyAmountIn === nextAmountIn || currentPools.length > 0, "INVALID_RECURSION");
    const amountIn = nextAmountIn.wrapped;
    const tokenOut = currencyOut.wrapped;
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i];
      if (!pool.token0.equals(amountIn.currency) && !pool.token1.equals(amountIn.currency))
        continue;
      let amountOut;
      try {
        const [result] = await pool.getOutputAmount(amountIn);
        amountOut = result;
      } catch (error) {
        if (error.isInsufficientInputAmountError) {
          continue;
        }
        throw error;
      }
      if (amountOut.currency.isToken && amountOut.currency.equals(tokenOut)) {
        sortedInsert(
          bestTrades,
          await Trade.fromRoute(
            new Route([...currentPools, pool], currencyAmountIn.currency, currencyOut),
            currencyAmountIn,
            TradeType.EXACT_INPUT
          ),
          maxNumResults,
          tradeComparator
        );
      } else if (maxHops > 1 && pools.length > 1) {
        const poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length));
        await Trade.bestTradeExactIn(
          poolsExcludingThisPool,
          currencyAmountIn,
          currencyOut,
          {
            maxNumResults,
            maxHops: maxHops - 1
          },
          [...currentPools, pool],
          amountOut,
          bestTrades
        );
      }
    }
    return bestTrades;
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the desired currency amount out
   * @param nextAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact out trade
   */
  static async bestTradeExactOut(pools, currencyIn, currencyAmountOut, { maxNumResults = 3, maxHops = 3 } = {}, currentPools = [], nextAmountOut = currencyAmountOut, bestTrades = []) {
    invariant9(pools.length > 0, "POOLS");
    invariant9(maxHops > 0, "MAX_HOPS");
    invariant9(currencyAmountOut === nextAmountOut || currentPools.length > 0, "INVALID_RECURSION");
    const amountOut = nextAmountOut.wrapped;
    const tokenIn = currencyIn.wrapped;
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i];
      if (!pool.token0.equals(amountOut.currency) && !pool.token1.equals(amountOut.currency))
        continue;
      let amountIn;
      try {
        const [result] = await pool.getInputAmount(amountOut);
        amountIn = result;
      } catch (error) {
        if (error.isInsufficientReservesError) {
          continue;
        }
        throw error;
      }
      if (amountIn.currency.equals(tokenIn)) {
        sortedInsert(
          bestTrades,
          await Trade.fromRoute(
            new Route([pool, ...currentPools], currencyIn, currencyAmountOut.currency),
            currencyAmountOut,
            TradeType.EXACT_OUTPUT
          ),
          maxNumResults,
          tradeComparator
        );
      } else if (maxHops > 1 && pools.length > 1) {
        const poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length));
        await Trade.bestTradeExactOut(
          poolsExcludingThisPool,
          currencyIn,
          currencyAmountOut,
          {
            maxNumResults,
            maxHops: maxHops - 1
          },
          [pool, ...currentPools],
          amountIn,
          bestTrades
        );
      }
    }
    return bestTrades;
  }
};

// src/utils/calldata.ts
function toHex(bigintIsh) {
  const bigInt = BigInt(bigintIsh);
  let hex = bigInt.toString(16);
  if (hex.length % 2 !== 0) {
    hex = `0${hex}`;
  }
  return `0x${hex}`;
}
function encodeRouteToPath(route, exactOutput) {
  const firstInputToken = route.input.wrapped;
  const { path, types } = route.pools.reduce(
    ({ inputToken, path: path2, types: types2 }, pool, index) => {
      const outputToken = pool.token0.equals(inputToken) ? pool.token1 : pool.token0;
      if (index === 0) {
        return {
          inputToken: outputToken,
          types: ["address", "uint24", "address"],
          path: [inputToken.address, pool.fee, outputToken.address]
        };
      }
      return {
        inputToken: outputToken,
        types: [...types2, "uint24", "address"],
        path: [...path2, pool.fee, outputToken.address]
      };
    },
    { inputToken: firstInputToken, path: [], types: [] }
  );
  return exactOutput ? encodePacked(types.reverse(), path.reverse()) : encodePacked(types, path);
}
function nearestUsableTick(tick, tickSpacing) {
  invariant9(Number.isInteger(tick) && Number.isInteger(tickSpacing), "INTEGERS");
  invariant9(tickSpacing > 0, "TICK_SPACING");
  invariant9(tick >= TickMath.MIN_TICK && tick <= TickMath.MAX_TICK, "TICK_BOUND");
  const rounded = Math.round(tick / tickSpacing) * tickSpacing;
  if (rounded < TickMath.MIN_TICK)
    return rounded + tickSpacing;
  if (rounded > TickMath.MAX_TICK)
    return rounded - tickSpacing;
  return rounded;
}

// src/utils/position.ts
var PositionLibrary = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  // replicates the portions of Position#update required to compute unaccounted fees
  static getTokensOwed(feeGrowthInside0LastX128, feeGrowthInside1LastX128, liquidity, feeGrowthInside0X128, feeGrowthInside1X128) {
    const tokensOwed0 = subIn256(feeGrowthInside0X128, feeGrowthInside0LastX128) * liquidity / Q128;
    const tokensOwed1 = subIn256(feeGrowthInside1X128, feeGrowthInside1LastX128) * liquidity / Q128;
    return [tokensOwed0, tokensOwed1];
  }
};

// src/utils/tickLibrary.ts
var Q256 = 2n ** 256n;
function subIn256(x, y) {
  const difference = x - y;
  if (difference < ZERO) {
    return Q256 + difference;
  }
  return difference;
}
var TickLibrary = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static getFeeGrowthInside(feeGrowthOutsideLower, feeGrowthOutsideUpper, tickLower, tickUpper, tickCurrent, feeGrowthGlobal0X128, feeGrowthGlobal1X128) {
    let feeGrowthBelow0X128;
    let feeGrowthBelow1X128;
    if (tickCurrent >= tickLower) {
      feeGrowthBelow0X128 = feeGrowthOutsideLower.feeGrowthOutside0X128;
      feeGrowthBelow1X128 = feeGrowthOutsideLower.feeGrowthOutside1X128;
    } else {
      feeGrowthBelow0X128 = subIn256(feeGrowthGlobal0X128, feeGrowthOutsideLower.feeGrowthOutside0X128);
      feeGrowthBelow1X128 = subIn256(feeGrowthGlobal1X128, feeGrowthOutsideLower.feeGrowthOutside1X128);
    }
    let feeGrowthAbove0X128;
    let feeGrowthAbove1X128;
    if (tickCurrent < tickUpper) {
      feeGrowthAbove0X128 = feeGrowthOutsideUpper.feeGrowthOutside0X128;
      feeGrowthAbove1X128 = feeGrowthOutsideUpper.feeGrowthOutside1X128;
    } else {
      feeGrowthAbove0X128 = subIn256(feeGrowthGlobal0X128, feeGrowthOutsideUpper.feeGrowthOutside0X128);
      feeGrowthAbove1X128 = subIn256(feeGrowthGlobal1X128, feeGrowthOutsideUpper.feeGrowthOutside1X128);
    }
    return [
      subIn256(subIn256(feeGrowthGlobal0X128, feeGrowthBelow0X128), feeGrowthAbove0X128),
      subIn256(subIn256(feeGrowthGlobal1X128, feeGrowthBelow1X128), feeGrowthAbove1X128)
    ];
  }
};
function parseNumberToFraction(num, precision = 6) {
  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return void 0;
  }
  const scalar = 10 ** precision;
  return new Fraction$1(BigInt(Math.floor(num * scalar)), BigInt(scalar));
}

// src/utils/feeCalculator.ts
var FeeCalculator = {
  getEstimatedLPFee,
  getEstimatedLPFeeByAmounts,
  getLiquidityFromTick,
  getLiquidityFromSqrtRatioX96,
  getAverageLiquidity,
  getLiquidityBySingleAmount,
  getDependentAmount,
  getLiquidityByAmountsAndPrice,
  getAmountsByLiquidityAndPrice,
  getAmountsAtNewPrice
};
function getEstimatedLPFeeWithProtocolFee({ amount, currency, ...rest }) {
  return getEstimatedLPFeeByAmountsWithProtocolFee({
    ...rest,
    amountA: amount,
    amountB: CurrencyAmount$1.fromRawAmount(currency, MaxUint256)
  });
}
function getEstimatedLPFee({ amount, currency, ...rest }) {
  return getEstimatedLPFeeByAmounts({
    ...rest,
    amountA: amount,
    amountB: CurrencyAmount$1.fromRawAmount(currency, MaxUint256)
  });
}
function getEstimatedLPFeeByAmountsWithProtocolFee(options) {
  try {
    return tryGetEstimatedLPFeeByAmounts(options);
  } catch (e) {
    console.error(e);
    return new Fraction$1(ZERO$1);
  }
}
function getEstimatedLPFeeByAmounts({ protocolFee = ZERO_PERCENT, ...rest }) {
  try {
    const fee = tryGetEstimatedLPFeeByAmounts(rest);
    return ONE_HUNDRED_PERCENT.subtract(protocolFee).multiply(fee).asFraction;
  } catch (e) {
    console.error(e);
    return new Fraction$1(ZERO$1);
  }
}
function tryGetEstimatedLPFeeByAmounts({
  amountA,
  amountB,
  volume24H,
  sqrtRatioX96,
  tickLower,
  tickUpper,
  mostActiveLiquidity,
  fee,
  insidePercentage = ONE_HUNDRED_PERCENT
}) {
  invariant9(!Number.isNaN(fee) && fee >= 0, "INVALID_FEE");
  const tickCurrent = TickMath.getTickAtSqrtRatio(sqrtRatioX96);
  if (tickCurrent < tickLower || tickCurrent > tickUpper) {
    return new Fraction$1(ZERO$1);
  }
  const liquidity = FeeCalculator.getLiquidityByAmountsAndPrice({
    amountA,
    amountB,
    tickUpper,
    tickLower,
    sqrtRatioX96
  });
  if (!liquidity) {
    return new Fraction$1(ZERO$1);
  }
  const volumeInFraction = parseNumberToFraction(volume24H) || new Fraction$1(ZERO$1);
  return insidePercentage.multiply(volumeInFraction.multiply(BigInt(fee)).multiply(liquidity)).divide(MAX_FEE * (liquidity + mostActiveLiquidity)).asFraction;
}
function getDependentAmount(options) {
  const { currency, amount, sqrtRatioX96, tickLower, tickUpper } = options;
  const currentTick = TickMath.getTickAtSqrtRatio(sqrtRatioX96);
  const liquidity = FeeCalculator.getLiquidityBySingleAmount(options);
  const isToken0 = currency.wrapped.sortsBefore(amount.currency.wrapped);
  const getTokenAmount = isToken0 ? PositionMath.getToken0Amount : PositionMath.getToken1Amount;
  if (!liquidity) {
    return void 0;
  }
  return CurrencyAmount$1.fromRawAmount(
    currency,
    getTokenAmount(currentTick, tickLower, tickUpper, sqrtRatioX96, liquidity)
  );
}
function getLiquidityBySingleAmount({ amount, currency, ...rest }) {
  return getLiquidityByAmountsAndPrice({
    amountA: amount,
    amountB: CurrencyAmount$1.fromRawAmount(currency, MaxUint256),
    ...rest
  });
}
function getLiquidityByAmountsAndPrice({
  amountA,
  amountB,
  tickUpper,
  tickLower,
  sqrtRatioX96
}) {
  const isToken0 = amountA.currency.wrapped.address !== amountB.currency.wrapped.address ? amountA.currency.wrapped.sortsBefore(amountB.currency.wrapped) : true;
  const [inputAmount0, inputAmount1] = isToken0 ? [amountA.quotient, amountB.quotient] : [amountB.quotient, amountA.quotient];
  const sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower);
  const sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper);
  try {
    return maxLiquidityForAmounts(sqrtRatioX96, sqrtRatioAX96, sqrtRatioBX96, inputAmount0, inputAmount1, true);
  } catch (e) {
    console.error(e);
    return void 0;
  }
}
function getAmountsByLiquidityAndPrice(options) {
  const { currencyA, currencyB, liquidity, sqrtRatioX96, tickLower, tickUpper } = options;
  const currentTick = TickMath.getTickAtSqrtRatio(sqrtRatioX96);
  const isToken0 = currencyA.wrapped.sortsBefore(currencyB.wrapped);
  const adjustedAmount0 = PositionMath.getToken0Amount(currentTick, tickLower, tickUpper, sqrtRatioX96, liquidity);
  const adjustedAmount1 = PositionMath.getToken1Amount(currentTick, tickLower, tickUpper, sqrtRatioX96, liquidity);
  return [
    CurrencyAmount$1.fromRawAmount(currencyA, isToken0 ? adjustedAmount0 : adjustedAmount1),
    CurrencyAmount$1.fromRawAmount(currencyB, isToken0 ? adjustedAmount1 : adjustedAmount0)
  ];
}
function getAmountsAtNewPrice({ newSqrtRatioX96, ...rest }) {
  const { tickLower, tickUpper, amountA, amountB } = rest;
  const liquidity = FeeCalculator.getLiquidityByAmountsAndPrice(rest);
  if (!liquidity) {
    return void 0;
  }
  return FeeCalculator.getAmountsByLiquidityAndPrice({
    liquidity,
    currencyA: amountA.currency,
    currencyB: amountB.currency,
    tickLower,
    tickUpper,
    sqrtRatioX96: newSqrtRatioX96
  });
}
function getAverageLiquidity(ticks, tickSpacing, tickLower, tickUpper) {
  invariant9(tickLower <= tickUpper, "INVALID_TICK_RANGE");
  TickList.validateList(ticks, tickSpacing);
  if (tickLower === tickUpper) {
    return FeeCalculator.getLiquidityFromTick(ticks, tickLower);
  }
  const lowerOutOfBound = tickLower < ticks[0].index;
  let lastTick = lowerOutOfBound ? new Tick({ index: TickMath.MIN_TICK, liquidityNet: ZERO$1, liquidityGross: ZERO$1 }) : TickList.nextInitializedTick(ticks, tickLower, true);
  let currentTick = TickList.nextInitializedTick(ticks, tickLower, false);
  let currentL = lowerOutOfBound ? ZERO$1 : FeeCalculator.getLiquidityFromTick(ticks, currentTick.index);
  let weightedL = ZERO$1;
  const getWeightedLFromLastTickTo = (toTick) => currentL * BigInt(toTick - Math.max(lastTick.index, tickLower));
  while (currentTick.index < tickUpper) {
    weightedL += getWeightedLFromLastTickTo(currentTick.index);
    currentL += currentTick.liquidityNet;
    lastTick = currentTick;
    if (currentTick.index === ticks[ticks.length - 1].index) {
      break;
    }
    currentTick = TickList.nextInitializedTick(ticks, currentTick.index, false);
  }
  weightedL += getWeightedLFromLastTickTo(tickUpper);
  return weightedL / BigInt(tickUpper - tickLower);
}
function getLiquidityFromSqrtRatioX96(ticks, sqrtRatioX96) {
  const tick = TickMath.getTickAtSqrtRatio(sqrtRatioX96);
  return FeeCalculator.getLiquidityFromTick(ticks, tick);
}
function getLiquidityFromTick(ticks, tick) {
  let liquidity = ZERO$1;
  if (!ticks?.length)
    return liquidity;
  if (tick < ticks[0].index || tick > ticks[ticks.length - 1].index) {
    return liquidity;
  }
  for (let i = 0; i < ticks.length - 1; ++i) {
    liquidity += ticks[i].liquidityNet;
    const lowerTick = ticks[i].index;
    const upperTick = ticks[i + 1]?.index;
    if (lowerTick <= tick && tick <= upperTick) {
      break;
    }
  }
  return liquidity;
}
var FEE_BASE = 10n ** 4n;
function parseProtocolFees(feeProtocol) {
  const packed = Number(feeProtocol);
  if (Number.isNaN(packed)) {
    throw new Error(`Invalid fee protocol ${feeProtocol}`);
  }
  const token0ProtocolFee = packed % 2 ** 16;
  const token1ProtocolFee = packed >> 16;
  return [new Percent(token0ProtocolFee, FEE_BASE), new Percent(token1ProtocolFee, FEE_BASE)];
}
function sqrtRatioX96ToPrice(sqrtRatioX96, currencyA, currencyB) {
  const ratioX192 = sqrtRatioX96 * sqrtRatioX96;
  return currencyA.wrapped.sortsBefore(currencyB.wrapped) ? new Price$1(currencyA.wrapped, currencyB.wrapped, Q192, ratioX192) : new Price$1(currencyA.wrapped, currencyB.wrapped, ratioX192, Q192);
}
var IMulticall = [
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
var _Multicall = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static encodeMulticall(calldatas) {
    if (!Array.isArray(calldatas)) {
      calldatas = [calldatas];
    }
    return calldatas.length === 1 ? calldatas[0] : encodeFunctionData({ abi: _Multicall.ABI, functionName: "multicall", args: [calldatas] });
  }
};
var Multicall = _Multicall;
Multicall.ABI = IMulticall;

// src/abi/NonfungiblePositionManager.ts
var nonfungiblePositionManagerABI = [
  {
    inputs: [
      { internalType: "address", name: "_deployer", type: "address" },
      { internalType: "address", name: "_factory", type: "address" },
      { internalType: "address", name: "_WETH9", type: "address" },
      { internalType: "address", name: "_tokenDescriptor_", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "approved", type: "address" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "operator", type: "address" },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "address", name: "recipient", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    name: "Collect",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "uint128", name: "liquidity", type: "uint128" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    name: "DecreaseLiquidity",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "uint128", name: "liquidity", type: "uint128" },
      { indexed: false, internalType: "uint256", name: "amount0", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    name: "IncreaseLiquidity",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "WETH9",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "amount0Max", type: "uint128" },
          { internalType: "uint128", name: "amount1Max", type: "uint128" }
        ],
        internalType: "struct INonfungiblePositionManager.CollectParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "collect",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token0", type: "address" },
      { internalType: "address", name: "token1", type: "address" },
      { internalType: "uint24", name: "fee", type: "uint24" },
      { internalType: "uint160", name: "sqrtPriceX96", type: "uint160" }
    ],
    name: "createAndInitializePoolIfNecessary",
    outputs: [{ internalType: "address", name: "pool", type: "address" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint128", name: "liquidity", type: "uint128" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" }
        ],
        internalType: "struct INonfungiblePositionManager.DecreaseLiquidityParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "decreaseLiquidity",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    stateMutability: "payable",
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
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount0Desired", type: "uint256" },
          { internalType: "uint256", name: "amount1Desired", type: "uint256" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" }
        ],
        internalType: "struct INonfungiblePositionManager.IncreaseLiquidityParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "increaseLiquidity",
    outputs: [
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" }
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
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
          { internalType: "uint256", name: "amount0Desired", type: "uint256" },
          { internalType: "uint256", name: "amount1Desired", type: "uint256" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" }
        ],
        internalType: "struct INonfungiblePositionManager.MintParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "mint",
    outputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" }
    ],
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
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amount0Owed", type: "uint256" },
      { internalType: "uint256", name: "amount1Owed", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" }
    ],
    name: "pancakeV3MintCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "positions",
    outputs: [
      { internalType: "uint96", name: "nonce", type: "uint96" },
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "address", name: "token0", type: "address" },
      { internalType: "address", name: "token1", type: "address" },
      { internalType: "uint24", name: "fee", type: "uint24" },
      { internalType: "int24", name: "tickLower", type: "int24" },
      { internalType: "int24", name: "tickUpper", type: "int24" },
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint256", name: "feeGrowthInside0LastX128", type: "uint256" },
      { internalType: "uint256", name: "feeGrowthInside1LastX128", type: "uint256" },
      { internalType: "uint128", name: "tokensOwed0", type: "uint128" },
      { internalType: "uint128", name: "tokensOwed1", type: "uint128" }
    ],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "refundETH", outputs: [], stateMutability: "payable", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
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
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
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
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" }
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "transferFrom",
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
  { stateMutability: "payable", type: "receive" }
];

// src/abi/SelfPermit.ts
var selfPermitABI = [
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
    name: "selfPermit",
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
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "expiry",
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
    name: "selfPermitAllowed",
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
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "expiry",
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
    name: "selfPermitAllowedIfNecessary",
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
    name: "selfPermitIfNecessary",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];

// src/selfPermit.ts
function isAllowedPermit(permitOptions) {
  return "nonce" in permitOptions;
}
var _SelfPermit = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static encodePermit(token, options) {
    return isAllowedPermit(options) ? encodeFunctionData({
      abi: _SelfPermit.ABI,
      functionName: "selfPermitAllowed",
      args: [token.address, BigInt(options.nonce), BigInt(options.expiry), options.v, options.r, options.s]
    }) : encodeFunctionData({
      abi: _SelfPermit.ABI,
      functionName: "selfPermit",
      args: [token.address, BigInt(options.amount), BigInt(options.deadline), options.v, options.r, options.s]
    });
  }
};
var SelfPermit = _SelfPermit;
SelfPermit.ABI = selfPermitABI;

// src/abi/PeripheryPaymentsWithFee.ts
var peripheryPaymentsWithFeeABI = [
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
  }
];

// src/payments.ts
var _Payments = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static encodeFeeBips(fee) {
    return fee.multiply(1e4).quotient;
  }
  static encodeUnwrapWETH9(amountMinimum, recipient, feeOptions) {
    recipient = validateAndParseAddress(recipient);
    if (feeOptions) {
      const feeBips = this.encodeFeeBips(feeOptions.fee);
      const feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return encodeFunctionData({
        abi: _Payments.ABI,
        functionName: "unwrapWETH9WithFee",
        args: [amountMinimum, recipient, feeBips, feeRecipient]
      });
    }
    return encodeFunctionData({ abi: _Payments.ABI, functionName: "unwrapWETH9", args: [amountMinimum, recipient] });
  }
  static encodeSweepToken(token, amountMinimum, recipient, feeOptions) {
    recipient = validateAndParseAddress(recipient);
    if (feeOptions) {
      const feeBips = this.encodeFeeBips(feeOptions.fee);
      const feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return encodeFunctionData({
        abi: _Payments.ABI,
        functionName: "sweepTokenWithFee",
        args: [token.address, amountMinimum, recipient, feeBips, feeRecipient]
      });
    }
    return encodeFunctionData({
      abi: _Payments.ABI,
      functionName: "sweepToken",
      args: [token.address, amountMinimum, recipient]
    });
  }
  static encodeRefundETH() {
    return encodeFunctionData({ abi: _Payments.ABI, functionName: "refundETH" });
  }
};
var Payments = _Payments;
Payments.ABI = peripheryPaymentsWithFeeABI;

// src/nonfungiblePositionManager.ts
var MaxUint128 = 2n ** 128n - 1n;
function isMint(options) {
  return Object.keys(options).some((k) => k === "recipient");
}
var _NonfungiblePositionManager = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line
  constructor() {
  }
  static encodeCreate(pool) {
    return encodeFunctionData({
      abi: _NonfungiblePositionManager.ABI,
      functionName: "createAndInitializePoolIfNecessary",
      args: [pool.token0.address, pool.token1.address, pool.fee, pool.sqrtRatioX96]
    });
  }
  static createCallParameters(pool) {
    return {
      calldata: this.encodeCreate(pool),
      value: toHex(0)
    };
  }
  static addCallParameters(position, options) {
    invariant9(position.liquidity > ZERO, "ZERO_LIQUIDITY");
    const calldatas = [];
    const { amount0: amount0Desired, amount1: amount1Desired } = position.mintAmounts;
    const minimumAmounts = position.mintAmountsWithSlippage(options.slippageTolerance);
    const amount0Min = minimumAmounts.amount0;
    const amount1Min = minimumAmounts.amount1;
    const deadline = BigInt(options.deadline);
    if (isMint(options) && options.createPool) {
      calldatas.push(this.encodeCreate(position.pool));
    }
    if (options.token0Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token0, options.token0Permit));
    }
    if (options.token1Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token1, options.token1Permit));
    }
    if (isMint(options)) {
      const recipient = validateAndParseAddress(options.recipient);
      calldatas.push(
        encodeFunctionData({
          abi: _NonfungiblePositionManager.ABI,
          functionName: "mint",
          args: [
            {
              token0: position.pool.token0.address,
              token1: position.pool.token1.address,
              fee: position.pool.fee,
              tickLower: position.tickLower,
              tickUpper: position.tickUpper,
              amount0Desired,
              amount1Desired,
              amount0Min,
              amount1Min,
              recipient,
              deadline
            }
          ]
        })
      );
    } else {
      calldatas.push(
        encodeFunctionData({
          abi: _NonfungiblePositionManager.ABI,
          functionName: "increaseLiquidity",
          args: [
            {
              tokenId: BigInt(options.tokenId),
              amount0Desired,
              amount1Desired,
              amount0Min,
              amount1Min,
              deadline
            }
          ]
        })
      );
    }
    let value = toHex(0);
    if (options.useNative) {
      const { wrapped } = options.useNative;
      invariant9(position.pool.token0.equals(wrapped) || position.pool.token1.equals(wrapped), "NO_WETH");
      const wrappedValue = position.pool.token0.equals(wrapped) ? amount0Desired : amount1Desired;
      if (wrappedValue > ZERO) {
        calldatas.push(Payments.encodeRefundETH());
      }
      value = toHex(wrappedValue);
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value
    };
  }
  static encodeCollect(options) {
    const calldatas = [];
    const tokenId = BigInt(options.tokenId);
    const involvesETH = options.expectedCurrencyOwed0.currency.isNative || options.expectedCurrencyOwed1.currency.isNative;
    const recipient = validateAndParseAddress(options.recipient);
    calldatas.push(
      encodeFunctionData({
        abi: _NonfungiblePositionManager.ABI,
        functionName: "collect",
        args: [
          {
            tokenId,
            recipient: involvesETH ? ADDRESS_ZERO : recipient,
            amount0Max: MaxUint128,
            amount1Max: MaxUint128
          }
        ]
      })
    );
    if (involvesETH) {
      const ethAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed0.quotient : options.expectedCurrencyOwed1.quotient;
      const token = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.currency : options.expectedCurrencyOwed0.currency;
      const tokenAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.quotient : options.expectedCurrencyOwed0.quotient;
      calldatas.push(Payments.encodeUnwrapWETH9(ethAmount, recipient));
      calldatas.push(Payments.encodeSweepToken(token, tokenAmount, recipient));
    }
    return calldatas;
  }
  static collectCallParameters(options) {
    const calldatas = _NonfungiblePositionManager.encodeCollect(options);
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  /**
   * Produces the calldata for completely or partially exiting a position
   * @param position The position to exit
   * @param options Additional information necessary for generating the calldata
   * @returns The call parameters
   */
  static removeCallParameters(position, options) {
    const calldatas = [];
    const deadline = BigInt(options.deadline);
    const tokenId = BigInt(options.tokenId);
    const partialPosition = new Position({
      pool: position.pool,
      liquidity: options.liquidityPercentage.multiply(position.liquidity).quotient,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper
    });
    invariant9(partialPosition.liquidity > ZERO, "ZERO_LIQUIDITY");
    const { amount0: amount0Min, amount1: amount1Min } = partialPosition.burnAmountsWithSlippage(
      options.slippageTolerance
    );
    if (options.permit) {
      calldatas.push(
        encodeFunctionData({
          abi: _NonfungiblePositionManager.ABI,
          functionName: "permit",
          args: [
            validateAndParseAddress(options.permit.spender),
            tokenId,
            BigInt(options.permit.deadline),
            options.permit.v,
            options.permit.r,
            options.permit.s
          ]
        })
      );
    }
    calldatas.push(
      encodeFunctionData({
        abi: _NonfungiblePositionManager.ABI,
        functionName: "decreaseLiquidity",
        args: [
          {
            tokenId,
            liquidity: partialPosition.liquidity,
            amount0Min,
            amount1Min,
            deadline
          }
        ]
      })
    );
    const { expectedCurrencyOwed0, expectedCurrencyOwed1, ...rest } = options.collectOptions;
    calldatas.push(
      ..._NonfungiblePositionManager.encodeCollect({
        tokenId: toHex(options.tokenId),
        // add the underlying value to the expected currency already owed
        expectedCurrencyOwed0: expectedCurrencyOwed0.add(
          CurrencyAmount.fromRawAmount(expectedCurrencyOwed0.currency, amount0Min)
        ),
        expectedCurrencyOwed1: expectedCurrencyOwed1.add(
          CurrencyAmount.fromRawAmount(expectedCurrencyOwed1.currency, amount1Min)
        ),
        ...rest
      })
    );
    if (options.liquidityPercentage.equalTo(ONE)) {
      if (options.burnToken) {
        calldatas.push(
          encodeFunctionData({ abi: _NonfungiblePositionManager.ABI, functionName: "burn", args: [tokenId] })
        );
      }
    } else {
      invariant9(options.burnToken !== true, "CANNOT_BURN");
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  static safeTransferFromParameters(options) {
    const recipient = validateAndParseAddress(options.recipient);
    const sender = validateAndParseAddress(options.sender);
    let calldata;
    if (options.data) {
      calldata = encodeFunctionData({
        abi: _NonfungiblePositionManager.ABI,
        functionName: "safeTransferFrom",
        args: [sender, recipient, BigInt(options.tokenId), options.data]
      });
    } else {
      calldata = encodeFunctionData({
        abi: _NonfungiblePositionManager.ABI,
        functionName: "safeTransferFrom",
        args: [sender, recipient, BigInt(options.tokenId)]
      });
    }
    return {
      calldata,
      value: toHex(0)
    };
  }
};
var NonfungiblePositionManager = _NonfungiblePositionManager;
NonfungiblePositionManager.ABI = nonfungiblePositionManagerABI;

// src/abi/Quoter.ts
var quoterABI = [
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
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
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
        internalType: "uint24",
        name: "fee",
        type: "uint24"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        internalType: "uint160",
        name: "sqrtPriceLimitX96",
        type: "uint160"
      }
    ],
    name: "quoteExactInputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
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
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
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
        internalType: "uint24",
        name: "fee",
        type: "uint24"
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160",
        name: "sqrtPriceLimitX96",
        type: "uint160"
      }
    ],
    name: "quoteExactOutputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abi/QuoterV2.ts
var quoterV2ABI = [
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

// src/quoter.ts
var SwapQuoter = class {
  /**
   * Produces the on-chain method name of the appropriate function within QuoterV2,
   * and the relevant hex encoded parameters.
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The swap route, a list of pools through which a swap can occur
   * @param amount The amount of the quote, either an amount in, or an amount out
   * @param tradeType The trade type, either exact input or exact output
   * @param options The optional params including price limit and Quoter contract switch
   * @returns The formatted calldata
   */
  static quoteCallParameters(route, amount, tradeType, options = {}) {
    const singleHop = route.pools.length === 1;
    const quoteAmount = amount.quotient;
    let calldata;
    const swapAbi = options.useQuoterV2 ? this.V2ABI : this.V1ABI;
    if (singleHop) {
      const baseQuoteParams = {
        tokenIn: route.tokenPath[0].address,
        tokenOut: route.tokenPath[1].address,
        fee: route.pools[0].fee,
        sqrtPriceLimitX96: BigInt(options?.sqrtPriceLimitX96 ?? 0)
      };
      const v2QuoteParams = {
        ...baseQuoteParams,
        ...tradeType === TradeType$1.EXACT_INPUT ? { amountIn: quoteAmount } : { amount: quoteAmount }
      };
      const v1QuoteParams = [
        baseQuoteParams.tokenIn,
        baseQuoteParams.tokenOut,
        baseQuoteParams.fee,
        quoteAmount,
        baseQuoteParams.sqrtPriceLimitX96
      ];
      const tradeTypeFunctionName = tradeType === TradeType$1.EXACT_INPUT ? "quoteExactInputSingle" : "quoteExactOutputSingle";
      if (options.useQuoterV2) {
        calldata = encodeFunctionData({
          abi: this.V2ABI,
          functionName: tradeTypeFunctionName,
          // @ts-ignore // FIXME
          args: [v2QuoteParams]
        });
      } else {
        calldata = encodeFunctionData({
          abi: this.V1ABI,
          functionName: tradeTypeFunctionName,
          args: v1QuoteParams
        });
      }
    } else {
      invariant9(options?.sqrtPriceLimitX96 === void 0, "MULTIHOP_PRICE_LIMIT");
      const path = encodeRouteToPath(route, tradeType === TradeType$1.EXACT_OUTPUT);
      const tradeTypeFunctionName = tradeType === TradeType$1.EXACT_INPUT ? "quoteExactInput" : "quoteExactOutput";
      calldata = encodeFunctionData({
        // @ts-ignore
        abi: swapAbi,
        functionName: tradeTypeFunctionName,
        args: [path, quoteAmount]
      });
    }
    return {
      calldata,
      value: toHex(0)
    };
  }
};
SwapQuoter.V1ABI = quoterABI;
SwapQuoter.V2ABI = quoterV2ABI;

// src/abi/V3Staker.ts
var v3StakerABI = [
  {
    inputs: [
      {
        internalType: "contract IUniswapV3Factory",
        name: "_factory",
        type: "address"
      },
      {
        internalType: "contract INonfungiblePositionManager",
        name: "_nonfungiblePositionManager",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_maxIncentiveStartLeadTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_maxIncentiveDuration",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "DepositTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IERC20Minimal",
        name: "rewardToken",
        type: "address"
      },
      {
        indexed: true,
        internalType: "contract IUniswapV3Pool",
        name: "pool",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "refundee",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256"
      }
    ],
    name: "IncentiveCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "incentiveId",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refund",
        type: "uint256"
      }
    ],
    name: "IncentiveEnded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256"
      }
    ],
    name: "RewardClaimed",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "incentiveId",
        type: "bytes32"
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liquidity",
        type: "uint128"
      }
    ],
    name: "TokenStaked",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "incentiveId",
        type: "bytes32"
      }
    ],
    name: "TokenUnstaked",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Minimal",
        name: "rewardToken",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountRequested",
        type: "uint256"
      }
    ],
    name: "claimReward",
    outputs: [
      {
        internalType: "uint256",
        name: "reward",
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
            internalType: "contract IERC20Minimal",
            name: "rewardToken",
            type: "address"
          },
          {
            internalType: "contract IUniswapV3Pool",
            name: "pool",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "refundee",
            type: "address"
          }
        ],
        internalType: "struct IUniswapV3Staker.IncentiveKey",
        name: "key",
        type: "tuple"
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256"
      }
    ],
    name: "createIncentive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "uint48",
        name: "numberOfStakes",
        type: "uint48"
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
            internalType: "contract IERC20Minimal",
            name: "rewardToken",
            type: "address"
          },
          {
            internalType: "contract IUniswapV3Pool",
            name: "pool",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "refundee",
            type: "address"
          }
        ],
        internalType: "struct IUniswapV3Staker.IncentiveKey",
        name: "key",
        type: "tuple"
      }
    ],
    name: "endIncentive",
    outputs: [
      {
        internalType: "uint256",
        name: "refund",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "contract IUniswapV3Factory",
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
        components: [
          {
            internalType: "contract IERC20Minimal",
            name: "rewardToken",
            type: "address"
          },
          {
            internalType: "contract IUniswapV3Pool",
            name: "pool",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "refundee",
            type: "address"
          }
        ],
        internalType: "struct IUniswapV3Staker.IncentiveKey",
        name: "key",
        type: "tuple"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getRewardInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256"
      },
      {
        internalType: "uint160",
        name: "secondsInsideX128",
        type: "uint160"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "incentives",
    outputs: [
      {
        internalType: "uint256",
        name: "totalRewardUnclaimed",
        type: "uint256"
      },
      {
        internalType: "uint160",
        name: "totalSecondsClaimedX128",
        type: "uint160"
      },
      {
        internalType: "uint96",
        name: "numberOfStakes",
        type: "uint96"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "maxIncentiveDuration",
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
    name: "maxIncentiveStartLeadTime",
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
    inputs: [],
    name: "nonfungiblePositionManager",
    outputs: [
      {
        internalType: "contract INonfungiblePositionManager",
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
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Minimal",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "rewards",
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
        components: [
          {
            internalType: "contract IERC20Minimal",
            name: "rewardToken",
            type: "address"
          },
          {
            internalType: "contract IUniswapV3Pool",
            name: "pool",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "refundee",
            type: "address"
          }
        ],
        internalType: "struct IUniswapV3Staker.IncentiveKey",
        name: "key",
        type: "tuple"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "stakeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "incentiveId",
        type: "bytes32"
      }
    ],
    name: "stakes",
    outputs: [
      {
        internalType: "uint160",
        name: "secondsPerLiquidityInsideInitialX128",
        type: "uint160"
      },
      {
        internalType: "uint128",
        name: "liquidity",
        type: "uint128"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "transferDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "contract IERC20Minimal",
            name: "rewardToken",
            type: "address"
          },
          {
            internalType: "contract IUniswapV3Pool",
            name: "pool",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "endTime",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "refundee",
            type: "address"
          }
        ],
        internalType: "struct IUniswapV3Staker.IncentiveKey",
        name: "key",
        type: "tuple"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "unstakeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
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
    name: "withdrawToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/staker.ts
var _Staker = class {
  constructor() {
  }
  /**
   *  To claim rewards, must unstake and then claim.
   * @param incentiveKey The unique identifier of a staking program.
   * @param options Options for producing the calldata to claim. Can't claim unless you unstake.
   * @returns The calldatas for 'unstakeToken' and 'claimReward'.
   */
  static encodeClaim(incentiveKey, options) {
    const calldatas = [];
    calldatas.push(
      encodeFunctionData({
        abi: _Staker.ABI,
        functionName: "unstakeToken",
        args: [this._encodeIncentiveKey(incentiveKey), BigInt(options.tokenId)]
      })
    );
    const recipient = validateAndParseAddress(options.recipient);
    const amount = options.amount ?? 0;
    calldatas.push(
      encodeFunctionData({
        abi: _Staker.ABI,
        functionName: "claimReward",
        args: [incentiveKey.rewardToken.address, recipient, BigInt(amount)]
      })
    );
    return calldatas;
  }
  /**
   *
   * Note:  A `tokenId` can be staked in many programs but to claim rewards and continue the program you must unstake, claim, and then restake.
   * @param incentiveKeys An IncentiveKey or array of IncentiveKeys that `tokenId` is staked in.
   * Input an array of IncentiveKeys to claim rewards for each program.
   * @param options ClaimOptions to specify tokenId, recipient, and amount wanting to collect.
   * Note that you can only specify one amount and one recipient across the various programs if you are collecting from multiple programs at once.
   * @returns
   */
  static collectRewards(incentiveKeys, options) {
    incentiveKeys = Array.isArray(incentiveKeys) ? incentiveKeys : [incentiveKeys];
    let calldatas = [];
    for (let i = 0; i < incentiveKeys.length; i++) {
      const incentiveKey = incentiveKeys[i];
      calldatas = calldatas.concat(this.encodeClaim(incentiveKey, options));
      calldatas.push(
        encodeFunctionData({
          abi: _Staker.ABI,
          functionName: "stakeToken",
          args: [this._encodeIncentiveKey(incentiveKey), BigInt(options.tokenId)]
        })
      );
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  /**
   *
   * @param incentiveKeys A list of incentiveKeys to unstake from. Should include all incentiveKeys (unique staking programs) that `options.tokenId` is staked in.
   * @param withdrawOptions Options for producing claim calldata and withdraw calldata. Can't withdraw without unstaking all programs for `tokenId`.
   * @returns Calldata for unstaking, claiming, and withdrawing.
   */
  static withdrawToken(incentiveKeys, withdrawOptions) {
    let calldatas = [];
    incentiveKeys = Array.isArray(incentiveKeys) ? incentiveKeys : [incentiveKeys];
    const claimOptions = {
      tokenId: withdrawOptions.tokenId,
      recipient: withdrawOptions.recipient,
      amount: withdrawOptions.amount
    };
    for (let i = 0; i < incentiveKeys.length; i++) {
      const incentiveKey = incentiveKeys[i];
      calldatas = calldatas.concat(this.encodeClaim(incentiveKey, claimOptions));
    }
    const owner = validateAndParseAddress(withdrawOptions.owner);
    calldatas.push(
      encodeFunctionData({
        abi: _Staker.ABI,
        functionName: "withdrawToken",
        args: [BigInt(withdrawOptions.tokenId), owner, toHex(0)]
      })
    );
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  /**
   *
   * @param incentiveKeys A single IncentiveKey or array of IncentiveKeys to be encoded and used in the data parameter in `safeTransferFrom`
   * @returns An IncentiveKey as a string
   */
  static encodeDeposit(incentiveKeys) {
    incentiveKeys = Array.isArray(incentiveKeys) ? incentiveKeys : [incentiveKeys];
    let data;
    if (incentiveKeys.length > 1) {
      const keys = [];
      for (let i = 0; i < incentiveKeys.length; i++) {
        const incentiveKey = incentiveKeys[i];
        keys.push(this._encodeIncentiveKey(incentiveKey));
      }
      data = encodeAbiParameters(parseAbiParameters([`${_Staker.INCENTIVE_KEY_ABI}[]`]), [keys]);
    } else {
      data = encodeAbiParameters(parseAbiParameters(_Staker.INCENTIVE_KEY_ABI), [
        this._encodeIncentiveKey(incentiveKeys[0])
      ]);
    }
    return data;
  }
  /**
   *
   * @param incentiveKey An `IncentiveKey` which represents a unique staking program.
   * @returns An encoded IncentiveKey to be read by viem
   */
  static _encodeIncentiveKey(incentiveKey) {
    const { token0, token1, fee } = incentiveKey.pool;
    const refundee = validateAndParseAddress(incentiveKey.refundee);
    return {
      rewardToken: incentiveKey.rewardToken.address,
      pool: Pool.getAddress(token0, token1, fee),
      startTime: BigInt(incentiveKey.startTime),
      endTime: BigInt(incentiveKey.endTime),
      refundee
    };
  }
};
var Staker = _Staker;
Staker.ABI = v3StakerABI;
Staker.INCENTIVE_KEY_ABI = "tuple(address rewardToken, address pool, uint256 startTime, uint256 endTime, address refundee)";

// src/abi/SwapRouter.ts
var swapRouterABI = [
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
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "path",
            type: "bytes"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256"
          }
        ],
        internalType: "struct ISwapRouter.ExactInputParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactInput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
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
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256"
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160"
          }
        ],
        internalType: "struct ISwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactInputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
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
            internalType: "bytes",
            name: "path",
            type: "bytes"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amountInMaximum",
            type: "uint256"
          }
        ],
        internalType: "struct ISwapRouter.ExactOutputParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactOutput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
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
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amountInMaximum",
            type: "uint256"
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160"
          }
        ],
        internalType: "struct ISwapRouter.ExactOutputSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactOutputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      }
    ],
    stateMutability: "payable",
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
        name: "_data",
        type: "bytes"
      }
    ],
    name: "pancakeV3SwapCallback",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "selfPermit",
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
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "expiry",
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
    name: "selfPermitAllowed",
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
        name: "nonce",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "expiry",
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
    name: "selfPermitAllowedIfNecessary",
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
    name: "selfPermitIfNecessary",
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
    stateMutability: "payable",
    type: "receive"
  }
];

// src/swapRouter.ts
var _SwapRouter = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  static swapCallParameters(trades, options) {
    if (!Array.isArray(trades)) {
      trades = [trades];
    }
    const sampleTrade = trades[0];
    const tokenIn = sampleTrade.inputAmount.currency.wrapped;
    const tokenOut = sampleTrade.outputAmount.currency.wrapped;
    invariant9(
      trades.every((trade) => trade.inputAmount.currency.wrapped.equals(tokenIn)),
      "TOKEN_IN_DIFF"
    );
    invariant9(
      trades.every((trade) => trade.outputAmount.currency.wrapped.equals(tokenOut)),
      "TOKEN_OUT_DIFF"
    );
    const calldatas = [];
    const ZERO_IN = CurrencyAmount.fromRawAmount(trades[0].inputAmount.currency, 0);
    const ZERO_OUT = CurrencyAmount.fromRawAmount(trades[0].outputAmount.currency, 0);
    const totalAmountOut = trades.reduce(
      (sum, trade) => sum.add(trade.minimumAmountOut(options.slippageTolerance)),
      ZERO_OUT
    );
    const mustRefund = sampleTrade.inputAmount.currency.isNative && sampleTrade.tradeType === TradeType.EXACT_OUTPUT;
    const inputIsNative = sampleTrade.inputAmount.currency.isNative;
    const outputIsNative = sampleTrade.outputAmount.currency.isNative;
    const routerMustCustody = outputIsNative || !!options.fee;
    const totalValue = inputIsNative ? trades.reduce((sum, trade) => sum.add(trade.maximumAmountIn(options.slippageTolerance)), ZERO_IN) : ZERO_IN;
    if (options.inputTokenPermit) {
      invariant9(sampleTrade.inputAmount.currency.isToken, "NON_TOKEN_PERMIT");
      calldatas.push(SelfPermit.encodePermit(sampleTrade.inputAmount.currency, options.inputTokenPermit));
    }
    const recipient = validateAndParseAddress(options.recipient);
    const deadline = BigInt(options.deadline);
    for (const trade of trades) {
      for (const { route, inputAmount, outputAmount } of trade.swaps) {
        const amountIn = BigInt(trade.maximumAmountIn(options.slippageTolerance, inputAmount).quotient);
        const amountOut = BigInt(trade.minimumAmountOut(options.slippageTolerance, outputAmount).quotient);
        const singleHop = route.pools.length === 1;
        if (singleHop) {
          if (trade.tradeType === TradeType.EXACT_INPUT) {
            const exactInputSingleParams = {
              tokenIn: route.tokenPath[0].address,
              tokenOut: route.tokenPath[1].address,
              fee: route.pools[0].fee,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline,
              amountIn,
              amountOutMinimum: amountOut,
              sqrtPriceLimitX96: BigInt(options.sqrtPriceLimitX96 ?? 0)
            };
            calldatas.push(
              encodeFunctionData({
                abi: _SwapRouter.ABI,
                functionName: "exactInputSingle",
                args: [exactInputSingleParams]
              })
            );
          } else {
            const exactOutputSingleParams = {
              tokenIn: route.tokenPath[0].address,
              tokenOut: route.tokenPath[1].address,
              fee: route.pools[0].fee,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline,
              amountOut,
              amountInMaximum: amountIn,
              sqrtPriceLimitX96: BigInt(options.sqrtPriceLimitX96 ?? 0)
            };
            calldatas.push(
              encodeFunctionData({
                abi: _SwapRouter.ABI,
                functionName: "exactOutputSingle",
                args: [exactOutputSingleParams]
              })
            );
          }
        } else {
          invariant9(options.sqrtPriceLimitX96 === void 0, "MULTIHOP_PRICE_LIMIT");
          const path = encodeRouteToPath(route, trade.tradeType === TradeType.EXACT_OUTPUT);
          if (trade.tradeType === TradeType.EXACT_INPUT) {
            const exactInputParams = {
              path,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline,
              amountIn,
              amountOutMinimum: amountOut
            };
            calldatas.push(
              encodeFunctionData({ abi: _SwapRouter.ABI, functionName: "exactInput", args: [exactInputParams] })
            );
          } else {
            const exactOutputParams = {
              path,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline,
              amountOut,
              amountInMaximum: amountIn
            };
            calldatas.push(
              encodeFunctionData({ abi: _SwapRouter.ABI, functionName: "exactOutput", args: [exactOutputParams] })
            );
          }
        }
      }
    }
    if (routerMustCustody) {
      if (options.fee) {
        if (outputIsNative) {
          calldatas.push(Payments.encodeUnwrapWETH9(totalAmountOut.quotient, recipient, options.fee));
        } else {
          calldatas.push(
            Payments.encodeSweepToken(
              sampleTrade.outputAmount.currency.wrapped,
              totalAmountOut.quotient,
              recipient,
              options.fee
            )
          );
        }
      } else {
        calldatas.push(Payments.encodeUnwrapWETH9(totalAmountOut.quotient, recipient));
      }
    }
    if (mustRefund) {
      calldatas.push(Payments.encodeRefundETH());
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(totalValue.quotient)
    };
  }
};
var SwapRouter = _SwapRouter;
// public static INTERFACE: Interface = new Interface(ISwapRouter)
SwapRouter.ABI = swapRouterABI;

// src/abi/MasterChefV3.ts
var masterChefV3ABI = [
  {
    inputs: [
      { internalType: "contract IERC20", name: "_CAKE", type: "address" },
      {
        internalType: "contract INonfungiblePositionManager",
        name: "_nonfungiblePositionManager",
        type: "address"
      },
      { internalType: "address", name: "_WETH", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [{ internalType: "uint256", name: "pid", type: "uint256" }],
    name: "DuplicatedPool",
    type: "error"
  },
  { inputs: [], name: "InconsistentAmount", type: "error" },
  { inputs: [], name: "InsufficientAmount", type: "error" },
  { inputs: [], name: "InvalidNFT", type: "error" },
  { inputs: [], name: "InvalidPeriodDuration", type: "error" },
  { inputs: [], name: "InvalidPid", type: "error" },
  { inputs: [], name: "NoBalance", type: "error" },
  { inputs: [], name: "NoLMPool", type: "error" },
  { inputs: [], name: "NoLiquidity", type: "error" },
  { inputs: [], name: "NotEmpty", type: "error" },
  { inputs: [], name: "NotOwner", type: "error" },
  { inputs: [], name: "NotOwnerOrOperator", type: "error" },
  { inputs: [], name: "NotPancakeNFT", type: "error" },
  { inputs: [], name: "WrongReceiver", type: "error" },
  { inputs: [], name: "ZeroAddress", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "pid", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "allocPoint", type: "uint256" },
      { indexed: true, internalType: "contract IPancakeV3Pool", name: "v3Pool", type: "address" },
      { indexed: true, internalType: "contract ILMPool", name: "lmPool", type: "address" }
    ],
    name: "AddPool",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "uint256", name: "pid", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "liquidity", type: "uint256" },
      { indexed: false, internalType: "int24", name: "tickLower", type: "int24" },
      { indexed: false, internalType: "int24", name: "tickUpper", type: "int24" }
    ],
    name: "Deposit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      { indexed: true, internalType: "uint256", name: "pid", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "reward", type: "uint256" }
    ],
    name: "Harvest",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "deployer", type: "address" }],
    name: "NewLMPoolDeployerAddress",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "operator", type: "address" }],
    name: "NewOperatorAddress",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "periodDuration", type: "uint256" }],
    name: "NewPeriodDuration",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "receiver", type: "address" }],
    name: "NewReceiver",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "periodNumber", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "startTime", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "endTime", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "cakePerSecond", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "cakeAmount", type: "uint256" }
    ],
    name: "NewUpkeepPeriod",
    type: "event"
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
    inputs: [{ indexed: false, internalType: "bool", name: "emergency", type: "bool" }],
    name: "SetEmergency",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "pid", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "allocPoint", type: "uint256" }
    ],
    name: "SetPool",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: "address", name: "farmBoostContract", type: "address" }],
    name: "UpdateFarmBoostContract",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "uint256", name: "pid", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" },
      { indexed: false, internalType: "int128", name: "liquidity", type: "int128" },
      { indexed: false, internalType: "int24", name: "tickLower", type: "int24" },
      { indexed: false, internalType: "int24", name: "tickUpper", type: "int24" }
    ],
    name: "UpdateLiquidity",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "uint256", name: "periodNumber", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "oldEndTime", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "newEndTime", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "remainingCake", type: "uint256" }
    ],
    name: "UpdateUpkeepPeriod",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: false, internalType: "address", name: "to", type: "address" },
      { indexed: true, internalType: "uint256", name: "pid", type: "uint256" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "Withdraw",
    type: "event"
  },
  {
    inputs: [],
    name: "BOOST_PRECISION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "CAKE",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "FARM_BOOSTER",
    outputs: [{ internalType: "contract IFarmBooster", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "LMPoolDeployer",
    outputs: [{ internalType: "contract ILMPoolDeployer", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_BOOST_PRECISION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MIN_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PERIOD_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PRECISION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_allocPoint", type: "uint256" },
      { internalType: "contract IPancakeV3Pool", name: "_v3Pool", type: "address" },
      { internalType: "bool", name: "_withUpdate", type: "bool" }
    ],
    name: "add",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "cakeAmountBelongToMC",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "amount0Max", type: "uint128" },
          { internalType: "uint128", name: "amount1Max", type: "uint128" }
        ],
        internalType: "struct INonfungiblePositionManagerStruct.CollectParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "collect",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint128", name: "amount0Max", type: "uint128" },
          { internalType: "uint128", name: "amount1Max", type: "uint128" }
        ],
        internalType: "struct INonfungiblePositionManagerStruct.CollectParams",
        name: "params",
        type: "tuple"
      },
      { internalType: "address", name: "to", type: "address" }
    ],
    name: "collectTo",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint128", name: "liquidity", type: "uint128" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" }
        ],
        internalType: "struct INonfungiblePositionManagerStruct.DecreaseLiquidityParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "decreaseLiquidity",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "emergency",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_v3Pool", type: "address" }],
    name: "getLatestPeriodInfo",
    outputs: [
      { internalType: "uint256", name: "cakePerSecond", type: "uint256" },
      { internalType: "uint256", name: "endTime", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
    name: "getLatestPeriodInfoByPid",
    outputs: [
      { internalType: "uint256", name: "cakePerSecond", type: "uint256" },
      { internalType: "uint256", name: "endTime", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "address", name: "_to", type: "address" }
    ],
    name: "harvest",
    outputs: [{ internalType: "uint256", name: "reward", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount0Desired", type: "uint256" },
          { internalType: "uint256", name: "amount1Desired", type: "uint256" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" }
        ],
        internalType: "struct INonfungiblePositionManagerStruct.IncreaseLiquidityParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "increaseLiquidity",
    outputs: [
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "latestPeriodCakePerSecond",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "latestPeriodEndTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "latestPeriodNumber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "latestPeriodStartTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
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
    name: "nonfungiblePositionManager",
    outputs: [{ internalType: "contract INonfungiblePositionManager", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" }
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "operatorAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
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
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "pendingCake",
    outputs: [{ internalType: "uint256", name: "reward", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "poolInfo",
    outputs: [
      { internalType: "uint256", name: "allocPoint", type: "uint256" },
      { internalType: "contract IPancakeV3Pool", name: "v3Pool", type: "address" },
      { internalType: "address", name: "token0", type: "address" },
      { internalType: "address", name: "token1", type: "address" },
      { internalType: "uint24", name: "fee", type: "uint24" },
      { internalType: "uint256", name: "totalLiquidity", type: "uint256" },
      { internalType: "uint256", name: "totalBoostLiquidity", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "poolLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "receiver",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "_pid", type: "uint256" },
      { internalType: "uint256", name: "_allocPoint", type: "uint256" },
      { internalType: "bool", name: "_withUpdate", type: "bool" }
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bool", name: "_emergency", type: "bool" }],
    name: "setEmergency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "contract ILMPoolDeployer", name: "_LMPoolDeployer", type: "address" }],
    name: "setLMPoolDeployer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_operatorAddress", type: "address" }],
    name: "setOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_periodDuration", type: "uint256" }],
    name: "setPeriodDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_receiver", type: "address" }],
    name: "setReceiver",
    outputs: [],
    stateMutability: "nonpayable",
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
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" }
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalAllocPoint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
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
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_newMultiplier", type: "uint256" }
    ],
    name: "updateBoostMultiplier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_newFarmBoostContract", type: "address" }],
    name: "updateFarmBoostContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "updateLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256[]", name: "pids", type: "uint256[]" }],
    name: "updatePools",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_duration", type: "uint256" },
      { internalType: "bool", name: "_withUpdate", type: "bool" }
    ],
    name: "upkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "userPositionInfos",
    outputs: [
      { internalType: "uint128", name: "liquidity", type: "uint128" },
      { internalType: "uint128", name: "boostLiquidity", type: "uint128" },
      { internalType: "int24", name: "tickLower", type: "int24" },
      { internalType: "int24", name: "tickUpper", type: "int24" },
      { internalType: "uint256", name: "rewardGrowthInside", type: "uint256" },
      { internalType: "uint256", name: "reward", type: "uint256" },
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "pid", type: "uint256" },
      { internalType: "uint256", name: "boostMultiplier", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "v3PoolAddressPid",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "address", name: "_to", type: "address" }
    ],
    name: "withdraw",
    outputs: [{ internalType: "uint256", name: "reward", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  { stateMutability: "payable", type: "receive" }
];

// src/masterchefV3.ts
var _MasterChefV3 = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line
  constructor() {
  }
  // Copy from NonfungiblePositionManager
  // Only support increaseLiquidity
  static addCallParameters(position, options) {
    invariant9(position.liquidity > ZERO$2, "ZERO_LIQUIDITY");
    const calldatas = [];
    const { amount0: amount0Desired, amount1: amount1Desired } = position.mintAmounts;
    const minimumAmounts = position.mintAmountsWithSlippage(options.slippageTolerance);
    const amount0Min = BigInt(minimumAmounts.amount0);
    const amount1Min = BigInt(minimumAmounts.amount1);
    const deadline = BigInt(options.deadline);
    invariant9(!isMint(options), "NO_MINT_SUPPORT");
    if (options.token0Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token0, options.token0Permit));
    }
    if (options.token1Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token1, options.token1Permit));
    }
    calldatas.push(
      encodeFunctionData({
        abi: _MasterChefV3.ABI,
        functionName: "increaseLiquidity",
        args: [
          {
            tokenId: BigInt(options.tokenId),
            amount0Desired,
            amount1Desired,
            amount0Min,
            amount1Min,
            deadline
          }
        ]
      })
    );
    let value = toHex(0);
    if (options.useNative) {
      const { wrapped } = options.useNative;
      invariant9(position.pool.token0.equals(wrapped) || position.pool.token1.equals(wrapped), "NO_WETH");
      const wrappedValue = position.pool.token0.equals(wrapped) ? amount0Desired : amount1Desired;
      value = toHex(wrappedValue);
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value
    };
  }
  // Copy from NonfungiblePositionManager
  static encodeCollect(options) {
    const calldatas = [];
    const tokenId = BigInt(options.tokenId);
    const involvesETH = options.expectedCurrencyOwed0.currency.isNative || options.expectedCurrencyOwed1.currency.isNative;
    const recipient = validateAndParseAddress(options.recipient);
    calldatas.push(
      encodeFunctionData({
        abi: _MasterChefV3.ABI,
        functionName: "collect",
        args: [
          {
            tokenId,
            recipient: involvesETH ? ADDRESS_ZERO : recipient,
            amount0Max: MaxUint128,
            amount1Max: MaxUint128
          }
        ]
      })
    );
    if (involvesETH) {
      const ethAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed0.quotient : options.expectedCurrencyOwed1.quotient;
      const token = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.currency : options.expectedCurrencyOwed0.currency;
      const tokenAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.quotient : options.expectedCurrencyOwed0.quotient;
      calldatas.push(Payments.encodeUnwrapWETH9(ethAmount, recipient));
      calldatas.push(Payments.encodeSweepToken(token, tokenAmount, recipient));
    }
    return calldatas;
  }
  static collectCallParameters(options) {
    const calldatas = _MasterChefV3.encodeCollect(options);
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  static removeCallParameters(position, options) {
    const calldatas = [];
    const deadline = BigInt(options.deadline);
    const tokenId = BigInt(options.tokenId);
    const partialPosition = new Position({
      pool: position.pool,
      liquidity: options.liquidityPercentage.multiply(position.liquidity).quotient,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper
    });
    invariant9(partialPosition.liquidity > ZERO$2, "ZERO_LIQUIDITY");
    const { amount0: amount0Min, amount1: amount1Min } = partialPosition.burnAmountsWithSlippage(
      options.slippageTolerance
    );
    if (options.permit) {
      throw new Error("NOT_IMPLEMENTED");
    }
    calldatas.push(
      encodeFunctionData({
        abi: _MasterChefV3.ABI,
        functionName: "decreaseLiquidity",
        args: [
          {
            tokenId,
            liquidity: partialPosition.liquidity,
            amount0Min,
            amount1Min,
            deadline
          }
        ]
      })
    );
    const { expectedCurrencyOwed0, expectedCurrencyOwed1, ...rest } = options.collectOptions;
    calldatas.push(
      ..._MasterChefV3.encodeCollect({
        tokenId: toHex(options.tokenId),
        // add the underlying value to the expected currency already owed
        expectedCurrencyOwed0: expectedCurrencyOwed0.add(
          CurrencyAmount.fromRawAmount(expectedCurrencyOwed0.currency, amount0Min)
        ),
        expectedCurrencyOwed1: expectedCurrencyOwed1.add(
          CurrencyAmount.fromRawAmount(expectedCurrencyOwed1.currency, amount1Min)
        ),
        ...rest
      })
    );
    if (rest?.recipient) {
      if (options.liquidityPercentage.equalTo(ONE$1)) {
        calldatas.push(
          encodeFunctionData({
            abi: _MasterChefV3.ABI,
            functionName: "withdraw",
            args: [tokenId, validateAndParseAddress(rest?.recipient)]
          })
        );
      } else {
        calldatas.push(
          encodeFunctionData({
            abi: _MasterChefV3.ABI,
            functionName: "harvest",
            args: [tokenId, validateAndParseAddress(rest?.recipient)]
          })
        );
      }
    }
    if (options.liquidityPercentage.equalTo(ONE$1)) {
      if (options.burnToken) {
        calldatas.push(encodeFunctionData({ abi: _MasterChefV3.ABI, functionName: "burn", args: [tokenId] }));
      }
    } else {
      invariant9(options.burnToken !== true, "CANNOT_BURN");
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  // public static updateCallParameters() {}
  static harvestCallParameters(options) {
    const calldatas = this.encodeHarvest(options);
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  static batchHarvestCallParameters(options) {
    const calldatas = options.map((option) => this.encodeHarvest(option)).flat();
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
  static encodeHarvest(options) {
    const { tokenId, to } = options;
    const calldatas = [];
    calldatas.push(
      encodeFunctionData({
        abi: _MasterChefV3.ABI,
        functionName: "harvest",
        args: [BigInt(tokenId), validateAndParseAddress(to)]
      })
    );
    return calldatas;
  }
  static withdrawCallParameters(options) {
    const { tokenId, to } = options;
    const calldatas = [];
    calldatas.push(
      encodeFunctionData({
        abi: _MasterChefV3.ABI,
        functionName: "withdraw",
        args: [BigInt(tokenId), validateAndParseAddress(to)]
      })
    );
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    };
  }
};
var MasterChefV3 = _MasterChefV3;
MasterChefV3.ABI = masterChefV3ABI;

export { ADDRESS_ZERO, DEPLOYER_ADDRESSES, FACTORY_ADDRESSES, FeeAmount, FeeCalculator, FullMath, LiquidityMath, MasterChefV3, MaxUint128, Multicall, NoTickDataProvider, NonfungiblePositionManager, POOL_INIT_CODE_HASHES, Payments, Pool, Position, PositionLibrary, PositionMath, Route, SelfPermit, SqrtPriceMath, Staker, SwapMath, SwapQuoter, SwapRouter, TICK_SPACINGS, Tick, TickLibrary, TickList, TickListDataProvider, TickMath, Trade, computePoolAddress, encodeRouteToPath, encodeSqrtRatioX96, getAmountsAtNewPrice, getAmountsByLiquidityAndPrice, getAverageLiquidity, getDependentAmount, getEstimatedLPFee, getEstimatedLPFeeByAmounts, getEstimatedLPFeeByAmountsWithProtocolFee, getEstimatedLPFeeWithProtocolFee, getLiquidityByAmountsAndPrice, getLiquidityBySingleAmount, getLiquidityFromSqrtRatioX96, getLiquidityFromTick, isMint, isSorted, masterChefV3ABI, maxLiquidityForAmounts, mostSignificantBit, nearestUsableTick, nonfungiblePositionManagerABI, parseProtocolFees, peripheryPaymentsWithFeeABI, priceToClosestTick, quoterABI, quoterV2ABI, selfPermitABI, sqrtRatioX96ToPrice, subIn256, swapRouterABI, tickToPrice, toHex, tradeComparator, v3StakerABI };
