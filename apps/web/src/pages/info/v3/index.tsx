import { InfoPageLayout } from 'views/V3Info/components/Layout'
import Overview from 'views/V3Info'
import { SUPPORT_INFO } from "config/constants/supportChains";

const InfoPage = () => {
  return <Overview />
}

InfoPage.Layout = InfoPageLayout
InfoPage.chains = SUPPORT_INFO

export default InfoPage
