import { Token } from "@pancakeswap/sdk";
import { TickProcessed, TickDataRaw } from "./types";
export declare function computeSurroundingTicks(token0: Token, token1: Token, activeTickProcessed: TickProcessed, sortedTickData: TickDataRaw[], pivot: number, ascending: boolean): TickProcessed[];
