
import { useState, useEffect } from "react";
import { Mic, MicOff, Headphones, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ProductUploadSteps, { productUploadStepsData, getTranslatedSteps } from "./ProductUploadSteps";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConversation } from "@11labs/react";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.8); // Default volume at 80%
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Initialize ElevenLabs conversation
  const conversation = useConversation({
    overrides: {
      tts: {
        voiceId: ELEVENLABS_VOICE_ID,
      },
    },
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
    // Additional query handlers for upload, delete, edit, payment status
    else if (lowercaseQuery.includes("upload") || lowercaseQuery.includes("add product")) {
      assistantResponse = t('voiceAssistant.uploadInstructions');
    } 
    else if (lowercaseQuery.includes("delete") || lowercaseQuery.includes("remove product")) {
      assistantResponse = `${t('voiceAssistant.deleteInstructions')}\n\n${t('voiceAssistant.deleteWarning')}`;
    }
    else if (lowercaseQuery.includes("edit") || lowercaseQuery.includes("update product") || lowercaseQuery.includes("modify")) {
      assistantResponse = t('voiceAssistant.editInstructions');
    }
    else if (lowercaseQuery.includes("payment") || lowercaseQuery.includes("order status") || lowercaseQuery.includes("tracking")) {
      assistantResponse = `${t('voiceAssistant.paymentStatusInstructions')}\n\n${t('voiceAssistant.orderStatusTypes')}`;
    }
    else if (lowercaseQuery.includes("price") || lowercaseQuery.includes("pricing") || lowercaseQuery.includes("cost")) {
      assistantResponse = t('voiceAssistant.pricingTips');
    }
    else if (lowercaseQuery.includes("sell") || lowercaseQuery.includes("selling") || lowercaseQuery.includes("sales")) {
      assistantResponse = t('voiceAssistant.sellingTips');
    }
    else if (lowercaseQuery.includes("help") || lowercaseQuery.includes("assist")) {
      assistantResponse = `${t('voiceAssistant.helpIntro')}\n\n${t('voiceAssistant.commandsList')}`;
    }
    else {
      // Default response for unrecognized queries
      assistantResponse = `${t('voiceAssistant.defaultResponse')}\n\n${t('voiceAssistant.commandsList')}`;
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

  const handleVolumeChange = (newVolume: number) => {
    setAudioVolume(newVolume);
    // If audio is currently playing, update its volume
    const audioElements = document.getElementsByTagName('audio');
    if (audioElements.length > 0) {
      for (let i = 0; i < audioElements.length; i++) {
        audioElements[i].volume = newVolume;
      }
    }
  };

  const speakResponse = async (text: string) => {
    try {
      setIsLoading(true);
      
      // First, try to use the conversation API for speech
      try {
        // Stop any currently playing audio if needed
        if (conversation.isSpeaking) {
          conversation.setVolume({ volume: 0 });
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Use fetch to directly call ElevenLabs API since useConversation doesn't expose simple TTS
        const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + ELEVENLABS_VOICE_ID, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': ELEVENLABS_API_KEY
          },
          body: JSON.stringify({
            text: text,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75
            }
          })
        });

        if (!response.ok) {
          throw new Error('Failed to generate speech');
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.volume = audioVolume;
        
        setIsPlaying(true);
        
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
          setIsLoading(false);
        };
        
        audio.onerror = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
          setIsLoading(false);
          toast({
            title: "Error",
            description: "Failed to play audio response",
            variant: "destructive",
          });
        };
        
        await audio.play();
      } catch (error) {
        console.error("Error using ElevenLabs API:", error);
        setIsLoading(false);
        toast({
          title: "Voice Error",
          description: "Failed to generate speech. Check your API key or connection.",
          variant: "destructive",
        });
      }
    } catch (finalError) {
      console.error("Final error in speech generation:", finalError);
      setIsLoading(false);
    }
  };

  // Cleanup on unmount or dialog close
  useEffect(() => {
    return () => {
      setIsPlaying(false);
      if (conversation && conversation.status === "connected") {
        conversation.endSession();
      }
    };
  }, []);

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
          {/* Enhanced UI for voice assistant */}
          <div className="p-4 bg-gradient-to-br from-agro-light to-white rounded-lg shadow-sm border border-agro-primary/20">
            {transcript ? (
              <>
                <p className="text-sm font-medium mb-2 text-agro-dark">{t('voiceAssistant.youAsked')}</p>
                <p className="text-gray-700 mb-4 bg-white/80 p-3 rounded-md">{transcript}</p>
              </>
            ) : (
              <p className="text-gray-500 italic mb-4 text-center">
                {isListening 
                  ? <span className="flex items-center justify-center gap-2">
                      <span className="animate-pulse">{t('voiceAssistant.listening')}</span>
                      <span className="flex gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </span>
                    </span>
                  : t('voiceAssistant.micPrompt')
                }
              </p>
            )}

            {response && (
              <>
                <p className="text-sm font-medium mb-2 text-agro-dark">{t('voiceAssistant.response')}</p>
                <div className="bg-white p-4 rounded-md border border-agro-primary/10 shadow-sm whitespace-pre-line text-gray-800 max-h-56 overflow-y-auto">
                  {response}
                </div>
              </>
            )}
          </div>

          {/* Suggested commands */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs py-1 px-2 h-auto border-agro-primary/30 hover:bg-agro-primary/10"
              onClick={() => {
                setTranscript("How to upload a product?");
                processQuery("How to upload a product?");
              }}
            >
              How to upload?
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs py-1 px-2 h-auto border-agro-primary/30 hover:bg-agro-primary/10"
              onClick={() => {
                setTranscript("How to delete a product?");
                processQuery("How to delete a product?");
              }}
            >
              How to delete?
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs py-1 px-2 h-auto border-agro-primary/30 hover:bg-agro-primary/10"
              onClick={() => {
                setTranscript("Step by step guide");
                processQuery("Step by step guide");
              }}
            >
              Step-by-step guide
            </Button>
          </div>

          {/* Volume control slider */}
          <div className="flex items-center gap-3 px-2">
            {audioVolume === 0 ? (
              <VolumeX className="h-5 w-5 text-gray-500" />
            ) : (
              <Volume2 className="h-5 w-5 text-agro-primary" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={audioVolume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-agro-primary"
            />
            <span className="text-sm text-gray-600 w-8 text-right">
              {Math.round(audioVolume * 100)}%
            </span>
          </div>

          {currentStep > 0 && (
            <ProductUploadSteps
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              steps={translatedSteps}
              onStepChange={handleStepChange}
            />
          )}

          <div className="flex justify-center mt-2">
            <Button
              onClick={toggleListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 active:scale-95"
                  : "bg-agro-primary hover:bg-agro-dark active:scale-95"
              } ${isLoading || isPlaying ? "opacity-75 cursor-not-allowed" : ""}`}
              disabled={isLoading || isPlaying}
            >
              {isListening ? (
                <MicOff className="h-10 w-10" />
              ) : (
                <Mic className="h-10 w-10" />
              )}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>{isListening ? t('voiceAssistant.tapToStop') : t('voiceAssistant.tapToStart')}</p>
            {(isLoading || isPlaying) && (
              <p className="mt-1 flex items-center justify-center gap-2 text-agro-primary">
                <span>{t('voiceAssistant.speaking')}</span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-agro-primary rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-agro-primary rounded-full animate-pulse" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 bg-agro-primary rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></span>
                </span>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
