
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { AlertTriangle, Shield, DollarSign } from "lucide-react";
import { toast } from "sonner";

export const EmergencyFund = () => {
  const { t } = useLanguage();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [reason, setReason] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  
  const totalSavings = 45000;
  const emergencyLimit = totalSavings * 0.02; // 2% of savings

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (amount > emergencyLimit) {
      toast.error(`Amount exceeds emergency limit of KSH ${emergencyLimit.toLocaleString()}`);
      return;
    }
    
    if (!reason.trim()) {
      toast.error("Please provide a reason for withdrawal");
      return;
    }

    // Simulate withdrawal process
    toast.success(`Emergency withdrawal of KSH ${amount.toLocaleString()} processed`);
    setWithdrawAmount("");
    setReason("");
    setIsWithdrawing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-600" />
            {t.emergency} Fund
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700">Available for Emergency</p>
                  <p className="text-2xl font-bold text-green-600">
                    KSH {emergencyLimit.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">2% of your total savings</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Emergency Fund Guidelines</h4>
                  <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                    <li>Only for genuine emergencies</li>
                    <li>Maximum 2% of total savings</li>
                    <li>Requires reason for withdrawal</li>
                    <li>Affects your savings progress</li>
                  </ul>
                </div>
              </div>
            </div>

            {!isWithdrawing ? (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsWithdrawing(true)}
              >
                {t.emergencyWithdraw}
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">{t.amount} (KSH)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    max={emergencyLimit}
                    placeholder={`Max: ${emergencyLimit.toLocaleString()}`}
                  />
                </div>
                
                <div>
                  <Label htmlFor="reason">{t.reason}</Label>
                  <Input
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Medical emergency, urgent repairs, etc."
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button onClick={handleWithdraw} className="flex-1">
                    {t.withdraw}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsWithdrawing(false)}
                    className="flex-1"
                  >
                    {t.cancel}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
