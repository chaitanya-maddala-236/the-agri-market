
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmer: {
    id: string;
    name: string;
    location: string;
    rating: number;
  };
  category: string;
  quantity: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-card-image" />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/products/${product.id}`} className="hover:text-agro-primary transition-colors">
            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          </Link>
          <div className="bg-agro-light text-agro-dark px-2 py-1 rounded text-xs font-semibold">
            {product.category}
          </div>
        </div>
        
        <div className="mt-1 text-xl font-bold text-gray-800">
          ₹{product.price} <span className="text-sm font-normal text-gray-500">/ {product.unit}</span>
        </div>
        
        <div className="mt-2 flex items-center text-sm">
          <Link to={`/farmers/${product.farmer.id}`} className="text-gray-600 hover:text-agro-primary">
            {product.farmer.name}
          </Link>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-600">{product.farmer.location}</span>
        </div>
        
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.farmer.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">{product.farmer.rating.toFixed(1)}</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {product.quantity > 10 
              ? "In stock" 
              : product.quantity > 0 
                ? `Only ${product.quantity} left` 
                : "Out of stock"}
          </span>
          <Button 
            size="sm" 
            onClick={handleAddToCart} 
            disabled={product.quantity <= 0}
            className="flex items-center space-x-1 bg-agro-primary hover:bg-agro-dark"
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
