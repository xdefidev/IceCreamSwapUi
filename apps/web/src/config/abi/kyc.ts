export const kycABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      {
        indexed: false,
        name: "previousAdmin",
        internalType: "address",
        type: "address"
      },
      {
        indexed: false,
        name: "newAdmin",
        internalType: "address",
        type: "address"
      }
    ],
    name: "AdminChanged",
    anonymous: false,
    type: "event"
  },
  {
    inputs: [
      {
        indexed: true,
        name: "owner",
        internalType: "address",
        type: "address"
      },
      {
        indexed: true,
        name: "approved",
        internalType: "address",
        type: "address"
      },
      {
        indexed: true,
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    name: "Approval",
    anonymous: false,
    type: "event"
  },
  {
    inputs: [
      {
        indexed: true,
        name: "owner",
        internalType: "address",
        type: "address"
      },
      {
        indexed: true,
        name: "operator",
        internalType: "address",
        type: "address"
      },
      {
        indexed: false,
        name: "approved",
        internalType: "bool",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    anonymous: false,
    type: "event"
  },
  {
    inputs: [
      {
        indexed: true,
        name: "beacon",
        internalType: "address",
        type: "address"
      }
    ],
    name: "BeaconUpgraded",
    anonymous: false,
    type: "event"
  },
  {
    inputs: [
      {
        indexed: false,
        name: "version",
        internalType: "uint8",
        type: "uint8"
      }
    ],
    name: "Initialized",
    anonymous: false,
    type: "event"
  },
  {
    inputs: [
      {
        indexed: true,
        name: "role",
        internalType: "bytes32",
        type: "bytes32"
      },
      {
        indexed: true,
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32"
      },
      {
        indexed: true,
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32"
      }
    ],
    name: "RoleAdminChanged",
    anonymous: false,
    type: "event"
  },
  {
    inputs: [
      {
        indexed: true,
        name: "role",
        internalType: "bytes32",
        type: "bytes32"
      },
      {
        indexed: true,
        name: "account",
        internalType: "address",
        type: "address"
      },
      {
        indexed: true,
        name: "sender",
        internalType: "address",
        type: "address"
      }
    ],
    name: "RoleGranted",
    anonymous: false,
    type: "event"
  },
  {
    inputs: [
      {
        indexed: true,
        name: "role",
        internalType: "bytes32",
        type: "bytes32"
      },
      {
        indexed: true,
        name: "account",
        internalType: "address",
        type: "address"
      },
      {
        indexed: true,
        name: "sender",
        internalType: "address",
        type: "address"
      }
    ],
    name: "RoleRevoked",
    anonymous: false,
    type: "event"
  },
  {
    inputs: [
      {
        indexed: true,
        name: "from",
        internalType: "address",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        internalType: "address",
        type: "address"
      },
      {
        indexed: true,
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    name: "Transfer",
    anonymous: false,
    type: "event"
  },
  {
    inputs: [
      {
        indexed: true,
        name: "implementation",
        internalType: "address",
        type: "address"
      }
    ],
    name: "Upgraded",
    anonymous: false,
    type: "event"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "bytes32",
        type: "bytes32"
      }
    ],
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "bytes32",
        type: "bytes32"
      }
    ],
    inputs: [],
    name: "MINTER_ROLE",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "bytes32",
        type: "bytes32"
      }
    ],
    inputs: [],
    name: "REVOKE_ROLE",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "bytes32",
        type: "bytes32"
      }
    ],
    inputs: [],
    name: "UPGRADER_ROLE",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "to",
        internalType: "address",
        type: "address"
      },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    name: "approve",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address"
      }
    ],
    name: "balanceOf",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    name: "burn",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "string",
        type: "string"
      }
    ],
    inputs: [],
    name: "contractURI",
    stateMutability: "pure",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "address",
        type: "address"
      }
    ],
    inputs: [
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    name: "getApproved",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "bytes32",
        type: "bytes32"
      }
    ],
    inputs: [
      {
        name: "role",
        internalType: "bytes32",
        type: "bytes32"
      }
    ],
    name: "getRoleAdmin",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "role",
        internalType: "bytes32",
        type: "bytes32"
      },
      {
        name: "account",
        internalType: "address",
        type: "address"
      }
    ],
    name: "grantRole",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "bool",
        type: "bool"
      }
    ],
    inputs: [
      {
        name: "role",
        internalType: "bytes32",
        type: "bytes32"
      },
      {
        name: "account",
        internalType: "address",
        type: "address"
      }
    ],
    name: "hasRole",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [],
    inputs: [],
    name: "initialize",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "bool",
        type: "bool"
      }
    ],
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address"
      },
      {
        name: "operator",
        internalType: "address",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "string",
        type: "string"
      }
    ],
    inputs: [],
    name: "name",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "address",
        type: "address"
      }
    ],
    inputs: [
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    name: "ownerOf",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "bytes32",
        type: "bytes32"
      }
    ],
    inputs: [],
    name: "proxiableUUID",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "role",
        internalType: "bytes32",
        type: "bytes32"
      },
      {
        name: "account",
        internalType: "address",
        type: "address"
      }
    ],
    name: "renounceRole",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    name: "revoke",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "role",
        internalType: "bytes32",
        type: "bytes32"
      },
      {
        name: "account",
        internalType: "address",
        type: "address"
      }
    ],
    name: "revokeRole",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "to",
        internalType: "address",
        type: "address"
      }
    ],
    name: "safeMint",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "from",
        internalType: "address",
        type: "address"
      },
      {
        name: "to",
        internalType: "address",
        type: "address"
      },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    name: "safeTransferFrom",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "from",
        internalType: "address",
        type: "address"
      },
      {
        name: "to",
        internalType: "address",
        type: "address"
      },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      },
      {
        name: "data",
        internalType: "bytes",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "operator",
        internalType: "address",
        type: "address"
      },
      {
        name: "approved",
        internalType: "bool",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "bool",
        type: "bool"
      }
    ],
    inputs: [
      {
        name: "interfaceId",
        internalType: "bytes4",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "string",
        type: "string"
      }
    ],
    inputs: [],
    name: "symbol",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [
      {
        name: "",
        internalType: "string",
        type: "string"
      }
    ],
    inputs: [
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    name: "tokenURI",
    stateMutability: "view",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "from",
        internalType: "address",
        type: "address"
      },
      {
        name: "to",
        internalType: "address",
        type: "address"
      },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "newImplementation",
        internalType: "address",
        type: "address"
      }
    ],
    name: "upgradeTo",
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    outputs: [],
    inputs: [
      {
        name: "newImplementation",
        internalType: "address",
        type: "address"
      },
      {
        name: "data",
        internalType: "bytes",
        type: "bytes"
      }
    ],
    name: "upgradeToAndCall",
    stateMutability: "payable",
    type: "function"
  }
] as const
