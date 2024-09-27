export const bridgeErc20HandlerABI = [
  {
    inputs: [
      {
        name: 'bridgeAddress',
        internalType: 'address',
        type: 'address'
      },
      {
        name: 'feePercentage',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
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
    name: '_bridgeAddress',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'bool',
        type: 'bool'
      }
    ],
    inputs: [
      {
        name: '',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: '_burnList',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'bool',
        type: 'bool'
      }
    ],
    inputs: [
      {
        name: '',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: '_contractWhitelist',
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
    name: '_feePercentage',
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
        internalType: 'uint8',
        type: 'uint8'
      }
    ],
    name: '_minFeeMultiplierChain',
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
      }
    ],
    name: '_minFeeMultiplierToken',
    stateMutability: 'view',
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
    inputs: [
      {
        name: '',
        internalType: 'bytes32',
        type: 'bytes32'
      }
    ],
    name: '_resourceIDToTokenContractAddress',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'bytes32',
        type: 'bytes32'
      }
    ],
    inputs: [
      {
        name: '',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: '_tokenContractAddressToResourceID',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [
      {
        name: 'feeToken',
        internalType: 'address',
        type: 'address'
      },
      {
        name: 'fee',
        internalType: 'uint256',
        type: 'uint256'
      }
    ],
    inputs: [
      {
        name: 'resourceID',
        internalType: 'bytes32',
        type: 'bytes32'
      },
      {
        name: 'depositer',
        internalType: 'address',
        type: 'address'
      },
      {
        name: 'destinationDomainID',
        internalType: 'uint8',
        type: 'uint8'
      },
      {
        name: 'data',
        internalType: 'bytes',
        type: 'bytes'
      }
    ],
    name: 'calculateFee',
    stateMutability: 'view',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: 'newBridgeAddress',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'changeBridgeAddress',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: 'feeData',
        internalType: 'bytes',
        type: 'bytes'
      }
    ],
    name: 'changeFee',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [
      {
        name: '',
        internalType: 'bytes',
        type: 'bytes'
      }
    ],
    inputs: [
      {
        name: 'resourceID',
        internalType: 'bytes32',
        type: 'bytes32'
      },
      {
        name: 'depositer',
        internalType: 'address',
        type: 'address'
      },
      {
        name: 'destinationDomainID',
        internalType: 'uint8',
        type: 'uint8'
      },
      {
        name: 'data',
        internalType: 'bytes',
        type: 'bytes'
      }
    ],
    name: 'deposit',
    stateMutability: 'payable',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: 'resourceID',
        internalType: 'bytes32',
        type: 'bytes32'
      },
      {
        name: 'data',
        internalType: 'bytes',
        type: 'bytes'
      }
    ],
    name: 'executeProposal',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'setBurnable',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: 'resourceID',
        internalType: 'bytes32',
        type: 'bytes32'
      },
      {
        name: 'contractAddress',
        internalType: 'address',
        type: 'address'
      }
    ],
    name: 'setResource',
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    outputs: [],
    inputs: [
      {
        name: 'data',
        internalType: 'bytes',
        type: 'bytes'
      }
    ],
    name: 'withdraw',
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const
