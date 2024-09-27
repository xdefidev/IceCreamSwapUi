import Token from 'views/V3Info/views/TokenPage'
import { GetStaticPaths, GetStaticProps } from 'next'
import { InfoPageLayout } from 'views/V3Info/components/Layout'
import { getTokenStaticPaths, getTokenStaticProps } from 'utils/pageUtils'
import { SUPPORT_INFO } from "config/constants/supportChains";

const TokenPage = ({ address }: { address: string }) => {
  if (!address) {
    return null
  }

  return <Token address={address.toLowerCase()} />
}

TokenPage.Layout = InfoPageLayout
TokenPage.chains = SUPPORT_INFO

export default TokenPage

export const getStaticPaths: GetStaticPaths = getTokenStaticPaths()

export const getStaticProps: GetStaticProps = getTokenStaticProps()
