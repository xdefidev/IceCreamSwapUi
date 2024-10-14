import React from "react";
import { Colors } from "../../theme";
import { ChainId } from "@pancakeswap/sdk";
export interface Props {
    color?: keyof Colors;
    cakePriceUsd?: number;
    showSkeleton?: boolean;
    chainId?: ChainId;
}
declare const _default: React.NamedExoticComponent<React.PropsWithChildren<Props>>;
export default _default;
