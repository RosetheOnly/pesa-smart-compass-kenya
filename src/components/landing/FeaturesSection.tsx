
import { CreditCard, Piggy Bank, Shield, MessageSquare } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Flexible Installments</h3>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Piggy Bank className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Build Savings</h3>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Emergency Access</h3>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">SMS Reminders</h3>
        </div>
      </div>
    </div>
  );
};
