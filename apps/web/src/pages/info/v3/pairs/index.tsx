import Pools from 'views/V3Info/views/PoolsPage'
import { InfoPageLayout } from 'views/V3Info/components/Layout'
import { SUPPORT_INFO } from "config/constants/supportChains";

const InfoPoolsPage = () => {
  return <Pools />
}

InfoPoolsPage.Layout = InfoPageLayout
InfoPoolsPage.chains = SUPPORT_INFO

export default InfoPoolsPage
