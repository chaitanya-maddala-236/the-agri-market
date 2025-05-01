
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/language/LanguageSelector";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-agro-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.title')}</h3>
            <p className="text-sm text-gray-300">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.forFarmers')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/farmer/register" className="text-gray-300 hover:text-white transition-colors">{t('footer.joinAsFarmer')}</Link></li>
              <li><Link to="/farmer/login" className="text-gray-300 hover:text-white transition-colors">{t('footer.farmerLogin')}</Link></li>
              <li><Link to="/farmer/resources" className="text-gray-300 hover:text-white transition-colors">{t('footer.farmingResources')}</Link></li>
              <li><Link to="/farmer/success-stories" className="text-gray-300 hover:text-white transition-colors">{t('footer.successStories')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.forCustomers')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/customer/register" className="text-gray-300 hover:text-white transition-colors">{t('footer.createAccount')}</Link></li>
              <li><Link to="/customer/login" className="text-gray-300 hover:text-white transition-colors">{t('footer.customerLogin')}</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">{t('footer.browseProducts')}</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">{t('footer.howItWorks')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">{t('footer.contactUs')}</Link></li>
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">{t('footer.helpCenter')}</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">{t('footer.faqs')}</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">{t('footer.terms')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>{t('footer.copyright')}</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-white transition-colors">{t('footer.termsOfService')}</Link>
            <div className="flex space-x-2 items-center">
              <span className="mr-2">{t('footer.language')}:</span>
              <LanguageSelector className="text-gray-300 border-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
