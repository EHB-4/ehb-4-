# EHB Technologies Backend API

A comprehensive backend API for EHB Technologies marketplace and services.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration and login
- **Product Management**: CRUD operations for products with categories and reviews
- **Order Management**: Complete order lifecycle with payment integration
- **MongoDB Integration**: Robust database with Mongoose ODM
- **Security**: Helmet.js for security headers, CORS enabled
- **Error Handling**: Comprehensive error handling and validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ehb-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ehb_main
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   OPENAI_API_KEY=your-openai-api-key
   ETHERSCAN_API_KEY=your-etherscan-api-key
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with nodemon
   npm run dev
   ```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Health Check

- `GET /health` - Server health status
- `GET /` - API information

## 🗄️ Database Models

### User Model

- username, email, password
- firstName, lastName
- role (user, admin, moderator)
- walletAddress, profileImage
- timestamps

### Product Model

- name, description, price
- category, images, stock
- seller (reference to User)
- rating, reviews
- tags, timestamps

### Order Model

- user (reference to User)
- items (array of products with quantities)
- totalAmount, status
- shippingAddress, paymentMethod
- transactionId, timestamps

## 🔧 Development

### Project Structure

```
ehb-backend/
├── models/          # MongoDB schemas
├── routes/          # API routes
├── controllers/     # Business logic
├── middleware/      # Custom middleware
├── utils/           # Utility functions
├── server.js        # Main server file
├── package.json     # Dependencies
└── .env            # Environment variables
```

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Helmet.js security headers
- CORS configuration
- Input validation and sanitization

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
```

### Deployment Platforms

- **Vercel**: Serverless deployment
- **Heroku**: Traditional hosting
- **AWS**: EC2 or Lambda
- **DigitalOcean**: Droplet deployment

## 📊 Monitoring

- Health check endpoint for monitoring
- Error logging and handling
- MongoDB connection status
- Server uptime tracking

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

---

**EHB Technologies Backend API** - Built with ❤️ for the EHB ecosystem
