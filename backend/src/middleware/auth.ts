import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/User.js';
import { ApiError } from '../utils/errorHandler.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'farmer' | 'customer';
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError('No token provided', 401);
    }

    const decoded = verifyToken(token);
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError('Invalid token', 401));
  }
};

export const authorize = (...roles: ('farmer' | 'customer')[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError('Not authenticated', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
