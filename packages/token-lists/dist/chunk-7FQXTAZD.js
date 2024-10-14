'use strict';

var swapSdkCore = require('@pancakeswap/swap-sdk-core');

// src/wrappedTokenInfo.ts
var WrappedTokenInfo = class extends swapSdkCore.Token {
  constructor(tokenInfo) {
    super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name);
    this.logoURI = tokenInfo.logoURI;
    this.tags = tokenInfo.tags;
  }
  get serialize() {
    return {
      address: this.address,
      chainId: this.chainId,
      decimals: this.decimals,
      symbol: this.symbol,
      name: this.name,
      projectLink: this.projectLink,
      logoURI: this.logoURI
    };
  }
};
function deserializeToken(serializedToken) {
  if (serializedToken == null ? void 0 : serializedToken.logoURI) {
    return new WrappedTokenInfo({
      chainId: serializedToken.chainId,
      address: serializedToken.address,
      decimals: serializedToken.decimals,
      symbol: serializedToken.symbol || "Unknown",
      name: serializedToken.name || "Unknown",
      logoURI: serializedToken.logoURI
    });
  }
  return new swapSdkCore.Token(
    serializedToken == null ? void 0 : serializedToken.chainId,
    serializedToken == null ? void 0 : serializedToken.address,
    serializedToken == null ? void 0 : serializedToken.decimals,
    serializedToken == null ? void 0 : serializedToken.symbol,
    serializedToken == null ? void 0 : serializedToken.name,
    serializedToken == null ? void 0 : serializedToken.projectLink
  );
}

// src/getVersionUpgrade.ts
var VersionUpgrade = /* @__PURE__ */ ((VersionUpgrade2) => {
  VersionUpgrade2[VersionUpgrade2["NONE"] = 0] = "NONE";
  VersionUpgrade2[VersionUpgrade2["PATCH"] = 1] = "PATCH";
  VersionUpgrade2[VersionUpgrade2["MINOR"] = 2] = "MINOR";
  VersionUpgrade2[VersionUpgrade2["MAJOR"] = 3] = "MAJOR";
  return VersionUpgrade2;
})(VersionUpgrade || {});
function getVersionUpgrade(base, update) {
  if (update.major > base.major) {
    return 3 /* MAJOR */;
  }
  if (update.major < base.major) {
    return 0 /* NONE */;
  }
  if (update.minor > base.minor) {
    return 2 /* MINOR */;
  }
  if (update.minor < base.minor) {
    return 0 /* NONE */;
  }
  return update.patch > base.patch ? 1 /* PATCH */ : 0 /* NONE */;
}

// src/filtering.ts
function createFilterToken(search, isAddress) {
  if (isAddress(search)) {
    const address = search.toLowerCase();
    return (t) => "address" in t && address === t.address.toLowerCase();
  }
  const lowerSearchParts = search.toLowerCase().split(/\s+/).filter((s) => s.length > 0);
  if (lowerSearchParts.length === 0) {
    return () => true;
  }
  const matchesSearch = (s) => {
    const sParts = s.toLowerCase().split(/\s+/).filter((s_) => s_.length > 0);
    return lowerSearchParts.every((p) => p.length === 0 || sParts.some((sp) => sp.startsWith(p) || sp.endsWith(p)));
  };
  return (token) => {
    const { symbol, name } = token;
    return Boolean(symbol && matchesSearch(symbol) || name && matchesSearch(name));
  };
}

exports.VersionUpgrade = VersionUpgrade;
exports.WrappedTokenInfo = WrappedTokenInfo;
exports.createFilterToken = createFilterToken;
exports.deserializeToken = deserializeToken;
exports.getVersionUpgrade = getVersionUpgrade;
