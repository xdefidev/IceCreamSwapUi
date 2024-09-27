import { TranslateFunction } from '@pancakeswap/localization'
import { SalesSectionProps } from '.'
import bridgeA from '../../../../../public/images/home/bridge/bridge_a.png'
import bridgeB from '../../../../../public/images/home/bridge/bridge_b.png'
import earnIce from '../../../../../public/images/home/earn/ice.png'
import iceConeA from '../../../../../public/images/home/trade/iceconea.png'
import iceConeB from '../../../../../public/images/home/trade/iceconeb.png'

export const swapSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Trade any token at the best rate'),
  bodyText: t(
    'Seamless trading on many chains with the best rates thanks to our DEX aggregator. ' +
    'Our AI DEX aggregator scans the entire blockchain for liquidity pools to route your trade, achieving the best possible output. ' +
    'Stop wasting money from inefficient trades now.'
  ),
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: t('Trade Now'),
    external: false,
  },
  secondaryButton: {
    to: 'https://wiki.IncaSwap.com/dex/swap',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: iceConeA, alt: '' },
      { src: iceConeB, alt: '' },
    ],
  },
})

export const bridgeSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Bridge securely between many chains'),
  bodyText: t(
    'IncaSwap allows direct bridging between many chains with ' +
    'its audited and battle tested smart contracts. ' +
    'The unique built-in faucet automatically drops you native tokens when you bridge to a new chain.'
  ),
  reverse: true,
  primaryButton: {
    to: '/bridge',
    text: t('Bridge Now'),
    external: false,
  },
  secondaryButton: {
    to: 'https://wiki.IncaSwap.com/dex/bridge',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: bridgeA, alt: '' },
      { src: bridgeB, alt: '' },
    ],
  },
})

export const earnSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Earn, receive INCA tokens when providing liquidity'),
  bodyText: t('With liquidity farms, you can boost your passive income APY for liquidity provision.'),
  reverse: false,
  primaryButton: {
    to: '/farms',
    text: t('Farms'),
    external: false,
  },
  secondaryButton: {
    to: 'https://wiki.IncaSwap.com/dex/farm',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/home/ice/',
    attributes: [{ src: earnIce, alt: '' }],
  },
})
