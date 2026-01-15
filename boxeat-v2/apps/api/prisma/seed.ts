import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

const seed = async () => {
  const passwordHash = await argon2.hash('Password123!');
  const [admin, operator, customer] = await Promise.all([
    prisma.user.create({
      data: { email: 'admin@boxeat.test', passwordHash, role: 'ADMIN', name: 'Admin' }
    }),
    prisma.user.create({
      data: { email: 'operator@boxeat.test', passwordHash, role: 'OPERATOR', name: 'Operator' }
    }),
    prisma.user.create({
      data: { email: 'customer@boxeat.test', passwordHash, role: 'CUSTOMER', name: 'Customer' }
    })
  ]);

  const company = await prisma.company.create({
    data: {
      name: 'BoxEat Corp',
      address: '1 Rue Food, Paris',
      billingEmail: 'billing@boxeat.test'
    }
  });

  await prisma.companyMember.create({
    data: { companyId: company.id, userId: admin.id, role: 'COMPANY_ADMIN', mealVoucherBalance: 5000 }
  });

  const [machinePublic, machineB2b] = await Promise.all([
    prisma.machine.create({
      data: {
        name: 'BoxEat Public',
        locationLabel: 'Station A',
        address: '10 Rue Publique',
        lat: 48.8566,
        lng: 2.3522,
        status: 'ACTIVE'
      }
    }),
    prisma.machine.create({
      data: {
        name: 'BoxEat B2B',
        locationLabel: 'HQ',
        address: '20 Rue B2B',
        lat: 48.857,
        lng: 2.353,
        status: 'ACTIVE',
        companyId: company.id
      }
    })
  ]);

  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Sandwich Poulet',
        description: 'Sandwich frais poulet',
        allergens: ['gluten'],
        priceCents: 650,
        vatRate: 0.1,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Salade César',
        description: 'Salade César',
        allergens: ['lait'],
        priceCents: 700,
        vatRate: 0.1,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Dessert Chocolat',
        description: 'Dessert chocolat',
        allergens: ['lait'],
        priceCents: 350,
        vatRate: 0.1,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Eau minérale',
        description: 'Eau 50cl',
        allergens: [],
        priceCents: 150,
        vatRate: 0.1,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Sandwich Thon',
        description: 'Sandwich thon',
        allergens: ['poisson'],
        priceCents: 620,
        vatRate: 0.1,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Salade quinoa',
        description: 'Salade quinoa',
        allergens: [],
        priceCents: 680,
        vatRate: 0.1,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Jus orange',
        description: 'Jus orange',
        allergens: [],
        priceCents: 220,
        vatRate: 0.1,
        active: true
      }
    }),
    prisma.product.create({
      data: {
        name: 'Dessert Vanille',
        description: 'Dessert vanille',
        allergens: ['lait'],
        priceCents: 340,
        vatRate: 0.1,
        active: true
      }
    })
  ]);

  await Promise.all([
    prisma.machineSlot.create({
      data: {
        machineId: machinePublic.id,
        slotCode: 'A1',
        productId: products[0].id,
        capacity: 10,
        currentStock: 8,
        minStockAlert: 2
      }
    }),
    prisma.machineSlot.create({
      data: {
        machineId: machineB2b.id,
        slotCode: 'B1',
        productId: products[1].id,
        capacity: 12,
        currentStock: 9,
        minStockAlert: 3
      }
    })
  ]);

  const menu = await prisma.menu.create({
    data: {
      name: 'Menu midi',
      startAt: new Date(),
      endAt: new Date(Date.now() + 86400000),
      active: true,
      machineId: machinePublic.id
    }
  });

  await prisma.menuItem.create({
    data: { menuId: menu.id, productId: products[0].id, priority: 1 }
  });

  await prisma.temperatureReading.create({
    data: { machineId: machinePublic.id, temperatureC: 3.2, humidity: 45 }
  });

  await prisma.alert.create({
    data: {
      machineId: machinePublic.id,
      type: 'STOCK_LOW',
      severity: 'MEDIUM',
      message: 'Stock faible sur A1',
      status: 'OPEN'
    }
  });
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
