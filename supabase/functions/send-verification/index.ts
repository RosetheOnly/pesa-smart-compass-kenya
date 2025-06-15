
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
      // Use Supabase Auth to send email verification
      const { error: emailError } = await supabaseClient.auth.admin.generateLink({
        type: 'signup',
        email: email,
        options: {
          data: {
            verification_code: code,
          }
        }
      });

      if (emailError) {
        console.error("Email sending error:", emailError);
        // For demo purposes, we'll continue even if email fails
        console.log(`Verification code for ${email}: ${code}`);
      }
    }

    if (type === "phone" && phone) {
      // For SMS, you would integrate with a service like Twilio
      // For now, just log the code
      console.log(`SMS verification code for ${phone}: ${code}`);
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
