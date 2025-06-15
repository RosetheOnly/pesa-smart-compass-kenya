
import { Button } from "@/components/ui/button";
import { Building2, Users } from "lucide-react";

interface HeroSectionProps {
  setUserType: (type: "customer" | "business") => void;
}

export const HeroSection = ({ setUserType }: HeroSectionProps) => {
  return (
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
  );
};
