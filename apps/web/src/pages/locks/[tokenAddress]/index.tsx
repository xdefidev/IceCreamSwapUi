import { SUPPORT_BRIDGE } from 'config/constants/supportChains'
import { useRouter } from 'next/router'
import { TokenLocksOverview } from 'views/Locks'
import { Address } from "wagmi";

const TokenLocksOverviewPage = () => {
  const { tokenAddress } = useRouter().query
  if (!tokenAddress) return null
  return <TokenLocksOverview tokenAddress={tokenAddress as Address} />
}

TokenLocksOverviewPage.chains = SUPPORT_BRIDGE

export default TokenLocksOverviewPage
