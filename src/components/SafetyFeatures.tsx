
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Lock, CreditCard, Camera, Star } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface SafetyFeaturesProps {
  variant?: "compact" | "full";
  className?: string;
}

export const SafetyFeatures = ({ variant = "full", className = "" }: SafetyFeaturesProps) => {
  const { t } = useLanguage();
  
  const safetyFeatures = [
    {
      icon: Shield,
      title: "Escrow Protection",
      description: "Your money is held safely until you confirm delivery",
      stat: "100% Secure"
    },
    {
      icon: CheckCircle,
      title: `${t.verified} Businesses`,
      description: "All sellers go through identity and document verification",
      stat: "98.5% Success Rate"
    },
    {
      icon: Lock,
      title: "Insurance Coverage",
      description: "Full protection against damage, non-delivery, and quality issues",
      stat: "Up to KSH 1M"
    },
    {
      icon: Camera,
      title: "Delivery Proof",
      description: "Photo and GPS proof required for all deliveries",
      stat: "Real-time Tracking"
    }
  ];

  if (variant === "compact") {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center mb-3">
          <Shield className="h-5 w-5 text-green-600 mr-2" />
          <span className="font-semibold text-green-800">100% Protected Purchase</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {safetyFeatures.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center text-green-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              <span>{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-green-600" />
          Your Safety is Guaranteed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safetyFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <feature.icon className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{feature.title}</h4>
                <p className="text-xs text-muted-foreground mb-1">{feature.description}</p>
                <Badge variant="outline" className="text-xs">
                  {feature.stat}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">
            ✓ Money-back guarantee if not satisfied
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
