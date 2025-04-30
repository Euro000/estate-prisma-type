export * from './generated' 

import { PrismaClient } from './generated'
export const prisma = new PrismaClient()

export async function ping() {
  await prisma.$queryRaw`SELECT 1`
  console.log('Prisma is connected 🎉')
}