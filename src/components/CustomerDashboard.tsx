import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavingsOverview } from "@/components/SavingsOverview";
import { InstallmentTracker } from "@/components/InstallmentTracker";
import { EmergencyFund } from "@/components/EmergencyFund";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ReviewInterface } from "@/components/ReviewInterface";
import { ReferralProgram } from "@/components/ReferralProgram";
import { BusinessSuggestions } from "@/components/BusinessSuggestions";
import { SafetyFeatures } from "@/components/SafetyFeatures";
import { SecurityDashboard } from "@/components/SecurityDashboard";
import { useLanguage } from "@/hooks/useLanguage";
import { Wallet, CreditCard, AlertCircle, ShoppingCart, Star, Gift, Store, Shield } from "lucide-react";

export const CustomerDashboard = () => {
  const { t } = useLanguage();
  const [totalSavings] = useState(45000);
  const [emergencyAvailable] = useState(900);
  const [activeInstallments] = useState(3);

  return (
    <div className="space-y-6">
      {/* Safety Features - Prominent at the top */}
      <SafetyFeatures variant="compact" />

      {/* Existing dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalSavings}</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSH {totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{t.availableEmergency}: KSH {emergencyAvailable}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.currentInstallments}</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeInstallments}</div>
            <p className="text-xs text-muted-foreground">Active payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.progress}</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Savings goal</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="savings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="savings">{t.savings}</TabsTrigger>
          <TabsTrigger value="installments">{t.installments}</TabsTrigger>
          <TabsTrigger value="emergency">{t.emergency}</TabsTrigger>
          <TabsTrigger value="safety">
            <Shield className="h-4 w-4 mr-1" />
            Safety
          </TabsTrigger>
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="shop">Shop</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="savings">
          <SavingsOverview />
        </TabsContent>

        <TabsContent value="installments">
          <InstallmentTracker />
        </TabsContent>

        <TabsContent value="emergency">
          <EmergencyFund />
        </TabsContent>

        <TabsContent value="safety">
          <div className="space-y-6">
            <SafetyFeatures />
            <SecurityDashboard />
          </div>
        </TabsContent>

        <TabsContent value="businesses">
          <BusinessSuggestions />
        </TabsContent>

        <TabsContent value="shop">
          <ProductCatalog />
        </TabsContent>

        <TabsContent value="referrals">
          <ReferralProgram />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewInterface />
        </TabsContent>
      </Tabs>
    </div>
  );
};
