
CREATE OR REPLACE FUNCTION public.is_valid_email(_email text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT _email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
     AND length(_email) BETWEEN 3 AND 255
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.is_valid_email(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_valid_email(text) TO anon, authenticated, service_role;
