
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessDashboard } from "@/components/BusinessDashboard";
import { CustomerDashboard } from "@/components/CustomerDashboard";
import { AuthForm } from "@/components/AuthForm";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const [userType, setUserType] = useState<"customer" | "business" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="container mx-auto max-w-md">
          <div className="flex justify-end mb-4">
            <LanguageSelector />
          </div>
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-700">
                {t.appName}
              </CardTitle>
              <p className="text-gray-600">{t.appDescription}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <Button
                  onClick={() => setUserType("customer")}
                  variant={userType === "customer" ? "default" : "outline"}
                  className="w-full"
                >
                  {t.customer}
                </Button>
                <Button
                  onClick={() => setUserType("business")}
                  variant={userType === "business" ? "default" : "outline"}
                  className="w-full"
                >
                  {t.business}
                </Button>
              </div>
              {userType && (
                <AuthForm
                  userType={userType}
                  onAuthenticated={() => setIsAuthenticated(true)}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-700">{t.appName}</h1>
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
    </div>
  );
};

export default Index;
