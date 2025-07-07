import { db } from '@/lib/databaseClient';

export class WalletService {
  static async getWallet(userId: string) {
    try {
      return await db.getWallet(userId);
    } catch (error) {
      console.error('Error getting wallet:', error);
      throw error;
    }
  }

  static async updateWallet(userId: string, updates: any) {
    try {
      return await db.updateWallet(userId, updates);
    } catch (error) {
      console.error('Error updating wallet:', error);
      throw error;
    }
  }

  static async createTransaction(userId: string, transactionData: any) {
    try {
      return await db.createTransaction(userId, transactionData);
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  static async getTransactions(userId: string, filters: any = {}) {
    try {
      return await db.getTransactions(userId, filters);
    } catch (error) {
      console.error('Error getting transactions:', error);
      throw error;
    }
  }
}
