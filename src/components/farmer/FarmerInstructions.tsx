
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Check, CreditCard, FileText, Trash2, Upload } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FarmerInstructions() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const instructionSections = [
    {
      id: "products",
      title: t("instructions.products.title", "Product Management"),
      icon: <FileText className="h-5 w-5 text-agro-primary" />,
      items: [
        {
          id: "upload",
          title: t("instructions.products.upload.title", "How to Upload Products"),
          content: (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Upload className="h-4 w-4 text-agro-primary" />
                {t("instructions.products.upload.title", "How to Upload Products")}
              </h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>{t("instructions.products.upload.step1", "Click on the 'Add Product' button in the Products section.")}</li>
                <li>{t("instructions.products.upload.step2", "Fill in all the required product details (name, price, unit, quantity, category, description).")}</li>
                <li>{t("instructions.products.upload.step3", "Add a product image by providing a direct URL to the image.")}</li>
                <li>{t("instructions.products.upload.step4", "Click 'Add Product' to save and publish your product.")}</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-2">
                {t("instructions.products.upload.tip", "Tip: High-quality images and detailed descriptions can increase your product's visibility and sales.")}
              </p>
            </div>
          ),
        },
        {
          id: "edit",
          title: t("instructions.products.edit.title", "How to Edit Products"),
          content: (
            <div className="space-y-4">
              <h3 className="font-semibold">{t("instructions.products.edit.title", "How to Edit Products")}</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>{t("instructions.products.edit.step1", "Find the product you want to edit in your product list.")}</li>
                <li>{t("instructions.products.edit.step2", "Click the 'Edit' button (pencil icon) on the product card.")}</li>
                <li>{t("instructions.products.edit.step3", "Update the product details as needed.")}</li>
                <li>{t("instructions.products.edit.step4", "Click 'Save Changes' to update your product information.")}</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-2">
                {t("instructions.products.edit.tip", "Tip: Regularly update your product inventory to keep quantities accurate.")}
              </p>
            </div>
          ),
        },
        {
          id: "delete",
          title: t("instructions.products.delete.title", "How to Delete Products"),
          content: (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-red-500" />
                {t("instructions.products.delete.title", "How to Delete Products")}
              </h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>{t("instructions.products.delete.step1", "Find the product you want to remove in your product list.")}</li>
                <li>{t("instructions.products.delete.step2", "Click the 'Delete' button (trash icon) on the product card.")}</li>
                <li>{t("instructions.products.delete.step3", "Confirm the deletion when prompted.")}</li>
              </ol>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-md mt-4">
                <p className="text-sm text-amber-800">
                  <strong>{t("instructions.products.delete.warning", "Warning:")}</strong> {t("instructions.products.delete.warningText", "This action cannot be undone. Deleting a product will permanently remove it from your inventory.")}
                </p>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: "orders",
      title: t("instructions.orders.title", "Order Management"),
      icon: <CreditCard className="h-5 w-5 text-agro-primary" />,
      items: [
        {
          id: "view",
          title: t("instructions.orders.view.title", "Viewing Orders"),
          content: (
            <div className="space-y-4">
              <h3 className="font-semibold">{t("instructions.orders.view.title", "Viewing Orders")}</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>{t("instructions.orders.view.step1", "Navigate to the 'Orders' tab in your dashboard.")}</li>
                <li>{t("instructions.orders.view.step2", "View all incoming orders with customer details.")}</li>
                <li>{t("instructions.orders.view.step3", "Click on any order to view its complete details.")}</li>
              </ol>
            </div>
          ),
        },
        {
          id: "status",
          title: t("instructions.orders.status.title", "Order Status Management"),
          content: (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                {t("instructions.orders.status.title", "Order Status Management")}
              </h3>
              <div className="space-y-3">
                <p>{t("instructions.orders.status.description", "You can update the status of any order to reflect its current state:")}</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                    <span className="font-medium">{t("instructions.orders.status.pending", "Pending")}:</span> 
                    <span className="text-sm">{t("instructions.orders.status.pendingDesc", "Order received but not yet processed")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    <span className="font-medium">{t("instructions.orders.status.processing", "Processing")}:</span> 
                    <span className="text-sm">{t("instructions.orders.status.processingDesc", "Order is being prepared")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                    <span className="font-medium">{t("instructions.orders.status.shipped", "Shipped")}:</span> 
                    <span className="text-sm">{t("instructions.orders.status.shippedDesc", "Order has been shipped")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                    <span className="font-medium">{t("instructions.orders.status.delivered", "Delivered")}:</span> 
                    <span className="text-sm">{t("instructions.orders.status.deliveredDesc", "Order successfully delivered")}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-400"></span>
                    <span className="font-medium">{t("instructions.orders.status.cancelled", "Cancelled")}:</span> 
                    <span className="text-sm">{t("instructions.orders.status.cancelledDesc", "Order has been cancelled")}</span>
                  </li>
                </ul>
              </div>
              <ol className="list-decimal pl-5 space-y-2 mt-4">
                <li>{t("instructions.orders.status.step1", "Find the order you want to update.")}</li>
                <li>{t("instructions.orders.status.step2", "Click the 'Update Status' button.")}</li>
                <li>{t("instructions.orders.status.step3", "Select the new status from the dropdown.")}</li>
                <li>{t("instructions.orders.status.step4", "Confirm the status change.")}</li>
              </ol>
            </div>
          ),
        },
      ],
    },
    {
      id: "assistance",
      title: t("instructions.assistance.title", "Voice Assistant"),
      icon: <FileText className="h-5 w-5 text-agro-primary" />,
      items: [
        {
          id: "voice",
          title: t("instructions.assistance.voice.title", "Using the Voice Assistant"),
          content: (
            <div className="space-y-4">
              <h3 className="font-semibold">{t("instructions.assistance.voice.title", "Using the Voice Assistant")}</h3>
              <p>{t("instructions.assistance.voice.description", "The Voice Assistant can help you navigate the platform using voice commands:")}</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>{t("instructions.assistance.voice.step1", "Click on the microphone icon in your dashboard.")}</li>
                <li>{t("instructions.assistance.voice.step2", "Allow microphone access if prompted.")}</li>
                <li>{t("instructions.assistance.voice.step3", "Speak your question or command clearly.")}</li>
                <li>{t("instructions.assistance.voice.step4", "The assistant will respond with voice and text guidance.")}</li>
              </ol>
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-md mt-4">
                <p className="text-sm text-blue-800 font-medium">{t("instructions.assistance.voice.examples", "Example commands:")}</p>
                <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1 mt-2">
                  <li>{t("instructions.assistance.voice.example1", "\"How do I upload a product?\"")}</li>
                  <li>{t("instructions.assistance.voice.example2", "\"Show me step by step how to add a product\"")}</li>
                  <li>{t("instructions.assistance.voice.example3", "\"How do I edit product details?\"")}</li>
                  <li>{t("instructions.assistance.voice.example4", "\"Next step\" (when following guides)")}</li>
                </ul>
              </div>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          {t("instructions.helpGuide", "Help Guide")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-5 w-5 text-agro-primary" />
            {t("instructions.title", "Farmer's Guide")}
          </DialogTitle>
          <DialogDescription>
            {t("instructions.description", "Learn how to manage your products, orders, and get the most out of the platform.")}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="w-full justify-start mb-4 overflow-x-auto">
              {instructionSections.map((section) => (
                <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {instructionSections.map((section) => (
              <TabsContent key={section.id} value={section.id}>
                <div className="space-y-6">
                  <Accordion type="single" collapsible className="w-full">
                    {section.items.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-left">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2 px-1">
                          {item.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
