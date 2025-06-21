// EMO Services for API calls

export interface EMOProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  emoStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  commission: number;
  createdAt: string;
  updatedAt: string;
  stats?: {
    totalOrders: number;
    completedOrders: number;
    averageRating: number;
    totalReviews: number;
  };
}

export interface EMOOrder {
  id: string;
  userId: string;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  emoCommission: number;
  deliveryAddress?: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
  };
  userProducts?: any[];
  userTotal?: number;
  userCommission?: number;
  totalItems?: number;
}

export interface EMOComplaint {
  id: string;
  userId: string;
  orderId?: string;
  type: 'DELIVERY' | 'QUALITY' | 'PAYMENT' | 'SERVICE' | 'TECHNICAL' | 'OTHER';
  subject: string;
  description: string;
  status: 'FILED' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  caseNo: string;
  createdAt: string;
  updatedAt: string;
  order?: {
    id: string;
    status: string;
    total: number;
  };
}

export interface EMODashboardData {
  user: {
    name: string;
    email: string;
    sqlLevel: string;
    kycStatus: string;
    subscription: string;
  };
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalComplaints: number;
    walletBalance: number;
  };
  recentActivity: any[];
  quickActions: any[];
}

// EMO Products API
export const emoProductsAPI = {
  // Get all products
  async getProducts(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
  }): Promise<{ success: boolean; data: { products: EMOProduct[]; pagination: any } }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.category) searchParams.append('category', params.category);

    const response = await fetch(`/api/emo/products?${searchParams.toString()}`);
    return response.json();
  },

  // Create new product
  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images?: string[];
    commission?: number;
  }): Promise<{ success: boolean; data: EMOProduct; message: string }> {
    const response = await fetch('/api/emo/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Update product
  async updateProduct(
    id: string,
    data: Partial<EMOProduct>
  ): Promise<{ success: boolean; data: EMOProduct; message: string }> {
    const response = await fetch('/api/emo/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    return response.json();
  },

  // Delete product
  async deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`/api/emo/products?id=${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// EMO Orders API
export const emoOrdersAPI = {
  // Get all orders
  async getOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{ success: boolean; data: { orders: EMOOrder[]; pagination: any } }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.startDate) searchParams.append('startDate', params.startDate);
    if (params?.endDate) searchParams.append('endDate', params.endDate);

    const response = await fetch(`/api/emo/orders?${searchParams.toString()}`);
    return response.json();
  },

  // Create new order
  async createOrder(data: {
    items: { productId: string; quantity: number }[];
    deliveryAddress?: string;
    paymentMethod?: string;
  }): Promise<{ success: boolean; data: EMOOrder; message: string }> {
    const response = await fetch('/api/emo/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Update order status
  async updateOrderStatus(
    id: string,
    status: EMOOrder['status']
  ): Promise<{ success: boolean; data: EMOOrder; message: string }> {
    const response = await fetch('/api/emo/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    return response.json();
  },
};

// EMO Complaints API
export const emoComplaintsAPI = {
  // Get all complaints
  async getComplaints(params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    priority?: string;
  }): Promise<{ success: boolean; data: { complaints: EMOComplaint[]; pagination: any } }> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.type) searchParams.append('type', params.type);
    if (params?.priority) searchParams.append('priority', params.priority);

    const response = await fetch(`/api/emo/complaints?${searchParams.toString()}`);
    return response.json();
  },

  // Create new complaint
  async createComplaint(data: {
    title: string;
    description: string;
    type: EMOComplaint['type'];
    priority: EMOComplaint['priority'];
    orderId?: string;
    attachments?: string[];
  }): Promise<{ success: boolean; data: EMOComplaint; message: string }> {
    const response = await fetch('/api/emo/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Update complaint
  async updateComplaint(
    id: string,
    data: Partial<EMOComplaint>
  ): Promise<{ success: boolean; data: EMOComplaint; message: string }> {
    const response = await fetch('/api/emo/complaints', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data }),
    });
    return response.json();
  },

  // Delete complaint
  async deleteComplaint(id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`/api/emo/complaints?id=${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// EMO Dashboard API
export const emoDashboardAPI = {
  // Get dashboard data
  async getDashboardData(): Promise<{ success: boolean; data: EMODashboardData }> {
    const response = await fetch('/api/emo?action=dashboard');
    return response.json();
  },

  // Get profile data
  async getProfileData(): Promise<{ success: boolean; data: any }> {
    const response = await fetch('/api/emo?action=profile');
    return response.json();
  },

  // Get analytics data
  async getAnalyticsData(): Promise<{ success: boolean; data: any }> {
    const response = await fetch('/api/emo?action=analytics');
    return response.json();
  },
};

// Utility functions
export const emoUtils = {
  // Format currency
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
    }).format(amount);
  },

  // Format date
  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Get status color
  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      PENDING: 'text-yellow-600 bg-yellow-100',
      APPROVED: 'text-green-600 bg-green-100',
      REJECTED: 'text-red-600 bg-red-100',
      SUSPENDED: 'text-gray-600 bg-gray-100',
      FILED: 'text-blue-600 bg-blue-100',
      ASSIGNED: 'text-purple-600 bg-purple-100',
      IN_PROGRESS: 'text-orange-600 bg-orange-100',
      RESOLVED: 'text-green-600 bg-green-100',
      ESCALATED: 'text-red-600 bg-red-100',
      CLOSED: 'text-gray-600 bg-gray-100',
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  },

  // Get priority color
  getPriorityColor(priority: string): string {
    const colors: { [key: string]: string } = {
      LOW: 'text-green-600 bg-green-100',
      MEDIUM: 'text-yellow-600 bg-yellow-100',
      HIGH: 'text-orange-600 bg-orange-100',
      URGENT: 'text-red-600 bg-red-100',
    };
    return colors[priority] || 'text-gray-600 bg-gray-100';
  },
};
