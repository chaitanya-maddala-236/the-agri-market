
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  User, 
  Search, 
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      });
    }
  };

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

          {/* Search Bar - Hide on mobile */}
          {!isMobile && (
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for fresh produce..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-agro-primary focus:ring focus:ring-agro-light focus:ring-opacity-50"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </form>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-4">
              <Link to="/products" className="text-gray-700 hover:text-agro-primary transition-colors">Products</Link>
              <Link to="/farmers" className="text-gray-700 hover:text-agro-primary transition-colors">Farmers</Link>
              <Link to="/blog" className="text-gray-700 hover:text-agro-primary transition-colors">Blog</Link>
              <Link to={getDashboardLink()} className="flex items-center text-gray-700 hover:text-agro-primary transition-colors">
                <User size={20} className="mr-1" />
                {isLoggedIn ? (userType === "farmer" ? "My Farm" : "My Account") : "Login"}
              </Link>
              {isLoggedIn && userType === "customer" && (
                <Link to="/cart" className="relative">
                  <ShoppingCart size={24} className="text-gray-700 hover:text-agro-primary transition-colors" />
                  {cartItemCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </Link>
              )}
            </nav>
          )}

          {/* Mobile Navigation Icon */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              <Link to="/cart" className="relative mr-2">
                <ShoppingCart size={24} className="text-gray-700" />
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
              <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Search Bar */}
        {isMobile && (
          <form onSubmit={handleSearch} className="mt-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for fresh produce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-agro-primary focus:ring focus:ring-agro-light focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </form>
        )}

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
