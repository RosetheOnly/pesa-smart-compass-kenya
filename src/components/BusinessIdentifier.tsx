
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Building2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export const BusinessIdentifier = () => {
  const { t } = useLanguage();
  const [businessId] = useState("BIZ-2024-" + Math.random().toString(36).substr(2, 8).toUpperCase());
  const [businessName, setBusinessName] = useState("My Business");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(businessId);
    setCopied(true);
    toast.success("Business ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <Building2 className="h-5 w-5" />
          <CardTitle className="text-lg">{t.businessIdentity}</CardTitle>
        </div>
        <Badge variant="secondary" className="ml-auto">{t.verified}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="businessName">{t.businessName}</Label>
          <Input
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="businessId">{t.businessId}</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="businessId"
              value={businessId}
              readOnly
              className="bg-gray-50"
            />
            <Button 
              size="sm" 
              variant="outline" 
              onClick={copyToClipboard}
              className="shrink-0"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t.shareId}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
