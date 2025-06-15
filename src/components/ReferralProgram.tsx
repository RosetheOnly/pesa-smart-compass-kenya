
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Gift, Users, Share2, Trophy, Copy } from "lucide-react";
import { toast } from "sonner";
import { calculatePointsDiscount } from "@/utils/feeCalculation";

interface ReferralData {
  totalPoints: number;
  availableDiscount: number;
  referralsCount: number;
  referralCode: string;
  recentReferrals: Array<{
    id: string;
    name: string;
    date: string;
    pointsEarned: number;
    purchaseAmount: number;
    status: 'pending' | 'completed';
  }>;
}

export const ReferralProgram = () => {
  const { t } = useLanguage();
  const [referralData] = useState<ReferralData>({
    totalPoints: 850,
    availableDiscount: calculatePointsDiscount(850),
    referralsCount: 5,
    referralCode: "JOHN2024",
    recentReferrals: [
      { id: "1", name: "Mary Wanjiru", date: "2024-12-10", pointsEarned: 250, purchaseAmount: 25000, status: "completed" },
      { id: "2", name: "Peter Kiprotich", date: "2024-12-08", pointsEarned: 150, purchaseAmount: 15000, status: "completed" },
      { id: "3", name: "Grace Achieng", date: "2024-12-05", pointsEarned: 120, purchaseAmount: 12000, status: "pending" },
    ]
  });

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralData.referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  const shareReferralLink = () => {
    const referralLink = `https://installmentpay.app/join?ref=${referralData.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">InstaPay Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{referralData.totalPoints}</div>
            <p className="text-xs text-muted-foreground">Available for discounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Discount</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">KSH {referralData.availableDiscount}</div>
            <p className="text-xs text-muted-foreground">Max KSH 5 per transaction</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralData.referralsCount}</div>
            <p className="text-xs text-muted-foreground">Customers who made purchases</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Share & Earn
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Earn 1 point per KSH 100 spent by your referred customers!
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              value={referralData.referralCode}
              readOnly
              className="font-mono"
            />
            <Button onClick={copyReferralCode} size="sm">
              <Copy className="h-4 w-4 mr-1" />
              Copy Code
            </Button>
          </div>
          
          <Button onClick={shareReferralLink} className="w-full">
            <Share2 className="h-4 w-4 mr-2" />
            Share Referral Link
          </Button>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">How it works:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Share your referral code with friends</li>
              <li>• Earn points only when they make purchases</li>
              <li>• Earn 1 point per KSH 100 they spend</li>
              <li>• Use 100 points = KSH 1 discount (max KSH 5)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Paid Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referralData.recentReferrals.map((referral) => (
              <div key={referral.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{referral.name}</h4>
                  <p className="text-sm text-muted-foreground">{referral.date}</p>
                  <p className="text-xs text-muted-foreground">Purchase: KSH {referral.purchaseAmount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Badge variant={referral.status === "completed" ? "default" : "secondary"}>
                      {referral.status}
                    </Badge>
                    <span className="font-medium text-blue-600">
                      +{referral.pointsEarned} pts
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
