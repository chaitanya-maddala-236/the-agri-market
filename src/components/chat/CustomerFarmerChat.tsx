
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { farmers } from "@/data/farmers";
import { Send, Mic, Search } from "lucide-react";

interface CustomerFarmerChatProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
  quantity?: number;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'voice';
  isRead: boolean;
}

export default function CustomerFarmerChat({ isOpen, onClose, product, quantity }: CustomerFarmerChatProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectFarmer = (farmer: any) => {
    setSelectedFarmer(farmer);
    // Load existing messages for this farmer (in real app, this would be from a database)
    const existingMessages = getMessagesFromStorage(farmer.id);
    setMessages(existingMessages);
  };

  const getMessagesFromStorage = (farmerId: string): Message[] => {
    const stored = localStorage.getItem(`chat_${farmerId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [];
  };

  const saveMessagesToStorage = (farmerId: string, messages: Message[]) => {
    localStorage.setItem(`chat_${farmerId}`, JSON.stringify(messages));
    
    // Also save to farmer's inbox
    const farmerInbox = JSON.parse(localStorage.getItem('farmer_messages') || '[]');
    const existingChatIndex = farmerInbox.findIndex((chat: any) => 
      chat.farmerId === farmerId && chat.customerId === 'current_customer'
    );

    const chatData = {
      farmerId,
      customerId: 'current_customer',
      customerName: 'Customer',
      product: product ? { name: product.name, quantity } : null,
      messages,
      lastMessage: messages[messages.length - 1],
      updatedAt: new Date().toISOString()
    };

    if (existingChatIndex >= 0) {
      farmerInbox[existingChatIndex] = chatData;
    } else {
      farmerInbox.push(chatData);
    }

    localStorage.setItem('farmer_messages', JSON.stringify(farmerInbox));
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedFarmer) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'current_customer',
      senderName: 'Customer',
      message: message.trim(),
      timestamp: new Date(),
      type: 'text',
      isRead: false
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    saveMessagesToStorage(selectedFarmer.id, updatedMessages);
    setMessage('');

    toast({
      title: "Message sent",
      description: `Your message has been sent to ${selectedFarmer.name}`,
    });
  };

  const handleVoiceNote = () => {
    if (!selectedFarmer) return;

    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak your message now...",
      });
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage: Message = {
          id: Date.now().toString(),
          senderId: 'current_customer',
          senderName: 'Customer',
          message: '🎵 Voice message (3s)',
          timestamp: new Date(),
          type: 'voice',
          isRead: false
        };

        const updatedMessages = [...messages, voiceMessage];
        setMessages(updatedMessages);
        saveMessagesToStorage(selectedFarmer.id, updatedMessages);

        toast({
          title: "Voice message sent",
          description: `Your voice message has been sent to ${selectedFarmer.name}`,
        });
      }, 3000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {selectedFarmer ? `Chat with ${selectedFarmer.name}` : 'Select a Farmer to Chat'}
          </DialogTitle>
        </DialogHeader>

        {!selectedFarmer ? (
          <div className="flex-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search farmer by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredFarmers.map(farmer => (
                <div
                  key={farmer.id}
                  onClick={() => handleSelectFarmer(farmer)}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 flex items-center space-x-3"
                >
                  <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{farmer.name}</h3>
                    <p className="text-sm text-gray-500">{farmer.location}</p>
                    <div className="flex items-center text-sm text-yellow-600">
                      ⭐ {farmer.rating.toFixed(1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedFarmer.image}
                  alt={selectedFarmer.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{selectedFarmer.name}</h3>
                  <p className="text-sm text-gray-500">{selectedFarmer.location}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedFarmer(null)}>
                Change Farmer
              </Button>
            </div>

            {/* Product Info if available */}
            {product && (
              <div className="p-3 bg-blue-50 border-b">
                <p className="text-sm text-blue-800">
                  Discussing: <strong>{product.name}</strong> 
                  {quantity && ` (${quantity} ${product.unit})`}
                </p>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>Start a conversation with {selectedFarmer.name}</p>
                  {product && (
                    <p className="text-sm mt-2">Ask about pricing, availability, or any questions!</p>
                  )}
                </div>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderId === 'current_customer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        msg.senderId === 'current_customer'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.senderId === 'current_customer' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 min-h-[40px] max-h-[100px]"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex flex-col space-y-1">
                  <Button
                    onClick={handleVoiceNote}
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    className="p-2"
                  >
                    <Mic className={`h-4 w-4 ${isRecording ? 'animate-pulse' : ''}`} />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    size="sm"
                    className="p-2"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
