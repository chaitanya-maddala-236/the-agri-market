
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const UserTypeSelect = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Choose Your Role</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 hover:border-agro-primary transition-colors duration-300">
              <CardHeader className="bg-agro-light text-center">
                <h2 className="text-2xl font-bold text-agro-dark">For Farmers</h2>
              </CardHeader>
              <CardContent className="pt-6 pb-8">
                <div className="text-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                    alt="Farmer" 
                    className="mx-auto w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <p className="text-gray-600 mb-6">
                    Connect directly with customers, set your own prices, and sell your fresh produce without middlemen.
                  </p>
                  <ul className="text-left space-y-2 mb-8">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>List your farm products easily</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Get better prices than wholesale</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Manage orders & deliveries</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col space-y-3">
                  <Link to="/farmer/register" className="w-full">
                    <Button className="w-full bg-agro-primary hover:bg-agro-dark">
                      Register as Farmer
                    </Button>
                  </Link>
                  <Link to="/farmer/login" className="w-full">
                    <Button variant="outline" className="w-full border-agro-primary text-agro-primary hover:bg-agro-primary hover:text-white">
                      Already a Farmer? Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-agro-primary transition-colors duration-300">
              <CardHeader className="bg-agro-light text-center">
                <h2 className="text-2xl font-bold text-agro-dark">For Customers</h2>
              </CardHeader>
              <CardContent className="pt-6 pb-8">
                <div className="text-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                    alt="Customer" 
                    className="mx-auto w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <p className="text-gray-600 mb-6">
                    Get access to fresh, local produce directly from farmers. Better quality, better prices, better food.
                  </p>
                  <ul className="text-left space-y-2 mb-8">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Browse fresh local produce</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Know exactly where your food comes from</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Convenient delivery to your home</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col space-y-3">
                  <Link to="/customer/register" className="w-full">
                    <Button className="w-full bg-agro-primary hover:bg-agro-dark">
                      Register as Customer
                    </Button>
                  </Link>
                  <Link to="/customer/login" className="w-full">
                    <Button variant="outline" className="w-full border-agro-primary text-agro-primary hover:bg-agro-primary hover:text-white">
                      Already a Customer? Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserTypeSelect;
