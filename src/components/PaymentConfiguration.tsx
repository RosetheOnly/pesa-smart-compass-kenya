
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { Settings, Smartphone, CreditCard, Globe, Banknote, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface PaymentAccount {
  id: string;
  type: 'mpesa_paybill' | 'mpesa_till' | 'airtel_paybill' | 'paypal' | 'bank';
  name: string;
  accountNumber: string;
  accountName?: string;
  isActive: boolean;
}

export const PaymentConfiguration = () => {
  const { t } = useLanguage();
  const [accounts, setAccounts] = useState<PaymentAccount[]>([
    {
      id: "1",
      type: "mpesa_paybill",
      name: "M-Pesa Paybill",
      accountNumber: "123456",
      accountName: "My Business Store",
      isActive: true
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAccount, setNewAccount] = useState({
    type: "mpesa_paybill" as PaymentAccount['type'],
    name: "",
    accountNumber: "",
    accountName: ""
  });

  const paymentTypeOptions = [
    { value: "mpesa_paybill", label: "M-Pesa Paybill", icon: <Smartphone className="h-4 w-4 text-green-600" /> },
    { value: "mpesa_till", label: "M-Pesa Till Number", icon: <Smartphone className="h-4 w-4 text-green-600" /> },
    { value: "airtel_paybill", label: "Airtel Money Paybill", icon: <Smartphone className="h-4 w-4 text-red-600" /> },
    { value: "paypal", label: "PayPal Business Account", icon: <Globe className="h-4 w-4 text-blue-700" /> },
    { value: "bank", label: "Bank Account", icon: <Banknote className="h-4 w-4 text-gray-600" /> }
  ];

  const getAccountIcon = (type: PaymentAccount['type']) => {
    const option = paymentTypeOptions.find(opt => opt.value === type);
    return option?.icon || <CreditCard className="h-4 w-4" />;
  };

  const getAccountLabel = (type: PaymentAccount['type']) => {
    const option = paymentTypeOptions.find(opt => opt.value === type);
    return option?.label || type;
  };

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.accountNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    const account: PaymentAccount = {
      id: Date.now().toString(),
      type: newAccount.type,
      name: newAccount.name,
      accountNumber: newAccount.accountNumber,
      accountName: newAccount.accountName,
      isActive: true
    };

    setAccounts([...accounts, account]);
    setNewAccount({ type: "mpesa_paybill", name: "", accountNumber: "", accountName: "" });
    setIsAdding(false);
    toast.success("Payment account added successfully!");
  };

  const toggleAccountStatus = (id: string) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { ...account, isActive: !account.isActive } : account
    ));
    toast.success("Account status updated!");
  };

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter(account => account.id !== id));
    toast.success("Payment account deleted!");
  };

  const getFieldLabels = (type: PaymentAccount['type']) => {
    switch (type) {
      case 'mpesa_paybill':
        return { number: "Paybill Number", name: "Business Name" };
      case 'mpesa_till':
        return { number: "Till Number", name: "Till Name" };
      case 'airtel_paybill':
        return { number: "Paybill Number", name: "Business Name" };
      case 'paypal':
        return { number: "PayPal Email", name: "Business Name" };
      case 'bank':
        return { number: "Account Number", name: "Account Name" };
      default:
        return { number: "Account Number", name: "Account Name" };
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <CardTitle>Payment Configuration</CardTitle>
        </div>
        <Button onClick={() => setIsAdding(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="space-y-4 mb-6 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium">Add New Payment Account</h4>
            
            <div>
              <Label htmlFor="paymentType">Payment Type</Label>
              <select
                id="paymentType"
                value={newAccount.type}
                onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value as PaymentAccount['type'] })}
                className="w-full p-2 border rounded-md"
              >
                {paymentTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="accountName">Account Display Name</Label>
              <Input
                id="accountName"
                placeholder="e.g., Main Store Paybill"
                value={newAccount.name}
                onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="accountNumber">
                {getFieldLabels(newAccount.type).number}
              </Label>
              <Input
                id="accountNumber"
                placeholder={
                  newAccount.type === 'paypal' 
                    ? "business@example.com" 
                    : newAccount.type.includes('till') 
                      ? "123456"
                      : "123456"
                }
                value={newAccount.accountNumber}
                onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="businessName">
                {getFieldLabels(newAccount.type).name}
              </Label>
              <Input
                id="businessName"
                placeholder="Official account name"
                value={newAccount.accountName}
                onChange={(e) => setNewAccount({ ...newAccount, accountName: e.target.value })}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleAddAccount}>Add Account</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {accounts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No payment accounts configured. Add one to start receiving payments.
            </p>
          ) : (
            accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getAccountIcon(account.type)}
                  <div>
                    <h4 className="font-medium">{account.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {getAccountLabel(account.type)} • {account.accountNumber}
                    </p>
                    {account.accountName && (
                      <p className="text-xs text-muted-foreground">{account.accountName}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant={account.isActive ? "default" : "secondary"}
                    onClick={() => toggleAccountStatus(account.id)}
                  >
                    {account.isActive ? "Active" : "Inactive"}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => deleteAccount(account.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {accounts.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">Important Notes</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Customers will see these payment details when making purchases</li>
              <li>• Only active accounts will be shown to customers</li>
              <li>• Ensure all account details are accurate to avoid payment issues</li>
              <li>• You can have multiple accounts of the same type for different stores</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
