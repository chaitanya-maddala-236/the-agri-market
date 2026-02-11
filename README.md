# The Agri Market 🌾

[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Live%20Demo-brightgreen)](https://the-agri-connect.vercel.app/)
[![GitHub](https://img.shields.io/github/license/chaitanya-maddala-236/the-agri-market)](https://github.com/chaitanya-maddala-236/the-agri-market/blob/main/LICENSE)

A modern digital marketplace connecting farmers directly with consumers, enabling transparent and efficient agricultural commerce.
![image](https://github.com/user-attachments/assets/f61ab829-e0d2-419e-abd4-34f157cd1307)

## 📋 Overview

The Agri Market is a comprehensive platform designed to revolutionize agricultural commerce by:

- Connecting farmers directly with consumers, eliminating unnecessary middlemen
- Providing real-time pricing information and market trends
- Facilitating secure transactions between buyers and sellers
- Supporting both individual farmers and agricultural cooperatives
- Offering logistics and delivery solutions for agricultural produce

The platform aims to empower farmers with better control over their sales and provide consumers with access to fresh, locally-sourced agricultural products.

## ✨ Features

- **User Authentication** - Secure login and registration system with role-based access control
- **Product Listings** - Detailed product catalog with search, filter, and sorting capabilities
- **Farmer Dashboard** - Dedicated interface for farmers to manage inventory and track sales
- **Consumer Dashboard** - User-friendly interface for browsing products and managing orders
- **Real-time Notifications** - Updates on order status, market prices, and platform activities
- **Secure Payment Gateway** - Integrated payment processing for seamless transactions
- **Responsive Design** - Optimized for all devices (desktop, tablet, and mobile)
- **Analytics Dashboard** - Data-driven insights for farmers to understand market trends

## 🖥️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for blazing fast development
- Tailwind CSS for styling
- Shadcn UI components
- Three.js for 3D visualizations
- Framer Motion for animations
- React Query for data fetching

### Backend (NEW! ✨)
- Node.js with Express
- TypeScript
- MongoDB with Mongoose ODM
- JWT authentication
- Bcrypt password hashing
- Express Validator

### DevOps & Deployment
- Vercel for frontend hosting
- MongoDB Atlas for database
- GitHub Actions for CI/CD

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or later)
- npm or yarn
- MongoDB (local or Atlas connection)

### Quick Setup

See [SETUP.md](./SETUP.md) for detailed installation instructions.

#### Backend Setup

1. Navigate to backend directory
   ```bash
   cd backend
   npm install
   ```

2. Configure environment
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. Seed database (optional)
   ```bash
   npm run seed
   ```

4. Start backend server
   ```bash
   npm run dev
   ```
   Backend runs at `http://localhost:5000`

#### Frontend Setup

1. Install dependencies
   ```bash
   npm install --legacy-peer-deps
   ```

2. Configure environment
   ```bash
   cp .env.example .env
   # Set VITE_API_URL=http://localhost:5000/api
   ```

3. Start development server
   ```bash
   npm run dev
   ```
   Frontend runs at `http://localhost:5173`

## 📱 App Screenshots

### Landing Page
![Landing Page](https://github.com/chaitanya-maddala-236/the-agri-market/blob/main/assets/readme_images/Landing%20Page.png?raw=true)

### Farmer Dashboard
![Farmer Dashboard](https://github.com/chaitanya-maddala-236/the-agri-market/blob/main/assets/readme_images/Farmer%20Dashboard.png?raw=true)

### Product Listings
![Product Listings](https://github.com/chaitanya-maddala-236/the-agri-market/blob/main/assets/readme_images/Products%20List.png?raw=true)

### Order Processing
![Order Processing](https://github.com/chaitanya-maddala-236/the-agri-market/blob/main/assets/readme_images/Order%20Processing.png?raw=true)

## 🔄 Workflow

1. **User Registration & Authentication**
   - Farmers and consumers register with appropriate role selection
   - Email verification and profile setup

2. **For Farmers**
   - List agricultural products with details (price, quantity, quality, etc.)
   - Manage inventory and track orders
   - Access market insights and pricing trends

3. **For Consumers**
   - Browse available products from various farmers
   - Place orders and make secure payments
   - Track order status and delivery

4. **Transaction Processing**
   - Order confirmation and payment processing
   - Logistics coordination for product delivery
   - Review and feedback system post-delivery

## 🤝 Contributing

We welcome contributions to The Agri Market! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel Platform](https://vercel.com/)
- All contributors and supporters of the project

## 📬 Contact

Chaitanya Maddala - [GitHub](https://github.com/chaitanya-maddala-236)

Project Link: [https://github.com/chaitanya-maddala-236/the-agri-market](https://github.com/chaitanya-maddala-236/the-agri-market)

Live Demo: [https://the-agri-connect.vercel.app/](https://the-agri-connect.vercel.app/)
