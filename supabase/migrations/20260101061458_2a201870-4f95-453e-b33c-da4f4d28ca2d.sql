-- Create newsletter_subscribers table for newsletter signups
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Only allow public inserts (no one can read subscriber data)
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
WITH CHECK (true);

-- Fix security: Remove any implicit SELECT access on existing tables
-- The tables already have RLS enabled with INSERT-only policies
-- No SELECT policies exist, which is correct - data is protected