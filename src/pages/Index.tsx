
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BusinessDashboard } from "@/components/BusinessDashboard";
import { CustomerDashboard } from "@/components/CustomerDashboard";
import { AuthForm } from "@/components/AuthForm";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ChatbotButton } from "@/components/ChatbotButton";
import { useLanguage } from "@/hooks/useLanguage";
import { CreditCard } from "lucide-react";
import { LandingPage } from "@/components/LandingPage";

const Index = () => {
  const [userType, setUserType] = useState<"customer" | "business" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return (
      <>
        <LandingPage 
          userType={userType} 
          setUserType={setUserType} 
          onAuthenticated={() => setIsAuthenticated(true)} 
        />
        <ChatbotButton />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">InstallmentPay</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
            >
              {t.logout}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {userType === "business" ? <BusinessDashboard /> : <CustomerDashboard />}
      </main>
      
      <ChatbotButton />
    </div>
  );
};

export default Index;
