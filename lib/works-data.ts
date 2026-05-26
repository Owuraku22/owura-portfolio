export interface CodeSnippet {
  language: string;
  label: string;
  code: string;
}

export interface ImplementationLayer {
  title: string;
  description: string;
  points: string[];
  snippets?: CodeSnippet[];
}

export interface Challenge {
  title: string;
  description: string;
  solution: string;
}

export interface ImpactMetric {
  metric: string;
  before: string;
  after: string;
  improvement: string;
}

export interface WorkData {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  summary: string;
  readTime: string;
  snapshot: {
    role: string;
    duration: string;
    stack: string[];
    context: string;
    outcome: string;
  };
  problem: {
    context: string;
    pain: string;
    stakes: string;
  };
  goals: {
    technical: string[];
    constraints: string[];
  };
  architecture: {
    diagram: string;
    overview: string;
    components: { name: string; purpose: string }[];
    decisions: { decision: string; rationale: string }[];
  };
  implementation: ImplementationLayer[];
  challenges: Challenge[];
  impact: {
    summary: string;
    metrics: ImpactMetric[];
    businessOutcome: string;
  };
  reflections: {
    wouldDoDifferently: string[];
    keyTakeaways: string[];
  };
}

export const works: WorkData[] = [
/* ─────────────────────────────────────────────────────────
     3. PNTSH — Group Fees & Payments Platform
   ───────────────────────────────────────────────────────── */
  {
    id: "pntsh",
    title: "PNTSH",
    category: "Backend Engineering",
    description:
      "Laravel backend for group fees and contributions — invites, payments (Paystack), OTP-verified withdrawals, notifications, and a Filament admin panel.",
    thumbnail: "/projects/pntsh/pntsh-screen-1.png",
    summary:
      "PNTSH is a Laravel 12 API powering a group-based contributions product. It supports group creation and membership, invite flows, fee creation, member payments via Paystack, and owner withdrawals with OTP-verified payout accounts — with notifications delivered via email and push.",
    readTime: "6 min read",
    snapshot: {
      role: "Backend Developer",
      duration: "2026",
      stack: [
        "Laravel 12",
        "PHP",
        "MySQL",
        "Laravel Sanctum",
        "Filament",
        "Paystack",
        "Hubtel SMS",
        "Firebase FCM",
        "Laravel Mail",
      ],
      context: "Backend API Project",
      outcome:
        "Group invites + fee payments · Paystack verification webhooks · OTP-verified withdrawals",
    },
    problem: {
      context:
        "Group contributions need simple, reliable flows: create a group, invite members, collect payments, and let owners withdraw funds safely — all while keeping accounting accurate.",
      pain:
        "Without strong payment verification, idempotent callbacks, and safe withdrawal controls, financial flows become inconsistent and risky. Small edge cases (duplicate webhooks, partial payments, unverified payout accounts) cause big issues.",
      stakes:
        "Payments must be trustworthy and auditable. Users need confidence that their contributions are recorded correctly, and group owners need safe withdrawals with clear checks and balances.",
    },
    goals: {
      technical: [
        "Secure auth for mobile clients (Sanctum)",
        "Group + membership management with ownership controls",
        "Two invite modes: direct invites and invite links",
        "Fee creation and tracking (active/closed) with accurate totals",
        "Payments via Paystack (init + verify + webhook handling)",
        "Withdrawals via Paystack transfers with OTP verification",
        "Notifications via email + push (FCM)",
        "Admin operations via Filament",
      ],
      constraints: [
        "Design for webhook retries (idempotency)",
        "Keep accounting updates consistent and transaction-safe",
        "Treat withdrawals as high-risk actions with extra verification",
      ],
    },
    architecture: {
      diagram: "/projects/pntsh/pntsh-architecture.png",
      overview:
        "A layered Laravel API (routes → controllers → services → Eloquent/MySQL) with dedicated modules for groups, invites, fees, payments, withdrawals, and notifications. Payments and withdrawals integrate with Paystack, payout account verification uses Hubtel SMS OTP, and notifications fan out to email + Firebase FCM.",
      components: [
        {
          name: "Auth (Laravel Sanctum)",
          purpose: "Secures API access for mobile clients and admins.",
        },
        {
          name: "Groups & Membership",
          purpose: "Group creation, membership joins, and ownership permissions.",
        },
        {
          name: "Invites",
          purpose:
            "Direct invites and invite links for onboarding members into groups.",
        },
        {
          name: "Fees",
          purpose:
            "Fee lifecycle (create, active/closed) and aggregate totals for collection/withdrawal.",
        },
        {
          name: "Payments (Paystack)",
          purpose:
            "Initialize and verify fee payments and record durable payment state transitions.",
        },
        {
          name: "Withdrawals + Payout Accounts",
          purpose:
            "OTP verification for payout accounts and Paystack transfers for withdrawals.",
        },
        {
          name: "Notification Service",
          purpose:
            "Triggers push notifications (FCM) and email updates for key events.",
        },
        {
          name: "Admin Panel (Filament)",
          purpose:
            "Operational visibility and moderation of groups, fees, payments, and withdrawals.",
        },
        {
          name: "MySQL",
          purpose: "Primary datastore for users, groups, fees, payments, and withdrawals.",
        },
      ],
      decisions: [
        {
          decision: "Service layer for business logic",
          rationale:
            "Keeps controllers thin and concentrates payment/withdrawal rules in testable, reusable services.",
        },
        {
          decision: "Webhook verification + idempotency mindset",
          rationale:
            "Paystack can retry events; the API must safely handle duplicate callbacks without double-counting payments.",
        },
        {
          decision: "OTP for withdrawal account verification",
          rationale:
            "Withdrawals are high-risk; requiring OTP via SMS reduces fraud and prevents misdirected payouts.",
        },
        {
          decision: "Filament for admin tooling",
          rationale:
            "Accelerates internal dashboards and operations without building a separate admin frontend.",
        },
      ],
    },
    implementation: [
      {
        title: "Domain modules and routing",
        description:
          "API routes are organized around the product’s core modules (groups, invites, fees, payments, withdrawals).",
        points: [
          "Clear REST endpoints for group lifecycle and membership",
          "Separate flows for direct invites vs invite links",
          "Admin routes exposed via Filament",
        ],
        snippets: [
          {
            language: "mermaid",
            label: "System flow (high-level)",
            code: `flowchart TB
    subgraph LaravelAPI[Laravel API]
      auth[Auth & Sanctum]
      groups[Groups & Membership]
      invites[Invites/Invite Links]
      fees[Group Fees]
      payments[Payments]
      withdrawals[Withdrawals]
      notify[Notification Service]
      adminc[Admin/Filament Modules]
    end

    db[(MySQL)]
    paystack[Paystack]
    hubtel[Hubtel SMS]
    fcm[Firebase]
    mail[SMTP]

    auth --> db
    groups --> db
    invites --> db
    fees --> db
    payments --> db
    withdrawals --> db
    adminc --> db

    payments --> paystack
    withdrawals --> paystack
    withdrawals --> hubtel
    notify --> fcm
    notify --> mail`,
          },
        ],
      },
      {
        title: "Payments: init → verify → finalize",
        description:
          "Payments are created as PENDING, verified against Paystack, then finalized with consistent DB updates.",
        points: [
          "Store Paystack reference per payment",
          "Verify on callback/webhook before marking SUCCESS",
          "Update fee totals after successful verification",
        ],
        snippets: [
          {
            language: "mermaid",
            label: "Payment + withdrawal sequence",
            code: `sequenceDiagram
    participant U as User (Member)
    participant API as Laravel API
    participant Pay as Paystack
    participant DB as Database
    participant O as Group Owner

    U->>API: POST /groups/{groupId}/fees/{feeId}/pay
    API->>DB: Create/Update payment (PENDING, reference)
    API->>Pay: Initialize transaction
    Pay-->>API: authorization_url
    API-->>U: payment link/reference

    Pay-->>API: Webhook charge.success
    API->>Pay: Verify transaction
    Pay-->>API: success
    API->>DB: Update payment=SUCCESS, paid_at
    API->>DB: Update fee totals (total_collected, total_paid_members)

    O->>API: POST /withdrawal/request-otp
    API->>O: OTP sent (Hubtel SMS)

    O->>API: POST /withdrawal/verify-otp
    API->>Pay: Create transfer recipient
    API->>DB: Save withdrawal_account(recipient_code)

    O->>API: POST /group/{groupId}/fee/{feeId}/withdraw-funds
    API->>DB: Validate owner, closed fee, available amount
    API->>Pay: Transfer funds
    Pay-->>API: transfer reference/status
    API->>DB: Insert group_withdrawals
    API->>DB: Increment group_fees.total_withdrawn (on success)
    API-->>O: Withdrawal result`,
          },
        ],
      },
      {
        title: "Withdrawals with safety checks",
        description:
          "Withdrawals validate ownership, fee closure rules, and available balance before initiating a transfer.",
        points: [
          "OTP-verifies payout account before enabling withdrawals",
          "Records group_withdrawals and updates total_withdrawn",
          "Rejects withdrawals when fee is not closed or balance is insufficient",
        ],
      },
      {
        title: "Notifications",
        description:
          "Event-driven notifications keep members informed about invites, fees, payments, and withdrawals.",
        points: [
          "Push notifications via Firebase FCM",
          "Email notifications via Laravel Mail",
        ],
      },
    ],
    challenges: [
      {
        title: "Preventing double-counted payments",
        description:
          "Payment providers may send duplicate webhooks, and users may retry checkout. Without protections, totals can drift.",
        solution:
          "Model payments as a state machine (PENDING → SUCCESS/FAILED) and verify against Paystack before finalizing. Treat webhook handling as idempotent and only apply fee total updates once per reference.",
      },
      {
        title: "Withdrawal safety and verification",
        description:
          "Allowing withdrawals without strong verification can lead to misdirected funds or fraud.",
        solution:
          "Require OTP verification (Hubtel SMS) to create/activate a payout recipient, then perform Paystack transfers only for verified accounts.",
      },
    ],
    impact: {
      summary:
        "A complete backend foundation for group contributions with reliable payment verification and safe withdrawal flows.",
      metrics: [
        {
          metric: "Payment verification",
          before: "Unverified callbacks",
          after: "Verified against Paystack",
          improvement: "Trustworthy state",
        },
        {
          metric: "Withdrawal safety",
          before: "No secondary verification",
          after: "OTP-verified payout account",
          improvement: "Reduced risk",
        },
        {
          metric: "Operations",
          before: "No admin tooling",
          after: "Filament admin panel",
          improvement: "Faster support",
        },
      ],
      businessOutcome:
        "Members can pay fees confidently, owners can withdraw safely, and admins can monitor activity with clear records for support and auditing.",
    },
    reflections: {
      wouldDoDifferently: [
        "Add explicit idempotency keys and DB-level uniqueness constraints for provider references",
        "Expand automated tests around webhook edge cases and partial failures",
      ],
      keyTakeaways: [
        "In payment systems, correctness beats cleverness — verify, record, and reconcile",
        "Withdrawals deserve a higher security bar than deposits",
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────
     4. Event-Crypt — Voting & Ticketing Platform
   ───────────────────────────────────────────────────────── */
  {
    id: "event-crypt",
    title: "Event-Crypt",
    category: "Full-Stack Engineering",
    description:
      "Multi-tenant event platform for award voting and ticketing — web app + USSD flows, reliable payments, and DevOps to deploy and run the system in production.",
    thumbnail: "/projects/eventcypt/event-crypt-screen-1.png",
    summary:
      "Event-Crypt is a multi-tenant platform for organization-scoped award voting and ticketing events. I built the Vue + Inertia web app, the Laravel backend (payments, USSD, admin), and the operational setup (CI/CD, Nginx + PHP-FPM, workers) to run it reliably in production.",
    readTime: "7 min read",
    snapshot: {
      role: "Full-Stack Engineer (Web · Backend · DevOps)",
      duration: "2026",
      stack: [
        "Laravel 12",
        "PHP 8.2+",
        "Vue 3",
        "TypeScript",
        "Inertia",
        "Vite",
        "Filament",
        "PostgreSQL",
        "Laravel Queue",
        "Laravel Scheduler",
        "Nginx",
        "PHP-FPM",
        "Linux",
        "Hubtel Payments",
        "Paystack (legacy)",
        "Cloudinary",
        "CI/CD (GitHub Actions)",
      ],
      context: "Multi-tenant Product",
      outcome:
        "Web + USSD · layered payment verification · queue/scheduler reconciliation · CI/CD + Nginx/PHP-FPM deployment",
    },
    problem: {
      context:
        "Organizations running awards and ticketed events need a single platform where each organization can create events, collect votes and ticket purchases, and reliably reconcile payments across multiple user channels.",
      pain:
        "Payments can be inconsistent when webhooks are delayed, duplicated, or missed. USSD sessions require a deterministic state machine, and multi-tenant boundaries must be enforced everywhere (routes, queries, admin).",
      stakes:
        "Incorrect fulfillment (missing votes, duplicate votes, unfulfilled tickets) breaks trust and directly impacts revenue. The system must be auditable and resilient under provider variability.",
    },
    goals: {
      technical: [
        "Multi-tenant boundary model (Organization → Events)",
        "Web voting/ticketing flow (Vue + Inertia) with reliable payment fulfillment",
        "USSD voting channel with cache-backed session state",
        "Webhook handling with idempotency guards",
        "Fallback payment verification (success page + queued jobs)",
        "Admin operations via Filament (org + super-admin panels)",
        "CI/CD pipeline and repeatable deployments (Nginx + PHP-FPM + workers)",
        "Notifications via SMS + receipts",
      ],
      constraints: [
        "Handle duplicate/retried provider callbacks safely",
        "Ensure eventual consistency even when webhooks are missed",
        "Keep tenant scoping explicit and enforceable",
      ],
    },
    architecture: {
      diagram: "/projects/eventcypt/event-crypt-architecture.png",
      overview:
        "Clients (web, admin, USSD gateway) talk to a Laravel monolith with domain services for voting, ticketing, payments, and notifications. Payments integrate primarily with Hubtel, with layered verification (webhook + success verification + scheduled reconciliation). Data is stored in PostgreSQL, and async workloads run via queue jobs and the Laravel scheduler.",
      components: [
        {
          name: "Web App (Vue 3 + Inertia)",
          purpose: "Voting and ticketing UI for end users.",
        },
        {
          name: "USSD Gateway Integration",
          purpose: "USSD voting channel via /api/ussd and a session state machine.",
        },
        {
          name: "Laravel Monolith",
          purpose:
            "Routes/middleware, controllers, domain services, and queued jobs for voting/ticketing/payments.",
        },
        {
          name: "Nginx + PHP-FPM",
          purpose:
            "Production runtime: serves the web app and API, and runs queue workers and scheduled jobs alongside the app.",
        },
        {
          name: "Filament Admin Panels",
          purpose:
            "Organization-scoped operations: event setup, nominee management, verification, monitoring.",
        },
        {
          name: "PostgreSQL",
          purpose: "Primary datastore for tenants, events, votes, tickets, and payments.",
        },
        {
          name: "Queue + Scheduler",
          purpose:
            "Runs verification jobs and periodic reconciliation for pending payments.",
        },
        {
          name: "Hubtel + Paystack",
          purpose:
            "Payment initialization, status checks, webhooks, and (legacy) parallel payment support.",
        },
        {
          name: "SMS Providers",
          purpose: "Delivers receipts/notifications for successful votes and ticket purchases.",
        },
        {
          name: "Cloudinary",
          purpose: "Media storage and delivery for event assets.",
        },
      ],
      decisions: [
        {
          decision: "Layered payment verification",
          rationale:
            "Combining webhook processing with success-page verification and scheduled reconciliation reduces lost-payment risk and improves eventual consistency.",
        },
        {
          decision: "Cache-backed USSD state machine",
          rationale:
            "USSD is conversational and stateless per request; caching session state makes flows deterministic and resilient.",
        },
        {
          decision: "Tenant scoping in routes + queries",
          rationale:
            "Multi-tenancy must be enforced consistently to prevent data leakage across organizations.",
        },
      ],
    },
    implementation: [
      {
        title: "Component architecture",
        description:
          "The platform is organized as a Laravel monolith with domain services, async jobs, and clear boundaries to external providers.",
        points: [
          "Multiple client channels: web, admin, and USSD",
          "Domain services for payments, voting, receipts, and notifications",
          "Queue jobs + scheduler for retries and reconciliation",
        ],
        snippets: [
          {
            language: "mermaid",
            label: "High-level architecture",
            code: `flowchart LR
    subgraph Clients
      WEB["Web Browser<br/>Voting/Ticketing"]
      USSDGW["USSD Gateway/Telco"]
      ADMIN["Admin/Super Admin<br/>Filament UI"]
    end

    subgraph App["Laravel Monolith"]
      ROUTES["Routes + Middleware"]
      CTRL["Controllers"]
      SVC["Domain Services<br/>Hubtel, Voting, Receipt, Notifications"]
      JOBS["Queue Jobs + Scheduler"]
      MODELS["Eloquent Models + Scopes"]
      CACHE["Cache Store"]
    end

    subgraph Data
      DB["PostgreSQL / SQLite"]
    end

    subgraph External
      HUBTEL["Hubtel APIs<br/>Checkout / Status / Send Money"]
      PAYSTACK["Paystack APIs<br/>Legacy/parallel support"]
      SMS["SMS Providers<br/>Hubtel/Arkesel"]
      CLOUD["Cloudinary"]
      CI["GitHub Actions CI"]
    end

    WEB --> ROUTES
    ADMIN --> ROUTES
    USSDGW --> ROUTES
    ROUTES --> CTRL --> SVC --> MODELS --> DB
    CTRL --> CACHE
    SVC --> CACHE
    SVC --> HUBTEL
    SVC --> PAYSTACK
    SVC --> SMS
    SVC --> CLOUD
    JOBS --> SVC
    JOBS --> DB
    JOBS --> HUBTEL
    CI --> App`,
          },
        ],
      },
      {
        title: "Payment reliability (webhook + verification + reconciliation)",
        description:
          "Payments are fulfilled via a layered approach to minimize missed callbacks and handle provider variability.",
        points: [
          "Primary: Hubtel webhook endpoint",
          "Secondary: success-page verification using provider status endpoint",
          "Background: queued verification jobs + scheduled sweeps for stale pending payments",
        ],
        snippets: [
          {
            language: "mermaid",
            label: "Web voting flow",
            code: `sequenceDiagram
    participant U as Voter (Web)
    participant FE as Vue + Inertia
    participant BE as Laravel Controllers/Services
    participant HP as Hubtel Checkout
    participant WH as Hubtel Webhook
    participant JOB as Verification Jobs
    participant DB as Database

    U->>FE: Select nominee/category + quantity
    FE->>BE: Submit vote checkout request
    BE->>DB: Create pending payment
    BE->>HP: Initialize checkout
    HP-->>U: Checkout URL / redirect
    U->>HP: Complete payment
    HP->>WH: Payment callback
    WH->>BE: Process webhook payload
    BE->>DB: Mark payment successful
    BE->>DB: Create votes + increment nominee totals
    Note over JOB,BE: Fallback verification runs if webhook delayed/missed`,
          },
        ],
      },
      {
        title: "USSD voting state machine",
        description:
          "USSD requests are processed through a cache-backed state machine keyed by session ID.",
        points: [
          "Cache key per session (ussd_state_<sessionId>) with TTL",
          "Deterministic level-by-level prompts and transitions",
          "Charges initiated via provider service once user confirms",
        ],
        snippets: [
          {
            language: "mermaid",
            label: "USSD flow",
            code: `sequenceDiagram
    participant T as Telco/USSD Gateway
    participant UC as UssdController
    participant C as Cache
    participant HS as HubtelService
    participant DB as Database

    T->>UC: /api/ussd (new session)
    UC->>C: Create ussd_state_<sessionID>
    T->>UC: User code/category/quantity/confirm inputs
    UC->>C: Update session state per level
    UC->>DB: Create pending payment
    UC->>HS: Charge mobile money
    HS-->>UC: Prompt/PIN/OTP status
    UC-->>T: Continue/end session response`,
          },
        ],
      },
      {
        title: "DevOps: CI/CD and production runtime",
        description:
          "I handled the deployment and operational setup so the platform could run reliably in production.",
        points: [
          "GitHub Actions CI to run checks and build the web assets",
          "Repeatable server deployment steps (Nginx + PHP-FPM + queues + scheduler)",
          "Operational jobs for payment reconciliation and status verification",
        ],
      },
    ],
    challenges: [
      {
        title: "Idempotency under provider retries",
        description:
          "Payment providers may retry webhooks and users may refresh/return to success pages, causing duplicate fulfillment risk.",
        solution:
          "Implemented idempotency guards around payment fulfillment (status checks and usage checks) so votes/tickets are created exactly once per successful transaction.",
      },
      {
        title: "Tenant boundary enforcement",
        description:
          "Multi-tenant systems can accidentally leak data if organization scoping is inconsistent.",
        solution:
          "Scoped public routes by organization slug and enforced ownership checks and scoped queries throughout controllers and admin panels.",
      },
    ],
    impact: {
      summary:
        "A resilient multi-tenant platform that supports both web and USSD channels with reliable payment fulfillment and admin operational tooling.",
      metrics: [
        {
          metric: "Payment completion paths",
          before: "Webhook-only",
          after: "Webhook + verification + reconciliation",
          improvement: "Higher reliability",
        },
        {
          metric: "Admin operations",
          before: "Manual",
          after: "Filament panels + scoped dashboards",
          improvement: "Faster workflows",
        },
        {
          metric: "Channel support",
          before: "Web only",
          after: "Web + USSD",
          improvement: "Wider reach",
        },
      ],
      businessOutcome:
        "Organizations can run multiple award and ticketing events in one platform, reconcile payments reliably, and operate events with admin verification tools and notifications.",
    },
    reflections: {
      wouldDoDifferently: [
        "Add structured observability (metrics + alerts) early, especially around webhook latency and reconciliation rates",
        "Introduce stronger idempotency keys and unique constraints for provider transaction references",
      ],
      keyTakeaways: [
        "For payments, design for retries and missed callbacks from day one",
        "USSD flows require explicit state handling — caching is the simplest reliable foundation",
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────
     5. Private Learn — Online Learning Platform
   ───────────────────────────────────────────────────────── */
  {
    id: "private-learn",
    title: "Private Learn",
    category: "Backend Engineering",
    description:
      "Backend for an online learning platform connecting students with tutors — course publishing, discussions, messaging, and certificate-ready learning flows.",
    thumbnail: "/projects/private_learn/private-learn-screen-1.png",
    summary:
      "Private Learn is an online learning platform built with Python + Frappe. It helps instructors upload and manage courses, reach learners, and monetize content. The backend supports course/catalog management, interaction (forums + messaging), and extensible flows for certificates and progress tracking.",
    readTime: "5 min read",
    snapshot: {
      role: "Backend Developer",
      duration: "Oct 2025",
      stack: [
        "Python",
        "Frappe Framework",
        "MariaDB",
        "Redis",
        "Nginx",
        "Linux",
      ],
      context: "EdTech Platform",
      outcome:
        "Course publishing backend · discussion + messaging foundations · scalable content workflows",
    },
    problem: {
      context:
        "Tutors and instructors need a simple way to publish learning content, engage learners, and earn from their expertise — without wrestling with complex tooling.",
      pain:
        "Without solid backend workflows (uploading content, organizing lessons, managing users, and handling interaction), learning platforms become hard to operate and frustrating for creators and learners.",
      stakes:
        "Creators need a reliable platform to manage content and engagement. Learners need a smooth experience that supports interaction and progression.",
    },
    goals: {
      technical: [
        "Backend-first architecture for course publishing and content management",
        "Structured data model for courses, lessons, enrollments, and progress",
        "Interaction layer: discussions/forums + direct messaging",
        "Extensible flows for certificates/badges and professional programs",
        "Webhook-ready integrations for notifications and external services",
      ],
      constraints: [
        "Keep the system easy to manage for non-technical course creators",
        "Design workflows that can scale as the catalog and userbase grows",
      ],
    },
    architecture: {
      diagram: "/projects/private_learn/private-learn-architecture.png",
      overview:
        "A Python + Frappe backend (monolith) with modular DocTypes and server-side logic for courses, learning flows, user interaction, and operational tooling. Redis supports caching/background tasks, with MariaDB as the primary datastore.",
      components: [
        { name: "Frappe App", purpose: "Core backend: APIs, workflows, permissions, and admin tooling." },
        { name: "Course + Catalog Module", purpose: "Courses, lessons, uploads, categories, and publishing workflow." },
        { name: "Learning + Progress", purpose: "Enrollments, lesson completion, and progress tracking." },
        { name: "Interaction", purpose: "Forums/discussions, Q&A, and direct messaging." },
        { name: "Certificates", purpose: "Completion certificates and achievement badges (extensible)." },
        { name: "MariaDB", purpose: "Primary relational datastore." },
        { name: "Redis", purpose: "Caching and background task support." },
        { name: "Nginx", purpose: "Web server/reverse proxy for production." },
      ],
      decisions: [
        {
          decision: "Use Frappe for rapid backend workflows",
          rationale:
            "Frappe provides fast iteration with strong data modeling (DocTypes), permissions, and admin UX — ideal for content-heavy platforms.",
        },
        {
          decision: "Design modules around learning domain",
          rationale:
            "Separating course/catalog, progress, and interaction keeps the system maintainable as features grow (Udemy-style evolution).",
        },
      ],
    },
    implementation: [
      {
        title: "Domain modeling in Frappe",
        description:
          "Built the platform around clear DocTypes and workflows for course publishing and learner progression.",
        points: [
          "Course → lessons/modules structure",
          "Enrollment + progress tracking",
          "Permissions for creators vs learners",
        ],
      },
      {
        title: "Interaction features",
        description:
          "Designed interaction primitives (forums and messaging) to support Q&A and community learning.",
        points: [
          "Discussion threads per course/lesson",
          "Direct messaging between learners and instructors",
          "Webhook-friendly messaging for notifications",
        ],
      },
      {
        title: "Backend architecture (Udemy-inspired)",
        description:
          "A scalable backend layout that can evolve from a monolith into dedicated services as traffic grows.",
        points: [
          "Backend-first separation of concerns by domain modules",
          "Clear boundaries for notifications, search, and media storage",
        ],
        snippets: [
          {
            language: "mermaid",
            label: "High-level backend architecture",
            code: `flowchart LR
  U["Learner / Creator"] --> WEB["Web UI"]
  WEB --> API["Frappe Backend"]

  subgraph Domain["Core Modules"]
    COURSES["Courses & Catalog"]
    LEARN["Enrollments & Progress"]
    INTERACT["Forums & Messaging"]
    CERTS["Certificates & Badges"]
  end

  API --> COURSES
  API --> LEARN
  API --> INTERACT
  API --> CERTS

  DB["MariaDB"]
  CACHE["Redis"]

  COURSES --> DB
  LEARN --> DB
  INTERACT --> DB
  CERTS --> DB

  API --> CACHE`,
          },
        ],
      },
    ],
    challenges: [
      {
        title: "Keeping creator workflows simple",
        description:
          "Course creators need easy upload/publish flows without complex settings.",
        solution:
          "Used Frappe workflows and permissions to guide content publishing with a clean admin experience.",
      },
      {
        title: "Interaction and notifications",
        description:
          "Messaging and discussions often require async delivery and integration hooks.",
        solution:
          "Designed interaction events to be webhook-ready and compatible with background processing for notifications.",
      },
    ],
    impact: {
      summary:
        "A backend foundation for a Ghana-focused learning platform that supports course publishing, learner interaction, and extensible credentialing features.",
      metrics: [
        {
          metric: "Course publishing workflow",
          before: "Manual sharing",
          after: "Platform-managed catalog",
          improvement: "Structured distribution",
        },
        {
          metric: "Learner interaction",
          before: "Disconnected channels",
          after: "Forums + messaging primitives",
          improvement: "Better engagement",
        },
        {
          metric: "Extensibility",
          before: "Hard to expand",
          after: "Modular domains",
          improvement: "Faster iteration",
        },
      ],
      businessOutcome:
        "Tutors can publish and monetize courses more easily, while learners get a consistent experience with interaction and progress tracking.",
    },
    reflections: {
      wouldDoDifferently: [
        "Add search and recommendations earlier (catalogs grow quickly)",
        "Introduce object storage for media assets from day one",
      ],
      keyTakeaways: [
        "EdTech platforms succeed when creator tooling is frictionless",
        "Clear domain boundaries make it easier to grow from MVP to a larger platform",
      ],
    },
  },
];

export const getWork = (id: string): WorkData | undefined =>
  works.find((w) => w.id === id);

export const getNextWork = (currentId: string): WorkData => {
  const index = works.findIndex((w) => w.id === currentId);
  return works[(index + 1) % works.length];
};
