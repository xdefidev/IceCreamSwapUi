import { ChainId } from '@pancakeswap/sdk'
import { RouteConfig } from '../types'

export const ROUTE_CONFIG_BY_CHAIN: { [key in ChainId]?: Partial<RouteConfig> } = {}
