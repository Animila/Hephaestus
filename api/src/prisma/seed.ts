import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()
async function main() {
  const role_admin = await prisma.roles.upsert({
    where: { title: 'Администратор'},
    update: {},
    create: {
      title: 'Администратор'
    }
  })

  const role_moder = await prisma.roles.upsert({
    where: { title: 'Модератор'},
    update: {},
    create: {
      title: 'Модератор'
    }
  })

  const role_user = await prisma.roles.upsert({
    where: { title: 'Пользователь'},
    update: {},
    create: {
      title: 'Пользователь'
    }
  })

  console.log({ role_admin, role_moder, role_user })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })