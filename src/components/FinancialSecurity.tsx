
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Shield, DollarSign, CreditCard, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface SecurityDeposit {
  type: "security_deposit" | "performance_bond" | "insurance";
  amount: number;
  status: "active" | "pending" | "released";
  expiryDate: string;
  description: string;
}

export const FinancialSecurity = () => {
  const { t } = useLanguage();
  const [securityDeposits, setSecurityDeposits] = useState<SecurityDeposit[]>([
    {
      type: "security_deposit",
      amount: 50000,
      status: "active",
      expiryDate: "2024-12-31",
      description: "Basic security deposit for electronics category"
    },
    {
      type: "performance_bond",
      amount: 25000,
      status: "active",
      expiryDate: "2024-10-15",
      description: "Performance bond for high-value items"
    }
  ]);

  const [requiredDeposits] = useState([
    { category: "Electronics", amount: 50000, current: 50000, required: true },
    { category: "Furniture", amount: 30000, current: 0, required: false },
    { category: "Land/Property", amount: 200000, current: 0, required: true }
  ]);

  const handleAddDeposit = (category: string, amount: number) => {
    toast.success(`Security deposit of KSH ${amount.toLocaleString()} added for ${category}`);
  };

  const totalSecurityAmount = securityDeposits
    .filter(d => d.status === "active")
    .reduce((sum, d) => sum + d.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "released":
        return <Badge variant="outline">Released</Badge>;
      default:
        return <Badge variant="destructive">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Financial Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium">Total Security</h3>
              <p className="text-xl font-bold">KSH {totalSecurityAmount.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CreditCard className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium">Credit Rating</h3>
              <p className="text-xl font-bold">A+</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium">Claims History</h3>
              <p className="text-xl font-bold">0 Claims</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Security Benefits</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Builds customer trust and confidence</li>
              <li>• Faster escrow release times</li>
              <li>• Access to higher-value product categories</li>
              <li>• Reduced transaction fees</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Security Deposits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityDeposits.map((deposit, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium capitalize">
                      {deposit.type.replace('_', ' ')}
                    </h3>
                    {getStatusBadge(deposit.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{deposit.description}</p>
                  <p className="text-sm text-muted-foreground">Expires: {deposit.expiryDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">KSH {deposit.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Required Deposits by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requiredDeposits.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h3 className="font-medium">{category.category}</h3>
                  <p className="text-sm text-muted-foreground">
                    Current: KSH {category.current.toLocaleString()} / Required: KSH {category.amount.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {category.current >= category.amount ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />Complete
                    </Badge>
                  ) : category.required ? (
                    <>
                      <Badge variant="destructive">
                        <AlertCircle className="h-3 w-3 mr-1" />Required
                      </Badge>
                      <Button 
                        size="sm"
                        onClick={() => handleAddDeposit(category.category, category.amount)}
                      >
                        Add Deposit
                      </Button>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleAddDeposit(category.category, category.amount)}
                    >
                      Add Optional
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
