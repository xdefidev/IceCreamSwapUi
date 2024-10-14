"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server/nextApiHandler.ts
var nextApiHandler_exports = {};
__export(nextApiHandler_exports, {
  nextApiHandler: () => nextApiHandler
});
module.exports = __toCommonJS(nextApiHandler_exports);
var import_next = require("@trpc/server/adapters/next");

// src/server/context.ts
var import_iron_session = require("iron-session");

// src/server/session.ts
var import_database = require("@icecreamswap/database");
var sessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: "ice-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production"
  }
};
var roleLevel = {
  [import_database.Role.ADMIN]: 10,
  [import_database.Role.MOD]: 5,
  [import_database.Role.KYC]: 1,
  [import_database.Role.USER]: 0
};
var isRole = (user, role) => roleLevel[user?.role || import_database.Role.USER] >= roleLevel[role];
var isMod = (user) => isRole(user, import_database.Role.MOD);
var isKyc = (user) => isRole(user, import_database.Role.KYC);

// src/server/context.ts
async function createContext(opts) {
  const session = await (0, import_iron_session.getIronSession)(opts.req, opts.res, sessionOptions);
  return { session, res: opts.res };
}

// src/server/trpc.ts
var import_server = require("@trpc/server");
var t = import_server.initTRPC.context().create({
  errorFormatter({ shape }) {
    return shape;
  }
});
var { router, middleware, mergeRouters } = t;
var publicProcedure = t.procedure;

// src/server/routers/kyc.ts
var import_zod = require("zod");
var import_database2 = require("@icecreamswap/database");

// src/server/telegram.ts
var telegramApiKey = process.env.TELEGRAM_API_KEY;
var telegramChatId = process.env.TELEGRAM_CHAT_ID;
var sendTelegramMessage = async (message) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(message);
    return;
  }
  const url = new URL(`https://api.telegram.org/${telegramApiKey}/sendMessage`);
  url.searchParams.set("chat_id", telegramChatId);
  url.searchParams.set("text", message);
  url.searchParams.set("parse_mode", "Markdown");
  await fetch(url);
};

// src/server/routers/kyc.ts
var import_constants = require("@icecreamswap/constants");
var import_ethers = require("ethers");
var import_crypto = __toESM(require("crypto"));

// src/abi/kyc.json
var kyc_default = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "AdminChanged",
    type: "event"
  },
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
        name: "approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address"
      }
    ],
    name: "BeaconUpgraded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32"
      }
    ],
    name: "RoleAdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleGranted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleRevoked",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address"
      }
    ],
    name: "Upgraded",
    type: "event"
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "REVOKE_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "UPGRADER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
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
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getApproved",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      }
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "hasRole",
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
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
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
      }
    ],
    name: "ownerOf",
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
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "renounceRole",
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
      }
    ],
    name: "revoke",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
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
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
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
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "tokenByIndex",
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
        name: "owner",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "tokenOfOwnerByIndex",
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
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      }
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];

// src/abi/contractKyc.json
var contractKyc_default = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "AdminChanged",
    type: "event"
  },
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
        name: "approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address"
      }
    ],
    name: "BeaconUpgraded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32"
      }
    ],
    name: "RoleAdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleGranted",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      }
    ],
    name: "RoleRevoked",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address"
      }
    ],
    name: "Upgraded",
    type: "event"
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "REVOKE_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "UPGRADER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
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
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "pure",
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
    name: "delegators",
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
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getApproved",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getDelegator",
    outputs: [
      {
        internalType: "uint256",
        name: "delegator",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      }
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "hasRole",
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
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
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
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
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
      }
    ],
    name: "ownerOf",
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
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "renounceRole",
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
      }
    ],
    name: "revoke",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "revokeRole",
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
    name: "safeMint",
    outputs: [],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "delegatorKycId",
        type: "uint256"
      }
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
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
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
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
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
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
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "tokenByIndex",
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
        name: "owner",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "tokenOfOwnerByIndex",
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
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      }
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];

// src/server/getDeploymentUrl.ts
var getDeploymentUrl = () => {
  if (process.env.VERCEL_ENV === "production") {
    return "https://icecreamswap.com";
  }
  if (process.env.VERCEL_ENV === "preview") {
    return process.env.VERCEL_URL;
  }
  return "http://localhost:3000";
};

// src/server/routers/kyc.ts
var import_utils = require("ethers/lib/utils");
var core = (0, import_constants.getChain)(86);
var provider = new import_ethers.providers.JsonRpcProvider(core.rpcUrls.default.http[0]);
var kycRouter = router({
  delegate: publicProcedure.input(
    import_zod.z.object({
      targetAddress: import_zod.z.string(),
      sourceAddress: import_zod.z.string(),
      chainId: import_zod.z.number()
    })
  ).mutation(async ({ input, ctx }) => {
    if (!ctx.session?.user || !isKyc(ctx.session.user)) {
      throw new Error("Unauthorized");
    }
    const { targetAddress, sourceAddress, chainId } = input;
    const chain = (0, import_constants.getChain)(chainId);
    if (!chain) {
      throw new Error("Invalid chain");
    }
    if (await import_database2.prisma.delegation.findFirst({
      where: {
        chainId,
        target: targetAddress,
        source: {
          address: sourceAddress.toLowerCase()
        }
      }
    })) {
      throw new Error("Delegation already exists");
    }
    await import_database2.prisma.delegation.create({
      data: {
        chainId,
        target: targetAddress,
        source: {
          connect: {
            address: sourceAddress.toLowerCase()
          }
        },
        status: "PENDING"
      }
    });
    const explorerUrl = chain.blockExplorers?.default.url;
    const encrypted = encrypt(JSON.stringify({ targetAddress, sourceAddress, chainId }));
    const baseUri = getDeploymentUrl();
    sendTelegramMessage(
      `New delegation request:
Target: [${targetAddress}](${explorerUrl}/address/${targetAddress})
Source: [${sourceAddress}](${explorerUrl}/address/${sourceAddress})
Chain: ${chain.network}

APPROVE \`${baseUri}/api/trpc/kyc.approve?input=%22${encrypted}%22\`

REJECT \`${baseUri}/api/trpc/kyc.reject?input=%22${encrypted}%22\``
    );
    await updateTokenId(sourceAddress);
  }),
  approve: publicProcedure.input(import_zod.z.string()).query(async ({ input, ctx }) => {
    const msg = decrypt(input);
    const { targetAddress, sourceAddress, chainId } = JSON.parse(msg);
    await import_database2.prisma.delegation.updateMany({
      where: {
        chainId,
        target: targetAddress,
        source: {
          address: sourceAddress.toLowerCase()
        }
      },
      data: {
        status: "APPROVED"
      }
    });
    return `Delegation approved: ${targetAddress} -> ${sourceAddress}`;
  }),
  reject: publicProcedure.input(import_zod.z.string()).query(async ({ input, ctx }) => {
    const msg = decrypt(input);
    const { targetAddress, sourceAddress, chainId } = JSON.parse(msg);
    await import_database2.prisma.delegation.updateMany({
      where: {
        chainId,
        target: targetAddress,
        source: {
          address: sourceAddress.toLowerCase()
        }
      },
      data: {
        status: "REJECTED"
      }
    });
    return `Delegation rejected: ${targetAddress} -> ${sourceAddress}`;
  }),
  getDelegation: publicProcedure.input(
    import_zod.z.object({
      targetAddress: import_zod.z.string(),
      sourceAddress: import_zod.z.string(),
      chainId: import_zod.z.number()
    })
  ).query(async ({ input, ctx }) => {
    const { targetAddress, sourceAddress, chainId } = input;
    const chain = (0, import_constants.getChain)(chainId);
    if (!chain) {
      throw new Error("Invalid chain");
    }
    return await import_database2.prisma.delegation.findFirst({
      where: {
        source: {
          address: sourceAddress.toLowerCase()
        },
        target: targetAddress,
        chainId
      }
    });
  }),
  getDelegationSignature: publicProcedure.input(
    import_zod.z.object({
      targetAddress: import_zod.z.string(),
      sourceAddress: import_zod.z.string(),
      chainId: import_zod.z.number()
    })
  ).query(async ({ input, ctx }) => {
    if (!ctx.session?.user || !isKyc(ctx.session.user) || input.sourceAddress.toLowerCase() !== ctx.session.user.wallet.toLowerCase()) {
      throw new Error("Unauthorized");
    }
    const { targetAddress, sourceAddress, chainId } = input;
    const chain = (0, import_constants.getChain)(chainId);
    if (!chain) {
      throw new Error("Invalid chain");
    }
    const delegation = await import_database2.prisma.delegation.findFirst({
      where: {
        source: {
          address: sourceAddress.toLowerCase()
        },
        target: targetAddress,
        chainId
      }
    });
    if (!delegation || delegation.status !== "APPROVED") {
      throw new Error("Delegation not approved");
    }
    const kyc = await import_database2.prisma.kyc.findFirst({
      where: {
        address: sourceAddress.toLowerCase()
      }
    });
    if (!kyc) {
      throw new Error("KYC not found");
    }
    const msg = (0, import_utils.solidityKeccak256)(["uint256", "uint256", "address"], [chainId, kyc.tokenId, targetAddress]);
    const signer = new import_ethers.Wallet(process.env.KYC_MINTER, provider);
    const signature = await signer.signMessage(import_ethers.utils.arrayify(msg));
    return { signature, tokenId: kyc.tokenId, targetAddress };
  }),
  submitDelegation: publicProcedure.input(
    import_zod.z.object({
      targetAddress: import_zod.z.string(),
      sourceAddress: import_zod.z.string(),
      chainId: import_zod.z.number()
    })
  ).mutation(async ({ input }) => {
    const { targetAddress, sourceAddress, chainId } = input;
    const delegationTokenId = await getDelegationTokenId(sourceAddress, targetAddress, chainId);
    await import_database2.prisma.delegation.updateMany({
      data: {
        status: "MINTED",
        tokenId: delegationTokenId
      },
      where: {
        source: {
          address: { equals: sourceAddress.toLowerCase(), mode: "insensitive" }
        },
        target: { equals: targetAddress, mode: "insensitive" }
      }
    });
  })
});
var getLargestTokenId = async () => {
  const tokenId = await import_database2.prisma.kyc.aggregate({
    _max: {
      tokenId: true
    }
  });
  return tokenId._max.tokenId;
};
var updateTokenId = async (walletAddress) => {
  const coreChain = (0, import_constants.getChain)(1116);
  let tokenId = await getLargestTokenId() || 0;
  let owner;
  const kyc = new import_ethers.Contract(coreChain.kyc?.contractKyced, kyc_default, provider);
  do {
    tokenId += 1;
    owner = await new Promise((res) => {
      kyc.ownerOf(tokenId).then((result) => {
        res(result);
      }).catch(() => {
        res(void 0);
      });
    });
    if (owner) {
      try {
        await import_database2.prisma.kyc.update({
          data: {
            tokenId
          },
          where: {
            address: owner.toLowerCase()
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  } while (owner && owner.toLowerCase() !== walletAddress.toLowerCase());
};
var getDelegationTokenId = async (sourceAddress, targetAddress, chainId) => {
  const contractKyc = new import_ethers.Contract((0, import_constants.getChain)(chainId).kyc?.contractKycDelegations, contractKyc_default, provider);
  let tokenId;
  const kyc = await import_database2.prisma.kyc.findFirst({
    where: {
      address: {
        mode: "insensitive",
        equals: sourceAddress.toLowerCase()
      }
    }
  });
  if (!kyc) {
    throw new Error("KYC not found");
  }
  try {
    tokenId = await contractKyc.tokenOfOwnerByIndex(targetAddress, 0);
  } catch (e) {
    throw new Error("Invalid target address");
  }
  const sourceKycTokenId = await contractKyc.delegators(tokenId);
  if (sourceKycTokenId.toNumber() !== kyc.tokenId) {
    throw new Error("Invalid source address");
  }
  if (kyc.tokenId !== sourceKycTokenId.toNumber()) {
    throw new Error("Invalid token id");
  }
  return Number(tokenId.toString());
};
var secret = process.env.SECRET_COOKIE_PASSWORD;
var key = import_crypto.default.scryptSync(secret, "salt", 32);
var encrypt = (text) => {
  const iv = import_crypto.default.randomBytes(16);
  const cipher = import_crypto.default.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}-${encrypted.toString("hex")}`;
};
var decrypt = (text) => {
  const [iv, encrypted] = text.split("-");
  const decipher = import_crypto.default.createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"));
  let decrypted = decipher.update(Buffer.from(encrypted, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// src/server/routers/session.ts
var import_zod3 = require("zod");
var import_crypto2 = require("crypto");
var import_viem = require("viem");

// src/zod-utils.ts
var import_zod2 = require("zod");
var address = import_zod2.z.string().startsWith("0x").length(42);

// src/server/routers/session.ts
var import_database3 = require("@icecreamswap/database");
var secret2 = process.env.SECRET_COOKIE_PASSWORD;
var getCurrentNonce = (key2) => {
  const currentDate = /* @__PURE__ */ new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const currentHour = currentDate.getHours();
  const secretHash = (0, import_crypto2.createHash)("sha256");
  secretHash.update(`${key2}${currentYear}${currentMonth}${currentDay}${currentHour}${secret2}`);
  return secretHash.digest("hex");
};
var sessionRouter = router({
  user: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session.user) {
      return { ...ctx.session.user, isLoggedIn: true };
    }
    return { isLoggedIn: false };
  }),
  nonce: publicProcedure.query(async () => {
    const nonce = getCurrentNonce("session");
    return { nonce };
  }),
  login: publicProcedure.input(
    import_zod3.z.object({
      address,
      signature: import_zod3.z.string()
    })
  ).mutation(async ({ ctx, input }) => {
    if (!await (0, import_viem.verifyMessage)({
      address: input.address,
      message: getCurrentNonce("session"),
      signature: input.signature
    })) {
      ctx.res.status(401);
      return;
    }
    const { session } = ctx;
    const userData = await import_database3.prisma.user.findFirst({
      where: { wallet: input.address },
      select: {
        name: true,
        role: true,
        wallet: true
      }
    });
    if (userData) {
      session.user = userData;
    } else {
      console.log("where", input.address.toLowerCase());
      const kyc = await import_database3.prisma.kyc.findFirst({
        where: { address: input.address.toLowerCase(), status: "verified" }
      });
      console.log(kyc);
      session.user = { wallet: input.address.toLowerCase(), name: "Anonymous", role: kyc ? "KYC" : "USER" };
    }
    await session.save();
  }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    const { session } = ctx;
    session.user = void 0;
    await ctx.session.save();
  })
});

// src/server/routers/token.ts
var import_zod4 = require("zod");
var import_client_s3 = require("@aws-sdk/client-s3");
var import_database4 = require("@icecreamswap/database");
var import_database5 = require("@icecreamswap/database");

// src/abi/v2factory.json
var v2factory_default = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_feeToSetter",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token0",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token1",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "pair",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "PairCreated",
    type: "event"
  },
  {
    constant: true,
    inputs: [],
    name: "INIT_CODE_HASH",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "allPairs",
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
    name: "allPairsLength",
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
        name: "tokenA",
        type: "address"
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address"
      }
    ],
    name: "createPair",
    outputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "feeTo",
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
    name: "feeToSetter",
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
    name: "getPair",
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
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_feeTo",
        type: "address"
      }
    ],
    name: "setFeeTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "_feeToSetter",
        type: "address"
      }
    ],
    name: "setFeeToSetter",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abi/v2pair.json
var v2pair_default = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
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
    stateMutability: "view",
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
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
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
        name: "",
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
    stateMutability: "view",
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
        name: "_reserve0",
        type: "uint112"
      },
      {
        internalType: "uint112",
        name: "_reserve1",
        type: "uint112"
      },
      {
        internalType: "uint32",
        name: "_blockTimestampLast",
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
        name: "_token0",
        type: "address"
      },
      {
        internalType: "address",
        name: "_token1",
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
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
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
    stateMutability: "view",
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

// src/server/routers/token.ts
var import_ethers2 = require("ethers");
var import_constants2 = require("@icecreamswap/constants");
var import_tokens = require("@pancakeswap/tokens");
var import_utils2 = require("ethers/lib/utils");
var import_sdk = require("@pancakeswap/sdk");
var tokenRouter = router({
  add: publicProcedure.input(
    import_zod4.z.object({
      tokenAddress: import_zod4.z.string(),
      tokenName: import_zod4.z.string(),
      tokenSymbol: import_zod4.z.string(),
      tokenDecimals: import_zod4.z.number(),
      chainId: import_zod4.z.number(),
      logo: import_zod4.z.string().optional()
    })
  ).mutation(async ({ input, ctx }) => {
    const tokenAddress = (0, import_utils2.getAddress)(input.tokenAddress);
    const mod = isMod(ctx.session?.user);
    if (!input.logo) {
      throw new Error("MissingLogo");
    } else if (!ctx.session?.user) {
      throw new Error("MissingLogin");
    } else if (!isKyc(ctx.session.user)) {
      throw new Error("MissingKYC");
    } else if (await checkListed(tokenAddress, input.chainId)) {
      throw new Error("AlreadyListed");
    } else if (!mod && !checkDelegate(tokenAddress, ctx.session.user.wallet)) {
      throw new Error("MissingDelegation");
    } else if (!mod && !await checkLiquidity(tokenAddress, input.chainId)) {
      throw new Error("InsufficientLiquidity");
    }
    const s3Client = new import_client_s3.S3Client({});
    const binary = Buffer.from(input.logo, "base64");
    await s3Client.send(
      new import_client_s3.PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `token/${input.chainId}/${tokenAddress}.png`,
        Body: binary,
        ContentType: "image/png",
        GrantRead: "uri=http://acs.amazonaws.com/groups/global/AllUsers"
      })
    );
    await import_database4.prisma.token.create({
      data: {
        name: input.tokenName,
        symbol: input.tokenSymbol,
        address: tokenAddress,
        decimals: input.tokenDecimals,
        chainId: input.chainId,
        listed: import_database5.Listed.DEFAULT_LIST,
        addedBy: {
          connect: {
            wallet: ctx.session.user.wallet
          }
        }
      }
    });
  }),
  defaultList: publicProcedure.query(async () => {
    let tokens = [];
    try {
      tokens = await import_database4.prisma.token.findMany({
        where: {
          listed: import_database5.Listed.DEFAULT_LIST
        }
      });
    } catch (e) {
      console.error("failed to load tokens to generate token list", e);
    }
    try {
      const kycs = await import_database4.prisma.delegation.findMany({
        where: {
          target: {
            in: tokens.map((token) => token.address),
            mode: "insensitive"
          },
          status: "MINTED"
        }
      });
      kycs.forEach((kyc) => {
        const token = tokens.find((t2) => t2.address.toLowerCase() === kyc.target.toLowerCase());
        if (token) {
          token.tags = token.tags || [];
          token.tags.push("KYCed");
        }
      });
    } catch (e) {
      console.error("Failed to load KYC delegations to generate token list", e);
    }
    const kycedTokens = tokens.filter((token) => token.tags?.includes("KYCed"));
    const nonKycedTokens = tokens.filter((token) => !token.tags?.includes("KYCed"));
    const tokensSorted = kycedTokens.concat(nonKycedTokens);
    return {
      name: "IceCreamSwap Default",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: {
        major: 1,
        minor: 0,
        patch: 0
      },
      tags: {},
      logoURI: "https://icecreamswap.com/logo.png",
      keywords: ["icecreamswap", "default"],
      tokens: tokensSorted.map((token) => ({
        name: token.name,
        symbol: token.symbol,
        address: token.address,
        chainId: token.chainId,
        decimals: token.decimals,
        logoURI: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/token/${token.chainId}/${token.address}.png`,
        tags: token.tags || []
      }))
    };
  })
});
var checkListed = async (tokenAddress, chainId) => {
  const token = await import_database4.prisma.token.findFirst({
    where: {
      address: {
        equals: tokenAddress,
        mode: "insensitive"
      },
      chainId: {
        equals: chainId
      }
    }
  });
  return !!token;
};
var checkDelegate = async (tokenAddress, wallet) => {
  const kyc = await import_database4.prisma.delegation.findFirst({
    where: {
      target: {
        equals: tokenAddress,
        mode: "insensitive"
      },
      status: "MINTED",
      source: {
        address: {
          equals: wallet,
          mode: "insensitive"
        }
      }
    }
  });
  return !!kyc;
};
var usdThreshold = 4e3;
var checkLiquidity = async (tokenAddress, chainId) => {
  const chain = (0, import_constants2.getChain)(chainId);
  if (!chain) {
    return false;
  }
  const provider2 = new import_ethers2.providers.JsonRpcProvider(chain.rpcUrls.default.http[0]);
  const iceAddress = import_tokens.ICE[chainId].address;
  const usdAddress = import_tokens.USD[chainId].address;
  const wethAddress = import_sdk.WETH9[chainId].address;
  const tokenIceLiquidity = await getPairLiquidity(provider2, iceAddress, tokenAddress, chainId);
  const tokenWethLiquidity = await getPairLiquidity(provider2, wethAddress, tokenAddress, chainId);
  const tokenUsdLiquidity = await getPairLiquidity(provider2, usdAddress, tokenAddress, chainId);
  const summedLiquidity = tokenIceLiquidity * 2 + tokenWethLiquidity + tokenUsdLiquidity;
  return summedLiquidity >= usdThreshold;
};
var getPairLiquidity = async (provider2, baseAddress, quoteAddress, chainId) => {
  const usdAddress = import_tokens.USD[chainId].address;
  const baseQuoteAddress = await getPairAddress(quoteAddress, baseAddress, chainId);
  if (!baseQuoteAddress) {
    return 0;
  }
  const baseQuotePair = new import_ethers2.Contract(baseQuoteAddress, v2pair_default, provider2);
  let basePrice;
  if (baseAddress.toLowerCase() !== usdAddress.toLowerCase()) {
    const baseUsdAddress = await getPairAddress(baseAddress, usdAddress, chainId);
    if (!baseUsdAddress) {
      return 0;
    }
    const baseUsdPair = new import_ethers2.Contract(baseUsdAddress, v2pair_default, provider2);
    basePrice = await getPairPrice(baseUsdPair, usdAddress);
  } else {
    basePrice = import_ethers2.utils.parseUnits("1", 18);
  }
  if (!basePrice) {
    return 0;
  }
  const baseQuoteReserves = await baseQuotePair.getReserves();
  let baseReserves;
  if ((await baseQuotePair.token0()).toLowerCase() === baseAddress.toLowerCase()) {
    baseReserves = baseQuoteReserves[0];
  } else {
    baseReserves = baseQuoteReserves[1];
  }
  const baseValue = basePrice.mul(baseReserves).div(import_ethers2.utils.parseUnits("1", 18));
  const liquidity = Number(import_ethers2.utils.formatUnits(baseValue, 18)) * 2;
  return liquidity;
};
var getPairAddress = async (tokenA, tokenB, chainId) => {
  const chain = (0, import_constants2.getChain)(chainId);
  if (!chain || !chain.swap?.factoryAddress) {
    throw new Error("Invalid chainId");
  }
  const provider2 = new import_ethers2.providers.JsonRpcProvider(chain.rpcUrls.default.http[0]);
  const factory = new import_ethers2.Contract(chain.swap?.factoryAddress, v2factory_default, provider2);
  try {
    const pairAddress = await factory.getPair(tokenA, tokenB);
    if (pairAddress === "0x0000000000000000000000000000000000000000") {
      return void 0;
    }
    return pairAddress;
  } catch {
    return void 0;
  }
};
var getPairPrice = async (pair, baseToken) => {
  const reserves = await pair.getReserves();
  const token0 = await pair.token0();
  const token1 = await pair.token1();
  if (token0.toLowerCase() === baseToken.toLowerCase()) {
    return import_ethers2.utils.parseUnits("1", 18).mul(reserves[0]).div(reserves[1]);
  }
  if (token1.toLowerCase() === baseToken.toLowerCase()) {
    return import_ethers2.utils.parseUnits("1", 18).mul(reserves[1]).div(reserves[0]);
  }
  return void 0;
};

// src/server/routers/_app.ts
var appRouter = router({
  health: publicProcedure.query(() => "yay!"),
  session: sessionRouter,
  token: tokenRouter,
  kyc: kycRouter
});

// src/server/nextApiHandler.ts
var nextApiHandler = (0, import_next.createNextApiHandler)({
  router: appRouter,
  createContext,
  onError: ({ error }) => {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error(error);
    }
  },
  batching: {
    enabled: true
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  nextApiHandler
});
