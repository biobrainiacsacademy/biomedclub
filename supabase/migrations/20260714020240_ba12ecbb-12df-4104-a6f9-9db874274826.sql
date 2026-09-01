CREATE TABLE public.feedback_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  attending_interest TEXT NOT NULL,
  cant_attend_reason TEXT,
  cant_attend_reason_other TEXT,
  reschedule_preference TEXT,
  topics_interest TEXT,
  additional_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.feedback_responses TO anon, authenticated;
GRANT ALL ON public.feedback_responses TO service_role;

ALTER TABLE public.feedback_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON public.feedback_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
