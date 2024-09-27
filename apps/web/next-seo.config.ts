import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | IncaSwap',
  defaultTitle: 'IncaSwap',
  description:
    'Cheaper and faster than Uniswap? Discover IncaSwap, the leading DEX on BNB Smart Chain (BSC) with the best farms in DeFi and a lottery for CAKE.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@IncaSwap',
    site: '@IncaSwap',
  },
  openGraph: {
    title: '🥞 IncaSwap - A next evolution DeFi exchange on BNB Smart Chain (BSC)',
    description:
      'The most popular AMM on GATE by user count! Earn INCA through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by IncaSwap), NFTs, and more, on a platform you can trust.',
    images: [{ url: 'https://assets.IncaSwap.finance/web/og/hero.jpg' }],
  },
}
