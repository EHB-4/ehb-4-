// EMO Types

export interface EMOUser {
  id: string;
  name: string;
  email: string;
  sqlLevel: 'BASIC' | 'NORMAL' | 'HIGH' | 'VIP';
  subscription: 'BASIC' | 'NORMAL' | 'PREMIUM' | 'VIP';
  emoStatus: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  createdAt: string;
  updatedAt: string;
}

export interface EMOProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  isActive: boolean;
  emoStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  commission: number;
  approvedAt?: string;
  approvedBy?: string;
  sellerId: string;
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
  franchiseId?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
  };
  userProducts?: EMOOrderItem[];
  userTotal?: number;
  userCommission?: number;
  totalItems?: number;
}

export interface EMOOrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
    images: string[];
    sellerId: string;
  };
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
  assignedTo?: string;
  resolvedAt?: string;
  resolution?: string;
  escalatedAt?: string;
  escalatedTo?: string;
  createdAt: string;
  updatedAt: string;
  order?: {
    id: string;
    status: string;
    total: number;
  };
}

export interface EMOWallet {
  id: string;
  userId: string;
  balance: number;
  lockedBalance: number;
  totalEarned: number;
  totalSpent: number;
}

export interface EMOTransaction {
  id: string;
  userId: string;
  walletId: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'PURCHASE' | 'REFUND' | 'COMMISSION' | 'BONUS';
  amount: number;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
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
  recentActivity: EMOActivity[];
  quickActions: EMOQuickAction[];
}

export interface EMOActivity {
  id: string;
  user: string;
  action: string;
  time: string;
  type: 'product' | 'order' | 'complaint' | 'system';
}

export interface EMOQuickAction {
  id: string;
  title: string;
  icon: string;
  action: string;
}

export interface EMOPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface EMOAPIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: EMOPagination;
}

export interface EMOProductsResponse
  extends EMOAPIResponse<{
    products: EMOProduct[];
    pagination: EMOPagination;
  }> {}

export interface EMOOrdersResponse
  extends EMOAPIResponse<{
    orders: EMOOrder[];
    pagination: EMOPagination;
  }> {}

export interface EMOComplaintsResponse
  extends EMOAPIResponse<{
    complaints: EMOComplaint[];
    pagination: EMOPagination;
  }> {}

export interface EMODashboardResponse extends EMOAPIResponse<EMODashboardData> {}

// Form types
export interface EMOProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images?: string[];
  commission?: number;
}

export interface EMOOrderFormData {
  items: {
    productId: string;
    quantity: number;
  }[];
  deliveryAddress?: string;
  paymentMethod?: string;
}

export interface EMOComplaintFormData {
  title: string;
  description: string;
  type: EMOComplaint['type'];
  priority: EMOComplaint['priority'];
  orderId?: string;
  attachments?: string[];
}

// Filter types
export interface EMOProductFilters {
  status?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface EMOOrderFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface EMOComplaintFilters {
  status?: string;
  type?: string;
  priority?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

// Chart data types
export interface EMOSalesData {
  date: string;
  sales: number;
  orders: number;
  commission: number;
}

export interface EMOChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}
