
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Shield, DollarSign, Clock, CheckCircle, AlertTriangle, FileText } from "lucide-react";
import { toast } from "sonner";

interface InsuranceClaim {
  id: string;
  type: "non_delivery" | "damage" | "quality_issue" | "warranty";
  productName: string;
  customerName: string;
  amount: number;
  status: "pending" | "investigating" | "approved" | "rejected" | "paid";
  createdAt: string;
  description: string;
}

interface WarrantyPlan {
  id: string;
  name: string;
  duration: string;
  coverage: string[];
  price: number;
  popular?: boolean;
}

export const InsuranceGuarantees = () => {
  const { t } = useLanguage();
  const [claims, setClaims] = useState<InsuranceClaim[]>([
    {
      id: "CLM-001",
      type: "damage",
      productName: "Samsung Galaxy S24",
      customerName: "John Doe",
      amount: 85000,
      status: "approved",
      createdAt: "2024-06-08",
      description: "Phone arrived with cracked screen"
    },
    {
      id: "CLM-002",
      type: "warranty",
      productName: "Office Chair",
      customerName: "Jane Smith",
      amount: 3000,
      status: "pending",
      createdAt: "2024-06-12",
      description: "Chair wheel broke after 2 months"
    }
  ]);

  const warrantyPlans: WarrantyPlan[] = [
    {
      id: "basic",
      name: "Basic Protection",
      duration: "6 months",
      coverage: ["Manufacturing defects", "Non-delivery guarantee"],
      price: 0
    },
    {
      id: "standard",
      name: "Standard Protection",
      duration: "12 months", 
      coverage: ["Manufacturing defects", "Non-delivery guarantee", "Accidental damage", "Quality issues"],
      price: 500,
      popular: true
    },
    {
      id: "premium",
      name: "Premium Protection",
      duration: "24 months",
      coverage: ["Manufacturing defects", "Non-delivery guarantee", "Accidental damage", "Quality issues", "Extended warranty", "Theft protection"],
      price: 1200
    }
  ];

  const handleProcessClaim = (claimId: string, action: "approve" | "reject") => {
    setClaims(prev => prev.map(claim => 
      claim.id === claimId 
        ? { ...claim, status: action === "approve" ? "approved" : "rejected" }
        : claim
    ));
    toast.success(`Claim ${action}d successfully`);
  };

  const getClaimStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending Review</Badge>;
      case "investigating":
        return <Badge className="bg-blue-100 text-blue-800"><AlertTriangle className="h-3 w-3 mr-1" />Investigating</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "paid":
        return <Badge className="bg-green-100 text-green-800"><DollarSign className="h-3 w-3 mr-1" />Paid</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getClaimTypeLabel = (type: string) => {
    switch (type) {
      case "non_delivery": return "Non-Delivery";
      case "damage": return "Damage";
      case "quality_issue": return "Quality Issue";
      case "warranty": return "Warranty Claim";
      default: return "Other";
    }
  };

  const totalCoverage = claims
    .filter(c => c.status === "approved")
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Insurance & Guarantees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium">Total Coverage</h3>
              <p className="text-xl font-bold">KSH {totalCoverage.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium">Claims Approved</h3>
              <p className="text-xl font-bold">98%</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-medium">Avg. Processing</h3>
              <p className="text-xl font-bold">24 hours</p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-green-800 mb-2">Platform Guarantees</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 100% refund if product is not delivered within agreed timeframe</li>
              <li>• Quality guarantee - return if product doesn't match description</li>
              <li>• Secure escrow payments protect both buyers and sellers</li>
              <li>• Insurance coverage for high-value items</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Warranty Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Protection Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {warrantyPlans.map((plan) => (
              <div key={plan.id} className={`border rounded-lg p-4 ${plan.popular ? 'border-blue-500 bg-blue-50' : ''}`}>
                {plan.popular && (
                  <Badge className="mb-2">Most Popular</Badge>
                )}
                <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
                <div className="text-2xl font-bold mb-2">
                  {plan.price === 0 ? 'Free' : `KSH ${plan.price}`}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{plan.duration} coverage</p>
                <ul className="space-y-1 mb-4">
                  {plan.coverage.map((item, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className="w-full"
                  size="sm"
                >
                  {plan.price === 0 ? 'Included' : 'Add to Products'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Claims Management */}
      <Card>
        <CardHeader>
          <CardTitle>Insurance Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {claims.map((claim) => (
              <div key={claim.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{claim.productName}</h3>
                      {getClaimStatusBadge(claim.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getClaimTypeLabel(claim.type)} • {claim.customerName} • {claim.createdAt}
                    </p>
                    <p className="text-sm font-medium">Amount: KSH {claim.amount.toLocaleString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    {claim.status === "pending" && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleProcessClaim(claim.id, "approve")}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleProcessClaim(claim.id, "reject")}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm">
                    <strong>Description:</strong> {claim.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
