
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, acceptTerms: checked }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        variant: "destructive",
        title: "Terms not accepted",
        description: "Please accept the terms and conditions to register.",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Registration successful",
        description: "Your customer account has been created!",
      });
      // In a real app, this would create the user in the database
      navigate("/customer/login");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Register as a Customer</h1>
            <p className="text-gray-600 mt-2">Create your account to start shopping fresh produce</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Your Location
                </label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="acceptTerms" 
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleCheckboxChange(!!checked)}
                  required
                />
                <label htmlFor="acceptTerms" className="text-sm leading-none">
                  I agree to the <Link to="/terms" className="text-agro-primary hover:underline">Terms of Service</Link> and{" "}
                  <Link to="/privacy" className="text-agro-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <Button type="submit" className="w-full bg-agro-primary hover:bg-agro-dark" disabled={loading}>
                {loading ? "Registering..." : "Create Customer Account"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/customer/login" className="text-agro-primary hover:underline font-medium">
                Login here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerRegister;
