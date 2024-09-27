export const campaignFactoryABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'campaign',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'CampaignAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'campaign',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'collected',
        type: 'uint256'
      }
    ],
    name: 'CampaignLocked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'campaign',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'CampaignUnlocked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'allowedContracts',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'campaigns',
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
    name: 'cloneAddress',
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
        components: [
          {
            internalType: 'uint256',
            name: 'softCap',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'hardCap',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'start_date',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'end_date',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'rate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'min_allowed',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'max_allowed',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pool_rate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'lock_duration',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'liquidity_rate',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'whitelist_enabled',
            type: 'bool'
          }
        ],
        internalType: 'struct IPSIPadCampaign.CampaignData',
        name: '_data',
        type: 'tuple'
      },
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenFeePercentage',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_factory',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_router',
        type: 'address'
      }
    ],
    name: 'createCampaign',
    outputs: [
      {
        internalType: 'address',
        name: 'campaign_address',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'softCap',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'hardCap',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'start_date',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'end_date',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'rate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'min_allowed',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'max_allowed',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pool_rate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'lock_duration',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'liquidity_rate',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'whitelist_enabled',
            type: 'bool'
          }
        ],
        internalType: 'struct IPSIPadCampaign.CampaignData',
        name: '_data',
        type: 'tuple'
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_tokenFeePercentage',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_factory',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_router',
        type: 'address'
      }
    ],
    name: 'createCampaignWithOwner',
    outputs: [
      {
        internalType: 'address',
        name: 'campaign_address',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'default_factory',
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
    name: 'default_router',
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
        internalType: 'uint256',
        name: 'campaignId',
        type: 'uint256'
      }
    ],
    name: 'emergencyRefund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'fee_aggregator',
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
        internalType: 'address',
        name: 'user',
        type: 'address'
      }
    ],
    name: 'getUserCampaigns',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_default_factory',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_default_router',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_fee_aggregator',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_stable_coin',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_stable_coin_fee',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_token_fee',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_cloneAddress',
        type: 'address'
      }
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'campaignId',
        type: 'uint256'
      }
    ],
    name: 'lock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
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
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_allowedContracts',
        type: 'address[]'
      },
      {
        internalType: 'bool',
        name: 'allowed',
        type: 'bool'
      }
    ],
    name: 'setAllowedContracts',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_cloneAddress',
        type: 'address'
      }
    ],
    name: 'setCloneAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_default_factory',
        type: 'address'
      }
    ],
    name: 'setDefaultFactory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_default_router',
        type: 'address'
      }
    ],
    name: 'setDefaultRouter',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_fee_aggregator',
        type: 'address'
      }
    ],
    name: 'setFeeAggregator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stable_coin',
        type: 'address'
      }
    ],
    name: 'setStableCoin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_stable_coin_fee',
        type: 'uint256'
      }
    ],
    name: 'setStableCoinFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_token_fee',
        type: 'uint256'
      }
    ],
    name: 'setTokenFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'stable_coin',
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
    name: 'stable_coin_fee',
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
    name: 'token_fee',
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
        components: [
          {
            internalType: 'uint256',
            name: 'softCap',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'hardCap',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'start_date',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'end_date',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'rate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'min_allowed',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'max_allowed',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'pool_rate',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'lock_duration',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'liquidity_rate',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'whitelist_enabled',
            type: 'bool'
          }
        ],
        internalType: 'struct IPSIPadCampaign.CampaignData',
        name: '_data',
        type: 'tuple'
      },
      {
        internalType: 'uint256',
        name: '_tokenFeePercentage',
        type: 'uint256'
      }
    ],
    name: 'tokensNeeded',
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
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'campaignId',
        type: 'uint256'
      }
    ],
    name: 'unlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'userCampaigns',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const