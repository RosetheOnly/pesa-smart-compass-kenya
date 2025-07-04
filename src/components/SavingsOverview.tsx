
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/useLanguage";
import { Wallet, Target, TrendingUp } from "lucide-react";

export const SavingsOverview = () => {
  const { t, version } = useLanguage(); // Add version to force re-render
  const totalSavings = 45000;
  const savingsGoal = 60000;
  const progress = (totalSavings / savingsGoal) * 100;

  console.log('SavingsOverview render - version:', version, 'language sample:', t.customer);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wallet className="h-5 w-5 mr-2" />
          {t.savings} Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{t.goalProgress}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>KSH {totalSavings.toLocaleString()}</span>
              <span>KSH {savingsGoal.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Target className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-medium">{t.monthlyTarget}</span>
              </div>
              <p className="text-lg font-bold text-green-600">KSH 5,000</p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium">{t.thisMonth}</span>
              </div>
              <p className="text-lg font-bold text-blue-600">KSH 4,200</p>
            </div>
          </div>

          <Button className="w-full">{t.addToSavings}</Button>
        </div>
      </CardContent>
    </Card>
  );
};
