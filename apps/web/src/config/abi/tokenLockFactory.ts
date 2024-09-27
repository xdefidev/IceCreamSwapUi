export const tokenLockFactoryABI = [
  {
    inputs: [
      {
        indexed: false,
        name: 'version',
        internalType: 'uint8',
        type: 'uint8'
      }
    ],
    name: 'Initialized',
    anonymous: false,
    type: 'event'
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'lockId',
        internalType: 'uint256',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'oldOwner',
        internalType: 'address',
        type: 'address'
      },
      {
        indexed: true,
        name: 'newOwner',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'OwnerChanged',
    anonymous: false,
    type: 'event'
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        internalType: 'address',
        type: 'address'
      },
      {
        indexed: true,
        name: 'newOwner',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    anonymous: false,
    type: 'event'
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'lockId',
        internalType: 'uint256',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'token',
        internalType: 'address',
        type: 'address'
      },
      {
        indexed: true,
        name: 'owner',
        internalType: 'address',
        type: 'address'
      },
      {
        indexed: false,
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'TokenLocked',
    anonymous: false,
    type: 'event'
  },
  {
    inputs: [
      {
        indexed: true,
        name: 'lockId',
        internalType: 'uint256',
        type: 'uint256'
      },
      {
        indexed: true,
        name: 'token',
        internalType: 'address',
        type: 'address'
      },
      {
        indexed: false,
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'TokenUnlocked',
    anonymous: false,
    type: 'event'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    inputs: [
      {
        name: 'lockId',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'amountToUnlock',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: 'lockId',
        internalType: 'uint256',
        type: 'uint256'
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'changeOwner',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'address',
        type: 'address'
      }
    ],
    inputs: [],
    name: 'fee_aggregator',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'uint256[]',
        type: 'uint256[]'
      }
    ],
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'getTokenLocks',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    inputs: [],
    name: 'getTokensLockedCount',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'uint256[]',
        type: 'uint256[]'
      }
    ],
    inputs: [
      {
        name: 'user',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'getUserLocks',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: '_fee_aggregator',
        internalType: 'address',
        type: 'address'
      },
      {
        name: '_stable_coin',
        internalType: 'address',
        type: 'address'
      },
      {
        name: '_stable_coin_fee',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'initialize',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    inputs: [
      {
        name: 'token',
        internalType: 'address',
        type: 'address'
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256'
      },
      {
        name: 'start_time',
        internalType: 'uint256',
        type: 'uint256'
      },
      {
        name: 'duration',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'lock',
    stateMutability: 'payable',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'address',
        type: 'address'
      }
    ],
    inputs: [],
    name: 'owner',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [],
    name: 'renounceOwnership',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: '_fee_aggregator',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'setFeeAggregator',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: '_stable_coin',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'setStableCoin',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: '_stable_coin_fee',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'setStableCoinFee',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'address',
        type: 'address'
      }
    ],
    inputs: [],
    name: 'stable_coin',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    inputs: [],
    name: 'stable_coin_fee',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    inputs: [
      {
        name: '',
        internalType: 'address',
        type: 'address'
      },
      {
        name: '',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'tokenToLocks',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address'
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address'
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256'
      },
      {
        name: 'start_time',
        internalType: 'uint256',
        type: 'uint256'
      },
      {
        name: 'duration',
        internalType: 'uint256',
        type: 'uint256'
      },
      {
        name: 'amountUnlocked',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    inputs: [
      {
        name: '',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'tokensLocked',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: 'lockId',
        internalType: 'uint256',
        type: 'uint256'
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'unlock',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: 'lockId',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'unlockAvailable',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    inputs: [
      {
        name: 'lockId',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'unlockedAmount',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    inputs: [
      {
        name: '',
        internalType: 'address',
        type: 'address'
      },
      {
        name: '',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    name: 'userTokensLocked',
    stateMutability: 'view',
    type: 'function'
  }
] as const