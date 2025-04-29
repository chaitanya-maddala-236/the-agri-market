
import { Product } from './types';

// Mock Products Data
export const products: Product[] = [
  {
    id: "p1",
    name: "Organic Tomatoes",
    price: 40,
    unit: "kg",
    image: "/lovable-uploads/ec802808-e3eb-42a1-80f6-2d4f53447cfc.png",
    farmerId: "f1",
    category: "Vegetables",
    quantity: 50,
    description: "Fresh, juicy organic tomatoes grown without pesticides. Perfect for salads and cooking.",
    createdAt: "2023-04-01"
  },
  {
    id: "p2",
    name: "Green Spinach",
    price: 30,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    farmerId: "f1",
    category: "Vegetables",
    quantity: 40,
    description: "Nutrient-rich spinach leaves, freshly harvested from our organic farm.",
    createdAt: "2023-04-05"
  },
  {
    id: "p3",
    name: "Red Potatoes",
    price: 25,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    farmerId: "f1",
    category: "Vegetables",
    quantity: 100,
    description: "Versatile red potatoes, perfect for roasting, boiling, or making into delicious curries.",
    createdAt: "2023-04-10"
  },
  {
    id: "p4",
    name: "Premium Basmati Rice",
    price: 120,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    farmerId: "f2",
    category: "Grains",
    quantity: 200,
    description: "Aromatic long-grain basmati rice, aged for enhanced flavor.",
    createdAt: "2023-04-15"
  },
  {
    id: "p5",
    name: "Sweet Alphonso Mangoes",
    price: 300,
    unit: "dozen",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    farmerId: "f2",
    category: "Fruits",
    quantity: 30,
    description: "The king of fruits! Juicy, sweet Alphonso mangoes from our orchard.",
    createdAt: "2023-05-01"
  },
  {
    id: "p6",
    name: "Farm Fresh Milk",
    price: 60,
    unit: "liter",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    farmerId: "f3",
    category: "Dairy",
    quantity: 20,
    description: "Pure cow's milk, collected fresh daily from our farm.",
    createdAt: "2023-05-05"
  },
  {
    id: "p7",
    name: "Homemade Paneer",
    price: 300,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    farmerId: "f3",
    category: "Dairy",
    quantity: 15,
    description: "Soft, fresh paneer made from our farm's milk. Perfect for curries and snacks.",
    createdAt: "2023-05-10"
  },
  {
    id: "p8",
    name: "Organic Ghee",
    price: 800,
    unit: "kg",
    image: "/lovable-uploads/b81f204f-ada3-485d-a2f5-5900bd02c74b.png",
    farmerId: "f3",
    category: "Dairy",
    quantity: 10,
    description: "Traditional clarified butter made from organic milk using age-old methods.",
    createdAt: "2023-05-15"
  },
  {
    id: "p9",
    name: "Dragon Fruit",
    price: 180,
    unit: "kg",
    image: "/lovable-uploads/0d1295f0-f238-4a13-9642-86cecbec9a3b.png",
    farmerId: "f4",
    category: "Fruits",
    quantity: 25,
    description: "Exotic dragon fruit with vibrant pink skin and speckled flesh.",
    createdAt: "2023-06-01"
  },
  {
    id: "p10",
    name: "Fresh Turmeric",
    price: 120,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    farmerId: "f4",
    category: "Spices",
    quantity: 30,
    description: "Organic turmeric root with high curcumin content for maximum health benefits.",
    createdAt: "2023-06-05"
  },
  {
    id: "p11",
    name: "Organic Brown Rice",
    price: 90,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    farmerId: "f5",
    category: "Grains",
    quantity: 150,
    description: "Nutrient-rich brown rice, unpolished and packed with natural goodness.",
    createdAt: "2023-06-10"
  },
  {
    id: "p12",
    name: "Fresh Green Chillies",
    price: 60,
    unit: "kg",
    image: "/lovable-uploads/82e81e16-1fb0-4425-8add-d58ab4021635.png",
    farmerId: "f5",
    category: "Vegetables",
    quantity: 20,
    description: "Spicy green chillies to add heat to your dishes.",
    createdAt: "2023-06-15"
  },
  {
    id: "p13",
    name: "Organic Okra",
    price: 70,
    unit: "kg",
    image: "/lovable-uploads/296d254a-0cd8-4a55-ae0f-db5097623300.png",
    farmerId: "f5",
    category: "Vegetables",
    quantity: 35,
    description: "Tender okra pods grown without chemicals, perfect for curries and stir-fries.",
    createdAt: "2023-06-20"
  }
];
