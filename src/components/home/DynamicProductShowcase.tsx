import { useState, useEffect } from "react";
import { getEnrichedProducts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function DynamicProductShowcase() {
  const [products, setProducts] = useState(getEnrichedProducts().slice(0, 4));
  const { toast } = useToast();

  // Generate appropriate category-specific images
  const getFallbackImage = (category: string) => {
    const categoryImages: Record<string, string> = {
      'Vegetables': 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=800&q=80',
      'Fruits': 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80',
      'Dairy': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
      'Grains': 'https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?auto=format&fit=crop&w=800&q=80',
      'Spices': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80',
      'default': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
    };
    
    return categoryImages[category] || categoryImages.default;
  };

  // Refresh products periodically to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const allProducts = getEnrichedProducts();
      const randomizedProducts = [...allProducts].sort(() => Math.random() - 0.5).slice(0, 4);
      setProducts(randomizedProducts);
      
      toast({
        title: "Products Updated",
        description: "New products are now available!",
        duration: 2000
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [toast]);
  
  if (products.length === 0) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Fresh Produce Coming Soon</h2>
        <p className="text-gray-600">Our farmers are preparing their best products for you</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Additions</h2>
          <Link to="/products" className="group flex items-center gap-2 text-agro-primary hover:text-agro-dark">
            View All 
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/products/${product.id}`}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={getFallbackImage(product.category)} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold group-hover:text-agro-primary transition-colors">{product.name}</h3>
                  <span className="bg-agro-light text-agro-dark px-2 py-1 rounded text-xs font-semibold">
                    {product.category}
                  </span>
                </div>
                <div className="mt-1 text-xl font-bold text-gray-800">
                  ₹{product.price} <span className="text-sm font-normal text-gray-500">/ {product.unit}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild className="bg-agro-primary hover:bg-agro-dark">
            <Link to="/products">Browse All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
