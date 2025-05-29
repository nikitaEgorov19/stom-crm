import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const hash = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { login: 'admin' },
    update: {},
    create: { login: 'admin', password: hash, role: 'admin' }
  })
}

main().finally(() => prisma.$disconnect())