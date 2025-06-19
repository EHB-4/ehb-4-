# GoSellr Ecommerce System

A comprehensive ecommerce platform built with Next.js 14, MongoDB, Prisma, and TypeScript. This system provides a complete marketplace solution with shop management, product catalog, order processing, and wallet integration.

## 🚀 Features

### Core Features

- **Shop Management**: Create and manage your own shop
- **Product Catalog**: Add, edit, and manage products with images and descriptions
- **Order Processing**: Complete order lifecycle from cart to delivery
- **Wallet Integration**: Built-in wallet system for payments
- **User Authentication**: Secure user registration and login
- **Real-time Updates**: Live updates for orders and inventory

### Advanced Features

- **Search & Filters**: Advanced product search with category, price, and location filters
- **Shopping Cart**: Persistent cart with quantity management
- **Payment Processing**: Multiple payment methods (wallet, card, PayPal)
- **Order Tracking**: Complete order status tracking
- **Analytics Dashboard**: Sales and performance metrics
- **Responsive Design**: Mobile-first responsive interface

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **State Management**: React Hooks
- **UI Components**: Custom components with Framer Motion
- **Icons**: React Icons (Feather Icons)

## 📁 Project Structure

```
app/
├── api/                    # API routes
│   ├── products/          # Product management
│   ├── shops/             # Shop management
│   ├── orders/            # Order processing
│   └── wallet/            # Wallet operations
├── gosellr/               # Main marketplace page
└── components/
    └── GoSellr/           # GoSellr components
        └── GoSellrDashboard.tsx

prisma/
└── schema.prisma          # Database schema

lib/
├── prisma.ts             # Prisma client
└── auth.ts               # Authentication config
```

## 🗄️ Database Schema

### Models

1. **User**: User accounts and profiles
2. **Shop**: Shop information and settings
3. **Product**: Product catalog with images and pricing
4. **Order**: Order management and tracking
5. **OrderItem**: Individual items in orders
6. **Wallet**: User wallet and balance
7. **WalletTransaction**: Transaction history

### Relationships

- User → Shop (one-to-many)
- User → Product (one-to-many)
- User → Order (one-to-many)
- Shop → Product (one-to-many)
- Order → OrderItem (one-to-many)
- User → Wallet (one-to-one)
- Wallet → WalletTransaction (one-to-many)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ehb-next-js-04
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:

   ```env
   DATABASE_URL="mongodb://localhost:27017/gosellr"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000/gosellr`

## 📱 Usage

### For Customers

1. **Browse Products**: Use the marketplace to discover products
2. **Search & Filter**: Find products by category, price, or location
3. **Add to Cart**: Add products to your shopping cart
4. **Checkout**: Complete your purchase using wallet or other payment methods
5. **Track Orders**: Monitor your order status and delivery

### For Shop Owners

1. **Create Shop**: Set up your shop with details and location
2. **Add Products**: Upload product images and set pricing
3. **Manage Inventory**: Track stock levels and update availability
4. **Process Orders**: Handle incoming orders and update status
5. **View Analytics**: Monitor sales and performance metrics

## 🔧 API Endpoints

### Products

- `GET /api/products` - Get all products with filters
- `POST /api/products` - Create new product
- `PUT /api/products` - Update product
- `DELETE /api/products` - Delete product
- `GET /api/products/my-products` - Get user's products

### Shops

- `GET /api/shops` - Get all shops
- `POST /api/shops` - Create new shop
- `PUT /api/shops` - Update shop
- `GET /api/shops/my-shop` - Get user's shop

### Orders

- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `PUT /api/orders` - Update order status

### Wallet

- `GET /api/wallet` - Get wallet balance
- `POST /api/wallet` - Create wallet
- `PUT /api/wallet` - Update wallet (lock/unlock)

## 🎨 UI Components

### GoSellrDashboard

A comprehensive dashboard component with:

- **Overview Tab**: Statistics and shop status
- **Shop Tab**: Shop management and creation
- **Products Tab**: Product management with CRUD operations
- **Orders Tab**: Order tracking and management

### Features

- Responsive design for all screen sizes
- Smooth animations with Framer Motion
- Real-time data updates
- Intuitive user interface
- Accessibility compliant

## 🔒 Security Features

- **Authentication**: Secure user authentication with NextAuth.js
- **Authorization**: Role-based access control
- **Input Validation**: Zod schema validation for all inputs
- **SQL Injection Protection**: Prisma ORM protection
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: NextAuth.js CSRF tokens

## 📊 Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexes
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: Strategic caching for better performance
- **Lazy Loading**: Components loaded on demand

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**

   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**

   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   - Add your production environment variables in Vercel dashboard
   - Ensure MongoDB connection string is set
   - Configure NextAuth.js secrets

### Environment Variables for Production

```env
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 🔧 Configuration

### Database Configuration

The system uses MongoDB with Prisma ORM. Update the `DATABASE_URL` in your environment variables to connect to your MongoDB instance.

### Authentication Configuration

Configure NextAuth.js providers in `lib/auth.ts` for your preferred authentication methods.

### Payment Configuration

Integrate payment providers by updating the payment processing logic in the order API.

## 📈 Monitoring and Analytics

- **Error Tracking**: Implement error tracking with services like Sentry
- **Performance Monitoring**: Use Vercel Analytics or similar services
- **User Analytics**: Track user behavior and conversion rates
- **Database Monitoring**: Monitor database performance and queries

## 🔄 Future Enhancements

- **Real-time Chat**: Customer support chat system
- **Advanced Analytics**: Detailed sales and performance reports
- **Multi-language Support**: Internationalization
- **Mobile App**: React Native mobile application
- **AI Recommendations**: Product recommendation engine
- **Advanced Search**: Elasticsearch integration
- **Inventory Management**: Advanced stock management
- **Shipping Integration**: Multiple shipping provider support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🎯 Status

✅ **Complete and Ready for Deployment**

The GoSellr ecommerce system is fully functional and ready for production deployment. All core features have been implemented and tested.

### Completed Features

- [x] Database schema and models
- [x] API endpoints for all operations
- [x] User authentication and authorization
- [x] Shop management system
- [x] Product catalog with CRUD operations
- [x] Order processing and tracking
- [x] Wallet integration
- [x] Shopping cart functionality
- [x] Search and filtering
- [x] Responsive user interface
- [x] Dashboard for shop owners
- [x] Payment processing
- [x] Security implementations
- [x] Performance optimizations

The system is now ready for deployment and can handle real ecommerce operations.
