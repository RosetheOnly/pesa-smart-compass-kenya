
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/AuthForm";
import { LanguageSelector } from "@/components/LanguageSelector";
import { CreditCard, Building2, Users } from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { FeaturesSection } from "@/components/landing/FeaturesSection";

interface LandingPageProps {
  userType: "customer" | "business" | null;
  setUserType: (type: "customer" | "business" | null) => void;
  onAuthenticated: () => void;
}

export const LandingPage = ({ userType, setUserType, onAuthenticated }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      
      <main className="max-w-7xl mx-auto px-6">
        <HeroSection setUserType={setUserType} />
        
        {!userType && (
          <>
            <FeatureCards setUserType={setUserType} />
            <FeaturesSection />
          </>
        )}

        {userType && (
          <div className="max-w-md mx-auto py-20">
            <Card className="shadow-2xl border-0 rounded-3xl">
              <CardHeader className="text-center pb-8 pt-10">
                <div className={`w-16 h-16 ${userType === "business" ? "bg-blue-600" : "bg-green-600"} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  {userType === "business" ? 
                    <Building2 className="h-8 w-8 text-white" /> : 
                    <Users className="h-8 w-8 text-white" />
                  }
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {userType === "business" ? "Business Registration" : "Customer Registration"}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-10 pb-10">
                <AuthForm
                  userType={userType}
                  onAuthenticated={onAuthenticated}
                />
                <Button
                  variant="link"
                  onClick={() => setUserType(null)}
                  className="w-full mt-6 text-gray-600 hover:text-gray-800"
                >
                  ← Back to options
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};
