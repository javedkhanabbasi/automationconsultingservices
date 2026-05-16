-- =====================================================================
-- ACS WEBSITE — SUPABASE SCHEMA
-- Run this entire file in your Supabase SQL Editor on first setup.
-- It creates all tables, indexes, RLS policies, and seeds with existing content.
-- =====================================================================

-- Extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================================
-- CATEGORIES TABLE
-- =====================================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- =====================================================================
-- MEDIA TABLE — uploaded images and assets
-- =====================================================================
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  original_name TEXT,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  alt_text TEXT,
  width INTEGER,
  height INTEGER,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_created ON media(created_at DESC);

-- =====================================================================
-- BLOG POSTS TABLE
-- =====================================================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,                  -- TipTap HTML output
  content_json JSONB,            -- TipTap JSON for editing
  featured_image_url TEXT,
  featured_image_alt TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  category_name TEXT,            -- denormalized for fast reads
  tags TEXT[] DEFAULT '{}',
  author_name TEXT DEFAULT 'Matthew Piwko',
  reading_time TEXT,
  -- SEO fields
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  og_image_url TEXT,
  canonical_url TEXT,
  -- Publishing
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  -- Audit
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);

-- =====================================================================
-- CASE STUDIES TABLE
-- =====================================================================
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_title TEXT,
  description TEXT,
  industry TEXT,
  industry_tag TEXT,
  revenue TEXT,
  region TEXT,
  timeline TEXT,
  headline_metric TEXT,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  results JSONB DEFAULT '[]',            -- [{value, label}]
  tech_stack TEXT[] DEFAULT '{}',
  challenge_heading TEXT,
  challenge_content TEXT,                -- TipTap HTML
  challenge_content_json JSONB,
  solution_heading TEXT,
  solution_content TEXT,
  solution_content_json JSONB,
  solution_steps JSONB DEFAULT '[]',     -- [{num, text}]
  outcome_heading TEXT,
  outcome_content TEXT,
  outcome_content_json JSONB,
  testimonial_quote TEXT,
  testimonial_attribution TEXT,
  testimonial_role TEXT,
  related_slugs TEXT[] DEFAULT '{}',
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  og_image_url TEXT,
  -- Publishing
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_cs_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_cs_status ON case_studies(status);

-- =====================================================================
-- SERVICES TABLE
-- =====================================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_desc TEXT,
  long_desc TEXT,
  features TEXT[] DEFAULT '{}',
  workflow JSONB DEFAULT '[]',            -- [{step, tag}]
  metric_label TEXT,
  metric_value TEXT,
  related_case_study_slug TEXT,
  related_case_study_label TEXT,
  stack TEXT[] DEFAULT '{}',
  faqs JSONB DEFAULT '[]',                -- [{question, answer}]
  featured_image_url TEXT,
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  og_image_url TEXT,
  -- Publishing
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order);

-- =====================================================================
-- PAGES TABLE — for the static marketing pages
-- =====================================================================
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  hero_heading TEXT,
  hero_subheading TEXT,
  content TEXT,                  -- TipTap HTML
  content_json JSONB,
  featured_image_url TEXT,
  sections JSONB DEFAULT '[]',   -- flexible section blocks
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  og_image_url TEXT,
  -- Publishing
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  is_locked BOOLEAN DEFAULT false,  -- lock structural pages (home, layout) from non-admin edits
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);

-- =====================================================================
-- UPDATE TRIGGERS — auto-update updated_at
-- =====================================================================
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_posts ON posts;
CREATE TRIGGER set_timestamp_posts BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_cs ON case_studies;
CREATE TRIGGER set_timestamp_cs BEFORE UPDATE ON case_studies FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_services ON services;
CREATE TRIGGER set_timestamp_services BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_pages ON pages;
CREATE TRIGGER set_timestamp_pages BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_categories ON categories;
CREATE TRIGGER set_timestamp_categories BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- =====================================================================
-- ROW LEVEL SECURITY
-- Public site can READ published rows.
-- Authenticated admins can do EVERYTHING.
-- =====================================================================
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public read: published posts only
CREATE POLICY "public can read published posts" ON posts FOR SELECT USING (status = 'published');
CREATE POLICY "public can read published case studies" ON case_studies FOR SELECT USING (status = 'published');
CREATE POLICY "public can read published services" ON services FOR SELECT USING (status = 'published');
CREATE POLICY "public can read published pages" ON pages FOR SELECT USING (status = 'published');
CREATE POLICY "public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "public can read media" ON media FOR SELECT USING (true);

-- Authenticated users (admins) full access
CREATE POLICY "admins full access posts" ON posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admins full access case studies" ON case_studies FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admins full access services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admins full access pages" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admins full access categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admins full access media" ON media FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================================
-- SEED DATA — categories
-- =====================================================================
INSERT INTO categories (name, slug, description) VALUES
  ('Architecture', 'architecture', 'Workflow and integration architecture'),
  ('CRM', 'crm', 'CRM implementation and migration'),
  ('Methodology', 'methodology', 'Engagement methodology and process'),
  ('Operations', 'operations', 'Operations engineering and monitoring'),
  ('Case study deep dives', 'case-study-deep-dives', 'Behind-the-scenes engagement breakdowns'),
  ('Finance ops', 'finance-ops', 'Finance and revenue operations'),
  ('Engagement model', 'engagement-model', 'How engagements work commercially'),
  ('Tools', 'tools', 'Tool selection and comparison')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================================
-- DONE
-- After running this, create your first admin user via:
-- Supabase Dashboard → Authentication → Users → Add User
-- =====================================================================
