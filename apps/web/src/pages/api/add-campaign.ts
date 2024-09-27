import { prisma } from '@icecreamswap/database'

export default async function handler(req, res) {
  const { address, chainId, website, banner, github, reddit, discord, telegram, twitter, description } = req.body

  await prisma.campaign.create({
    data: {
      address,
      chainId,
      website,
      banner,
      github,
      reddit,
      discord,
      telegram,
      twitter,
      description,
    },
  })

  res.json({ message: 'ok' })
}
