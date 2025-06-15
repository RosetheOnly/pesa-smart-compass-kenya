
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, CheckCircle, Clock, AlertCircle } from "lucide-react";
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
  const [lastSentMethod, setLastSentMethod] = useState<string>("");
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
      console.log("Sending verification code...", { verificationType, email, phone });
      
      const { data, error } = await supabase.functions.invoke('send-verification', {
        body: {
          email: verificationType === "email" ? email : undefined,
          phone: verificationType === "phone" ? phone : undefined,
          type: verificationType,
        },
      });

      console.log("Function response:", { data, error });

      if (error) {
        console.error("Error sending verification code:", error);
        toast.error("Failed to send verification code. Check console for details.");
        return;
      }

      const target = verificationType === "email" ? email : phone;
      setLastSentMethod(verificationType);
      
      // Show success message
      toast.success(
        `Verification code sent!`,
        {
          description: `Check your ${verificationType === "email" ? "email inbox (including spam)" : "SMS messages"} or browser console`
        }
      );
      
      // Show console instruction
      toast.info(
        "🔍 Check browser console (F12) for your verification code",
        { 
          duration: 10000,
          description: "The code will appear in the Console tab"
        }
      );
      
      startCooldown();
    } catch (error) {
      console.error("Verification send error:", error);
      toast.error("Failed to send verification code. Check console for details.");
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
      console.log("Verifying code...", { otp, verificationType });
      
      const { data, error } = await supabase.functions.invoke('verify-code', {
        body: {
          email: verificationType === "email" ? email : undefined,
          phone: verificationType === "phone" ? phone : undefined,
          code: otp,
          type: verificationType,
        },
      });

      console.log("Verification response:", { data, error });

      if (error) {
        console.error("Error verifying code:", error);
        toast.error("Failed to verify code. Check console for details.");
        return;
      }

      if (data?.success) {
        toast.success("Verification successful!");
        onVerificationComplete();
      } else {
        toast.error(data?.message || "Invalid verification code");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Verification failed. Check console for details.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Auto-send verification code on component mount
  useEffect(() => {
    console.log("VerificationForm mounted, sending code automatically");
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
          {lastSentMethod && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm text-blue-800 font-medium">Code Sent!</span>
              </div>
              <p className="text-xs text-blue-600">
                Check your {verificationType === "email" ? "email (and spam folder)" : "SMS messages"} or press F12 → Console
              </p>
            </div>
          )}

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

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-yellow-800">
                <p className="font-medium mb-1">🔍 Find Your Code</p>
                <p>Press <strong>F12</strong> → Click <strong>Console</strong> tab → Look for your verification code</p>
              </div>
            </div>
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
