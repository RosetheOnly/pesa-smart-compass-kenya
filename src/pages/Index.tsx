
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BusinessDashboard } from "@/components/BusinessDashboard";
import { CustomerDashboard } from "@/components/CustomerDashboard";
import { AuthForm } from "@/components/AuthForm";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import { Building2, Users, CreditCard, Piggy Bank, Shield, MessageSquare } from "lucide-react";

const Index = () => {
  const [userType, setUserType] = useState<"customer" | "business" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header */}
        <header className="flex justify-between items-center p-6 max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">InstallmentPay</span>
          </div>
          <LanguageSelector />
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Smart Installment Payments for Kenya
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Pay for goods and services in installments while building your savings. Perfect for businesses and customers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                onClick={() => setUserType("business")}
              >
                <Building2 className="h-5 w-5 mr-2" />
                For Business
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
                onClick={() => setUserType("customer")}
              >
                <Users className="h-5 w-5 mr-2" />
                For Customers
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          {!userType && (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Business Card */}
              <Card className="p-8 border-2 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-gray-900">For Businesses</CardTitle>
                  <p className="text-gray-600">Increase sales by offering flexible payment options to your customers</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Manage products and payment terms
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Track customer installments
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Analytics and reporting
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Automated SMS notifications
                    </li>
                  </ul>
                  <Button 
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setUserType("business")}
                  >
                    Register Business
                  </Button>
                </CardContent>
              </Card>

              {/* Customer Card */}
              <Card className="p-8 border-2 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-2xl text-gray-900">For Customers</CardTitle>
                  <p className="text-gray-600">Buy what you need today and pay over time while saving for the future</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      Flexible installment payments
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      Build savings automatically
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      Emergency fund access (2%)
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      Payment reminders via SMS
                    </li>
                  </ul>
                  <Button 
                    className="w-full mt-6 bg-green-600 hover:bg-green-700"
                    onClick={() => setUserType("customer")}
                  >
                    Register as Customer
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Auth Form */}
          {userType && (
            <div className="max-w-md mx-auto">
              <Card className="shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {userType === "business" ? "Business Registration" : "Customer Registration"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AuthForm
                    userType={userType}
                    onAuthenticated={() => setIsAuthenticated(true)}
                  />
                  <Button
                    variant="link"
                    onClick={() => setUserType(null)}
                    className="w-full mt-4"
                  >
                    Back to options
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Features Section */}
          {!userType && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Flexible Installments</h3>
                <p className="text-sm text-gray-600">Choose payment periods that work for you</p>
              </div>
              <div>
                <Piggy Bank className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Build Savings</h3>
                <p className="text-sm text-gray-600">Automatically save while you pay</p>
              </div>
              <div>
                <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Emergency Access</h3>
                <p className="text-sm text-gray-600">Access 2% of savings for emergencies</p>
              </div>
              <div>
                <MessageSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">SMS Reminders</h3>
                <p className="text-sm text-gray-600">Get payment reminders and encouragement</p>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
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
    </div>
  );
};

export default Index;
