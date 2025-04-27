import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getEnrichedProducts } from "@/data/mockData";
import ProductCard from "@/components/cards/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Star } from "lucide-react";

const Index = () => {
  const allProducts = getEnrichedProducts();
  const featuredProducts = allProducts
    .sort((a, b) => b.farmer.rating - a.farmer.rating)
    .slice(0, 4);

  const topCategories = Array.from(new Set(allProducts.map(p => p.category)))
    .slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section with Dynamic Background */}
      <section className="relative bg-gradient-to-b from-agro-light to-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 animate-fade-in">
                  Fresh from <span className="text-agro-primary">Farm</span> to <span className="text-agro-secondary">Home</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 text-gray-600">
                  Connect directly with local farmers and get fresh produce delivered to your doorstep. No middlemen, better prices, fresher food.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/farmer/register">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-agro-primary text-agro-primary hover:bg-agro-primary hover:text-white">
                      I'm a Farmer
                    </Button>
                  </Link>
                  <Link to="/customer/register">
                    <Button size="lg" className="w-full sm:w-auto bg-agro-primary hover:bg-agro-dark">
                      I'm a Customer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80" 
                  alt="Farmer with fresh produce" 
                  className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg hidden md:block animate-bounce-slow">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Star className="h-6 w-6 text-agro-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Direct from Farmers</p>
                      <p className="text-sm text-gray-600">No middlemen involved</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCategories.map((category) => (
              <Link 
                key={category}
                to={`/products?category=${category}`}
                className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square p-6 flex flex-col items-center justify-center text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-agro-primary/5 to-agro-secondary/5 group-hover:opacity-100 transition-opacity" />
                  <span className="text-lg font-medium text-gray-800 group-hover:text-agro-primary transition-colors">
                    {category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="group flex items-center gap-2 text-agro-primary hover:text-agro-dark">
              View All 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How AgroConnect Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-agro-light rounded-lg p-6 text-center animate-fade-in">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-agro-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Farmers List Products</h3>
              <p className="text-gray-600">Farmers add their fresh produce with details like price, quantity, and images.</p>
            </div>
            
            <div className="bg-agro-light rounded-lg p-6 text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-agro-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Customers Browse & Order</h3>
              <p className="text-gray-600">Customers browse products, place orders, and select delivery options.</p>
            </div>
            
            <div className="bg-agro-light rounded-lg p-6 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-2xl font-bold text-agro-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Delivery</h3>
              <p className="text-gray-600">Fresh produce is delivered directly from farm to your home, ensuring freshness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Priya Desai</h4>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
              <p className="text-gray-600">"The vegetables I get from AgroConnect are so much fresher than what I used to buy from supermarkets. I love knowing exactly where my food comes from!"</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Rajesh Patel</h4>
                  <p className="text-sm text-gray-500">Farmer</p>
                </div>
              </div>
              <p className="text-gray-600">"Since joining AgroConnect, my earnings have increased by 30%. Direct selling means better prices for me and my family. Thank you AgroConnect!"</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="User" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">Amit Kumar</h4>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
              <p className="text-gray-600">"The quality and variety of products available on AgroConnect is impressive. I've discovered so many local varieties I never knew existed!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-agro-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Whether you're a farmer looking to sell your produce or a customer seeking fresh, local food - AgroConnect brings you together.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/farmer/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-agro-primary">
                Join as Farmer
              </Button>
            </Link>
            <Link to="/customer/register">
              <Button size="lg" className="bg-white text-agro-primary hover:bg-agro-light">
                Join as Customer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
