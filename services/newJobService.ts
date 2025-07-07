import { db } from '@/lib/databaseClient';

export class JobService {
  static async getJobs(filters: any = {}) {
    try {
      return await db.getJobs(filters);
    } catch (error) {
      console.error('Error getting jobs:', error);
      throw error;
    }
  }

  static async createJob(jobData: any) {
    try {
      return await db.createJob(jobData);
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  static async getJobById(id: string) {
    try {
      return await db.getJobById(id);
    } catch (error) {
      console.error('Error getting job:', error);
      throw error;
    }
  }

  static async updateJob(id: string, updates: any) {
    try {
      return await db.updateJob(id, updates);
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  }
}
