-- Migration: Add logo_url column to squadrons
-- Run in Supabase SQL Editor. Safe to re-run.

ALTER TABLE "squadrons"
  ADD COLUMN IF NOT EXISTS "logo_url" TEXT;
