# Langebaan Business Chamber Website

React + Vite + Tailwind v4 + Supabase, deployable to Cloudflare Pages.

## Pages
- **Home** – hero, mission, membership tiers (no login required)
- **About** – chamber info, executive team
- **Partners** – public, searchable directory pulled from Supabase `partners` table (no login required)
- **Sign Up** – membership application (embeds a Google Form via `VITE_SIGNUP_FORM_URL`)
- **Contact**
- **Admin** – hidden at `/hidden/admin`. Simple username/password gate (default `Admin` / `Admin`, change via `VITE_ADMIN_USERNAME` / `VITE_ADMIN_PASSWORD`). CRUD for partners, logo upload, CSV export, and quick stats (total partners, partners with logos, breakdown by category).

## Setup

1. **Supabase**
   - Create a project at supabase.com.
   - Run [supabase/schema.sql](supabase/schema.sql) in the SQL editor. This creates the `partners` table, RLS policies, a `partner-logos` storage bucket, and seeds an example "Sparkbit" partner.

2. **Environment variables** — copy `.env.example` to `.env` and fill in:
   - `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` from Supabase project settings → API
   - `VITE_SIGNUP_FORM_URL` — embed URL of your Google Form (use the "Send" → `<>` embed link, ending in `/viewform?embedded=true`)
   - `VITE_ADMIN_USERNAME` / `VITE_ADMIN_PASSWORD` — credentials for `/hidden/admin` (defaults to `Admin` / `Admin` if not set — **change this before going live**)

   Until Supabase is configured, the Partners and Admin pages show a demo "Sparkbit" entry as a placeholder.

3. **Run locally**
   ```
   npm install
   npm run dev
   ```

4. **Deploy to Cloudflare Pages**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Add the same environment variables in the Pages project settings.
   - `public/_redirects` is included so client-side routing works on refresh.

## Adding partners
Log in as an admin and go to `/admin` to add/edit/delete partners, upload logos, and download the full list as CSV.
