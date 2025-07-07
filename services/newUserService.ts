import { db } from '@/lib/databaseClient';

export class UserService {
  static async getUserById(id: string) {
    try {
      return await db.getUserById(id);
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  static async getUserByEmail(email: string) {
    try {
      return await db.getUserByEmail(email);
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }

  static async createUser(userData: any) {
    try {
      return await db.createUser(userData);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async updateUser(id: string, updates: any) {
    try {
      return await db.updateUser(id, updates);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}
