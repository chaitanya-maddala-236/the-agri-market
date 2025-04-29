
import { products } from './products';
import { farmers } from './farmers';
import { customers } from './customers';
import { orders } from './orders';
import { EnrichedProduct, EnrichedOrder } from './types';

// Function to get farmer details by product ID
export const getFarmerByProduct = (productId: string) => {
  const product = products.find(p => p.id === productId);
  if (!product) return null;
  return farmers.find(f => f.id === product.farmerId);
};

// Function to enrich product data with farmer information
export const getEnrichedProducts = (): EnrichedProduct[] => {
  return products.map(product => {
    const farmer = farmers.find(f => f.id === product.farmerId);
    return {
      ...product,
      farmer: farmer ? {
        id: farmer.id,
        name: farmer.name,
        location: farmer.location,
        rating: farmer.rating
      } : {
        id: '',
        name: 'Unknown',
        location: 'Unknown',
        rating: 0
      }
    };
  });
};

// Function to get orders with product details
export const getEnrichedOrders = (): EnrichedOrder[] => {
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
