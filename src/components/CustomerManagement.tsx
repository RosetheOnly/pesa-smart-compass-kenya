
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Search, Users, Phone, Mail, Eye, Plus, BarChart3, User } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSavings: number;
  activeInstallments: number;
  monthlyPayment: number;
  product: string;
  dueDate: string;
  status: "active" | "overdue" | "completed";
}

export const CustomerManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [customers] = useState<Customer[]>([
    { 
      id: "1", 
      name: "John Kamau", 
      email: "john@example.com", 
      phone: "+254712345678", 
      totalSavings: 85000, 
      activeInstallments: 1,
      monthlyPayment: 8500,
      product: "Samsung Galaxy S23",
      dueDate: "2025-01-15",
      status: "active"
    },
    { 
      id: "2", 
      name: "Grace Wanjiku", 
      email: "grace@example.com", 
      phone: "+254723456789", 
      totalSavings: 2500000, 
      activeInstallments: 1,
      monthlyPayment: 125000,
      product: "Plot in Kiambu",
      dueDate: "2025-01-10",
      status: "overdue"
    },
    { 
      id: "3", 
      name: "David Otieno", 
      email: "david@example.com", 
      phone: "+254734567890", 
      totalSavings: 180000, 
      activeInstallments: 1,
      monthlyPayment: 15000,
      product: "MacBook Pro",
      dueDate: "2025-01-20",
      status: "active"
    },
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSavings, 0);
  const pendingPayments = customers
    .filter(c => c.status === "overdue")
    .reduce((sum, customer) => sum + customer.monthlyPayment, 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Installments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter(c => c.status === "active" || c.status === "overdue").length}</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSH 1,250,000</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Installments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Recent Installments
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Latest customer installment payments and status</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium">{customer.name}</h3>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{customer.product}</p>
                    <p className="text-xs text-muted-foreground">
                      KSH {customer.monthlyPayment.toLocaleString()}/month • Due: {customer.dueDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium">KSH {customer.totalSavings.toLocaleString()}</div>
                    <Button size="sm" variant="outline" className="mt-2">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View All Customers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Revenue Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
              <Button variant="outline" className="w-full">
                <User className="h-4 w-4 mr-2" />
                Manage Customers
              </Button>
              <Button variant="outline" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <span className="font-medium">KSH {totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-medium">KSH 1,250,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending Payments</span>
                <span className="font-medium text-orange-600">KSH {pendingPayments.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
