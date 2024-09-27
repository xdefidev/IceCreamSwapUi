import { KycDelegator } from 'views/Kyc/kyc-delegator'
import { SUPPORT_KYC_DELEGATION } from "../config/constants/supportChains";

const KycPage = () => {
  return <KycDelegator />
}

KycPage.chains = SUPPORT_KYC_DELEGATION

export default KycPage
