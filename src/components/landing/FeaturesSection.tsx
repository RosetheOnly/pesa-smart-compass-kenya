
import { CreditCard, Piggy Bank, Shield, MessageSquare } from "lucide-react";

export const FeaturesSection = () => {
  return (
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
  );
};
