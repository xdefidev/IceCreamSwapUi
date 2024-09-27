import { Kyc } from 'views/Kyc'
import { SUPPORT_KYC } from "../config/constants/supportChains";

const KycPage = () => {
  return <Kyc />
}

KycPage.chains = SUPPORT_KYC

export default KycPage
