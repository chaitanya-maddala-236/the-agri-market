
import { Order } from './types';

// Mock Orders Data
export const orders: Order[] = [
  {
    id: "o1",
    customerId: "c1",
    products: [
      { productId: "p1", quantity: 3, priceAtPurchase: 40 },
      { productId: "p2", quantity: 2, priceAtPurchase: 30 }
    ],
    totalAmount: 180,
    status: "delivered",
    orderDate: "2023-07-01",
    deliveryAddress: "123 Main St, Mumbai"
  },
  {
    id: "o2",
    customerId: "c1",
    products: [
      { productId: "p5", quantity: 1, priceAtPurchase: 300 }
    ],
    totalAmount: 300,
    status: "shipped",
    orderDate: "2023-07-15",
    deliveryAddress: "123 Main St, Mumbai"
  },
  {
    id: "o3",
    customerId: "c2",
    products: [
      { productId: "p6", quantity: 2, priceAtPurchase: 60 },
      { productId: "p8", quantity: 1, priceAtPurchase: 800 }
    ],
    totalAmount: 920,
    status: "processing",
    orderDate: "2023-07-20",
    deliveryAddress: "456 Oak St, Delhi"
  }
];
