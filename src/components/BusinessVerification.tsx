
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Shield, CheckCircle, AlertCircle, Upload, FileText, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

interface VerificationDocument {
  type: string;
  name: string;
  status: "pending" | "approved" | "rejected";
  uploadedAt: string;
}

export const BusinessVerification = () => {
  const { t } = useLanguage();
  const [verificationLevel, setVerificationLevel] = useState<"none" | "basic" | "verified" | "premium">("basic");
  const [documents, setDocuments] = useState<VerificationDocument[]>([
    { type: "business_license", name: "Business License.pdf", status: "approved", uploadedAt: "2024-06-01" },
    { type: "tax_certificate", name: "Tax Certificate.pdf", status: "pending", uploadedAt: "2024-06-10" }
  ]);

  const requiredDocuments = [
    { type: "business_license", label: "Business License", required: true },
    { type: "tax_certificate", label: "Tax Certificate", required: true },
    { type: "id_document", label: "Owner ID Document", required: true },
    { type: "bank_statement", label: "Bank Statement (3 months)", required: false },
    { type: "address_proof", label: "Business Address Proof", required: true }
  ];

  const handleDocumentUpload = (documentType: string) => {
    // Simulate document upload
    const newDoc: VerificationDocument = {
      type: documentType,
      name: `${documentType}_${Date.now()}.pdf`,
      status: "pending",
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setDocuments([...documents, newDoc]);
    toast.success("Document uploaded successfully. Review in progress.");
  };

  const getVerificationBadge = () => {
    switch (verificationLevel) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Verified</Badge>;
      case "premium":
        return <Badge className="bg-blue-100 text-blue-800"><Shield className="h-3 w-3 mr-1" />Premium Verified</Badge>;
      case "basic":
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Basic</Badge>;
      default:
        return <Badge variant="destructive">Not Verified</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Business Verification
          </div>
          {getVerificationBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-medium">Identity Verified</h3>
            <p className="text-xs text-muted-foreground">Phone & Email confirmed</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-medium">Address Verified</h3>
            <p className="text-xs text-muted-foreground">Physical location confirmed</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <FileText className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <h3 className="font-medium">Documents</h3>
            <p className="text-xs text-muted-foreground">2 of 4 approved</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Required Documents</h4>
          <div className="space-y-3">
            {requiredDocuments.map((doc) => {
              const uploaded = documents.find(d => d.type === doc.type);
              return (
                <div key={doc.type} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{doc.label}</p>
                      {doc.required && <p className="text-xs text-red-500">Required</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {uploaded ? (
                      <Badge 
                        variant={uploaded.status === "approved" ? "default" : 
                                uploaded.status === "pending" ? "secondary" : "destructive"}
                      >
                        {uploaded.status}
                      </Badge>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDocumentUpload(doc.type)}
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Verification Benefits</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Higher customer trust and visibility</li>
            <li>• Access to premium features</li>
            <li>• Lower escrow hold times</li>
            <li>• Reduced security deposit requirements</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
