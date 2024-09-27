import Token from 'views/V3Info/views/TokensPage'
import { InfoPageLayout } from 'views/V3Info/components/Layout'
import { SUPPORT_INFO } from "config/constants/supportChains";

const TokenPage = () => {
  return <Token />
}

TokenPage.Layout = InfoPageLayout
TokenPage.chains = SUPPORT_INFO

export default TokenPage
