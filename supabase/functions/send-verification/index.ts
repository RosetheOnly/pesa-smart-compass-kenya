
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerificationRequest {
  email?: string;
  phone?: string;
  type: "email" | "phone";
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { email, phone, type }: VerificationRequest = await req.json();

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration to 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    // Store the verification code in the database
    const { error: dbError } = await supabaseClient
      .from("verification_codes")
      .insert({
        email: type === "email" ? email : null,
        phone: type === "phone" ? phone : null,
        code,
        type,
        expires_at: expiresAt,
      });

    if (dbError) {
      console.error("Database error:", dbError);
      throw dbError;
    }

    if (type === "email" && email) {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      
      if (resendApiKey) {
        // Use Resend to send email
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Pesa Smart Plan <noreply@resend.dev>",
            to: [email],
            subject: "Your Verification Code",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2563eb; text-align: center;">Email Verification</h2>
                <p>Your verification code is:</p>
                <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">
                  ${code}
                </div>
                <p style="color: #666; font-size: 14px;">This code will expire in 5 minutes.</p>
                <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          console.error("Resend API error:", await emailResponse.text());
          // Fallback to console log for demo
          console.log(`Verification code for ${email}: ${code}`);
        } else {
          console.log("Email sent successfully via Resend");
        }
      } else {
        // No Resend API key, log to console for demo
        console.log(`Verification code for ${email}: ${code}`);
      }
    }

    if (type === "phone" && phone) {
      const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
      const twilioToken = Deno.env.get("TWILIO_AUTH_TOKEN");
      const twilioPhone = Deno.env.get("TWILIO_PHONE_NUMBER");
      
      if (twilioSid && twilioToken && twilioPhone) {
        // Use Twilio to send SMS
        const auth = btoa(`${twilioSid}:${twilioToken}`);
        
        const smsResponse = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            From: twilioPhone,
            To: phone,
            Body: `Your Pesa Smart Plan verification code is: ${code}. This code expires in 5 minutes.`,
          }),
        });

        if (!smsResponse.ok) {
          console.error("Twilio API error:", await smsResponse.text());
          // Fallback to console log for demo
          console.log(`SMS verification code for ${phone}: ${code}`);
        } else {
          console.log("SMS sent successfully via Twilio");
        }
      } else {
        // No Twilio credentials, log to console for demo
        console.log(`SMS verification code for ${phone}: ${code}`);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Verification code sent" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-verification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
