
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products"; // Changed to named import
import { getFarmerByProduct } from "@/data/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, ShoppingCart, Minus, Plus, ChevronLeft } from "lucide-react";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<any>(null);
  const [farmer, setFarmer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find(p => p.id === productId);
    const foundFarmer = foundProduct ? getFarmerByProduct(foundProduct.id) : null;
    
    setProduct(foundProduct || null);
    setFarmer(foundFarmer || null);
    setLoading(false);
  }, [productId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg h-96"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-24 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">Sorry, the product you are looking for does not exist.</p>
            <Button onClick={() => navigate("/products")}>
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    } else {
      toast({
        title: "Maximum quantity reached",
        description: `Only ${product.quantity} units available`,
        variant: "destructive"
      });
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
    // In a real app, this would add to cart state
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-600 hover:text-gray-900 p-0"
            onClick={() => navigate("/products")}
          >
            <ChevronLeft size={18} />
            <span>Back to Products</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain rounded-md"
              style={{ maxHeight: '400px' }}
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-gray-800 mr-2">₹{product.price}</span>
              <span className="text-gray-600">/ {product.unit}</span>
            </div>
            
            <div className="mb-4">
              <div className="inline-block bg-agro-light text-agro-dark px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </div>
            </div>
            
            {farmer && (
              <div className="mb-6">
                <Link to={`/farmers/${farmer.id}`} className="flex items-center space-x-2 mb-2 hover:text-agro-primary transition-colors">
                  <div>
                    <img 
                      src={farmer.image} 
                      alt={farmer.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{farmer.name}</p>
                    <p className="text-sm text-gray-600">{farmer.location}</p>
                  </div>
                </Link>
                
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(farmer.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{farmer.rating.toFixed(1)}</span>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold">Quantity</h2>
                <span className="text-sm text-gray-600">
                  {product.quantity > 10 
                    ? "In stock" 
                    : product.quantity > 0 
                      ? `Only ${product.quantity} left` 
                      : "Out of stock"}
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    disabled={quantity >= product.quantity}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  disabled={product.quantity <= 0}
                  className="flex-1 bg-agro-primary hover:bg-agro-dark"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Info Tabs */}
        <div className="mt-10">
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="farmer">About Farmer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="p-4 border rounded-md bg-white">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Category:</span> {product.category}</li>
                <li><span className="font-medium">Origin:</span> {farmer?.location || "Not specified"}</li>
                <li><span className="font-medium">Harvest Date:</span> {new Date().toLocaleDateString()}</li>
                <li><span className="font-medium">Storage Instructions:</span> Keep refrigerated for best freshness</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="shipping" className="p-4 border rounded-md bg-white">
              <h3 className="font-semibold mb-3">Shipping Information</h3>
              <p className="mb-3">We ensure that your products are delivered fresh and in perfect condition.</p>
              <ul className="space-y-2">
                <li><span className="font-medium">Delivery Time:</span> 1-3 business days</li>
                <li><span className="font-medium">Shipping Fee:</span> Free shipping on orders above ₹500</li>
                <li><span className="font-medium">Packaging:</span> Eco-friendly packaging to maintain freshness</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="farmer" className="p-4 border rounded-md bg-white">
              {farmer ? (
                <div>
                  <div className="flex items-center mb-4">
                    <img 
                      src={farmer.image} 
                      alt={farmer.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{farmer.name}</h3>
                      <p className="text-sm text-gray-600">{farmer.location}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4">{farmer.bio}</p>
                  
                  <div>
                    <Link to={`/farmers/${farmer.id}`}>
                      <Button variant="outline">View Farmer Profile</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <p>Farmer information not available</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
