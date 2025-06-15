
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import { useAccountManagement } from "@/hooks/useAccountManagement";
import { VerificationForm } from "@/components/VerificationForm";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, Phone, Mail } from "lucide-react";

interface EnhancedAuthFormProps {
  userType: "customer" | "business";
  onAuthenticated: () => void;
}

export const EnhancedAuthForm = ({ userType, onAuthenticated }: EnhancedAuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationType, setVerificationType] = useState<"email" | "phone">("email");
  const [pendingAccountId, setPendingAccountId] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    businessName: "",
  });
  
  const { t } = useLanguage();
  const { 
    checkEmailExists, 
    getUserByEmail, 
    createAccount, 
    verifyAccount, 
    authenticateUser,
    accounts 
  } = useAccountManagement();

  const validateForm = () => {
    if (!isLogin) {
      if (!formData.name.trim()) {
        toast.error("Name is required");
        return false;
      }
      if (!formData.phone.trim() || !formData.phone.startsWith("+254")) {
        toast.error("Valid Kenyan phone number is required (+254...)");
        return false;
      }
      if (userType === "business" && !formData.businessName.trim()) {
        toast.error("Business name is required");
        return false;
      }
    }
    
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("Valid email is required");
      return false;
    }
    
    if (!formData.password.trim() || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isLogin) {
      // Handle login
      const user = authenticateUser(formData.email, formData.password);
      if (user) {
        if (user.type === userType) {
          toast.success("Login successful!");
          onAuthenticated();
        } else {
          toast.error(`This email is registered as a ${user.type} account. Please select the correct account type.`);
        }
      } else {
        toast.error("Invalid credentials or unverified account");
      }
    } else {
      // Handle registration
      try {
        const existingUser = getUserByEmail(formData.email);
        
        if (existingUser && existingUser.type === userType) {
          toast.error(`This email is already registered as a ${userType} account`);
          return;
        }

        const accountId = createAccount({
          email: formData.email,
          phone: formData.phone,
          name: formData.name,
          type: userType,
          businessName: userType === "business" ? formData.businessName : undefined,
          verifiedEmail: false,
          verifiedPhone: false,
        });

        setPendingAccountId(accountId);
        setShowVerification(true);
        
        // Simulate sending verification code
        toast.success(`Verification code sent to ${formData.email}`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Registration failed");
      }
    }
  };

  const handleVerificationComplete = () => {
    verifyAccount(pendingAccountId);
    onAuthenticated();
  };

  const handleBackFromVerification = () => {
    setShowVerification(false);
    setPendingAccountId("");
  };

  const switchVerificationMethod = () => {
    setVerificationType(verificationType === "email" ? "phone" : "email");
    toast.info(`Verification code sent to ${verificationType === "email" ? formData.phone : formData.email}`);
  };

  // Show existing accounts for this email if any
  const existingUser = getUserByEmail(formData.email);
  const hasOtherAccountType = existingUser && existingUser.type !== userType;

  if (showVerification) {
    return (
      <VerificationForm
        email={formData.email}
        phone={formData.phone}
        verificationType={verificationType}
        onVerificationComplete={handleVerificationComplete}
        onBack={handleBackFromVerification}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {hasOtherAccountType && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            {existingUser?.type === "business" ? 
              <Building2 className="h-4 w-4 text-blue-600 mr-2" /> : 
              <Users className="h-4 w-4 text-blue-600 mr-2" />
            }
            <span className="text-sm text-blue-800">
              This email has an existing {existingUser?.type} account
            </span>
          </div>
        </div>
      )}

      {!isLogin && (
        <>
          <div>
            <Label htmlFor="name">{t.name}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">{t.phone}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+254712345678"
              required
            />
          </div>
          
          {userType === "business" && (
            <div>
              <Label htmlFor="businessName">{t.businessName}</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Your business name"
                required
              />
            </div>
          )}
        </>
      )}
      
      <div>
        <Label htmlFor="email">{t.email}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your@email.com"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="password">{t.password}</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Minimum 6 characters"
          required
        />
      </div>

      {!isLogin && (
        <div className="bg-gray-50 border rounded-lg p-4">
          <h4 className="font-medium text-sm mb-3">Choose verification method:</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={verificationType === "email" ? "default" : "outline"}
              size="sm"
              onClick={() => setVerificationType("email")}
              className="flex items-center"
            >
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
            <Button
              type="button"
              variant={verificationType === "phone" ? "default" : "outline"}
              size="sm"
              onClick={() => setVerificationType("phone")}
              className="flex items-center"
            >
              <Phone className="h-3 w-3 mr-1" />
              SMS
            </Button>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full">
        {isLogin ? t.login : t.register}
      </Button>

      <Button
        type="button"
        variant="link"
        onClick={() => setIsLogin(!isLogin)}
        className="w-full"
      >
        {isLogin 
          ? `Need to create a ${userType} account? Register` 
          : `Already have a ${userType} account? Login`
        }
      </Button>
    </form>
  );
};
