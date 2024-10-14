import { ChainId, TradeType } from '@pancakeswap/sdk';
import { FeeAmount } from '@pancakeswap/v3-sdk';
import { z } from 'zod';
import { PoolType } from './types';
export declare const zPools: z.ZodArray<z.ZodUnion<[z.ZodObject<{
    type: z.ZodNativeEnum<typeof PoolType>;
    reserve0: z.ZodObject<{
        currency: z.ZodObject<{
            address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
            decimals: z.ZodNumber;
            symbol: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }>;
    reserve1: z.ZodObject<{
        currency: z.ZodObject<{
            address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
            decimals: z.ZodNumber;
            symbol: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    type: PoolType;
    reserve0: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    reserve1: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
}, {
    type: PoolType;
    reserve0: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    reserve1: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
}>, z.ZodObject<{
    type: z.ZodNativeEnum<typeof PoolType>;
    token0: z.ZodObject<{
        address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        decimals: z.ZodNumber;
        symbol: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    }, {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    }>;
    token1: z.ZodObject<{
        address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        decimals: z.ZodNumber;
        symbol: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    }, {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    }>;
    fee: z.ZodNativeEnum<typeof FeeAmount>;
    liquidity: z.ZodString;
    sqrtRatioX96: z.ZodString;
    tick: z.ZodNumber;
    address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
    token0ProtocolFee: z.ZodString;
    token1ProtocolFee: z.ZodString;
}, "strip", z.ZodTypeAny, {
    address: `0x${string}`;
    fee: FeeAmount;
    type: PoolType;
    token0: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    token1: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    liquidity: string;
    sqrtRatioX96: string;
    tick: number;
    token0ProtocolFee: string;
    token1ProtocolFee: string;
}, {
    address: `0x${string}`;
    fee: FeeAmount;
    type: PoolType;
    token0: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    token1: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    liquidity: string;
    sqrtRatioX96: string;
    tick: number;
    token0ProtocolFee: string;
    token1ProtocolFee: string;
}>, z.ZodObject<{
    type: z.ZodNativeEnum<typeof PoolType>;
    balances: z.ZodArray<z.ZodObject<{
        currency: z.ZodObject<{
            address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
            decimals: z.ZodNumber;
            symbol: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }>, "many">;
    amplifier: z.ZodString;
    fee: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fee: string;
    amplifier: string;
    balances: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }[];
    type: PoolType;
}, {
    fee: string;
    amplifier: string;
    balances: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }[];
    type: PoolType;
}>]>, "many">;
export declare const zRouterGetParams: z.ZodObject<{
    amount: z.ZodObject<{
        currency: z.ZodObject<{
            address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
            decimals: z.ZodNumber;
            symbol: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }>;
    chainId: z.ZodNativeEnum<typeof ChainId>;
    blockNumber: z.ZodOptional<z.ZodString>;
    tradeType: z.ZodNativeEnum<typeof TradeType>;
    maxSplits: z.ZodOptional<z.ZodNumber>;
    gasPriceWei: z.ZodOptional<z.ZodString>;
    maxHops: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodObject<{
        address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        decimals: z.ZodNumber;
        symbol: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    }, {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    }>;
    poolTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PoolType>, "many">>;
}, "strip", z.ZodTypeAny, {
    amount: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    chainId: ChainId;
    tradeType: TradeType;
    currency: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    blockNumber?: string | undefined;
    maxSplits?: number | undefined;
    gasPriceWei?: string | undefined;
    maxHops?: number | undefined;
    poolTypes?: PoolType[] | undefined;
}, {
    amount: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    chainId: ChainId;
    tradeType: TradeType;
    currency: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    blockNumber?: string | undefined;
    maxSplits?: number | undefined;
    gasPriceWei?: string | undefined;
    maxHops?: number | undefined;
    poolTypes?: PoolType[] | undefined;
}>;
export declare const zRouterPostParams: z.ZodObject<{
    amount: z.ZodObject<{
        currency: z.ZodObject<{
            address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
            decimals: z.ZodNumber;
            symbol: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }>;
    chainId: z.ZodNativeEnum<typeof ChainId>;
    blockNumber: z.ZodOptional<z.ZodString>;
    tradeType: z.ZodNativeEnum<typeof TradeType>;
    maxSplits: z.ZodOptional<z.ZodNumber>;
    gasPriceWei: z.ZodOptional<z.ZodString>;
    maxHops: z.ZodOptional<z.ZodNumber>;
    currency: z.ZodObject<{
        address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        decimals: z.ZodNumber;
        symbol: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    }, {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    }>;
    poolTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PoolType>, "many">>;
    candidatePools: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodNativeEnum<typeof PoolType>;
        reserve0: z.ZodObject<{
            currency: z.ZodObject<{
                address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
                decimals: z.ZodNumber;
                symbol: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            }, {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            }>;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }, {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }>;
        reserve1: z.ZodObject<{
            currency: z.ZodObject<{
                address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
                decimals: z.ZodNumber;
                symbol: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            }, {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            }>;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }, {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        type: PoolType;
        reserve0: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
        reserve1: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
    }, {
        type: PoolType;
        reserve0: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
        reserve1: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
    }>, z.ZodObject<{
        type: z.ZodNativeEnum<typeof PoolType>;
        token0: z.ZodObject<{
            address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
            decimals: z.ZodNumber;
            symbol: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }>;
        token1: z.ZodObject<{
            address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
            decimals: z.ZodNumber;
            symbol: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }>;
        fee: z.ZodNativeEnum<typeof FeeAmount>;
        liquidity: z.ZodString;
        sqrtRatioX96: z.ZodString;
        tick: z.ZodNumber;
        address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        token0ProtocolFee: z.ZodString;
        token1ProtocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: `0x${string}`;
        fee: FeeAmount;
        type: PoolType;
        token0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        token1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        token0ProtocolFee: string;
        token1ProtocolFee: string;
    }, {
        address: `0x${string}`;
        fee: FeeAmount;
        type: PoolType;
        token0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        token1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        token0ProtocolFee: string;
        token1ProtocolFee: string;
    }>, z.ZodObject<{
        type: z.ZodNativeEnum<typeof PoolType>;
        balances: z.ZodArray<z.ZodObject<{
            currency: z.ZodObject<{
                address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
                decimals: z.ZodNumber;
                symbol: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            }, {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            }>;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }, {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }>, "many">;
        amplifier: z.ZodString;
        fee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        fee: string;
        amplifier: string;
        balances: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }[];
        type: PoolType;
    }, {
        fee: string;
        amplifier: string;
        balances: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }[];
        type: PoolType;
    }>]>, "many">;
    onChainQuoterGasLimit: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    chainId: ChainId;
    tradeType: TradeType;
    currency: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    candidatePools: ({
        type: PoolType;
        reserve0: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
        reserve1: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
    } | {
        address: `0x${string}`;
        fee: FeeAmount;
        type: PoolType;
        token0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        token1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        token0ProtocolFee: string;
        token1ProtocolFee: string;
    } | {
        fee: string;
        amplifier: string;
        balances: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }[];
        type: PoolType;
    })[];
    blockNumber?: string | undefined;
    maxSplits?: number | undefined;
    gasPriceWei?: string | undefined;
    maxHops?: number | undefined;
    poolTypes?: PoolType[] | undefined;
    onChainQuoterGasLimit?: string | undefined;
}, {
    amount: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    chainId: ChainId;
    tradeType: TradeType;
    currency: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    candidatePools: ({
        type: PoolType;
        reserve0: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
        reserve1: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
    } | {
        address: `0x${string}`;
        fee: FeeAmount;
        type: PoolType;
        token0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        token1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        token0ProtocolFee: string;
        token1ProtocolFee: string;
    } | {
        fee: string;
        amplifier: string;
        balances: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }[];
        type: PoolType;
    })[];
    blockNumber?: string | undefined;
    maxSplits?: number | undefined;
    gasPriceWei?: string | undefined;
    maxHops?: number | undefined;
    poolTypes?: PoolType[] | undefined;
    onChainQuoterGasLimit?: string | undefined;
}>;
export type RouterPostParams = z.infer<typeof zRouterPostParams>;
export type RouterGetParams = z.infer<typeof zRouterGetParams>;
export type SerializedPools = z.infer<typeof zPools>;
//# sourceMappingURL=schema.d.ts.map