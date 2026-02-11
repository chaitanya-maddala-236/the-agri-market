import { Response } from 'express';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { AuthRequest } from '../middleware/auth.js';
import { ApiError, asyncHandler } from '../utils/errorHandler.js';

// Get user cart
export const getCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  let cart = await Cart.findOne({ userId }).populate('items.productId');

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  res.status(200).json({
    success: true,
    data: cart,
  });
});

// Add item to cart
export const addToCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { productId, quantity } = req.body;

  // Verify product exists
  const product = await Product.findById(productId);
  if (!product || !product.available) {
    throw new ApiError('Product not available', 404);
  }

  // Check stock
  if (product.quantity < quantity) {
    throw new ApiError('Insufficient stock', 400);
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [{ productId, quantity, price: product.price }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update existing item
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ productId, quantity, price: product.price });
    }

    await cart.save();
  }

  await cart.populate('items.productId');

  res.status(200).json({
    success: true,
    message: 'Item added to cart',
    data: cart,
  });
});

// Update cart item quantity
export const updateCartItem = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError('Cart not found', 404);
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex === -1) {
    throw new ApiError('Item not found in cart', 404);
  }

  if (quantity <= 0) {
    // Remove item if quantity is 0 or negative
    cart.items.splice(itemIndex, 1);
  } else {
    // Verify stock
    const product = await Product.findById(productId);
    if (product && product.quantity < quantity) {
      throw new ApiError('Insufficient stock', 400);
    }
    cart.items[itemIndex].quantity = quantity;
  }

  await cart.save();
  await cart.populate('items.productId');

  res.status(200).json({
    success: true,
    message: 'Cart updated',
    data: cart,
  });
});

// Remove item from cart
export const removeFromCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError('Cart not found', 404);
  }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();
  await cart.populate('items.productId');

  res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    data: cart,
  });
});

// Clear cart
export const clearCart = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError('Cart not found', 404);
  }

  cart.items = [];
  await cart.save();

  res.status(200).json({
    success: true,
    message: 'Cart cleared',
    data: cart,
  });
});
