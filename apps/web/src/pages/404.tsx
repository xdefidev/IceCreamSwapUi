import { NotFound } from '@pancakeswap/uikit'
import { SUPPORT_ANY } from "config/constants/supportChains";

const NotFoundPage = () => <NotFound />

NotFoundPage.chains = SUPPORT_ANY

export default NotFoundPage
