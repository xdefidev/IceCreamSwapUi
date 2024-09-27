import Token from 'views/Info/Tokens/TokenPage'
import { GetStaticPaths, GetStaticProps } from 'next'
import { InfoPageLayout } from 'views/Info'
import { getTokenStaticPaths, getTokenStaticProps } from 'utils/pageUtils'
import { SUPPORT_INFO } from 'config/constants/supportChains'

const TokenPage = ({ address }: { address: string }) => {
  if (!address) {
    return null
  }

  return <Token routeAddress={address.toLowerCase()} />
}

TokenPage.Layout = InfoPageLayout
TokenPage.chains = SUPPORT_INFO

export default TokenPage

export const getStaticPaths: GetStaticPaths = getTokenStaticPaths()

export const getStaticProps: GetStaticProps = getTokenStaticProps()
