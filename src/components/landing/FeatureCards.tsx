
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, CheckCircle } from "lucide-react";

interface FeatureCardsProps {
  setUserType: (type: "customer" | "business") => void;
}

export const FeatureCards = ({ setUserType }: FeatureCardsProps) => {
  return (
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
  );
};
