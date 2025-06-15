
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { TrendingUp, Star, Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface PerformanceMetric {
  label: string;
  value: number;
  target: number;
  status: "excellent" | "good" | "warning" | "poor";
}

export const PerformanceMonitoring = () => {
  const { t } = useLanguage();
  const [performanceData] = useState({
    overallScore: 87,
    deliveryRate: 94,
    customerSatisfaction: 4.6,
    responseTime: 2.3,
    disputeRate: 1.2
  });

  const metrics: PerformanceMetric[] = [
    {
      label: "Delivery Rate",
      value: performanceData.deliveryRate,
      target: 95,
      status: performanceData.deliveryRate >= 95 ? "excellent" : 
              performanceData.deliveryRate >= 85 ? "good" : 
              performanceData.deliveryRate >= 75 ? "warning" : "poor"
    },
    {
      label: "Customer Satisfaction",
      value: performanceData.customerSatisfaction,
      target: 4.5,
      status: performanceData.customerSatisfaction >= 4.5 ? "excellent" : 
              performanceData.customerSatisfaction >= 4.0 ? "good" : 
              performanceData.customerSatisfaction >= 3.5 ? "warning" : "poor"
    },
    {
      label: "Response Time (hours)",
      value: performanceData.responseTime,
      target: 2,
      status: performanceData.responseTime <= 2 ? "excellent" : 
              performanceData.responseTime <= 4 ? "good" : 
              performanceData.responseTime <= 8 ? "warning" : "poor"
    },
    {
      label: "Dispute Rate (%)",
      value: performanceData.disputeRate,
      target: 2,
      status: performanceData.disputeRate <= 2 ? "excellent" : 
              performanceData.disputeRate <= 5 ? "good" : 
              performanceData.disputeRate <= 10 ? "warning" : "poor"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "good":
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "poor":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Needs Improvement</Badge>;
      case "poor":
        return <Badge variant="destructive">Poor</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Performance Overview
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{performanceData.overallScore}%</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(metric.status)}
                    <span className="font-medium">{metric.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      {metric.label.includes("Rate") || metric.label.includes("Dispute") 
                        ? `${metric.value}%` 
                        : metric.label.includes("Satisfaction")
                        ? `${metric.value}/5`
                        : `${metric.value}h`}
                    </span>
                    {getStatusBadge(metric.status)}
                  </div>
                </div>
                <Progress 
                  value={metric.label.includes("Time") || metric.label.includes("Dispute") 
                    ? Math.max(0, 100 - (metric.value / metric.target * 50))
                    : (metric.value / (metric.label.includes("Satisfaction") ? 5 : 100)) * 100} 
                  className="h-2" 
                />
                <div className="text-xs text-muted-foreground">
                  Target: {metric.label.includes("Satisfaction") ? `${metric.target}/5` : 
                          metric.label.includes("Time") ? `≤${metric.target}h` :
                          metric.label.includes("Dispute") ? `≤${metric.target}%` : `≥${metric.target}%`}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Performance Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-green-800">Excellent delivery performance!</p>
                <p className="text-sm text-green-600">You've maintained 94% delivery rate this month.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Star className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">High customer satisfaction</p>
                <p className="text-sm text-blue-600">Average rating of 4.6/5 from recent customers.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
