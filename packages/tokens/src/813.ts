import {ChainId, ERC20Token, WETH9} from '@pancakeswap/sdk'

export const qitmeerTokens = {
  wmeer: WETH9[ChainId.QITMEER],
  ice: new ERC20Token(ChainId.QITMEER, '0xd65CceCFf339e5680b1A1E7821421932cc2b114f', 18, 'ICE', 'IceCream', 'https://icecreamswap.com'),
  usdt: new ERC20Token(ChainId.QITMEER, '0x7D5a56742C082FcDfc240cd7D1775f00e059771F', 18, 'USDT', 'Tether USD'),
}
