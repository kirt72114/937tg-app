-- Incremental seed: populate the pages library with entries for every
-- existing site page, then link the existing navigation_items to them.
--
-- Use this on a database that already has navigation_items seeded but
-- no rows in the pages table. Idempotent via ON CONFLICT (slug).

-- ─── Pages (CMS Library) ──────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "page_type", "is_published", "sort_order") VALUES
-- Primary nav pages
('Meet Your Leadership',           'leadership',          '{"blocks":[{"type":"roster","display":"leadership-squadrons","filter":{"profileType":"leadership"}}]}'::jsonb, 'The command team of the 937th Training Group at JBSA-Fort Sam Houston, TX.', 'dynamic', true,  2),
('Meet Your MTLs',                  'mtls',                '{"blocks":[{"type":"roster","display":"mtl-cards","filter":{"profileType":"mtl"}}]}'::jsonb, 'Military Training Leaders are the NCOs dedicated to mentoring and developing Airmen in Training.', 'dynamic', true,  3),
('METC',                            'metc',                NULL, 'Information about the Medical Education and Training Campus.',                             'static',  false, 4),
('Important Phone Numbers',         'phone-numbers',       NULL, 'Key phone numbers for the 937th Training Group and base support services.',                'dynamic', false, 5),
('AiT Guide',                       'ait-guide',           NULL, 'Standards, expectations, and guidance for Airmen in Training.',                            'static',  false, 6),
('Area Defense Counsel',            'adc',                 NULL, 'Confidential legal counsel for Airmen facing adverse actions.',                            'static',  false, 7),
('Military OneSource',              'military-onesource',  NULL, 'Access to counseling, financial, legal, and wellness support for service members.',        'static',  false, 8),
('Finance',                         'finance',             NULL, 'Pay, travel, and entitlements support from the base finance office.',                      'static',  false, 9),
('In-Processing',                   'in-processing',       NULL, 'Step-by-step checklist for arriving Airmen.',                                              'static',  false, 10),
('Out-Processing',                  'out-processing',      NULL, 'Step-by-step checklist for departing Airmen.',                                             'static',  false, 11),
('Locations',                       'locations',           NULL, 'Key facilities and locations on and around JBSA-Fort Sam Houston.',                        'dynamic', false, 12),
('Submit a Work Order',             'work-orders',         NULL, 'Submit a maintenance request for the dormitories and 937 TG facilities.',                  'dynamic', false, 13),
-- More section pages
('Work Order Status',               'work-order-status',   NULL, 'Look up the status of a previously submitted work order.',                                 'dynamic', false, 14),
('DFAC Hours',                      'dfac-hours',          NULL, 'Rocco Dining Facility meal hours for weekdays, weekends, and holidays.',                   'static',  false, 15),
('Shuttle Route',                   'shuttle',             NULL, 'JBSA shuttle stops, schedule, and operating hours.',                                       'static',  false, 16),
('Route of March',                  'route-of-march',      NULL, 'Approved formation route from the dormitories to the METC campus.',                        'static',  false, 17),
('Air Force Specialty Codes',       'afscs',               NULL, 'Medical AFSCs trained at the 937th Training Group.',                                       'static',  false, 18),
('Exceptional Family Member Program','efmp',               NULL, 'EFMP services, contacts, and resources for service members and families.',                 'static',  false, 19),
('Airman Leadership Programs',      'leadership-programs', NULL, 'Green, Yellow, and Red Rope program requirements and responsibilities.',                  'static',  false, 20),
('Spartan Flight / CQ',             'spartan-flight',      NULL, 'Charge of Quarters duty details, shifts, and responsibilities.',                           'static',  false, 21),
('SAFEREP',                         'saferep',             NULL, 'Safety reporting program — what to report and how to reach the safety office.',           'static',  false, 22),
('JBSA Connect',                    'jbsa-connect',        NULL, 'Curated links to official JBSA resources and tenant organizations.',                       'static',  false, 23),
('Share This App',                  'share',               NULL, 'Share the 937 TG app with peers and install it on your device.',                           'static',  false, 24),
-- Additional pages not in primary navigation
('Files & Downloads',               'files',               NULL, 'Documents, forms, and resources available for download.',                                  'dynamic', false, 25),
('Links',                           'links',               NULL, 'Curated link collections maintained by the 937 TG admin team.',                            'dynamic', false, 26)
ON CONFLICT ("slug") DO NOTHING;

-- Make sure the Leadership and MTLs pages have roster blocks + are published,
-- even on databases where the rows were inserted earlier with empty content.
UPDATE "pages" SET
  "content"          = '{"blocks":[{"type":"roster","display":"leadership-squadrons","filter":{"profileType":"leadership"}}]}'::jsonb,
  "meta_description" = 'The command team of the 937th Training Group at JBSA-Fort Sam Houston, TX.',
  "is_published"     = true
WHERE "slug" = 'leadership';

UPDATE "pages" SET
  "content"          = '{"blocks":[{"type":"roster","display":"mtl-cards","filter":{"profileType":"mtl"}}]}'::jsonb,
  "meta_description" = 'Military Training Leaders are the NCOs dedicated to mentoring and developing Airmen in Training.',
  "is_published"     = true
WHERE "slug" = 'mtls';

-- ─── Link existing navigation_items to their pages ────

UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'leadership')          WHERE "href" = '/leadership'          AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'mtls')                WHERE "href" = '/mtls'                AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'metc')                WHERE "href" = '/metc'                AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'phone-numbers')       WHERE "href" = '/phone-numbers'       AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'ait-guide')           WHERE "href" = '/ait-guide'           AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'adc')                 WHERE "href" = '/adc'                 AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'military-onesource')  WHERE "href" = '/military-onesource'  AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'finance')             WHERE "href" = '/finance'             AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'in-processing')       WHERE "href" = '/in-processing'       AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'out-processing')      WHERE "href" = '/out-processing'      AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'locations')           WHERE "href" = '/locations'           AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'work-orders')         WHERE "href" = '/work-orders'         AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'work-order-status')   WHERE "href" = '/work-orders/status'  AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'dfac-hours')          WHERE "href" = '/dfac-hours'          AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'shuttle')             WHERE "href" = '/shuttle'             AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'route-of-march')      WHERE "href" = '/route-of-march'      AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'afscs')               WHERE "href" = '/afscs'               AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'efmp')                WHERE "href" = '/efmp'                AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'leadership-programs') WHERE "href" = '/leadership-programs' AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'spartan-flight')      WHERE "href" = '/spartan-flight'      AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'saferep')             WHERE "href" = '/saferep'             AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'jbsa-connect')        WHERE "href" = '/jbsa-connect'        AND "page_id" IS NULL;
UPDATE "navigation_items" SET "page_id" = (SELECT id FROM "pages" WHERE slug = 'share')               WHERE "href" = '/share'               AND "page_id" IS NULL;
