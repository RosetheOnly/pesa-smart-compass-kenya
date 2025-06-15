
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, CheckCircle, Clock } from "lucide-react";

interface VerificationFormProps {
  email: string;
  phone: string;
  verificationType: "email" | "phone";
  onVerificationComplete: () => void;
  onBack: () => void;
}

export const VerificationForm = ({ 
  email, 
  phone, 
  verificationType, 
  onVerificationComplete, 
  onBack 
}: VerificationFormProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const { t } = useLanguage();

  const startCooldown = () => {
    setResendCooldown(60);
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = () => {
    // Simulate sending OTP
    console.log(`Resending OTP to ${verificationType === "email" ? email : phone}`);
    toast.success(`Verification code sent to ${verificationType === "email" ? email : phone}`);
    startCooldown();
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast.error("Please enter complete verification code");
      return;
    }

    setIsVerifying(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      if (otp === "123456" || otp.length === 6) { // Accept any 6-digit code for demo
        toast.success("Verification successful!");
        onVerificationComplete();
      } else {
        toast.error("Invalid verification code");
      }
      setIsVerifying(false);
    }, 1500);
  };

  // Auto-start cooldown on component mount
  useState(() => {
    startCooldown();
  });

  return (
    <Card className="shadow-2xl border-0 rounded-3xl max-w-md mx-auto">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          {verificationType === "email" ? 
            <Mail className="h-8 w-8 text-white" /> : 
            <Phone className="h-8 w-8 text-white" />
          }
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          {t.verify} Your {verificationType === "email" ? t.email : t.phone}
        </CardTitle>
        <p className="text-gray-600 mt-2">
          {t.enterCode}{" "}
          <span className="font-semibold">
            {verificationType === "email" ? email : phone}
          </span>
        </p>
      </CardHeader>
      
      <CardContent className="px-8 pb-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="otp" className="text-center block mb-4">
              {t.verificationCode}
            </Label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Badge variant="outline" className="text-green-600 border-green-300">
              <Clock className="h-3 w-3 mr-1" />
              Code expires in 10 minutes
            </Badge>
          </div>

          <Button 
            onClick={handleVerifyOTP}
            disabled={otp.length !== 6 || isVerifying}
            className="w-full"
          >
            {isVerifying ? t.verifying : t.verify}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Didn't receive the code?
            </p>
            <Button
              variant="link"
              onClick={handleResendCode}
              disabled={resendCooldown > 0}
              className="text-blue-600 hover:text-blue-700"
            >
              {resendCooldown > 0 
                ? `Resend in ${resendCooldown}s` 
                : t.resendCode
              }
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={onBack}
            className="w-full"
          >
            Back to Registration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
