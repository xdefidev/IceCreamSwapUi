import {ChainId, ERC20Token, WETH9} from '@pancakeswap/sdk'
import {ICE} from "./common";

export const blastTokens = {
  weth: WETH9[ChainId.BLAST],
  ice: ICE[ChainId.BLAST],
  usdb: new ERC20Token(ChainId.BLAST, '0x4300000000000000000000000000000000000003', 18, 'USDT', 'Blast USD'),
  ice_b: new ERC20Token(ChainId.BLAST, '0x24cb308a4e2F3a4352F513681Bd0c31a0bd3BA31', 18, 'ICE_B', 'IceCream[Blast]', 'https://icecreamswap.com'),
}
