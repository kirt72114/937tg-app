-- 937th Training Group — Pages CMS seed
-- Migrates hardcoded static pages into the admin-managed "pages" table.
-- Safe to re-run: each INSERT uses ON CONFLICT (slug) DO UPDATE.
--
-- Run in Supabase SQL Editor after init.sql.

-- ─── AiT Guide ────────────────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'Airmen in Training Guide',
  'ait-guide',
  jsonb_build_object('html', $html$<blockquote><p><strong>Welcome, Airman.</strong> This guide outlines the standards, expectations, and daily life for Airmen in Training at the 937th Training Group. Read it carefully and refer back to it as needed. Your MTL is your primary resource for questions — never hesitate to ask.</p></blockquote><h2>Standards of Conduct</h2><ul><li>Maintain military bearing and professional appearance at all times</li><li>Address all personnel by proper rank and title</li><li>Adhere to curfew times: 2200 (Sun-Thu), 0000 (Fri-Sat)</li><li>No alcohol consumption for students under 21; 21+ must follow base policy</li><li>Report any safety concerns or incidents to your MTL immediately</li><li>Maintain accountability — always sign in/out when leaving the dormitory</li></ul><h2>Daily Schedule</h2><ul><li>0500 — Reveille / Wake up</li><li>0530 — Physical Training (Mon, Wed, Fri)</li><li>0630 — Personal hygiene and room preparation</li><li>0700 — Breakfast at DFAC</li><li>0730 — Formation / Accountability</li><li>0800-1600 — Academic training</li><li>1630 — Return to dormitory / Personal time</li><li>2100 — Room check / Accountability</li><li>2200 — Lights out (weekdays)</li></ul><h2>Uniform Standards</h2><ul><li>OCPs required for all training days unless otherwise directed</li><li>PT gear required for scheduled physical training</li><li>Civilian attire authorized during off-duty hours (must be appropriate)</li><li>Maintain clean, pressed uniforms at all times</li><li>Name tapes, rank, and all required accoutrements properly placed</li><li>Hair must be within Air Force standards at all times</li></ul><h2>Technology &amp; Electronics</h2><ul><li>Cell phones may be used during personal time only</li><li>No phones during formations, classes, or duty hours unless authorized</li><li>No recording devices in classrooms without instructor approval</li><li>Wi-Fi available in dormitory common areas</li><li>Gaming consoles allowed in rooms during personal time</li><li>Social media use must comply with OPSEC and Air Force policy</li></ul><h2>Critical Rules</h2><blockquote><p><strong>Absolutely no fraternization between students and permanent party.</strong></p><p><strong>Zero tolerance for drug use</strong> — random testing is conducted.</p><p><strong>Dormitory rooms are subject to inspection at any time.</strong></p><p><strong>Off-limits areas and establishments are posted</strong> — compliance is mandatory.</p><p><strong>Battle buddy system required when traveling off-base after dark.</strong></p></blockquote>$html$),
  'Essential information for all AiT students at the 937th Training Group.',
  true,
  'dynamic',
  100
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();
