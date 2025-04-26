
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getEnrichedProducts } from "@/data/mockData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Filter } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import FilterSidebar from "@/components/filters/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import { useToast } from "@/hooks/use-toast";

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
  const [cartItems, setCartItems] = useState<string[]>([]);
  const { toast } = useToast();
  
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

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower) ||
        (p.farmer?.name && p.farmer.name.toLowerCase().includes(searchLower))
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category));
    }

    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.locations.length > 0) {
      result = result.filter(p => 
        p.farmer?.location && filters.locations.includes(p.farmer.location)
      );
    }

    result = result.filter(p => 
      (p.farmer?.rating || 0) >= filters.minRating
    );

    setFilteredProducts(result);
  }, [filters, products]);

  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      if (!prev.includes(product.id)) {
        const newCart = [...prev, product.id];
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
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
    if (value.length >= 2) {
      setFilters(prev => ({
        ...prev,
        priceRange: [value[0], value[1]]
      }));
    }
  };

  const handleRatingChange = (value: number[]) => {
    if (value.length > 0) {
      setFilters(prev => ({
        ...prev,
        minRating: value[0]
      }));
    }
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      search: value
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
            <div className="flex-1">
              <SearchBar value={filters.search} onChange={handleSearchChange} />
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
              <FilterSidebar
                categories={allCategories}
                locations={allLocations}
                maxPrice={maxPrice}
                filters={filters}
                onCategoryChange={handleCategoryChange}
                onLocationChange={handleLocationChange}
                onPriceChange={handlePriceChange}
                onRatingChange={handleRatingChange}
                onClearFilters={clearFilters}
              />
            </div>
          )}
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSidebar
              categories={allCategories}
              locations={allLocations}
              maxPrice={maxPrice}
              filters={filters}
              onCategoryChange={handleCategoryChange}
              onLocationChange={handleLocationChange}
              onPriceChange={handlePriceChange}
              onRatingChange={handleRatingChange}
              onClearFilters={clearFilters}
            />
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="hidden lg:flex mb-4">
              <div className="flex-1">
                <SearchBar value={filters.search} onChange={handleSearchChange} />
              </div>
            </div>
            <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
