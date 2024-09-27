import { getChain } from '@icecreamswap/constants'
import { prisma } from '@icecreamswap/database'
import { Contract, ethers } from 'ethers'
import tokenDeployerAbi from '@passive-income/launchpad-contracts/abi/contracts/PSIPadTokenDeployer.sol/PSIPadTokenDeployer.json'
import { PSIPadTokenDeployer } from '@passive-income/launchpad-contracts/typechain/PSIPadTokenDeployer'

export default async function handler(req, res) {
  const { symbol, name, decimals, logo, address, chainId } = req.body

  // const chain = getChain(chainId)
  // const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrls.default)
  // const tokenDeployer = new Contract(chain.tokenDeployer.address, tokenDeployerAbi, provider) as PSIPadTokenDeployer
  // tokenDeployer.on(tokenDeployer.filters.TokenCreated(owner), async (creator, address) => {
  //   if (creator !== owner) return
  await prisma.token.create({
    data: {
      address,
      symbol,
      name,
      decimals,
      chainId,
    },
  })
  // })
  // setTimeout(() => {
  //   tokenDeployer.removeAllListeners()
  // }, 15000)

  res.json({ message: 'ok' })
}
