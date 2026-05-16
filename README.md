# Automation Consulting Services — Website + CMS

Next.js 14 site for automationconsultingservices.org with a complete Supabase-backed CMS dashboard.

## What this is

A complete CMS-powered marketing site:
- **Public site** at `/` — homepage, services, CRM pages, case studies, blog, pricing, contact, FAQ, partners, tools
- **Admin dashboard** at `/admin` — full content management for posts, case studies, services, pages, media, categories

Public pages read from Supabase. Admin pages write to Supabase. Real backend, real auth, real image uploads.

---

## Initial setup (one-time, ~15 minutes)

### Step 1 — Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a free account. Click **New Project**. Choose any name, set a database password (save this), and pick the region closest to your users.

Wait 2 minutes for the project to provision.

### Step 2 — Run the database schema

In your Supabase project, click **SQL Editor** in the left sidebar.

Open the file `supabase/schema.sql` from this project. Copy all its contents.

Paste into the SQL Editor and click **Run**.

This creates all tables (posts, case_studies, services, pages, categories, media), indexes, security policies, and seeds 8 default categories.

### Step 3 — Create a storage bucket for images

In Supabase, click **Storage** in the left sidebar.

Click **New bucket**. Name it exactly `media`. Toggle **Public bucket** ON. Click **Create bucket**.

### Step 4 — Create your admin user

In Supabase, click **Authentication** → **Users** → **Add user** → **Create new user**.

Enter Matt's email and a strong password. Toggle **Auto Confirm User** ON. Click **Create user**.

You can add more admin users later through the same screen.

### Step 5 — Copy your API keys

In Supabase, click **Project Settings** (gear icon) → **API**.

You will see three values you need:
→ **Project URL** (looks like `https://abcdef.supabase.co`)
→ **anon public** key (long string)
→ **service_role** key (longer string, marked secret — keep private)

### Step 6 — Set up environment variables

In this project folder, copy `.env.example` to `.env.local`:

```
cp .env.example .env.local
```

Open `.env.local` and paste in the three values from Step 5:

```
NEXT_PUBLIC_SUPABASE_URL=https://abcdef.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=media
```

### Step 7 — Install dependencies

```
npm install
```

### Step 8 — Seed the database with starter content

```
npm run seed
```

This pushes the 4 services, 7 case studies, 10 blog posts, and 5 marketing pages into Supabase. The public site now has content on day one.

### Step 9 — Start the dev server

```
npm run dev
```

Open `http://localhost:3000` — the public site.
Open `http://localhost:3000/admin` — the admin dashboard (requires login).

---

## Daily use

### Write a blog post

1. Go to `/admin/blog` → **+ New post**
2. Fill in title (URL slug auto-generates)
3. Write in the rich text editor — use H2/H3/H4 buttons for headings, upload images via toolbar
4. Add excerpt, choose category, add tags
5. Upload featured image on the right
6. Fill in SEO panel (meta title, meta description, focus keyword)
7. Toggle **Featured** if it should appear at top of blog index
8. Click **Save draft** or **Publish**

### Add a case study

1. Go to `/admin/case-studies` → **+ New case study**
2. Fill in title, industry, revenue, region, timeline, headline metric
3. Add results (key/value pairs)
4. Write Challenge, Solution, Outcome sections in the rich text editor
5. Add solution steps as a numbered list
6. Add testimonial quote with attribution
7. Publish

### Edit a service page

1. Go to `/admin/services` → click any service
2. Update name, descriptions, features (one per line), workflow steps, FAQs
3. Save changes

### Upload images

1. Go to `/admin/media`
2. Click **+ Upload files**
3. Add alt text for each image
4. Click **Copy URL** to use elsewhere

### Manage categories

1. Go to `/admin/categories`
2. Add new categories at the top
3. Edit names inline
4. Delete with the Delete button

---

## Deployment to Vercel

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com), click **Add New Project**, import the repo
3. In **Environment Variables** add the same values from `.env.local`:
   → `NEXT_PUBLIC_SUPABASE_URL`
   → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   → `SUPABASE_SERVICE_ROLE_KEY`
   → `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` = `media`
4. Click **Deploy**
5. After deploy, point your domain `automationconsultingservices.org` at Vercel

The admin dashboard at `yourdomain.com/admin` works the same as locally. The same email/password logs in.

---

## Tech stack

→ Next.js 14 App Router
→ TypeScript strict
→ Tailwind CSS with locked brand palette
→ Supabase Postgres + Auth + Storage
→ TipTap rich text editor
→ Inter font via stylesheet

## Brand palette (locked)

Only four colors anywhere:
→ Lime `#9ccc65`
→ Lime-dark `#7ed957`
→ White `#FFFFFF`
→ Black `#000000`

## Database structure

→ `categories` — blog post categories
→ `media` — uploaded image metadata
→ `posts` — blog posts with TipTap HTML content
→ `case_studies` — case studies with structured sections
→ `services` — service pages
→ `pages` — static marketing pages

Row Level Security: public reads only published rows. Authenticated admins can do anything.

## Adding more admin users

In Supabase Dashboard → Authentication → Users → Add User. New users can log in at `/admin/login` immediately.

There is no signup flow on the public site — admin users are added by you.

## Troubleshooting

**"Invalid login credentials"** — User does not exist in Supabase Auth, or password is wrong.

**"Failed to fetch" on the dashboard** — Check `.env.local` has the right Supabase URL and anon key. Restart `npm run dev` after changing env vars.

**Images don't upload** — Check the `media` storage bucket exists and is public. Check `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` in `.env.local` is `media`.

**Seed script fails** — Make sure `.env.local` has `SUPABASE_SERVICE_ROLE_KEY`. The seed uses service role to bypass RLS.

**Public pages show empty content** — Run `npm run seed`.

## License

Proprietary. All rights reserved.
