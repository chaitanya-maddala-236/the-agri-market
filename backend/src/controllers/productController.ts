import { Response } from 'express';
import { Product } from '../models/Product.js';
import { AuthRequest } from '../middleware/auth.js';
import { ApiError, asyncHandler } from '../utils/errorHandler.js';

// Get all products with filters
export const getProducts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {
    category,
    minPrice,
    maxPrice,
    organic,
    inSeason,
    search,
    page = 1,
    limit = 20,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = req.query;

  const query: any = { available: true };

  if (category) query.category = category;
  if (organic !== undefined) query.organic = organic === 'true';
  if (inSeason !== undefined) query.inSeason = inSeason === 'true';
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (search) {
    query.$text = { $search: search as string };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sort: any = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 };

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('farmerId', 'name email avatar')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: {
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    },
  });
});

// Get single product
export const getProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findById(req.params.id).populate(
    'farmerId',
    'name email avatar phone'
  );

  if (!product) {
    throw new ApiError('Product not found', 404);
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// Create product (farmer only)
export const createProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const farmerId = req.user!.id;

  const product = await Product.create({
    ...req.body,
    farmerId,
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product,
  });
});

// Update product (farmer only, own products)
export const updateProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError('Product not found', 404);
  }

  if (product.farmerId.toString() !== req.user!.id) {
    throw new ApiError('You can only update your own products', 403);
  }

  Object.assign(product, req.body);
  await product.save();

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: product,
  });
});

// Delete product (farmer only, own products)
export const deleteProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError('Product not found', 404);
  }

  if (product.farmerId.toString() !== req.user!.id) {
    throw new ApiError('You can only delete your own products', 403);
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Get farmer's products
export const getFarmerProducts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const farmerId = req.params.farmerId || req.user!.id;

  const products = await Product.find({ farmerId });

  res.status(200).json({
    success: true,
    data: products,
  });
});
