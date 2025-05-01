
import { useState } from "react";
import { Mic, MicOff, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ProductUploadSteps, { productUploadStepsData } from "./ProductUploadSteps";

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the SpeechRecognition type to avoid TypeScript errors
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
  error: any;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

// Define the SpeechRecognition constructor
interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
}

// Add the global speech recognition interfaces
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { toast } = useToast();

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key to continue",
        variant: "destructive",
      });
      return;
    }
    
    setIsConfigured(true);
    toast({
      title: "Voice Assistant Configured",
      description: "You can now start asking questions about selling products",
    });
  };

  const toggleListening = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        toast({
          title: "Not Supported",
          description: "Speech recognition is not supported in your browser",
          variant: "destructive",
        });
        setIsListening(false);
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      
      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        processQuery(speechResult);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast({
          title: "Error",
          description: `Speech recognition error: ${event.error}`,
          variant: "destructive",
        });
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setIsListening(false);
      toast({
        title: "Error",
        description: "Failed to start speech recognition",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const processQuery = (query: string) => {
    // Generate response based on common farmer questions
    let assistantResponse = "";
    
    const lowercaseQuery = query.toLowerCase();
    
    // Handle step-by-step upload instructions
    if (lowercaseQuery.includes("step by step") || lowercaseQuery.includes("how to upload") || lowercaseQuery.includes("show me steps")) {
      if (currentStep === 0) {
        setCurrentStep(1);
        assistantResponse = `Let me guide you through uploading a product step by step.\n\n${productUploadStepsData[0].title}\n${productUploadStepsData[0].description}\n\nSay "next step" to continue.`;
      } else {
        setCurrentStep(1);
        assistantResponse = `Let's restart the step-by-step guide.\n\n${productUploadStepsData[0].title}\n${productUploadStepsData[0].description}\n\nSay "next step" to continue.`;
      }
    }
    else if (lowercaseQuery.includes("next step") || lowercaseQuery.includes("continue")) {
      if (currentStep > 0 && currentStep < productUploadStepsData.length) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        
        if (nextStep <= productUploadStepsData.length) {
          assistantResponse = `${productUploadStepsData[nextStep-1].title}\n${productUploadStepsData[nextStep-1].description}`;
          
          if (nextStep < productUploadStepsData.length) {
            assistantResponse += "\n\nSay \"next step\" to continue.";
          } else {
            assistantResponse += "\n\nYou've completed all steps! Your product should now be listed.";
          }
        }
      } else {
        assistantResponse = "To start the step-by-step guide, please say 'How to upload products'";
      }
    }
    else if (lowercaseQuery.includes("previous step") || lowercaseQuery.includes("go back")) {
      if (currentStep > 1) {
        const prevStep = currentStep - 1;
        setCurrentStep(prevStep);
        assistantResponse = `${productUploadStepsData[prevStep-1].title}\n${productUploadStepsData[prevStep-1].description}\n\nSay "next step" to continue or "previous step" to go back.`;
      } else {
        assistantResponse = "You're already at the first step. Say 'next step' to continue.";
      }
    }
    else if (lowercaseQuery.includes("upload") || lowercaseQuery.includes("add product")) {
      assistantResponse = 
        "To upload a product, follow these steps:\n" +
        "1. Click on the 'Add Product' button at the top right of your dashboard\n" +
        "2. Fill in the product name, price, quantity and category\n" +
        "3. Add a description and an image URL for your product\n" +
        "4. Click Save to add your product to your inventory\n\n" +
        "For a step-by-step guide, say 'show me steps'";
    } 
    else if (lowercaseQuery.includes("sell") || lowercaseQuery.includes("selling")) {
      assistantResponse = 
        "To increase your sales:\n" +
        "1. Ensure your product descriptions are clear and detailed\n" +
        "2. Upload high-quality images of your products\n" +
        "3. Keep your inventory updated with current stock levels\n" +
        "4. Respond quickly to customer inquiries and reviews\n" +
        "5. Consider seasonal promotions for your products";
    }
    else if (lowercaseQuery.includes("price") || lowercaseQuery.includes("pricing")) {
      assistantResponse = 
        "Tips for pricing your products:\n" +
        "1. Research market rates for similar products\n" +
        "2. Calculate your production costs including labor and materials\n" +
        "3. Consider adding a reasonable profit margin (typically 30-50%)\n" +
        "4. Adjust prices based on product quality and organic status\n" +
        "5. Monitor sales and be prepared to adjust pricing as needed";
    }
    else if (lowercaseQuery.includes("edit") || lowercaseQuery.includes("update product")) {
      assistantResponse = 
        "To edit a product:\n" +
        "1. Find the product in your product list\n" +
        "2. Click the Edit (pencil) icon next to the product\n" +
        "3. Update the information as needed\n" +
        "4. Click Save to apply your changes";
    }
    else if (lowercaseQuery.includes("delete") || lowercaseQuery.includes("remove product")) {
      assistantResponse = 
        "To delete a product:\n" +
        "1. Find the product in your product list\n" +
        "2. Click the Delete (trash) icon next to the product\n" +
        "3. Confirm deletion when prompted";
    }
    else {
      assistantResponse = 
        "I'm here to help with managing your products. You can ask me:\n" +
        "- How to upload a new product step by step\n" +
        "- Tips for selling your products\n" +
        "- How to price your products\n" +
        "- How to edit or delete products";
    }
    
    setResponse(assistantResponse);
    speakResponse(assistantResponse);
  };

  const handleStepChange = (step: number) => {
    let assistantResponse = "";
    
    if (step > 0 && step <= productUploadStepsData.length) {
      assistantResponse = `${productUploadStepsData[step-1].title}\n${productUploadStepsData[step-1].description}`;
      
      if (step < productUploadStepsData.length) {
        assistantResponse += "\n\nSay \"next step\" to continue.";
      } else {
        assistantResponse += "\n\nYou've completed all steps! Your product should now be listed.";
      }
      
      setResponse(assistantResponse);
      speakResponse(assistantResponse);
    }
  };

  const speakResponse = (text: string) => {
    // Use browser's speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Not Supported",
        description: "Speech synthesis is not supported in your browser",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isListening ? (
              <Mic className="h-5 w-5 text-red-500 animate-pulse" />
            ) : (
              <Headphones className="h-5 w-5 text-green-500" />
            )}
            Farmer Voice Assistant
          </DialogTitle>
          <DialogDescription>
            Get help with uploading and selling your products using voice commands. Ask "How to upload products step by step" to get started.
          </DialogDescription>
        </DialogHeader>

        {!isConfigured ? (
          <div className="space-y-4">
            <p className="text-sm">
              Enter your ElevenLabs API key to enable the voice assistant.
              Don't have one? You can get a free API key at{" "}
              <a 
                href="https://elevenlabs.io" 
                target="_blank" 
                rel="noreferrer" 
                className="text-blue-600 hover:underline"
              >
                elevenlabs.io
              </a>
            </p>
            <div className="space-y-2">
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key"
              />
              <Button onClick={handleApiKeySubmit} className="w-full">
                Configure Voice Assistant
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              {transcript ? (
                <>
                  <p className="text-sm font-medium mb-2">You asked:</p>
                  <p className="text-gray-700 mb-4">{transcript}</p>
                </>
              ) : (
                <p className="text-gray-500 italic mb-4">
                  {isListening 
                    ? "Listening... Speak now" 
                    : "Click the microphone button and ask 'How to upload products step by step'"
                  }
                </p>
              )}

              {response && (
                <>
                  <p className="text-sm font-medium mb-2">Assistant response:</p>
                  <div className="bg-white p-3 rounded border whitespace-pre-line text-gray-800">
                    {response}
                  </div>
                </>
              )}
            </div>

            {currentStep > 0 && (
              <ProductUploadSteps
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                steps={productUploadStepsData}
                onStepChange={handleStepChange}
              />
            )}

            <div className="flex justify-center">
              <Button
                onClick={toggleListening}
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isListening ? (
                  <MicOff className="h-8 w-8" />
                ) : (
                  <Mic className="h-8 w-8" />
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              {isListening ? "Tap to stop" : "Tap to start speaking"}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
