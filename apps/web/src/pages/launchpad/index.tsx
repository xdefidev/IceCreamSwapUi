import LaunchpadList from 'views/Launchpad/CampaignList'
import { SUPPORT_LAUNCHPAD } from '../../config/constants/supportChains'

const LaunchpadPage = () => {
  return <LaunchpadList />
}

LaunchpadPage.chains = SUPPORT_LAUNCHPAD

export default LaunchpadPage
