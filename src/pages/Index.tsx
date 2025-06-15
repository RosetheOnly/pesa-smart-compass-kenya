
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BusinessDashboard } from "@/components/BusinessDashboard";
import { CustomerDashboard } from "@/components/CustomerDashboard";
import { AuthForm } from "@/components/AuthForm";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";
import { Building2, Users, CreditCard, Piggy Bank, Shield, MessageSquare, CheckCircle } from "lucide-react";

const Index = () => {
  const [userType, setUserType] = useState<"customer" | "business" | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">InstallmentPay</span>
          </div>
          <LanguageSelector />
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center py-20">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Smart Payment Solutions
                <span className="block text-blue-600">for Modern Kenya</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Transform how you buy and sell with flexible installment payments. 
                Build savings while accessing what you need today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setUserType("business")}
                >
                  <Building2 className="h-6 w-6 mr-3" />
                  For Business
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-10 py-4 text-lg rounded-xl hover:border-gray-400 transition-all"
                  onClick={() => setUserType("customer")}
                >
                  <Users className="h-6 w-6 mr-3" />
                  For Customers
                </Button>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          {!userType && (
            <>
              <div className="grid lg:grid-cols-2 gap-12 mb-20">
                {/* Business Card */}
                <Card className="p-10 border-0 shadow-2xl rounded-3xl bg-gradient-to-br from-blue-50 to-white hover:shadow-3xl transition-all duration-300">
                  <CardHeader className="text-center pb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl text-gray-900 mb-4">For Businesses</CardTitle>
                    <p className="text-gray-600 text-lg">Boost sales with flexible payment options that customers love</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4 text-gray-700 mb-8">
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-lg">Manage products and payment terms easily</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-lg">Track customer installments in real-time</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-lg">Advanced analytics and reporting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-lg">Automated SMS notifications</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                      onClick={() => setUserType("business")}
                    >
                      Get Started for Business
                    </Button>
                  </CardContent>
                </Card>

                {/* Customer Card */}
                <Card className="p-10 border-0 shadow-2xl rounded-3xl bg-gradient-to-br from-green-50 to-white hover:shadow-3xl transition-all duration-300">
                  <CardHeader className="text-center pb-8">
                    <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl text-gray-900 mb-4">For Customers</CardTitle>
                    <p className="text-gray-600 text-lg">Buy what you need today, pay over time, and build your future</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4 text-gray-700 mb-8">
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-lg">Flexible installment payment plans</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-lg">Automatic savings while you pay</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-lg">Emergency fund access (2% of savings)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-lg">Smart payment reminders via SMS</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                      onClick={() => setUserType("customer")}
                    >
                      Get Started as Customer
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Features Section */}
              <div className="py-20 bg-gray-50 -mx-6 px-6 rounded-3xl">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose InstallmentPay?</h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Built specifically for the Kenyan market with features that matter most
                  </p>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <CreditCard className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Flexible Installments</h3>
                    <p className="text-gray-600">Choose payment periods that work for your budget and lifestyle</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Piggy Bank className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Build Savings</h3>
                    <p className="text-gray-600">Automatically save money while you pay for your purchases</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Shield className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">Emergency Access</h3>
                    <p className="text-gray-600">Access 2% of your savings for unexpected emergencies</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">SMS Reminders</h3>
                    <p className="text-gray-600">Get helpful payment reminders and encouragement</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Auth Form */}
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
                    onAuthenticated={() => setIsAuthenticated(true)}
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
    </div>
  );
};

export default Index;
