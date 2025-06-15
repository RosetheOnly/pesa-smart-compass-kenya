
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Star, Award } from "lucide-react";

interface TrustIndicatorsProps {
  verificationLevel: "none" | "basic" | "verified" | "premium";
  rating?: number;
  reviewCount?: number;
  className?: string;
}

export const TrustIndicators = ({ 
  verificationLevel, 
  rating = 4.8, 
  reviewCount = 156,
  className = "" 
}: TrustIndicatorsProps) => {
  const getVerificationBadge = () => {
    switch (verificationLevel) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified Business
          </Badge>
        );
      case "premium":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            <Award className="h-3 w-3 mr-1" />
            Premium Verified
          </Badge>
        );
      case "basic":
        return (
          <Badge variant="secondary">
            <Shield className="h-3 w-3 mr-1" />
            Basic Verified
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {getVerificationBadge()}
      
      <div className="flex items-center">
        <div className="flex items-center mr-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3 w-3 ${
                star <= Math.floor(rating) 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {rating} ({reviewCount} reviews)
        </span>
      </div>

      <Badge variant="outline" className="text-green-600 border-green-300">
        <Shield className="h-3 w-3 mr-1" />
        Insured
      </Badge>
    </div>
  );
};
