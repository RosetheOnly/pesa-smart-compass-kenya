
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle, AlertTriangle, CreditCard, FileText } from "lucide-react";

export const SecurityDashboard = () => {
  const securityStats = [
    { label: "Protected Purchases", value: "12", icon: Shield },
    { label: "Escrow Holdings", value: "KSH 45,000", icon: Lock },
    { label: "Insurance Claims", value: "0", icon: FileText },
    { label: "Successful Deliveries", value: "100%", icon: CheckCircle }
  ];

  const recentActivity = [
    {
      type: "escrow_hold",
      description: "Payment held in escrow for Samsung Galaxy S24",
      amount: "KSH 85,000",
      status: "active",
      date: "2024-06-15"
    },
    {
      type: "delivery_confirmed",
      description: "Delivery confirmed for Office Chair",
      amount: "KSH 15,000",
      status: "completed",
      date: "2024-06-12"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Shield className="h-5 w-5 mr-2" />
            Your Account Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {securityStats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-white rounded-lg border">
                <stat.icon className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-green-800">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Security Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {activity.type === "escrow_hold" ? (
                    <Lock className="h-4 w-4 text-blue-600" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{activity.amount}</p>
                  <Badge 
                    variant={activity.status === "active" ? "secondary" : "default"}
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Protections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Escrow Protection</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Purchase Insurance</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Standard Plan</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Payment Security</span>
              </div>
              <Badge className="bg-orange-100 text-orange-800">Enhanced</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
