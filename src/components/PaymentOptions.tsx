
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/hooks/useLanguage";
import { CreditCard, Smartphone, Banknote, Globe } from "lucide-react";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  name: string;
  type: 'mobile' | 'card' | 'digital_wallet' | 'bank';
  icon: React.ReactNode;
  requiresPhone?: boolean;
  requiresCard?: boolean;
  requiresEmail?: boolean;
}

interface PaymentOptionsProps {
  amount: number;
  onPaymentSuccess?: () => void;
  onCancel?: () => void;
}

export const PaymentOptions = ({ amount, onPaymentSuccess, onCancel }: PaymentOptionsProps) => {
  const { t } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: "mpesa",
      name: "M-Pesa",
      type: "mobile",
      icon: <Smartphone className="h-5 w-5 text-green-600" />,
      requiresPhone: true
    },
    {
      id: "airtel",
      name: "Airtel Money",
      type: "mobile",
      icon: <Smartphone className="h-5 w-5 text-red-600" />,
      requiresPhone: true
    },
    {
      id: "visa",
      name: "Visa",
      type: "card",
      icon: <CreditCard className="h-5 w-5 text-blue-600" />,
      requiresCard: true
    },
    {
      id: "mastercard",
      name: "Mastercard",
      type: "card",
      icon: <CreditCard className="h-5 w-5 text-orange-600" />,
      requiresCard: true
    },
    {
      id: "paypal",
      name: "PayPal",
      type: "digital_wallet",
      icon: <Globe className="h-5 w-5 text-blue-700" />,
      requiresEmail: true
    },
    {
      id: "skrill",
      name: "Skrill",
      type: "digital_wallet",
      icon: <Globe className="h-5 w-5 text-purple-600" />,
      requiresEmail: true
    },
    {
      id: "stripe",
      name: "Stripe",
      type: "digital_wallet",
      icon: <Globe className="h-5 w-5 text-indigo-600" />,
      requiresCard: true
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      type: "bank",
      icon: <Banknote className="h-5 w-5 text-gray-600" />
    }
  ];

  const selectedPaymentMethod = paymentMethods.find(method => method.id === selectedMethod);

  const validatePayment = (): boolean => {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return false;
    }

    if (selectedPaymentMethod?.requiresPhone && !phoneNumber) {
      toast.error("Please enter your phone number");
      return false;
    }

    if (selectedPaymentMethod?.requiresCard) {
      if (!cardNumber || !expiryDate || !cvv) {
        toast.error("Please fill in all card details");
        return false;
      }
    }

    if (selectedPaymentMethod?.requiresEmail && !email) {
      toast.error("Please enter your email address");
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`Payment of KSH ${amount.toLocaleString()} successful via ${selectedPaymentMethod?.name}!`);
      onPaymentSuccess?.();
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove non-digits and format as Kenyan number
    const digits = value.replace(/\D/g, '');
    if (digits.startsWith('254')) {
      return `+${digits}`;
    } else if (digits.startsWith('0')) {
      return `+254${digits.slice(1)}`;
    } else if (digits.length <= 9) {
      return `+254${digits}`;
    }
    return `+${digits}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Payment Options
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Amount to pay: <span className="font-bold text-green-600">KSH {amount.toLocaleString()}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <Label className="text-base font-medium">Select Payment Method</Label>
          <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label 
                    htmlFor={method.id} 
                    className="flex items-center space-x-2 cursor-pointer flex-1 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    {method.icon}
                    <span>{method.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Payment Details Form */}
        {selectedMethod && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium">Payment Details - {selectedPaymentMethod?.name}</h4>
            
            {selectedPaymentMethod?.requiresPhone && (
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254 700 000 000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your mobile money number
                </p>
              </div>
            )}

            {selectedPaymentMethod?.requiresCard && (
              <>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={4}
                    />
                  </div>
                </div>
              </>
            )}

            {selectedPaymentMethod?.requiresEmail && (
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your {selectedPaymentMethod.name} account email
                </p>
              </div>
            )}

            {selectedMethod === "bank_transfer" && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">Bank Transfer Details</h5>
                <div className="text-sm text-blue-700 space-y-1">
                  <p><strong>Bank:</strong> Equity Bank Kenya</p>
                  <p><strong>Account Name:</strong> InstallmentPay Ltd</p>
                  <p><strong>Account Number:</strong> 1234567890</p>
                  <p><strong>Reference:</strong> Your phone number</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button 
            onClick={handlePayment} 
            disabled={!selectedMethod || isProcessing}
            className="flex-1"
          >
            {isProcessing ? "Processing..." : `Pay KSH ${amount.toLocaleString()}`}
          </Button>
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>

        {/* Security Notice */}
        <div className="text-xs text-muted-foreground text-center p-3 bg-green-50 rounded-lg">
          🔒 Your payment information is secure and encrypted
        </div>
      </CardContent>
    </Card>
  );
};
