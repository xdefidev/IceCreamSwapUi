import { prisma } from '@icecreamswap/database'

export default async function handler(req, res) {
  const { chainId } = req.body
  const tokens = await prisma.token.findMany({
    where: {
      chainId,
    },
  })
  res.json(tokens)
}
