-- 937th Training Group Database Schema
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/evgbvfinrpcrmzkekvlh/sql

-- ─── Enums ─────────────────────────────────────────────

CREATE TYPE "AdminRole" AS ENUM ('super_admin', 'admin', 'editor');
CREATE TYPE "PageType" AS ENUM ('static', 'dynamic', 'external_link');
CREATE TYPE "NavSection" AS ENUM ('primary', 'more');
CREATE TYPE "AnnouncementPriority" AS ENUM ('normal', 'important', 'urgent');
CREATE TYPE "WorkOrderPriority" AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE "WorkOrderStatus" AS ENUM ('submitted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE "ScheduleType" AS ENUM ('dfac', 'shuttle', 'other');
CREATE TYPE "RopeColor" AS ENUM ('green', 'yellow', 'red');
CREATE TYPE "ProfileType" AS ENUM ('leadership', 'mtl');

-- ─── Admin Users ───────────────────────────────────────

CREATE TABLE "admin_users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'editor',
    "supabase_auth_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");
CREATE UNIQUE INDEX "admin_users_supabase_auth_id_key" ON "admin_users"("supabase_auth_id");

-- ─── Pages (CMS) ──────────────────────────────────────

CREATE TABLE "pages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" JSONB,
    "meta_description" TEXT,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "page_type" "PageType" NOT NULL DEFAULT 'static',
    "external_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "pages_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "pages_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "admin_users"("id") ON DELETE SET NULL
);
CREATE UNIQUE INDEX "pages_slug_key" ON "pages"("slug");

-- ─── Navigation Items ─────────────────────────────────

CREATE TABLE "navigation_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "icon" TEXT,
    "parent_id" UUID,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "section" "NavSection" NOT NULL DEFAULT 'primary',
    "page_id" UUID,
    CONSTRAINT "navigation_items_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "navigation_items_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "navigation_items"("id") ON DELETE SET NULL,
    CONSTRAINT "navigation_items_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE SET NULL
);

-- ─── Announcements ────────────────────────────────────

CREATE TABLE "announcements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "content" JSONB,
    "priority" "AnnouncementPriority" NOT NULL DEFAULT 'normal',
    "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    "publish_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "expire_date" TIMESTAMPTZ,
    "created_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "announcements_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "admin_users"("id") ON DELETE SET NULL
);

-- ─── Leadership Profiles ──────────────────────────────

CREATE TABLE "leadership_profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "unit" TEXT NOT NULL DEFAULT '937th Training Group',
    "bio" JSONB,
    "photo_url" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "profile_type" "ProfileType" NOT NULL DEFAULT 'leadership',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "leadership_profiles_pkey" PRIMARY KEY ("id")
);

-- ─── Contacts (Phone Directory) ───────────────────────

CREATE TABLE "contacts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- ─── Locations ────────────────────────────────────────

CREATE TABLE "locations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" JSONB,
    "map_url" TEXT,
    "latitude" DECIMAL(10, 7),
    "longitude" DECIMAL(10, 7),
    "category" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- ─── Work Orders ──────────────────────────────────────

CREATE TABLE "work_orders" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "reference_number" TEXT NOT NULL,
    "submitter_name" TEXT NOT NULL,
    "submitter_email" TEXT NOT NULL,
    "submitter_phone" TEXT,
    "location" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priority" "WorkOrderPriority" NOT NULL DEFAULT 'medium',
    "description" TEXT NOT NULL,
    "status" "WorkOrderStatus" NOT NULL DEFAULT 'submitted',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "work_orders_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "work_orders_reference_number_key" ON "work_orders"("reference_number");

CREATE TABLE "work_order_updates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "work_order_id" UUID NOT NULL,
    "status" "WorkOrderStatus" NOT NULL,
    "notes" TEXT,
    "updated_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "work_order_updates_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "work_order_updates_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE CASCADE,
    CONSTRAINT "work_order_updates_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "admin_users"("id") ON DELETE SET NULL
);

-- ─── Files ────────────────────────────────────────────

CREATE TABLE "files" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "filename" TEXT NOT NULL,
    "storage_path" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size_bytes" BIGINT NOT NULL,
    "uploaded_by" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "files_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "files_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "admin_users"("id") ON DELETE SET NULL
);

-- ─── Schedules ────────────────────────────────────────

CREATE TABLE "schedules" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "schedule_type" "ScheduleType" NOT NULL,
    "content" JSONB NOT NULL,
    "effective_date" DATE NOT NULL,
    "is_current" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- ─── Link Collections ─────────────────────────────────

CREATE TABLE "link_collections" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "link_collections_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "link_collections_slug_key" ON "link_collections"("slug");

CREATE TABLE "link_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "collection_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "link_items_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "link_items_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "link_collections"("id") ON DELETE CASCADE
);

-- ─── Rope Programs ────────────────────────────────────

CREATE TABLE "rope_programs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "rope_color" "RopeColor" NOT NULL,
    "title" TEXT NOT NULL,
    "description" JSONB,
    "requirements" JSONB,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "rope_programs_pkey" PRIMARY KEY ("id")
);

-- ─── Page Views (Analytics) ───────────────────────────

CREATE TABLE "page_views" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "page_path" TEXT NOT NULL,
    "user_agent" TEXT,
    "referrer" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "page_views_page_path_idx" ON "page_views"("page_path");
CREATE INDEX "page_views_created_at_idx" ON "page_views"("created_at");

-- ─── Row Level Security ───────────────────────────────

-- Public read access for public-facing tables
ALTER TABLE "announcements" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "leadership_profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "contacts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "locations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "navigation_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "pages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "schedules" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "link_collections" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "link_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "rope_programs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "work_orders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "work_order_updates" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "files" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "admin_users" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "page_views" ENABLE ROW LEVEL SECURITY;

-- Public SELECT policies (anyone can read public content)
CREATE POLICY "Public read announcements" ON "announcements" FOR SELECT USING (true);
CREATE POLICY "Public read leadership" ON "leadership_profiles" FOR SELECT USING (true);
CREATE POLICY "Public read contacts" ON "contacts" FOR SELECT USING (true);
CREATE POLICY "Public read locations" ON "locations" FOR SELECT USING (true);
CREATE POLICY "Public read navigation" ON "navigation_items" FOR SELECT USING (true);
CREATE POLICY "Public read pages" ON "pages" FOR SELECT USING (true);
CREATE POLICY "Public read schedules" ON "schedules" FOR SELECT USING (true);
CREATE POLICY "Public read link_collections" ON "link_collections" FOR SELECT USING (true);
CREATE POLICY "Public read link_items" ON "link_items" FOR SELECT USING (true);
CREATE POLICY "Public read rope_programs" ON "rope_programs" FOR SELECT USING (true);

-- Public can INSERT work orders (submit forms) and SELECT their own by reference number
CREATE POLICY "Public insert work orders" ON "work_orders" FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read work orders" ON "work_orders" FOR SELECT USING (true);
CREATE POLICY "Public read work order updates" ON "work_order_updates" FOR SELECT USING (true);

-- Public can INSERT page views (analytics tracking)
CREATE POLICY "Public insert page views" ON "page_views" FOR INSERT WITH CHECK (true);

-- Admin full access policies (authenticated users with admin_users record)
-- These use the service_role key on the server side, bypassing RLS
-- For extra safety, add policies for authenticated admins:
CREATE POLICY "Admin full access announcements" ON "announcements" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access leadership" ON "leadership_profiles" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access contacts" ON "contacts" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access locations" ON "locations" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access navigation" ON "navigation_items" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access pages" ON "pages" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access schedules" ON "schedules" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access link_collections" ON "link_collections" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access link_items" ON "link_items" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access rope_programs" ON "rope_programs" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access work_orders" ON "work_orders" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access work_order_updates" ON "work_order_updates" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin full access files" ON "files" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Admin read admin_users" ON "admin_users" FOR SELECT USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
CREATE POLICY "Super admin manage admin_users" ON "admin_users" FOR ALL USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid() AND "role" = 'super_admin'
  )
);
CREATE POLICY "Admin read page_views" ON "page_views" FOR SELECT USING (
  auth.role() = 'authenticated' AND EXISTS (
    SELECT 1 FROM "admin_users" WHERE "supabase_auth_id" = auth.uid()
  )
);
