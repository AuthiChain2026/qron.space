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
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  generations_used INTEGER DEFAULT 0,
  generations_limit INTEGER DEFAULT 10,
  stripe_customer_id TEXT,
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON public.profiles(referral_code);
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON public.profiles(tier);

-- ============================================
-- QRONS TABLE
-- Stores all generated QR codes
-- ============================================
CREATE TABLE IF NOT EXISTS public.qrons (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Core QR data
  mode TEXT NOT NULL CHECK (mode IN (
    'static', 'stereographic', 'kinetic', 'holographic', 
    'memory', 'echo', 'temporal', 'reactive', 
    'layered', 'dimensional', 'living'
  )),
  target_url TEXT NOT NULL,
  short_code TEXT UNIQUE,
  
  -- Generated assets
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  video_url TEXT,
  audio_url TEXT,
  
  -- Generation metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  prompt TEXT,
  style TEXT,
  seed INTEGER,
  
  -- NFT data (Memory mode)
  nft_token_id TEXT,
  nft_contract_address TEXT,
  nft_chain TEXT,
  nft_transaction_hash TEXT,
  
  -- Visibility and stats
  is_public BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  scan_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_qrons_user_id ON public.qrons(user_id);
CREATE INDEX IF NOT EXISTS idx_qrons_mode ON public.qrons(mode);
CREATE INDEX IF NOT EXISTS idx_qrons_created_at ON public.qrons(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qrons_public ON public.qrons(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_qrons_featured ON public.qrons(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_qrons_short_code ON public.qrons(short_code) WHERE short_code IS NOT NULL;

-- ============================================
-- SCAN EVENTS TABLE
-- Analytics for QR code scans
-- Using gen_random_uuid() instead of uuid_generate_v4()
-- ============================================
CREATE TABLE IF NOT EXISTS public.scan_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qron_id TEXT REFERENCES public.qrons(id) ON DELETE CASCADE,
  
  -- Scan metadata
  scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_hash TEXT,
  
  -- Geolocation (approximate)
  country_code TEXT,
  region TEXT,
  city TEXT,
  
  -- Device info
  device_type TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop', 'unknown')),
  os TEXT,
  browser TEXT,
  
  -- Referrer
  referrer_url TEXT
);

CREATE INDEX IF NOT EXISTS idx_scan_events_qron_id ON public.scan_events(qron_id);
CREATE INDEX IF NOT EXISTS idx_scan_events_scanned_at ON public.scan_events(scanned_at DESC);
CREATE INDEX IF NOT EXISTS idx_scan_events_country ON public.scan_events(country_code);

-- ============================================
-- REFERRALS TABLE
-- Affiliate/referral tracking
-- ============================================
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  
  -- Referral details
  code TEXT UNIQUE NOT NULL,
  commission_rate DECIMAL(4,3) DEFAULT 0.300,
  
  -- Earnings tracking
  total_earnings DECIMAL(12,2) DEFAULT 0,
  pending_earnings DECIMAL(12,2) DEFAULT 0,
  paid_earnings DECIMAL(12,2) DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'terminated')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  converted_at TIMESTAMP WITH TIME ZONE,
  last_earning_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_referrals_code ON public.referrals(code);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON public.referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON public.referrals(status);

-- ============================================
-- API KEYS TABLE
-- For enterprise/developer API access
-- ============================================
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Key data
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL,
  
  -- Permissions and limits
  scopes TEXT[] DEFAULT ARRAY['read', 'generate'],
  rate_limit INTEGER DEFAULT 100,
  
  -- Usage tracking
  last_used_at TIMESTAMP WITH TIME ZONE,
  total_requests INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_prefix ON public.api_keys(key_prefix);

-- ============================================
-- GENERATION QUEUE TABLE
-- For async generation jobs
-- ============================================
CREATE TABLE IF NOT EXISTS public.generation_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  qron_id TEXT REFERENCES public.qrons(id) ON DELETE CASCADE,
  
  -- Job details
  job_type TEXT NOT NULL CHECK (job_type IN ('video', 'ultrasonic', 'nft_mint', 'batch')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  priority INTEGER DEFAULT 5,
  
  -- Input/Output
  input_data JSONB NOT NULL,
  output_data JSONB,
  error_message TEXT,
  
  -- Progress tracking
  progress INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_queue_status ON public.generation_queue(status) WHERE status IN ('pending', 'processing');
CREATE INDEX IF NOT EXISTS idx_queue_user ON public.generation_queue(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qrons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_queue ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- QRONS POLICIES
CREATE POLICY "Users can view own QRONs" ON public.qrons
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public QRONs" ON public.qrons
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can create QRONs" ON public.qrons
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own QRONs" ON public.qrons
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own QRONs" ON public.qrons
  FOR DELETE USING (auth.uid() = user_id);

-- SCAN EVENTS POLICIES
CREATE POLICY "Anyone can log scans" ON public.scan_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Owners can view scan events" ON public.scan_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.qrons 
      WHERE qrons.id = scan_events.qron_id 
      AND qrons.user_id = auth.uid()
    )
  );

-- REFERRALS POLICIES
CREATE POLICY "Users can view own referrals" ON public.referrals
  FOR SELECT USING (auth.uid() = referrer_id);

CREATE POLICY "Users can create referrals" ON public.referrals
  FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- API KEYS POLICIES
CREATE POLICY "Users can view own API keys" ON public.api_keys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create API keys" ON public.api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own API keys" ON public.api_keys
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own API keys" ON public.api_keys
  FOR DELETE USING (auth.uid() = user_id);

-- GENERATION QUEUE POLICIES
CREATE POLICY "Users can view own queue items" ON public.generation_queue
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create queue items" ON public.generation_queue
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function: Handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: Increment scan count
CREATE OR REPLACE FUNCTION public.increment_scan_count()
RETURNS TRIGGER AS $$
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
DROP TRIGGER IF EXISTS on_scan_event_created ON public.scan_events;
CREATE TRIGGER on_scan_event_created
  AFTER INSERT ON public.scan_events
  FOR EACH ROW EXECUTE FUNCTION public.increment_scan_count();

-- Function: Update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers: Auto-update updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_qrons_updated_at ON public.qrons;
CREATE TRIGGER update_qrons_updated_at
  BEFORE UPDATE ON public.qrons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Function: Check generation limits
CREATE OR REPLACE FUNCTION public.check_generation_limit(user_uuid UUID)
RETURNS BOOLEAN AS $$
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
CREATE OR REPLACE FUNCTION public.increment_generation_count(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles 
  SET generations_used = generations_used + 1
  WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: Generate short code for QR
CREATE OR REPLACE FUNCTION public.generate_short_code()
RETURNS TEXT AS $$
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

GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- ============================================
-- DONE! Your QRON database is ready.
-- ============================================
