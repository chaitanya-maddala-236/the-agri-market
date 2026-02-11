import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  farmerId: Types.ObjectId;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  minOrder: number;
  images: string[];
  organic: boolean;
  inSeason: boolean;
  available: boolean;
  rating: number;
  totalReviews: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    farmerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
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
      ],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    unit: {
      type: String,
      required: [true, 'Unit is required'],
      enum: ['kg', 'gram', 'liter', 'piece', 'dozen', 'bunch', 'bag'],
      default: 'kg',
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    minOrder: {
      type: Number,
      default: 1,
      min: [1, 'Minimum order must be at least 1'],
    },
    images: {
      type: [String],
      default: [],
    },
    organic: {
      type: Boolean,
      default: false,
    },
    inSeason: {
      type: Boolean,
      default: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching
productSchema.index({ name: 'text', description: 'text', category: 'text' });

export const Product = mongoose.model<IProduct>('Product', productSchema);
