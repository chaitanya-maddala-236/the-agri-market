
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { farmers } from "@/data/mockData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const FarmerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const farmer = farmers.find(f => f.email === email && f.password === password);

      if (farmer) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${farmer.name}!`,
        });
        // In a real app, you would set authentication state
        localStorage.setItem("agroConnect_user", JSON.stringify({ 
          id: farmer.id, 
          name: farmer.name, 
          type: "farmer" 
        }));
        navigate("/farmer/dashboard");
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Farmer Login</h1>
            <p className="text-gray-600 mt-2">Access your farm dashboard</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-sm text-agro-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember-me" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>

                <Button type="submit" className="w-full bg-agro-primary hover:bg-agro-dark" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Demo credentials: rajesh@example.com / password123
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/farmer/register" className="text-agro-primary hover:underline font-medium">
                Register as Farmer
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default FarmerLogin;
