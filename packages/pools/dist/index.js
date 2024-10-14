'use strict';

var constants = require('@icecreamswap/constants');
var sdk = require('@pancakeswap/sdk');
var tokens = require('@pancakeswap/tokens');
var BigNumber7 = require('bignumber.js');
var fromPairs2 = require('lodash/fromPairs');
var chunk = require('lodash/chunk');
var wagmi = require('wagmi');
var viem = require('viem');
var uniq = require('lodash/uniq');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var BigNumber7__default = /*#__PURE__*/_interopDefault(BigNumber7);
var fromPairs2__default = /*#__PURE__*/_interopDefault(fromPairs2);
var chunk__default = /*#__PURE__*/_interopDefault(chunk);
var uniq__default = /*#__PURE__*/_interopDefault(uniq);

// src/constants/index.ts

// src/types.ts
var PoolCategory = /* @__PURE__ */ ((PoolCategory2) => {
  PoolCategory2["COMMUNITY"] = "Community";
  PoolCategory2["CORE"] = "Core";
  PoolCategory2["BINANCE"] = "Binance";
  PoolCategory2["BINANCE_AUTO"] = "BINANCE_AUTO";
  PoolCategory2["AUTO"] = "Auto";
  return PoolCategory2;
})(PoolCategory || {});
var VaultKey = /* @__PURE__ */ ((VaultKey2) => {
  VaultKey2["CakeVaultV1"] = "cakeVaultV1";
  VaultKey2["CakeVault"] = "cakeVault";
  VaultKey2["CakeFlexibleSideVault"] = "cakeFlexibleSideVault";
  VaultKey2["IfoPool"] = "ifoPool";
  return VaultKey2;
})(VaultKey || {});

// src/constants/pools/1116.ts
var livePools = [
  // souceId can be any positive number as long as it is unique and not 0
  // version can't be 3 as that uses the pancake profiles that we did not implement
  {
    sousId: 35,
    stakingToken: tokens.coreTokens.core,
    earningToken: tokens.coreTokens.core,
    contractAddress: "0xFd072F40E17070f975890D1772d6fdC7Cb44a63b",
    poolCategory: "BINANCE_AUTO" /* BINANCE_AUTO */,
    fixedApr: "26.0",
    version: 2
  },
  {
    sousId: 68,
    stakingToken: tokens.coreTokens.asx,
    earningToken: tokens.coreTokens.asx,
    contractAddress: "0x079189e12222b5030d1BF3Bca93b92292F572BB4",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.002314",
    version: 2
  },
  {
    sousId: 59,
    stakingToken: tokens.coreTokens.asx,
    earningToken: tokens.coreTokens.asx,
    contractAddress: "0x45Bf1C5fe305eEcBE501fC2BE4F906102b4EFFA3",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.002314",
    version: 2
  },
  {
    sousId: 65,
    stakingToken: tokens.coreTokens.laugh,
    earningToken: tokens.coreTokens.laugh,
    contractAddress: "0x39011422e4d333363831bCBfB4A55A29E8530BDc",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "6.134",
    version: 2
  },
  {
    sousId: 67,
    stakingToken: tokens.coreTokens.dogwif,
    earningToken: tokens.coreTokens.dogwif,
    contractAddress: "0xc0d8097b6783C9890aA66FEF6B8fe801faD9b759",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "332.75",
    version: 2
  },
  {
    sousId: 66,
    stakingToken: tokens.coreTokens.ice,
    earningToken: tokens.coreTokens.laugh,
    contractAddress: "0x11Bb223920a5F0D4d817542BC2117Bd0b1739D0b",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "6.134",
    version: 2
  },
  {
    sousId: 61,
    stakingToken: tokens.coreTokens.pump,
    earningToken: tokens.coreTokens.pump,
    contractAddress: "0xD24c62d47229D8F49d7d5365374a951a21679C4C",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "173611.0",
    version: 2
  },
  {
    sousId: 62,
    stakingToken: tokens.coreTokens.asx,
    earningToken: tokens.coreTokens.pump,
    contractAddress: "0xf8D0e4C22F52B0FC93bf6Ad2caa57Ae511D1E2C6",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "114056.0",
    version: 2
  },
  {
    sousId: 64,
    stakingToken: tokens.coreTokens.asx,
    earningToken: tokens.coreTokens.laugh,
    contractAddress: "0xf9Cde06e56BD48505C02171c828c52D260BcC48D",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "6.154",
    version: 2
  },
  {
    sousId: 63,
    stakingToken: tokens.coreTokens.cctr,
    earningToken: tokens.coreTokens.cctr,
    contractAddress: "0x6e8888d763db12B3D3195D10aE41FACFE6D2646F",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.001157",
    version: 2
  },
  {
    sousId: 60,
    stakingToken: tokens.coreTokens.bcore_new,
    earningToken: tokens.coreTokens.bcore_new,
    contractAddress: "0xa2cc76a90E2A88783cC060CC323314F18F3b9dDe",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "4.745",
    version: 2
  },
  {
    sousId: 58,
    stakingToken: tokens.coreTokens.life,
    earningToken: tokens.coreTokens.ripple,
    contractAddress: "0xF81c7eCe5390eDd5f9600b7955D8AF2606F3d2cb",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.000289",
    version: 2
  },
  {
    sousId: 57,
    stakingToken: tokens.coreTokens.freecore,
    earningToken: tokens.coreTokens.freecore,
    contractAddress: "0x2f44ACeca40B91D3852D88afee84e8259d914DfB",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.771",
    version: 2
  },
  {
    sousId: 56,
    stakingToken: tokens.coreTokens.cBTC,
    earningToken: tokens.coreTokens.ceth,
    contractAddress: "0xBd0484023667aA5BEA3040ae2F0addeD5C04235A",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.000424",
    version: 2
  },
  {
    sousId: 55,
    stakingToken: tokens.coreTokens.ceth,
    earningToken: tokens.coreTokens.cBTC,
    contractAddress: "0xc8192Ad3F6c98Bf41447f0C05C71Cf5Bf3Bf3D5e",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.000424",
    version: 2
  },
  {
    sousId: 54,
    stakingToken: tokens.coreTokens.koci,
    earningToken: tokens.coreTokens.koci,
    contractAddress: "0x2223B01656Be90A1ac4A1b7D60E7D4ae8b7a17a0",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.00289",
    version: 2
  },
  {
    sousId: 52,
    stakingToken: tokens.coreTokens.cdao,
    earningToken: tokens.coreTokens.ice,
    contractAddress: "0x080dA1910f1A631317A5a665ACaa25e0b2E41a3B",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.000289",
    version: 2
  },
  {
    sousId: 51,
    stakingToken: tokens.coreTokens.pipi,
    earningToken: tokens.coreTokens.pipi,
    contractAddress: "0x78eD864D5601474408e2e663679fD184CfA3F306",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "45.2660",
    version: 2
  },
  {
    sousId: 53,
    stakingToken: tokens.coreTokens.youngparrot,
    earningToken: tokens.coreTokens.youngparrot,
    contractAddress: "0x0cA6CB85Df53705B48147285F6305bb949525BdF",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: " 1.9290",
    version: 2
  },
  {
    sousId: 50,
    stakingToken: tokens.coreTokens.youngparrot,
    earningToken: tokens.coreTokens.youngparrot,
    contractAddress: "0x650963Bcf8e55c0ec811a0604beCABa7237902f9",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.9645",
    version: 2
  },
  {
    sousId: 49,
    stakingToken: tokens.coreTokens.cBTC,
    earningToken: tokens.coreTokens.cBTC,
    contractAddress: "0xD7F7A62c9ED504Ce2026034199d0D8718582bA26",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.000868",
    version: 2
  }
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize
}));
var finishedPools = [
  {
    sousId: 48,
    stakingToken: tokens.coreTokens.gator,
    earningToken: tokens.coreTokens.gator,
    contractAddress: "0x180216e5a9ea1c8Ec8ddb9F92BF49A8708b33ebF",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "11.574",
    version: 2
  },
  {
    sousId: 47,
    stakingToken: tokens.coreTokens.gator,
    earningToken: tokens.coreTokens.gator,
    contractAddress: "0x831d462629c4eb296f497138178B62a71e9EF39f",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "11.574",
    version: 2
  },
  {
    sousId: 46,
    stakingToken: tokens.coreTokens.cBTC,
    earningToken: tokens.coreTokens.cBTC,
    contractAddress: "0x96091BE65f1Ed0bD1C431DceaCC656041cC46de6",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.000528",
    version: 2
  },
  {
    sousId: 45,
    stakingToken: tokens.coreTokens.cBTC,
    earningToken: tokens.coreTokens.cBTC,
    contractAddress: "0xd711A3E33Cba7dB01DA9ABC4e645225d7F06d6c0",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.009259",
    version: 2
  },
  {
    sousId: 44,
    stakingToken: tokens.coreTokens.hice,
    earningToken: tokens.coreTokens.kice,
    contractAddress: "0x28DD255b5caD5D04AD397f1A9CddbC1F9093E21d",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "1.0995",
    version: 2
  },
  {
    sousId: 43,
    stakingToken: tokens.coreTokens.hice,
    earningToken: tokens.coreTokens.hice,
    contractAddress: "0x18D2d3Cc7397f6Fb703B7c499F1b7834643245CE",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.17361",
    version: 2
  },
  {
    sousId: 42,
    stakingToken: tokens.coreTokens.kigu,
    earningToken: tokens.coreTokens.kigu,
    contractAddress: "0x60f9348289315076a82e67d86b9d5429b21750d9",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.00419061",
    version: 2
  },
  {
    sousId: 40,
    stakingToken: tokens.coreTokens.lung,
    earningToken: tokens.coreTokens.lung,
    contractAddress: "0x00cb88c63f1f6e2ebd946800930b9f23458ed55f",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.79821",
    version: 2
  },
  {
    sousId: 39,
    stakingToken: tokens.coreTokens.kigu,
    earningToken: tokens.coreTokens.kigu,
    contractAddress: "0xd7973da4e8559169ddbd4a5b6abae9a4a5cdc49a",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.0115",
    version: 2
  },
  {
    sousId: 37,
    stakingToken: tokens.coreTokens.block,
    earningToken: tokens.coreTokens.block,
    contractAddress: "0xdf3ab9de4f88c6cdf922e4e6dd23ea58412d9b1b",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.399106",
    version: 2
  },
  {
    sousId: 38,
    stakingToken: tokens.coreTokens.musk,
    earningToken: tokens.coreTokens.musk,
    contractAddress: "0xdf276b139fb7f8637ecdffb2e28c2bc824c4c2eb",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.26340996",
    version: 2
  },
  {
    sousId: 25,
    stakingToken: tokens.coreTokens.ucore,
    earningToken: tokens.coreTokens.ucore,
    contractAddress: "0x592feb264e4fc819279f001b5c23efb12d77d78d",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.192",
    version: 2
  },
  {
    sousId: 36,
    stakingToken: tokens.coreTokens.asi,
    earningToken: tokens.coreTokens.asi,
    contractAddress: "0x2ddc75c6311640a1482f0a39a11314d2b7690494",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "15817.9",
    version: 2
  },
  {
    sousId: 32,
    stakingToken: tokens.coreTokens.cmct,
    earningToken: tokens.coreTokens.but,
    contractAddress: "0x0f3e5fcb8e47e668d03e2f34914cb2ca42827971",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.009625",
    version: 2
  },
  {
    sousId: 33,
    stakingToken: tokens.coreTokens.bliz,
    earningToken: tokens.coreTokens.bliz,
    contractAddress: "0xddda927af85ef136ef7fc0821a201d952e0fc6f0",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.00578",
    version: 2
  },
  {
    sousId: 34,
    stakingToken: tokens.coreTokens.asi,
    earningToken: tokens.coreTokens.asi,
    contractAddress: "0xa98e474e59027c0f1ac46a73a631c3e2c3e40882",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "8101",
    version: 2
  },
  {
    sousId: 31,
    stakingToken: tokens.coreTokens.hobo,
    earningToken: tokens.coreTokens.hobo,
    contractAddress: "0x8fda52109c29dacb2e990f8909f1b56b30266dd1",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.868",
    version: 2
  },
  {
    sousId: 28,
    stakingToken: tokens.coreTokens.miidas,
    earningToken: tokens.coreTokens.miidas,
    contractAddress: "0xc1a46f6f788bded730fbf275fc04811c5738f04b",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "14.467592",
    version: 2
  },
  {
    sousId: 29,
    stakingToken: tokens.coreTokens.crystal,
    earningToken: tokens.coreTokens.crystal,
    contractAddress: "0xc1b3b56b0bcc38805d39bb2c03b40f12812b6d96",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "8.642743055555556",
    version: 2
  },
  {
    sousId: 30,
    stakingToken: tokens.coreTokens.maxi,
    earningToken: tokens.coreTokens.maxi,
    contractAddress: "0x5d62ee571e2159d53bcb4374bdfe715d3c45b8e4",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.033101851851851855",
    version: 2
  },
  {
    sousId: 26,
    stakingToken: tokens.coreTokens.bcore_new,
    earningToken: tokens.coreTokens.bcore_new,
    contractAddress: "0x2c36b4ff3a77ff44bd335e9e73628b16238d277b",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "115.74074074",
    version: 2
  },
  {
    sousId: 27,
    stakingToken: tokens.coreTokens.woof,
    earningToken: tokens.coreTokens.woof,
    contractAddress: "0x60c63d1855ba9b876c39b2f2422d1495caaee7ba",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.0347",
    version: 2
  },
  {
    sousId: 24,
    stakingToken: tokens.coreTokens.block,
    earningToken: tokens.coreTokens.block,
    contractAddress: "0x920704424e7930e3d133fae25f633b74589d72c3",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.239",
    version: 2
  },
  {
    sousId: 7,
    stakingToken: tokens.coreTokens.kishu,
    earningToken: tokens.coreTokens.kishu,
    contractAddress: "0x3A38Ef4f445D0e9546d076506eE1a411cf62f879",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "34722222",
    version: 2
  },
  {
    sousId: 9,
    stakingToken: tokens.coreTokens.word,
    earningToken: tokens.coreTokens.word,
    contractAddress: "0xE72c8D91fc12b38D31A091Deff08cf411e062842",
    poolCategory: "Core" /* CORE */,
    tokenPerBlock: "0.038",
    version: 2
  }
].map((p) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize
}));
var pools = [...livePools, ...finishedPools];

// src/constants/pools/32520.ts
var livePools2 = [
  // {
  //   sousId: 4,
  //   stakingToken: bitgertTokens.miidas,
  //   earningToken: bitgertTokens.miidas,
  //   contractAddress: '0xf4c78d403527ba2fb67ab599efea0a739d3d6547',
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '12.5',
  //   version: 2,
  // },
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize
}));
var finishedPools2 = [].map((p) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize
}));
var pools2 = [...livePools2, ...finishedPools2];

// src/constants/pools/50.ts
var livePools3 = [
  // {
  //   sousId: 2,
  //   stakingToken: xdcTokens.ice,
  //   earningToken: xdcTokens.btcx,
  //   contractAddress: '0x7b7387513444D4336e5a7E9cF75A2Bc7a38721A9',
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.02093',
  //   version: 2,
  // },
  // {
  //   sousId: 3,
  //   stakingToken: xdcTokens.btcx,
  //   earningToken: xdcTokens.btcx,
  //   contractAddress: '0x788C14Ddb3D4e9036D1fC98D2324f3F86FD43fCf',
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.02093',
  //   version: 2,
  // },
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize
}));
var finishedPools3 = [].map((p) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize
}));
var pools3 = [...livePools3, ...finishedPools3];

// src/constants/pools/245022934.ts
var livePools4 = [
  // souceId can be any positive number as long as it is unique and not 0
  // version can't be 3 as that uses the pancake profiles that we did not implement
  // {
  //     sousId: 49,
  //     stakingToken: neonTokens.ice,
  //     earningToken: neonTokens.chonk,
  //     contractAddress: '0x2A6f065BDC2c3DE88d679b15E366432d788C2C29',
  //     poolCategory: PoolCategory.CORE,
  //     tokenPerBlock: '0.496',
  //     version: 2,
  // },
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize
}));
var finishedPools4 = [].map((p) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize
}));
var pools4 = [...livePools4, ...finishedPools4];
var SUPPORTED_CHAIN_IDS = [sdk.ChainId.CORE, sdk.ChainId.NEON, sdk.ChainId.BITGERT, sdk.ChainId.XDC];

// src/utils/isPoolsSupported.ts
function isPoolsSupported(chainId) {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}

// src/constants/pools/index.ts
var POOLS_CONFIG_BY_CHAIN = {
  [sdk.ChainId.CORE]: pools,
  [sdk.ChainId.BITGERT]: pools2,
  [sdk.ChainId.XDC]: pools3,
  [sdk.ChainId.NEON]: pools4
};
var LIVE_POOLS_CONFIG_BY_CHAIN = {
  [sdk.ChainId.BSC]: livePools,
  [sdk.ChainId.BITGERT]: livePools2,
  [sdk.ChainId.XDC]: livePools3,
  [sdk.ChainId.NEON]: livePools4
};
var getPoolsConfig = (chainId) => {
  if (!isPoolsSupported(chainId)) {
    return void 0;
  }
  return POOLS_CONFIG_BY_CHAIN[chainId];
};
var getLivePoolsConfig = (chainId) => {
  if (!isPoolsSupported(chainId)) {
    return void 0;
  }
  return LIVE_POOLS_CONFIG_BY_CHAIN[chainId];
};
var MAX_LOCK_DURATION = 31536e3;
var UNLOCK_FREE_DURATION = 604800;
var ONE_WEEK_DEFAULT = 604800;
var BOOST_WEIGHT = 20000000000000n;
var DURATION_FACTOR = 31536000n;
var IICE = {
  [sdk.ChainId.BSC]: "0x3C458828D1622F5f4d526eb0d24Da8C4Eb8F07b1"
};
var ICE_VAULT = {
  [sdk.ChainId.BSC]: "0x45c54210128a065de780C4B0Df3d16664f7f859e"
};
var ICE_FLEXIBLE_SIDE_VAULT = {
  [sdk.ChainId.BSC]: "0x615e896A8C2CA8470A2e9dc2E9552998f8658Ea0"
};

// src/constants/index.ts
var SECONDS_IN_YEAR = 31536e3;
var blockTime = (chainId) => {
  const chain = constants.getChain(chainId);
  return chain ? chain.blockInterval : 3;
};
var blocksPerYear = (chainId) => {
  return SECONDS_IN_YEAR / blockTime(chainId);
};
var BIG_ZERO = new BigNumber7__default.default(0);
new BigNumber7__default.default(1);
new BigNumber7__default.default(2);
new BigNumber7__default.default(9);
new BigNumber7__default.default(10);
new BigNumber7__default.default(100);

// src/abis/ISousChef.ts
var sousChefABI = [
  {
    inputs: [],
    name: "bonusEndBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "emergencyRewardWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "emergencyWithdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "_from", type: "uint256" },
      { internalType: "uint256", name: "_to", type: "uint256" }
    ],
    name: "getMultiplier",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "massUpdatePools", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "pendingReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "poolInfo",
    outputs: [
      { internalType: "contract IBEP20", name: "lpToken", type: "address" },
      { internalType: "uint256", name: "allocPoint", type: "uint256" },
      { internalType: "uint256", name: "lastRewardBlock", type: "uint256" },
      { internalType: "uint256", name: "accCakePerShare", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "rewardPerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [{ internalType: "contract IBEP20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "startBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "stopReward", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "syrup",
    outputs: [{ internalType: "contract IBEP20", name: "", type: "address" }],
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
    inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
    name: "updatePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "rewardDebt", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abis/ISousChefV2.ts
var sousChefV2ABI = [
  {
    inputs: [],
    name: "PRECISION_FACTOR",
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
    name: "accTokenPerShare",
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
    name: "bonusEndBlock",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "emergencyRewardWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "hasUserLimit",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lastRewardBlock",
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
    name: "numberBlocksForUserLimit",
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
    name: "owner",
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
        internalType: "address",
        name: "_user",
        type: "address"
      }
    ],
    name: "pendingReward",
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
    name: "poolLimitPerUser",
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
        name: "_tokenAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_tokenAmount",
        type: "uint256"
      }
    ],
    name: "recoverWrongTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardPerBlock",
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
    name: "rewardToken",
    outputs: [
      {
        internalType: "contract IBEP20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stakedToken",
    outputs: [
      {
        internalType: "contract IBEP20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "startBlock",
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
    name: "stopReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_hasUserLimit",
        type: "bool"
      },
      {
        internalType: "uint256",
        name: "_poolLimitPerUser",
        type: "uint256"
      }
    ],
    name: "updatePoolLimitPerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rewardPerBlock",
        type: "uint256"
      }
    ],
    name: "updateRewardPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_startBlock",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_bonusEndBlock",
        type: "uint256"
      }
    ],
    name: "updateStartAndEndBlocks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "rewardDebt",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abis/ISmartChef.ts
var smartChefABI = [
  {
    inputs: [
      { internalType: "address", name: "_pancakeProfile", type: "address" },
      { internalType: "bool", name: "_pancakeProfileIsRequested", type: "bool" },
      { internalType: "uint256", name: "_pancakeProfileThresholdPoints", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "Deposit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "EmergencyWithdraw",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "poolLimitPerUser", type: "uint256" }],
    name: "NewPoolLimit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "rewardPerSecond", type: "uint256" }],
    name: "NewRewardPerSecond",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "startTimestamp", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "endTimestamp", type: "uint256" }
    ],
    name: "NewStartAndEndTimestamp",
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
    inputs: [{ indexed: false, internalType: "uint256", name: "blockNumber", type: "uint256" }],
    name: "RewardsStop",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "token", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "TokenRecovery",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bool", name: "isProfileRequested", type: "bool" },
      { indexed: false, internalType: "uint256", name: "thresholdPoints", type: "uint256" }
    ],
    name: "UpdateProfileAndThresholdPointsRequirement",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "Withdraw",
    type: "event"
  },
  {
    inputs: [],
    name: "PRECISION_FACTOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "SMART_CHEF_FACTORY",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "accTokenPerShare",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "emergencyRewardWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "emergencyWithdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "endTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "hasUserLimit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IERC20Metadata", name: "_stakedToken", type: "address" },
      { internalType: "contract IERC20Metadata", name: "_rewardToken", type: "address" },
      { internalType: "uint256", name: "_rewardPerSecond", type: "uint256" },
      { internalType: "uint256", name: "_startTimestamp", type: "uint256" },
      { internalType: "uint256", name: "_endTimestamp", type: "uint256" },
      { internalType: "uint256", name: "_poolLimitPerUser", type: "uint256" },
      { internalType: "uint256", name: "_numberSecondsForUserLimit", type: "uint256" },
      { internalType: "address", name: "_admin", type: "address" }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "isInitialized",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lastRewardTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "numberSecondsForUserLimit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
    inputs: [],
    name: "pancakeProfile",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pancakeProfileIsRequested",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pancakeProfileThresholdPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "pendingReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "poolLimitPerUser",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "recoverToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "rewardPerSecond",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [{ internalType: "contract IERC20Metadata", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stakedToken",
    outputs: [{ internalType: "contract IERC20Metadata", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "startTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "stopReward", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bool", name: "_userLimit", type: "bool" },
      { internalType: "uint256", name: "_poolLimitPerUser", type: "uint256" }
    ],
    name: "updatePoolLimitPerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bool", name: "_isRequested", type: "bool" },
      { internalType: "uint256", name: "_thresholdPoints", type: "uint256" }
    ],
    name: "updateProfileAndThresholdPointsRequirement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_rewardPerSecond", type: "uint256" }],
    name: "updateRewardPerSecond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_startTimestamp", type: "uint256" },
      { internalType: "uint256", name: "_endTimestamp", type: "uint256" }
    ],
    name: "updateStartAndEndTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "rewardDebt", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "userLimit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abis/ISousChefV3.ts
var sousChefV3ABI = [
  {
    inputs: [
      { internalType: "address", name: "_pancakeProfile", type: "address" },
      { internalType: "bool", name: "_pancakeProfileIsRequested", type: "bool" },
      { internalType: "uint256", name: "_pancakeProfileThresholdPoints", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "Deposit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "EmergencyWithdraw",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "poolLimitPerUser", type: "uint256" }],
    name: "NewPoolLimit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "rewardPerBlock", type: "uint256" }],
    name: "NewRewardPerBlock",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "startBlock", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "endBlock", type: "uint256" }
    ],
    name: "NewStartAndEndBlocks",
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
    inputs: [{ indexed: false, internalType: "uint256", name: "blockNumber", type: "uint256" }],
    name: "RewardsStop",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "token", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "TokenRecovery",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bool", name: "isProfileRequested", type: "bool" },
      { indexed: false, internalType: "uint256", name: "thresholdPoints", type: "uint256" }
    ],
    name: "UpdateProfileAndThresholdPointsRequirement",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "Withdraw",
    type: "event"
  },
  {
    inputs: [],
    name: "PRECISION_FACTOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "SMART_CHEF_FACTORY",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "accTokenPerShare",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bonusEndBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "emergencyRewardWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "emergencyWithdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "hasUserLimit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IERC20Metadata", name: "_stakedToken", type: "address" },
      { internalType: "contract IERC20Metadata", name: "_rewardToken", type: "address" },
      { internalType: "uint256", name: "_rewardPerBlock", type: "uint256" },
      { internalType: "uint256", name: "_startBlock", type: "uint256" },
      { internalType: "uint256", name: "_bonusEndBlock", type: "uint256" },
      { internalType: "uint256", name: "_poolLimitPerUser", type: "uint256" },
      { internalType: "uint256", name: "_numberBlocksForUserLimit", type: "uint256" },
      { internalType: "address", name: "_admin", type: "address" }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "isInitialized",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lastRewardBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "numberBlocksForUserLimit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
    inputs: [],
    name: "pancakeProfile",
    outputs: [{ internalType: "contract IPancakeProfile", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pancakeProfileIsRequested",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pancakeProfileThresholdPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "pendingReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "poolLimitPerUser",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "recoverToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "rewardPerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [{ internalType: "contract IERC20Metadata", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stakedToken",
    outputs: [{ internalType: "contract IERC20Metadata", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "startBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "stopReward", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bool", name: "_userLimit", type: "bool" },
      { internalType: "uint256", name: "_poolLimitPerUser", type: "uint256" }
    ],
    name: "updatePoolLimitPerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bool", name: "_isRequested", type: "bool" },
      { internalType: "uint256", name: "_thresholdPoints", type: "uint256" }
    ],
    name: "updateProfileAndThresholdPointsRequirement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_rewardPerBlock", type: "uint256" }],
    name: "updateRewardPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_startBlock", type: "uint256" },
      { internalType: "uint256", name: "_bonusEndBlock", type: "uint256" }
    ],
    name: "updateStartAndEndBlocks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "rewardDebt", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "userLimit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/utils/getContractAddress.ts
function getContractAddress(addresses, chainId) {
  if (!isPoolsSupported(chainId)) {
    throw new Error(`Cannot get contract address. Unsupported chain ${chainId}`);
  }
  return addresses[chainId];
}

// src/utils/isLegacyPool.ts
function isLegacyPool(pool) {
  return !pool.tokenPerSecond;
}
function isUpgradedPool(pool) {
  return !!pool.tokenPerSecond;
}
var getPoolAprByTokenPerBlock = (stakingTokenPrice, rewardTokenPrice, totalStaked, tokenPerBlock, chainId) => {
  const totalRewardPricePerYear = new BigNumber7__default.default(rewardTokenPrice).times(tokenPerBlock).times(blocksPerYear(chainId));
  const totalStakingTokenInPool = new BigNumber7__default.default(stakingTokenPrice).times(totalStaked);
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber();
};
var getPoolAprByTokenPerSecond = (stakingTokenPrice, rewardTokenPrice, totalStaked, tokenPerSecond) => {
  const totalRewardPricePerYear = new BigNumber7__default.default(rewardTokenPrice).times(tokenPerSecond).times(SECONDS_IN_YEAR);
  const totalStakingTokenInPool = new BigNumber7__default.default(stakingTokenPrice).times(totalStaked);
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber();
};

// src/abis/ISousChefBNB.ts
var sousChefBnbABI = [
  {
    inputs: [],
    name: "WBNB",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "adminAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bonusEndBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "deposit", outputs: [], stateMutability: "payable", type: "function" },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "emergencyRewardWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "emergencyWithdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "_from", type: "uint256" },
      { internalType: "uint256", name: "_to", type: "uint256" }
    ],
    name: "getMultiplier",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "limitAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "massUpdatePools", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "pendingReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "poolInfo",
    outputs: [
      { internalType: "contract IBEP20", name: "lpToken", type: "address" },
      { internalType: "uint256", name: "allocPoint", type: "uint256" },
      { internalType: "uint256", name: "lastRewardBlock", type: "uint256" },
      { internalType: "uint256", name: "accCakePerShare", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_blacklistAddress", type: "address" }],
    name: "removeBlackList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "rewardPerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [{ internalType: "contract IBEP20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_adminAddress", type: "address" }],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_blacklistAddress", type: "address" }],
    name: "setBlackList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "setLimitAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "startBlock",
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
    inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
    name: "updatePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "rewardDebt", type: "uint256" },
      { internalType: "bool", name: "inBlackList", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { stateMutability: "payable", type: "receive" }
];

// src/utils/getPoolContractBySousId.ts
function getSousChefBNBContract({
  address,
  signer,
  publicClient
}) {
  return {
    ...viem.getContract({
      abi: sousChefBnbABI,
      address,
      walletClient: signer,
      publicClient
    }),
    abi: sousChefBnbABI,
    address,
    account: signer?.account,
    chain: signer?.chain
  };
}
function getSousChefV2Contract({
  address,
  signer,
  publicClient
}) {
  return {
    ...viem.getContract({
      abi: sousChefV2ABI,
      address,
      walletClient: signer,
      publicClient
    }),
    abi: sousChefV2ABI,
    address,
    account: signer?.account,
    chain: signer?.chain
  };
}
function getSmartChefChefV2Contract({
  address,
  signer,
  publicClient
}) {
  return {
    ...viem.getContract({
      abi: smartChefABI,
      address,
      walletClient: signer,
      publicClient
    }),
    abi: smartChefABI,
    address,
    account: signer?.account,
    chain: signer?.chain
  };
}
function getPoolContractBySousId({ chainId, sousId, signer, publicClient }) {
  if (!chainId) {
    return null;
  }
  const pools5 = getPoolsConfig(chainId);
  const pool = pools5?.find((p) => p.sousId === Number(sousId));
  if (!pool) {
    return null;
  }
  const { contractAddress } = pool;
  if (isLegacyPool(pool)) {
    if (pool.poolCategory === "Binance" /* BINANCE */ || pool.poolCategory === "BINANCE_AUTO" /* BINANCE_AUTO */) {
      return getSousChefBNBContract({ address: contractAddress, signer, publicClient });
    }
    return getSousChefV2Contract({ address: contractAddress, signer, publicClient });
  }
  return getSmartChefChefV2Contract({ address: contractAddress, signer, publicClient });
}

// src/queries/fetchPools.ts
var getLivePoolsWithEnd = async (chainId) => {
  const poolsConfig = getPoolsConfig(chainId);
  if (!poolsConfig) {
    return null;
  }
  return poolsConfig.filter((p) => p.sousId !== 0 && !p.isFinished);
};
async function fetchUpgradedPoolsTimeLimits(pools5, chainId, provider) {
  if (!pools5.length) {
    return [];
  }
  const calls = pools5.flatMap(({ contractAddress }) => {
    return [
      {
        abi: smartChefABI,
        address: contractAddress,
        functionName: "startTimestamp"
      },
      {
        abi: smartChefABI,
        address: contractAddress,
        functionName: "endTimestamp"
      }
    ];
  });
  const client = provider({ chainId });
  const startEndRaw = await client.multicall({
    contracts: calls,
    allowFailure: false
  });
  const startEndResult = startEndRaw.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return pools5.map((cakePoolConfig, index) => {
    const [startTimestamp, endTimestamp] = startEndResult[index];
    return {
      sousId: cakePoolConfig.sousId,
      startTimestamp: Number(startTimestamp),
      endTimestamp: Number(endTimestamp)
    };
  });
}
var fetchLegacyPoolsBlockLimits = async (pools5, chainId, provider) => {
  if (!pools5.length) {
    return [];
  }
  const startEndBlockCalls = pools5.flatMap(({ contractAddress }) => {
    return [
      {
        abi: sousChefABI,
        address: contractAddress,
        functionName: "startBlock"
      },
      {
        abi: sousChefABI,
        address: contractAddress,
        functionName: "bonusEndBlock"
      }
    ];
  });
  const client = provider({ chainId });
  const [block, startEndBlockRaw] = await Promise.all([
    client.getBlock({ blockTag: "latest" }),
    client.multicall({
      contracts: startEndBlockCalls,
      allowFailure: false
    })
  ]);
  const startEndBlockResult = startEndBlockRaw.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  const getTimestampFromBlock = (targetBlock) => {
    return Number(block.timestamp) + (targetBlock - Number(block.number)) * blockTime(chainId);
  };
  return pools5.map((cakePoolConfig, index) => {
    const [startBlock, endBlock] = startEndBlockResult[index];
    return {
      sousId: cakePoolConfig.sousId,
      startTimestamp: getTimestampFromBlock(Number(startBlock)),
      endTimestamp: getTimestampFromBlock(Number(endBlock))
    };
  });
};
var fetchPoolsTimeLimits = async (chainId, provider) => {
  const livedPools = await getLivePoolsWithEnd(chainId);
  if (!livedPools) {
    return null;
  }
  const upgradedPools = livedPools.filter(isUpgradedPool);
  const legacyPools = livedPools.filter(isLegacyPool);
  const [upgradePoolLimits, legacyPoolLimits] = await Promise.all([
    fetchUpgradedPoolsTimeLimits(upgradedPools, chainId, provider),
    fetchLegacyPoolsBlockLimits(legacyPools, chainId, provider)
  ]);
  return [...upgradePoolLimits, ...legacyPoolLimits];
};
var fetchPoolsTotalStaking = async (chainId, provider) => {
  const poolsConfig = getPoolsConfig(chainId);
  if (!poolsConfig) {
    return null;
  }
  const poolsBalanceOf = poolsConfig.map(({ contractAddress, stakingToken }) => {
    return {
      abi: wagmi.erc20ABI,
      address: stakingToken.address,
      functionName: "balanceOf",
      args: [contractAddress]
    };
  });
  const client = provider({ chainId });
  const poolsTotalStaked = await client.multicall({
    contracts: poolsBalanceOf,
    allowFailure: false
  });
  return poolsConfig.map((p, index) => ({
    sousId: p.sousId,
    totalStaked: new BigNumber7__default.default(poolsTotalStaked[index].toString()).toJSON()
  }));
};
var fetchPoolsStakingLimitsByBlock = async ({
  poolsWithStakingLimit,
  chainId,
  provider
}) => {
  const poolsConfig = getPoolsConfig(chainId);
  if (!poolsConfig) {
    throw new Error(`No pools found on chain ${chainId}`);
  }
  const validPools = poolsConfig.filter(isLegacyPool).filter((p) => p.stakingToken.symbol !== "BNB" && !p.isFinished).filter((p) => !poolsWithStakingLimit.includes(p.sousId));
  const poolStakingCalls = validPools.map(({ contractAddress }) => {
    return ["hasUserLimit", "poolLimitPerUser", "numberBlocksForUserLimit"].map(
      (method) => ({
        address: contractAddress,
        functionName: method,
        abi: sousChefV2ABI
      })
    );
  }).flat();
  const client = provider({ chainId });
  const poolStakingResultRaw = await client.multicall({
    contracts: poolStakingCalls,
    allowFailure: true
  });
  const chunkSize = poolStakingCalls.length / validPools.length;
  const poolStakingChunkedResultRaw = chunk__default.default(poolStakingResultRaw.flat(), chunkSize);
  return fromPairs2__default.default(
    poolStakingChunkedResultRaw.map((stakingLimitRaw, index) => {
      const hasUserLimit = stakingLimitRaw[0]?.result;
      const stakingLimit = hasUserLimit && stakingLimitRaw[1].result ? new BigNumber7__default.default(stakingLimitRaw[1].result.toString()) : BIG_ZERO;
      const numberBlocksForUserLimit = stakingLimitRaw[2].result ? Number(stakingLimitRaw[2].result) : 0;
      const numberSecondsForUserLimit = numberBlocksForUserLimit * blockTime(chainId);
      return [validPools[index].sousId, { stakingLimit, numberSecondsForUserLimit }];
    })
  );
};
var fetchPoolsStakingLimitsByTime = async ({
  poolsWithStakingLimit,
  chainId,
  provider
}) => {
  const poolsConfig = getPoolsConfig(chainId);
  if (!poolsConfig) {
    throw new Error(`No pools found on chain ${chainId}`);
  }
  const validPools = poolsConfig.filter(isUpgradedPool).filter((p) => p.stakingToken.symbol !== "BNB" && !p.isFinished).filter((p) => !poolsWithStakingLimit.includes(p.sousId));
  const poolStakingCalls = validPools.map(({ contractAddress }) => {
    return ["hasUserLimit", "poolLimitPerUser", "numberSecondsForUserLimit"].map(
      (method) => ({
        abi: smartChefABI,
        address: contractAddress,
        functionName: method
      })
    );
  }).flat();
  const client = provider({ chainId });
  const poolStakingResultRaw = await client.multicall({
    contracts: poolStakingCalls,
    allowFailure: true
  });
  const chunkSize = poolStakingCalls.length / validPools.length;
  const poolStakingChunkedResultRaw = chunk__default.default(poolStakingResultRaw.flat(), chunkSize);
  return fromPairs2__default.default(
    poolStakingChunkedResultRaw.map((stakingLimitRaw, index) => {
      const hasUserLimit = stakingLimitRaw[0].result;
      const stakingLimit = hasUserLimit && stakingLimitRaw[1].result ? new BigNumber7__default.default(stakingLimitRaw[1].result.toString()) : BIG_ZERO;
      const numberSecondsForUserLimit = stakingLimitRaw[2].result ? Number(stakingLimitRaw[2].result) : 0;
      return [validPools[index].sousId, { stakingLimit, numberSecondsForUserLimit }];
    })
  );
};
var fetchPoolsStakingLimits = async (params) => {
  const [limitsByTime, limitsByBlock] = await Promise.all([
    fetchPoolsStakingLimitsByTime(params),
    fetchPoolsStakingLimitsByBlock(params)
  ]);
  return {
    ...limitsByTime,
    ...limitsByBlock
  };
};
var fetchPoolsProfileRequirement = async (chainId, provider) => {
  const poolsConfig = getPoolsConfig(chainId);
  if (!poolsConfig) {
    throw new Error(`No pools found on chain ${chainId}`);
  }
  const livePoolsWithV3 = poolsConfig.filter(
    (pool) => (isUpgradedPool(pool) || isLegacyPool(pool) && pool?.version === 3) && !pool?.isFinished
  );
  const poolProfileRequireCalls = livePoolsWithV3.map(({ contractAddress }) => {
    return ["pancakeProfileIsRequested", "pancakeProfileThresholdPoints"].map(
      (method) => ({
        abi: sousChefV3ABI,
        address: contractAddress,
        functionName: method
      })
    );
  }).flat();
  const client = provider({ chainId });
  const poolProfileRequireResultRaw = await client.multicall({
    contracts: poolProfileRequireCalls
  });
  const chunkSize = poolProfileRequireCalls.length / livePoolsWithV3.length;
  const poolStakingChunkedResultRaw = chunk__default.default(poolProfileRequireResultRaw.flat(), chunkSize);
  return fromPairs2__default.default(
    poolStakingChunkedResultRaw.map((poolProfileRequireRaw, index) => {
      const hasProfileRequired = poolProfileRequireRaw[0].result;
      const profileThresholdPoints = poolProfileRequireRaw[1].result ? new BigNumber7__default.default(poolProfileRequireRaw[1].result.toString()) : BIG_ZERO;
      return [
        livePoolsWithV3[index].sousId,
        {
          required: !!hasProfileRequired,
          thresholdPoints: profileThresholdPoints.toJSON()
        }
      ];
    })
  );
};
var getPoolsFactory = (filter) => (chainId) => {
  const poolsConfig = getPoolsConfig(chainId);
  if (!poolsConfig) {
    throw new Error(`Unable to get pools config on chain ${chainId}`);
  }
  return poolsConfig.filter(filter);
};
var getNonBnbPools = getPoolsFactory((pool) => pool.stakingToken.symbol.toLowerCase() !== sdk.WETH9[pool.stakingToken.chainId].symbol.toLowerCase().substring(1));
var getBnbPools = getPoolsFactory((pool) => pool.stakingToken.symbol.toLowerCase() === sdk.WETH9[pool.stakingToken.chainId].symbol.toLowerCase().substring(1));
var getNonMasterPools = getPoolsFactory((pool) => true);
var fetchPoolsAllowance = async ({ account, chainId, provider }) => {
  const nonBnbPools = getNonBnbPools(chainId);
  const client = provider({ chainId });
  const allowances = await client.multicall({
    contracts: nonBnbPools.map(
      ({ contractAddress, stakingToken }) => ({
        address: stakingToken.address,
        abi: wagmi.erc20ABI,
        functionName: "allowance",
        args: [account, contractAddress]
      })
    ),
    allowFailure: false
  });
  return fromPairs2__default.default(
    nonBnbPools.map((pool, index) => [pool.sousId, new BigNumber7__default.default(allowances[index].toString()).toJSON()])
  );
};
var fetchUserBalances = async ({ account, chainId, provider }) => {
  const nonBnbPools = getNonBnbPools(chainId);
  const bnbPools = getBnbPools(chainId);
  const tokens = uniq__default.default(nonBnbPools.map((pool) => pool.stakingToken.address));
  const client = provider({ chainId });
  const tokenBalance = await client.multicall({
    contracts: [
      {
        abi: [
          {
            inputs: [{ internalType: "address", name: "addr", type: "address" }],
            name: "getEthBalance",
            outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
            stateMutability: "view",
            type: "function"
          }
        ],
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
        // TODO: Here is multicall address, should extract addresses to a package for multi chain
        functionName: "getEthBalance",
        args: [account]
      },
      ...tokens.map(
        (token) => ({
          abi: wagmi.erc20ABI,
          address: token,
          functionName: "balanceOf",
          args: [account]
        })
      )
    ]
  });
  const [bnbBalance, ...tokenBalancesResults] = tokenBalance;
  const tokenBalances = fromPairs2__default.default(tokens.map((token, index) => [token, tokenBalancesResults[index].result]));
  const poolTokenBalances = fromPairs2__default.default(
    nonBnbPools.map((pool) => {
      if (!tokenBalances[pool.stakingToken.address])
        return null;
      return [pool.sousId, new BigNumber7__default.default(tokenBalances[pool.stakingToken.address].toString()).toJSON()];
    }).filter((p) => Boolean(p))
  );
  const bnbBalanceJson = new BigNumber7__default.default(bnbBalance.result?.toString()).toJSON();
  const bnbBalances = fromPairs2__default.default(bnbPools.map((pool) => [pool.sousId, bnbBalanceJson]));
  return { ...poolTokenBalances, ...bnbBalances };
};
var fetchUserStakeBalances = async ({ account, chainId, provider }) => {
  const nonMasterPools = getNonMasterPools(chainId);
  const client = provider({ chainId });
  const userInfo = await client.multicall({
    contracts: nonMasterPools.map(
      ({ contractAddress }) => ({
        abi: sousChefABI.filter((r) => r.name === "userInfo"),
        address: contractAddress,
        functionName: "userInfo",
        args: [account]
      })
    ),
    allowFailure: false
  });
  return fromPairs2__default.default(
    nonMasterPools.map((pool, index) => [pool.sousId, new BigNumber7__default.default(userInfo[index][0].toString()).toJSON()])
  );
};
var fetchUserPendingRewards = async ({ account, chainId, provider }) => {
  const nonMasterPools = getNonMasterPools(chainId);
  const client = provider({ chainId });
  const res = await client.multicall({
    contracts: nonMasterPools.map(
      ({ contractAddress }) => ({
        abi: sousChefABI.filter((r) => r.name === "pendingReward"),
        address: contractAddress,
        functionName: "pendingReward",
        args: [account]
      })
    ),
    allowFailure: false
  });
  return fromPairs2__default.default(nonMasterPools.map((pool, index) => [pool.sousId, new BigNumber7__default.default(res[index].toString()).toJSON()]));
};

// src/abis/ICake.ts
var iCakeABI = [
  {
    inputs: [],
    name: "MIN_CEILING_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "cakePool",
    outputs: [{ internalType: "contract ICaKePool", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "ceiling",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserCredit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_newCeiling", type: "uint256" }],
    name: "updateCeiling",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/queries/fetchUserIfo.ts
var getIfoCreditAddressContract = (chainId, provider, walletClient) => {
  const address = getContractAddress(IICE, chainId);
  if (!address || address === "0x") {
    throw new Error(`ICAKE not supported on chain ${chainId}`);
  }
  return viem.getContract({ abi: iCakeABI, address, publicClient: provider({ chainId }), walletClient });
};
var fetchPublicIfoData = async (chainId, provider) => {
  try {
    const ifoCreditAddressContract = getIfoCreditAddressContract(chainId, provider);
    const ceiling = await ifoCreditAddressContract.read.ceiling();
    return {
      ceiling: new BigNumber7__default.default(ceiling.toString()).toJSON()
    };
  } catch (error) {
    return {
      ceiling: BIG_ZERO.toJSON()
    };
  }
};
var fetchUserIfoCredit = async ({ account, chainId, provider }) => {
  try {
    const ifoCreditAddressContract = getIfoCreditAddressContract(chainId, provider);
    const credit = await ifoCreditAddressContract.read.getUserCredit([account]);
    return new BigNumber7__default.default(credit.toString()).toJSON();
  } catch (error) {
    console.error(error);
    return BIG_ZERO.toJSON();
  }
};

// src/abis/ICakeVaultV2.ts
var cakeVaultV2ABI = [
  {
    inputs: [],
    name: "BOOST_WEIGHT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "BOOST_WEIGHT_LIMIT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DURATION_FACTOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DURATION_FACTOR_OVERDUE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_CALL_FEE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_LOCK_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_LOCK_DURATION_LIMIT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_PERFORMANCE_FEE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_WITHDRAW_FEE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_WITHDRAW_FEE_PERIOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MIN_DEPOSIT_AMOUNT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MIN_LOCK_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MIN_WITHDRAW_AMOUNT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PRECISION_FACTOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PRECISION_FACTOR_SHARE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "UNLOCK_FREE_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "available",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "boostContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "cakePoolPID",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "calculateOverdueFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "calculatePerformanceFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "calculateTotalPendingCakeRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "uint256", name: "_shares", type: "uint256" }
    ],
    name: "calculateWithdrawFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_lockDuration", type: "uint256" }
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "freeFeeUsers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getPricePerFullShare",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "inCaseTokensGetStuck",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "contract IERC20", name: "dummyToken", type: "address" }],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "lastHarvestedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "masterchefV2",
    outputs: [{ internalType: "contract IMasterChefV2", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "operator",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "overdueFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
  { inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "performanceFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "performanceFeeContract",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "_admin", type: "address" }],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_boostContract", type: "address" }],
    name: "setBoostContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_boostWeight", type: "uint256" }],
    name: "setBoostWeight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_durationFactor", type: "uint256" }],
    name: "setDurationFactor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_durationFactorOverdue", type: "uint256" }],
    name: "setDurationFactorOverdue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "bool", name: "_free", type: "bool" }
    ],
    name: "setFreeFeeUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_maxLockDuration", type: "uint256" }],
    name: "setMaxLockDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_operator", type: "address" }],
    name: "setOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_performanceFee", type: "uint256" }],
    name: "setPerformanceFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_performanceFeeContract", type: "uint256" }],
    name: "setPerformanceFeeContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_treasury", type: "address" }],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_unlockFreeDuration", type: "uint256" }],
    name: "setUnlockFreeDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_withdrawFee", type: "uint256" }],
    name: "setWithdrawFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_withdrawFeeContract", type: "uint256" }],
    name: "setWithdrawFeeContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_withdrawFeePeriod", type: "uint256" }],
    name: "setWithdrawFeePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalBoostDebt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalLockedAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalShares",
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
    inputs: [],
    name: "treasury",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "unlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "shares", type: "uint256" },
      { internalType: "uint256", name: "lastDepositedTime", type: "uint256" },
      { internalType: "uint256", name: "cakeAtLastUserAction", type: "uint256" },
      { internalType: "uint256", name: "lastUserActionTime", type: "uint256" },
      { internalType: "uint256", name: "lockStartTime", type: "uint256" },
      { internalType: "uint256", name: "lockEndTime", type: "uint256" },
      { internalType: "uint256", name: "userBoostedShare", type: "uint256" },
      { internalType: "bool", name: "locked", type: "bool" },
      { internalType: "uint256", name: "lockedAmount", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_shares", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "withdrawAll", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdrawByAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawFeeContract",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawFeePeriod",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];

// src/queries/getAddresses.ts
function getCakeFlexibleSideVaultAddress(chainId) {
  return getContractAddress(ICE_FLEXIBLE_SIDE_VAULT, chainId);
}
function getCakeVaultAddress(chainId) {
  return getContractAddress(ICE_VAULT, chainId);
}

// src/queries/fetchVaultPublic.ts
var balanceOfAbi = [
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];
var fetchPublicVaultData = async ({
  chainId,
  cakeVaultAddress = getCakeVaultAddress(chainId),
  provider
}) => {
  try {
    const client = provider({ chainId });
    const [sharePrice, shares, totalLockedAmount, totalCakeInVault] = await client.multicall({
      contracts: [
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "getPricePerFullShare"
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "totalShares"
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "totalLockedAmount"
        },
        {
          abi: balanceOfAbi,
          address: tokens.ICE[chainId].address,
          functionName: "balanceOf",
          args: [cakeVaultAddress]
        }
      ],
      allowFailure: true
    });
    const totalSharesAsBigNumber = shares.status === "success" && shares.result ? new BigNumber7__default.default(shares.result.toString()) : BIG_ZERO;
    const totalLockedAmountAsBigNumber = totalLockedAmount.status === "success" && totalLockedAmount.result ? new BigNumber7__default.default(totalLockedAmount.result.toString()) : BIG_ZERO;
    const sharePriceAsBigNumber = sharePrice.status === "success" && sharePrice.result ? new BigNumber7__default.default(sharePrice.result.toString()) : BIG_ZERO;
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      totalLockedAmount: totalLockedAmountAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCakeInVault: totalCakeInVault.result ? new BigNumber7__default.default(totalCakeInVault.result.toString()).toJSON() : "0"
    };
  } catch (error) {
    return {
      totalShares: null,
      totalLockedAmount: null,
      pricePerFullShare: null,
      totalCakeInVault: null
    };
  }
};
var fetchPublicFlexibleSideVaultData = async ({
  chainId,
  cakeVaultAddress = getCakeFlexibleSideVaultAddress(chainId),
  provider
}) => {
  try {
    const client = provider({ chainId });
    const [sharePrice, shares, totalCakeInVault] = await client.multicall({
      contracts: [
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "getPricePerFullShare"
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "totalShares"
        },
        {
          abi: balanceOfAbi,
          address: tokens.ICE[chainId].address,
          functionName: "balanceOf",
          args: [cakeVaultAddress]
        }
      ],
      allowFailure: true
    });
    const totalSharesAsBigNumber = shares.status === "success" ? new BigNumber7__default.default(shares.result.toString()) : BIG_ZERO;
    const sharePriceAsBigNumber = sharePrice.status === "success" ? new BigNumber7__default.default(sharePrice.result.toString()) : BIG_ZERO;
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCakeInVault: new BigNumber7__default.default((totalCakeInVault.result || "0").toString()).toJSON()
    };
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalCakeInVault: null
    };
  }
};
var fetchVaultFees = async ({
  chainId,
  cakeVaultAddress = getCakeVaultAddress(chainId),
  provider
}) => {
  try {
    const client = provider({ chainId });
    const [performanceFee, withdrawalFee, withdrawalFeePeriod] = await client.multicall({
      contracts: [
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "performanceFee"
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "withdrawFee"
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "withdrawFeePeriod"
        }
      ],
      allowFailure: false
    });
    return {
      performanceFee: Number(performanceFee),
      withdrawalFee: Number(withdrawalFee),
      withdrawalFeePeriod: Number(withdrawalFeePeriod)
    };
  } catch (error) {
    return {
      performanceFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null
    };
  }
};

// src/abis/ICakeFlexibleSideVaultV2.ts
var cakeFlexibleSideVaultV2ABI = [
  {
    inputs: [],
    name: "MAX_PERFORMANCE_FEE",
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
    name: "MAX_WITHDRAW_AMOUNT_BOOSTER",
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
    name: "MAX_WITHDRAW_FEE",
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
    name: "MAX_WITHDRAW_FEE_PERIOD",
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
    name: "MIN_DEPOSIT_AMOUNT",
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
    name: "MIN_WITHDRAW_AMOUNT",
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
    name: "MIN_WITHDRAW_AMOUNT_BOOSTER",
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
    name: "admin",
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
    name: "available",
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
    name: "balanceOf",
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
    name: "cakePool",
    outputs: [
      {
        internalType: "contract ICakePool",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getPricePerFullShare",
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
        name: "_token",
        type: "address"
      }
    ],
    name: "inCaseTokensGetStuck",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "performanceFee",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address"
      }
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_performanceFee",
        type: "uint256"
      }
    ],
    name: "setPerformanceFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address"
      }
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_withdrawAmountBooster",
        type: "uint256"
      }
    ],
    name: "setWithdrawAmountBooster",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_withdrawFee",
        type: "uint256"
      }
    ],
    name: "setWithdrawFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_withdrawFeePeriod",
        type: "uint256"
      }
    ],
    name: "setWithdrawFeePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "staking",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
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
  },
  {
    inputs: [],
    name: "totalShares",
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
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "treasury",
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
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "lastDepositedTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "cakeAtLastUserAction",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "lastUserActionTime",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_shares",
        type: "uint256"
      }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawAmountBooster",
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
    name: "withdrawFee",
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
    name: "withdrawFeePeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// src/queries/fetchVaultUser.ts
var fetchVaultUser = async ({ account, chainId, provider }) => {
  try {
    const cakeVaultAddress = getCakeVaultAddress(chainId);
    const client = provider({ chainId });
    const [userContractResponse, currentPerformanceFee, currentOverdueFee] = await client.multicall({
      contracts: [
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "userInfo",
          args: [account]
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "calculatePerformanceFee",
          args: [account]
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "calculateOverdueFee",
          args: [account]
        }
      ],
      allowFailure: false
    });
    return {
      isLoading: false,
      userShares: new BigNumber7__default.default(userContractResponse[0].toString()).toJSON(),
      lastDepositedTime: userContractResponse[1].toString(),
      lastUserActionTime: userContractResponse[3].toString(),
      cakeAtLastUserAction: new BigNumber7__default.default(userContractResponse[2].toString()).toJSON(),
      userBoostedShare: new BigNumber7__default.default(userContractResponse[6].toString()).toJSON(),
      locked: userContractResponse[7],
      lockEndTime: userContractResponse[5].toString(),
      lockStartTime: userContractResponse[4].toString(),
      lockedAmount: new BigNumber7__default.default(userContractResponse[8].toString()).toJSON(),
      currentPerformanceFee: new BigNumber7__default.default(currentPerformanceFee.toString()).toJSON(),
      currentOverdueFee: new BigNumber7__default.default(currentOverdueFee.toString()).toJSON()
    };
  } catch (error) {
    return {
      isLoading: true,
      userShares: "",
      lastDepositedTime: "",
      lastUserActionTime: "",
      cakeAtLastUserAction: "",
      userBoostedShare: "",
      lockEndTime: "",
      lockStartTime: "",
      locked: false,
      lockedAmount: "",
      currentPerformanceFee: "",
      currentOverdueFee: ""
    };
  }
};
var fetchFlexibleSideVaultUser = async ({
  account,
  chainId,
  provider
}) => {
  try {
    const userContractResponse = await await provider({ chainId }).readContract({
      abi: cakeFlexibleSideVaultV2ABI,
      address: getCakeFlexibleSideVaultAddress(chainId),
      functionName: "userInfo",
      args: [account]
    });
    return {
      isLoading: false,
      userShares: new BigNumber7__default.default(userContractResponse[0].toString()).toJSON(),
      lastDepositedTime: userContractResponse[1].toString(),
      lastUserActionTime: userContractResponse[3].toString(),
      cakeAtLastUserAction: new BigNumber7__default.default(userContractResponse[2].toString()).toJSON()
    };
  } catch (error) {
    return {
      isLoading: true,
      userShares: "",
      lastDepositedTime: "",
      lastUserActionTime: "",
      cakeAtLastUserAction: ""
    };
  }
};

exports.BOOST_WEIGHT = BOOST_WEIGHT;
exports.DURATION_FACTOR = DURATION_FACTOR;
exports.ICE_FLEXIBLE_SIDE_VAULT = ICE_FLEXIBLE_SIDE_VAULT;
exports.ICE_VAULT = ICE_VAULT;
exports.IICE = IICE;
exports.LIVE_POOLS_CONFIG_BY_CHAIN = LIVE_POOLS_CONFIG_BY_CHAIN;
exports.MAX_LOCK_DURATION = MAX_LOCK_DURATION;
exports.ONE_WEEK_DEFAULT = ONE_WEEK_DEFAULT;
exports.POOLS_CONFIG_BY_CHAIN = POOLS_CONFIG_BY_CHAIN;
exports.PoolCategory = PoolCategory;
exports.SECONDS_IN_YEAR = SECONDS_IN_YEAR;
exports.SUPPORTED_CHAIN_IDS = SUPPORTED_CHAIN_IDS;
exports.UNLOCK_FREE_DURATION = UNLOCK_FREE_DURATION;
exports.VaultKey = VaultKey;
exports.blockTime = blockTime;
exports.blocksPerYear = blocksPerYear;
exports.cakeFlexibleSideVaultV2ABI = cakeFlexibleSideVaultV2ABI;
exports.cakeVaultV2ABI = cakeVaultV2ABI;
exports.fetchFlexibleSideVaultUser = fetchFlexibleSideVaultUser;
exports.fetchPoolsAllowance = fetchPoolsAllowance;
exports.fetchPoolsProfileRequirement = fetchPoolsProfileRequirement;
exports.fetchPoolsStakingLimits = fetchPoolsStakingLimits;
exports.fetchPoolsStakingLimitsByBlock = fetchPoolsStakingLimitsByBlock;
exports.fetchPoolsTimeLimits = fetchPoolsTimeLimits;
exports.fetchPoolsTotalStaking = fetchPoolsTotalStaking;
exports.fetchPublicFlexibleSideVaultData = fetchPublicFlexibleSideVaultData;
exports.fetchPublicIfoData = fetchPublicIfoData;
exports.fetchPublicVaultData = fetchPublicVaultData;
exports.fetchUserBalances = fetchUserBalances;
exports.fetchUserIfoCredit = fetchUserIfoCredit;
exports.fetchUserPendingRewards = fetchUserPendingRewards;
exports.fetchUserStakeBalances = fetchUserStakeBalances;
exports.fetchVaultFees = fetchVaultFees;
exports.fetchVaultUser = fetchVaultUser;
exports.getCakeFlexibleSideVaultAddress = getCakeFlexibleSideVaultAddress;
exports.getCakeVaultAddress = getCakeVaultAddress;
exports.getContractAddress = getContractAddress;
exports.getIfoCreditAddressContract = getIfoCreditAddressContract;
exports.getLivePoolsConfig = getLivePoolsConfig;
exports.getPoolAprByTokenPerBlock = getPoolAprByTokenPerBlock;
exports.getPoolAprByTokenPerSecond = getPoolAprByTokenPerSecond;
exports.getPoolContractBySousId = getPoolContractBySousId;
exports.getPoolsConfig = getPoolsConfig;
exports.getSmartChefChefV2Contract = getSmartChefChefV2Contract;
exports.getSousChefBNBContract = getSousChefBNBContract;
exports.getSousChefV2Contract = getSousChefV2Contract;
exports.iCakeABI = iCakeABI;
exports.isLegacyPool = isLegacyPool;
exports.isPoolsSupported = isPoolsSupported;
exports.isUpgradedPool = isUpgradedPool;
exports.smartChefABI = smartChefABI;
exports.sousChefABI = sousChefABI;
exports.sousChefBnbABI = sousChefBnbABI;
exports.sousChefV2ABI = sousChefV2ABI;
exports.sousChefV3ABI = sousChefV3ABI;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map