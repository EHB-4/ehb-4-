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

  // Project operations
  projects: {
    async create(data: any) {
      return await prisma.project.create({ data });
    },
    async findById(id: string) {
      return await prisma.project.findUnique({
        where: { id },
        include: { milestones: true, risks: true },
      });
    },
    async update(id: string, data: any) {
      return await prisma.project.update({ where: { id }, data });
    },
    async delete(id: string) {
      return await prisma.project.delete({ where: { id } });
    },
    async findAll() {
      return await prisma.project.findMany({
        include: { milestones: true, risks: true },
      });
    },
    async findByStatus(status: string) {
      return await prisma.project.findMany({
        where: { status },
        include: { milestones: true, risks: true },
      });
    },
  },

  // Analytics operations
  analytics: {
    async getProjectStats() {
      const total = await prisma.project.count();
      const active = await prisma.project.count({ where: { status: 'active' } });
      const completed = await prisma.project.count({ where: { status: 'completed' } });
      const delayed = await prisma.project.count({ where: { status: 'delayed' } });

      return { total, active, completed, delayed };
    },
    async getUserStats() {
      const total = await prisma.user.count();
      const active = await prisma.user.count({ where: { status: 'active' } });
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

  // SLA operations
  sla: {
    async create(data: any) {
      return await prisma.sLA.create({ data });
    },
    async findById(id: string) {
      return await prisma.sLA.findUnique({ where: { id } });
    },
    async update(id: string, data: any) {
      return await prisma.sLA.update({ where: { id }, data });
    },
    async delete(id: string) {
      return await prisma.sLA.delete({ where: { id } });
    },
    async findAll() {
      return await prisma.sLA.findMany();
    },
  },

  // AI Agent operations
  aiAgents: {
    async create(data: any) {
      return await prisma.aIAgent.create({ data });
    },
    async findById(id: string) {
      return await prisma.aIAgent.findUnique({ where: { id } });
    },
    async update(id: string, data: any) {
      return await prisma.aIAgent.update({ where: { id }, data });
    },
    async delete(id: string) {
      return await prisma.aIAgent.delete({ where: { id } });
    },
    async findAll() {
      return await prisma.aIAgent.findMany();
    },
    async findByStatus(status: string) {
      return await prisma.aIAgent.findMany({ where: { status } });
    },
  },
};

export default prisma;
