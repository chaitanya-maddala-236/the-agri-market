
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import CustomerFarmerChat from "./CustomerFarmerChat";

interface FloatingChatButtonProps {
  products: any[];
}

export default function FloatingChatButton({ products }: FloatingChatButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleOpenChat}
          className="h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
          aria-label="Chat with farmer"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Customer-Farmer Chat Modal */}
      <CustomerFarmerChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}
