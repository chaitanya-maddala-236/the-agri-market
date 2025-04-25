
import { Product } from "@/components/cards/ProductCard";
import ProductCard from "@/components/cards/ProductCard";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-lg text-gray-600">No products found matching your filters</p>
        <p className="text-sm text-gray-500 mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 text-sm text-gray-500">
        Showing {products.length} {products.length === 1 ? 'product' : 'products'}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </>
  );
}
