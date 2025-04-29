export * from './generated'
import { PrismaClient } from './generated'

/** Shared Prisma instance (consumer apps can import this) */
export const prisma = new PrismaClient()

/** Tiny health-check helper */
export async function ping() {
  await prisma.$queryRaw`SELECT 1`
  console.log('Prisma is connected 🎉')
}