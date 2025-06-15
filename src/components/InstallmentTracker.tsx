
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/useLanguage";
import { CreditCard, Calendar, DollarSign } from "lucide-react";

interface Installment {
  id: string;
  productName: string;
  totalAmount: number;
  paidAmount: number;
  monthlyPayment: number;
  remainingMonths: number;
  nextPaymentDate: string;
}

export const InstallmentTracker = () => {
  const { t } = useLanguage();
  const installments: Installment[] = [
    {
      id: "1",
      productName: "Samsung Galaxy S24",
      totalAmount: 85000,
      paidAmount: 35000,
      monthlyPayment: 4250,
      remainingMonths: 12,
      nextPaymentDate: "2024-07-15"
    },
    {
      id: "2",
      productName: "Office Chair",
      totalAmount: 15000,
      paidAmount: 10000,
      monthlyPayment: 2500,
      remainingMonths: 2,
      nextPaymentDate: "2024-07-10"
    }
  ];

  return (
    <div className="space-y-4">
      {installments.map((installment) => {
        const progress = (installment.paidAmount / installment.totalAmount) * 100;
        
        return (
          <Card key={installment.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  {installment.productName}
                </div>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% paid
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={progress} className="h-3" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Paid / Total
                    </div>
                    <p className="font-medium">
                      KSH {installment.paidAmount.toLocaleString()} / {installment.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      Next Payment
                    </div>
                    <p className="font-medium">{installment.nextPaymentDate}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.monthlyPayment}</p>
                    <p className="font-bold">KSH {installment.monthlyPayment.toLocaleString()}</p>
                  </div>
                  <Button size="sm">{t.payNow}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
