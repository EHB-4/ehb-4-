// In-Memory Database
export class MemoryDatabase {
  private data: any;

  constructor() {
    this.data = {
      users: [],
      jobs: [],
      wallets: [],
      transactions: [],
      products: [],
    };
  }

  private generateId(): string {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  // User Operations
  async createUser(userData: any) {
    const user = {
      id: userData.id || this.generateId(),
      email: userData.email,
      name: userData.name,
      password: userData.password,
      role: userData.role || 'USER',
      sql_level: userData.sql_level || 0,
      sql_status: userData.sql_status || 'FREE',
      ai_score: userData.ai_score || 0,
      fraud_score: userData.fraud_score || 0,
      complaint_count: userData.complaint_count || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.data.users.push(user);
    return user;
  }

  async getUserById(id: string) {
    return this.data.users.find((user: any) => user.id === id) || null;
  }

  async getUserByEmail(email: string) {
    return this.data.users.find((user: any) => user.email === email) || null;
  }

  async updateUser(id: string, updates: any) {
    const userIndex = this.data.users.findIndex((user: any) => user.id === id);
    if (userIndex === -1) return null;

    this.data.users[userIndex] = {
      ...this.data.users[userIndex],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    return this.data.users[userIndex];
  }

  // Job Operations
  async createJob(jobData: any) {
    const job = {
      id: jobData.id || this.generateId(),
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      salary: jobData.salary,
      description: jobData.description || '',
      requirements: jobData.requirements || [],
      skills: jobData.skills || [],
      status: jobData.status || 'ACTIVE',
      user_id: jobData.user_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.data.jobs.push(job);
    return job;
  }

  async getJobs(filters: any = {}) {
    let jobs = [...this.data.jobs];

    if (filters.status) {
      jobs = jobs.filter((job: any) => job.status === filters.status);
    }

    if (filters.company) {
      jobs = jobs.filter((job: any) => job.company === filters.company);
    }

    if (filters.location) {
      jobs = jobs.filter((job: any) => job.location === filters.location);
    }

    return jobs;
  }

  async getJobById(id: string) {
    return this.data.jobs.find((job: any) => job.id === id) || null;
  }

  // Wallet Operations
  async getWallet(userId: string) {
    return this.data.wallets.find((wallet: any) => wallet.user_id === userId) || null;
  }

  async createWallet(userId: string, walletData: any = {}) {
    const wallet = {
      id: this.generateId(),
      user_id: userId,
      balance: walletData.balance || 0,
      currency: walletData.currency || 'USD',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.data.wallets.push(wallet);
    return wallet;
  }

  async updateWallet(userId: string, updates: any) {
    const walletIndex = this.data.wallets.findIndex((wallet: any) => wallet.user_id === userId);
    if (walletIndex === -1) return null;

    this.data.wallets[walletIndex] = {
      ...this.data.wallets[walletIndex],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    return this.data.wallets[walletIndex];
  }

  // Transaction Operations
  async createTransaction(walletId: string, transactionData: any) {
    const transaction = {
      id: this.generateId(),
      wallet_id: walletId,
      type: transactionData.type,
      amount: transactionData.amount,
      description: transactionData.description || '',
      status: transactionData.status || 'PENDING',
      created_at: new Date().toISOString(),
    };

    this.data.transactions.push(transaction);
    return transaction;
  }

  async getTransactions(walletId: string, filters: any = {}) {
    let transactions = this.data.transactions.filter((tx: any) => tx.wallet_id === walletId);

    if (filters.status) {
      transactions = transactions.filter((tx: any) => tx.status === filters.status);
    }

    return transactions;
  }

  // Product Operations
  async createProduct(productData: any) {
    const product = {
      id: productData.id || this.generateId(),
      name: productData.name,
      description: productData.description || '',
      price: productData.price,
      image_url: productData.image_url || '',
      category: productData.category || '',
      stock: productData.stock || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.data.products.push(product);
    return product;
  }

  async getProducts(filters: any = {}) {
    let products = [...this.data.products];

    if (filters.category) {
      products = products.filter((product: any) => product.category === filters.category);
    }

    return products;
  }

  // Utility Methods
  async clear() {
    this.data = {
      users: [],
      jobs: [],
      wallets: [],
      transactions: [],
      products: [],
    };
  }

  async getStats() {
    return {
      users: this.data.users.length,
      jobs: this.data.jobs.length,
      wallets: this.data.wallets.length,
      transactions: this.data.transactions.length,
      products: this.data.products.length,
    };
  }

  async exportData() {
    return JSON.stringify(this.data, null, 2);
  }

  async importData(dataString: string) {
    try {
      this.data = JSON.parse(dataString);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

// Export memory database client
export const memoryDb = new MemoryDatabase();
