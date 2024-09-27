import { ChainId } from '@pancakeswap/sdk'
import { chains } from '@icecreamswap/constants'

export const STABLESWAP_SUBGRAPH_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-stableswap'

export const FARM_API = 'https://farms.pancake-swap.workers.dev'

export const GRAPH_HEALTH = 'https://the-graph-status.icecreamswap.com/graphql' // https://api.thegraph.com/index-node/graphql'
export const BIT_QUERY = 'https://graphql.bitquery.io'
export const ACCESS_RISK_API = '/api/risk'
export const ONRAMP_API_BASE_URL = 'https://pcs-on-ramp-api.com'
export const CELER_API = 'https://api.celerscan.com/scan'


export const INFO_CLIENT_WITH_CHAIN: Record<ChainId, string> = chains.reduce((acc, chain) => {
  if (!chain.features.includes('info')) return acc;
  return {...acc, [chain.id]: `https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/exchange-v2-${chain.network}`}
}, {})

export const BLOCKS_CLIENT_WITH_CHAIN: Record<ChainId, string> = chains.reduce((acc, chain) => {
  if (!chain.features.includes('info')) return acc;
  return {...acc, [chain.id]: `https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/blocks-${chain.network}`}
}, {})

export const V3_SUBGRAPH_URLS: Record<ChainId, string> = chains.reduce((acc, chain) => {
  if (!chain.features.includes('infoV3')) return acc;
  return {...acc, [chain.id]: `https://the-graph.icecreamswap.com/subgraphs/name/icecreamswap/exchange-v3-${chain.network}`}
}, {})

export const ASSET_CDN = 'https://assets.pancakeswap.finance'

export const TRADING_REWARD_API = 'https://pancake-trading-fee-rebate-api.pancake.run/api/v1'

export const QUOTING_API = `${process.env.NEXT_PUBLIC_QUOTING_API}`

export const FARMS_API = 'https://farms-api.icecreamswap.com'

export const MERCURYO_WIDGET_ID = process.env.NEXT_PUBLIC_MERCURYO_WIDGET_ID || '64d1f9f9-85ee-4558-8168-1dc0e7057ce6'

export const MOONPAY_BASE_URL = 'https://api.moonpay.com'
export const MOONPAY_API_KEY = process.env.NEXT_PUBLIC_MOONPAY_LIVE_KEY || 'pk_test_1Ibe44lMglFVL8COOYO7SEKnIBrzrp54'

// no need for extra public env
export const MERCURYO_WIDGET_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://sandbox-widget.mrcr.io/embed.2.0.js'
    : 'https://widget.mercuryo.io/embed.2.0.js'
