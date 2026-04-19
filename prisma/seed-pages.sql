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
('METC',                            'metc',                '{"blocks":[{"type":"info-cards","columns":1,"cards":[{"icon":"GraduationCap","color":"indigo","title":"About METC","description":"The Medical Education and Training Campus (METC) is the nation''s largest military medical training facility, located at JBSA-Fort Sam Houston, Texas. METC consolidates enlisted medical training from all three services into one state-of-the-art campus, providing world-class education to develop the next generation of military healthcare professionals."}]},{"type":"stats","stats":[{"value":"2010","label":"Established"},{"value":"JBSA-Fort Sam Houston, TX","label":"Location"},{"value":"32 acres","label":"Campus Size"},{"value":"28,000+","label":"Annual Graduates"},{"value":"50+","label":"Training Programs"},{"value":"Army, Navy, Air Force","label":"Service Branches"}]},{"type":"info-cards","heading":"Resources & Links","columns":2,"cards":[{"icon":"Building2","color":"indigo","title":"METC Official Website","description":"Official website of the Medical Education & Training Campus","url":"https://www.metc.mil"},{"icon":"BookOpen","color":"indigo","title":"METC Library","description":"Access digital resources, study materials, and research databases","url":"#"},{"icon":"Users","color":"indigo","title":"Student Services","description":"Academic counseling, tutoring, and student support services","url":"#"},{"icon":"Target","color":"indigo","title":"Simulation Center","description":"State-of-the-art medical simulation and training facilities","url":"#"}]}]}'::jsonb, 'Medical Education & Training Campus — the DoD''s premier joint military medical training facility.', 'dynamic', true,  4),
('Important Phone Numbers',         'phone-numbers',       '{"blocks":[{"type":"contacts-directory","searchable":true}]}'::jsonb, 'Find contact information for key offices and services. Tap any number to call.', 'dynamic', true,  5),
('AiT Guide',                       'ait-guide',           '{"blocks":[{"type":"info-cards","columns":1,"cards":[{"icon":"BookOpen","color":"military-blue","title":"Welcome, Airman","description":"This guide outlines the standards, expectations, and daily life for Airmen in Training at the 937th Training Group. Read it carefully and refer back to it as needed. Your MTL is your primary resource for questions — never hesitate to ask."}]},{"type":"checklist","icon":"Shield","color":"blue","title":"Standards of Conduct","variant":"normal","items":["Maintain military bearing and professional appearance at all times","Address all personnel by proper rank and title","Adhere to curfew times: 2200 (Sun-Thu), 0000 (Fri-Sat)","No alcohol consumption for students under 21; 21+ must follow base policy","Report any safety concerns or incidents to your MTL immediately","Maintain accountability — always sign in/out when leaving the dormitory"]},{"type":"checklist","icon":"Clock","color":"green","title":"Daily Schedule","variant":"normal","items":["0500 - Reveille / Wake up","0530 - Physical Training (Mon, Wed, Fri)","0630 - Personal hygiene and room preparation","0700 - Breakfast at DFAC","0730 - Formation / Accountability","0800-1600 - Academic training","1630 - Return to dormitory / Personal time","2100 - Room check / Accountability","2200 - Lights out (weekdays)"]},{"type":"checklist","icon":"Shirt","color":"purple","title":"Uniform Standards","variant":"normal","items":["OCPs required for all training days unless otherwise directed","PT gear required for scheduled physical training","Civilian attire authorized during off-duty hours (must be appropriate)","Maintain clean, pressed uniforms at all times","Name tapes, rank, and all required accoutrements properly placed","Hair must be within Air Force standards at all times"]},{"type":"checklist","icon":"Smartphone","color":"amber","title":"Technology & Electronics","variant":"normal","items":["Cell phones may be used during personal time only","No phones during formations, classes, or duty hours unless authorized","No recording devices in classrooms without instructor approval","Wi-Fi available in dormitory common areas","Gaming consoles allowed in rooms during personal time","Social media use must comply with OPSEC and Air Force policy"]},{"type":"checklist","icon":"AlertTriangle","color":"red","title":"Critical Rules","variant":"warning","items":["Absolutely no fraternization between students and permanent party","Zero tolerance for drug use — random testing is conducted","Dormitory rooms are subject to inspection at any time","Off-limits areas and establishments are posted — compliance is mandatory","Battle buddy system required when traveling off-base after dark"]}]}'::jsonb, 'Essential information for all AiT students at the 937th Training Group.', 'static',  true,  6),
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

UPDATE "pages" SET
  "content"          = '{"blocks":[{"type":"info-cards","columns":1,"cards":[{"icon":"GraduationCap","color":"indigo","title":"About METC","description":"The Medical Education and Training Campus (METC) is the nation''s largest military medical training facility, located at JBSA-Fort Sam Houston, Texas. METC consolidates enlisted medical training from all three services into one state-of-the-art campus, providing world-class education to develop the next generation of military healthcare professionals."}]},{"type":"stats","stats":[{"value":"2010","label":"Established"},{"value":"JBSA-Fort Sam Houston, TX","label":"Location"},{"value":"32 acres","label":"Campus Size"},{"value":"28,000+","label":"Annual Graduates"},{"value":"50+","label":"Training Programs"},{"value":"Army, Navy, Air Force","label":"Service Branches"}]},{"type":"info-cards","heading":"Resources & Links","columns":2,"cards":[{"icon":"Building2","color":"indigo","title":"METC Official Website","description":"Official website of the Medical Education & Training Campus","url":"https://www.metc.mil"},{"icon":"BookOpen","color":"indigo","title":"METC Library","description":"Access digital resources, study materials, and research databases","url":"#"},{"icon":"Users","color":"indigo","title":"Student Services","description":"Academic counseling, tutoring, and student support services","url":"#"},{"icon":"Target","color":"indigo","title":"Simulation Center","description":"State-of-the-art medical simulation and training facilities","url":"#"}]}]}'::jsonb,
  "meta_description" = 'Medical Education & Training Campus — the DoD''s premier joint military medical training facility.',
  "is_published"     = true
WHERE "slug" = 'metc';

UPDATE "pages" SET
  "content"          = '{"blocks":[{"type":"contacts-directory","searchable":true}]}'::jsonb,
  "meta_description" = 'Find contact information for key offices and services. Tap any number to call.',
  "is_published"     = true
WHERE "slug" = 'phone-numbers';

UPDATE "pages" SET
  "content"          = '{"blocks":[{"type":"info-cards","columns":1,"cards":[{"icon":"BookOpen","color":"military-blue","title":"Welcome, Airman","description":"This guide outlines the standards, expectations, and daily life for Airmen in Training at the 937th Training Group. Read it carefully and refer back to it as needed. Your MTL is your primary resource for questions — never hesitate to ask."}]},{"type":"checklist","icon":"Shield","color":"blue","title":"Standards of Conduct","variant":"normal","items":["Maintain military bearing and professional appearance at all times","Address all personnel by proper rank and title","Adhere to curfew times: 2200 (Sun-Thu), 0000 (Fri-Sat)","No alcohol consumption for students under 21; 21+ must follow base policy","Report any safety concerns or incidents to your MTL immediately","Maintain accountability — always sign in/out when leaving the dormitory"]},{"type":"checklist","icon":"Clock","color":"green","title":"Daily Schedule","variant":"normal","items":["0500 - Reveille / Wake up","0530 - Physical Training (Mon, Wed, Fri)","0630 - Personal hygiene and room preparation","0700 - Breakfast at DFAC","0730 - Formation / Accountability","0800-1600 - Academic training","1630 - Return to dormitory / Personal time","2100 - Room check / Accountability","2200 - Lights out (weekdays)"]},{"type":"checklist","icon":"Shirt","color":"purple","title":"Uniform Standards","variant":"normal","items":["OCPs required for all training days unless otherwise directed","PT gear required for scheduled physical training","Civilian attire authorized during off-duty hours (must be appropriate)","Maintain clean, pressed uniforms at all times","Name tapes, rank, and all required accoutrements properly placed","Hair must be within Air Force standards at all times"]},{"type":"checklist","icon":"Smartphone","color":"amber","title":"Technology & Electronics","variant":"normal","items":["Cell phones may be used during personal time only","No phones during formations, classes, or duty hours unless authorized","No recording devices in classrooms without instructor approval","Wi-Fi available in dormitory common areas","Gaming consoles allowed in rooms during personal time","Social media use must comply with OPSEC and Air Force policy"]},{"type":"checklist","icon":"AlertTriangle","color":"red","title":"Critical Rules","variant":"warning","items":["Absolutely no fraternization between students and permanent party","Zero tolerance for drug use — random testing is conducted","Dormitory rooms are subject to inspection at any time","Off-limits areas and establishments are posted — compliance is mandatory","Battle buddy system required when traveling off-base after dark"]}]}'::jsonb,
  "meta_description" = 'Essential information for all AiT students at the 937th Training Group.',
  "is_published"     = true
WHERE "slug" = 'ait-guide';

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
