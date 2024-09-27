export const bridgeABI = [
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'domainID',
        type: 'uint8'
      },
      {
        internalType: 'address[]',
        name: 'initialRelayers',
        type: 'address[]'
      },
      {
        internalType: 'uint256',
        name: 'initialRelayerThreshold',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'expiry',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'bridgeFee',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'destinationDomainID',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'resourceID',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'depositNonce',
        type: 'uint64'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'handlerResponse',
        type: 'bytes'
      }
    ],
    name: 'Deposit',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes',
        name: 'lowLevelData',
        type: 'bytes'
      }
    ],
    name: 'FailedHandlerExecution',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Paused',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'originDomainID',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'depositNonce',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'enum IceCreamSwapBridge.ProposalStatus',
        name: 'status',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'dataHash',
        type: 'bytes32'
      }
    ],
    name: 'ProposalEvent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'originDomainID',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'depositNonce',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'enum IceCreamSwapBridge.ProposalStatus',
        name: 'status',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'dataHash',
        type: 'bytes32'
      }
    ],
    name: 'ProposalVote',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newThreshold',
        type: 'uint256'
      }
    ],
    name: 'RelayerThresholdChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleGranted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleRevoked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'Unpaused',
    type: 'event'
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'EXECUTOR_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'MAX_RELAYERS',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'RELAYER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: '_bridgeFee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    name: '_depositCounts',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: '_domainID',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: '_expiry',
    outputs: [
      {
        internalType: 'uint40',
        name: '',
        type: 'uint40'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint72',
        name: 'destNonce',
        type: 'uint72'
      },
      {
        internalType: 'bytes32',
        name: 'dataHash',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'relayer',
        type: 'address'
      }
    ],
    name: '_hasVotedOnProposal',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: '_relayerThreshold',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: '_resourceIDToHandlerAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: '_totalRelayers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newThreshold',
        type: 'uint256'
      }
    ],
    name: 'adminChangeRelayerThreshold',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'adminPauseTransfers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'resourceID',
        type: 'bytes32'
      }
    ],
    name: 'adminRemoveResource',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'domainID',
        type: 'uint8'
      },
      {
        internalType: 'uint64',
        name: 'nonce',
        type: 'uint64'
      }
    ],
    name: 'adminSetDepositNonce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'forwarder',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'valid',
        type: 'bool'
      }
    ],
    name: 'adminSetForwarder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'handlerAddress',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'resourceID',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'contractAddress',
        type: 'address'
      },
      {
        internalType: 'bytes4',
        name: 'depositFunctionSig',
        type: 'bytes4'
      },
      {
        internalType: 'uint256',
        name: 'depositFunctionDepositerOffset',
        type: 'uint256'
      },
      {
        internalType: 'bytes4',
        name: 'executeFunctionSig',
        type: 'bytes4'
      }
    ],
    name: 'adminSetGenericResource',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'handlerAddress',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'resourceID',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address'
      }
    ],
    name: 'adminSetResource',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'adminUnpauseTransfers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'destinationDomainID',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'resourceID',
        type: 'bytes32'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'calculateBridgeFee',
    outputs: [
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'destinationDomainID',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'resourceID',
        type: 'bytes32'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'calculateHandlerFee',
    outputs: [
      {
        internalType: 'address',
        name: 'feeToken',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'domainID',
        type: 'uint8'
      },
      {
        internalType: 'uint64',
        name: 'depositNonce',
        type: 'uint64'
      },
      {
        internalType: 'bytes32',
        name: 'dataHash',
        type: 'bytes32'
      }
    ],
    name: 'cancelProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8'
      }
    ],
    name: 'chainFeeMultipliers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'destinationDomainID',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'resourceID',
        type: 'bytes32'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'domainID',
        type: 'uint8'
      },
      {
        internalType: 'uint64',
        name: 'depositNonce',
        type: 'uint64'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      },
      {
        internalType: 'bytes32',
        name: 'resourceID',
        type: 'bytes32'
      },
      {
        internalType: 'bool',
        name: 'revertOnFail',
        type: 'bool'
      }
    ],
    name: 'executeProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'originDomainID',
        type: 'uint8'
      },
      {
        internalType: 'uint64',
        name: 'depositNonce',
        type: 'uint64'
      },
      {
        internalType: 'bytes32',
        name: 'dataHash',
        type: 'bytes32'
      }
    ],
    name: 'getProposal',
    outputs: [
      {
        components: [
          {
            internalType: 'enum IceCreamSwapBridge.ProposalStatus',
            name: '_status',
            type: 'uint8'
          },
          {
            internalType: 'uint200',
            name: '_yesVotes',
            type: 'uint200'
          },
          {
            internalType: 'uint8',
            name: '_yesVotesTotal',
            type: 'uint8'
          },
          {
            internalType: 'uint40',
            name: '_proposedBlock',
            type: 'uint40'
          }
        ],
        internalType: 'struct IceCreamSwapBridge.Proposal',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'getRoleMember',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleMemberCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'getRoleMemberIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'relayer',
        type: 'address'
      }
    ],
    name: 'isRelayer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'isValidForwarder',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'resourceFeeMultipliers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'bridgeFee',
        type: 'uint256'
      }
    ],
    name: 'setBridgeFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint40',
        name: 'expiry',
        type: 'uint40'
      }
    ],
    name: 'setExpiry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'domainId',
        type: 'uint8'
      },
      {
        internalType: 'uint256',
        name: 'feeMultiplier',
        type: 'uint256'
      }
    ],
    name: 'setFeeMultiplierChain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'resourceId',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'feeMultiplier',
        type: 'uint256'
      }
    ],
    name: 'setFeeMultiplierResource',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newAdmin',
        type: 'address'
      }
    ],
    name: 'transferAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'domainID',
        type: 'uint8'
      },
      {
        internalType: 'uint64',
        name: 'depositNonce',
        type: 'uint64'
      },
      {
        internalType: 'bytes32',
        name: 'resourceID',
        type: 'bytes32'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      }
    ],
    name: 'voteProposal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
] as const