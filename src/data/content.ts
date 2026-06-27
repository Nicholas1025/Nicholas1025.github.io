// ----------------------------------------------------------------------------
// Site content — migrated from the previous vanilla site. Edit here to update.
// ----------------------------------------------------------------------------

export const site = {
  name: "Nicholas Tay",
  role: "Aspiring ML / Backend Engineer",
  email: "nicholastay1025@gmail.com",
  github: "https://github.com/Nicholas1025",
  linkedin: "https://www.linkedin.com/in/nicholas-t-bb65831b2/",
  location: "Based in Malaysia",
  tagline: "building things that ship",
};

export const aboutParagraphs: string[] = [
  "I'm a Computer Science undergraduate at Multimedia University focused on machine learning and backend systems. I like problems where the data is messy, the constraints are real, and “it works on my laptop” isn't good enough.",
  "Most of my projects start with a question I couldn't let go of — can you forecast a building's electricity bill? can a script find a trading edge? — and end as something deployed, documented, and measured.",
  "Off the keyboard I'm usually outdoors: multi-day hikes, bouldering, and the occasional campsite where the only uptime that matters is the campfire's.",
];

export const facts: { k: string; v: string; hl?: boolean }[] = [
  { k: "base", v: "Kuala Lumpur, MY" },
  { k: "degree", v: "B.CS (Hons), MMU" },
  { k: "focus", v: "ML systems · backend" },
  { k: "seeking", v: "SWE / ML internships, 2026", hl: true },
  { k: "elsewhere", v: "trails > treadmills" },
];

export interface Project {
  title: string;
  status?: string;
  featured?: boolean;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  tags: string[];
  github?: string;
  demo?: string;
  privateNote?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    title: "AI Framework for Financial Table Understanding",
    status: "FYP · ITEX 2026 Gold",
    featured: true,
    summary:
      "FinValidate — a FastAPI app that extracts financial tables from annual reports and checks whether the numbers actually reconcile.",
    problem:
      "Report tables are built for humans — borderless layouts, merged cells, mixed units and parentheses-for-negatives. Extractors return a tidy grid but never verify that a reported subtotal equals the sum of its line items.",
    approach:
      "A modular pipeline: Table Transformer / PaddleOCR-VL extraction → deterministic numeric normalisation → row classification → a signed subset-sum search that rebuilds each subtotal's formula and flags blocks that don't reconcile, with plain-English explanations.",
    result:
      "99.7% table detection & 91.8% formula verification on real FinTabNet income statements. Every verdict is deterministic and traceable to a cell.",
    tags: ["Python", "FastAPI", "PyTorch", "Table Transformer", "PaddleOCR", "MongoDB"],
    privateNote: "Private · not open source",
    image: "/finvalidate.png",
  },
  {
    title: "URL Shortener",
    summary:
      "Full-stack link shortener with a clean UI, one-click copy, and a persistent history of every link you've made.",
    problem: "Long, messy URLs are awkward to share and impossible to track.",
    approach:
      "Next.js + Tailwind frontend over a PHP API and MySQL — generate a short code, 301-redirect on visit, and count clicks; history persisted in localStorage.",
    result: "Paste → short link in one click, with copy, visit and per-link click tracking.",
    tags: ["Next.js", "TypeScript", "Tailwind", "PHP", "MySQL"],
    github: "https://github.com/Nicholas1025/url-shortener",
    image: "/url-shortener.png",
  },
  {
    title: "AI Strategy Factory",
    summary:
      "A pipeline that mass-produces and stress-tests rule-based trading strategies before a single ringgit is risked.",
    problem: "Backtesting trading ideas one by one is slow and biased.",
    approach:
      "Generates 200+ strategy variants, backtests them on 10 years of data with walk-forward splits, then ranks by risk-adjusted return.",
    result: "Top strategy returned +18.4% out-of-sample vs +9.2% buy-and-hold.",
    tags: ["Python", "pandas", "backtesting.py", "yfinance"],
    github: "https://github.com/Nicholas1025/ai_strategy_factory_Tester",
  },
  {
    title: "MMU Enrollment System",
    summary:
      "Full-stack course enrollment platform with role-based dashboards for students, lecturers and admins.",
    problem: "Manual enrollment spreadsheets caused clashes and double-bookings every semester.",
    approach: "Flask + PostgreSQL app with clash detection, seat caps and an admin approval flow.",
    result: "Handles 1,200+ students in load tests with zero scheduling conflicts.",
    tags: ["Flask", "PostgreSQL", "Jinja", "Bootstrap"],
    github: "https://github.com/Nicholas1025/MMU-ENROLLMENT-SYSTEM",
  },
  {
    title: "Smart Course Matching",
    summary: "Timetable maker that turns a list of wanted subjects into a clash-free weekly schedule.",
    problem: "Students juggle dozens of section combinations by hand each semester.",
    approach:
      "Constraint solver scores every valid combination against preferences like “no 8am classes” and gap minimisation.",
    result: "Full semester schedule generated in < 2 seconds across 40+ sections.",
    tags: ["Python", "Flask", "OR-Tools", "React"],
    github: "https://github.com/Nicholas1025/Smart-Course-Matching",
  },
];

export interface TimelineItem {
  when: string;
  kind: string;
  title: string;
  org: string;
  bullets: string[];
}

export const experience: TimelineItem[] = [
  {
    when: "May 2026",
    kind: "Award",
    title: "Gold Award — ITEX 2026",
    org: "MINDS · International Invention, Innovation & Technology Exhibition — with Multimedia University",
    bullets: [
      "Won Gold for “AI-Driven Financial Table Validation” — automating financial table extraction and cross-statement audit checks.",
      "As Lead Backend & Logic Engineer, built the OCR + VLM extraction pipeline and a Python rule-based accounting validation engine; extended the FinTabNet ground truth beyond TEDS.",
      "99.7% table detection & 91.8% formula verification — aligned with UN SDG 9 & 16.",
    ],
  },
  {
    when: "2024 – 2026 (expected)",
    kind: "Education",
    title: "B.CS (Hons) Computer Science",
    org: "Multimedia University (MMU), Cyberjaya",
    bullets: [
      "Received the Dean's List every semester.",
      "Coursework: machine learning, algorithms, databases, distributed systems.",
    ],
  },
];

export interface BlogPost {
  slug: string;
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "gradient-descent-at-2000-meters",
    date: "Mar 14, 2026",
    readingTime: "7 min read",
    title: "Gradient Descent at 2,000 Meters",
    excerpt:
      "What a sunrise hike up Gunung Irau taught me about learning rates, local minima, and knowing when to stop.",
    featured: true,
  },
  {
    slug: "i-backtested-200-trading-strategies",
    date: "Jan 22, 2026",
    readingTime: "9 min read",
    title: "I Backtested 200 Trading Strategies. Most of Them Lied.",
    excerpt:
      "Survivorship bias, look-ahead leaks, and the three checks that separate a real edge from a pretty equity curve.",
  },
  {
    slug: "shipping-a-flask-app-to-1200-students",
    date: "Nov 8, 2025",
    readingTime: "6 min read",
    title: "Shipping a Flask App to 1,200 Students: A Postmortem",
    excerpt:
      "Everything that went wrong in week one of the enrollment system — and the boring engineering that fixed it.",
  },
  {
    slug: "the-bouldering-guide-to-debugging",
    date: "Sep 19, 2025",
    readingTime: "5 min read",
    title: "The Bouldering Guide to Debugging",
    excerpt:
      "Read the route before you touch the wall. Rest when pumped. Fall safely. It's all the same sport.",
  },
  {
    slug: "forecasting-a-city-blocks-power-bill",
    date: "Jul 3, 2025",
    readingTime: "8 min read",
    title: "Forecasting a City Block's Power Bill with XGBoost",
    excerpt:
      "Feature engineering for time series when the weather, the calendar, and human laziness all matter.",
  },
];
