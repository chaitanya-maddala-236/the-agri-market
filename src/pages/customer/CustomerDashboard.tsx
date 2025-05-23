
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShoppingBag, Heart, User, MapPin, Clock } from "lucide-react";

const CustomerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("agroConnect_user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.type === "customer") {
        setUser(parsedUser);
      } else {
        // Redirect if not a customer
        navigate("/customer/login");
      }
    } else {
      // Redirect to login if no user data
      navigate("/customer/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("agroConnect_user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar isLoggedIn={true} userType="customer" />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Manage your orders and discover fresh, local produce
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Quick Stats */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-agro-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Addresses</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center"
                      alt="Tomatoes"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">Fresh Tomatoes</p>
                      <p className="text-sm text-gray-600">From Rajesh Kumar</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹120</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Delivered
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src="https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=64&h=64&fit=crop&crop=center"
                      alt="Carrots"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">Organic Carrots</p>
                      <p className="text-sm text-gray-600">From Sunita Verma</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹80</p>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      In Transit
                    </span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Orders
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="ghost"
                onClick={() => navigate("/products")}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Products
              </Button>
              
              <Button 
                className="w-full justify-start" 
                variant="ghost"
                onClick={() => navigate("/cart")}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Cart
              </Button>
              
              <Button 
                className="w-full justify-start" 
                variant="ghost"
              >
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              
              <Button 
                className="w-full justify-start" 
                variant="ghost"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Manage Addresses
              </Button>
              
              <Button 
                className="w-full justify-start text-red-600 hover:text-red-700" 
                variant="ghost"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
