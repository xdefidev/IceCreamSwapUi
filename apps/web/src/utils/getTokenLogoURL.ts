import { getAddress } from 'ethers/lib/utils'
import memoize from 'lodash/memoize'
import { Token } from '@pancakeswap/sdk'
import chainName from "../config/constants/chainName";
import { TOKEN_LOGO_S3_BUCKET_NAME } from '@icecreamswap/constants';


const getTokenLogoURL = memoize(
  (token?: Token) => {
    if (token && token.address && chainName[token.chainId]) {
      return `https://${TOKEN_LOGO_S3_BUCKET_NAME}.s3.amazonaws.com/token/${token.chainId}/${getAddress(token.address)}.png`
    }

    /*
    if (token && chainName[token.chainId]) {
      return `https://raw.githubusercontent.com/simone1999/trustwallet-assets/master/blockchains/${chainName[token.chainId].toLowerCase()}/assets/${getAddress(
        token.address,
      )}/logo.png`
    }
    */
    return null
  },
  (t) => `${t.chainId}#${t.address}`,
)

export default getTokenLogoURL
