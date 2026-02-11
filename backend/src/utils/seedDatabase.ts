import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { FarmerProfile } from '../models/FarmerProfile.js';
import { Product } from '../models/Product.js';
import config from '../config/index.js';

const seedData = async () => {
  try {
    // Prevent running in production
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ Cannot run seed script in production environment!');
      process.exit(1);
    }

    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await FarmerProfile.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create farmers
    const farmerData = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        password: 'password123',
        role: 'farmer' as const,
        phone: '9876543210',
      },
      {
        name: 'Anita Devi',
        email: 'anita@example.com',
        password: 'password123',
        role: 'farmer' as const,
        phone: '9876543211',
      },
      {
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        password: 'password123',
        role: 'farmer' as const,
        phone: '9876543212',
      },
    ];

    const farmers = await User.create(farmerData);
    console.log(`Created ${farmers.length} farmers`);

    // Create farmer profiles
    const farmerProfiles = await FarmerProfile.create([
      {
        userId: farmers[0]._id,
        bio: 'Organic vegetable farmer with 15 years of experience',
        location: 'Punjab',
        farmSize: '10 acres',
        experience: 15,
        specialization: ['Vegetables', 'Fruits'],
        rating: 4.8,
        totalReviews: 127,
        verified: true,
      },
      {
        userId: farmers[1]._id,
        bio: 'Specializing in organic fruits and herbs',
        location: 'Maharashtra',
        farmSize: '5 acres',
        experience: 10,
        specialization: ['Fruits', 'Herbs'],
        rating: 4.9,
        totalReviews: 89,
        verified: true,
      },
      {
        userId: farmers[2]._id,
        bio: 'Traditional grain and pulse farmer',
        location: 'Haryana',
        farmSize: '20 acres',
        experience: 20,
        specialization: ['Grains', 'Pulses'],
        rating: 4.7,
        totalReviews: 156,
        verified: true,
      },
    ]);
    console.log(`Created ${farmerProfiles.length} farmer profiles`);

    // Create customers
    const customerData = [
      {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: 'password123',
        role: 'customer' as const,
        phone: '9876543213',
      },
      {
        name: 'Amit Patel',
        email: 'amit@example.com',
        password: 'password123',
        role: 'customer' as const,
        phone: '9876543214',
      },
    ];

    const customers = await User.create(customerData);
    console.log(`Created ${customers.length} customers`);

    // Create products
    const productsData = [
      {
        farmerId: farmers[0]._id,
        name: 'Fresh Tomatoes',
        description: 'Locally grown organic tomatoes, perfect for salads and cooking',
        category: 'Vegetables',
        price: 40,
        unit: 'kg',
        quantity: 500,
        minOrder: 1,
        images: ['https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400'],
        organic: true,
        inSeason: true,
        available: true,
        rating: 4.5,
        totalReviews: 23,
        tags: ['organic', 'fresh', 'local'],
      },
      {
        farmerId: farmers[0]._id,
        name: 'Organic Potatoes',
        description: 'Fresh potatoes from our farm, great for all dishes',
        category: 'Vegetables',
        price: 30,
        unit: 'kg',
        quantity: 1000,
        minOrder: 2,
        images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400'],
        organic: true,
        inSeason: true,
        available: true,
        rating: 4.6,
        totalReviews: 45,
        tags: ['organic', 'fresh'],
      },
      {
        farmerId: farmers[1]._id,
        name: 'Fresh Mangoes',
        description: 'Sweet and juicy Alphonso mangoes, hand-picked',
        category: 'Fruits',
        price: 120,
        unit: 'kg',
        quantity: 200,
        minOrder: 1,
        images: ['https://images.unsplash.com/photo-1553279768-865429fa0078?w=400'],
        organic: true,
        inSeason: true,
        available: true,
        rating: 4.9,
        totalReviews: 67,
        tags: ['organic', 'seasonal', 'alphonso'],
      },
      {
        farmerId: farmers[1]._id,
        name: 'Organic Bananas',
        description: 'Naturally ripened bananas, rich in nutrients',
        category: 'Fruits',
        price: 50,
        unit: 'dozen',
        quantity: 300,
        minOrder: 1,
        images: ['https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400'],
        organic: true,
        inSeason: true,
        available: true,
        rating: 4.7,
        totalReviews: 34,
        tags: ['organic', 'fresh'],
      },
      {
        farmerId: farmers[2]._id,
        name: 'Basmati Rice',
        description: 'Premium quality aged basmati rice',
        category: 'Grains',
        price: 80,
        unit: 'kg',
        quantity: 2000,
        minOrder: 5,
        images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'],
        organic: false,
        inSeason: true,
        available: true,
        rating: 4.8,
        totalReviews: 89,
        tags: ['premium', 'aged'],
      },
      {
        farmerId: farmers[2]._id,
        name: 'Toor Dal (Pulses)',
        description: 'High-quality toor dal, rich in protein',
        category: 'Pulses',
        price: 100,
        unit: 'kg',
        quantity: 1500,
        minOrder: 2,
        images: ['https://images.unsplash.com/photo-1559847844-5315695dadae?w=400'],
        organic: false,
        inSeason: true,
        available: true,
        rating: 4.6,
        totalReviews: 56,
        tags: ['protein-rich', 'quality'],
      },
    ];

    const products = await Product.create(productsData);
    console.log(`Created ${products.length} products`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Farmers:');
    console.log('  - rajesh@example.com / password123');
    console.log('  - anita@example.com / password123');
    console.log('  - vikram@example.com / password123');
    console.log('\nCustomers:');
    console.log('  - priya@example.com / password123');
    console.log('  - amit@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
