
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Shield, Clock, CheckCircle, AlertTriangle, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface EscrowTransaction {
  id: string;
  customerName: string;
  productName: string;
  amount: number;
  status: "pending" | "held" | "delivered" | "released" | "disputed";
  createdAt: string;
  expectedDelivery: string;
  daysInEscrow: number;
}

export const EscrowSystem = () => {
  const { t } = useLanguage();
  const [transactions, setTransactions] = useState<EscrowTransaction[]>([
    {
      id: "ESC-001",
      customerName: "John Doe",
      productName: "Samsung Galaxy S24",
      amount: 85000,
      status: "held",
      createdAt: "2024-06-10",
      expectedDelivery: "2024-06-15",
      daysInEscrow: 5
    },
    {
      id: "ESC-002",
      customerName: "Jane Smith",
      productName: "Office Chair",
      amount: 15000,
      status: "delivered",
      createdAt: "2024-06-08",
      expectedDelivery: "2024-06-12",
      daysInEscrow: 7
    }
  ]);

  const handleConfirmDelivery = (transactionId: string) => {
    setTransactions(prev => prev.map(t => 
      t.id === transactionId ? { ...t, status: "delivered" } : t
    ));
    toast.success("Delivery confirmed. Awaiting customer verification.");
  };

  const handleDisputeTransaction = (transactionId: string) => {
    setTransactions(prev => prev.map(t => 
      t.id === transactionId ? { ...t, status: "disputed" } : t
    ));
    toast.warning("Transaction disputed. Support team notified.");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "held":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Held in Escrow</Badge>;
      case "delivered":
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="h-3 w-3 mr-1" />Awaiting Release</Badge>;
      case "released":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Released</Badge>;
      case "disputed":
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Disputed</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const totalHeld = transactions
    .filter(t => t.status === "held" || t.status === "delivered")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Escrow Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium">Total Held</h3>
              <p className="text-xl font-bold">KSH {totalHeld.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium">Avg. Release Time</h3>
              <p className="text-xl font-bold">2.5 days</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium">Success Rate</h3>
              <p className="text-xl font-bold">98.5%</p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">How Escrow Protection Works</h4>
            <ol className="text-sm text-green-700 space-y-1">
              <li>1. Customer payment is held securely in escrow</li>
              <li>2. You deliver the product to the customer</li>
              <li>3. Customer confirms receipt and satisfaction</li>
              <li>4. Payment is released to your account within 24 hours</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Escrow Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{transaction.productName}</h3>
                    {getStatusBadge(transaction.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Customer: {transaction.customerName} • Expected: {transaction.expectedDelivery}
                  </p>
                  <p className="text-sm font-medium">KSH {transaction.amount.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2">
                  {transaction.status === "held" && (
                    <Button 
                      size="sm" 
                      onClick={() => handleConfirmDelivery(transaction.id)}
                    >
                      Mark Delivered
                    </Button>
                  )}
                  {(transaction.status === "held" || transaction.status === "delivered") && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDisputeTransaction(transaction.id)}
                    >
                      Report Issue
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
