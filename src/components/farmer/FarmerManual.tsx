
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CreditCard, Upload, Trash2, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FarmerManual() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const manualSections = [
    {
      id: "gettingStarted",
      title: t("manual.gettingStarted.title", "Getting Started"),
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("manual.gettingStarted.welcome.title", "Welcome to AgriConnect!")}</h3>
            <p>{t("manual.gettingStarted.welcome.description", "AgriConnect is a platform designed to help farmers sell their products directly to consumers, eliminating middlemen and ensuring better profits.")}</p>
          </div>
          
          <div>
            <h4 className="font-medium">{t("manual.gettingStarted.dashboard.title", "Your Dashboard")}</h4>
            <p className="text-sm text-gray-700 mb-4">{t("manual.gettingStarted.dashboard.description", "The dashboard is your central hub for managing all aspects of your farm business.")}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">{t("manual.gettingStarted.dashboard.sections.products", "Products Section")}</h5>
                <p className="text-sm">{t("manual.gettingStarted.dashboard.sections.productsDesc", "Where you add, edit, and manage all your products.")}</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">{t("manual.gettingStarted.dashboard.sections.orders", "Orders Section")}</h5>
                <p className="text-sm">{t("manual.gettingStarted.dashboard.sections.ordersDesc", "View and manage customer orders for your products.")}</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">{t("manual.gettingStarted.dashboard.sections.analytics", "Analytics")}</h5>
                <p className="text-sm">{t("manual.gettingStarted.dashboard.sections.analyticsDesc", "Track sales performance and customer trends.")}</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h5 className="font-medium mb-2">{t("manual.gettingStarted.dashboard.sections.profile", "Profile")}</h5>
                <p className="text-sm">{t("manual.gettingStarted.dashboard.sections.profileDesc", "Manage your farm information and account settings.")}</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "products",
      title: t("manual.products.title", "Product Management"),
      icon: <Upload className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("manual.products.management.title", "Managing Your Products")}</h3>
            <p>{t("manual.products.management.description", "Learn how to effectively manage your agricultural products on the platform.")}</p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-medium flex items-center gap-2 text-blue-700">
                <Upload className="h-4 w-4" />
                {t("manual.products.addingProducts.title", "Adding New Products")}
              </h4>
              <ol className="list-decimal ml-5 mt-2 space-y-1 text-blue-800">
                <li>{t("manual.products.addingProducts.step1", "Click the 'Add Product' button in your dashboard.")}</li>
                <li>{t("manual.products.addingProducts.step2", "Fill in all required details about your product.")}</li>
                <li>{t("manual.products.addingProducts.step3", "Add a clear, high-quality image of your product.")}</li>
                <li>{t("manual.products.addingProducts.step4", "Set an appropriate price and quantity available.")}</li>
                <li>{t("manual.products.addingProducts.step5", "Click 'Save' to publish your product.")}</li>
              </ol>
              <p className="text-xs text-blue-700 mt-2">{t("manual.products.addingProducts.tip", "Tip: Products with complete information and quality images sell better!")}</p>
            </div>
            
            <div>
              <h4 className="font-medium">{t("manual.products.editing.title", "Editing Products")}</h4>
              <p className="text-sm text-gray-700 mb-2">{t("manual.products.editing.description", "You can update your product information at any time:")}</p>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>{t("manual.products.editing.step1", "Find the product in your products list.")}</li>
                <li>{t("manual.products.editing.step2", "Click the 'Edit' button (pencil icon).")}</li>
                <li>{t("manual.products.editing.step3", "Update any information as needed.")}</li>
                <li>{t("manual.products.editing.step4", "Click 'Save Changes' to update.")}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-red-500" />
                {t("manual.products.deleting.title", "Removing Products")}
              </h4>
              <p className="text-sm text-gray-700 mb-2">{t("manual.products.deleting.description", "To remove a product from your inventory:")}</p>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>{t("manual.products.deleting.step1", "Locate the product you wish to remove.")}</li>
                <li>{t("manual.products.deleting.step2", "Click the 'Delete' button (trash icon).")}</li>
                <li>{t("manual.products.deleting.step3", "Confirm the deletion when prompted.")}</li>
              </ul>
              <div className="bg-red-50 border border-red-100 p-3 rounded mt-2">
                <p className="text-xs text-red-700">
                  <strong>{t("manual.products.deleting.warning", "Warning:")}</strong> {t("manual.products.deleting.warningText", "Deleting a product is permanent and cannot be undone. Any active orders for this product will still need to be fulfilled.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "orders",
      title: t("manual.orders.title", "Order Management"),
      icon: <CreditCard className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("manual.orders.management.title", "Managing Customer Orders")}</h3>
            <p>{t("manual.orders.management.description", "Learn how to view, process, and manage orders from customers.")}</p>
          </div>
          
          <div>
            <h4 className="font-medium">{t("manual.orders.viewing.title", "Viewing Orders")}</h4>
            <p className="text-sm text-gray-700 mb-2">{t("manual.orders.viewing.description", "All customer orders appear in your Orders section:")}</p>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>{t("manual.orders.viewing.orderId", "Order ID: Unique identifier for each order")}</li>
              <li>{t("manual.orders.viewing.customer", "Customer: Who placed the order")}</li>
              <li>{t("manual.orders.viewing.products", "Products: Items purchased with quantities")}</li>
              <li>{t("manual.orders.viewing.total", "Total: Order value")}</li>
              <li>{t("manual.orders.viewing.status", "Status: Current state of the order")}</li>
            </ul>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <h4 className="font-medium flex items-center gap-2 text-green-700">
              <Check className="h-4 w-4" />
              {t("manual.orders.status.title", "Order Status Management")}
            </h4>
            <p className="text-sm text-green-800 mb-2">{t("manual.orders.status.description", "You can update the status of any order as it progresses:")}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="bg-white rounded p-3 shadow-sm border">
                <h5 className="text-amber-500 font-medium">{t("manual.orders.status.pending", "Pending")}</h5>
                <p className="text-xs">{t("manual.orders.status.pendingDesc", "New order received but not yet processed")}</p>
              </div>
              
              <div className="bg-white rounded p-3 shadow-sm border">
                <h5 className="text-blue-500 font-medium">{t("manual.orders.status.processing", "Processing")}</h5>
                <p className="text-xs">{t("manual.orders.status.processingDesc", "Order accepted and being prepared")}</p>
              </div>
              
              <div className="bg-white rounded p-3 shadow-sm border">
                <h5 className="text-purple-500 font-medium">{t("manual.orders.status.shipped", "Shipped")}</h5>
                <p className="text-xs">{t("manual.orders.status.shippedDesc", "Order has been dispatched for delivery")}</p>
              </div>
              
              <div className="bg-white rounded p-3 shadow-sm border">
                <h5 className="text-green-500 font-medium">{t("manual.orders.status.delivered", "Delivered")}</h5>
                <p className="text-xs">{t("manual.orders.status.deliveredDesc", "Order successfully delivered to customer")}</p>
              </div>
            </div>
            
            <p className="text-xs text-green-700 mt-4">{t("manual.orders.status.tip", "Tip: Keeping order statuses up-to-date builds trust with your customers and reduces inquiries about order progress.")}</p>
          </div>
          
          <div>
            <h4 className="font-medium">{t("manual.orders.payment.title", "Payment Processing")}</h4>
            <p className="text-sm text-gray-700">{t("manual.orders.payment.description", "Payments are automatically processed through our secure payment system. Once an order is marked as 'Delivered', the payment will be added to your account balance after a 24-hour holding period.")}</p>
          </div>
        </div>
      ),
    },
    {
      id: "assistance",
      title: t("manual.assistance.title", "Getting Help"),
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{t("manual.assistance.help.title", "Help Resources")}</h3>
            <p>{t("manual.assistance.help.description", "Multiple resources are available when you need assistance:")}</p>
          </div>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{t("manual.assistance.voiceAssistant.title", "Voice Assistant")}</h4>
              <p className="text-sm">{t("manual.assistance.voiceAssistant.description", "Our AI voice assistant can answer common questions and guide you through processes.")}</p>
              <p className="text-sm mt-2">{t("manual.assistance.voiceAssistant.howTo", "To use: Click the microphone button in your dashboard and ask your question.")}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{t("manual.assistance.helpGuide.title", "Help Guide")}</h4>
              <p className="text-sm">{t("manual.assistance.helpGuide.description", "The Help Guide button provides step-by-step instructions for common tasks.")}</p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">{t("manual.assistance.support.title", "Customer Support")}</h4>
              <p className="text-sm">{t("manual.assistance.support.description", "For issues that can't be resolved through the assistant or guide, please contact our support team:")}</p>
              <ul className="list-disc ml-5 mt-2 text-sm">
                <li>Email: support@agriconnect.com</li>
                <li>Phone: +1-800-FARM-HELP</li>
                <li>Hours: Monday-Friday, 8am-8pm</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800">{t("manual.assistance.community.title", "Farmer Community")}</h4>
            <p className="text-sm text-blue-700">{t("manual.assistance.community.description", "Connect with other farmers using AgriConnect to share tips, experiences, and best practices in our community forum.")}</p>
            <div className="mt-2">
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                {t("manual.assistance.community.joinButton", "Join Community")}
              </Button>
            </div>
          </div>
        </div>
      ),
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          {t("manual.title", "User Manual")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-agro-primary" />
            {t("manual.title", "Farmer's Manual")}
          </DialogTitle>
          <DialogDescription>
            {t("manual.description", "Comprehensive guide to help you get the most out of the platform.")}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="gettingStarted" className="w-full">
            <TabsList className="w-full mb-4 overflow-x-auto flex">
              {manualSections.map((section) => (
                <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {manualSections.map((section) => (
              <TabsContent key={section.id} value={section.id} className="p-2">
                {section.content}
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="border-t mt-8 pt-4 text-center">
            <p className="text-sm text-gray-500">
              {t("manual.version", "AgriConnect Farmer Manual v1.2")}
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
