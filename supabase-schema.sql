-- ==============================================================================
-- DHAROVAR HOUSE - Supabase Database Schema & RLS Policies
-- Run this entire script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Ensure table 'welfare' exists with TEXT primary key
CREATE TABLE IF NOT EXISTS public.welfare (
  id TEXT PRIMARY KEY,
  school_name TEXT NOT NULL,
  project_title TEXT NOT NULL,
  impact_metrics TEXT NOT NULL,
  cover_image TEXT,
  event_photos TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  partner_tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- If the table already existed with a UUID id, you can alter it or recreate it:
-- ALTER TABLE public.welfare ALTER COLUMN id TYPE TEXT;

-- 2. Ensure table 'publications' exists with TEXT primary key
CREATE TABLE IF NOT EXISTS public.publications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  cover_image TEXT,
  video_file TEXT,
  excerpt TEXT NOT NULL,
  body_html TEXT NOT NULL,
  author TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- If the table already existed with a UUID id, you can alter it or recreate it:
-- ALTER TABLE public.publications ALTER COLUMN id TYPE TEXT;

-- 3. Enable Row Level Security (RLS) on both tables
ALTER TABLE public.welfare ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for 'welfare'
-- Since admin authentication is client-side, the anon role needs full CRUD access.
DROP POLICY IF EXISTS "Allow anon select welfare" ON public.welfare;
CREATE POLICY "Allow anon select welfare"
ON public.welfare FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow anon insert welfare" ON public.welfare;
CREATE POLICY "Allow anon insert welfare"
ON public.welfare FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon update welfare" ON public.welfare;
CREATE POLICY "Allow anon update welfare"
ON public.welfare FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon delete welfare" ON public.welfare;
CREATE POLICY "Allow anon delete welfare"
ON public.welfare FOR DELETE
TO anon, authenticated
USING (true);

-- 5. RLS Policies for 'publications'
DROP POLICY IF EXISTS "Allow anon select publications" ON public.publications;
CREATE POLICY "Allow anon select publications"
ON public.publications FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "Allow anon insert publications" ON public.publications;
CREATE POLICY "Allow anon insert publications"
ON public.publications FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon update publications" ON public.publications;
CREATE POLICY "Allow anon update publications"
ON public.publications FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon delete publications" ON public.publications;
CREATE POLICY "Allow anon delete publications"
ON public.publications FOR DELETE
TO anon, authenticated
USING (true);
