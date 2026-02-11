import dotenv from 'dotenv';

dotenv.config();

interface Config {
  env: string;
  port: number;
  mongoUri: string;
  jwtSecret: string;
  jwtExpire: string;
  corsOrigin: string;
  maxFileSize: number;
  uploadPath: string;
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/agri-market',
  jwtSecret: (() => {
    const secret = process.env.JWT_SECRET;
    if (!secret && process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET must be set in production environment');
    }
    return secret || 'dev-secret-key-change-in-production';
  })(),
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10),
  uploadPath: process.env.UPLOAD_PATH || './uploads',
};

export default config;
