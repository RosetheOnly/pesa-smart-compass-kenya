
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chatbot = ({ isOpen, onClose }: ChatbotProps) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm here to help you with your installment payments and savings. How can I assist you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("installment") || message.includes("payment")) {
      return "I can help you with your installment payments! You currently have 3 active installments. Would you like me to show you the payment schedule or help you with a new installment plan?";
    }
    
    if (message.includes("savings") || message.includes("save")) {
      return "Great question about savings! You currently have KSH 45,000 in total savings with KSH 900 available for emergency use. You're 85% towards your savings goal - keep it up!";
    }
    
    if (message.includes("emergency") || message.includes("withdraw")) {
      return "For emergency withdrawals, you have KSH 900 available. Emergency funds can be accessed immediately for urgent needs like medical expenses or unexpected bills. Would you like to proceed with an emergency withdrawal?";
    }
    
    if (message.includes("product") || message.includes("shop") || message.includes("buy")) {
      return "I can help you find products! We have electronics, furniture, land/property, and more available for installment purchases. What type of product are you looking for?";
    }
    
    if (message.includes("help") || message.includes("support")) {
      return "I'm here to help! I can assist you with: installment payments, savings tracking, emergency fund access, product catalog browsing, and general questions about your account. What would you like to know more about?";
    }
    
    return "I understand you're asking about that. Let me connect you with our support team for more detailed assistance, or you can ask me about installments, savings, emergency funds, or our product catalog.";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getResponse(inputMessage),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 z-50">
      <Card className="h-full shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center">
              <Bot className="h-4 w-4 mr-2" />
              Smart Assistant
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && <Bot className="h-3 w-3 mt-0.5 flex-shrink-0" />}
                      {message.sender === "user" && <User className="h-3 w-3 mt-0.5 flex-shrink-0" />}
                      <div>{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-sm"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
