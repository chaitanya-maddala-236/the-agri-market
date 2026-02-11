import { Response } from 'express';
import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { AuthRequest } from '../middleware/auth.js';
import { ApiError, asyncHandler } from '../utils/errorHandler.js';

// Create order from cart
export const createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const customerId = req.user!.id;
  const { deliveryAddress, paymentMethod, notes } = req.body;

  // Get cart
  const cart = await Cart.findOne({ userId: customerId }).populate('items.productId');
  if (!cart || cart.items.length === 0) {
    throw new ApiError('Cart is empty', 400);
  }

  // Prepare order items and verify stock
  const orderItems = [];
  for (const item of cart.items) {
    const product: any = item.productId;
    
    if (!product || !product.available) {
      throw new ApiError(`Product ${product?.name || 'unknown'} is not available`, 400);
    }

    if (product.quantity < item.quantity) {
      throw new ApiError(`Insufficient stock for ${product.name}`, 400);
    }

    orderItems.push({
      productId: product._id,
      name: product.name,
      quantity: item.quantity,
      price: item.price,
      farmerId: product.farmerId,
    });

    // Reduce product quantity
    product.quantity -= item.quantity;
    await product.save();
  }

  // Create order
  const order = await Order.create({
    customerId,
    items: orderItems,
    totalAmount: cart.totalAmount,
    deliveryAddress,
    paymentMethod,
    notes,
  });

  // Clear cart
  cart.items = [];
  await cart.save();

  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    data: order,
  });
});

// Get all orders (customer or farmer)
export const getOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id: userId, role } = req.user!;
  
  let query: any = {};
  
  if (role === 'customer') {
    query.customerId = userId;
  } else if (role === 'farmer') {
    // Get orders containing farmer's products
    query['items.farmerId'] = userId;
  }

  const orders = await Order.find(query)
    .populate('customerId', 'name email phone')
    .populate('items.productId', 'name images')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: orders,
  });
});

// Get single order
export const getOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id)
    .populate('customerId', 'name email phone')
    .populate('items.productId', 'name images');

  if (!order) {
    throw new ApiError('Order not found', 404);
  }

  // Verify access
  const { id: userId, role } = req.user!;
  const isFarmerOrder = order.items.some(
    (item: any) => item.farmerId.toString() === userId
  );

  if (
    order.customerId.toString() !== userId &&
    role !== 'farmer' &&
    !isFarmerOrder
  ) {
    throw new ApiError('You do not have access to this order', 403);
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

// Update order status (farmer only)
export const updateOrderStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { orderStatus, trackingNumber } = req.body;
  
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new ApiError('Order not found', 404);
  }

  // Verify farmer has access to this order
  const farmerId = req.user!.id;
  const hasFarmerProduct = order.items.some(
    (item: any) => item.farmerId.toString() === farmerId
  );

  if (!hasFarmerProduct) {
    throw new ApiError('You do not have access to this order', 403);
  }

  if (orderStatus) order.orderStatus = orderStatus;
  if (trackingNumber) order.trackingNumber = trackingNumber;

  await order.save();

  res.status(200).json({
    success: true,
    message: 'Order status updated',
    data: order,
  });
});

// Cancel order (customer only, if status is pending)
export const cancelOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);
  
  if (!order) {
    throw new ApiError('Order not found', 404);
  }

  if (order.customerId.toString() !== req.user!.id) {
    throw new ApiError('You can only cancel your own orders', 403);
  }

  if (order.orderStatus !== 'pending') {
    throw new ApiError('Only pending orders can be cancelled', 400);
  }

  order.orderStatus = 'cancelled';
  await order.save();

  // Restore product quantities
  for (const item of order.items) {
    const product = await Product.findById(item.productId);
    if (product) {
      product.quantity += item.quantity;
      await product.save();
    }
  }

  res.status(200).json({
    success: true,
    message: 'Order cancelled successfully',
    data: order,
  });
});
