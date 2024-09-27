import { KycChecker } from 'views/Kyc/kyc-checker'
import { SUPPORT_KYC } from "../config/constants/supportChains";

const KycPage = () => {
  return <KycChecker />
}

KycPage.chains = SUPPORT_KYC

export default KycPage
