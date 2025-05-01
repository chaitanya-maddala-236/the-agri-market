
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductUploadStepsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: Array<{
    title: string;
    description: string;
  }>;
  onStepChange: (step: number) => void;
}

export const productUploadStepsData = [
  {
    titleKey: "productUpload.step1.title",
    descriptionKey: "productUpload.step1.description"
  },
  {
    titleKey: "productUpload.step2.title",
    descriptionKey: "productUpload.step2.description"
  },
  {
    titleKey: "productUpload.step3.title",
    descriptionKey: "productUpload.step3.description"
  },
  {
    titleKey: "productUpload.step4.title",
    descriptionKey: "productUpload.step4.description"
  },
  {
    titleKey: "productUpload.step5.title",
    descriptionKey: "productUpload.step5.description"
  },
  {
    titleKey: "productUpload.step6.title",
    descriptionKey: "productUpload.step6.description"
  }
];

export default function ProductUploadSteps({ 
  currentStep, 
  setCurrentStep, 
  steps,
  onStepChange 
}: ProductUploadStepsProps) {
  const { t } = useLanguage();
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange(prevStep);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange(nextStep);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="mb-4">
          <h3 className="font-semibold text-lg">{steps[currentStep - 1].title}</h3>
          <p className="text-gray-600">{steps[currentStep - 1].description}</p>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-agro-primary h-2.5 rounded-full" 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {t('productUpload.step')} {currentStep} {t('productUpload.of')} {steps.length}
          </span>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep <= 1}
            >
              {t('productUpload.previous')}
            </Button>
            <Button 
              size="sm" 
              onClick={handleNextStep}
              disabled={currentStep >= steps.length}
            >
              {t('productUpload.next')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
