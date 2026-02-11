import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IFarmerProfile extends Document {
  userId: Types.ObjectId;
  bio: string;
  location: string;
  farmSize?: string;
  experience?: number;
  specialization: string[];
  rating: number;
  totalReviews: number;
  bankDetails?: {
    accountNumber?: string;
    ifscCode?: string;
    accountHolderName?: string;
  };
  certifications?: string[];
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const farmerProfileSchema = new Schema<IFarmerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
      default: '',
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    farmSize: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
      min: [0, 'Experience cannot be negative'],
    },
    specialization: {
      type: [String],
      default: [],
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
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      accountHolderName: String,
    },
    certifications: {
      type: [String],
      default: [],
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const FarmerProfile = mongoose.model<IFarmerProfile>(
  'FarmerProfile',
  farmerProfileSchema
);
