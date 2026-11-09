CREATE OR REPLACE FUNCTION public.join_biobrainiacs(_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_email text := lower(btrim(_email));
BEGIN
  IF normalized_email IS NULL OR length(normalized_email) > 255 OR NOT public.is_valid_email(normalized_email) THEN
    RAISE EXCEPTION 'Please enter a valid email address';
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended('join_biobrainiacs:' || normalized_email, 0));
  IF NOT EXISTS (SELECT 1 FROM public.registrations WHERE email = normalized_email AND event_name = 'BioBrainiacs free lessons') THEN
    INSERT INTO public.registrations (first_name, last_name, email, event_name, how_heard)
    VALUES ('', '', normalized_email, 'BioBrainiacs free lessons', 'Website join popup');
  END IF;
END;
$$;
REVOKE ALL ON FUNCTION public.join_biobrainiacs(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.join_biobrainiacs(text) TO anon, authenticated, service_role;