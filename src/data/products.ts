
import { Product } from "./types";

// Images uploaded to Lovable
const tomatoesImage = "/lovable-uploads/2211d90b-c933-4414-9a6f-88bd2488e4e8.png"; // Roma Tomatoes image
const freshTomatoesImage = "/lovable-uploads/103e2fac-c9a8-4f42-b01a-5f45e813c657.png"; // Fresh Tomatoes image
const dragonFruitImage = "/lovable-uploads/fa7170a4-ce7c-47cc-991a-86c5e611a835.png"; // Dragon Fruit image
const greenChilliesImage = "/lovable-uploads/cd97f74f-ca6d-4be7-b06d-740d6f023034.png"; // Green Chillies image
const okraImage = "/lovable-uploads/d866c491-0d44-4946-84dc-3c653117d18b.png"; // Lady Finger/Okra image
const honeyImage = "/lovable-uploads/4deb2afe-2583-4d6d-b8a2-b93a4d3cd708.png"; // Organic Honey image
const riceImage = "/lovable-uploads/b78ac978-4326-4cef-b7c4-74fd4fcfef9b.png"; // Premium Basmati Rice image
const brownRiceImage = "/lovable-uploads/db477e41-a554-40ba-a92e-52684b7263ed.png"; // Brown Rice image
const potatoImage = "/lovable-uploads/4a991fcf-dd03-4d68-87d2-52f0db78af34.png"; // Potatoes image
const gheeImage = "/lovable-uploads/a74de313-8831-4d01-9f5b-684071becce8.png"; // Pure Cow Ghee image
const spinachImage = "/lovable-uploads/1663c8c2-63a9-4c21-a5d4-3cce7f60d007.png"; // Fresh Spinach image
const mangoImage = "/lovable-uploads/4f8edd30-f355-4507-856b-58d0b13ef0ac.png"; // Alphonso Mango image
const ladyFingerImage = "/lovable-uploads/fb7588af-18ca-4bc3-b056-ac236a205c3e.png"; // Lady Finger image
const paneeerImage = "/lovable-uploads/1c4dddca-3b1c-4f8d-8ea1-cc1b174e420f.png"; // Fresh Paneer image
const organicOkraImage = "/lovable-uploads/bd689eb2-8523-4cd0-9698-6c94e4e82ada.png"; // Organic Okra image

const products: Product[] = [
  {
    id: "p1",
    name: "Roma Tomatoes",
    description: "Fresh, ripe Roma tomatoes perfect for sauces and salads.",
    price: 45,
    unit: "kg",
    quantity: 200,
    category: "Vegetables",
    farmerId: "f1",
    image: tomatoesImage
  },
  {
    id: "p2",
    name: "Fresh Tomatoes",
    description: "Vine ripened tomatoes grown using traditional farming methods.",
    price: 60,
    unit: "kg",
    quantity: 150,
    category: "Vegetables",
    farmerId: "f2",
    image: freshTomatoesImage
  },
  {
    id: "p3",
    name: "Dragon Fruit",
    description: "Exotic dragon fruit rich in antioxidants and vitamins.",
    price: 180,
    unit: "kg",
    quantity: 45,
    category: "Fruits",
    farmerId: "f3",
    image: dragonFruitImage
  },
  {
    id: "p4",
    name: "Green Chillies",
    description: "Fresh green chillies with the perfect spice level.",
    price: 70,
    unit: "kg",
    quantity: 80,
    category: "Vegetables",
    farmerId: "f1",
    image: greenChilliesImage
  },
  {
    id: "p5",
    name: "Lady Finger",
    description: "Tender and fresh lady finger/okra picked at the right time.",
    price: 85,
    unit: "kg",
    quantity: 70,
    category: "Vegetables",
    farmerId: "f2",
    image: ladyFingerImage
  },
  {
    id: "p6",
    name: "Organic Honey",
    description: "Pure organic honey collected from forest bees, unprocessed and raw.",
    price: 450,
    unit: "bottle",
    quantity: 25,
    category: "Dairy & Honey",
    farmerId: "f4",
    image: honeyImage
  },
  {
    id: "p7",
    name: "Premium Basmati Rice",
    description: "Premium long-grain basmati rice with perfect aroma.",
    price: 160,
    unit: "kg",
    quantity: 300,
    category: "Grains",
    farmerId: "f5",
    image: riceImage
  },
  {
    id: "p8",
    name: "Brown Rice",
    description: "Organically grown brown rice rich in fiber and nutrients.",
    price: 140,
    unit: "kg",
    quantity: 250,
    category: "Grains",
    farmerId: "f6",
    image: brownRiceImage
  },
  {
    id: "p9",
    name: "Potatoes",
    description: "Farm-fresh potatoes perfect for all your cooking needs.",
    price: 30,
    unit: "kg",
    quantity: 500,
    category: "Vegetables",
    farmerId: "f3",
    image: potatoImage
  },
  {
    id: "p10",
    name: "Pure Cow Ghee",
    description: "Traditional hand-churned pure cow ghee from indigenous cows.",
    price: 650,
    unit: "kg",
    quantity: 20,
    category: "Dairy & Honey",
    farmerId: "f7",
    image: gheeImage
  },
  {
    id: "p11",
    name: "Fresh Spinach",
    description: "Freshly harvested spinach leaves full of iron and vitamins.",
    price: 55,
    unit: "bundle",
    quantity: 120,
    category: "Vegetables",
    farmerId: "f1",
    image: spinachImage
  },
  {
    id: "p12",
    name: "Alphonso Mango",
    description: "The king of fruits - premium Alphonso mangoes from Ratnagiri.",
    price: 350,
    unit: "dozen",
    quantity: 30,
    category: "Fruits",
    farmerId: "f2",
    image: mangoImage
  },
  {
    id: "p13",
    name: "Organic Okra",
    description: "Certified organic lady fingers grown without pesticides.",
    price: 120,
    unit: "kg",
    quantity: 50,
    category: "Vegetables",
    farmerId: "f4",
    image: organicOkraImage
  },
  {
    id: "p14",
    name: "Fresh Paneer",
    description: "Homemade fresh cottage cheese made from farm-fresh milk.",
    price: 280,
    unit: "kg",
    quantity: 15,
    category: "Dairy & Honey",
    farmerId: "f7",
    image: paneeerImage
  }
];

export default products;
