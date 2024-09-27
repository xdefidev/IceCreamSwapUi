import { ChainId } from '@pancakeswap/sdk'
import { chains } from '@icecreamswap/constants'

const chainName: Record<ChainId, string> = chains.reduce(
  (acc, chain) => ({...acc, [chain.id]: chain.name}),
  {}
)

export default chainName
