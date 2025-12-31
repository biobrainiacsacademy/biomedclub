-- Create table for session registrations
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  grade TEXT NOT NULL,
  school TEXT NOT NULL,
  parent_name TEXT,
  parent_email TEXT,
  how_heard TEXT,
  questions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for ratings/reviews
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  name TEXT,
  favorite_lesson TEXT NOT NULL,
  would_recommend TEXT NOT NULL,
  feedback TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for author applications
CREATE TABLE public.author_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  grade TEXT NOT NULL,
  high_school TEXT NOT NULL,
  introduction TEXT NOT NULL,
  how_heard TEXT NOT NULL,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.author_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public forms)
CREATE POLICY "Anyone can submit registrations" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit author applications" ON public.author_applications FOR INSERT WITH CHECK (true);