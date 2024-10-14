'use strict';

var constants = require('@icecreamswap/constants');
var sdk = require('@pancakeswap/sdk');

// src/common.ts
var USD = constants.chains.reduce((acc, chain) => {
  if (!chain.stableToken)
    return acc;
  return {
    ...acc,
    [chain.id]: new sdk.ERC20Token(
      chain.id,
      chain.stableToken.address,
      chain.stableToken.decimals,
      chain.stableToken.symbol,
      chain.stableToken.name
    )
  };
}, {});
var STABLE_COIN = USD;
var ICE = constants.chains.reduce((acc, chain) => {
  if (!chain.iceAddress)
    return acc;
  return {
    ...acc,
    [chain.id]: new sdk.ERC20Token(
      chain.id,
      chain.iceAddress,
      18,
      "INCA",
      "IncaSwap Token",
      "https://incaswap.com"
    )
  };
}, {});

// ../utils/enumValues.ts
function* enumValues(enumObj) {
  let isStringEnum = true;
  for (const property in enumObj) {
    if (typeof enumObj[property] === "number") {
      isStringEnum = false;
      break;
    }
  }
  for (const property in enumObj) {
    if (isStringEnum || typeof enumObj[property] === "number") {
      yield enumObj[property];
    }
  }
}

// src/helpers.ts
var createEmptyList = () => {
  const list = {};
  for (const chainId of enumValues(sdk.ChainId)) {
    list[chainId] = {};
  }
  return list;
};
var EMPTY_LIST = createEmptyList();
function serializeTokens(unserializedTokens) {
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: unserializedTokens[key].serialize };
  }, {});
  return serializedTokens;
}
function unwrappedToken(token) {
  if (token && token.equals(sdk.WNATIVE[token.chainId]))
    return sdk.Native.onChain(token.chainId);
  return token;
}
var bitgertTokens = {
  wbrise: sdk.WETH9[sdk.ChainId.BITGERT],
  ice: ICE[sdk.ChainId.BITGERT],
  sps: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x1633b7157e7638C4d6593436111Bf125Ee74703F", 18, "SPS", "Splinterlands Token", "https://splinterlands.com"),
  sphynx: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x0e11DCE06eF2FeD6f78CEF5144F970E1184b4298", 18, "SPHYNX", "Sphynx BRISE"),
  bpad: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x71946a5C9dA7C95ee804a9BE561EC15A3F286A7D", 8, "BPAD", "Brisepad"),
  broge: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x41c5ae56681Fb19334eCF7d914919805DaE2Ec8f", 18, "BROGE", "BROGE"),
  brzilla: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x9b8535Dd9281e48484725bC9Eb6Ed2f66CEA2a36", 18, "BRZILLA", "BriseZilla"),
  btxt: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x1A8a039007186d7640C1D7Cd7c2606e333D04e03", 18, "BTXT", "BitsXT"),
  eltg: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xb860eCD8400600c13342a751408737235E177077", 9, "ELTG", "Graphen"),
  evo: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x267Ae4bA9CE5ef3c87629812596b0D89EcBD81dD", 18, "EVO", "EVO"),
  map: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x6D347fdCb302a5879545E01EceE7A176db23dCDa", 2, "MAP", "4D Twin Maps"),
  miidas: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x5B534A2Df329195Fd7e5c9AcA1D9ffbdA14A4963", 6, "Miidas", "Miidas NFT", "https://brise.miidas.com/"),
  mir: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x2468dad471fA7E03d8029F057cc41742F017D53d", 18, "MIR", "Mix Reality"),
  numi: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x6718e47e74497d1564EE76d832309144b83Ef8E8", 18, "NUMI", "Numitor"),
  omnia: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x5d4685c2C75581C67b9D6292A065a767bC214681", 8, "OMNIA", "OmniaVerse"),
  prds: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x31226B28add9062c5064a9Bd35eA155F323C6ca6", 9, "PRDS", "Brise Paradise"),
  rluna: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x6660A7AF57fAE695D4a10D645088aBA9fb547728", 18, "RLUNA", "Rise Luna"),
  vef: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xD6447d2fA919811c41a064bDbdaB1E281F8de9B2", 18, "VEF", "Vefi Ecosystem Token"),
  wmf: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xc89fcd3E1CF5A355fc41E160d18BAC5f624610D4", 18, "WMF", "Whale Maker Fund"),
  yogo: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xB361D5953e21Cfde5CD62B89FDf40bc21903A6bb", 18, "YOGO", "YOGO Token"),
  ypc: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x11203a00a9134Db8586381C4B2fca0816476b3FD", 18, "YPC", "Young Parrot"),
  tokyo: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x38EA4741d100cAe9700f66B194777F31919142Ee", 9, "$Tokyo", "Metaverse City Tokyo"),
  usdc: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x765277EebeCA2e31912C9946eAe1021199B39C61", 6, "USDCm", "USD Coin Multichain"),
  usdt: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D", 6, "USDTm", "Tether USD Multichain"),
  wolf: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x4Fb3DBF9111169ff60fFB8a7be1c6Fd3D4E417bC", 19, "WOLF", "Alpha Trades"),
  abr: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x9F7Bb6E8386ac9ad5e944d66fBa80F3F7231FA94", 9, "ABR", "AIBRA"),
  baskom: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x6cd08bE8Aa9B705Ca86B4923B1784C0eE06E5220", 9, "BASKOM", "Brisecom"),
  lung: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xc3b730dD10A7e9A69204bDf6cb5A426e4f1F09E3", 18, "LUNG", "LunaGens"),
  usdti: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xC7E6d7E08A89209F02af47965337714153c529F0", 18, "USDTi", "Tether USD IcecreamSwap"),
  $3dc: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x5feDA75eaB27814Cba0694C9711F7d4abEa5b0b5", 8, "$3DC", "3D City"),
  darrival: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xeB18A16A08530b811523fA49310319809ac4c979", 9, "DRV", "Darrival"),
  arco: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xbfa6394b9898566652276f1Fb40d65e75787D66f", 9, "ARCO", "Ardiansyah Crypto"),
  ethi: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xeA61Dc96F105469522d39cBF7bD59b42393678F7", 18, "ETHi", "Ether IcecreamSwap"),
  dogei: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x46a8E16dB8Bb241618873bCA21Ef02F120EA4125", 18, "DOGEi", "Dogecoin IcecreamSwap"),
  bnbi: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x74446a7418BFbFCDe3F1f6bCaFFA097d050a6dD8", 18, "BNBi", "BNB IcecreamSwap"),
  shibi: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xADF3051f6fbC1f42ee20B2eDb47EA7f6CcaBe978", 18, "SHIBi", "Shiba Inu IcecreamSwap"),
  daii: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x71Ef0A490E53Cc177F640169b0347Be4d0f23cc9", 18, "DAIi", "DAI IcecreamSwap"),
  usdci: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xaEdD3Ff7b9Fc5fc4e44d140b80f0B1C7FdB6102c", 18, "USDCi", "USD Coin IcecreamSwap"),
  busdi: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0xd0CE781960c6356A7175988751bfC8d7cd28EA60", 18, "BUSDi", "BUSD IcecreamSwap"),
  bambi: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x6C8Af2c462c4D3A487d005A6FeFBcdc95a7F5dfe", 18, "WBMBIV2", "WrappedBambiTokenV2"),
  bbi: new sdk.ERC20Token(sdk.ChainId.BITGERT, "0x43Fd2FAfa5cfcCb66d03061b59a25f02ec194d1B", 9, "BBI", "BubbleBassInu")
};
var dogechainTokens = {
  wdoge: sdk.WETH9[sdk.ChainId.DOGE],
  ice: ICE[sdk.ChainId.DOGE],
  usdt: new sdk.ERC20Token(sdk.ChainId.DOGE, "0xD2683b22287E63D22928CBe4514003a92507f474", 18, "USDT", "Tether USD")
};
var fuseTokens = {
  wfuse: sdk.WETH9[sdk.ChainId.FUSE],
  ice: ICE[sdk.ChainId.FUSE],
  doge: new sdk.ERC20Token(sdk.ChainId.FUSE, "0x12AA82525DEfF84777fa78578A68ceB854A85f43", 18, "DOGE", "DogeCoin"),
  shiba: new sdk.ERC20Token(sdk.ChainId.FUSE, "0x8687cD1d02A28098571067ddB18F33fEF667C929", 18, "SHIB", "Shiba Inu"),
  usdt: new sdk.ERC20Token(sdk.ChainId.FUSE, "0xFaDbBF8Ce7D5b7041bE672561bbA99f79c532e10", 18, "USDT", "Tether USD")
};
var xdcTokens = {
  wxdc: sdk.WETH9[sdk.ChainId.XDC],
  ice: ICE[sdk.ChainId.XDC],
  usdt: new sdk.ERC20Token(sdk.ChainId.XDC, "0xc57F0eb99363e747D637B17BBdB4e1AB85e60631", 18, "USDT", "Tether USD"),
  usdc: new sdk.ERC20Token(sdk.ChainId.XDC, "0xB25cB6a275a8D6a613228FB161eB3627b50EB696", 18, "USDC", "USD Coin"),
  btcx: new sdk.ERC20Token(sdk.ChainId.XDC, "0xb6E57fBB2D44092f75d9da2769FFc788ce931320", 8, "BTCx", "BitcoinX"),
  usplus: new sdk.ERC20Token(sdk.ChainId.XDC, "0xc280EbcD651d2a0C8D4bb49151062C9eEF55d370", 6, "US+", "USPLUS")
};
var coreTokens = {
  wcore: sdk.WETH9[sdk.ChainId.CORE],
  wcore_old: new sdk.ERC20Token(sdk.ChainId.CORE, "0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f", 18, "WCORE", "WrappedCoreOld"),
  core: new sdk.ERC20Token(sdk.ChainId.CORE, "0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f", 18, "CORE", "CORE"),
  ice: ICE[sdk.ChainId.CORE],
  score: new sdk.ERC20Token(sdk.ChainId.CORE, "0xA20b3B97df3a02f9185175760300a06B4e0A2C05", 18, "SCORE", "StakedCore", "https://icecreamswap.com"),
  usdt: new sdk.ERC20Token(sdk.ChainId.CORE, "0x81bCEa03678D1CEF4830942227720D542Aa15817", 18, "USDTi", "Tether USD (ICE Bridge)"),
  usdc: new sdk.ERC20Token(sdk.ChainId.CORE, "0xD2683b22287E63D22928CBe4514003a92507f474", 18, "USDCi", "USD Coin (ICE Bridge)"),
  eth: new sdk.ERC20Token(sdk.ChainId.CORE, "0xeF6b7BC74C9354BCf2e3F2A068e4b0B5CDf08F29", 18, "ETH", "Ether"),
  bnb: new sdk.ERC20Token(sdk.ChainId.CORE, "0x12AA82525DEfF84777fa78578A68ceB854A85f43", 18, "BNB", "BNB"),
  huc: new sdk.ERC20Token(sdk.ChainId.CORE, "0x5EE2c2aE144218b52CF756c0907bA384C7E35fba", 18, "HUC", "Hobo Universe"),
  aicore: new sdk.ERC20Token(sdk.ChainId.CORE, "0x7621c97683A3b0499EC156bD257E44175e793bb1", 9, "AICore", "AI CORE TOKEN"),
  bcore: new sdk.ERC20Token(sdk.ChainId.CORE, "0xBFa14641bf0fE84dE3fcf3Bf227900af445f09C3", 18, "Bcore", "Big Core"),
  bcore_new: new sdk.ERC20Token(sdk.ChainId.CORE, "0x165290C62126083E31345Ebd74606eB562cDdD66", 9, "Bcore", "BigCore", "https://bigcoreproject.wixsite.com/bigcore"),
  kishu: new sdk.ERC20Token(sdk.ChainId.CORE, "0xb2172C92e22F09Bc7d15C4B1790c7704f8429d14", 18, "CKISHU", "Core Kishu"),
  gte: new sdk.ERC20Token(sdk.ChainId.CORE, "0xdA7dAA9a07ef5070dB671307fEa819c75d2D6cE3", 18, "GTE", "Goatge"),
  word: new sdk.ERC20Token(sdk.ChainId.CORE, "0xAA7912C028E058e4bD90Bcbb9fB41C27DbcC3245", 6, "WORD", "StarlyBooks"),
  cshib: new sdk.ERC20Token(sdk.ChainId.CORE, "0x751669F3dCE1ED1c449dE44889365E40F13ce57f", 9, "CoreShib", "CoreShib"),
  ctomb: new sdk.ERC20Token(sdk.ChainId.CORE, "0xC830a752eef79F2D66a36645A70fB0bA176b4Cea", 18, "CTOMB", "CoreTomb"),
  cshare: new sdk.ERC20Token(sdk.ChainId.CORE, "0x6501cCA79ca8D6F68784f2345c9a379951e30A05", 18, "CSHARE", "CoreShare"),
  lung: new sdk.ERC20Token(sdk.ChainId.CORE, "0xE8b0dF74192CCA9C4de66F23653476f6e6CD1d98", 18, "LUNG", "LunaGens"),
  hobo: new sdk.ERC20Token(sdk.ChainId.CORE, "0x25100C0083e8E53b1cb264E978522bd477011A0d", 18, "HOBO", "Hobo Universe"),
  coreshiba: new sdk.ERC20Token(sdk.ChainId.CORE, "0x84F0FDAA0a34B5F4a1144372072a706A4A8121A4", 18, "SHIBA", "ShibaCore"),
  usdtrain: new sdk.ERC20Token(sdk.ChainId.CORE, "0xFB59984Fd355C60064fcb191C0Ed817F1365eec0", 18, "USDTRAIN", "USDT Rain"),
  fsxm: new sdk.ERC20Token(sdk.ChainId.CORE, "0x5aE225fa6573903CA58E26Cd4171B87060CeEAA2", 18, "FSXM", "FlashX Max"),
  royale: new sdk.ERC20Token(sdk.ChainId.CORE, "0xA7c0B19645B653B4373E3592C84fce8C64D89E8F", 18, "ROYALE", "MemeRoyale"),
  cfee: new sdk.ERC20Token(sdk.ChainId.CORE, "0x7241C79C5Bf1C69eA6f0F8FAF2dFB30e37EF0820", 8, "CFEE", "Coffee Crypto"),
  usdtl0: new sdk.ERC20Token(sdk.ChainId.CORE, "0x900101d06A7426441Ae63e9AB3B9b0F63Be145F1", 6, "USDT", "Tether USD (CORE Bridge)"),
  usdcl0: new sdk.ERC20Token(sdk.ChainId.CORE, "0xa4151B2B3e269645181dCcF2D426cE75fcbDeca9", 6, "USDC", "USD Coin (CORE Bridge)"),
  btv: new sdk.ERC20Token(sdk.ChainId.CORE, "0xE8dEC1bFC7BF572D60403c609d6589715d2a23fC", 8, "BTV", "Bitvexa Network"),
  woof: new sdk.ERC20Token(sdk.ChainId.CORE, "0x5C44d3D2312AbA4d5F2406A98Bf374Bc76455092", 18, "WOOF", "WOOF"),
  miidas: new sdk.ERC20Token(sdk.ChainId.CORE, "0xcfd38184c30832917A2871695F91e5e61bBD41fF", 6, "Miidas", "Miidas NFT"),
  block: new sdk.ERC20Token(sdk.ChainId.CORE, "0xbFf24592345094DFA4d6f75aFF5BE79AbCbC9bD9", 8, "BLOCK", "BlockVerse"),
  ucore: new sdk.ERC20Token(sdk.ChainId.CORE, "0x496Bb259D0117E89B2e73433524e9838c3073e60", 18, "UCORE", "UnityCore"),
  crystal: new sdk.ERC20Token(sdk.ChainId.CORE, "0x005133502d02ddDe90D5f5283E4Af0F33A4a4db2", 18, "CRYSTAL", "CRYSTAL STONES"),
  maxi: new sdk.ERC20Token(sdk.ChainId.CORE, "0xDd5d49910c5D475c984EE891A928De6658d2042d", 18, "MAXL", "Maxi Protocol"),
  cmct: new sdk.ERC20Token(sdk.ChainId.CORE, "0x9EcC5C0179F02d2e8dBdaEbC8a6fC2B544ded9ba", 18, "CMCT", "CoinMarketCart"),
  but: new sdk.ERC20Token(sdk.ChainId.CORE, "0x40FFb9CCEA71c7E3b34593E83Aa362388f2fB4dC", 18, "BUT", "Butros"),
  bliz: new sdk.ERC20Token(sdk.ChainId.CORE, "0xd33b7081aEBA462333356757BFC78Bc000F6b1f4", 18, "BLIZ", "BLIZZARD CORP."),
  asi: new sdk.ERC20Token(sdk.ChainId.CORE, "0xEF51585D985bad6818C8aD7BA6D70cCf6D216c89", 18, "ASI", "Asi Core"),
  musk: new sdk.ERC20Token(sdk.ChainId.CORE, "0x154B5D670Ee6BA945B20A343d68Dff29720e9170", 18, "MUSK 2.0", "MUSK 2.0"),
  kigu: new sdk.ERC20Token(sdk.ChainId.CORE, "0xB0Da4ae4e087DCE159AE1C2d6C6f502e902516A1", 8, "KIGU", "Kigurumi"),
  cts: new sdk.ERC20Token(sdk.ChainId.CORE, "0x4225A3C57B2622f270D32C12e8135a095ED2dAf6", 18, "CTS", "Coretoshis"),
  kice: new sdk.ERC20Token(sdk.ChainId.CORE, "0xB946F9eB7556F41e825C535a052fbE23d3D04358", 18, "KICE", "ICE KING"),
  cBTC: new sdk.ERC20Token(sdk.ChainId.CORE, "0xb30692a602A22b7074FfA997b342eE7deEC6E85E", 18, "cBTC", "CoretoshisBTC"),
  hice: new sdk.ERC20Token(sdk.ChainId.CORE, "0xEcf2AdDc7267D65fBa77A8cFB23a9160B435fa31", 18, "HICE", "HOLD ICE"),
  gator: new sdk.ERC20Token(sdk.ChainId.CORE, "0xa386c445fb7219bFC37674D9fed086817dDF79BB", 9, "GATOR", "GATOR INU"),
  btcb: new sdk.ERC20Token(sdk.ChainId.CORE, "0x2297aEbD383787A160DD0d9F71508148769342E3", 8, "BTC.b", "Bitcoin"),
  youngparrot: new sdk.ERC20Token(sdk.ChainId.CORE, "0xf15fBa1E7112d680055962fB85a0C04550f24097", 18, "YPC", "YoungParrot"),
  pipi: new sdk.ERC20Token(sdk.ChainId.CORE, "0x3034802fc4C9A278D0886eD77fd3F79fd789c898", 18, "PIPI", "PIPI_LOL"),
  cdao: new sdk.ERC20Token(sdk.ChainId.CORE, "0x42077e348702f13Ea80CE6a6A38b8b60fbb37B5d", 18, "cDAO", "cDAO"),
  koci: new sdk.ERC20Token(sdk.ChainId.CORE, "0x6C0eEB2B306e1c7ec699E618031cA5C7Fb0363ab", 18, "KOCI", "KING OCICAT"),
  ceth: new sdk.ERC20Token(sdk.ChainId.CORE, "0xfA9975c36Ae3D983EE44c02fF7bB4AEe1A4493ac", 18, "cETH", "CoretoshisETH"),
  ripple: new sdk.ERC20Token(sdk.ChainId.CORE, "0x54e89D1C0D7B246ecaED450eF6d1d8C7B45EC3B6", 18, "3RPL", "3RIPLE COIN"),
  life: new sdk.ERC20Token(sdk.ChainId.CORE, "0x01F37fa58f316Cbb9B01Da817E5b61236f4CE82d", 18, "LIFE", "SHADOW LIFE"),
  freecore: new sdk.ERC20Token(sdk.ChainId.CORE, "0x2898aD472234C27163b99191d8D77bfC8bB7356D", 18, "FCD", "FreeCoreDaoCom"),
  asx: new sdk.ERC20Token(sdk.ChainId.CORE, "0xB28B43209d9de61306172Af0320f4f55e50E2f29", 18, "ASX", "ASX"),
  cctr: new sdk.ERC20Token(sdk.ChainId.CORE, "0x811af333E431f4a6283bFbB1E0cD244715FD9C54", 8, "CCTR", "Corecuties Refection"),
  pump: new sdk.ERC20Token(sdk.ChainId.CORE, "0x1483A469EF2C5B7DD2cb1B9174b01545C9a7fb69", 18, "PUMP", "Pumpkin Cat"),
  laugh: new sdk.ERC20Token(sdk.ChainId.CORE, "0xAd52f7099EeD91ddaA4614292f9090920aF00936", 18, "LAUGH", "LAUGH KOIN"),
  dogwif: new sdk.ERC20Token(sdk.ChainId.CORE, "0xc69b776f39006a7Fb864af5A673FffF0B2b51CFf", 18, "WIF", "DogWifCORE"),
  coreBTC: new sdk.ERC20Token(sdk.ChainId.CORE, "0x8034aB88C3512246Bf7894f57C834DdDBd1De01F", 8, "COREBTC", "Core Wrapped BTC"),
  solvBtcm: new sdk.ERC20Token(sdk.ChainId.CORE, "0xe04d21d999FaEDf1e72AdE6629e20A11a1ed14FA", 18, "SolvBTC.m", "Free Bridged SolvBTC.m"),
  solvBtcb: new sdk.ERC20Token(sdk.ChainId.CORE, "0x5B1Fb849f1F76217246B8AAAC053b5C7b15b7dc3", 18, "SolvBTC.b", "Free Bridged SolvBTC.b"),
  stCore: new sdk.ERC20Token(sdk.ChainId.CORE, "0xb3A8F0f0da9ffC65318aA39E55079796093029AD", 18, "stCORE", "Liquid staked CORE")
};
var xodexTokens = {
  wxodex: sdk.WETH9[sdk.ChainId.XODEX],
  ice: ICE[sdk.ChainId.XODEX],
  usdt: new sdk.ERC20Token(sdk.ChainId.XODEX, "0x54051D9DbE99687867090d95fe15C3D3E35512Ba", 18, "USDT", "Tether USD")
};
var shardeumTestnetTokens = {
  wshm: sdk.WETH9[sdk.ChainId.SHARDEUM_TEST],
  ice: ICE[sdk.ChainId.SHARDEUM_TEST],
  usdt: new sdk.ERC20Token(sdk.ChainId.SHARDEUM_TEST, "0x43891084581fD07Ee1189f3a2f04e51c26a95B77", 18, "USDT", "Tether USD")
};
var telosTokens = {
  wtlos: sdk.WETH9[sdk.ChainId.TELOS],
  ice: ICE[sdk.ChainId.TELOS],
  usdt: new sdk.ERC20Token(sdk.ChainId.TELOS, "0xc57F0eb99363e747D637B17BBdB4e1AB85e60631", 18, "USDT", "Tether USD"),
  usdt_m: new sdk.ERC20Token(sdk.ChainId.TELOS, "0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73", 18, "USDT", "Tether USD (Multichain.org)"),
  usdc_m: new sdk.ERC20Token(sdk.ChainId.TELOS, "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b", 18, "USDC", "Circle USD (Multichain.org)")
};
var shimmerTestnetTokens = {
  wsmr: sdk.WETH9[sdk.ChainId.SHIMMER_TEST],
  ice: ICE[sdk.ChainId.SHIMMER_TEST],
  usdt: new sdk.ERC20Token(sdk.ChainId.SHIMMER_TEST, "0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44", 18, "USDT", "Tether USD")
};
var baseTokens = {
  weth: sdk.WETH9[sdk.ChainId.BASE],
  ice: ICE[sdk.ChainId.BASE],
  usdt: new sdk.ERC20Token(sdk.ChainId.BASE, "0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44", 18, "USDT", "Tether USD")
};
var shimmerTokens = {
  wsmr: sdk.WETH9[sdk.ChainId.SHIMMER],
  ice: ICE[sdk.ChainId.SHIMMER],
  usdt: new sdk.ERC20Token(sdk.ChainId.SHIMMER, "0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44", 18, "USDT", "Tether USD")
};
var blastTokens = {
  weth: sdk.WETH9[sdk.ChainId.BLAST],
  ice: ICE[sdk.ChainId.BLAST],
  usdb: new sdk.ERC20Token(sdk.ChainId.BLAST, "0x4300000000000000000000000000000000000003", 18, "USDT", "Blast USD"),
  ice_b: new sdk.ERC20Token(sdk.ChainId.BLAST, "0x24cb308a4e2F3a4352F513681Bd0c31a0bd3BA31", 18, "ICE_B", "IceCream[Blast]", "https://icecreamswap.com")
};
var scrollTokens = {
  weth: sdk.WETH9[sdk.ChainId.SCROLL],
  ice: ICE[sdk.ChainId.SCROLL],
  usdt: new sdk.ERC20Token(sdk.ChainId.SCROLL, "0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44", 18, "USDT", "Tether USD")
};
var neonTokens = {
  wneon: sdk.WETH9[sdk.ChainId.NEON],
  ice: ICE[sdk.ChainId.NEON],
  usdt: new sdk.ERC20Token(sdk.ChainId.NEON, "0xc0E49f8C615d3d4c245970F6Dc528E4A47d69a44", 18, "USDT", "Tether USD"),
  chonk: new sdk.ERC20Token(sdk.ChainId.NEON, "0xF335ae40F387Bdc60477F0B306326A233D35227f", 18, "CHONK", "NeonChonk")
};
var qitmeerTokens = {
  wmeer: sdk.WETH9[sdk.ChainId.QITMEER],
  ice: new sdk.ERC20Token(sdk.ChainId.QITMEER, "0xd65CceCFf339e5680b1A1E7821421932cc2b114f", 18, "ICE", "IceCream", "https://icecreamswap.com"),
  usdt: new sdk.ERC20Token(sdk.ChainId.QITMEER, "0x7D5a56742C082FcDfc240cd7D1775f00e059771F", 18, "USDT", "Tether USD")
};
var degenTokens = {
  wdegen: sdk.WETH9[sdk.ChainId.DEGEN],
  ice: ICE[sdk.ChainId.DEGEN],
  usdt: USD[sdk.ChainId.DEGEN]
};
var bobTokens = {
  weth: sdk.WETH9[sdk.ChainId.BOB]
};
var bobaTokens = {
  weth: sdk.WETH9[sdk.ChainId.BOBA],
  ice: ICE[sdk.ChainId.BOBA],
  usdt: new sdk.ERC20Token(sdk.ChainId.BOBA, "0x7D5a56742C082FcDfc240cd7D1775f00e059771F", 18, "USDT", "Tether USD"),
  boba: new sdk.ERC20Token(sdk.ChainId.BOBA, "0xa18bF3994C0Cc6E3b63ac420308E5383f53120D7", 18, "BOBA", "Boba Token"),
  usdc: new sdk.ERC20Token(sdk.ChainId.BOBA, "0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc", 6, "USDC", "USD Coin")
};

// src/index.ts
var bscTokens = {};

exports.EMPTY_LIST = EMPTY_LIST;
exports.ICE = ICE;
exports.STABLE_COIN = STABLE_COIN;
exports.USD = USD;
exports.baseTokens = baseTokens;
exports.bitgertTokens = bitgertTokens;
exports.blastTokens = blastTokens;
exports.bobTokens = bobTokens;
exports.bobaTokens = bobaTokens;
exports.bscTokens = bscTokens;
exports.coreTokens = coreTokens;
exports.degenTokens = degenTokens;
exports.dogechainTokens = dogechainTokens;
exports.fuseTokens = fuseTokens;
exports.neonTokens = neonTokens;
exports.qitmeerTokens = qitmeerTokens;
exports.scrollTokens = scrollTokens;
exports.serializeTokens = serializeTokens;
exports.shardeumTestnetTokens = shardeumTestnetTokens;
exports.shimmerTestnetTokens = shimmerTestnetTokens;
exports.shimmerTokens = shimmerTokens;
exports.telosTokens = telosTokens;
exports.unwrappedToken = unwrappedToken;
exports.xdcTokens = xdcTokens;
exports.xodexTokens = xodexTokens;
