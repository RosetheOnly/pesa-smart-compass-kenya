
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users } from "lucide-react";

interface FeatureCardsProps {
  setUserType: (type: "customer" | "business") => void;
}

export const FeatureCards = ({ setUserType }: FeatureCardsProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-20 px-6">
      {/* Business Card */}
      <Card className="p-8 border border-gray-200 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="text-left pb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900 mb-2">For Businesses</CardTitle>
          <p className="text-gray-600 text-base">Increase sales by offering flexible payment options to your customers</p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700 mb-6 text-sm">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Manage products and payment terms</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Track customer installments</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Analytics and reporting</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Automated SMS notifications</span>
            </li>
          </ul>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm rounded-lg shadow-md hover:shadow-lg transition-all"
            onClick={() => setUserType("business")}
          >
            Register Business
          </Button>
        </CardContent>
      </Card>

      {/* Customer Card */}
      <Card className="p-8 border border-gray-200 shadow-lg rounded-2xl bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="text-left pb-6">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900 mb-2">For Customers</CardTitle>
          <p className="text-gray-600 text-base">Buy what you need today and pay over time while saving for the future</p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700 mb-6 text-sm">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Flexible installment payments</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Build savings automatically</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Emergency fund access (2%)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              <span>Payment reminders via SMS</span>
            </li>
          </ul>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-sm rounded-lg shadow-md hover:shadow-lg transition-all"
            onClick={() => setUserType("customer")}
          >
            Register as Customer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
