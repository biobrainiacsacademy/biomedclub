CREATE TABLE public.club_day_signups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  grade text NOT NULL,
  school_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT SELECT ON public.club_day_signups TO authenticated;
GRANT INSERT ON public.club_day_signups TO anon, authenticated;
GRANT ALL ON public.club_day_signups TO service_role;
ALTER TABLE public.club_day_signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit club day signups" ON public.club_day_signups
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(first_name) >= 1 AND length(first_name) <= 100
    AND length(last_name) >= 1 AND length(last_name) <= 100
    AND grade IN ('9','10','11','12')
    AND length(school_id) >= 1 AND length(school_id) <= 50
  );
CREATE POLICY "Admins can read club day signups" ON public.club_day_signups
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));