import { prisma } from '@icecreamswap/database'

export default async function handler(req, res) {
  const { address, chainId, transactionHash, apiKey } = req.body
  if (apiKey !== process.env.API_KEY) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  await prisma.kyc.create({
    data: {
      address: address.toLowerCase(),
      chainId,
      transactionHash,
      status: 'payed',
    },
  })

  res.json({ message: 'ok' })
}
