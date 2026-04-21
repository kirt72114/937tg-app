-- Migration: Add afscs table
-- Run once in Supabase SQL Editor after applying init.sql.
-- Safe to re-run: uses IF NOT EXISTS / IF NOT EXISTS CREATE POLICY is not
-- supported, so policy creation is guarded via a PL/pgSQL block.

CREATE TABLE IF NOT EXISTS "afscs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "afscs_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "afscs_code_key" UNIQUE ("code")
);

ALTER TABLE "afscs" ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'afscs' AND policyname = 'Public read afscs'
  ) THEN
    CREATE POLICY "Public read afscs" ON "afscs"
      FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'afscs' AND policyname = 'Admin full access afscs'
  ) THEN
    CREATE POLICY "Admin full access afscs" ON "afscs" FOR ALL USING (
      auth.role() = 'authenticated' AND EXISTS (
        SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
      )
    );
  END IF;
END
$$;
