import { PrismaClient } from '@prisma/client';

// Global Prisma instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// PSS Database Operations
export class PSSDatabase {
  // Create verification request
  static async createRequest(data: {
    applicant: string;
    role: string;
    submitted: string;
    fullName: string;
    contactNumber: string;
    dateOfBirth: string;
    address: string;
    amount: number;
    method: string;
    idCard?: string;
    license?: string;
    selfie?: string;
    transactionId?: string;
  }) {
    try {
      return await prisma.verificationRequest.create({
        data: {
          applicant: data.applicant,
          role: data.role,
          submitted: data.submitted,
          risk: 'low',
          status: 'pending',
          fullName: data.fullName,
          contactNumber: data.contactNumber,
          dateOfBirth: data.dateOfBirth,
          address: data.address,
          amount: data.amount,
          method: data.method,
          idCard: data.idCard || null,
          license: data.license || null,
          selfie: data.selfie || null,
          transactionId: data.transactionId || null,
          adminNotes: null,
        },
      });
    } catch (error) {
      console.error('Database create error:', error);
      throw new Error('Failed to create verification request');
    }
  }

  // Get all requests with filters
  static async getRequests(filters?: { status?: string; role?: string; search?: string }) {
    try {
      const where: any = {};

      if (filters?.status) where.status = filters.status;
      if (filters?.role) where.role = filters.role;
      if (filters?.search) {
        where.OR = [
          { applicant: { contains: filters.search, mode: 'insensitive' } },
          { fullName: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      const [requests, total, pending, approved, rejected] = await Promise.all([
        prisma.verificationRequest.findMany({
          where,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.verificationRequest.count({ where }),
        prisma.verificationRequest.count({ where: { status: 'pending' } }),
        prisma.verificationRequest.count({ where: { status: 'approved' } }),
        prisma.verificationRequest.count({ where: { status: 'rejected' } }),
      ]);

      return {
        data: requests,
        total,
        pending,
        approved,
        rejected,
      };
    } catch (error) {
      console.error('Database get requests error:', error);
      throw new Error('Failed to fetch verification requests');
    }
  }

  // Get single request
  static async getRequest(id: string) {
    try {
      return await prisma.verificationRequest.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Database get request error:', error);
      throw new Error('Failed to fetch verification request');
    }
  }

  // Update request
  static async updateRequest(
    id: string,
    data: {
      status?: string;
      adminNotes?: string;
      risk?: string;
    }
  ) {
    try {
      return await prisma.verificationRequest.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      console.error('Database update error:', error);
      throw new Error('Failed to update verification request');
    }
  }

  // Get dashboard stats
  static async getStats() {
    try {
      const [total, pending, approved, rejected, highRisk] = await Promise.all([
        prisma.verificationRequest.count(),
        prisma.verificationRequest.count({ where: { status: 'pending' } }),
        prisma.verificationRequest.count({ where: { status: 'approved' } }),
        prisma.verificationRequest.count({ where: { status: 'rejected' } }),
        prisma.verificationRequest.count({ where: { risk: 'high' } }),
      ]);

      return {
        total,
        pending,
        approved,
        rejected,
        highRisk,
      };
    } catch (error) {
      console.error('Database stats error:', error);
      throw new Error('Failed to get dashboard statistics');
    }
  }
}
