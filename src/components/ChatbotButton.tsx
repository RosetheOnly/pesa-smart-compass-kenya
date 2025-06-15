
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Chatbot } from "./Chatbot";

export const ChatbotButton = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-40"
        onClick={() => setIsChatbotOpen(true)}
        style={{ display: isChatbotOpen ? "none" : "flex" }}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </>
  );
};
