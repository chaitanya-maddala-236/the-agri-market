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

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
}

// Mock Farmers Data
export const farmers: FarmerProfile[] = [
  {
    id: "f1",
    name: "Rajesh Patel",
    email: "rajesh@example.com",
    password: "password123",
    location: "Gujarat",
    rating: 4.8,
    bio: "Third-generation farmer specializing in organic vegetables and sustainable farming practices.",
    joinedDate: "2023-01-15",
    products: ["p1", "p2", "p3"],
    image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "f2",
    name: "Anita Sharma",
    email: "anita@example.com",
    password: "password123",
    location: "Punjab",
    rating: 4.5,
    bio: "Family-owned farm producing premium quality grains and fruits.",
    joinedDate: "2023-02-10",
    products: ["p4", "p5"],
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "f3",
    name: "Vikram Singh",
    email: "vikram@example.com",
    password: "password123",
    location: "Haryana",
    rating: 4.7,
    bio: "Organic dairy farm producing fresh milk and dairy products using traditional methods.",
    joinedDate: "2023-03-05",
    products: ["p6", "p7", "p8"],
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "f4",
    name: "Meena Kumari",
    email: "meena@example.com",
    password: "password123",
    location: "Karnataka",
    rating: 4.9,
    bio: "Award-winning farmer specializing in exotic fruits and spices.",
    joinedDate: "2023-01-20",
    products: ["p9", "p10"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "f5",
    name: "Sanjay Reddy",
    email: "sanjay@example.com",
    password: "password123",
    location: "Andhra Pradesh",
    rating: 4.6,
    bio: "Rice and vegetable farmer using integrated farming techniques.",
    joinedDate: "2023-02-25",
    products: ["p11", "p12", "p13"],
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

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

// Mock Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Sustainable Farming Practices for Better Yield",
    content: "Discover how sustainable farming techniques can improve your crop yield while preserving soil health... (content truncated)",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Dr. Amita Desai",
    date: "2023-06-15",
    tags: ["sustainability", "organic farming", "crop yield"]
  },
  {
    id: "b2",
    title: "Benefits of Buying Directly from Farmers",
    content: "Learn about the economic, environmental, and health benefits of supporting local farmers... (content truncated)",
    image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Ravi Shankar",
    date: "2023-07-01",
    tags: ["local food", "farmers market", "food quality"]
  },
  {
    id: "b3",
    title: "Seasonal Eating: A Guide to India's Agricultural Calendar",
    content: "Understanding seasonal produce can help you get the freshest, most nutritious food... (content truncated)",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Neha Joshi",
    date: "2023-07-10",
    tags: ["seasonal eating", "indian agriculture", "nutrition"]
  }
];

// Function to get farmer details by product ID
export const getFarmerByProduct = (productId: string) => {
  const product = products.find(p => p.id === productId);
  if (!product) return null;
  return farmers.find(f => f.id === product.farmerId);
};

// Function to enrich product data with farmer information
export const getEnrichedProducts = () => {
  return products.map(product => {
    const farmer = farmers.find(f => f.id === product.farmerId);
    return {
      ...product,
      farmer: farmer ? {
        id: farmer.id,
        name: farmer.name,
        location: farmer.location,
        rating: farmer.rating
      } : null
    };
  });
};

// Function to get orders with product details
export const getEnrichedOrders = () => {
  return orders.map(order => {
    const enrichedProducts = order.products.map(op => {
      const product = products.find(p => p.id === op.productId);
      return {
        ...op,
        product: product ? {
          id: product.id,
          name: product.name,
          image: product.image,
          unit: product.unit
        } : null
      };
    });
    
    return {
      ...order,
      products: enrichedProducts,
      customer: customers.find(c => c.id === order.customerId)
    };
  });
};
