import { prisma } from '@icecreamswap/database'

export default async function handler(req, res) {
  const flags = await prisma.flags.findMany({})
  res.json(
    flags.reduce<Record<string, string>>((acc, flag) => {
      return {
        ...acc,
        [flag.key]: flag.value,
      }
    }, {}),
  )
}
