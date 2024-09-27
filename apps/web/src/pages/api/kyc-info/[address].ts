import { prisma } from '@icecreamswap/database'

export default async function handler(req, res) {
  const { address } = req.query

  const result = { status: 'unverified' }
  const kyc = await prisma.kyc.findFirst({
    where: {
      address: address.toLowerCase(),
    },
  })
  let delegation
  if (!kyc) {
    delegation = await prisma.delegation.findFirst({
      where: {
        target: {
          equals: address.toLowerCase(),
          mode: 'insensitive',
        },
        status: 'MINTED',
      },
      include: {
        source: true,
      },
    })
    if (delegation) {
      Object.assign(result, delegation)
      Object.assign(result, { type: 'delegation' })
    }
  } else {
    Object.assign(result, kyc)
    Object.assign(result, { type: 'kyc' })
  }

  return res.json(result)
}
