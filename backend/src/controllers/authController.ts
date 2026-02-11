import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { FarmerProfile } from '../models/FarmerProfile.js';
import { generateToken } from '../utils/jwt.js';
import { ApiError, asyncHandler } from '../utils/errorHandler.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, phone, role, location, bio } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError('User already exists with this email', 400);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role,
  });

  // Create farmer profile if role is farmer
  if (role === 'farmer') {
    await FarmerProfile.create({
      userId: user._id,
      location: location || '',
      bio: bio || '',
    });
  }

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user with password field
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  // Get additional profile data if farmer
  let profile = null;
  if (user.role === 'farmer') {
    profile = await FarmerProfile.findOne({ userId: user._id });
  }

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
      },
      profile,
    },
  });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError('User not found', 404);
  }

  let profile = null;
  if (user.role === 'farmer') {
    profile = await FarmerProfile.findOne({ userId: user._id });
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
      profile,
    },
  });
});
