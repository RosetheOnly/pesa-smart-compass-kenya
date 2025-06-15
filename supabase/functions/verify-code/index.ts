
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyRequest {
  email?: string;
  phone?: string;
  code: string;
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

    const { email, phone, code, type }: VerifyRequest = await req.json();

    // Clean up expired codes first
    await supabaseClient.rpc("cleanup_expired_verification_codes");

    // Find the verification code
    let query = supabaseClient
      .from("verification_codes")
      .select("*")
      .eq("code", code)
      .eq("type", type)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString());

    if (type === "email") {
      query = query.eq("email", email);
    } else {
      query = query.eq("phone", phone);
    }

    const { data: verificationCodes, error: fetchError } = await query;

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      throw fetchError;
    }

    if (!verificationCodes || verificationCodes.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid or expired verification code" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Mark the code as used
    const { error: updateError } = await supabaseClient
      .from("verification_codes")
      .update({ used: true })
      .eq("id", verificationCodes[0].id);

    if (updateError) {
      console.error("Update error:", updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({ success: true, message: "Verification successful" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in verify-code function:", error);
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
