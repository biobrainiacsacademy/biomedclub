DROP FUNCTION IF EXISTS public.register_biomed_meeting(text, text, text);

CREATE OR REPLACE FUNCTION public.register_biomed_meeting(_first_name text, _last_name text, _school_id text, _comments text DEFAULT NULL)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  submission_id uuid;
  clean_id text := trim(_school_id);
  clean_comments text := nullif(trim(coalesce(_comments, '')), '');
BEGIN
  IF _first_name IS NULL OR length(trim(_first_name)) NOT BETWEEN 1 AND 100
     OR _last_name IS NULL OR length(trim(_last_name)) NOT BETWEEN 1 AND 100
     OR clean_id IS NULL OR clean_id !~ '^[A-Za-z0-9]{1,40}$'
     OR length(coalesce(clean_comments, '')) > 1000 THEN
    RAISE EXCEPTION 'Please enter your first name, last name, and a valid School ID.';
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended(lower(clean_id), 0));
  IF (SELECT count(*) FROM public.registrations WHERE lower(school_id) = lower(clean_id)
      AND event_name = 'BioMed Club, October 26, 2026'
      AND created_at > now() - interval '1 hour') >= 5 THEN
    RAISE EXCEPTION 'Too many registrations. Please try again later.';
  END IF;
  INSERT INTO public.registrations(first_name, last_name, school_id, event_name, questions)
  VALUES (trim(_first_name), trim(_last_name), clean_id, 'BioMed Club, October 26, 2026', clean_comments)
  RETURNING id INTO submission_id;
  RETURN submission_id;
END;
$$;

REVOKE ALL ON FUNCTION public.register_biomed_meeting(text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.register_biomed_meeting(text, text, text, text) TO anon, authenticated, service_role;