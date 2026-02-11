import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFarmerProducts,
} from '../controllers/productController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = Router();

// Validation
const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn([
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Pulses',
    'Spices',
    'Herbs',
    'Nuts',
    'Seeds',
    'Other',
  ]).withMessage('Invalid category'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  body('unit').isIn(['kg', 'gram', 'liter', 'piece', 'dozen', 'bunch', 'bag']).withMessage('Invalid unit'),
];

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/farmer/:farmerId', getFarmerProducts);

// Protected routes (farmer only)
router.post('/', authenticate, authorize('farmer'), productValidation, createProduct);
router.put('/:id', authenticate, authorize('farmer'), updateProduct);
router.delete('/:id', authenticate, authorize('farmer'), deleteProduct);

export default router;
