// Roman Urdu: JPS Database Client Setup
// Prisma client configuration aur database operations

import { PrismaClient } from '@prisma/client';

// Roman Urdu: Global Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Roman Urdu: Create Prisma client with logging
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Roman Urdu: Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Roman Urdu: Database utility functions
export class DatabaseService {
  // Roman Urdu: Health check
  static async healthCheck() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { status: 'healthy', timestamp: new Date().toISOString() };
    } catch (error) {
      return { status: 'unhealthy', error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Roman Urdu: Get database statistics
  static async getStats() {
    try {
      const [
        totalJobs,
        totalCandidates,
        totalPlacements,
        totalPayments,
        totalNotifications
      ] = await Promise.all([
        prisma.job.count(),
        prisma.candidate.count(),
        prisma.placement.count(),
        prisma.payment.count(),
        prisma.notification.count()
      ]);

      return {
        jobs: totalJobs,
        candidates: totalCandidates,
        placements: totalPlacements,
        payments: totalPayments,
        notifications: totalNotifications,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to get database stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Roman Urdu: Clean up old data
  static async cleanupOldData(daysOld: number = 90) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const [deletedNotifications, deletedAuditLogs] = await Promise.all([
        prisma.notification.deleteMany({
          where: {
            createdAt: {
              lt: cutoffDate
            },
            status: {
              in: ['SENT', 'DELIVERED', 'READ', 'FAILED']
            }
          }
        }),
        prisma.auditLog.deleteMany({
          where: {
            createdAt: {
              lt: cutoffDate
            }
          }
        })
      ]);

      return {
        deletedNotifications: deletedNotifications.count,
        deletedAuditLogs: deletedAuditLogs.count,
        cutoffDate: cutoffDate.toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to cleanup old data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Roman Urdu: Backup database
  static async backupDatabase() {
    try {
      // Roman Urdu: Export all data
      const data = {
        jobs: await prisma.job.findMany(),
        candidates: await prisma.candidate.findMany(),
        placements: await prisma.placement.findMany(),
        applications: await prisma.application.findMany(),
        interviews: await prisma.interview.findMany(),
        payments: await prisma.payment.findMany(),
        notifications: await prisma.notification.findMany(),
        aiMatchingHistory: await prisma.aIMatchingHistory.findMany(),
        systemSettings: await prisma.systemSettings.findMany(),
        auditLogs: await prisma.auditLog.findMany(),
        timestamp: new Date().toISOString()
      };

      return data;
    } catch (error) {
      throw new Error(`Failed to backup database: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Roman Urdu: Restore database from backup
  static async restoreDatabase(backupData: any) {
    try {
      // Roman Urdu: Clear existing data
      await prisma.$transaction([
        prisma.auditLog.deleteMany(),
        prisma.systemSettings.deleteMany(),
        prisma.aIMatchingHistory.deleteMany(),
        prisma.notification.deleteMany(),
        prisma.payment.deleteMany(),
        prisma.interview.deleteMany(),
        prisma.application.deleteMany(),
        prisma.placement.deleteMany(),
        prisma.candidate.deleteMany(),
        prisma.job.deleteMany()
      ]);

      // Roman Urdu: Restore data
      if (backupData.jobs?.length) {
        await prisma.job.createMany({ data: backupData.jobs });
      }
      if (backupData.candidates?.length) {
        await prisma.candidate.createMany({ data: backupData.candidates });
      }
      if (backupData.placements?.length) {
        await prisma.placement.createMany({ data: backupData.placements });
      }
      if (backupData.applications?.length) {
        await prisma.application.createMany({ data: backupData.applications });
      }
      if (backupData.interviews?.length) {
        await prisma.interview.createMany({ data: backupData.interviews });
      }
      if (backupData.payments?.length) {
        await prisma.payment.createMany({ data: backupData.payments });
      }
      if (backupData.notifications?.length) {
        await prisma.notification.createMany({ data: backupData.notifications });
      }
      if (backupData.aiMatchingHistory?.length) {
        await prisma.aIMatchingHistory.createMany({ data: backupData.aiMatchingHistory });
      }
      if (backupData.systemSettings?.length) {
        await prisma.systemSettings.createMany({ data: backupData.systemSettings });
      }
      if (backupData.auditLogs?.length) {
        await prisma.auditLog.createMany({ data: backupData.auditLogs });
      }

      return { success: true, restoredAt: new Date().toISOString() };
    } catch (error) {
      throw new Error(`Failed to restore database: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Roman Urdu: Database middleware for logging
prisma.$use(async (params, next) => {
  const start = Date.now();
  const result = await next(params);
  const end = Date.now();

  // Roman Urdu: Log slow queries
  if (end - start > 1000) {
    console.warn(`Slow query detected: ${params.model}.${params.action} took ${end - start}ms`);
  }

  return result;
});

// Roman Urdu: Error handling middleware
prisma.$use(async (params, next) => {
  try {
    return await next(params);
  } catch (error) {
    console.error(`Database error in ${params.model}.${params.action}:`, error);
    throw error;
  }
});

// Roman Urdu: Export types
export type { 
  User, 
  Job, 
  Candidate, 
  Placement, 
  Application, 
  Interview, 
  Payment, 
  Notification, 
  AIMatchingHistory, 
  SystemSettings, 
  AuditLog 
} from '@prisma/client';

// Roman Urdu: Export enums
export { 
  UserRole,
  JobStatus,
  CandidateStatus,
  PlacementStatus,
  ApplicationStatus,
  InterviewType,
  InterviewStatus,
  PaymentMethod,
  PaymentStatus,
  NotificationType,
  NotificationStatus
} from '@prisma/client'; 