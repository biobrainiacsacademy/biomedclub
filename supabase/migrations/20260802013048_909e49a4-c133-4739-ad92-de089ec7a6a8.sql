DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback_responses;

CREATE POLICY "Anyone can submit feedback"
ON public.feedback_responses
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(attending_interest) >= 1 AND length(attending_interest) <= 200
  AND (cant_attend_reason IS NULL OR length(cant_attend_reason) <= 300)
  AND (cant_attend_reason_other IS NULL OR length(cant_attend_reason_other) <= 1000)
  AND (reschedule_preference IS NULL OR length(reschedule_preference) <= 300)
  AND (topics_interest IS NULL OR length(topics_interest) <= 1000)
  AND (additional_feedback IS NULL OR length(additional_feedback) <= 3000)
);

CREATE POLICY "Admins can read feedback"
ON public.feedback_responses
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));