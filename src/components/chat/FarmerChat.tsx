
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send, MessageCircle, User, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'farmer' | 'system';
  timestamp: Date;
}

interface FarmerChatProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  farmer: any;
  quantity: number;
  originalPrice: number;
}

export default function FarmerChat({ 
  isOpen, 
  onClose, 
  product, 
  farmer, 
  quantity, 
  originalPrice 
}: FarmerChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [negotiatedPrice, setNegotiatedPrice] = useState(originalPrice);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const OPENAI_API_KEY = "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";

  // Calculate negotiation range based on quantity
  const getDiscountRange = (qty: number) => {
    if (qty >= 10) return { min: 0.15, max: 0.25 }; // 15-25% discount for 10+ kg
    if (qty >= 5) return { min: 0.10, max: 0.20 };  // 10-20% discount for 5+ kg
    if (qty >= 2) return { min: 0.05, max: 0.15 };  // 5-15% discount for 2+ kg
    return { min: 0.02, max: 0.08 }; // 2-8% discount for less than 2 kg
  };

  const discountRange = getDiscountRange(quantity);
  const minPrice = originalPrice * (1 - discountRange.max);
  const maxPrice = originalPrice * (1 - discountRange.min);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize conversation
      const welcomeMessage: Message = {
        id: '1',
        text: `Hello! I'm ${farmer?.name}. I see you're interested in ${quantity} kg of ${product?.name} at ₹${originalPrice} per kg. Let's discuss the best price for you!`,
        sender: 'farmer',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, farmer, product, quantity, originalPrice]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessageToAI = async (userMessage: string, currentPrice: number) => {
    try {
      const systemPrompt = `You are ${farmer?.name}, a farmer selling ${product?.name}. 
      Current negotiation details:
      - Product: ${product?.name}
      - Quantity: ${quantity} kg
      - Original price: ₹${originalPrice} per kg
      - Current offer: ₹${currentPrice} per kg
      - Minimum acceptable price: ₹${minPrice.toFixed(2)} per kg
      - Maximum you can go down to: ₹${maxPrice.toFixed(2)} per kg
      
      You should negotiate reasonably, be friendly but business-minded. 
      If the customer's offer is within your acceptable range, accept it.
      If it's too low, make a counter-offer.
      Be conversational and mention the quality of your products.
      Keep responses under 100 words.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return "I apologize, but I'm having trouble connecting right now. Let's settle on a fair price of ₹" + Math.round(maxPrice) + " per kg. Does that work for you?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Extract price from user message if any
    const priceMatch = inputMessage.match(/₹?(\d+)/);
    const mentionedPrice = priceMatch ? parseInt(priceMatch[1]) : negotiatedPrice;

    try {
      const aiResponse = await sendMessageToAI(inputMessage, mentionedPrice);
      
      setTimeout(() => {
        const farmerMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: 'farmer',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, farmerMessage]);
        setIsTyping(false);

        // Update negotiated price if mentioned in response
        const responsePrice = aiResponse.match(/₹(\d+)/);
        if (responsePrice) {
          setNegotiatedPrice(parseInt(responsePrice[1]));
        }
      }, 1000);
    } catch (error) {
      setIsTyping(false);
      toast({
        title: "Connection Error",
        description: "Unable to connect with the farmer right now.",
        variant: "destructive"
      });
    }
  };

  const handleAcceptPrice = () => {
    toast({
      title: "Price Agreed!",
      description: `${quantity} kg of ${product?.name} at ₹${negotiatedPrice} per kg added to cart`,
    });
    onClose();
    // Here you would add the item to cart with the negotiated price
  };

  const quickReplies = [
    "Can you do ₹" + Math.round(maxPrice) + " per kg?",
    "What's your best price?",
    "I'll take it at this price",
    "Let me think about it"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Chat with {farmer?.name}
          </DialogTitle>
          <div className="text-sm text-gray-600">
            Negotiating: {quantity} kg of {product?.name}
          </div>
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-agro-primary text-white'
                    : 'bg-white border shadow-sm'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === 'farmer' && (
                    <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  {message.sender === 'user' && (
                    <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="text-sm">{message.text}</div>
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border shadow-sm p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="flex flex-wrap gap-2 p-2">
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputMessage(reply)}
              className="text-xs"
            >
              {reply}
            </Button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 resize-none"
            rows={2}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Accept Price Button */}
        {negotiatedPrice !== originalPrice && (
          <Button
            onClick={handleAcceptPrice}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Accept ₹{negotiatedPrice} per kg - Add to Cart
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
