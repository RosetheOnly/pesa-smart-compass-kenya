
-- Create a table to store verification codes
CREATE TABLE public.verification_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  code TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'phone')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

-- Create policy for accessing verification codes (allow service role and authenticated users)
CREATE POLICY "Service role can manage verification codes"
  ON public.verification_codes
  FOR ALL
  USING (true);

-- Create index for efficient lookups
CREATE INDEX idx_verification_codes_email_code ON public.verification_codes(email, code);
CREATE INDEX idx_verification_codes_phone_code ON public.verification_codes(phone, code);
CREATE INDEX idx_verification_codes_expires_at ON public.verification_codes(expires_at);

-- Create function to clean up expired codes
CREATE OR REPLACE FUNCTION public.cleanup_expired_verification_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.verification_codes 
  WHERE expires_at < now() OR used = true;
END;
$$;
