
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-agro-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AgroConnect</h3>
            <p className="text-sm text-gray-300">
              Directly connecting farmers with customers for fresh, local produce without middlemen.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Farmers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/farmer/register" className="text-gray-300 hover:text-white transition-colors">Join as Farmer</Link></li>
              <li><Link to="/farmer/login" className="text-gray-300 hover:text-white transition-colors">Farmer Login</Link></li>
              <li><Link to="/farmer/resources" className="text-gray-300 hover:text-white transition-colors">Farming Resources</Link></li>
              <li><Link to="/farmer/success-stories" className="text-gray-300 hover:text-white transition-colors">Success Stories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Customers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/customer/register" className="text-gray-300 hover:text-white transition-colors">Create Account</Link></li>
              <li><Link to="/customer/login" className="text-gray-300 hover:text-white transition-colors">Customer Login</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Browse Products</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact & Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} AgroConnect. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <div className="flex space-x-2">
              <select className="bg-agro-dark text-gray-300 border border-gray-700 rounded px-2 py-1 text-xs">
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
