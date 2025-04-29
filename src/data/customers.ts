
import { CustomerProfile } from './types';

// Mock Customers Data
export const customers: CustomerProfile[] = [
  {
    id: "c1",
    name: "Priya Desai",
    email: "priya@example.com",
    password: "password123",
    location: "Mumbai",
    joinedDate: "2023-01-20",
    orders: ["o1", "o2"]
  },
  {
    id: "c2",
    name: "Amit Kumar",
    email: "amit@example.com",
    password: "password123",
    location: "Delhi",
    joinedDate: "2023-02-15",
    orders: ["o3"]
  },
  {
    id: "c3",
    name: "Sunita Verma",
    email: "sunita@example.com",
    password: "password123",
    location: "Bangalore",
    joinedDate: "2023-03-10",
    orders: []
  }
];
