
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";

export default function CartPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems] = useState([
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: 40,
      quantity: 2,
      farmer: "Rajesh Kumar",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500"
    },
    {
      id: 2,
      name: "Organic Potatoes",
      price: 30,
      quantity: 3,
      farmer: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500"
    }
  ]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Button onClick={() => navigate("/products")}>Browse Products</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">Farmer: {item.farmer}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-agro-primary font-semibold">₹{item.price} per kg</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹50</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{total + 50}</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleCheckout} className="w-full">
                  Proceed to Checkout
                </Button>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
