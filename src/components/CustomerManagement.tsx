
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/useLanguage";
import { Search, Users, Phone, Mail } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSavings: number;
  activeInstallments: number;
}

export const CustomerManagement = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [customers] = useState<Customer[]>([
    { id: "1", name: "John Doe", email: "john@example.com", phone: "+254712345678", totalSavings: 45000, activeInstallments: 2 },
    { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+254723456789", totalSavings: 32000, activeInstallments: 1 },
    { id: "3", name: "Peter Mwangi", email: "peter@example.com", phone: "+254734567890", totalSavings: 58000, activeInstallments: 3 },
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          {t.customers}
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{customer.name}</h3>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3 mr-1" />
                    {customer.email}
                  </div>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3 mr-1" />
                    {customer.phone}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">KSH {customer.totalSavings.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{customer.activeInstallments} active payments</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
