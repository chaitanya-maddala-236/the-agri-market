
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/components/cards/ProductCard";
import { useToast } from "@/hooks/use-toast";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

export default function AddProductModal({ isOpen, onClose, onAdd }: AddProductModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "kg",
    quantity: "",
    category: "",
    description: "",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure all required fields are filled
    if (!formData.name || !formData.price || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      farmer: {
        id: "f1", // This would come from auth
        name: "John Farmer",
        location: "Karnataka",
        rating: 4.5
      }
    };
    
    onAdd(newProduct);
    toast({
      title: "Product added",
      description: `${formData.name} has been added successfully`,
    });
    
    // Reset form
    setFormData({
      name: "",
      price: "",
      unit: "kg",
      quantity: "",
      category: "",
      description: "",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    });
  };

  const imageOptions = [
    { url: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", name: "Default" },
    { url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", name: "Tomato" },
    { url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07", name: "Orange" },
    { url: "https://images.unsplash.com/photo-1500673922987-e212871fec22", name: "Vegetables" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details for your new farm product
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name*</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. Fresh Tomatoes"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price*</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                placeholder="e.g. 80"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
                placeholder="e.g. kg"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Stock Quantity*</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                placeholder="e.g. 50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="e.g. Vegetables"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Brief description of your product"
            />
          </div>
          <div className="space-y-2">
            <Label>Product Image</Label>
            <div className="grid grid-cols-2 gap-2">
              {imageOptions.map((img) => (
                <div 
                  key={img.url} 
                  className={`border rounded-md overflow-hidden cursor-pointer ${formData.image === img.url ? 'ring-2 ring-agro-primary' : ''}`}
                  onClick={() => setFormData({ ...formData, image: img.url })}
                >
                  <img 
                    src={img.url} 
                    alt={img.name} 
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-1 text-xs text-center">{img.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-agro-primary hover:bg-agro-dark">
              Add Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
