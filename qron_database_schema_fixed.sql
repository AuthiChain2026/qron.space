-- ============================================
-- QRON Database Schema (FIXED)
-- Version: 2.0.1
-- Run this in Supabase SQL Editor
-- https://supabase.com/dashboard/project/YOUR_PROJECT/sql
-- ============================================
-- ============================================
-- PROFILES TABLE
-- Extends Supabase auth.users with app data
-- ============================================
create table if not exists public.profiles (
  id UUID references auth.users (id) on delete CASCADE primary key,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  tier TEXT default 'free' check (tier in ('free', 'pro', 'enterprise')),
  generations_used INTEGER default 0,
  generations_limit INTEGER default 10,
  stripe_customer_id TEXT,
  referral_code TEXT unique,
  referred_by UUID references public.profiles (id),
  created_at timestamp with time zone default NOW(),
  updated_at timestamp with time zone default NOW()
);

-- Create index for faster lookups
create index IF not exists idx_profiles_email on public.profiles (email);

create index IF not exists idx_profiles_referral_code on public.profiles (referral_code);

create index IF not exists idx_profiles_tier on public.profiles (tier);

-- ============================================
-- QRONS TABLE
-- Stores all generated QR codes
-- ============================================
create table if not exists public.qrons (
  id TEXT primary key,
  user_id UUID references public.profiles (id) on delete set null,
  -- Core QR data
  mode TEXT not null check (
    mode in (
      'static',
      'stereographic',
      'kinetic',
      'holographic',
      'memory',
      'echo',
      'temporal',
      'reactive',
      'layered',
      'dimensional',
      'living'
    )
  ),
  target_url TEXT not null,
  short_code TEXT unique,
  -- Generated assets
  image_url TEXT not null,
  thumbnail_url TEXT,
  video_url TEXT,
  audio_url TEXT,
  -- Generation metadata
  metadata JSONB default '{}'::jsonb,
  prompt TEXT,
  style TEXT,
  seed INTEGER,
  -- NFT data (Memory mode)
  nft_token_id TEXT,
  nft_contract_address TEXT,
  nft_chain TEXT,
  nft_transaction_hash TEXT,
  -- Visibility and stats
  is_public BOOLEAN default false,
  is_featured BOOLEAN default false,
  scan_count INTEGER default 0,
  download_count INTEGER default 0,
  -- Timestamps
  created_at timestamp with time zone default NOW(),
  updated_at timestamp with time zone default NOW(),
  expires_at timestamp with time zone
);

-- Create indexes for common queries
create index IF not exists idx_qrons_user_id on public.qrons (user_id);

create index IF not exists idx_qrons_mode on public.qrons (mode);

create index IF not exists idx_qrons_created_at on public.qrons (created_at desc);

create index IF not exists idx_qrons_public on public.qrons (is_public)
where
  is_public = true;

create index IF not exists idx_qrons_featured on public.qrons (is_featured)
where
  is_featured = true;

create index IF not exists idx_qrons_short_code on public.qrons (short_code)
where
  short_code is not null;

-- ============================================
-- SCAN EVENTS TABLE
-- Analytics for QR code scans
-- Using gen_random_uuid() instead of uuid_generate_v4()
-- ============================================
create table if not exists public.scan_events (
  id UUID default gen_random_uuid () primary key,
  qron_id TEXT references public.qrons (id) on delete CASCADE,
  -- Scan metadata
  scanned_at timestamp with time zone default NOW(),
  user_agent TEXT,
  ip_hash TEXT,
  -- Geolocation (approximate)
  country_code TEXT,
  region TEXT,
  city TEXT,
  -- Device info
  device_type TEXT check (
    device_type in ('mobile', 'tablet', 'desktop', 'unknown')
  ),
  os TEXT,
  browser TEXT,
  -- Referrer
  referrer_url TEXT
);

create index IF not exists idx_scan_events_qron_id on public.scan_events (qron_id);

create index IF not exists idx_scan_events_scanned_at on public.scan_events (scanned_at desc);

create index IF not exists idx_scan_events_country on public.scan_events (country_code);

-- ============================================
-- REFERRALS TABLE
-- Affiliate/referral tracking
-- ============================================
create table if not exists public.referrals (
  id UUID default gen_random_uuid () primary key,
  referrer_id UUID references public.profiles (id) on delete CASCADE,
  referred_id UUID references public.profiles (id) on delete set null,
  -- Referral details
  code TEXT unique not null,
  commission_rate DECIMAL(4, 3) default 0.300,
  -- Earnings tracking
  total_earnings DECIMAL(12, 2) default 0,
  pending_earnings DECIMAL(12, 2) default 0,
  paid_earnings DECIMAL(12, 2) default 0,
  -- Status
  status TEXT default 'active' check (status in ('active', 'paused', 'terminated')),
  -- Timestamps
  created_at timestamp with time zone default NOW(),
  converted_at timestamp with time zone,
  last_earning_at timestamp with time zone
);

create index IF not exists idx_referrals_code on public.referrals (code);

create index IF not exists idx_referrals_referrer on public.referrals (referrer_id);

create index IF not exists idx_referrals_status on public.referrals (status);

-- ============================================
-- API KEYS TABLE
-- For enterprise/developer API access
-- ============================================
create table if not exists public.api_keys (
  id UUID default gen_random_uuid () primary key,
  user_id UUID references public.profiles (id) on delete CASCADE,
  -- Key data
  name TEXT not null,
  key_hash TEXT not null unique,
  key_prefix TEXT not null,
  -- Permissions and limits
  scopes text[] default array['read', 'generate'],
  rate_limit INTEGER default 100,
  -- Usage tracking
  last_used_at timestamp with time zone,
  total_requests INTEGER default 0,
  -- Status
  is_active BOOLEAN default true,
  expires_at timestamp with time zone,
  -- Timestamps
  created_at timestamp with time zone default NOW()
);

create index IF not exists idx_api_keys_user_id on public.api_keys (user_id);

create index IF not exists idx_api_keys_prefix on public.api_keys (key_prefix);

-- ============================================
-- GENERATION QUEUE TABLE
-- For async generation jobs
-- ============================================
create table if not exists public.generation_queue (
  id UUID default gen_random_uuid () primary key,
  user_id UUID references public.profiles (id) on delete CASCADE,
  qron_id TEXT references public.qrons (id) on delete CASCADE,
  -- Job details
  job_type TEXT not null check (
    job_type in ('video', 'ultrasonic', 'nft_mint', 'batch')
  ),
  status TEXT default 'pending' check (
    status in ('pending', 'processing', 'completed', 'failed')
  ),
  priority INTEGER default 5,
  -- Input/Output
  input_data JSONB not null,
  output_data JSONB,
  error_message TEXT,
  -- Progress tracking
  progress INTEGER default 0,
  -- Timestamps
  created_at timestamp with time zone default NOW(),
  started_at timestamp with time zone,
  completed_at timestamp with time zone
);

create index IF not exists idx_queue_status on public.generation_queue (status)
where
  status in ('pending', 'processing');

create index IF not exists idx_queue_user on public.generation_queue (user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================
-- Enable RLS on all tables
alter table public.profiles ENABLE row LEVEL SECURITY;

alter table public.qrons ENABLE row LEVEL SECURITY;

alter table public.scan_events ENABLE row LEVEL SECURITY;

alter table public.referrals ENABLE row LEVEL SECURITY;

alter table public.api_keys ENABLE row LEVEL SECURITY;

alter table public.generation_queue ENABLE row LEVEL SECURITY;

-- PROFILES POLICIES
create policy "Users can view own profile" on public.profiles for
select
  using (auth.uid () = id);

create policy "Users can update own profile" on public.profiles
for update
  using (auth.uid () = id);

-- QRONS POLICIES
create policy "Users can view own QRONs" on public.qrons for
select
  using (auth.uid () = user_id);

create policy "Anyone can view public QRONs" on public.qrons for
select
  using (is_public = true);

create policy "Users can create QRONs" on public.qrons for INSERT
with
  check (auth.uid () = user_id);

create policy "Users can update own QRONs" on public.qrons
for update
  using (auth.uid () = user_id);

create policy "Users can delete own QRONs" on public.qrons for DELETE using (auth.uid () = user_id);

-- SCAN EVENTS POLICIES
create policy "Anyone can log scans" on public.scan_events for INSERT
with
  check (true);

create policy "Owners can view scan events" on public.scan_events for
select
  using (
    exists (
      select
        1
      from
        public.qrons
      where
        qrons.id = scan_events.qron_id
        and qrons.user_id = auth.uid ()
    )
  );

-- REFERRALS POLICIES
create policy "Users can view own referrals" on public.referrals for
select
  using (auth.uid () = referrer_id);

create policy "Users can create referrals" on public.referrals for INSERT
with
  check (auth.uid () = referrer_id);

-- API KEYS POLICIES
create policy "Users can view own API keys" on public.api_keys for
select
  using (auth.uid () = user_id);

create policy "Users can create API keys" on public.api_keys for INSERT
with
  check (auth.uid () = user_id);

create policy "Users can update own API keys" on public.api_keys
for update
  using (auth.uid () = user_id);

create policy "Users can delete own API keys" on public.api_keys for DELETE using (auth.uid () = user_id);

-- GENERATION QUEUE POLICIES
create policy "Users can view own queue items" on public.generation_queue for
select
  using (auth.uid () = user_id);

create policy "Users can create queue items" on public.generation_queue for INSERT
with
  check (auth.uid () = user_id);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================
-- Function: Handle new user signup
create or replace function public.handle_new_user () RETURNS TRIGGER as $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, referral_code)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    'QRON_' || UPPER(SUBSTRING(MD5(NEW.id::text) FROM 1 FOR 8))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Create profile on user signup
drop trigger IF exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after INSERT on auth.users for EACH row
execute FUNCTION public.handle_new_user ();

-- Function: Increment scan count
create or replace function public.increment_scan_count () RETURNS TRIGGER as $$
BEGIN
  UPDATE public.qrons 
  SET 
    scan_count = scan_count + 1,
    updated_at = NOW()
  WHERE id = NEW.qron_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Update scan count on new scan event
drop trigger IF exists on_scan_event_created on public.scan_events;

create trigger on_scan_event_created
after INSERT on public.scan_events for EACH row
execute FUNCTION public.increment_scan_count ();

-- Function: Update timestamps
create or replace function public.update_updated_at () RETURNS TRIGGER as $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers: Auto-update updated_at
drop trigger IF exists update_profiles_updated_at on public.profiles;

create trigger update_profiles_updated_at BEFORE
update on public.profiles for EACH row
execute FUNCTION public.update_updated_at ();

drop trigger IF exists update_qrons_updated_at on public.qrons;

create trigger update_qrons_updated_at BEFORE
update on public.qrons for EACH row
execute FUNCTION public.update_updated_at ();

-- Function: Check generation limits
create or replace function public.check_generation_limit (user_uuid UUID) RETURNS BOOLEAN as $$
DECLARE
  user_tier TEXT;
  used INTEGER;
  limit_count INTEGER;
BEGIN
  SELECT tier, generations_used, generations_limit 
  INTO user_tier, used, limit_count
  FROM public.profiles 
  WHERE id = user_uuid;
  
  IF user_tier = 'enterprise' THEN
    RETURN TRUE;
  END IF;
  
  RETURN used < limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Increment generation count
create or replace function public.increment_generation_count (user_uuid UUID) RETURNS VOID as $$
BEGIN
  UPDATE public.profiles 
  SET generations_used = generations_used + 1
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Generate short code for QR
create or replace function public.generate_short_code () RETURNS TEXT as $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..7 LOOP
    result := result || SUBSTR(chars, FLOOR(RANDOM() * LENGTH(chars) + 1)::INTEGER, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- GRANTS FOR SERVICE ROLE
-- ============================================
grant USAGE on SCHEMA public to service_role;

grant all on all TABLES in SCHEMA public to service_role;

grant all on all SEQUENCES in SCHEMA public to service_role;

grant
execute on all FUNCTIONS in SCHEMA public to service_role;

-- ============================================
-- DONE! Your QRON database is ready.
-- ============================================
