
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  const [isSending, setIsSending] = useState(false);
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

  const sendVerificationCode = async () => {
    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-verification', {
        body: {
          email: verificationType === "email" ? email : undefined,
          phone: verificationType === "phone" ? phone : undefined,
          type: verificationType,
        },
      });

      if (error) {
        console.error("Error sending verification code:", error);
        toast.error("Failed to send verification code");
        return;
      }

      console.log("Verification code sent successfully");
      toast.success(`Verification code sent to ${verificationType === "email" ? email : phone}`);
      startCooldown();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send verification code");
    } finally {
      setIsSending(false);
    }
  };

  const handleResendCode = () => {
    if (resendCooldown > 0) return;
    sendVerificationCode();
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter complete verification code");
      return;
    }

    setIsVerifying(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('verify-code', {
        body: {
          email: verificationType === "email" ? email : undefined,
          phone: verificationType === "phone" ? phone : undefined,
          code: otp,
          type: verificationType,
        },
      });

      if (error) {
        console.error("Error verifying code:", error);
        toast.error("Failed to verify code");
        return;
      }

      if (data.success) {
        toast.success("Verification successful!");
        onVerificationComplete();
      } else {
        toast.error(data.message || "Invalid verification code");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Auto-send verification code on component mount
  useEffect(() => {
    sendVerificationCode();
  }, []);

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
              Code expires in 5 minutes
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
              disabled={resendCooldown > 0 || isSending}
              className="text-blue-600 hover:text-blue-700"
            >
              {isSending ? "Sending..." :
                resendCooldown > 0 
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
