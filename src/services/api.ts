// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  const user = localStorage.getItem('agroConnect_user');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token || null;
  }
  return null;
};

// API request helper
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: 'farmer' | 'customer';
    location?: string;
    bio?: string;
  }) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async login(credentials: { email: string; password: string }) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async getProfile() {
    return apiRequest('/auth/profile', {
      method: 'GET',
    });
  },
};

// Products API
export const productsAPI = {
  async getAll(params?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    organic?: boolean;
    inSeason?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString();
    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    });
  },

  async getById(id: string) {
    return apiRequest(`/products/${id}`, {
      method: 'GET',
    });
  },

  async getFarmerProducts(farmerId?: string) {
    return apiRequest(`/products/farmer/${farmerId || 'me'}`, {
      method: 'GET',
    });
  },

  async create(productData: any) {
    return apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  async update(id: string, productData: any) {
    return apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  async delete(id: string) {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Cart API
export const cartAPI = {
  async get() {
    return apiRequest('/cart', {
      method: 'GET',
    });
  },

  async addItem(productId: string, quantity: number) {
    return apiRequest('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  async updateItem(productId: string, quantity: number) {
    return apiRequest('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  async removeItem(productId: string) {
    return apiRequest(`/cart/remove/${productId}`, {
      method: 'DELETE',
    });
  },

  async clear() {
    return apiRequest('/cart/clear', {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersAPI = {
  async create(orderData: {
    deliveryAddress: {
      name: string;
      phone: string;
      address: string;
      pinCode: string;
      city: string;
      state: string;
    };
    paymentMethod: 'cod' | 'online';
    notes?: string;
  }) {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  async getAll() {
    return apiRequest('/orders', {
      method: 'GET',
    });
  },

  async getById(id: string) {
    return apiRequest(`/orders/${id}`, {
      method: 'GET',
    });
  },

  async updateStatus(id: string, status: string, trackingNumber?: string) {
    return apiRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ orderStatus: status, trackingNumber }),
    });
  },

  async cancel(id: string) {
    return apiRequest(`/orders/${id}/cancel`, {
      method: 'PUT',
    });
  },
};

export default {
  auth: authAPI,
  products: productsAPI,
  cart: cartAPI,
  orders: ordersAPI,
};
