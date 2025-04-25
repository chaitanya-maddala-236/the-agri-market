
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order Successful!",
        description: "Thank you for your purchase. Your order has been confirmed.",
      });
      navigate("/products");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input required placeholder="Enter your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input required type="tel" placeholder="Enter your phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input required placeholder="Enter your delivery address" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pin Code</label>
                <Input required placeholder="Enter pin code" />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 border rounded">
                <input 
                  type="radio" 
                  name="payment" 
                  id="cod" 
                  defaultChecked 
                  className="mr-2"
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
              <p className="text-sm text-gray-600">
                More payment options coming soon!
              </p>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
