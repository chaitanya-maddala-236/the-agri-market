
import React from 'react';
import { Button } from "@/components/ui/button";

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
    title: "Step 1: Navigate to Add Product",
    description: "Click on the 'Add Product' button at the top right of your dashboard"
  },
  {
    title: "Step 2: Fill Basic Product Details",
    description: "Enter your product name, price per unit, and select the appropriate unit (kg, piece, etc.)"
  },
  {
    title: "Step 3: Add Stock Information",
    description: "Enter the quantity available and select the product category"
  },
  {
    title: "Step 4: Add Description",
    description: "Write a clear, detailed description of your product including quality, freshness, and other relevant details"
  },
  {
    title: "Step 5: Add Product Image",
    description: "Add an image URL for your product - high quality images increase sales"
  },
  {
    title: "Step 6: Submit Product",
    description: "Review all information and click the 'Add Product' button to list your product"
  }
];

export default function ProductUploadSteps({ 
  currentStep, 
  setCurrentStep, 
  steps,
  onStepChange 
}: ProductUploadStepsProps) {
  
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
    <div className="flex items-center justify-between bg-agro-light/30 p-2 rounded-md">
      <span className="text-sm font-medium">Step {currentStep} of {steps.length}</span>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          variant="outline"
          onClick={handlePrevStep}
          disabled={currentStep <= 1}
        >
          Previous
        </Button>
        <Button 
          size="sm" 
          onClick={handleNextStep}
          disabled={currentStep >= steps.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
