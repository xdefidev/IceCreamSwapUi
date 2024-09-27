import { ContextApi } from '@pancakeswap/localization'
import memoize from 'lodash/memoize'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'IncaSwap Multi-chain DeFi ecosystem, Swap, Bridge, LaunchPad',
  description:
    'Multi-chain DeFi ecosystem with Swap, Bridge and Launchpad. Trade, Bridge, Earn and Launch on Bitgert (Brise), Binance smart chain (BSC), XDC, XoDex, Dogechain, Fuse and CORE blockchain',
  image: 'https://icecreamswap.com/images/hero.png',
}

interface PathList {
  paths: { [path: string]: { title: string; basePath?: boolean; description?: string } }
  defaultTitleSuffix: string
}

const getPathList = (t: ContextApi['t']): PathList => {
  return {
    paths: {
      '/': { title: t('Home') },
      '/swap': { basePath: true, title: t('Exchange') },
      '/add': { basePath: true, title: t('Add Liquidity') },
      '/remove': { basePath: true, title: t('Remove Liquidity') },
      '/liquidity': { title: t('Liquidity') },
      '/find': { title: t('Import Pool') },
      '/farms': { title: t('Farms') },
      '/pools': { title: t('Pools') },
      '/info': { title: t('Overview'), description: 'View statistics for IncaSwap exchanges.' },
      '/info/pools': { title: t('Pools'), description: 'View statistics for IncaSwap exchanges.' },
      '/info/tokens': { title: t('Tokens'), description: 'View statistics for IncaSwap exchanges.' },
      '/core': { basePath: true, title: t('Get Ready for Core 🚀') },
      '/bridge': {
        basePath: true,
        title: t('Bridge'),
        description:
          'Transfer tokens between multiple Chains including Core, Bitgert, Binance, XDC, Fuse and may more on IncaSwap DEX.',
      },
    },
    defaultTitleSuffix: t('IncaSwap'),
  }
}

export const getCustomMeta = memoize(
  (path: string, t: ContextApi['t'], _: string): PageMeta => {
    const pathList = getPathList(t)
    const pathMetadata =
      pathList.paths[path] ??
      pathList.paths[Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]]

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title} | ${t(pathList.defaultTitleSuffix)}`,
        ...(pathMetadata.description && { description: pathMetadata.description }),
      }
    }
    return null
  },
  (path, t, locale) => `${path}#${locale}`,
)
