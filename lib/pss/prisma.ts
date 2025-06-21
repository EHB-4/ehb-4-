import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// PSS Database Service
export class PSSDatabaseService {
  // Create a new verification request
  static async createVerificationRequest(data: {
    applicant: string;
    role: string;
    submitted: string;
    risk?: string;
    status?: string;
    fullName: string;
    contactNumber: string;
    dateOfBirth: string;
    address: string;
    idCard?: string;
    license?: string;
    selfie?: string;
    amount: number;
    method: string;
    transactionId?: string;
    adminNotes?: string;
  }) {
    const createData: any = {
      applicant: data.applicant,
      role: data.role,
      submitted: data.submitted,
      risk: data.risk || 'low',
      status: data.status || 'pending',
      fullName: data.fullName,
      contactNumber: data.contactNumber,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      amount: data.amount,
      method: data.method,
    };

    if (data.idCard) createData.idCard = data.idCard;
    if (data.license) createData.license = data.license;
    if (data.selfie) createData.selfie = data.selfie;
    if (data.transactionId) createData.transactionId = data.transactionId;
    if (data.adminNotes) createData.adminNotes = data.adminNotes;

    return await prisma.verificationRequest.create({
      data: createData,
    });
  }

  // Get all verification requests with optional filters
  static async getVerificationRequests(params?: {
    status?: string;
    role?: string;
    search?: string;
  }) {
    const where: any = {};

    if (params?.status) {
      where.status = params.status;
    }

    if (params?.role) {
      where.role = params.role;
    }

    if (params?.search) {
      where.OR = [
        { applicant: { contains: params.search, mode: 'insensitive' } },
        { fullName: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const requests = await prisma.verificationRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.verificationRequest.count({ where });
    const pending = await prisma.verificationRequest.count({ where: { status: 'pending' } });
    const approved = await prisma.verificationRequest.count({ where: { status: 'approved' } });
    const rejected = await prisma.verificationRequest.count({ where: { status: 'rejected' } });

    return {
      data: requests,
      total,
      pending,
      approved,
      rejected,
    };
  }

  // Get a single verification request by ID
  static async getVerificationRequest(id: string) {
    return await prisma.verificationRequest.findUnique({
      where: { id },
    });
  }

  // Update a verification request
  static async updateVerificationRequest(
    id: string,
    data: {
      status?: string;
      adminNotes?: string;
      risk?: string;
    }
  ) {
    return await prisma.verificationRequest.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  // Get dashboard statistics
  static async getDashboardStats() {
    const total = await prisma.verificationRequest.count();
    const pending = await prisma.verificationRequest.count({ where: { status: 'pending' } });
    const approved = await prisma.verificationRequest.count({ where: { status: 'approved' } });
    const rejected = await prisma.verificationRequest.count({ where: { status: 'rejected' } });
    const highRisk = await prisma.verificationRequest.count({ where: { risk: 'high' } });

    return {
      total,
      pending,
      approved,
      rejected,
      highRisk,
    };
  }

  // Delete a verification request (for cleanup)
  static async deleteVerificationRequest(id: string) {
    return await prisma.verificationRequest.delete({
      where: { id },
    });
  }
}
