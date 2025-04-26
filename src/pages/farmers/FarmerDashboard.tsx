
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getEnrichedProducts } from "@/data/mockData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Product } from "@/components/cards/ProductCard";
import AddProductModal from "@/components/farmer/AddProductModal";
import EditProductModal from "@/components/farmer/EditProductModal";
import DeleteProductModal from "@/components/farmer/DeleteProductModal";

export default function FarmerDashboard() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize with dummy farmer products
  useEffect(() => {
    const farmerProducts = getEnrichedProducts().filter(p => p.farmer.id === "f1"); // Filter for current farmer
    setProducts(farmerProducts);
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setIsAddModalOpen(false);
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to your inventory`,
    });
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
    setIsEditModalOpen(false);
    toast({
      title: "Product Updated",
      description: `${updatedProduct.name} has been updated successfully`,
    });
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
      toast({
        title: "Product Deleted",
        description: `${selectedProduct.name} has been removed from your inventory`,
      });
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your products and track sales</p>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)} 
              className="bg-agro-primary hover:bg-agro-dark flex items-center gap-2"
            >
              <Plus size={18} />
              Add Product
            </Button>
          </div>

          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-agro-light rounded-lg p-6">
                <h3 className="text-lg font-medium mb-2">Total Products</h3>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-2">Recent Orders</h3>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold">₹24,500</p>
              </div>
            </div>

            {/* Product Table */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Your Products</h2>
              
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <img 
                              src={product.image || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"} 
                              alt={product.name} 
                              className="w-14 h-14 object-cover rounded-md"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">₹{product.price} / {product.unit}</TableCell>
                          <TableCell className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.quantity > 10 
                                ? "bg-green-100 text-green-800" 
                                : product.quantity > 0 
                                  ? "bg-amber-100 text-amber-800" 
                                  : "bg-red-100 text-red-800"
                            }`}>
                              {product.quantity}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => openEditModal(product)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit size={16} />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => openDeleteModal(product)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No products found. Click "Add Product" to add your first product.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Modals */}
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddProduct} 
      />
      
      <EditProductModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onEdit={handleEditProduct} 
        product={selectedProduct} 
      />
      
      <DeleteProductModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onDelete={handleDeleteProduct} 
        productName={selectedProduct?.name} 
      />
    </div>
  );
}
