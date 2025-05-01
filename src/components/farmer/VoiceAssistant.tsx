
import { useState, useEffect } from "react";
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
import ProductUploadSteps, { productUploadStepsData, getTranslatedSteps } from "./ProductUploadSteps";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTTS } from "@11labs/react";

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

// ElevenLabs API Key
const ELEVENLABS_API_KEY = "sk_40b9ae2eaa208998c36b20b935a9a4319693d0c1460b656e";
const ELEVENLABS_VOICE_ID = "pFZP5JQG7iQjIQuC4Bku"; // Lily's voice ID

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
  const [isConfigured, setIsConfigured] = useState<boolean>(true); // Set to true since we have the API key
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Initialize ElevenLabs TTS
  const { speak, stop, isLoading, isPlaying } = useTTS({
    apiKey: ELEVENLABS_API_KEY,
    voiceId: ELEVENLABS_VOICE_ID,
    model: "eleven_monolingual_v1"
  });

  // Get translated steps
  const translatedSteps = getTranslatedSteps(t);

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
      recognition.lang = language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : language === 'ta' ? 'ta-IN' : language === 'te' ? 'te-IN' : 'bn-IN';
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
        assistantResponse = `${t('voiceAssistant.guideIntro')}\n\n${translatedSteps[0].title}\n${translatedSteps[0].description}\n\n${t('voiceAssistant.nextStepPrompt')}`;
      } else {
        setCurrentStep(1);
        assistantResponse = `${t('voiceAssistant.restartGuide')}\n\n${translatedSteps[0].title}\n${translatedSteps[0].description}\n\n${t('voiceAssistant.nextStepPrompt')}`;
      }
    }
    else if (lowercaseQuery.includes("next step") || lowercaseQuery.includes("continue")) {
      if (currentStep > 0 && currentStep < translatedSteps.length) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        
        if (nextStep <= translatedSteps.length) {
          assistantResponse = `${translatedSteps[nextStep-1].title}\n${translatedSteps[nextStep-1].description}`;
          
          if (nextStep < translatedSteps.length) {
            assistantResponse += `\n\n${t('voiceAssistant.nextStepPrompt')}`;
          } else {
            assistantResponse += `\n\n${t('voiceAssistant.completedSteps')}`;
          }
        }
      } else {
        assistantResponse = t('voiceAssistant.startGuidePrompt');
      }
    }
    else if (lowercaseQuery.includes("previous step") || lowercaseQuery.includes("go back")) {
      if (currentStep > 1) {
        const prevStep = currentStep - 1;
        setCurrentStep(prevStep);
        assistantResponse = `${translatedSteps[prevStep-1].title}\n${translatedSteps[prevStep-1].description}\n\n${t('voiceAssistant.navPrompt')}`;
      } else {
        assistantResponse = t('voiceAssistant.firstStepPrompt');
      }
    }
    else if (lowercaseQuery.includes("upload") || lowercaseQuery.includes("add product")) {
      assistantResponse = t('voiceAssistant.uploadInstructions');
    } 
    else if (lowercaseQuery.includes("sell") || lowercaseQuery.includes("selling")) {
      assistantResponse = t('voiceAssistant.sellingTips');
    }
    else if (lowercaseQuery.includes("price") || lowercaseQuery.includes("pricing")) {
      assistantResponse = t('voiceAssistant.pricingTips');
    }
    else if (lowercaseQuery.includes("edit") || lowercaseQuery.includes("update product")) {
      assistantResponse = t('voiceAssistant.editInstructions');
    }
    else if (lowercaseQuery.includes("delete") || lowercaseQuery.includes("remove product")) {
      assistantResponse = t('voiceAssistant.deleteInstructions');
    }
    else {
      assistantResponse = t('voiceAssistant.helpIntro');
    }
    
    setResponse(assistantResponse);
    speakResponse(assistantResponse);
  };

  const handleStepChange = (step: number) => {
    let assistantResponse = "";
    
    if (step > 0 && step <= translatedSteps.length) {
      assistantResponse = `${translatedSteps[step-1].title}\n${translatedSteps[step-1].description}`;
      
      if (step < translatedSteps.length) {
        assistantResponse += `\n\n${t('voiceAssistant.nextStepPrompt')}`;
      } else {
        assistantResponse += `\n\n${t('voiceAssistant.completedSteps')}`;
      }
      
      setResponse(assistantResponse);
      speakResponse(assistantResponse);
    }
  };

  const speakResponse = (text: string) => {
    // Stop any currently playing audio first
    if (isPlaying) {
      stop();
    }
    
    // Use ElevenLabs API for text-to-speech
    speak(text);
  };

  // Cleanup on unmount or dialog close
  useEffect(() => {
    return () => {
      if (isPlaying) {
        stop();
      }
    };
  }, [isPlaying, stop]);

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
            {t('voiceAssistant.title')}
          </DialogTitle>
          <DialogDescription>
            {t('voiceAssistant.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md">
            {transcript ? (
              <>
                <p className="text-sm font-medium mb-2">{t('voiceAssistant.youAsked')}</p>
                <p className="text-gray-700 mb-4">{transcript}</p>
              </>
            ) : (
              <p className="text-gray-500 italic mb-4">
                {isListening 
                  ? t('voiceAssistant.listening') 
                  : t('voiceAssistant.micPrompt')
                }
              </p>
            )}

            {response && (
              <>
                <p className="text-sm font-medium mb-2">{t('voiceAssistant.response')}</p>
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
              steps={translatedSteps}
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
              disabled={isLoading || isPlaying}
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            {isListening ? t('voiceAssistant.tapToStop') : t('voiceAssistant.tapToStart')}
            {(isLoading || isPlaying) && <span className="block mt-1 animate-pulse">{t('voiceAssistant.speaking')}</span>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
