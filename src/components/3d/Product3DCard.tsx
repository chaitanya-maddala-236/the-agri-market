import { motion } from 'framer-motion';
import { Product } from '@/data/types';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';

interface Product3DCardProps {
  product: Product;
  farmerName: string;
}

export default function Product3DCard({ product, farmerName }: Product3DCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10,
        rotateY: 5,
        rotateX: -5,
        scale: 1.02,
      }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className="relative group"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        {/* Image with 3D effect */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Glassmorphism badge */}
          {product.organic && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-3 left-3 backdrop-blur-md bg-white/30 px-3 py-1 rounded-full text-xs font-semibold text-green-700 border border-white/40"
              style={{
                transform: 'translateZ(40px)',
              }}
            >
              Organic
            </motion.div>
          )}
          
          {/* 3D floating price tag */}
          <motion.div
            className="absolute top-3 right-3 backdrop-blur-lg bg-gradient-to-br from-emerald-500 to-green-600 text-white px-3 py-2 rounded-lg shadow-lg font-bold"
            whileHover={{ 
              scale: 1.1,
              rotate: -5,
            }}
            style={{
              transform: 'translateZ(50px)',
            }}
          >
            ₹{product.price}/{product.unit}
          </motion.div>
        </div>

        {/* Content with depth */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">by {farmerName}</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating with 3D effect */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">
              {product.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Action buttons with 3D hover */}
          <div className="flex gap-2">
            <Link to={`/products/${product.id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
              >
                View Details
              </Button>
            </Link>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="icon"
                className="bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* 3D hover shadow effect */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl"
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 1,
            boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
