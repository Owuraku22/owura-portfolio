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
     1. Production Nomad Cluster
  ───────────────────────────────────────────────────────── */
  {
    id: "production-nomad-cluster",
    title: "Production Nomad Cluster",
    category: "Platform Engineering",
    description:
      "Self-hosted hybrid orchestration platform running 10+ production workloads across a Mac Studio on-premises and a dedicated bare-metal OVH server — zero public IP exposure, automated deployments, centralized secrets.",
    thumbnail: "/images/works/cropped-Hybrid.svg",
    summary:
      "A ground-up platform engineering project for Ghana School of Law — designing and operating a production-grade hybrid Nomad cluster that eliminated manual deployments, removed all secrets from repositories, and cut build times by 16×. The platform runs 10+ services across two physical locations with zero open ports.",
    readTime: "8 min read",

    snapshot: {
      role: "Sole Platform & DevOps Engineer",
      duration: "2.5 months · 2025",
      stack: [
        "Nomad",
        "Consul",
        "Vault",
        "Traefik",
        "Cloudflare Zero Trust",
        "GitHub Actions",
        "Docker",
        "OVH Cloud",
        "OrbStack",
        "Proxmox VE"
      ],
      context: "Ghana School of Law",
      outcome: "10+ workloads · 2 locations · zero open ports · 16× faster builds",
    },

    problem: {
      context:
        "Ghana School of Law had no formal infrastructure. Applications ran on ad-hoc servers, deployments were manual SSH sessions, and secrets were hardcoded in environment files or committed directly to repositories.",
      pain:
        "Every deployment was a manual SSH session. Secrets lived in plaintext files. There was no way to know a service was down until users complained. A single hardware failure would have taken every digital service offline with no recovery plan.",
      stakes:
        "The school runs 10+ production services — student portal, HR system, records management, and internal tools — serving hundreds of students and staff daily. Downtime directly impacts enrollment, examinations, and day-to-day administration.",
    },

    goals: {
      technical: [
        "Zero public IP exposure — all traffic through Cloudflare Zero Trust tunnels",
        "Zero secrets in repositories, environment files, or Docker images",
        "Automated deployments on merge to main — no manual SSH required",
        "Daily off-site database backups with verified restore capability",
        "Service health visibility via dashboards",
        "Warm standby across two physical locations — RTO under 30 minutes",
      ],
      constraints: [
        "No budget for managed cloud — must run on existing Mac Studio + low-cost bare metal",
        "Single engineer — must be fully operable and recoverable by one person",
        "Existing applications must migrate with zero downtime",
        "ARM64 on-premises (Mac Studio) vs x86_64 cloud — multi-architecture builds required",
      ],
    },

    architecture: {
      diagram: "/images/works/cropped-Hybrid.svg",
      overview:
        "A hybrid two-location Nomad cluster with a shared HashiCorp control plane (Nomad + Consul + Vault), zero-trust ingress via Cloudflare tunnels, and GitOps-style deployments through GitHub Actions. No port is ever opened on either server — all traffic flows outbound through Cloudflare. The Mac Studio runs the dev environment and the warm standby; OVH bare-metal runs staging and active production.",
      components: [
        {
          name: "HashiCorp Nomad",
          purpose:
            "Job scheduler — runs all 10+ production workloads as Docker containers with health-checked routing",
        },
        {
          name: "HashiCorp Consul",
          purpose:
            "Service discovery and health checking — Traefik reads the service registry dynamically, no manual routing config",
        },
        {
          name: "HashiCorp Vault",
          purpose:
            "Centralized secrets engine — KV v2 for static secrets, JWT workload auth so containers never hold static credentials",
        },
        {
          name: "Traefik",
          purpose:
            "Reverse proxy — dynamically routes traffic based on Consul service registrations and handles TLS termination",
        },
        {
          name: "Cloudflare Zero Trust Tunnel",
          purpose:
            "Public ingress — outbound-only persistent connection, no inbound ports open on either server",
        },
        {
          name: "GitHub Actions + GHCR",
          purpose:
            "CI/CD — builds multi-arch Docker images, pushes to GHCR, triggers Nomad job updates on merge to main",
        },
        {
          name: "OrbStack (Mac Studio)",
          purpose:
            "Type-2 hypervisor on macOS — runs 7 Ubuntu ARM64 VMs mirroring production exactly as a warm standby",
        },
        {
          name: "Proxmox VE (OVH)",
          purpose:
            "Type-1 hypervisor on bare metal — runs 7 Ubuntu x86_64 VMs as the active production environment",
        },
      ],
      decisions: [
        {
          decision: "Nomad over Kubernetes",
          rationale:
            "Single-engineer operation requires simplicity. Nomad has no etcd, no separate control plane complexity. A K8s cluster would take days to recover from scratch; Nomad takes hours. The operational overhead difference is night and day at this scale.",
        },
        {
          decision: "Cloudflare Zero Trust over VPN or open ports",
          rationale:
            "Zero public IP means zero attack surface. Traditional setups require open ports or a cloud load balancer — both add cost and risk. Cloudflare tunnels are free, outbound-only, and survive NAT and firewalls. Perfect for a hybrid setup where the on-prem node sits behind a home router.",
        },
        {
          decision: "HashiCorp Vault over cloud secrets managers",
          rationale:
            "Self-hosted means no AWS dependency for secrets. Vault's JWT workload auth means containers never see a static credential — they authenticate at startup and receive exactly what they need for that run. Eliminates the entire class of 'credentials leaked in logs' incidents.",
        },
        {
          decision: "OrbStack for on-premises VMs",
          rationale:
            "Mac Studio + OrbStack gives ARM64 VMs with near-native performance at zero cost. OrbStack is dramatically faster and lighter than VMware Fusion. The warm standby mirrors production exactly — same VM count, same job specs, same config.",
        },
      ],
    },

    implementation: [
      {
        title: "Infrastructure as Code",
        description:
          "All Nomad job specs, Consul service definitions, and Vault policies are version-controlled as HCL. The entire cluster state is reproducible from the repository.",
        points: [
          "One Nomad HCL job spec per service — parameterized with an image tag variable",
          "Vault policies defined as code — least-privilege scoped per workload identity",
          "Consul service definitions co-located with job specs",
          "Bootstrap Bash scripts for new node provisioning — full cluster from scratch in under 2 hours",
        ],
        snippets: [
          {
            language: "hcl",
            label: "Nomad job with Vault secret injection",
            code: `job "api-server" {
  datacenters = ["prod"]
  type        = "service"

  group "app" {
    task "server" {
      driver = "docker"

      config {
        image = "ghcr.io/org/api:\${var.image_tag}"
      }

      vault { policies = ["api-server-policy"] }

      template {
        data        = <<EOH
{{ with secret "kv/data/api-server" }}
DB_PASSWORD={{ .Data.data.db_password }}
REDIS_URL={{ .Data.data.redis_url }}
{{ end }}
EOH
        destination = "secrets/.env"
        env         = true
      }
    }
  }
}`,
          },
        ],
      },
      {
        title: "CI/CD Pipeline",
        description:
          "GitHub Actions builds multi-architecture Docker images on self-hosted runners, pushes to GHCR, and triggers Nomad job updates on merge to main — zero manual steps.",
        points: [
          "Multi-stage Docker builds reduced image sizes 60–80% and eliminated bloated layers",
          "Shared base-image strategy cut redundant dependency installation across every service",
          "Self-hosted ARM64 runner on Mac Studio for on-prem builds",
          "Self-hosted x86_64 runner on OVH for production builds",
          "GitOps: merge to main → automatic deploy, or push a new git tag → automatic deploy, no manual SSH, ever",
        ],
        snippets: [
          {
            language: "yaml",
            label: "GitHub Actions build & deploy workflow",
            code: `name: Build & Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: [self-hosted, linux, ARM64]
    steps:
      - uses: actions/checkout@v4

      - name: Build & push image
        run: |
          docker build -t ghcr.io/org/api:\${{ github.sha }} .
          docker push ghcr.io/org/api:\${{ github.sha }}

      - name: Deploy to Nomad
        run: |
          nomad job run \\
            -var="image_tag=\${{ github.sha }}" \\
            jobs/api.nomad`,
          },
        ],
      },
      {
        title: "Zero Trust Networking",
        description:
          "All public traffic routes through Cloudflare Zero Trust Tunnels — no port is open on either server. Traefik handles TLS termination and dynamic routing populated from the Consul service registry.",
        points: [
          "cloudflared runs as a Nomad service on the router VM in each environment",
          "Traefik reads routes from Consul — no manual config needed when a new service starts",
          "All *.gslaw.school domains route through Cloudflare — zero direct IP exposure",
          "Internal service-to-service traffic uses Consul service mesh — no hardcoded IPs",
        ],
      },
      {
        title: "Secrets Management",
        description:
          "HashiCorp Vault eliminated all plaintext secrets. Containers authenticate via JWT at startup and receive exactly the credentials they need — nothing more.",
        points: [
          "KV v2 engine for static secrets — database passwords, API keys, third-party tokens",
          "JWT workload auth — each Nomad job carries a unique identity token scoped to its policy",
          "Vault policies enforce least-privilege — api-server cannot read database admin secrets",
          "Zero secrets in .env files, Docker images, CI/CD logs, or git history",
        ],
      },
      {
        title: "Observability & Backups",
        description:
          "Prometheus and Grafana provide cluster-wide metrics visibility. Automated nightly PostgreSQL dumps ship encrypted to Backblaze B2 via Nomad periodic jobs.",
        points: [
          "Prometheus scrapes Nomad, Consul, and application health metrics",
          "Grafana dashboards for cluster health, job status, and resource utilization",
          "Nomad periodic job runs pg_dump nightly, encrypts output, ships to Backblaze B2",
          "Every production database covered — restore tested and verified monthly",
        ],
      },
    ],

    challenges: [
      {
        title: "Multi-architecture builds: ARM64 on-prem vs x86_64 in cloud",
        description:
          "The Mac Studio uses Apple Silicon (ARM64). The OVH bare-metal server is x86_64. Docker images built for one architecture won't run on the other. Initial CI builds either failed on the wrong runner or took 4+ hours using QEMU emulation for cross-compilation.",
        solution:
          "Added a self-hosted GitHub Actions runner on each machine — ARM64 on Mac Studio, x86_64 on OVH. Each runner builds images only for its native architecture. Introduced a shared base-image strategy to eliminate redundant dependency installation. Build times dropped from 4+ hours to under 15 minutes.",
      },
      {
        title: "Vault bootstrap: the chicken-and-egg unseal problem",
        description:
          "Vault needs to be initialized and unsealed before any service can fetch secrets. But the unseal keys are themselves sensitive. During initial bootstrap, a single wrong step can lock you out of the entire secrets engine — and recovering from a sealed Vault in production is a stressful, manual process.",
        solution:
          "Documented the bootstrap sequence step-by-step with explicit checkpoints. Stored encrypted unseal key shards in a secure offline location separate from the cluster. Wrote a health-check script that alerts within 60 seconds if Vault becomes sealed unexpectedly. Bootstrap is now a 15-minute repeatable process any engineer can follow.",
      },
      {
        title: "Consul health check race conditions on rolling deploy",
        description:
          "During rolling deploys, Traefik would briefly route traffic to containers that hadn't finished starting up, causing intermittent 502 errors. Consul health checks were registering services as healthy before the application was truly ready to serve traffic.",
        solution:
          "Added startup health-check grace periods in Nomad job specs and tightened Consul check intervals from 30s to 5s with a 3-failure deregistration threshold. Implemented TCP health checks alongside HTTP — a service must pass both before Traefik routes to it. 502 errors dropped to zero on the next deploy.",
      },
    ],

    impact: {
      summary:
        "The platform transformed Ghana School of Law from ad-hoc manual deployments to a fully automated, observable, and secure production infrastructure — all operated by a single engineer.",
      metrics: [
        {
          metric: "Build Time",
          before: "4+ hours",
          after: "< 15 min",
          improvement: "16× faster",
        },
        {
          metric: "Deployment Process",
          before: "Manual SSH",
          after: "Merge to main",
          improvement: "Fully automated",
        },
        {
          metric: "Secrets Exposure",
          before: "Plaintext in repos",
          after: "Vault-only",
          improvement: "Zero exposure",
        },
        {
          metric: "Public Attack Surface",
          before: "Open ports",
          after: "Zero open ports",
          improvement: "Eliminated",
        },
        {
          metric: "Database Backups",
          before: "None",
          after: "Nightly automated",
          improvement: "Full coverage",
        },
        {
          metric: "Recovery Time",
          before: "Unknown / days",
          after: "< 30 min",
          improvement: "Warm standby",
        },
      ],
      businessOutcome:
        "The school ships updates to production in under 15 minutes with confidence. A hardware failure on either location can be recovered from in under 30 minutes by promoting the standby. The platform has been running without incident since launch.",
    },

    reflections: {
      wouldDoDifferently: [
        "Automate the Vault unseal process from day one — the manual unseal step is the only part of the cluster not fully automated, and it's a single-engineer dependency I want to eliminate",
        "Add Nomad Autoscaler earlier — scaling is currently manual, which means keeping capacity headroom in my head at all times",
        "Implement structured JSON logging from day one rather than retrofitting — adding log aggregation to services not built with it is significantly harder",
      ],
      keyTakeaways: [
        "Zero Trust networking is not a 'nice to have' for a single-engineer shop — it's the only way to secure a multi-location cluster without a dedicated network team or a cloud VPN budget",
        "Nomad's simplicity is a genuine engineering advantage, not a compromise — a midnight cluster recovery drill confirmed that a self-hosted Nomad cluster is recoverable by one person in under an hour",
        "The shared base-image strategy was the single highest-leverage CI optimization — one change simultaneously cut build times across every service in the cluster",
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────
     2. Airflow ETL & Backup Pipeline
  ───────────────────────────────────────────────────────── */
  {
    id: "airflow-etl-backup-pipeline",
    title: "Airflow ETL & Backup Pipeline",
    category: "Data Infrastructure",
    description:
      "Self-hosted data platform on top of the Nomad cluster — Airflow DAGs ingesting from multiple PostgreSQL sources into a central analytics warehouse, with automated nightly backups to Backblaze B2.",
    thumbnail: "/images/works/cropped-Automated-ETL-Pipeline.svg",
    summary:
      "A production data platform built on HashiCorp Nomad, running Apache Airflow with Vault-backed connection strings. ETL DAGs ingest from HR, Records, SMS, Service Desk etc databases into a central warehouse surfaced through Metabase. Automated nightly backups ship to Backblaze B2 — covering every production database.",
    readTime: "6 min read",
    snapshot: {
      role: "DevOps & Data Platform Engineer",
      duration: "2 weeks · 2025",
      stack: [
        "Apache Airflow",
        "Nomad",
        "PostgreSQL",
        "Vault",
        "Metabase",
        "Backblaze B2",
        "Bash",
        "Redis",
      ],
      context: "Ghana School of Law",
      outcome:
        "Analytics platform live · 100% database backup coverage · zero credentials in DAG code",
    },
    problem: {
      context:
        "The school had multiple PostgreSQL databases (HR, records, service desk etc) with no analytics layer and no backup strategy. Business decisions were made without data.",
      pain:
        "No visibility into school operations. Manual reporting took days. Any database server failure would result in permanent, unrecoverable data loss.",
      stakes:
        "Student enrollment data, exam records, and HR information with no disaster recovery — a single drive failure away from catastrophic institutional data loss.",
    },
    goals: {
      technical: [
        "Worked hand-in-hand with the analyst to Deploy Airflow on the existing Nomad cluster — no new infrastructure",
        "ETL from 3 PostgreSQL source systems into a central analytics warehouse",
        "Automated nightly backups to off-site cloud storage",
        "Zero credentials in DAG code or environment files",
        "Analyst team manages DAGs independently from infrastructure changes",
      ],
      constraints: [
        "Must run on existing cluster — zero new infrastructure budget",
        "Analyst-owned DAG repository must stay isolated from infrastructure concerns",
      ],
    },
    architecture: {
      diagram: "/images/works/cropped-Automated-ETL-Pipeline.svg",
      overview:
        "Airflow deployed as Nomad services (scheduler, webserver, workers) with Vault-backed connection URIs. A pull-based DAG sync model isolates analyst workflows from infrastructure. Backup jobs run as Nomad periodic tasks — one per database, independent failure domains.",
      components: [
        {
          name: "Apache Airflow",
          purpose:
            "DAG orchestration — schedules and executes ETL and backup tasks",
        },
        {
          name: "HashiCorp Vault",
          purpose:
            "Supplies database connection strings at task execution time — zero credentials stored in Airflow or DAG files",
        },
        {
          name: "PostgreSQL Sources",
          purpose:
            "HR, Records Management, and Service Desk source databases feeding the ETL pipeline",
        },
        {
          name: "Metabase",
          purpose:
            "BI dashboard layer surfacing warehouse data to school leadership and operations staff",
        },
        {
          name: "Backblaze B2",
          purpose:
            "Off-site backup destination — encrypted nightly dumps from every production database",
        },
      ],
      decisions: [
        {
          decision: "Pull-based DAG sync from a separate analyst repository",
          rationale:
            "Analysts own the DAG repository independently. A cron job on the Airflow worker pulls from the analyst repo — analysts can update and deploy DAGs without ever needing cluster access.",
        },
        {
          decision: "Vault-backed connection URIs over Airflow's connections UI",
          rationale:
            "Airflow's connections UI stores credentials in its metadata database. Vault injection means credentials are fetched at task run time — not persisted anywhere in Airflow, not visible in logs.",
        },
      ],
    },
    implementation: [
      {
        title: "Airflow on Nomad",
        description:
          "Airflow scheduler, webserver, and Celery workers deployed as separate Nomad services with Vault-injected secrets.",
        points: [
          "Separate Nomad jobs for scheduler, webserver, and Celery workers — independent scaling",
          "Vault policy grants Airflow read-only access to connection string secrets",
          "Redis deployed as a Nomad service for the Celery broker",
          "Airflow metadata PostgreSQL runs on the existing db-01 node",
        ],
      },
      {
        title: "ETL DAGs",
        description:
          "Incremental ETL DAGs pulling from source databases into a central warehouse schema daily.",
        points: [
          "Daily incremental loads with full-refresh fallback for schema changes",
          "Schema validation step before loading to catch upstream structural changes",
          "Alerting on DAG failure via webhook notification",
          "Pull-based DAG sync — cron job pulls from analyst repo to worker every 5 minutes",
        ],
      },
      {
        title: "Backup Pipeline",
        description:
          "Nomad periodic jobs run pg_dump on a nightly schedule, encrypt, and ship to Backblaze B2.",
        points: [
          "One periodic Nomad job per database — independent failure domains, separate logs",
          "GPG encryption before upload — backups are encrypted at rest in B2",
          "Restore procedure tested against a separate PostgreSQL instance monthly",
          "B2 lifecycle rules retain 30 days of daily backups",
        ],
      },
    ],
    challenges: [
      {
        title: "Airflow DB migration race condition on Nomad cluster restart",
        description:
          "Airflow runs database migrations on startup. On Nomad, after a cluster restart, the scheduler and webserver can start simultaneously — both attempt the migration and one fails with a lock conflict.",
        solution:
          "Added a dedicated pre-start migration Nomad job that runs to completion before the main Airflow services. Nomad lifecycle prestart hooks ensure the migration finishes before any Airflow process starts.",
      },
    ],
    impact: {
      summary:
        "Gave the school its first analytics platform and eliminated data loss risk across all production databases.",
      metrics: [
        {
          metric: "Database Backup Coverage",
          before: "0%",
          after: "100%",
          improvement: "Full coverage",
        },
        {
          metric: "Analytics Reporting",
          before: "Manual, days",
          after: "Automated dashboards",
          improvement: "Live insights",
        },
        {
          metric: "Credentials in DAG code",
          before: "Plaintext",
          after: "Vault-only",
          improvement: "Zero exposure",
        },
      ],
      businessOutcome:
        "School leadership has live dashboards for enrollment, HR, and service desk operations. Any database can be restored to the previous night within 30 minutes.",
    },
    reflections: {
      wouldDoDifferently: [
        "Add data quality checks (row counts, null rates) into the ETL pipeline from day one",
        "Use Airflow's Vault backend plugin instead of template injection for a cleaner secrets integration",
      ],
      keyTakeaways: [
        "Running Airflow on Nomad requires careful attention to startup ordering — lifecycle prestart hooks are the right tool, not sleep timers",
        "The pull-based DAG sync model was the right call — analysts iterate freely without ever needing cluster access or infrastructure knowledge",
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────
     3. Multi-Region DR Platform
  ───────────────────────────────────────────────────────── */
  {
    id: "aws-multi-region-dr-platform",
    title: "Multi-Region DR Platform",
    category: "Solutions Architecture",
    description:
      "Multi-region disaster-recovery platform on AWS — Step Functions failover orchestration, warm-standby ECS, cross-region RDS replication, and a React operator dashboard with one-click failover.",
    thumbnail: "/images/works/cropped-DR-Multi-Region.svg",
    summary:
      "A fully Terraform-provisioned multi-region DR platform on AWS demonstrating production-grade disaster recovery architecture. Primary region (us-east-1), warm standby (us-west-2), and a control plane (us-east-2) orchestrating failover via Step Functions. Includes a React operator dashboard for one-click failover and weekly automated DR drills.",
    readTime: "7 min read",
    snapshot: {
      role: "Solutions Architect & Cloud Engineer",
      duration: "1 week · 2024",
      stack: [
        "AWS ECS",
        "RDS",
        "S3",
        "Step Functions",
        "EventBridge",
        "Lambda",
        "API Gateway",
        "Route 53",
        "CloudWatch",
        "Terraform",
      ],
      context: "Personal Lab Project",
      outcome: "< 15 min RTO · automated weekly DR drills · one-click failover dashboard",
    },
    problem: {
      context:
        "Most AWS architectures treat disaster recovery as an afterthought — bolted on after everything is already in production. This project explores what a properly architected multi-region DR platform looks like from the ground up.",
      pain:
        "No tested DR plan is the same as no DR plan. Manually-operated failover under pressure is slow, error-prone, and frequently fails on the details that were never practiced.",
      stakes:
        "For any production system, unplanned downtime has direct revenue and reputational consequences. The goal is a system where failover is a boring, practiced, automated process — not a crisis.",
    },
    goals: {
      technical: [
        "RTO under 15 minutes measured end-to-end",
        "Automated weekly DR drill with CloudWatch outcome metrics",
        "One-click failover via an operator dashboard",
        "100% IaC — zero manual AWS console steps anywhere",
        "Cross-region RDS read replica promoting automatically on failover",
      ],
      constraints: [
        "Lab budget — cost-conscious design, stop/start patterns for non-critical resources",
        "All Terraform — reusable modules for each infrastructure layer",
      ],
    },
    architecture: {
      diagram: "/images/works/cropped-DR-Multi-Region.svg",
      overview:
        "Three-region architecture: control plane in us-east-2 (Step Functions + EventBridge), primary in us-east-1 (ECS + RDS + S3), warm standby in us-west-2 (ECS + RDS replica + S3 replication). Route 53 health-check-based DNS failover switches traffic automatically.",
      components: [
        {
          name: "AWS Step Functions",
          purpose:
            "Orchestrates the failover workflow — promotes RDS replica, updates Route 53, scales standby ECS service to full capacity",
        },
        {
          name: "EventBridge",
          purpose:
            "Schedules weekly automated DR drills and routes CloudWatch alarms to the failover workflow",
        },
        {
          name: "Amazon ECS",
          purpose:
            "Runs the reference application in both primary and standby regions",
        },
        {
          name: "Amazon RDS",
          purpose:
            "Primary database in us-east-1 with a cross-region read replica in us-west-2 promoted on failover",
        },
        {
          name: "Route 53",
          purpose:
            "Health-check-based DNS failover — automatically shifts traffic between primary and standby regions",
        },
        {
          name: "API Gateway + Lambda",
          purpose:
            "Backend for the operator dashboard — triggers the failover workflow and queries replication lag metrics",
        },
      ],
      decisions: [
        {
          decision: "Warm standby over pilot light",
          rationale:
            "Pilot light has lower running cost but requires scale-up time under pressure — exactly the wrong moment to be waiting for capacity. Warm standby keeps a minimal-capacity ECS service running in the DR region, enabling sub-15-minute RTO without a capacity race during a real incident.",
        },
        {
          decision: "Step Functions for failover orchestration",
          rationale:
            "Failover involves multiple sequential async steps with error handling and rollback. Step Functions makes the workflow visible, auditable, and retryable — far better than a Lambda calling other Lambdas with no execution history.",
        },
      ],
    },
    implementation: [
      {
        title: "Terraform Module Architecture",
        description:
          "Seven reusable Terraform modules — networking, compute, database, storage, monitoring, control-plane, and bastion. Each environment stack composes these modules.",
        points: [
          "Remote state backend in S3 + DynamoDB state locking",
          "Separate state files per module — limits blast radius of a bad apply",
          "Dedicated CI/CD Terraform stack for plan/apply via GitHub Actions",
          "All three regions provisioned from the same module definitions with region-specific variables",
        ],
      },
      {
        title: "Failover Workflow",
        description:
          "Step Functions state machine executes the failover sequence with compensating transactions on failure.",
        points: [
          "Step 1: Promote RDS read replica to standalone primary",
          "Step 2: Poll until RDS instance status is 'available' (async wait loop)",
          "Step 3: Update ECS task definition with new DB endpoint",
          "Step 4: Scale standby ECS service to full production capacity",
          "Step 5: Update Route 53 weighted routing to shift 100% traffic to DR region",
          "Step 6: Emit DR outcome metric to CloudWatch",
        ],
      },
    ],
    challenges: [
      {
        title: "RDS promotion timing in Step Functions",
        description:
          "RDS replica promotion is asynchronous and takes 5–10 minutes. The initial state machine failed because it proceeded to update the application config before the promoted instance was actually available — causing connection errors.",
        solution:
          "Added an explicit polling loop using a Step Functions Wait state + Lambda that checks the RDS instance status every 30 seconds. The workflow only advances once the promoted instance reaches 'available' state. DR drill timing improved from failing to consistent sub-12-minute end-to-end.",
      },
    ],
    impact: {
      summary:
        "A production-grade multi-region DR architecture fully codified in Terraform with automated weekly testing.",
      metrics: [
        {
          metric: "Recovery Time Objective",
          before: "Unknown",
          after: "< 15 min",
          improvement: "Measurable & tested",
        },
        {
          metric: "DR Drill Process",
          before: "Manual / never run",
          after: "Automated weekly",
          improvement: "Zero-touch",
        },
        {
          metric: "Infrastructure",
          before: "Manual console",
          after: "100% Terraform",
          improvement: "Fully reproducible",
        },
      ],
      businessOutcome:
        "A reference architecture demonstrating multi-region DR thinking — a reusable template for any AWS project requiring high availability and tested recovery across regions.",
    },
    reflections: {
      wouldDoDifferently: [
        "Use Aurora Global Database instead of RDS read replica — faster promotion time and lower replication lag across regions",
        "Add cost tagging from day one to get accurate per-component spend tracking across the three regions",
      ],
      keyTakeaways: [
        "Failover workflows need explicit async wait states — Step Functions polling is the right pattern, not a timer-based sleep",
        "Weekly automated drills are more valuable than a perfect runbook — the drill finds the gaps the runbook misses, every time",
      ],
    },
  },

  /* ─────────────────────────────────────────────────────────
     4. Cloud Governance Platform
  ───────────────────────────────────────────────────────── */
  {
    id: "aws-governance-platform",
    title: "Cloud Governance Platform",
    category: "Cloud Engineering",
    description:
      "Organization-wide AWS governance across a five-account structure — centralized Config compliance tracking, event-driven auto-remediation, and severity-based routing with a least-privilege cross-account remediation engine.",
    thumbnail: "/images/works/cropped-Governance-Platform.svg",
    summary:
      "An enterprise-grade AWS governance platform built across a five-account AWS Organization (Management, Governance, Dev, Staging, Prod). Implements Config Rules for compliance evaluation, EventBridge for event routing, and a Lambda-based remediation engine that assumes least-privilege cross-account roles to apply safe fixes — with production explicitly protected by an allowlist.",
    readTime: "7 min read",
    snapshot: {
      role: "Cloud Engineer & Solutions Architect",
      duration: "4 days · 2024",
      stack: [
        "AWS Organizations",
        "IAM Identity Center",
        "AWS Config",
        "EventBridge",
        "Lambda",
        "DynamoDB",
        "SNS",
        "CloudWatch",
        "KMS",
        "Terraform",
      ],
      context: "Personal Lab Project",
      outcome: "5-account org · auto-remediation for LOW severity · 100% IaC",
    },
    problem: {
      context:
        "AWS accounts without governance guardrails drift into non-compliance quickly. Public S3 buckets, open security groups, untagged resources, and idle expensive instances are endemic in unmanaged accounts.",
      pain:
        "Manual compliance checks are reactive and inconsistent. By the time a public S3 bucket is found, data may already be exposed. Security group drift goes unnoticed for months.",
      stakes:
        "Compliance failures in cloud environments cause data exposure, unexpected costs, and failed audits. Organizations need automated guardrails that run continuously — not quarterly manual reviews.",
    },
    goals: {
      technical: [
        "Multi-account Config deployment via Terraform across all five accounts",
        "Compliance rules: required tagging, public S3 detection, open SSH/RDP detection, idle EC2",
        "Event-driven remediation pipeline with severity-based routing",
        "Cross-account remediation with least-privilege assume-role pattern",
        "Production explicitly protected — no auto-remediation without allowlist entry",
        "Every remediation action logged with resource ARN, action, and outcome",
      ],
      constraints: [
        "Governance account as Config delegated admin via AWS Organizations API",
        "All IaC — zero manual Config or IAM console steps",
        "Remediation engine must be fully auditable",
      ],
    },
    architecture: {
      diagram: "/images/works/cropped-Governance-Platform.svg",
      overview:
        "Five-account AWS Organization with a dedicated Governance account as Config delegated admin. Config Aggregator centralizes compliance data from all accounts. EventBridge routes compliance change events to a Policy Engine Lambda that evaluates severity and triggers the appropriate path: auto-remediate (LOW), notify (MEDIUM), or log-only (HIGH).",
      components: [
        {
          name: "AWS Organizations + Config Aggregator",
          purpose:
            "Centralizes Config compliance data from all five member accounts into the Governance account",
        },
        {
          name: "AWS Config Rules",
          purpose:
            "Evaluates resources continuously against compliance rules — tagging, public S3, open ports, idle EC2",
        },
        {
          name: "EventBridge",
          purpose:
            "Routes Config compliance change events to the Policy Engine Lambda for severity evaluation",
        },
        {
          name: "Policy Engine Lambda",
          purpose:
            "Evaluates rule severity, routes to remediation, SNS notification, or DynamoDB log-only path",
        },
        {
          name: "Remediation Lambda",
          purpose:
            "Assumes CloudGovernanceRemediationRole in target account and applies the safe fix — every action logged",
        },
        {
          name: "DynamoDB",
          purpose:
            "Compliance state store — tracks remediation history, current state, and outcome per resource",
        },
      ],
      decisions: [
        {
          decision: "Severity-based routing instead of auto-remediate everything",
          rationale:
            "Auto-remediating HIGH severity issues (deleting a production security group, closing a port used by a service) is too dangerous. Severity tiers allow safe automation where appropriate and human review where judgment is required.",
        },
        {
          decision: "Cross-account assume-role for remediation",
          rationale:
            "The remediation Lambda runs in the Governance account but assumes a scoped CloudGovernanceRemediationRole in the target account. Least-privilege, auditable in CloudTrail, and revocable per account without touching the remediation engine.",
        },
      ],
    },
    implementation: [
      {
        title: "Multi-Account Config Deployment",
        description:
          "AWS Config deployed into every member account via Terraform for-each, with the Governance account registered as delegated admin.",
        points: [
          "Terraform for-each over account list — one Config recorder + delivery channel per account",
          "Governance account registered as Config delegated admin via AWS Organizations",
          "Config Aggregator in Governance account with authorization in each member account",
          "Dedicated S3 bucket in Governance account for Config snapshots and history",
        ],
      },
      {
        title: "Policy Engine & Remediation",
        description:
          "EventBridge rule captures Config compliance change events and routes to the Policy Engine Lambda for severity evaluation and action routing.",
        points: [
          "Policy Engine maps Config rule name to severity tier (LOW / MEDIUM / HIGH)",
          "LOW: immediate Remediation Lambda invocation with target account and resource details",
          "MEDIUM: SNS notification to ops channel with resource details and recommended action",
          "HIGH: DynamoDB log entry only — human review required",
          "Production account on an explicit allowlist — LOW items require manual override for prod",
        ],
      },
    ],
    challenges: [
      {
        title: "Terraform bootstrap ordering for Organizations + delegated admin",
        description:
          "AWS Organizations APIs have eventual consistency delays. Registering the Governance account as Config delegated admin immediately after creating the org structure failed intermittently with 'account not found' errors.",
        solution:
          "Added explicit depends_on relationships in Terraform and a time_sleep resource to allow Organizations propagation before the delegated admin registration. Made all resources idempotent — safe to re-apply after any failure.",
      },
    ],
    impact: {
      summary:
        "A production-ready governance framework demonstrating how organizations automate AWS compliance at scale across multiple accounts.",
      metrics: [
        {
          metric: "Compliance Visibility",
          before: "Manual quarterly",
          after: "Continuous real-time",
          improvement: "Always-on",
        },
        {
          metric: "LOW severity remediation",
          before: "Manual ticket, days",
          after: "Automatic < 5 min",
          improvement: "Zero-touch",
        },
        {
          metric: "Infrastructure",
          before: "Manual console",
          after: "100% Terraform",
          improvement: "Fully reproducible",
        },
      ],
      businessOutcome:
        "A reference platform for any organization needing automated AWS compliance across multiple accounts — demonstrates the full governance architecture from Config rules through remediation to auditability.",
    },
    reflections: {
      wouldDoDifferently: [
        "Use AWS Config Conformance Packs instead of individual rules — better grouping, built-in reporting, and easier to share across accounts",
        "Add a custom compliance dashboard UI from day one rather than relying on the Config Aggregator's built-in views",
      ],
      keyTakeaways: [
        "Severity-based routing is the key architectural decision — it's what makes auto-remediation safe enough to actually run in production accounts",
        "Cross-account assume-role patterns are the foundation of any multi-account AWS architecture — getting comfortable with them early pays dividends across every subsequent project",
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
