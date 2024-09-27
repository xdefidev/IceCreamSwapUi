import { trpcClient } from '@icecreamswap/backend'
import { TokenList } from '@pancakeswap/token-lists'

export const getDefaultTokenList = async (): Promise<TokenList> => {
  // @ts-ignore
  return trpcClient.token.defaultList.query()
}
