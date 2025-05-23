
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  categories: string[];
  locations: string[];
  maxPrice: number;
  filters: {
    categories: string[];
    priceRange: [number, number];
    locations: string[];
    minRating: number;
  };
  onCategoryChange: (category: string, checked: boolean) => void;
  onLocationChange: (location: string, checked: boolean) => void;
  onPriceChange: (value: number[]) => void;
  onRatingChange: (value: number[]) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  categories,
  locations,
  maxPrice,
  filters,
  onCategoryChange,
  onLocationChange,
  onPriceChange,
  onRatingChange,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="mb-4">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => 
                  onCategoryChange(category, checked as boolean)
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
          onValueChange={onPriceChange}
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
          {locations.map(location => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={filters.locations.includes(location)}
                onCheckedChange={(checked) => 
                  onLocationChange(location, checked as boolean)
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
          onValueChange={(value) => onRatingChange(value)}
          className="mb-2"
        />
        <div className="text-sm">
          {filters.minRating} stars and above
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onClearFilters}
        className="w-full mt-2"
      >
        Clear Filters
      </Button>
    </div>
  );
}
