'use strict';

var invariant5 = require('tiny-invariant');
var _Decimal = require('decimal.js-light');
var _Big = require('big.js');
var toFormat = require('toformat');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var invariant5__default = /*#__PURE__*/_interopDefault(invariant5);
var _Decimal__default = /*#__PURE__*/_interopDefault(_Decimal);
var _Big__default = /*#__PURE__*/_interopDefault(_Big);
var toFormat__default = /*#__PURE__*/_interopDefault(toFormat);

// src/constants.ts
var TradeType = /* @__PURE__ */ ((TradeType2) => {
  TradeType2[TradeType2["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType2[TradeType2["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
  return TradeType2;
})(TradeType || {});
var Rounding = /* @__PURE__ */ ((Rounding2) => {
  Rounding2[Rounding2["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding2[Rounding2["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding2[Rounding2["ROUND_UP"] = 2] = "ROUND_UP";
  return Rounding2;
})(Rounding || {});
var MINIMUM_LIQUIDITY = 1000n;
var ZERO = 0n;
var ONE = 1n;
var TWO = 2n;
var THREE = 3n;
var FIVE = 5n;
var TEN = 10n;
var _100 = 100n;
var _9975 = 9975n;
var _10000 = 10000n;
var MaxUint256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var VMType = /* @__PURE__ */ ((VMType3) => {
  VMType3["uint8"] = "uint8";
  VMType3["uint256"] = "uint256";
  return VMType3;
})(VMType || {});
var VM_TYPE_MAXIMA = {
  ["uint8" /* uint8 */]: BigInt("0xff"),
  ["uint256" /* uint256 */]: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
};

// src/baseCurrency.ts
var BaseCurrency = class {
  /**
   * Constructs an instance of the base class `BaseCurrency`.
   * @param chainId the chain ID on which this currency resides
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  constructor(chainId, decimals, symbol, name) {
    if (!Number.isSafeInteger(chainId))
      throw new Error("CHAIN_ID");
    if (!(decimals >= 0 && decimals < 255 && Number.isInteger(decimals)))
      throw new Error("DECIMALS");
    this.chainId = chainId;
    this.decimals = decimals;
    this.symbol = symbol;
    this.name = name;
  }
};
var Decimal = toFormat__default.default(_Decimal__default.default);
var Big = toFormat__default.default(_Big__default.default);
var toSignificantRounding = {
  [0 /* ROUND_DOWN */]: Decimal.ROUND_DOWN,
  [1 /* ROUND_HALF_UP */]: Decimal.ROUND_HALF_UP,
  [2 /* ROUND_UP */]: Decimal.ROUND_UP
};
var toFixedRounding = {
  [0 /* ROUND_DOWN */]: 0 /* RoundDown */,
  [1 /* ROUND_HALF_UP */]: 1 /* RoundHalfUp */,
  [2 /* ROUND_UP */]: 3 /* RoundUp */
};
var Fraction = class {
  constructor(numerator, denominator = 1n) {
    this.numerator = BigInt(numerator);
    this.denominator = BigInt(denominator);
  }
  static tryParseFraction(fractionish) {
    if (typeof fractionish === "bigint" || typeof fractionish === "number" || typeof fractionish === "string")
      return new Fraction(fractionish);
    if ("numerator" in fractionish && "denominator" in fractionish)
      return fractionish;
    throw new Error("Could not parse fraction");
  }
  // performs floor division
  get quotient() {
    return this.numerator / this.denominator;
  }
  // remainder after floor division
  get remainder() {
    return new Fraction(this.numerator % this.denominator, this.denominator);
  }
  invert() {
    return new Fraction(this.denominator, this.numerator);
  }
  add(other) {
    const otherParsed = Fraction.tryParseFraction(other);
    if (this.denominator === otherParsed.denominator) {
      return new Fraction(this.numerator + otherParsed.numerator, this.denominator);
    }
    return new Fraction(
      this.numerator * otherParsed.denominator + otherParsed.numerator * this.denominator,
      this.denominator * otherParsed.denominator
    );
  }
  subtract(other) {
    const otherParsed = Fraction.tryParseFraction(other);
    if (this.denominator === otherParsed.denominator) {
      return new Fraction(this.numerator - otherParsed.numerator, this.denominator);
    }
    return new Fraction(
      this.numerator * otherParsed.denominator - otherParsed.numerator * this.denominator,
      this.denominator * otherParsed.denominator
    );
  }
  lessThan(other) {
    const otherParsed = Fraction.tryParseFraction(other);
    return this.numerator * otherParsed.denominator < otherParsed.numerator * this.denominator;
  }
  equalTo(other) {
    const otherParsed = Fraction.tryParseFraction(other);
    return this.numerator * otherParsed.denominator === otherParsed.numerator * this.denominator;
  }
  greaterThan(other) {
    const otherParsed = Fraction.tryParseFraction(other);
    return this.numerator * otherParsed.denominator > otherParsed.numerator * this.denominator;
  }
  multiply(other) {
    const otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(this.numerator * otherParsed.numerator, this.denominator * otherParsed.denominator);
  }
  divide(other) {
    const otherParsed = Fraction.tryParseFraction(other);
    return new Fraction(this.numerator * otherParsed.denominator, this.denominator * otherParsed.numerator);
  }
  toSignificant(significantDigits, format = { groupSeparator: "" }, rounding = 1 /* ROUND_HALF_UP */) {
    invariant5__default.default(Number.isInteger(significantDigits), `${significantDigits} is not an integer.`);
    invariant5__default.default(significantDigits > 0, `${significantDigits} is not positive.`);
    Decimal.set({ precision: significantDigits + 1, rounding: toSignificantRounding[rounding] });
    const quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  }
  toFixed(decimalPlaces, format = { groupSeparator: "" }, rounding = 1 /* ROUND_HALF_UP */) {
    invariant5__default.default(Number.isInteger(decimalPlaces), `${decimalPlaces} is not an integer.`);
    invariant5__default.default(decimalPlaces >= 0, `${decimalPlaces} is negative.`);
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  }
  /**
   * Helper method for converting any super class back to a fraction
   */
  get asFraction() {
    return new Fraction(this.numerator, this.denominator);
  }
};

// src/fractions/percent.ts
var ONE_HUNDRED = new Fraction(100n);
function toPercent(fraction) {
  return new Percent(fraction.numerator, fraction.denominator);
}
var Percent = class extends Fraction {
  constructor() {
    super(...arguments);
    /**
     * This boolean prevents a fraction from being interpreted as a Percent
     */
    this.isPercent = true;
  }
  add(other) {
    return toPercent(super.add(other));
  }
  subtract(other) {
    return toPercent(super.subtract(other));
  }
  multiply(other) {
    return toPercent(super.multiply(other));
  }
  divide(other) {
    return toPercent(super.divide(other));
  }
  toSignificant(significantDigits = 5, format, rounding) {
    return super.multiply(ONE_HUNDRED).toSignificant(significantDigits, format, rounding);
  }
  toFixed(decimalPlaces = 2, format, rounding) {
    return super.multiply(ONE_HUNDRED).toFixed(decimalPlaces, format, rounding);
  }
};
var Big2 = toFormat__default.default(_Big__default.default);
var CurrencyAmount = class extends Fraction {
  constructor(currency, numerator, denominator) {
    super(numerator, denominator);
    invariant5__default.default(this.quotient <= MaxUint256, "AMOUNT");
    this.currency = currency;
    this.decimalScale = 10n ** BigInt(currency.decimals);
  }
  /**
   * Returns a new currency amount instance from the unitless amount of token, i.e. the raw amount
   * @param currency the currency in the amount
   * @param rawAmount the raw token or ether amount
   */
  static fromRawAmount(currency, rawAmount) {
    return new CurrencyAmount(currency, rawAmount);
  }
  /**
   * Construct a currency amount with a denominator that is not equal to 1
   * @param currency the currency
   * @param numerator the numerator of the fractional token amount
   * @param denominator the denominator of the fractional token amount
   */
  static fromFractionalAmount(currency, numerator, denominator) {
    return new CurrencyAmount(currency, numerator, denominator);
  }
  add(other) {
    invariant5__default.default(this.currency.equals(other.currency), "CURRENCY");
    const added = super.add(other);
    return CurrencyAmount.fromFractionalAmount(this.currency, added.numerator, added.denominator);
  }
  subtract(other) {
    invariant5__default.default(this.currency.equals(other.currency), "CURRENCY");
    const subtracted = super.subtract(other);
    return CurrencyAmount.fromFractionalAmount(this.currency, subtracted.numerator, subtracted.denominator);
  }
  multiply(other) {
    const multiplied = super.multiply(other);
    return CurrencyAmount.fromFractionalAmount(this.currency, multiplied.numerator, multiplied.denominator);
  }
  divide(other) {
    const divided = super.divide(other);
    return CurrencyAmount.fromFractionalAmount(this.currency, divided.numerator, divided.denominator);
  }
  toSignificant(significantDigits = 6, format, rounding = 0 /* ROUND_DOWN */) {
    return super.divide(this.decimalScale).toSignificant(significantDigits, format, rounding);
  }
  toFixed(decimalPlaces = this.currency.decimals, format, rounding = 0 /* ROUND_DOWN */) {
    invariant5__default.default(decimalPlaces <= this.currency.decimals, "DECIMALS");
    return super.divide(this.decimalScale).toFixed(decimalPlaces, format, rounding);
  }
  toExact(format = { groupSeparator: "" }) {
    Big2.DP = this.currency.decimals;
    return new Big2(this.quotient.toString()).div(this.decimalScale.toString()).toFormat(format);
  }
  get wrapped() {
    if (this.currency.isToken)
      return this;
    return CurrencyAmount.fromFractionalAmount(this.currency.wrapped, this.numerator, this.denominator);
  }
};
var Price = class extends Fraction {
  // used to adjust the raw fraction w/r/t the decimals of the {base,quote}Token
  /**
   * Construct a price, either with the base and quote currency amount, or the
   * @param args
   */
  constructor(...args) {
    let baseCurrency;
    let quoteCurrency;
    let denominator;
    let numerator;
    if (args.length === 4) {
      [baseCurrency, quoteCurrency, denominator, numerator] = args;
    } else {
      const result = args[0].quoteAmount.divide(args[0].baseAmount);
      [baseCurrency, quoteCurrency, denominator, numerator] = [
        args[0].baseAmount.currency,
        args[0].quoteAmount.currency,
        result.denominator,
        result.numerator
      ];
    }
    super(numerator, denominator);
    this.baseCurrency = baseCurrency;
    this.quoteCurrency = quoteCurrency;
    this.scalar = new Fraction(10n ** BigInt(baseCurrency.decimals), 10n ** BigInt(quoteCurrency.decimals));
  }
  /**
   * Flip the price, switching the base and quote currency
   */
  invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  }
  /**
   * Multiply the price by another price, returning a new price. The other price must have the same base currency as this price's quote currency
   * @param other the other price
   */
  multiply(other) {
    invariant5__default.default(this.quoteCurrency.equals(other.baseCurrency), "TOKEN");
    const fraction = super.multiply(other);
    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  }
  /**
   * Return the amount of quote currency corresponding to a given amount of the base currency
   * @param currencyAmount the amount of base currency to quote against the price
   */
  quote(currencyAmount) {
    invariant5__default.default(currencyAmount.currency.equals(this.baseCurrency), "TOKEN");
    const result = super.multiply(currencyAmount);
    return CurrencyAmount.fromFractionalAmount(this.quoteCurrency, result.numerator, result.denominator);
  }
  /**
   * Get the value scaled by decimals for formatting
   * @private
   */
  get adjustedForDecimals() {
    return super.multiply(this.scalar);
  }
  toSignificant(significantDigits = 6, format, rounding) {
    return this.adjustedForDecimals.toSignificant(significantDigits, format, rounding);
  }
  toFixed(decimalPlaces = 4, format, rounding) {
    return this.adjustedForDecimals.toFixed(decimalPlaces, format, rounding);
  }
};

// src/nativeCurrency.ts
var NativeCurrency = class extends BaseCurrency {
  constructor() {
    super(...arguments);
    this.isNative = true;
    this.isToken = false;
  }
};
var Token = class extends BaseCurrency {
  constructor(chainId, address, decimals, symbol, name, projectLink) {
    super(chainId, decimals, symbol, name);
    this.isNative = false;
    this.isToken = true;
    this.address = address;
    this.projectLink = projectLink;
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
    invariant5__default.default(this.chainId === other.chainId, "CHAIN_IDS");
    invariant5__default.default(this.address !== other.address, "ADDRESSES");
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

// src/errors.ts
var CAN_SET_PROTOTYPE = "setPrototypeOf" in Object;
var InsufficientReservesError = class extends Error {
  constructor() {
    super();
    this.isInsufficientReservesError = true;
    this.name = this.constructor.name;
    if (CAN_SET_PROTOTYPE)
      Object.setPrototypeOf(this, new.target.prototype);
  }
};
var InsufficientInputAmountError = class extends Error {
  constructor() {
    super();
    this.isInsufficientInputAmountError = true;
    this.name = this.constructor.name;
    if (CAN_SET_PROTOTYPE)
      Object.setPrototypeOf(this, new.target.prototype);
  }
};
function validateVMTypeInstance(value, vmType) {
  invariant5__default.default(value >= ZERO, `${value} is not a ${vmType}.`);
  invariant5__default.default(value <= VM_TYPE_MAXIMA[vmType], `${value} is not a ${vmType}.`);
}
function sqrt(y) {
  invariant5__default.default(y >= ZERO, "NEGATIVE");
  let z = ZERO;
  let x;
  if (y > THREE) {
    z = y;
    x = y / TWO + ONE;
    while (x < z) {
      z = x;
      x = (y / x + x) / TWO;
    }
  } else if (y !== ZERO) {
    z = ONE;
  }
  return z;
}
function sortedInsert(items, add, maxSize, comparator) {
  invariant5__default.default(maxSize > 0, "MAX_SIZE_ZERO");
  invariant5__default.default(items.length <= maxSize, "ITEMS_SIZE");
  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    const isFull = items.length === maxSize;
    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }
    let lo = 0, hi = items.length;
    while (lo < hi) {
      const mid = lo + hi >>> 1;
      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}
function computePriceImpact(midPrice, inputAmount, outputAmount) {
  const quotedOutputAmount = midPrice.quote(inputAmount);
  const priceImpact = quotedOutputAmount.subtract(outputAmount).divide(quotedOutputAmount);
  return new Percent(priceImpact.numerator, priceImpact.denominator);
}
function balanceComparator(balanceA, balanceB) {
  if (balanceA && balanceB) {
    return balanceA.greaterThan(balanceB) ? -1 : balanceA.equalTo(balanceB) ? 0 : 1;
  }
  if (balanceA && balanceA.greaterThan("0")) {
    return -1;
  }
  if (balanceB && balanceB.greaterThan("0")) {
    return 1;
  }
  return 0;
}
function getTokenComparator(balances) {
  return function sortTokens(tokenA, tokenB) {
    const balanceA = balances[tokenA.address];
    const balanceB = balances[tokenB.address];
    const balanceComp = balanceComparator(balanceA, balanceB);
    if (balanceComp !== 0)
      return balanceComp;
    if (tokenA.symbol && tokenB.symbol) {
      return tokenA.symbol.toLowerCase() < tokenB.symbol.toLowerCase() ? -1 : 1;
    }
    return tokenA.symbol ? -1 : tokenB.symbol ? -1 : 0;
  };
}

exports.BaseCurrency = BaseCurrency;
exports.CurrencyAmount = CurrencyAmount;
exports.FIVE = FIVE;
exports.Fraction = Fraction;
exports.InsufficientInputAmountError = InsufficientInputAmountError;
exports.InsufficientReservesError = InsufficientReservesError;
exports.MINIMUM_LIQUIDITY = MINIMUM_LIQUIDITY;
exports.MaxUint256 = MaxUint256;
exports.NativeCurrency = NativeCurrency;
exports.ONE = ONE;
exports.Percent = Percent;
exports.Price = Price;
exports.Rounding = Rounding;
exports.TEN = TEN;
exports.THREE = THREE;
exports.TWO = TWO;
exports.Token = Token;
exports.TradeType = TradeType;
exports.VMType = VMType;
exports.VM_TYPE_MAXIMA = VM_TYPE_MAXIMA;
exports.ZERO = ZERO;
exports._100 = _100;
exports._10000 = _10000;
exports._9975 = _9975;
exports.computePriceImpact = computePriceImpact;
exports.getTokenComparator = getTokenComparator;
exports.sortedInsert = sortedInsert;
exports.sqrt = sqrt;
exports.validateVMTypeInstance = validateVMTypeInstance;
