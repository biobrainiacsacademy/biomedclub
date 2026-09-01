
-- =========================================================
-- 1) Roles system + admin read policies
-- =========================================================
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- =========================================================
-- 2) Validation helpers (immutable) for use in WITH CHECK
-- =========================================================
CREATE OR REPLACE FUNCTION public.is_valid_email(_email text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT _email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
     AND length(_email) BETWEEN 3 AND 255
$$;

-- =========================================================
-- 3) Replace permissive INSERT policies with validated ones,
--    and add admin SELECT policies
-- =========================================================

-- registrations
DROP POLICY IF EXISTS "Anyone can submit registrations" ON public.registrations;
CREATE POLICY "Anyone can submit registrations"
  ON public.registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(first_name) BETWEEN 1 AND 100
    AND length(last_name) BETWEEN 1 AND 100
    AND public.is_valid_email(email)
    AND length(grade) BETWEEN 1 AND 20
    AND length(school) BETWEEN 1 AND 200
    AND (how_heard IS NULL OR length(how_heard) <= 100)
    AND (questions IS NULL OR length(questions) <= 3000)
    AND (parent_name IS NULL OR length(parent_name) <= 200)
    AND (parent_email IS NULL OR public.is_valid_email(parent_email))
  );

DROP POLICY IF EXISTS "Admins can read registrations" ON public.registrations;
CREATE POLICY "Admins can read registrations"
  ON public.registrations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- memberships
DROP POLICY IF EXISTS "Anyone can submit memberships" ON public.memberships;
CREATE POLICY "Anyone can submit memberships"
  ON public.memberships FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(first_name) BETWEEN 1 AND 100
    AND length(last_name) BETWEEN 1 AND 100
    AND length(grade) BETWEEN 1 AND 20
    AND public.is_valid_email(school_email)
  );

DROP POLICY IF EXISTS "Admins can read memberships" ON public.memberships;
CREATE POLICY "Admins can read memberships"
  ON public.memberships FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- reviews
DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.reviews;
CREATE POLICY "Anyone can submit reviews"
  ON public.reviews FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    rating BETWEEN 1 AND 5
    AND length(feedback) BETWEEN 1 AND 3000
    AND length(favorite_lesson) BETWEEN 1 AND 300
    AND length(would_recommend) BETWEEN 1 AND 20
    AND (name IS NULL OR length(name) <= 100)
  );

DROP POLICY IF EXISTS "Admins can read reviews" ON public.reviews;
CREATE POLICY "Admins can read reviews"
  ON public.reviews FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- newsletter_subscribers
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (public.is_valid_email(email));

DROP POLICY IF EXISTS "Admins can read subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Admins can read subscribers"
  ON public.newsletter_subscribers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- author_applications
DROP POLICY IF EXISTS "Anyone can submit author applications" ON public.author_applications;
CREATE POLICY "Anyone can submit author applications"
  ON public.author_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND public.is_valid_email(email)
    AND length(high_school) BETWEEN 1 AND 200
    AND length(grade) BETWEEN 1 AND 20
    AND length(introduction) BETWEEN 1 AND 3000
    AND length(how_heard) BETWEEN 1 AND 200
    AND (comments IS NULL OR length(comments) <= 3000)
  );

DROP POLICY IF EXISTS "Admins can read author applications" ON public.author_applications;
CREATE POLICY "Admins can read author applications"
  ON public.author_applications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- poll_responses
DROP POLICY IF EXISTS "Anyone can submit poll responses" ON public.poll_responses;
CREATE POLICY "Anyone can submit poll responses"
  ON public.poll_responses FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(question) BETWEEN 1 AND 500
    AND length(answer) BETWEEN 1 AND 500
  );

DROP POLICY IF EXISTS "Admins can read poll responses" ON public.poll_responses;
CREATE POLICY "Admins can read poll responses"
  ON public.poll_responses FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
