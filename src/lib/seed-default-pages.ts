import type { ContentBlock } from "./block-types";

export type DefaultPageSeed = {
  slug: string;
  title: string;
  metaDescription: string;
  blocks: ContentBlock[];
};

const aitGuide: DefaultPageSeed = {
  slug: "ait-guide",
  title: "Airmen in Training Guide",
  metaDescription:
    "Essential information for all AiT students at the 937th Training Group.",
  blocks: [
    {
      type: "infoCard",
      data: {
        icon: "BookOpen",
        iconColor: "blue",
        title: "Welcome, Airman",
        text: "This guide outlines the standards, expectations, and daily life for Airmen in Training at the 937th Training Group. Read it carefully and refer back to it as needed. Your MTL is your primary resource for questions — never hesitate to ask.",
      },
    },
    {
      type: "listCard",
      data: {
        icon: "Shield",
        iconColor: "blue",
        title: "Standards of Conduct",
        variant: "default",
        items: [
          "Maintain military bearing and professional appearance at all times",
          "Address all personnel by proper rank and title",
          "Adhere to curfew times: 2200 (Sun-Thu), 0000 (Fri-Sat)",
          "No alcohol consumption for students under 21; 21+ must follow base policy",
          "Report any safety concerns or incidents to your MTL immediately",
          "Maintain accountability — always sign in/out when leaving the dormitory",
        ],
      },
    },
    {
      type: "listCard",
      data: {
        icon: "Clock",
        iconColor: "green",
        title: "Daily Schedule",
        variant: "default",
        items: [
          "0500 - Reveille / Wake up",
          "0530 - Physical Training (Mon, Wed, Fri)",
          "0630 - Personal hygiene and room preparation",
          "0700 - Breakfast at DFAC",
          "0730 - Formation / Accountability",
          "0800-1600 - Academic training",
          "1630 - Return to dormitory / Personal time",
          "2100 - Room check / Accountability",
          "2200 - Lights out (weekdays)",
        ],
      },
    },
    {
      type: "listCard",
      data: {
        icon: "Shirt",
        iconColor: "purple",
        title: "Uniform Standards",
        variant: "default",
        items: [
          "OCPs required for all training days unless otherwise directed",
          "PT gear required for scheduled physical training",
          "Civilian attire authorized during off-duty hours (must be appropriate)",
          "Maintain clean, pressed uniforms at all times",
          "Name tapes, rank, and all required accoutrements properly placed",
          "Hair must be within Air Force standards at all times",
        ],
      },
    },
    {
      type: "listCard",
      data: {
        icon: "Smartphone",
        iconColor: "amber",
        title: "Technology & Electronics",
        variant: "default",
        items: [
          "Cell phones may be used during personal time only",
          "No phones during formations, classes, or duty hours unless authorized",
          "No recording devices in classrooms without instructor approval",
          "Wi-Fi available in dormitory common areas",
          "Gaming consoles allowed in rooms during personal time",
          "Social media use must comply with OPSEC and Air Force policy",
        ],
      },
    },
    {
      type: "listCard",
      data: {
        icon: "AlertTriangle",
        iconColor: "red",
        title: "Critical Rules",
        variant: "critical",
        items: [
          "Absolutely no fraternization between students and permanent party",
          "Zero tolerance for drug use — random testing is conducted",
          "Dormitory rooms are subject to inspection at any time",
          "Off-limits areas and establishments are posted — compliance is mandatory",
          "Battle buddy system required when traveling off-base after dark",
        ],
      },
    },
  ],
};

const inProcessing: DefaultPageSeed = {
  slug: "in-processing",
  title: "In-Processing",
  metaDescription:
    "Welcome to the 937th Training Group! Follow this checklist to complete your in-processing.",
  blocks: [
    {
      type: "stepsCard",
      data: {
        badge: "Day 1",
        title: "Phase 1: Arrival",
        timeframe: "Day 1",
        items: [
          "Report to 937 TG Reception Center with your orders and military ID",
          "Receive dormitory room assignment and bedding",
          "Get issued meal card / DFAC access",
          "Complete initial safety and orientation briefing",
          "Register personal vehicle with Security Forces (if applicable)",
          "Receive welcome packet with base map and key phone numbers",
        ],
      },
    },
    {
      type: "stepsCard",
      data: {
        badge: "Days 1-3",
        title: "Phase 2: Administrative",
        timeframe: "Days 1-3",
        items: [
          "In-process with the 937 TG Orderly Room (bring orders, ID, medical records)",
          "Update DEERS and personnel records",
          "Set up military email and CAC email certificates",
          "Complete mandatory online training (SAPR, Cyber Awareness, OPSEC, etc.)",
          "Enroll in TRICARE and verify medical benefits",
          "Register with the base Dental Clinic",
          "Set up direct deposit / verify finance records",
          "Obtain required uniforms and gear from supply",
        ],
      },
    },
    {
      type: "stepsCard",
      data: {
        badge: "Week 1",
        title: "Phase 3: Orientation",
        timeframe: "Week 1",
        items: [
          "Attend 937 TG Commander's Welcome Brief",
          "Complete campus and base orientation tour",
          "Meet your assigned Military Training Leader (MTL)",
          "Review DFAC hours, shuttle routes, and base services",
          "Read and acknowledge the AiT Student Guide and standards",
          "Attend academic orientation for your training program",
          "Obtain your class schedule and training materials",
          "Complete initial fitness assessment (if required)",
        ],
      },
    },
    {
      type: "listCard",
      data: {
        icon: "Lightbulb",
        iconColor: "amber",
        title: "Pro Tips",
        variant: "tip",
        items: [
          "Bring multiple copies of your orders — you'll need them at several offices.",
          "Keep a folder with all your important documents organized and accessible.",
          "Save key phone numbers in your phone on Day 1 — especially your MTL and Orderly Room.",
          "Ask questions! Your MTL and fellow students are here to help you succeed.",
          "The DFAC schedule may differ on weekends — check the posted hours.",
          "Download or bookmark this app for quick access to all 937 TG resources.",
        ],
      },
    },
  ],
};

const outProcessing: DefaultPageSeed = {
  slug: "out-processing",
  title: "Out-Processing",
  metaDescription:
    "Checklist for departing personnel — follow these steps to ensure a smooth transition.",
  blocks: [
    {
      type: "stepsCard",
      data: {
        badge: "2+ Weeks Out",
        title: "Phase 1: Notification",
        timeframe: "2+ weeks before departure",
        items: [
          "Receive PCS orders or graduation notification",
          "Schedule out-processing appointment with the Orderly Room",
          "Obtain and begin your clearing checklist",
          "Notify your MTL of your departure date",
          "Begin organizing personal items and packing",
        ],
      },
    },
    {
      type: "stepsCard",
      data: {
        badge: "1-2 Weeks Out",
        title: "Phase 2: Clearing",
        timeframe: "1-2 weeks before departure",
        items: [
          "Clear dormitory room (schedule room inspection with your MTL)",
          "Return all issued equipment, linens, and gear to supply",
          "Clear with supply and logistics",
          "Complete medical records review and transfer",
          "Finance final out-processing and travel voucher",
          "Turn in meal card to the DFAC",
          "Clear with the base library (return any borrowed items)",
          "Return any training materials or textbooks",
        ],
      },
    },
    {
      type: "stepsCard",
      data: {
        badge: "Final Days",
        title: "Phase 3: Final Steps",
        timeframe: "Last 3 days",
        items: [
          "Attend final formation or graduation rehearsal",
          "Complete all out-processing checklist signatures",
          "Collect copies of training records and certificates",
          "Set up mail forwarding to your next duty station",
          "Update personnel records with new duty station information",
          "Turn in temporary base access passes (if applicable)",
          "Ensure all personal items are removed from dormitory",
          "Report to the Orderly Room for final out-processing sign-off",
        ],
      },
    },
    {
      type: "listCard",
      data: {
        icon: "AlertTriangle",
        iconColor: "amber",
        title: "Important Reminders",
        variant: "warning",
        items: [
          "Start your clearing process early — some offices have limited appointment availability.",
          "Double-check that you have copies of ALL training certificates before departing.",
          "Ensure your travel voucher is submitted and correct before leaving.",
          "Update your forwarding address with the post office and USPS.",
          "Take photos of your cleared room before turning in the key.",
        ],
      },
    },
  ],
};

const routeOfMarch: DefaultPageSeed = {
  slug: "route-of-march",
  title: "Route of March",
  metaDescription:
    "Formation route details for daily marches to and from training.",
  blocks: [
    {
      type: "listCard",
      data: {
        icon: "Route",
        iconColor: "blue",
        title: "Daily Formation Route",
        variant: "default",
        items: [
          "Form up at AiT Dormitories (Building 2840) parking lot",
          "March south on Stanley Road",
          "Turn left onto Gruber Road",
          "Continue to METC Campus main entrance (Building 2841)",
          "Formation dismissal at designated training building",
        ],
      },
    },
    {
      type: "contactGrid",
      data: {
        columns: 2,
        entries: [
          {
            icon: "Clock",
            iconColor: "blue",
            label: "Morning Formation",
            value: "0720 form up / 0730 step-off",
          },
          {
            icon: "Clock",
            iconColor: "blue",
            label: "Afternoon Return",
            value: "1630 form up / 1640 step-off",
          },
        ],
      },
    },
    {
      type: "listCard",
      data: {
        icon: "CheckCircle2",
        iconColor: "blue",
        title: "Formation Guidelines",
        variant: "default",
        items: [
          "Arrive at formation area 10 minutes prior to step-off time",
          "Maintain proper formation alignment and cadence at all times",
          "Road guards will be posted at all intersections — follow their instructions",
          "No cell phones during march — stow all electronic devices",
          "Carry water during warm weather months (April - October)",
          "Report any injuries or issues to your element leader immediately",
          "Reflective belts required during hours of limited visibility",
        ],
      },
    },
  ],
};

const saferep: DefaultPageSeed = {
  slug: "saferep",
  title: "SAFEREP",
  metaDescription:
    "Safety reporting information — if you see something unsafe, report it.",
  blocks: [
    {
      type: "infoCard",
      data: {
        icon: "ShieldAlert",
        iconColor: "red",
        title: "Safety is Everyone's Responsibility",
        text: "The 937th Training Group is committed to maintaining a safe environment for all personnel. If you observe an unsafe condition or experience a safety incident, report it immediately. All reports can be made anonymously.",
      },
    },
    {
      type: "contactGrid",
      data: {
        columns: 2,
        entries: [
          {
            icon: "Phone",
            iconColor: "red",
            label: "Emergency (immediate danger)",
            value: "911",
            href: "tel:911",
          },
          {
            icon: "Phone",
            iconColor: "blue",
            label: "Safety Office (non-emergency)",
            value: "210-808-3800",
            href: "tel:2108083800",
          },
        ],
      },
    },
    {
      type: "listCard",
      data: {
        title: "What to Report",
        variant: "critical",
        items: [
          "Unsafe conditions in dormitories, training facilities, or common areas",
          "Hazardous material spills or exposure",
          "Workplace injuries or near-miss incidents",
          "Vehicle accidents (on or off base)",
          "Faulty or damaged equipment",
          "Fire hazards or electrical issues",
          "Slip, trip, and fall hazards",
          "Any condition that could cause injury or property damage",
        ],
      },
    },
    {
      type: "ctaBanner",
      data: {
        icon: "ShieldAlert",
        title: "See Something? Say Something.",
        text: "You will never be penalized for reporting a safety concern in good faith. Your report could prevent an injury or save a life. Report to your MTL, supervisor, or call the Safety Office directly.",
        variant: "dark",
      },
    },
  ],
};

const spartanFlight: DefaultPageSeed = {
  slug: "spartan-flight",
  title: "Spartan Flight / CQ Duty",
  metaDescription:
    "Charge of Quarters duty information and schedules for AiT students.",
  blocks: [
    {
      type: "infoCard",
      data: {
        icon: "Shield",
        iconColor: "blue",
        title: "About CQ Duty",
        text: "Charge of Quarters (CQ) is a rotating duty assigned to AiT students to maintain security and accountability in the dormitories during after-duty hours. CQ runners work in shifts alongside the Duty MTL to ensure the safety and well-being of all dormitory residents.",
      },
    },
    {
      type: "contactGrid",
      data: {
        columns: 3,
        entries: [
          {
            icon: "Clock",
            iconColor: "blue",
            label: "Shift 1",
            value: "1800 - 0000",
          },
          {
            icon: "Clock",
            iconColor: "blue",
            label: "Shift 2",
            value: "0000 - 0600",
          },
          {
            icon: "Phone",
            iconColor: "blue",
            label: "CQ Desk",
            value: "210-808-3150",
            href: "tel:2108083150",
          },
        ],
      },
    },
    {
      type: "listCard",
      data: {
        title: "CQ Duties",
        variant: "default",
        items: [
          "Monitor dormitory entrance and maintain visitor log",
          "Conduct hourly floor checks and accountability",
          "Report emergencies and security incidents to MTL on duty",
          "Ensure quiet hours are maintained (2200-0600)",
          "Monitor fire and safety systems",
          "Assist students with after-hours issues",
          "Maintain CQ log with all notable events",
        ],
      },
    },
    {
      type: "listCard",
      data: {
        title: "What to Bring",
        variant: "tip",
        items: [
          "Military ID / CAC",
          "Water and authorized snacks",
          "Study materials (academics encouraged during downtime)",
          "Uniform items for next duty day",
          "Phone charger",
        ],
      },
    },
    {
      type: "callout",
      data: {
        variant: "warning",
        title: "Important",
        text: "CQ duty is a military requirement. Failure to report for duty or abandoning your post may result in disciplinary action. If you have a conflict, notify your MTL as soon as possible to arrange a swap.",
      },
    },
  ],
};

const adc: DefaultPageSeed = {
  slug: "adc",
  title: "Area Defense Counsel (ADC)",
  metaDescription:
    "Free, confidential legal representation for military members.",
  blocks: [
    {
      type: "infoCard",
      data: {
        icon: "Scale",
        iconColor: "blue",
        title: "About the ADC",
        text: "The Area Defense Counsel provides free, confidential legal representation to military members. The ADC is completely independent of your chain of command — nothing you discuss with your defense counsel will be shared with anyone without your consent.",
      },
    },
    {
      type: "contactGrid",
      data: {
        columns: 3,
        entries: [
          {
            icon: "Phone",
            iconColor: "blue",
            label: "Phone",
            value: "210-808-3300",
            href: "tel:2108083300",
          },
          {
            icon: "MapPin",
            iconColor: "blue",
            label: "Location",
            value: "Building 2841, Fort Sam Houston",
          },
          {
            icon: "Clock",
            iconColor: "blue",
            label: "Hours",
            value: "Mon-Fri 0800-1630",
          },
        ],
      },
    },
    {
      type: "listCard",
      data: {
        icon: "Shield",
        iconColor: "blue",
        title: "Services Provided",
        variant: "default",
        items: [
          "Representation during administrative actions (LOCs, LORs, Article 15s)",
          "Courts-martial defense representation",
          "Advice on military justice matters and your rights under the UCMJ",
          "Assistance with adverse personnel actions",
          "Representation at discharge boards and evaluation appeals",
          "Confidential legal consultations on any military legal matter",
        ],
      },
    },
    {
      type: "ctaBanner",
      data: {
        icon: "Shield",
        title: "Your Right to Counsel",
        text: "You have the right to consult with a defense counsel before making any statement or decision in a military justice matter. Don't wait — contact the ADC as soon as you become aware of any legal issue.",
        variant: "dark",
      },
    },
  ],
};

const finance: DefaultPageSeed = {
  slug: "finance",
  title: "Finance",
  metaDescription:
    "Finance office information, hours, and resources for 937 TG personnel.",
  blocks: [
    {
      type: "contactGrid",
      data: {
        columns: 3,
        entries: [
          {
            icon: "Phone",
            iconColor: "blue",
            label: "Phone",
            value: "210-808-3400",
            href: "tel:2108083400",
          },
          {
            icon: "MapPin",
            iconColor: "blue",
            label: "Location",
            value: "Building 2841, Room 110",
          },
          {
            icon: "Clock",
            iconColor: "blue",
            label: "Hours",
            value: "Mon-Fri 0800-1530",
            subtext: "Walk-ins: 0800-1100",
          },
        ],
      },
    },
    {
      type: "listCard",
      data: {
        icon: "DollarSign",
        iconColor: "blue",
        title: "Common Finance Issues",
        variant: "default",
        items: [
          {
            title: "Pay not received",
            description:
              "Visit Finance during walk-in hours with your LES and orders",
          },
          {
            title: "BAH/BAS issues",
            description: "Bring a copy of your lease or dependent documentation",
          },
          {
            title: "Travel voucher",
            description:
              "Submit within 5 business days of arrival; bring receipts and orders",
          },
          {
            title: "Debt / overpayment",
            description: "Schedule an appointment to set up a payment plan",
          },
          {
            title: "Allotments",
            description:
              "Can be set up through myPay or at the Finance office",
          },
        ],
      },
    },
    {
      type: "callout",
      data: {
        variant: "warning",
        title: "Important: Check Your LES",
        text: "Review your Leave and Earnings Statement (LES) on myPay every month. Report any discrepancies to the Finance office immediately. Catching errors early prevents larger issues down the line.",
      },
    },
  ],
};

const efmp: DefaultPageSeed = {
  slug: "efmp",
  title: "Exceptional Family Member Program",
  metaDescription:
    "Support and resources for military families with special needs.",
  blocks: [
    {
      type: "infoCard",
      data: {
        icon: "HeartHandshake",
        iconColor: "pink",
        title: "About EFMP",
        text: "The Exceptional Family Member Program (EFMP) is a mandatory enrollment program that works with other military and civilian agencies to provide comprehensive and coordinated community support, housing, educational, and medical services to families with special needs.",
      },
    },
    {
      type: "contactGrid",
      data: {
        columns: 2,
        entries: [
          {
            icon: "Phone",
            iconColor: "blue",
            label: "EFMP Contact",
            value: "210-808-3700",
            href: "tel:2108083700",
          },
        ],
      },
    },
    {
      type: "listCard",
      data: {
        icon: "CheckCircle2",
        iconColor: "pink",
        title: "Services Provided",
        variant: "default",
        items: [
          "Identification and enrollment of family members with special needs",
          "Assignment coordination to ensure medical and educational needs are met",
          "Referrals to local community resources and support services",
          "Assistance with Individualized Education Programs (IEPs)",
          "Connection to respite care and family support programs",
          "Transition assistance when PCSing to a new duty station",
        ],
      },
    },
    {
      type: "resourceGrid",
      data: {
        columns: 3,
        resources: [
          {
            icon: "Globe",
            iconColor: "pink",
            title: "Air Force EFMP Portal",
            description:
              "Official Air Force EFMP information and resources",
            url: "https://www.afpc.af.mil/EFMP/",
          },
          {
            icon: "Globe",
            iconColor: "pink",
            title: "Military OneSource EFMP",
            description: "Comprehensive EFMP resources and support",
            url: "https://www.militaryonesource.mil/efmp/",
          },
          {
            icon: "Users",
            iconColor: "pink",
            title: "STOMP (Specialized Training of Military Parents)",
            description:
              "Training and support for military parents of children with special needs",
            url: "#",
          },
        ],
      },
    },
  ],
};

const jbsaConnect: DefaultPageSeed = {
  slug: "jbsa-connect",
  title: "JBSA Connect",
  metaDescription: "External resources and links for Joint Base San Antonio.",
  blocks: [
    {
      type: "resourceGrid",
      data: {
        columns: 3,
        resources: [
          {
            icon: "Globe",
            title: "JBSA Official Website",
            description:
              "Official Joint Base San Antonio website with news, events, and resources",
            url: "https://www.jbsa.mil",
          },
          {
            icon: "MapPin",
            title: "JBSA Fort Sam Houston",
            description:
              "Fort Sam Houston specific information, maps, and services",
            url: "https://www.jbsa.mil/About-Us/Fort-Sam-Houston/",
          },
          {
            icon: "Heart",
            title: "JBSA MWR",
            description:
              "Morale, Welfare, and Recreation activities and facilities",
            url: "https://www.jbsamwr.com",
          },
          {
            icon: "Home",
            title: "Military & Family Readiness",
            description:
              "Programs and services for military members and their families",
            url: "#",
          },
          {
            icon: "GraduationCap",
            title: "JBSA Education Center",
            description:
              "Educational programs, tuition assistance, and testing services",
            url: "#",
          },
          {
            icon: "Shield",
            title: "JBSA Security Forces",
            description: "Base security, gate hours, and visitor information",
            url: "#",
          },
        ],
      },
    },
  ],
};

const militaryOneSource: DefaultPageSeed = {
  slug: "military-onesource",
  title: "Military OneSource",
  metaDescription:
    "Free, confidential support for military members and their families — 24/7.",
  blocks: [
    {
      type: "ctaBanner",
      data: {
        icon: "Phone",
        title: "Call Anytime (24/7)",
        text: "800-342-9647",
        variant: "dark",
      },
    },
    {
      type: "ctaBanner",
      data: {
        icon: "Globe",
        title: "militaryonesource.mil",
        text: "Visit the Military OneSource website for full resources and services",
        variant: "blue",
      },
    },
    {
      type: "cardGrid",
      data: {
        heading: "Available Services",
        columns: 3,
        cards: [
          {
            icon: "Brain",
            iconColor: "purple",
            title: "Counseling Services",
            description:
              "Free, confidential non-medical counseling (up to 12 sessions per issue)",
          },
          {
            icon: "DollarSign",
            iconColor: "green",
            title: "Financial Counseling",
            description:
              "Free financial planning, tax preparation, and debt management assistance",
          },
          {
            icon: "Scale",
            iconColor: "blue",
            title: "Legal Services",
            description:
              "Legal consultation for personal matters including wills, powers of attorney, and tax issues",
          },
          {
            icon: "Users",
            iconColor: "pink",
            title: "Spouse & Family Support",
            description:
              "Employment assistance, relocation support, and family life programs",
          },
          {
            icon: "GraduationCap",
            iconColor: "amber",
            title: "Education & Career",
            description:
              "Tuition assistance guidance, career counseling, and transition support",
          },
          {
            icon: "Heart",
            iconColor: "red",
            title: "Health & Wellness",
            description:
              "Wellness coaching, stress management, and healthy living resources",
          },
        ],
      },
    },
  ],
};

const metc: DefaultPageSeed = {
  slug: "metc",
  title: "METC",
  metaDescription:
    "Medical Education & Training Campus — the DoD's premier joint military medical training facility.",
  blocks: [
    {
      type: "infoCard",
      data: {
        icon: "GraduationCap",
        iconColor: "indigo",
        title: "About METC",
        text: "The Medical Education and Training Campus (METC) is the nation's largest military medical training facility, located at JBSA-Fort Sam Houston, Texas. METC consolidates enlisted medical training from all three services into one state-of-the-art campus, providing world-class education to develop the next generation of military healthcare professionals.",
      },
    },
    {
      type: "statsGrid",
      data: {
        columns: 6,
        stats: [
          { label: "Established", value: "2010" },
          { label: "Location", value: "JBSA-FSH, TX" },
          { label: "Campus Size", value: "32 acres" },
          { label: "Annual Graduates", value: "28,000+" },
          { label: "Training Programs", value: "50+" },
          { label: "Service Branches", value: "Army/Navy/AF" },
        ],
      },
    },
    {
      type: "resourceGrid",
      data: {
        columns: 2,
        resources: [
          {
            icon: "Building2",
            iconColor: "indigo",
            title: "METC Official Website",
            description:
              "Official website of the Medical Education & Training Campus",
            url: "https://www.metc.mil",
          },
          {
            icon: "Building2",
            iconColor: "indigo",
            title: "METC Library",
            description:
              "Access digital resources, study materials, and research databases",
            url: "#",
          },
          {
            icon: "Building2",
            iconColor: "indigo",
            title: "Student Services",
            description:
              "Academic counseling, tutoring, and student support services",
            url: "#",
          },
          {
            icon: "Building2",
            iconColor: "indigo",
            title: "Simulation Center",
            description:
              "State-of-the-art medical simulation and training facilities",
            url: "#",
          },
        ],
      },
    },
  ],
};

const leadershipPrograms: DefaultPageSeed = {
  slug: "leadership-programs",
  title: "Airman Leadership Programs",
  metaDescription:
    "Student leadership opportunities through the Rope Program at the 937th Training Group.",
  blocks: [
    {
      type: "infoCard",
      data: {
        icon: "Award",
        iconColor: "blue",
        title: "The Rope Program",
        text: "The Rope Program provides Airmen in Training with the opportunity to develop leadership skills while serving their peers. Student leaders wear colored rope aiguillettes on their uniform to signify their position. Each level carries increasing responsibility and is an excellent way to distinguish yourself during technical training.",
      },
    },
    { type: "ropePrograms", data: {} },
    {
      type: "ctaBanner",
      data: {
        title: "Interested in Becoming a Rope?",
        text: "Speak with your MTL about eligibility and the application process. Leadership starts with stepping up — your MTL can guide you through the requirements and help you begin your leadership journey.",
        variant: "dark",
      },
    },
  ],
};

const dfacHours: DefaultPageSeed = {
  slug: "dfac-hours",
  title: "DFAC Hours",
  metaDescription: "Rocco Dining Facility meal schedule and information.",
  blocks: [
    {
      type: "infoCard",
      data: {
        icon: "Coffee",
        iconColor: "amber",
        title: "Rocco Dining Facility",
        text: "Building 2846, Fort Sam Houston. Meal card required for entry. All AiT students are authorized to eat at the DFAC during posted meal times.",
      },
    },
    { type: "scheduleDisplay", data: { scheduleType: "dfac" } },
    {
      type: "callout",
      data: {
        variant: "warning",
        title: "Note",
        text: "Hours are subject to change for holidays, training exercises, or special events. Check with your MTL or the DFAC directly for the most current schedule.",
      },
    },
  ],
};

const shuttle: DefaultPageSeed = {
  slug: "shuttle",
  title: "Shuttle Route",
  metaDescription:
    "Base shuttle schedule and route information for JBSA-Fort Sam Houston.",
  blocks: [
    { type: "scheduleDisplay", data: { scheduleType: "shuttle" } },
    {
      type: "callout",
      data: {
        variant: "warning",
        title: "Note",
        text: "Shuttle service may be reduced or suspended during holidays, inclement weather, or special events. Always have a backup plan for transportation to training.",
      },
    },
  ],
};

const afscs: DefaultPageSeed = {
  slug: "afscs",
  title: "Air Force Specialty Codes (AFSCs)",
  metaDescription: "Medical AFSCs trained at the 937th Training Group and METC.",
  blocks: [
    {
      type: "infoCard",
      data: {
        icon: "GraduationCap",
        iconColor: "blue",
        title: "Medical Training Programs",
        text: "The 937th Training Group oversees Air Force students attending medical technical training at METC. Below are the primary AFSCs trained here. Training durations are approximate and subject to change.",
      },
    },
    { type: "afscGrid", data: {} },
  ],
};

const leadership: DefaultPageSeed = {
  slug: "leadership",
  title: "Meet Your Leadership",
  metaDescription:
    "The command team of the 937th Training Group at JBSA-Fort Sam Houston.",
  blocks: [{ type: "leadershipDisplay", data: {} }],
};

const locations: DefaultPageSeed = {
  slug: "locations",
  title: "Locations",
  metaDescription:
    "Key locations on and around JBSA-Fort Sam Houston for 937 TG personnel.",
  blocks: [{ type: "locationGrid", data: {} }],
};

const mtls: DefaultPageSeed = {
  slug: "mtls",
  title: "Meet Your MTLs",
  metaDescription:
    "Military Training Leaders are the NCOs dedicated to mentoring and developing Airmen in Training.",
  blocks: [
    {
      type: "cardGrid",
      data: {
        columns: 2,
        cards: [
          {
            icon: "Users",
            iconColor: "blue",
            title: "What is an MTL?",
            description:
              "Military Training Leaders (MTLs) are experienced Non-Commissioned Officers assigned to supervise Airmen in Training (AiT) in their dormitories. They serve as mentors, role models, and the first line of support for students throughout their technical training journey.",
          },
          {
            icon: "Target",
            iconColor: "amber",
            title: "MTL Mission",
            description:
              "Our MTLs are dedicated to mentoring, training, and developing the next generation of Warrior Medics. They ensure a safe, disciplined, and professional living environment while fostering personal growth and military readiness in every student.",
          },
        ],
      },
    },
    { type: "mtlGrid", data: {} },
  ],
};

const phoneNumbers: DefaultPageSeed = {
  slug: "phone-numbers",
  title: "Important Phone Numbers",
  metaDescription:
    "Find contact information for key offices and services. Tap any number to call.",
  blocks: [{ type: "phoneDirectory", data: {} }],
};

const links: DefaultPageSeed = {
  slug: "links",
  title: "Links",
  metaDescription: "Curated link collections and external resources.",
  blocks: [{ type: "linkCollections", data: {} }],
};

const files: DefaultPageSeed = {
  slug: "files",
  title: "Files & Downloads",
  metaDescription: "Documents, forms, and resources uploaded by admin staff.",
  blocks: [{ type: "fileGrid", data: {} }],
};

const workOrders: DefaultPageSeed = {
  slug: "work-orders",
  title: "Submit a Work Order",
  metaDescription:
    "Report maintenance issues in dormitories or facilities. You'll receive a reference number to track your request.",
  blocks: [{ type: "workOrderForm", data: {} }],
};

const share: DefaultPageSeed = {
  slug: "share",
  title: "Share This App",
  metaDescription: "Share the 937th Training Group app with your fellow Airmen.",
  blocks: [{ type: "shareWidget", data: {} }],
};

export const DEFAULT_PAGES: DefaultPageSeed[] = [
  aitGuide,
  inProcessing,
  outProcessing,
  routeOfMarch,
  saferep,
  spartanFlight,
  adc,
  finance,
  efmp,
  jbsaConnect,
  militaryOneSource,
  metc,
  leadershipPrograms,
  dfacHours,
  shuttle,
  afscs,
  leadership,
  locations,
  mtls,
  phoneNumbers,
  links,
  files,
  workOrders,
  share,
];
