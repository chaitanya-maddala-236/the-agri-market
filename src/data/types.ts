
// Common data types for the application

export interface FarmerProfile {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, passwords would never be stored like this
  location: string;
  rating: number;
  bio: string;
  joinedDate: string;
  products: string[]; // IDs of products
  image: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, passwords would never be stored like this
  location: string;
  joinedDate: string;
  orders: string[]; // IDs of orders
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmerId: string;
  category: string;
  quantity: number;
  description: string;
  createdAt: string;
}

export interface EnrichedProduct extends Product {
  farmer: {
    id: string;
    name: string;
    location: string;
    rating: number;
  };
}

export interface Order {
  id: string;
  customerId: string;
  products: {
    productId: string;
    quantity: number;
    priceAtPurchase: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryAddress: string;
}

export interface EnrichedOrder extends Order {
  products: {
    productId: string;
    quantity: number;
    priceAtPurchase: number;
    product?: {
      id: string;
      name: string;
      image: string;
      unit: string;
    };
  }[];
  customer?: CustomerProfile;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}
