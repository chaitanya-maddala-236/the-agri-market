
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, MessageCircle, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'voice';
  isRead: boolean;
}

interface Chat {
  farmerId: string;
  customerId: string;
  customerName: string;
  product?: { name: string; quantity?: number };
  messages: Message[];
  lastMessage: Message;
  updatedAt: string;
}

export default function FarmerMessages() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
    // Poll for new messages every 5 seconds
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMessages = () => {
    const farmerMessages = JSON.parse(localStorage.getItem('farmer_messages') || '[]');
    const currentFarmerChats = farmerMessages
      .filter((chat: Chat) => chat.farmerId === 'f1') // Current farmer ID
      .map((chat: Chat) => ({
        ...chat,
        messages: chat.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }))
      .sort((a: Chat, b: Chat) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    
    setChats(currentFarmerChats);
  };

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'f1', // Current farmer ID
      senderName: 'Farmer',
      message: replyMessage.trim(),
      timestamp: new Date(),
      type: 'text',
      isRead: false
    };

    const updatedMessages = [...selectedChat.messages, newMessage];
    const updatedChat = {
      ...selectedChat,
      messages: updatedMessages,
      lastMessage: newMessage,
      updatedAt: new Date().toISOString()
    };

    // Update local storage
    const allMessages = JSON.parse(localStorage.getItem('farmer_messages') || '[]');
    const chatIndex = allMessages.findIndex((chat: Chat) => 
      chat.farmerId === selectedChat.farmerId && chat.customerId === selectedChat.customerId
    );

    if (chatIndex >= 0) {
      allMessages[chatIndex] = updatedChat;
    }

    localStorage.setItem('farmer_messages', JSON.stringify(allMessages));

    // Also update the customer's chat storage
    localStorage.setItem(`chat_${selectedChat.farmerId}`, JSON.stringify(updatedMessages));

    setSelectedChat(updatedChat);
    setReplyMessage('');
    loadMessages();

    toast({
      title: "Reply sent",
      description: `Your message has been sent to ${selectedChat.customerName}`,
    });
  };

  const handleVoiceReply = () => {
    if (!selectedChat) return;

    if (!isRecording) {
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak your reply now...",
      });
      
      setTimeout(() => {
        setIsRecording(false);
        const voiceMessage: Message = {
          id: Date.now().toString(),
          senderId: 'f1',
          senderName: 'Farmer',
          message: '🎵 Voice reply (3s)',
          timestamp: new Date(),
          type: 'voice',
          isRead: false
        };

        const updatedMessages = [...selectedChat.messages, voiceMessage];
        const updatedChat = {
          ...selectedChat,
          messages: updatedMessages,
          lastMessage: voiceMessage,
          updatedAt: new Date().toISOString()
        };

        const allMessages = JSON.parse(localStorage.getItem('farmer_messages') || '[]');
        const chatIndex = allMessages.findIndex((chat: Chat) => 
          chat.farmerId === selectedChat.farmerId && chat.customerId === selectedChat.customerId
        );

        if (chatIndex >= 0) {
          allMessages[chatIndex] = updatedChat;
        }

        localStorage.setItem('farmer_messages', JSON.stringify(allMessages));
        localStorage.setItem(`chat_${selectedChat.farmerId}`, JSON.stringify(updatedMessages));

        setSelectedChat(updatedChat);
        loadMessages();

        toast({
          title: "Voice reply sent",
          description: `Your voice message has been sent to ${selectedChat.customerName}`,
        });
      }, 3000);
    }
  };

  const getUnreadCount = (chat: Chat) => {
    return chat.messages.filter(msg => !msg.isRead && msg.senderId !== 'f1').length;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return formatTime(date);
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="h-[600px] flex border rounded-lg overflow-hidden">
      {/* Chat List */}
      <div className="w-1/3 border-r bg-gray-50">
        <div className="p-4 border-b bg-white">
          <h3 className="font-semibold flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Customer Messages
          </h3>
        </div>
        
        <div className="overflow-y-auto h-full">
          {chats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-300 mb-2" />
              <p>No messages yet</p>
              <p className="text-sm">Customers will appear here when they contact you</p>
            </div>
          ) : (
            chats.map(chat => {
              const unreadCount = getUnreadCount(chat);
              return (
                <div
                  key={`${chat.customerId}-${chat.farmerId}`}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 border-b cursor-pointer hover:bg-white transition-colors ${
                    selectedChat?.customerId === chat.customerId ? 'bg-white border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{chat.customerName}</h4>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatDate(chat.updatedAt)}
                      </span>
                    </div>
                  </div>
                  
                  {chat.product && (
                    <p className="text-xs text-blue-600 mb-1">
                      About: {chat.product.name}
                      {chat.product.quantity && ` (${chat.product.quantity})`}
                    </p>
                  )}
                  
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage.senderId === 'f1' ? 'You: ' : ''}
                    {chat.lastMessage.message}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Conversation */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <h3 className="font-semibold">{selectedChat.customerName}</h3>
              {selectedChat.product && (
                <p className="text-sm text-gray-600">
                  Product: {selectedChat.product.name}
                  {selectedChat.product.quantity && ` (${selectedChat.product.quantity})`}
                </p>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {selectedChat.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === 'f1' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.senderId === 'f1'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-800 border'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === 'f1' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Type your reply..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="flex-1 min-h-[40px] max-h-[100px]"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendReply();
                    }
                  }}
                />
                <div className="flex flex-col space-y-1">
                  <Button
                    onClick={handleVoiceReply}
                    variant={isRecording ? "destructive" : "outline"}
                    size="sm"
                    className="p-2"
                  >
                    <Mic className={`h-4 w-4 ${isRecording ? 'animate-pulse' : ''}`} />
                  </Button>
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim()}
                    size="sm"
                    className="p-2"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <MessageCircle className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
