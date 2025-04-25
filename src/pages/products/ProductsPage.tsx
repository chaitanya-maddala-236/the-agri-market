
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getEnrichedProducts } from "@/data/mockData";
import ProductCard from "@/components/cards/ProductCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, Filter } from "lucide-react";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  locations: string[];
  minRating: number;
  search: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState(getEnrichedProducts());
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]); // Product IDs in cart
  
  const allCategories = Array.from(new Set(products.map(p => p.category)));
  const allLocations = Array.from(new Set(products.map(p => p.farmer?.location || "")));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, maxPrice],
    locations: [],
    minRating: 0,
    search: "",
  });

  useEffect(() => {
    // Apply filters
    let result = products;

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower) ||
        (p.farmer?.name && p.farmer.name.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    // Price range filter
    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Location filter
    if (filters.locations.length > 0) {
      result = result.filter(p => 
        p.farmer?.location && filters.locations.includes(p.farmer.location)
      );
    }

    // Rating filter
    result = result.filter(p => 
      (p.farmer?.rating || 0) >= filters.minRating
    );

    setFilteredProducts(result);
  }, [filters, products]);

  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      if (!prev.includes(product.id)) {
        const newCart = [...prev, product.id];
        // In a real app, we'd store this in localStorage or a state management system
        return newCart;
      }
      return prev;
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      locations: checked 
        ? [...prev.locations, location]
        : prev.locations.filter(l => l !== location)
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [value[0], value[1]]
    }));
  };

  const handleRatingChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      minRating: value[0]
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, maxPrice],
      locations: [],
      minRating: 0,
      search: "",
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={false} cartItemCount={cartItems.length} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Fresh Farm Products</h1>
          <p className="text-gray-600">Directly from local farmers to your table</p>
        </div>
        
        {/* Mobile Search and Filter */}
        <div className="lg:hidden mb-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={handleSearchChange}
                className="pl-9 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-gray-300"
              onClick={toggleFilter}
            >
              <Filter size={18} />
              Filter
            </Button>
          </div>

          {/* Mobile Filters */}
          {isFilterOpen && (
            <div className="mt-4 p-4 border rounded-md shadow-sm bg-white animate-fade-in">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {allCategories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-mobile-${category}`}
                          checked={filters.categories.includes(category)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={`category-mobile-${category}`}
                          className="text-sm"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <Slider
                    defaultValue={[0, maxPrice]}
                    max={maxPrice}
                    step={10}
                    value={filters.priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span>₹{filters.priceRange[0]}</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Location</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {allLocations.map(location => (
                      <div key={location} className="flex items-center space-x-2">
                        <Checkbox
                          id={`location-mobile-${location}`}
                          checked={filters.locations.includes(location)}
                          onCheckedChange={(checked) => 
                            handleLocationChange(location, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={`location-mobile-${location}`}
                          className="text-sm"
                        >
                          {location}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Minimum Rating</h3>
                  <Slider
                    defaultValue={[0]}
                    max={5}
                    step={0.5}
                    value={[filters.minRating]}
                    onValueChange={(value) => handleRatingChange(value)}
                    className="mb-2"
                  />
                  <div className="text-sm">
                    {filters.minRating} stars and above
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearFilters}
                  className="w-full mt-2"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Search</h3>
                <div className="relative">
                  <Input
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={handleSearchChange}
                    className="pl-9"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {allCategories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={(checked) => 
                          handleCategoryChange(category, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`category-${category}`}
                        className="text-sm"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Price Range</h3>
                <Slider
                  defaultValue={[0, maxPrice]}
                  max={maxPrice}
                  step={10}
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Location</h3>
                <div className="space-y-2">
                  {allLocations.map(location => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={filters.locations.includes(location)}
                        onCheckedChange={(checked) => 
                          handleLocationChange(location, checked as boolean)
                        }
                      />
                      <label 
                        htmlFor={`location-${location}`}
                        className="text-sm"
                      >
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Minimum Rating</h3>
                <Slider
                  defaultValue={[0]}
                  max={5}
                  step={0.5}
                  value={[filters.minRating]}
                  onValueChange={(value) => handleRatingChange(value)}
                  className="mb-2"
                />
                <div className="text-sm">
                  {filters.minRating} stars and above
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters}
                className="w-full mt-2"
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-lg text-gray-600 mb-4">No products match your filters</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-500">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
