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

-- ─── In-Processing ────────────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'In-Processing',
  'in-processing',
  jsonb_build_object('html', $html$<blockquote><p><strong>Welcome to the 937th Training Group!</strong> Follow this checklist to complete your in-processing smoothly.</p></blockquote><h2>Phase 1: Arrival (Day 1)</h2><ul><li>Report to 937 TG Reception Center with your orders and military ID</li><li>Receive dormitory room assignment and bedding</li><li>Get issued meal card / DFAC access</li><li>Complete initial safety and orientation briefing</li><li>Register personal vehicle with Security Forces (if applicable)</li><li>Receive welcome packet with base map and key phone numbers</li></ul><h2>Phase 2: Administrative (Days 1-3)</h2><ul><li>In-process with the 937 TG Orderly Room (bring orders, ID, medical records)</li><li>Update DEERS and personnel records</li><li>Set up military email and CAC email certificates</li><li>Complete mandatory online training (SAPR, Cyber Awareness, OPSEC, etc.)</li><li>Enroll in TRICARE and verify medical benefits</li><li>Register with the base Dental Clinic</li><li>Set up direct deposit / verify finance records</li><li>Obtain required uniforms and gear from supply</li></ul><h2>Phase 3: Orientation (Week 1)</h2><ul><li>Attend 937 TG Commander's Welcome Brief</li><li>Complete campus and base orientation tour</li><li>Meet your assigned Military Training Leader (MTL)</li><li>Review DFAC hours, shuttle routes, and base services</li><li>Read and acknowledge the AiT Student Guide and standards</li><li>Attend academic orientation for your training program</li><li>Obtain your class schedule and training materials</li><li>Complete initial fitness assessment (if required)</li></ul><h2>Pro Tips</h2><blockquote><p>Bring multiple copies of your orders — you'll need them at several offices.</p><p>Keep a folder with all your important documents organized and accessible.</p><p>Save key phone numbers in your phone on Day 1 — especially your MTL and Orderly Room.</p><p>Ask questions! Your MTL and fellow students are here to help you succeed.</p><p>The DFAC schedule may differ on weekends — check the posted hours.</p><p>Download or bookmark this app for quick access to all 937 TG resources.</p></blockquote>$html$),
  'Welcome to the 937th Training Group! Follow this checklist to complete your in-processing.',
  true,
  'dynamic',
  101
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();

-- ─── Out-Processing ───────────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'Out-Processing',
  'out-processing',
  jsonb_build_object('html', $html$<blockquote><p>Checklist for departing personnel — follow these steps to ensure a smooth transition from the 937th Training Group.</p></blockquote><h2>Phase 1: Notification (2+ Weeks Before Departure)</h2><ul><li>Receive PCS orders or graduation notification</li><li>Schedule out-processing appointment with the Orderly Room</li><li>Obtain and begin your clearing checklist</li><li>Notify your MTL of your departure date</li><li>Begin organizing personal items and packing</li></ul><h2>Phase 2: Clearing (1-2 Weeks Before Departure)</h2><ul><li>Clear dormitory room (schedule room inspection with your MTL)</li><li>Return all issued equipment, linens, and gear to supply</li><li>Clear with supply and logistics</li><li>Complete medical records review and transfer</li><li>Finance final out-processing and travel voucher</li><li>Turn in meal card to the DFAC</li><li>Clear with the base library (return any borrowed items)</li><li>Return any training materials or textbooks</li></ul><h2>Phase 3: Final Steps (Last 3 Days)</h2><ul><li>Attend final formation or graduation rehearsal</li><li>Complete all out-processing checklist signatures</li><li>Collect copies of training records and certificates</li><li>Set up mail forwarding to your next duty station</li><li>Update personnel records with new duty station information</li><li>Turn in temporary base access passes (if applicable)</li><li>Ensure all personal items are removed from dormitory</li><li>Report to the Orderly Room for final out-processing sign-off</li></ul><h2>Important Reminders</h2><blockquote><p>Start your clearing process early — some offices have limited appointment availability.</p><p>Double-check that you have copies of ALL training certificates before departing.</p><p>Ensure your travel voucher is submitted and correct before leaving.</p><p>Update your forwarding address with the post office and USPS.</p><p>Take photos of your cleared room before turning in the key.</p></blockquote>$html$),
  'Checklist for departing personnel — follow these steps to ensure a smooth transition.',
  true,
  'dynamic',
  102
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();

-- ─── Route of March ───────────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'Route of March',
  'route-of-march',
  jsonb_build_object('html', $html$<p>Formation route details for daily marches to and from training at the 937th Training Group.</p><h2>Daily Formation Route</h2><p>The standard route of march from the dormitories to the METC training campus:</p><ol><li>Form up at AiT Dormitories (Building 2840) parking lot</li><li>March south on Stanley Road</li><li>Turn left onto Gruber Road</li><li>Continue to METC Campus main entrance (Building 2841)</li><li>Formation dismissal at designated training building</li></ol><h2>Formation Times</h2><ul><li><strong>Morning Formation:</strong> 0720 form up / 0730 step-off</li><li><strong>Afternoon Return:</strong> 1630 form up / 1640 step-off</li></ul><h2>Formation Guidelines</h2><ul><li>Arrive at formation area 10 minutes prior to step-off time</li><li>Maintain proper formation alignment and cadence at all times</li><li>Road guards will be posted at all intersections — follow their instructions</li><li>No cell phones during march — stow all electronic devices</li><li>Carry water during warm weather months (April - October)</li><li>Report any injuries or issues to your element leader immediately</li><li>Reflective belts required during hours of limited visibility</li></ul>$html$),
  'Formation route details for daily marches to and from training.',
  true,
  'dynamic',
  103
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();

-- ─── SAFEREP ──────────────────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'SAFEREP',
  'saferep',
  jsonb_build_object('html', $html$<blockquote><p><strong>Safety is Everyone's Responsibility.</strong> The 937th Training Group is committed to maintaining a safe environment for all personnel. If you observe an unsafe condition or experience a safety incident, report it immediately. All reports can be made anonymously.</p></blockquote><h2>Emergency Contacts</h2><ul><li><strong>Emergency (immediate danger):</strong> <a href="tel:911">911</a></li><li><strong>Safety Office (non-emergency):</strong> <a href="tel:2108083800">210-808-3800</a></li></ul><h2>What to Report</h2><ul><li>Unsafe conditions in dormitories, training facilities, or common areas</li><li>Hazardous material spills or exposure</li><li>Workplace injuries or near-miss incidents</li><li>Vehicle accidents (on or off base)</li><li>Faulty or damaged equipment</li><li>Fire hazards or electrical issues</li><li>Slip, trip, and fall hazards</li><li>Any condition that could cause injury or property damage</li></ul><blockquote><p><strong>See Something? Say Something.</strong> You will never be penalized for reporting a safety concern in good faith. Your report could prevent an injury or save a life. Report to your MTL, supervisor, or call the Safety Office directly.</p></blockquote>$html$),
  'Safety reporting information — if you see something unsafe, report it.',
  true,
  'dynamic',
  104
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();

-- ─── Spartan Flight / CQ ─────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'Spartan Flight / CQ Duty',
  'spartan-flight',
  jsonb_build_object('html', $html$<blockquote><p><strong>About CQ Duty.</strong> Charge of Quarters (CQ) is a rotating duty assigned to AiT students to maintain security and accountability in the dormitories during after-duty hours. CQ runners work in shifts alongside the Duty MTL to ensure the safety and well-being of all dormitory residents.</p></blockquote><h2>CQ Shift Times</h2><ul><li><strong>Shift 1:</strong> 1800 - 0000</li><li><strong>Shift 2:</strong> 0000 - 0600</li><li><strong>CQ Desk Phone:</strong> <a href="tel:2108083150">210-808-3150</a></li></ul><h2>CQ Duties</h2><ul><li>Monitor dormitory entrance and maintain visitor log</li><li>Conduct hourly floor checks and accountability</li><li>Report emergencies and security incidents to MTL on duty</li><li>Ensure quiet hours are maintained (2200-0600)</li><li>Monitor fire and safety systems</li><li>Assist students with after-hours issues</li><li>Maintain CQ log with all notable events</li></ul><h2>What to Bring</h2><ul><li>Military ID / CAC</li><li>Water and authorized snacks</li><li>Study materials (academics encouraged during downtime)</li><li>Uniform items for next duty day</li><li>Phone charger</li></ul><blockquote><p><strong>Important:</strong> CQ duty is a military requirement. Failure to report for duty or abandoning your post may result in disciplinary action. If you have a conflict, notify your MTL as soon as possible to arrange a swap.</p></blockquote>$html$),
  'Charge of Quarters duty information and schedules for AiT students.',
  true,
  'dynamic',
  105
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();

-- ─── Area Defense Counsel (ADC) ───────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'Area Defense Counsel (ADC)',
  'adc',
  jsonb_build_object('html', $html$<blockquote><p><strong>About the ADC.</strong> The Area Defense Counsel provides free, confidential legal representation to military members. The ADC is completely independent of your chain of command — nothing you discuss with your defense counsel will be shared with anyone without your consent.</p></blockquote><h2>Contact Information</h2><ul><li><strong>Phone:</strong> <a href="tel:2108083300">210-808-3300</a></li><li><strong>Location:</strong> Building 2841, Fort Sam Houston</li><li><strong>Hours:</strong> Mon-Fri 0800-1630</li></ul><h2>Services Provided</h2><ul><li>Representation during administrative actions (LOCs, LORs, Article 15s)</li><li>Courts-martial defense representation</li><li>Advice on military justice matters and your rights under the UCMJ</li><li>Assistance with adverse personnel actions</li><li>Representation at discharge boards and evaluation appeals</li><li>Confidential legal consultations on any military legal matter</li></ul><blockquote><p><strong>Your Right to Counsel.</strong> You have the right to consult with a defense counsel before making any statement or decision in a military justice matter. Don't wait — contact the ADC as soon as you become aware of any legal issue.</p></blockquote>$html$),
  'Free, confidential legal representation for military members.',
  true,
  'dynamic',
  106
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();

-- ─── Finance ──────────────────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'Finance',
  'finance',
  jsonb_build_object('html', $html$<h2>Contact Information</h2><ul><li><strong>Phone:</strong> <a href="tel:2108083400">210-808-3400</a></li><li><strong>Location:</strong> Building 2841, Room 110</li><li><strong>Hours:</strong> Mon-Fri 0800-1530</li><li><strong>Walk-ins:</strong> 0800-1100</li></ul><h2>Common Finance Issues</h2><ul><li><strong>Pay not received</strong> — Visit Finance during walk-in hours with your LES and orders</li><li><strong>BAH/BAS issues</strong> — Bring a copy of your lease or dependent documentation</li><li><strong>Travel voucher</strong> — Submit within 5 business days of arrival; bring receipts and orders</li><li><strong>Debt / overpayment</strong> — Schedule an appointment to set up a payment plan</li><li><strong>Allotments</strong> — Can be set up through myPay or at the Finance office</li></ul><blockquote><p><strong>Important: Check Your LES.</strong> Review your Leave and Earnings Statement (LES) on myPay every month. Report any discrepancies to the Finance office immediately. Catching errors early prevents larger issues down the line.</p></blockquote>$html$),
  'Finance office information, hours, and resources for 937 TG personnel.',
  true,
  'dynamic',
  107
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();

-- ─── EFMP ─────────────────────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'Exceptional Family Member Program',
  'efmp',
  jsonb_build_object('html', $html$<blockquote><p><strong>About EFMP.</strong> The Exceptional Family Member Program (EFMP) is a mandatory enrollment program that works with other military and civilian agencies to provide comprehensive and coordinated community support, housing, educational, and medical services to families with special needs.</p></blockquote><h2>Contact</h2><ul><li><strong>EFMP Phone:</strong> <a href="tel:2108083700">210-808-3700</a></li></ul><h2>Services Provided</h2><ul><li>Identification and enrollment of family members with special needs</li><li>Assignment coordination to ensure medical and educational needs are met</li><li>Referrals to local community resources and support services</li><li>Assistance with Individualized Education Programs (IEPs)</li><li>Connection to respite care and family support programs</li><li>Transition assistance when PCSing to a new duty station</li></ul><h2>Resources</h2><ul><li><a href="https://www.afpc.af.mil/EFMP/">Air Force EFMP Portal</a> — Official Air Force EFMP information and resources</li><li><a href="https://www.militaryonesource.mil/efmp/">Military OneSource EFMP</a> — Comprehensive EFMP resources and support</li><li>STOMP (Specialized Training of Military Parents) — Training and support for military parents of children with special needs</li></ul>$html$),
  'Support and resources for military families with special needs.',
  true,
  'dynamic',
  108
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();

-- ─── JBSA Connect ─────────────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'JBSA Connect',
  'jbsa-connect',
  jsonb_build_object('html', $html$<p>External resources and links for Joint Base San Antonio.</p><h2>JBSA Resources</h2><ul><li><a href="https://www.jbsa.mil">JBSA Official Website</a> — Official Joint Base San Antonio website with news, events, and resources</li><li><a href="https://www.jbsa.mil/About-Us/Fort-Sam-Houston/">JBSA Fort Sam Houston</a> — Fort Sam Houston specific information, maps, and services</li><li><a href="https://www.jbsamwr.com">JBSA MWR</a> — Morale, Welfare, and Recreation activities and facilities</li><li>Military &amp; Family Readiness — Programs and services for military members and their families</li><li>JBSA Education Center — Educational programs, tuition assistance, and testing services</li><li>JBSA Security Forces — Base security, gate hours, and visitor information</li></ul>$html$),
  'External resources and links for Joint Base San Antonio.',
  true,
  'dynamic',
  109
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();

-- ─── Military OneSource ───────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'Military OneSource',
  'military-onesource',
  jsonb_build_object('html', $html$<blockquote><p><strong>Call Anytime (24/7):</strong> <a href="tel:8003429647">800-342-9647</a></p><p><strong>Website:</strong> <a href="https://www.militaryonesource.mil">militaryonesource.mil</a></p></blockquote><h2>Available Services</h2><ul><li><strong>Counseling Services</strong> — Free, confidential non-medical counseling (up to 12 sessions per issue)</li><li><strong>Financial Counseling</strong> — Free financial planning, tax preparation, and debt management assistance</li><li><strong>Legal Services</strong> — Legal consultation for personal matters including wills, powers of attorney, and tax issues</li><li><strong>Spouse &amp; Family Support</strong> — Employment assistance, relocation support, and family life programs</li><li><strong>Education &amp; Career</strong> — Tuition assistance guidance, career counseling, and transition support</li><li><strong>Health &amp; Wellness</strong> — Wellness coaching, stress management, and healthy living resources</li></ul>$html$),
  'Free, confidential support for military members and their families — 24/7.',
  true,
  'dynamic',
  110
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();

-- ─── METC ─────────────────────────────────────────────

INSERT INTO "pages" ("title", "slug", "content", "meta_description", "is_published", "page_type", "sort_order")
VALUES (
  'METC',
  'metc',
  jsonb_build_object('html', $html$<blockquote><p><strong>About METC.</strong> The Medical Education and Training Campus (METC) is the nation's largest military medical training facility, located at JBSA-Fort Sam Houston, Texas. METC consolidates enlisted medical training from all three services into one state-of-the-art campus, providing world-class education to develop the next generation of military healthcare professionals.</p></blockquote><h2>Quick Facts</h2><ul><li><strong>Established:</strong> 2010</li><li><strong>Location:</strong> JBSA-Fort Sam Houston, TX</li><li><strong>Campus Size:</strong> 32 acres</li><li><strong>Annual Graduates:</strong> 28,000+</li><li><strong>Training Programs:</strong> 50+</li><li><strong>Service Branches:</strong> Army, Navy, Air Force</li></ul><h2>Resources &amp; Links</h2><ul><li><a href="https://www.metc.mil">METC Official Website</a> — Official website of the Medical Education &amp; Training Campus</li><li>METC Library — Access digital resources, study materials, and research databases</li><li>Student Services — Academic counseling, tutoring, and student support services</li><li>Simulation Center — State-of-the-art medical simulation and training facilities</li></ul>$html$),
  'Medical Education & Training Campus — the DoD''s premier joint military medical training facility.',
  true,
  'dynamic',
  111
)
ON CONFLICT ("slug") DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  meta_description = EXCLUDED.meta_description,
  is_published = EXCLUDED.is_published,
  page_type = EXCLUDED.page_type,
  updated_at = now();
