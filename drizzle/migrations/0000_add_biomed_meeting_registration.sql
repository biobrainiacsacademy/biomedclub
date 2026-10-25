ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS school_id text;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS event_name text;
ALTER TABLE public.registrations ALTER COLUMN email SET DEFAULT '';
ALTER TABLE public.registrations ALTER COLUMN grade SET DEFAULT 'N/A';
ALTER TABLE public.registrations ALTER COLUMN school SET DEFAULT 'N/A';
CREATE OR REPLACE FUNCTION public.register_biomed_meeting(_first_name text, _last_name text, _school_id text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  submission_id uuid;
  clean_id text := trim(_school_id);
BEGIN
  IF _first_name IS NULL OR length(trim(_first_name)) NOT BETWEEN 1 AND 100
     OR _last_name IS NULL OR length(trim(_last_name)) NOT BETWEEN 1 AND 100
     OR clean_id IS NULL OR clean_id !~ '^[A-Za-z0-9]{1,40}$' THEN
    RAISE EXCEPTION 'Please enter your first name, last name, and a valid School ID.';
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended(lower(clean_id), 0));
  IF (SELECT count(*) FROM public.registrations WHERE lower(school_id) = lower(clean_id)
      AND event_name = 'BioMed Club, October 26, 2026'
      AND created_at > now() - interval '1 hour') >= 5 THEN
    RAISE EXCEPTION 'Too many registrations. Please try again later.';
  END IF;
  INSERT INTO public.registrations(first_name, last_name, school_id, event_name, questions)
  VALUES (trim(_first_name), trim(_last_name), clean_id, 'BioMed Club, October 26, 2026',
    'First in person meeting, October 26, 2026, at lunch. Room 246 (Engineering/CS hallway). Activities: Anatomy Challenge, DNA Challenge, DNA Extraction Lab.')
  RETURNING id INTO submission_id;
  RETURN submission_id;
END;
$$;
REVOKE ALL ON FUNCTION public.register_biomed_meeting(text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.register_biomed_meeting(text, text, text) TO anon, authenticated, service_role;