
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  User, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  isLoggedIn?: boolean;
  userType?: 'farmer' | 'customer' | null;
  cartItemCount?: number;
}

export default function Navbar({ isLoggedIn = false, userType = null, cartItemCount = 0 }: NavbarProps) {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getDashboardLink = () => {
    if (!isLoggedIn) return "/login";
    return userType === "farmer" ? "/farmer/dashboard" : "/customer/dashboard";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-agro-primary font-bold text-2xl">Agro<span className="text-agro-secondary">Connect</span></span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-700 hover:text-agro-primary transition-colors">Products</Link>
            <Link to="/farmers" className="text-gray-700 hover:text-agro-primary transition-colors">Farmers</Link>
            <Link to="/blog" className="text-gray-700 hover:text-agro-primary transition-colors">Blog</Link>
            
            {/* User Account Link */}
            <Link to={getDashboardLink()} className="flex items-center text-gray-700 hover:text-agro-primary transition-colors">
              <User size={20} className="mr-1" />
              {isLoggedIn ? (userType === "farmer" ? "My Farm" : "My Account") : "Login"}
            </Link>
            
            {/* Professional Cart Icon */}
            <Link to="/cart" className="relative group">
              <div className="flex items-center">
                <ShoppingCart 
                  size={24} 
                  className="text-gray-700 hover:text-agro-primary transition-colors group-hover:scale-110"
                />
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </div>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <nav className="mt-3 pb-2 animate-fade-in">
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="block px-2 py-2 text-gray-700 hover:bg-agro-light rounded" onClick={toggleMobileMenu}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/farmers" className="block px-2 py-2 text-gray-700 hover:bg-agro-light rounded" onClick={toggleMobileMenu}>
                  Farmers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="block px-2 py-2 text-gray-700 hover:bg-agro-light rounded" onClick={toggleMobileMenu}>
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to={getDashboardLink()}
                  className="block px-2 py-2 text-gray-700 hover:bg-agro-light rounded"
                  onClick={toggleMobileMenu}
                >
                  {isLoggedIn ? (userType === "farmer" ? "My Farm" : "My Account") : "Login"}
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

