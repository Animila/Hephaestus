import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()
async function main() {
  const role_admin = await prisma.roles.create({
    data: {
      title: 'Администратор'
    }
  })

  const role_moder = await prisma.roles.create({
    data: {
      title: 'Модератор'
    }
  })

  const role_user = await prisma.roles.create({
    data: {
      title: 'Пользователь'
    }
  })

  const plan_free = await prisma.plans.create({
    data: {
      title: 'Новичок',
      scopes: [
        'Базовый доступ к функциям',
        'Стандартная техподдержка',
        'До 2 моделей в месяц',
        'Ограничение на количество данных'
      ],
      price: 0
    }
  })

  const plan_pro = await prisma.plans.create({
    data: {
      title: 'Профи',
      scopes: [
        'Полный доступ к функциям',
        'Приоритетная поддержка',
        'Расширенные настройки модели',
        'Увеличенные лимиты'
      ],
      price: 2500
    }
  })

  const plan_company = await prisma.plans.create({
    data: {
      title: 'Компания',
      scopes: [
        'Расширенные возможности',
        'Персональная техподдержка 24/7',
        'Индивидуальные настройки',
        'Неограниченные лимиты'
      ],
      price: 10000
    }
  })

  console.log({ role_admin, role_moder, role_user })
  console.log({ plan_free, plan_pro, plan_company })
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