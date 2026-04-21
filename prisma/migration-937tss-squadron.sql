-- Migration: Insert 937th Training Support Squadron.
-- Run in Supabase SQL Editor. Safe to re-run: INSERT ... ON CONFLICT DO NOTHING.

INSERT INTO "squadrons" ("unit", "motto", "mission", "vision", "afscs", "sort_order")
VALUES (
  '937th Training Support Squadron',
  'Leading the Best',
  'Outfitting Warrior Medics to enable initial & adaptive expeditionary training',
  'Our Support readies medics for Great Power Competition',
  '[]'::jsonb,
  4
)
ON CONFLICT ("unit") DO NOTHING;
