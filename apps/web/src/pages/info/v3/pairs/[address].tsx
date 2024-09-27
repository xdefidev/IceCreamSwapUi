import { useRouter } from 'next/router'
import { InfoPageLayout } from 'views/V3Info/components/Layout'
import Pool from 'views/V3Info/views/PoolPage'
import { SUPPORT_INFO } from "config/constants/supportChains";

const PoolPage = () => {
  const router = useRouter()
  return <Pool address={String(router.query.address).toLowerCase()} />
}

PoolPage.Layout = InfoPageLayout
PoolPage.chains = SUPPORT_INFO

export default PoolPage
