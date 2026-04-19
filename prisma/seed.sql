-- 937th Training Group Seed Data
-- Run this in Supabase SQL Editor AFTER init.sql

-- ─── Contacts (Phone Directory) ───────────────────────

INSERT INTO "contacts" ("name", "phone", "category", "sort_order") VALUES
('937 TG Orderly Room', '210-808-3100', '937 TG', 1),
('937 TG First Sergeant', '210-808-3101', '937 TG', 2),
('937 TG Commander', '210-808-3102', '937 TG', 3),
('937 TG Superintendent', '210-808-3103', '937 TG', 4),
('Base Emergency / Fire', '210-221-1211', 'Emergency', 5),
('Military Police (Non-Emergency)', '210-221-2222', 'Emergency', 6),
('Suicide Prevention Hotline', '988', 'Emergency', 7),
('Sexual Assault Hotline (SARC)', '210-808-3600', 'Emergency', 8),
('BAMC Operator', '210-916-9900', 'Medical', 9),
('BAMC Appointment Line', '210-916-1000', 'Medical', 10),
('Mental Health Clinic', '210-916-2000', 'Medical', 11),
('Dental Clinic', '210-808-2100', 'Medical', 12),
('Chapel / Chaplain', '210-221-9004', 'Support Services', 13),
('Finance Office', '210-808-3400', 'Support Services', 14),
('Military Personnel Section', '210-808-3200', 'Support Services', 15),
('Legal Office (ADC)', '210-221-2520', 'Support Services', 16),
('Military OneSource', '800-342-9647', 'Support Services', 17),
('Work Orders / CE', '210-808-3500', 'Facilities', 18),
('Rocco Dining Facility', '210-808-3700', 'Facilities', 19),
('Fitness Center', '210-808-3800', 'Recreation', 20),
('Library', '210-221-4326', 'Recreation', 21);

-- ─── Leadership Profiles ──────────────────────────────
-- 937th Training Group
INSERT INTO "leadership_profiles" ("name", "rank", "title", "unit", "photo_url", "profile_type", "sort_order") VALUES
('Brian Caruthers',       'Col',    'Commander',              '937th Training Group', '/images/leadership/col-caruthers-brian.jpg',   'leadership', 1),
('Mark Hassett',          'Lt Col', 'Deputy Commander',       '937th Training Group', '/images/leadership/ltcol-hassett-mark.jpg',    'leadership', 2),
('James Keller',          'CMSgt',  'Senior Enlisted Leader', '937th Training Group', NULL,                                            'leadership', 3);

-- 381st Training Squadron
INSERT INTO "leadership_profiles" ("name", "rank", "title", "unit", "photo_url", "profile_type", "sort_order") VALUES
('Heather Brooks',        'Lt Col', 'Commander',              '381st Training Squadron', '/images/leadership/ltcol-brooks-heather.jpg',   'leadership', 10),
('Erica Gunderson',       'Capt',   'Section Commander',      '381st Training Squadron', '/images/leadership/capt-gunderson-erica.jpg',   'leadership', 11),
('Justin Rhodes',         'MSG',    'Senior Enlisted Leader', '381st Training Squadron', '/images/leadership/msg-rhodes-justin.jpg',      'leadership', 12),
('Nathan Bentley',        'MSgt',   'First Sergeant',         '381st Training Squadron', '/images/leadership/msgt-bentley-nathan.png',    'leadership', 13);

-- 382d Training Squadron
INSERT INTO "leadership_profiles" ("name", "rank", "title", "unit", "photo_url", "profile_type", "sort_order") VALUES
('Christopher Dufford',   'Lt Col', 'Commander',              '382d Training Squadron', '/images/leadership/ltcol-dufford-christopher.jpg', 'leadership', 20),
('Michael Mask',          'Capt',   'Section Commander',      '382d Training Squadron', '/images/leadership/capt-mask-michael.jpg',         'leadership', 21),
('Veronica Everest',      'CMSgt',  'Senior Enlisted Leader', '382d Training Squadron', '/images/leadership/cmsgt-everest-veronica.jpg',    'leadership', 22),
('Stacey Williamson',     'MSgt',   'First Sergeant',         '382d Training Squadron', '/images/leadership/msgt-williamson-stacey.jpg',    'leadership', 23);

-- 383d Training Squadron
INSERT INTO "leadership_profiles" ("name", "rank", "title", "unit", "photo_url", "profile_type", "sort_order") VALUES
('Tracy Davis',           'Lt Col', 'Commander',              '383d Training Squadron', '/images/leadership/ltcol-davis-tracy.png',       'leadership', 30),
('Rubert Laco',           'Maj',    'Section Commander',      '383d Training Squadron', '/images/leadership/maj-laco-rubert.jpg',         'leadership', 31),
('Fabrizio Lamarca',      'CMSgt',  'Senior Enlisted Leader', '383d Training Squadron', NULL,                                              'leadership', 32),
('James Kendall',         'SMSgt',  'First Sergeant',         '383d Training Squadron', '/images/leadership/smsgt-kendall-james.jpg',     'leadership', 33);

-- ─── MTL Profiles ─────────────────────────────────────

INSERT INTO "leadership_profiles" ("name", "rank", "title", "unit", "profile_type", "sort_order") VALUES
('Maria Santos', 'TSgt', 'Lead MTL - Building 2841', '937th Training Group', 'mtl', 10),
('James Williams', 'TSgt', 'Floor MTL - Dorm A', '937th Training Group', 'mtl', 11),
('Kevin Brown', 'SSgt', 'Floor MTL - Dorm B', '937th Training Group', 'mtl', 12),
('Ashley Davis', 'SSgt', 'Floor MTL - Dorm C', '937th Training Group', 'mtl', 13),
('Michael Chen', 'TSgt', 'Lead MTL - Building 2840', '937th Training Group', 'mtl', 14),
('Nicole Thompson', 'SSgt', 'Floor MTL - Dorm D', '937th Training Group', 'mtl', 15),
('David Kim', 'TSgt', 'Weekend Duty MTL', '937th Training Group', 'mtl', 16),
('Brandon Lee', 'SSgt', 'Floor MTL - Dorm E', '937th Training Group', 'mtl', 17),
('Rachel Martinez', 'SSgt', 'Floor MTL - Dorm F', '937th Training Group', 'mtl', 18),
('Christopher Taylor', 'TSgt', 'Senior MTL', '937th Training Group', 'mtl', 19);

-- ─── Locations ────────────────────────────────────────

INSERT INTO "locations" ("name", "address", "category", "sort_order") VALUES
('937 TG Headquarters', 'Building 2841, JBSA-Fort Sam Houston', 'Training', 1),
('METC Campus', '3490 Gruber Rd, JBSA-Fort Sam Houston', 'Training', 2),
('AiT Dormitories', 'Building 2840, JBSA-Fort Sam Houston', 'Housing', 3),
('Rocco Dining Facility', 'Building 2846, JBSA-Fort Sam Houston', 'Dining', 4),
('Jimmy Brought Fitness Center', 'Building 2797, JBSA-Fort Sam Houston', 'Recreation', 5),
('Brooke Army Medical Center (BAMC)', '3551 Roger Brooke Dr, JBSA-Fort Sam Houston', 'Medical', 6),
('Main Exchange (BX)', '2250 Wilson Way, JBSA-Fort Sam Houston', 'Services', 7),
('Chapel', 'Building 2200, JBSA-Fort Sam Houston', 'Support', 8),
('Base Library', '2150 Stanley Rd, JBSA-Fort Sam Houston', 'Education', 9),
('Visitor Center / Gate', 'Harry Wurzbach Gate, JBSA-Fort Sam Houston', 'Access', 10);

-- ─── Announcements ────────────────────────────────────

INSERT INTO "announcements" ("title", "content", "priority", "is_pinned", "publish_date") VALUES
('Welcome to the 937th Training Group App', '{"html": "Welcome to the official 937th Training Group application. This app provides quick access to important resources, contacts, and information for all personnel."}', 'normal', true, now()),
('DFAC Hours Update - Effective April 2026', '{"html": "Rocco Dining Facility has updated its operating hours. Please check the DFAC Hours page for the current schedule."}', 'important', false, now()),
('New Work Order System', '{"html": "Work orders can now be submitted directly through this app. Navigate to Work Orders to submit a new request or check the status of an existing one."}', 'normal', false, now());

-- ─── Schedules (DFAC) ─────────────────────────────────

INSERT INTO "schedules" ("title", "schedule_type", "content", "effective_date", "is_current") VALUES
('Rocco DFAC - Weekday Hours', 'dfac', '{"meals": [{"name": "Breakfast", "hours": "0600-0800"}, {"name": "Lunch", "hours": "1100-1300"}, {"name": "Dinner", "hours": "1700-1900"}]}', '2026-04-01', true),
('Rocco DFAC - Weekend/Holiday Hours', 'dfac', '{"meals": [{"name": "Brunch", "hours": "0800-1000"}, {"name": "Dinner", "hours": "1700-1830"}]}', '2026-04-01', true),
('JBSA Shuttle Route A', 'shuttle', '{"stops": ["Main Gate", "BX/Commissary", "BAMC", "METC Campus", "Dorms"], "frequency": "Every 30 min", "hours": "0600-2200"}', '2026-04-01', true);

-- ─── Pages (CMS Library) ──────────────────────────────
-- Seed entries for every existing site page so admins can manage them
-- through the CMS. Content is left empty until the per-page functionality
-- is migrated into the pages library one by one.

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
('Links',                           'links',               NULL, 'Curated link collections maintained by the 937 TG admin team.',                            'dynamic', false, 26);

-- ─── Navigation Items ─────────────────────────────────

INSERT INTO "navigation_items" ("label", "href", "icon", "section", "sort_order", "page_id") VALUES
('Home',                       '/',                    'Home',            'primary', 1,  NULL),
('Meet Your Leadership',       '/leadership',          'Users',           'primary', 2,  (SELECT id FROM "pages" WHERE slug = 'leadership')),
('Meet Your MTLs',             '/mtls',                'UserCheck',       'primary', 3,  (SELECT id FROM "pages" WHERE slug = 'mtls')),
('METC',                       '/metc',                'GraduationCap',   'primary', 4,  (SELECT id FROM "pages" WHERE slug = 'metc')),
('Important Phone Numbers',    '/phone-numbers',       'Phone',           'primary', 5,  (SELECT id FROM "pages" WHERE slug = 'phone-numbers')),
('AiT Guide',                  '/ait-guide',           'BookOpen',        'primary', 6,  (SELECT id FROM "pages" WHERE slug = 'ait-guide')),
('ADC',                        '/adc',                 'Scale',           'primary', 7,  (SELECT id FROM "pages" WHERE slug = 'adc')),
('Military OneSource',         '/military-onesource',  'Globe',           'primary', 8,  (SELECT id FROM "pages" WHERE slug = 'military-onesource')),
('Finance',                    '/finance',             'DollarSign',      'primary', 9,  (SELECT id FROM "pages" WHERE slug = 'finance')),
('In-Processing',              '/in-processing',       'LogIn',           'primary', 10, (SELECT id FROM "pages" WHERE slug = 'in-processing')),
('Out-Processing',             '/out-processing',      'LogOut',          'primary', 11, (SELECT id FROM "pages" WHERE slug = 'out-processing')),
('Locations',                  '/locations',           'MapPin',          'primary', 12, (SELECT id FROM "pages" WHERE slug = 'locations')),
('Work Orders',                '/work-orders',         'ClipboardList',   'primary', 13, (SELECT id FROM "pages" WHERE slug = 'work-orders')),
('Work Order Status',          '/work-orders/status',  'Search',          'more',    14, (SELECT id FROM "pages" WHERE slug = 'work-order-status')),
('DFAC Hours',                 '/dfac-hours',          'UtensilsCrossed', 'more',    15, (SELECT id FROM "pages" WHERE slug = 'dfac-hours')),
('Shuttle Route',              '/shuttle',             'Bus',             'more',    16, (SELECT id FROM "pages" WHERE slug = 'shuttle')),
('Route of March',             '/route-of-march',      'Route',           'more',    17, (SELECT id FROM "pages" WHERE slug = 'route-of-march')),
('AFSCs',                      '/afscs',               'BadgeInfo',       'more',    18, (SELECT id FROM "pages" WHERE slug = 'afscs')),
('EFMP',                       '/efmp',                'HeartHandshake',  'more',    19, (SELECT id FROM "pages" WHERE slug = 'efmp')),
('Airman Leadership Programs', '/leadership-programs', 'Award',           'more',    20, (SELECT id FROM "pages" WHERE slug = 'leadership-programs')),
('Spartan Flight/CQ',          '/spartan-flight',      'Shield',          'more',    21, (SELECT id FROM "pages" WHERE slug = 'spartan-flight')),
('SAFEREP',                    '/saferep',             'ShieldAlert',     'more',    22, (SELECT id FROM "pages" WHERE slug = 'saferep')),
('JBSA Connect',               '/jbsa-connect',        'Link',            'more',    23, (SELECT id FROM "pages" WHERE slug = 'jbsa-connect')),
('Share App',                  '/share',               'Share2',          'more',    24, (SELECT id FROM "pages" WHERE slug = 'share'));
