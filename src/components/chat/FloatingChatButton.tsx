
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { farmers } from "@/data/farmers";
import FarmerChat from "./FarmerChat";

interface FloatingChatButtonProps {
  products: any[];
}

export default function FloatingChatButton({ products }: FloatingChatButtonProps) {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [farmerName, setFarmerName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();

  const handleOpenChat = () => {
    setIsSelectModalOpen(true);
  };

  const handleStartChat = () => {
    if (!farmerName.trim()) {
      toast({
        title: "Enter farmer name",
        description: "Please enter the farmer's name to start a chat",
        variant: "destructive"
      });
      return;
    }

    // Find farmer by name (case insensitive)
    const farmer = farmers.find(f => 
      f.name.toLowerCase().includes(farmerName.toLowerCase())
    );

    if (!farmer) {
      toast({
        title: "Farmer not found",
        description: "No farmer found with that name. Please check the spelling.",
        variant: "destructive"
      });
      return;
    }

    // Find a product from this farmer
    const farmerProduct = products.find(p => p.farmer?.id === farmer.id);
    
    if (!farmerProduct) {
      toast({
        title: "No products available",
        description: `${farmer.name} doesn't have any products listed currently.`,
        variant: "destructive"
      });
      return;
    }

    setSelectedFarmer(farmer);
    setSelectedProduct(farmerProduct);
    setIsSelectModalOpen(false);
    setIsChatOpen(true);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleOpenChat}
          className="h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
          aria-label="Chat with farmer"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Farmer Selection Modal */}
      <Dialog open={isSelectModalOpen} onOpenChange={setIsSelectModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Chat with a Farmer</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Enter Farmer Name:
              </label>
              <Input
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="e.g., Rajesh Kumar, Priya Singh..."
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Quantity (kg):
              </label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-full"
              />
            </div>

            <div className="text-xs text-gray-600">
              <p><strong>Available farmers:</strong></p>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {farmers.slice(0, 6).map(f => (
                  <span key={f.id} className="truncate">{f.name}</span>
                ))}
              </div>
            </div>

            <Button onClick={handleStartChat} className="w-full">
              Start Chat
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Modal */}
      {selectedProduct && selectedFarmer && (
        <FarmerChat
          isOpen={isChatOpen}
          onClose={() => {
            setIsChatOpen(false);
            setFarmerName('');
            setSelectedProduct(null);
            setSelectedFarmer(null);
          }}
          product={selectedProduct}
          farmer={selectedFarmer}
          quantity={quantity}
          originalPrice={selectedProduct.price}
        />
      )}
    </>
  );
}
