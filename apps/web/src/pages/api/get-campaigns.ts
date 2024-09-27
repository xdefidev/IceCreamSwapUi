import { prisma } from '@icecreamswap/database'

export default async function handler(req, res) {
  const { chainId, filter, id } = req.body
  const campaigns = await prisma.campaign.findMany({
    where: {
      chainId,
      address: filter,
      id,
    },
  })
  res.json(campaigns.reverse())
}
