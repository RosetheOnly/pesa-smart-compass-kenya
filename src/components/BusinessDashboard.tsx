
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProductManagement } from "@/components/ProductManagement";
import { CustomerManagement } from "@/components/CustomerManagement";
import { BusinessIdentifier } from "@/components/BusinessIdentifier";
import { PaymentConfiguration } from "@/components/PaymentConfiguration";
import { BusinessVerification } from "@/components/BusinessVerification";
import { EscrowSystem } from "@/components/EscrowSystem";
import { PerformanceMonitoring } from "@/components/PerformanceMonitoring";
import { FinancialSecurity } from "@/components/FinancialSecurity";
import { ReviewSystem } from "@/components/ReviewSystem";
import { DeliveryTracking } from "@/components/DeliveryTracking";
import { InsuranceGuarantees } from "@/components/InsuranceGuarantees";
import { useLanguage } from "@/hooks/useLanguage";
import { ShoppingBag, Users, BarChart3, Settings, Shield, CreditCard, TrendingUp, DollarSign } from "lucide-react";

export const BusinessDashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <BusinessIdentifier />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.products}</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.customers}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Total customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSH 2.4M</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">{t.products}</TabsTrigger>
          <TabsTrigger value="customers">{t.customers}</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="escrow">Escrow</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductManagement />
        </TabsContent>

        <TabsContent value="customers">
          <CustomerManagement />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentConfiguration />
        </TabsContent>

        <TabsContent value="verification">
          <BusinessVerification />
        </TabsContent>

        <TabsContent value="escrow">
          <EscrowSystem />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewSystem />
        </TabsContent>

        <TabsContent value="delivery">
          <DeliveryTracking />
        </TabsContent>

        <TabsContent value="insurance">
          <InsuranceGuarantees />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceMonitoring />
        </TabsContent>

        <TabsContent value="security">
          <FinancialSecurity />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>{t.analytics}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
