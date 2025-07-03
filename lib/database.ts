import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Database connection and health check
export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Graceful shutdown
export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
  } catch (error) {
    console.error('❌ Database disconnection failed:', error);
  }
}

// Database utilities
export const db = {
  // User operations
  users: {
    async create(data: any) {
      return await prisma.user.create({ data });
    },
    async findById(id: string) {
      return await prisma.user.findUnique({ where: { id } });
    },
    async findByEmail(email: string) {
      return await prisma.user.findUnique({ where: { email } });
    },
    async update(id: string, data: any) {
      return await prisma.user.update({ where: { id }, data });
    },
    async delete(id: string) {
      return await prisma.user.delete({ where: { id } });
    },
    async findAll() {
      return await prisma.user.findMany();
    },
  },

  // Product operations
  products: {
    async create(data: any) {
      return await prisma.product.create({ data });
    },
    async findById(id: string) {
      return await prisma.product.findUnique({
        where: { id },
        include: { reviews: true },
      });
    },
    async update(id: string, data: any) {
      return await prisma.product.update({ where: { id }, data });
    },
    async delete(id: string) {
      return await prisma.product.delete({ where: { id } });
    },
    async findAll() {
      return await prisma.product.findMany({
        include: { reviews: true },
      });
    },
    async findByCategory(category: string) {
      return await prisma.product.findMany({
        where: { category },
        include: { reviews: true },
      });
    },
  },

  // Analytics operations
  analytics: {
    async getProductStats() {
      const total = await prisma.product.count();
      const active = await prisma.product.count({ where: { isActive: true } });
      const outOfStock = await prisma.product.count({ where: { stock: 0 } });

      return { total, active, outOfStock };
    },
    async getUserStats() {
      const total = await prisma.user.count();
      const active = await prisma.user.count({ where: { role: 'USER' } });
      const newThisMonth = await prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      });

      return { total, active, newThisMonth };
    },
  },

  // Order operations
  orders: {
    async create(data: any) {
      return await prisma.order.create({ data });
    },
    async findById(id: string) {
      return await prisma.order.findUnique({ 
        where: { id },
        include: { items: true, user: true }
      });
    },
    async update(id: string, data: any) {
      return await prisma.order.update({ where: { id }, data });
    },
    async delete(id: string) {
      return await prisma.order.delete({ where: { id } });
    },
    async findAll() {
      return await prisma.order.findMany({
        include: { items: true, user: true }
      });
    },
  },
};

export default prisma;
