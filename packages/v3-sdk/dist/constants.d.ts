/**
 * To compute Pool address use DEPLOYER_ADDRESSES instead
 */
export declare const FACTORY_ADDRESSES: {};
export declare const DEPLOYER_ADDRESSES: {
    readonly [x: number]: "0xF9f83b79ca3A623da98ad431A52Aa42eD0f3d5Ef";
};
export declare const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export declare const POOL_INIT_CODE_HASHES: {
    readonly [x: number]: "0x0c6b99bf88dc3398a8573e3192de0eb19c858afd9ac36e33030e16c4f569e598";
};
/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
export declare enum FeeAmount {
    LOWEST = 1000,
    LOW = 3000,
    MEDIUM = 10000,
    HIGH = 50000
}
/**
 * The default factory tick spacings by fee amount.
 */
export declare const TICK_SPACINGS: {
    [amount in FeeAmount]: number;
};
//# sourceMappingURL=constants.d.ts.map