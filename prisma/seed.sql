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

INSERT INTO "leadership_profiles" ("name", "rank", "title", "unit", "profile_type", "sort_order") VALUES
('John Richardson', 'Colonel', 'Commander', '937th Training Group', 'leadership', 1),
('Sarah Mitchell', 'Lt Colonel', 'Vice Commander', '937th Training Group', 'leadership', 2),
('Robert Chen', 'CMSgt', 'Command Chief', '937th Training Group', 'leadership', 3),
('Marcus Williams', 'SMSgt', 'Superintendent', '937th Training Group', 'leadership', 4),
('Jennifer Lopez', 'CMSgt', 'First Sergeant', '937th Training Group', 'leadership', 5);

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

-- ─── Navigation Items ─────────────────────────────────

INSERT INTO "navigation_items" ("label", "href", "icon", "section", "sort_order") VALUES
('Home', '/', 'Home', 'primary', 1),
('Meet Your Leadership', '/leadership', 'Users', 'primary', 2),
('Meet Your MTLs', '/mtls', 'UserCheck', 'primary', 3),
('METC', '/metc', 'GraduationCap', 'primary', 4),
('Important Phone Numbers', '/phone-numbers', 'Phone', 'primary', 5),
('AiT Guide', '/ait-guide', 'BookOpen', 'primary', 6),
('ADC', '/adc', 'Scale', 'primary', 7),
('Military OneSource', '/military-onesource', 'Globe', 'primary', 8),
('Finance', '/finance', 'DollarSign', 'primary', 9),
('In-Processing', '/in-processing', 'LogIn', 'primary', 10),
('Out-Processing', '/out-processing', 'LogOut', 'primary', 11),
('Locations', '/locations', 'MapPin', 'primary', 12),
('Work Orders', '/work-orders', 'ClipboardList', 'primary', 13),
('Work Order Status', '/work-orders/status', 'Search', 'more', 14),
('DFAC Hours', '/dfac-hours', 'UtensilsCrossed', 'more', 15),
('Shuttle Route', '/shuttle', 'Bus', 'more', 16),
('Route of March', '/route-of-march', 'Route', 'more', 17),
('AFSCs', '/afscs', 'BadgeInfo', 'more', 18),
('EFMP', '/efmp', 'HeartHandshake', 'more', 19),
('Airman Leadership Programs', '/leadership-programs', 'Award', 'more', 20),
('Spartan Flight/CQ', '/spartan-flight', 'Shield', 'more', 21),
('SAFEREP', '/saferep', 'ShieldAlert', 'more', 22),
('JBSA Connect', '/jbsa-connect', 'Link', 'more', 23),
('Share App', '/share', 'Share2', 'more', 24);
