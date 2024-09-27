import { prisma } from '@icecreamswap/database'
import { kycRouter } from '@icecreamswap/backend/src/server/routers/kyc'

export default async function handler(req, res) {
  const delegations = await prisma.delegation.findMany({
    where: {
      status: { in: ['MINTED', 'APPROVED'] },
      tokenId: null,
    },
    include: {
      source: true,
    },
  })
  await Promise.all(
    delegations.map(async (delegation) => {
      const { source, target, chainId } = delegation
      const caller = kycRouter.createCaller({ res, session: {} as any })
      try {
        await caller.submitDelegation({
          chainId,
          sourceAddress: source.address,
          targetAddress: target,
        })
      } catch (e) {
        console.warn(`${source.address} -> ${target} not ready yet`)
        console.warn(e)
      }
    }),
  )

  res.json({ message: 'ok' })
}
