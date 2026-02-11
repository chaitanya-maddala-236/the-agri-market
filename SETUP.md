# 🌾 The Agri Market - Complete Setup Guide

This guide will help you set up both the frontend and backend of The Agri Market application.

## 📋 Prerequisites

- Node.js (v18 or later)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/chaitanya-maddala-236/the-agri-market.git
cd the-agri-market
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
NODE_ENV=development
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/agri-market

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

#### Start MongoDB

If using local MongoDB:
```bash
mongod
```

For MongoDB Atlas, update `MONGODB_URI` with your connection string.

#### Seed the Database (Optional)

Populate the database with sample data:

```bash
npm run seed
```

This creates sample farmers, customers, and products for testing.

#### Start the Backend Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd ..  # Back to root directory
npm install --legacy-peer-deps
```

#### Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Test Credentials

After seeding the database, you can use these credentials:

### Farmers
- Email: `rajesh@example.com` / Password: `password123`
- Email: `anita@example.com` / Password: `password123`
- Email: `vikram@example.com` / Password: `password123`

### Customers
- Email: `priya@example.com` / Password: `password123`
- Email: `amit@example.com` / Password: `password123`

## 📁 Project Structure

```
the-agri-market/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── server.ts       # Entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── src/                     # Frontend source code
│   ├── components/         # React components
│   │   ├── 3d/            # 3D components
│   │   ├── cards/         # Card components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── data/              # Mock data & types
│   └── App.tsx
├── .env.example
├── package.json
└── README.md
```

## 🛠️ Available Scripts

### Backend

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features

### Implemented

✅ Complete backend API with Express & MongoDB
✅ JWT authentication with secure password hashing
✅ User registration and login (farmers & customers)
✅ Product CRUD operations
✅ Shopping cart with persistence
✅ Order management system
✅ 3D UI effects with Three.js and Framer Motion
✅ Responsive design with Tailwind CSS
✅ Role-based access control

### Coming Soon

🔄 File upload for product images
🔄 Payment gateway integration
🔄 Real-time chat functionality
🔄 Advanced analytics dashboard
🔄 Email notifications
🔄 Order tracking with maps

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP security headers with Helmet
- Input validation with express-validator
- CORS configuration
- Role-based authorization

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (farmer only)
- `PUT /api/products/:id` - Update product (farmer only)
- `DELETE /api/products/:id` - Delete product (farmer only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove item
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status
- `PUT /api/orders/:id/cancel` - Cancel order

## 🐛 Troubleshooting

### MongoDB Connection Issues

1. Ensure MongoDB is running:
   ```bash
   sudo systemctl status mongod
   ```

2. Check MongoDB connection string in `.env`

3. For MongoDB Atlas, whitelist your IP address

### Port Already in Use

If port 5000 or 5173 is already in use:

1. Change the port in `.env` (backend) or `vite.config.ts` (frontend)
2. Or kill the process using the port:
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

### Package Installation Errors

If you encounter peer dependency issues:

```bash
npm install --legacy-peer-deps
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 📧 Support

For issues and questions, please open an issue on GitHub.

GitHub: [@chaitanya-maddala-236](https://github.com/chaitanya-maddala-236)

## 🙏 Acknowledgments

- React & Vite
- Express.js & MongoDB
- Three.js & Framer Motion
- Shadcn UI & Tailwind CSS
- All contributors and supporters
