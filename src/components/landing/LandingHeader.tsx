
import { CreditCard } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";

export const LandingHeader = () => {
  return (
    <header className="flex justify-between items-center p-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <CreditCard className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-900">InstallmentPay</span>
      </div>
      <LanguageSelector />
    </header>
  );
};
