
import { Review } from './types';

// Mock Reviews Data
export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p1",
    customerId: "c1",
    customerName: "Priya Desai",
    rating: 5,
    comment: "The tomatoes were incredibly fresh and flavorful. Will definitely buy again!",
    date: "2023-07-15"
  },
  {
    id: "r2",
    productId: "p1",
    customerId: "c2",
    customerName: "Amit Kumar",
    rating: 4,
    comment: "Good quality, though a few were slightly bruised during delivery.",
    date: "2023-07-12"
  },
  {
    id: "r3",
    productId: "p2",
    customerId: "c3",
    customerName: "Sunita Verma",
    rating: 5,
    comment: "The spinach was very fresh and clean. Perfect for my salad!",
    date: "2023-07-10"
  },
  {
    id: "r4",
    productId: "p8",
    customerId: "c1",
    customerName: "Priya Desai",
    rating: 5,
    comment: "This ghee is pure and authentic. Just like homemade!",
    date: "2023-06-28"
  },
  {
    id: "r5",
    productId: "p8",
    customerId: "c2",
    customerName: "Amit Kumar",
    rating: 4,
    comment: "Good quality ghee with rich aroma.",
    date: "2023-06-25"
  }
];
