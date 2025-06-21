# EMO (E-Commerce Management Operations) System

## Overview

EMO is a comprehensive e-commerce management system designed for sellers, franchise owners, and administrators to manage products, orders, complaints, and business operations efficiently.

## Features

### 1. Dashboard

- **Real-time Statistics**: View total products, orders, complaints, and wallet balance
- **Quick Actions**: Easy access to common tasks
- **Recent Activity**: Track system activities
- **Sales Analytics**: Visual representation of sales data

### 2. Product Management

- **Add Products**: Create new products with detailed information
- **Edit Products**: Update product details and pricing
- **Product Status**: Track approval status (Pending, Approved, Rejected, Suspended)
- **Inventory Management**: Monitor stock levels
- **Commission System**: Set and track commission rates

### 3. Order Management

- **Order Tracking**: Monitor order status from creation to delivery
- **Commission Calculation**: Automatic commission calculation
- **Order History**: Complete order history with details
- **Status Updates**: Update order status as it progresses

### 4. Complaint Management

- **File Complaints**: Submit complaints with different types and priorities
- **Case Tracking**: Unique case numbers for each complaint
- **Status Updates**: Track complaint resolution progress
- **Priority Levels**: Urgent, High, Medium, Low priority handling

### 5. Wallet System

- **Balance Tracking**: Monitor wallet balance and transactions
- **Commission Earnings**: Track commission from sales
- **Transaction History**: Complete transaction records
- **Locked Balance**: Secure funds for pending transactions

## User Roles

### 1. EMO User (Seller)

- Manage their own products
- Track their orders and commissions
- File and track complaints
- Access wallet and transaction history

### 2. EMO Admin

- Approve/reject products
- Manage complaints and escalations
- Monitor system performance
- Manage user accounts and permissions

### 3. Franchise Owner

- Manage franchise-specific operations
- Track franchise performance
- Handle local complaints and issues

## Database Schema

### Core Models

#### User

```typescript
{
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR' | 'FRANCHISE';
  sqlLevel: 'BASIC' | 'NORMAL' | 'HIGH' | 'VIP';
  subscription: 'BASIC' | 'NORMAL' | 'PREMIUM' | 'VIP';
  emoStatus: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
}
```

#### Product

```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  emoStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  commission: number;
  sellerId: string;
}
```

#### Order

```typescript
{
  id: string;
  userId: string;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  emoCommission: number;
  items: OrderItem[];
}
```

#### Complaint

```typescript
{
  id: string;
  userId: string;
  type: 'DELIVERY' | 'QUALITY' | 'PAYMENT' | 'SERVICE' | 'TECHNICAL' | 'OTHER';
  subject: string;
  description: string;
  status: 'FILED' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  caseNo: string;
}
```

## API Endpoints

### Dashboard

- `GET /api/emo?action=dashboard` - Get dashboard data
- `GET /api/emo?action=profile` - Get user profile
- `GET /api/emo?action=analytics` - Get analytics data

### Products

- `GET /api/emo/products` - Get user's products
- `POST /api/emo/products` - Create new product
- `PUT /api/emo/products` - Update product
- `DELETE /api/emo/products` - Delete product

### Orders

- `GET /api/emo/orders` - Get user's orders
- `POST /api/emo/orders` - Create new order
- `PUT /api/emo/orders` - Update order status

### Complaints

- `GET /api/emo/complaints` - Get user's complaints
- `POST /api/emo/complaints` - File new complaint
- `PUT /api/emo/complaints` - Update complaint
- `DELETE /api/emo/complaints` - Delete complaint

## Frontend Components

### Core Components

- `DashboardView` - Main dashboard with statistics and quick actions
- `ProductManagementView` - Product management interface
- `OrderManagementView` - Order tracking and management
- `ComplaintsManagementView` - Complaint filing and tracking

### Shared Components

- `StatCard` - Statistics display card
- `ProductModal` - Product creation/editing modal
- `OrderCard` - Order information display
- `ComplaintCard` - Complaint information display

## Custom Hooks

### useEMOProducts

```typescript
const { products, loading, error, pagination, createProduct, updateProduct, deleteProduct } =
  useEMOProducts(params);
```

### useEMOOrders

```typescript
const { orders, loading, error, pagination, createOrder, updateOrderStatus } = useEMOOrders(params);
```

### useEMOComplaints

```typescript
const {
  complaints,
  loading,
  error,
  pagination,
  createComplaint,
  updateComplaint,
  deleteComplaint,
} = useEMOComplaints(params);
```

### useEMODashboard

```typescript
const { dashboardData, loading, error, fetchDashboardData } = useEMODashboard();
```

## Utility Functions

### Formatting

- `formatCurrency(amount)` - Format currency display
- `formatDate(date)` - Format date display
- `getStatusColor(status)` - Get status color classes
- `getPriorityColor(priority)` - Get priority color classes

## Security Features

### Authentication

- Session-based authentication using NextAuth.js
- Role-based access control
- API route protection

### Data Validation

- Zod schema validation for all API inputs
- TypeScript type safety
- Input sanitization

### Authorization

- User can only access their own data
- Admin-only operations are protected
- Franchise-specific data isolation

## Performance Optimizations

### Database

- Efficient queries with proper indexing
- Pagination for large datasets
- Optimized joins and includes

### Frontend

- Lazy loading of components
- Optimistic updates for better UX
- Caching of frequently accessed data

### API

- Rate limiting
- Response caching
- Error handling and logging

## Error Handling

### API Errors

- Consistent error response format
- Proper HTTP status codes
- Detailed error messages for debugging

### Frontend Errors

- User-friendly error messages
- Loading states and error boundaries
- Retry mechanisms for failed requests

## Testing

### Unit Tests

- Component testing with React Testing Library
- Hook testing with custom test utilities
- Utility function testing

### Integration Tests

- API endpoint testing
- Database operation testing
- Authentication flow testing

### E2E Tests

- Complete user workflow testing
- Cross-browser compatibility
- Performance testing

## Deployment

### Environment Variables

```env
DATABASE_URL=mongodb://localhost:27017/emo
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### Build Process

1. Install dependencies: `npm install`
2. Run database migrations: `npx prisma migrate dev`
3. Build application: `npm run build`
4. Start production server: `npm start`

## Monitoring and Analytics

### Performance Monitoring

- API response time tracking
- Database query performance
- Frontend load time monitoring

### Error Tracking

- Error logging and alerting
- User error reporting
- System health monitoring

### Analytics

- User behavior tracking
- Sales and performance metrics
- System usage statistics

## Future Enhancements

### Planned Features

- Advanced analytics dashboard
- Mobile application
- Multi-language support
- Advanced reporting tools
- Integration with external services

### Technical Improvements

- Real-time notifications
- Advanced search and filtering
- Bulk operations
- Data export functionality
- API rate limiting improvements

## Support and Maintenance

### Documentation

- API documentation with examples
- User guides and tutorials
- Developer documentation
- Troubleshooting guides

### Support Channels

- Email support
- In-app help system
- Community forums
- Video tutorials

### Maintenance Schedule

- Regular security updates
- Performance optimizations
- Feature updates and improvements
- Database maintenance and backups
