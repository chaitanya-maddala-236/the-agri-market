
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileText, Headphones, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import FarmerInstructions from "./FarmerInstructions";
import FarmerManual from "./FarmerManual";

interface QuickHelpProps {
  onOpenVoiceAssistant: () => void;
}

export default function QuickHelp({ onOpenVoiceAssistant }: QuickHelpProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const helpTopics = [
    {
      id: 'products',
      title: t('quickHelp.products.title') || 'Products',
      description: t('quickHelp.products.description') || 'Learn how to add, edit, and manage your products',
      links: [
        { 
          text: t('quickHelp.products.add') || 'How to add products', 
          action: () => setIsOpen(false)
        },
        { 
          text: t('quickHelp.products.delete') || 'How to delete products', 
          action: () => setIsOpen(false)
        },
      ]
    },
    {
      id: 'orders',
      title: t('quickHelp.orders.title') || 'Orders',
      description: t('quickHelp.orders.description') || 'Manage and track customer orders',
      links: [
        { 
          text: t('quickHelp.orders.manage') || 'Managing orders', 
          action: () => setIsOpen(false)
        },
        { 
          text: t('quickHelp.orders.payment') || 'Payment status', 
          action: () => setIsOpen(false)
        },
      ]
    }
  ];
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            className="h-14 w-14 rounded-full bg-agro-primary hover:bg-agro-dark shadow-lg"
            aria-label={t('quickHelp.openHelp') || 'Open quick help'}
          >
            <FileText className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="end" className="w-80 p-0">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{t('quickHelp.title') || 'Quick Help'}</CardTitle>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0" 
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                {t('quickHelp.description') || 'What do you need help with?'}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {helpTopics.map((topic) => (
                <div key={topic.id} className="space-y-2">
                  <h3 className="font-medium">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                  <div className="space-y-1">
                    {topic.links.map((link, i) => (
                      <Button 
                        key={i} 
                        variant="link" 
                        className="p-0 h-auto text-sm text-agro-primary justify-start"
                        onClick={link.action}
                      >
                        {link.text}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-2 pt-0">
              <div className="flex gap-2">
                <Button 
                  onClick={onOpenVoiceAssistant} 
                  className="flex-1 gap-2 bg-agro-primary hover:bg-agro-dark"
                >
                  <Headphones className="h-4 w-4" />
                  {t('quickHelp.voiceAssistant') || 'Voice Assistant'}
                </Button>
              </div>
              <div className="flex gap-2">
                <FarmerInstructions />
                <FarmerManual />
              </div>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
