import { prisma } from '@icecreamswap/database'

export default async function handler(req, res) {
  const { address } = req.query

  const count = await prisma.kyc.count({
    where: {
      address: address.toLowerCase(),
    },
  })
  return res.json(count > 0)
}
