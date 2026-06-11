-- Run this in the Supabase SQL editor

-- Partners table
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  description text,
  website text,
  phone text,
  email text,
  logo_url text,
  created_at timestamptz not null default now()
);

alter table public.partners enable row level security;

-- Anyone (including anonymous visitors) can view partners
create policy "Partners are publicly viewable"
  on public.partners for select
  using (true);

-- The /hidden/admin area is protected by an app-level username/password
-- (see VITE_ADMIN_USERNAME / VITE_ADMIN_PASSWORD), not Supabase auth, so
-- the anon key needs write access to manage partners.
create policy "Anyone with the anon key can manage partners"
  on public.partners for all
  using (true)
  with check (true);

-- Storage bucket for partner logos
insert into storage.buckets (id, name, public)
values ('partner-logos', 'partner-logos', true)
on conflict (id) do nothing;

create policy "Partner logos are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'partner-logos');

create policy "Anyone with the anon key can manage partner logos"
  on storage.objects for all
  using (bucket_id = 'partner-logos')
  with check (bucket_id = 'partner-logos');

-- Seed example partner (Sparkbit) -- safe to remove/edit
insert into public.partners (name, category, description, website, phone, email, logo_url)
values (
  'Sparkbit',
  'Website Design',
  'Website design and digital services. Contact: Riaan van Graan, 079 520 3989.',
  'https://sparkbit.co.za',
  '079 520 3989',
  'hallo@sparkbit.co.za',
  '/partners/sparkbit.svg'
)
on conflict do nothing;
