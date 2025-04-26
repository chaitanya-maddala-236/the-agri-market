
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { customers } from "@/data/mockData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eye, EyeOff } from "lucide-react";

const CustomerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const customer = customers.find(c => c.email === email && c.password === password);

      if (customer) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${customer.name}!`,
        });
        // In a real app, you would set authentication state
        localStorage.setItem("agroConnect_user", JSON.stringify({ 
          id: customer.id, 
          name: customer.name, 
          type: "customer" 
        }));
        navigate("/customer/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        });
      }
      setLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden">
          {/* Left: Image section */}
          <div className="md:w-1/2 bg-agro-primary relative hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&q=80" 
              alt="Customer shopping"
              className="w-full h-full object-cover opacity-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-agro-dark/60 to-transparent flex flex-col justify-center p-8">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
              <p className="text-white/90 text-lg">
                Access your account to shop fresh, locally-sourced produce directly from farmers.
              </p>
            </div>
          </div>
          
          {/* Right: Login form */}
          <div className="md:w-1/2 bg-white p-6 md:p-10">
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-2xl font-bold text-agro-dark">Customer Login</h2>
              <p className="text-gray-600 mt-2">Ready to shop fresh produce?</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Link to="/forgot-password" className="text-sm text-agro-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                    required
                  />
                  <button 
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember-me" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label
                  htmlFor="remember-me"
                  className="text-sm font-medium text-gray-700"
                >
                  Remember me
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-agro-primary hover:bg-agro-dark transition-all duration-300"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Demo credentials: priya@example.com / password123
                </p>
              </div>
            </form>

            <div className="mt-6 text-center border-t pt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/customer/register" className="text-agro-primary hover:underline font-medium">
                  Register as Customer
                </Link>
              </p>
              <p className="mt-4 text-gray-600">
                <Link to="/farmer/login" className="text-agro-secondary hover:underline">
                  Login as Farmer Instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerLogin;
