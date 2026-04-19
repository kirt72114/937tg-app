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
('METC',                            'metc',                '{"blocks":[{"type":"info-cards","columns":1,"cards":[{"icon":"GraduationCap","color":"indigo","title":"About METC","description":"The Medical Education and Training Campus (METC) is the nation''s largest military medical training facility, located at JBSA-Fort Sam Houston, Texas. METC consolidates enlisted medical training from all three services into one state-of-the-art campus, providing world-class education to develop the next generation of military healthcare professionals."}]},{"type":"stats","stats":[{"value":"2010","label":"Established"},{"value":"JBSA-Fort Sam Houston, TX","label":"Location"},{"value":"32 acres","label":"Campus Size"},{"value":"28,000+","label":"Annual Graduates"},{"value":"50+","label":"Training Programs"},{"value":"Army, Navy, Air Force","label":"Service Branches"}]},{"type":"info-cards","heading":"Resources & Links","columns":2,"cards":[{"icon":"Building2","color":"indigo","title":"METC Official Website","description":"Official website of the Medical Education & Training Campus","url":"https://www.metc.mil"},{"icon":"BookOpen","color":"indigo","title":"METC Library","description":"Access digital resources, study materials, and research databases","url":"#"},{"icon":"Users","color":"indigo","title":"Student Services","description":"Academic counseling, tutoring, and student support services","url":"#"},{"icon":"Target","color":"indigo","title":"Simulation Center","description":"State-of-the-art medical simulation and training facilities","url":"#"}]}]}'::jsonb, 'Medical Education & Training Campus — the DoD''s premier joint military medical training facility.', 'dynamic', true,  4),
('Important Phone Numbers',         'phone-numbers',       '{"blocks":[{"type":"contacts-directory","searchable":true}]}'::jsonb, 'Find contact information for key offices and services. Tap any number to call.', 'dynamic', true,  5),
('AiT Guide',                       'ait-guide',           '{"blocks":[{"type":"info-cards","columns":1,"cards":[{"icon":"BookOpen","color":"military-blue","title":"Welcome, Airman","description":"This guide outlines the standards, expectations, and daily life for Airmen in Training at the 937th Training Group. Read it carefully and refer back to it as needed. Your MTL is your primary resource for questions — never hesitate to ask."}]},{"type":"checklist","icon":"Shield","color":"blue","title":"Standards of Conduct","variant":"normal","items":["Maintain military bearing and professional appearance at all times","Address all personnel by proper rank and title","Adhere to curfew times: 2200 (Sun-Thu), 0000 (Fri-Sat)","No alcohol consumption for students under 21; 21+ must follow base policy","Report any safety concerns or incidents to your MTL immediately","Maintain accountability — always sign in/out when leaving the dormitory"]},{"type":"checklist","icon":"Clock","color":"green","title":"Daily Schedule","variant":"normal","items":["0500 - Reveille / Wake up","0530 - Physical Training (Mon, Wed, Fri)","0630 - Personal hygiene and room preparation","0700 - Breakfast at DFAC","0730 - Formation / Accountability","0800-1600 - Academic training","1630 - Return to dormitory / Personal time","2100 - Room check / Accountability","2200 - Lights out (weekdays)"]},{"type":"checklist","icon":"Shirt","color":"purple","title":"Uniform Standards","variant":"normal","items":["OCPs required for all training days unless otherwise directed","PT gear required for scheduled physical training","Civilian attire authorized during off-duty hours (must be appropriate)","Maintain clean, pressed uniforms at all times","Name tapes, rank, and all required accoutrements properly placed","Hair must be within Air Force standards at all times"]},{"type":"checklist","icon":"Smartphone","color":"amber","title":"Technology & Electronics","variant":"normal","items":["Cell phones may be used during personal time only","No phones during formations, classes, or duty hours unless authorized","No recording devices in classrooms without instructor approval","Wi-Fi available in dormitory common areas","Gaming consoles allowed in rooms during personal time","Social media use must comply with OPSEC and Air Force policy"]},{"type":"checklist","icon":"AlertTriangle","color":"red","title":"Critical Rules","variant":"warning","items":["Absolutely no fraternization between students and permanent party","Zero tolerance for drug use — random testing is conducted","Dormitory rooms are subject to inspection at any time","Off-limits areas and establishments are posted — compliance is mandatory","Battle buddy system required when traveling off-base after dark"]}]}'::jsonb, 'Essential information for all AiT students at the 937th Training Group.', 'static',  true,  6),
('Area Defense Counsel',            'adc',                 '{"blocks":[{"type":"info-cards","columns":1,"cards":[{"icon":"Scale","color":"blue","title":"About the ADC","description":"The Area Defense Counsel provides free, confidential legal representation to military members. The ADC is completely independent of your chain of command — nothing you discuss with your defense counsel will be shared with anyone without your consent."}]},{"type":"contact-info","columns":3,"items":[{"icon":"Phone","label":"Phone","value":"210-808-3300","kind":"phone"},{"icon":"MapPin","label":"Location","value":"Building 2841, Fort Sam Houston","kind":"text"},{"icon":"Clock","label":"Hours","value":"Mon-Fri 0800-1630","kind":"text"}]},{"type":"checklist","icon":"Shield","color":"blue","title":"Services Provided","variant":"normal","items":[{"text":"Representation during administrative actions (LOCs, LORs, Article 15s)"},{"text":"Courts-martial defense representation"},{"text":"Advice on military justice matters and your rights under the UCMJ"},{"text":"Assistance with adverse personnel actions"},{"text":"Representation at discharge boards and evaluation appeals"},{"text":"Confidential legal consultations on any military legal matter"}]},{"type":"highlight-card","icon":"Shield","title":"Your Right to Counsel","description":"You have the right to consult with a defense counsel before making any statement or decision in a military justice matter. Don''t wait — contact the ADC as soon as you become aware of any legal issue.","variant":"navy"}]}'::jsonb, 'Free, confidential legal representation for military members.', 'static',  true,  7),
('Military OneSource',              'military-onesource',  '{"blocks":[{"type":"contact-info","columns":2,"items":[{"icon":"Phone","label":"Call Anytime (24/7)","value":"800-342-9647","kind":"phone","emphasize":true},{"icon":"Globe","label":"Visit Website","value":"https://www.militaryonesource.mil","kind":"url","sublabel":"militaryonesource.mil"}]},{"type":"info-cards","heading":"Available Services","columns":3,"cards":[{"icon":"Brain","color":"purple","title":"Counseling Services","description":"Free, confidential non-medical counseling (up to 12 sessions per issue)"},{"icon":"DollarSign","color":"green","title":"Financial Counseling","description":"Free financial planning, tax preparation, and debt management assistance"},{"icon":"Scale","color":"blue","title":"Legal Services","description":"Legal consultation for personal matters including wills, powers of attorney, and tax issues"},{"icon":"Users","color":"pink","title":"Spouse & Family Support","description":"Employment assistance, relocation support, and family life programs"},{"icon":"GraduationCap","color":"amber","title":"Education & Career","description":"Tuition assistance guidance, career counseling, and transition support"},{"icon":"Heart","color":"red","title":"Health & Wellness","description":"Wellness coaching, stress management, and healthy living resources"}]}]}'::jsonb, 'Free, confidential support for military members and their families — 24/7.', 'static',  true,  8),
('Finance',                         'finance',             '{"blocks":[{"type":"contact-info","columns":3,"items":[{"icon":"Phone","label":"Phone","value":"210-808-3400","kind":"phone"},{"icon":"MapPin","label":"Location","value":"Building 2841, Room 110","kind":"text"},{"icon":"Clock","label":"Hours","value":"Mon-Fri 0800-1530","kind":"text","sublabel":"Walk-ins: 0800-1100"}]},{"type":"checklist","icon":"DollarSign","color":"blue","title":"Common Finance Issues","variant":"normal","items":[{"text":"Pay not received","subtext":"Visit Finance during walk-in hours with your LES and orders"},{"text":"BAH/BAS issues","subtext":"Bring a copy of your lease or dependent documentation"},{"text":"Travel voucher","subtext":"Submit within 5 business days of arrival; bring receipts and orders"},{"text":"Debt / overpayment","subtext":"Schedule an appointment to set up a payment plan"},{"text":"Allotments","subtext":"Can be set up through myPay or at the Finance office"}]},{"type":"highlight-card","icon":"AlertTriangle","title":"Important: Check Your LES","description":"Review your Leave and Earnings Statement (LES) on myPay every month. Report any discrepancies to the Finance office immediately. Catching errors early prevents larger issues down the line.","variant":"warning"}]}'::jsonb, 'Finance office information, hours, and resources for 937 TG personnel.', 'static',  true,  9),
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
('Exceptional Family Member Program','efmp',               '{"blocks":[{"type":"info-cards","columns":1,"cards":[{"icon":"HeartHandshake","color":"pink","title":"About EFMP","description":"The Exceptional Family Member Program (EFMP) is a mandatory enrollment program that works with other military and civilian agencies to provide comprehensive and coordinated community support, housing, educational, and medical services to families with special needs."}]},{"type":"contact-info","columns":1,"items":[{"icon":"Phone","label":"EFMP Contact","value":"210-808-3700","kind":"phone"}]},{"type":"checklist","icon":"HeartHandshake","color":"pink","title":"Services Provided","variant":"normal","items":[{"text":"Identification and enrollment of family members with special needs"},{"text":"Assignment coordination to ensure medical and educational needs are met"},{"text":"Referrals to local community resources and support services"},{"text":"Assistance with Individualized Education Programs (IEPs)"},{"text":"Connection to respite care and family support programs"},{"text":"Transition assistance when PCSing to a new duty station"}]},{"type":"info-cards","heading":"Resources","columns":3,"cards":[{"icon":"Globe","color":"pink","title":"Air Force EFMP Portal","description":"Official Air Force EFMP information and resources","url":"https://www.afpc.af.mil/EFMP/"},{"icon":"Globe","color":"pink","title":"Military OneSource EFMP","description":"Comprehensive EFMP resources and support","url":"https://www.militaryonesource.mil/efmp/"},{"icon":"GraduationCap","color":"pink","title":"STOMP (Specialized Training of Military Parents)","description":"Training and support for military parents of children with special needs","url":"#"}]}]}'::jsonb, 'Support and resources for military families with special needs.',                                 'static',  true,  19),
('Airman Leadership Programs',      'leadership-programs', NULL, 'Green, Yellow, and Red Rope program requirements and responsibilities.',                  'static',  false, 20),
('Spartan Flight / CQ',             'spartan-flight',      NULL, 'Charge of Quarters duty details, shifts, and responsibilities.',                           'static',  false, 21),
('SAFEREP',                         'saferep',             '{"blocks":[{"type":"info-cards","columns":1,"cards":[{"icon":"ShieldAlert","color":"red","title":"Safety is Everyone''s Responsibility","description":"The 937th Training Group is committed to maintaining a safe environment for all personnel. If you observe an unsafe condition or experience a safety incident, report it immediately. All reports can be made anonymously."}]},{"type":"contact-info","columns":2,"items":[{"icon":"Phone","label":"Emergency (immediate danger)","value":"911","kind":"phone","emphasize":true},{"icon":"Phone","label":"Safety Office (non-emergency)","value":"210-808-3800","kind":"phone"}]},{"type":"checklist","icon":"ShieldAlert","color":"red","title":"What to Report","variant":"normal","items":[{"text":"Unsafe conditions in dormitories, training facilities, or common areas"},{"text":"Hazardous material spills or exposure"},{"text":"Workplace injuries or near-miss incidents"},{"text":"Vehicle accidents (on or off base)"},{"text":"Faulty or damaged equipment"},{"text":"Fire hazards or electrical issues"},{"text":"Slip, trip, and fall hazards"},{"text":"Any condition that could cause injury or property damage"}]},{"type":"highlight-card","icon":"ShieldAlert","title":"See Something? Say Something.","description":"You will never be penalized for reporting a safety concern in good faith. Your report could prevent an injury or save a life. Report to your MTL, supervisor, or call the Safety Office directly.","variant":"navy"}]}'::jsonb, 'Safety reporting information — if you see something unsafe, report it.',                                 'static',  true,  22),
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
