import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { apiLimiter, createLimiter } from '../middleware/rateLimiter.js';
import { body } from 'express-validator';

const router = Router();

// Validation
const createOrderValidation = [
  body('deliveryAddress.name').notEmpty().withMessage('Name is required'),
  body('deliveryAddress.phone').notEmpty().withMessage('Phone is required'),
  body('deliveryAddress.address').notEmpty().withMessage('Address is required'),
  body('deliveryAddress.pinCode').notEmpty().withMessage('Pin code is required'),
  body('deliveryAddress.city').notEmpty().withMessage('City is required'),
  body('deliveryAddress.state').notEmpty().withMessage('State is required'),
  body('paymentMethod').isIn(['cod', 'online']).withMessage('Invalid payment method'),
];

// All routes require authentication
router.use(authenticate, apiLimiter);

// Routes
router.post('/', authorize('customer'), createLimiter, createOrderValidation, createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id/status', authorize('farmer'), updateOrderStatus);
router.put('/:id/cancel', authorize('customer'), cancelOrder);

export default router;
