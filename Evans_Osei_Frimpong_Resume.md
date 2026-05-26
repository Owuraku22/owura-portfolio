**Evans Osei Frimpong**

**Cloud & Platform Engineer**  —  DevOps · Platform · Cloud · Solutions Architecture

evansosei0707@gmail.com  |  \+233 543 076 754 |  Accra, Ghana

linkedin.com/in/evansosei  |  github.com/evansosei

**PROFESSIONAL SUMMARY**

Infrastructure engineer with hands-on production experience operating hybrid on-prem / cloud platforms and designing multi-account AWS architectures. Currently the sole DevOps engineer at Ghana School of Law, where I own the full stack end-to-end — orchestration, CI/CD, secrets, networking, backups, and observability — for a portfolio of 14+ production services. Comfortable working across the DevOps / Platform / Cloud / Solutions Architecture spectrum, with a bias for cost-conscious, Terraform-driven systems and least-privilege security by default.

**CORE TECHNICAL SKILLS**

**Cloud (AWS):** ECS, RDS, Lambda, Step Functions, EventBridge, API Gateway, AWS Config, AWS Organizations, IAM Identity Center, S3, VPC, Route 53, CloudWatch, DynamoDB, SNS, KMS

**Other Cloud / Hosting:** OVH Cloud (bare metal), Cloudflare Zero Trust, Backblaze B2

**Infrastructure as Code:** Terraform (reusable modules, multi-account, remote state, environment stacks), HCL, Bash

**Orchestration & Containers:** HashiCorp Nomad, Consul, Docker (multi-stage builds, base-image strategy), Amazon ECS

**Secrets & Identity:** HashiCorp Vault (KV v2, JWT auth), AWS IAM, cross-account assume-role, IAM Identity Center

**CI/CD:** GitHub Actions, GHCR, AWS CodeBuild, GitOps-style deploy on merge

**Networking & Ingress:** Cloudflare Zero Trust Tunnels, Traefik, Consul service discovery, VPC / subnet / endpoint design

**Data & Workflows:** Apache Airflow (DAG authoring, deployment), PostgreSQL, MariaDB, Redis, Metabase

**Observability:** CloudWatch logs / metrics / dashboards, structured application logs, health-checked routing

**Languages:** Python, Bash, JavaScript / TypeScript (working level), HCL, YAML, SQL

**Practices:** GitOps, least-privilege IAM, multi-region & DR design, governance / compliance automation, automated backups, hybrid-cloud architecture

**PROFESSIONAL EXPERIENCE**

**DevOps Engineer (Sole Engineer) — Contract**

**Ghana School of Law · Accra, Ghana**     *2025 – Present*

*Sole infrastructure engineer responsible for the entire production platform across on-prem and cloud — orchestration, deployments, secrets, networking, backups, observability, CI/CD, and the data pipeline that feeds school analytics.*

* Designed and operate a HashiCorp Nomad \+ Consul cluster spanning a Mac Studio (on-premises) and a dedicated bare-metal node on OVH Cloud, hosting 10+ production workloads.

* Cut container build times from 4+ hours to under 15 minutes by introducing multi-stage Docker builds and a shared base-image strategy.

* Eliminated plaintext secrets from repositories and runtime by deploying HashiCorp Vault (KV v2 \+ JWT auth) and rewriting deployments to fetch credentials at startup.

* Removed public-IP exposure across the estate via a Cloudflare Zero Trust Tunnel \+ Traefik two-layer routing architecture with automatic TLS and dynamic service registration via Consul.

* Built CI/CD on GitHub Actions → GHCR → automated Nomad job updates on merge.

* Implemented daily off-site PostgreSQL backups to Backblaze B2 via Nomad periodic jobs covering every production database.

* Built the analytics stack: Apache Airflow on Nomad with Vault-backed connection URIs, ETL DAGs from HR / Records / Service Desk PostgreSQL sources into a central warehouse surfaced through Metabase.

**Full-Stack Developer— Full-Time**

**Vacancies In Ghana Ltd· Haatso, Accra**  *2023 – 2025*

*Joined as a Frontend Developer on the company's internal HR web application, progressively upskilled into backend and full-stack development, and contributed to solution architecture and cloud deployment in the final year .*

* Built and maintained the frontend of an internal HR web application, then expanded scope to own backend features as a full-stack contributor.

* Co-developed **Private Learn**, a custom LMS serving students, tutors, and parents as a private tutoring platform — contributing across the full stack from UI to API.

* Led solution architecture and deployment of the Private Learn platform on cloud infrastructure, designing an **event-driven pipeline** for video processing and thumbnail generation.

* Implemented **live-streaming infrastructure** and **secure asset delivery** using signed URLs and signed cookies to protect private course content.

* Designed and deployed **secure file transfer** workflows for course media uploads and storage

**PROJECTS**

**1\. Production Nomad Cluster — Hybrid On-Prem / Cloud Platform**

**Roles demonstrated:** Platform Engineer · DevOps Engineer   |   *Production system — Ghana School of Law*

Self-hosted, hybrid orchestration platform running 10+ production workloads (Laravel APIs, React SPAs, self-hosted LMS, Metabase, Airflow, MariaDB, Redis) across a Mac Studio on-premises and a bare-metal OVH server.

* HashiCorp Nomad \+ Consul control plane spanning two locations, with health-checked service routing and dynamic discovery.

* HashiCorp Vault for centralized secrets — KV v2 for static secrets, JWT auth for workload identity, zero secrets in repos or environment files.

* Two-layer ingress: Cloudflare Zero Trust Tunnel terminates public traffic; Traefik handles internal TLS termination and dynamic routing populated from Consul.

* GitHub Actions → GHCR → Nomad automated deployments on merge to main.

* Multi-stage Docker builds and a shared base-image strategy reduced CI build times from 4+ hours to under 15 minutes.

**Stack:** *Nomad, Consul, Vault, Docker, Traefik, Cloudflare Zero Trust, GitHub Actions, GHCR, OVH Cloud*

**2\. Airflow-Based ETL & Automated Backup Pipeline**

**Roles demonstrated:** DevOps Engineer · Platform Engineer (data infrastructure)   |   *Production system — Ghana School of Law*

Self-hosted data platform built on top of the Nomad cluster, powering school analytics and disaster-recovery backups.

* Apache Airflow deployed as a Nomad service with Vault-backed connection strings — no database credentials in DAG code or environment files.

* ETL DAGs ingesting from multiple PostgreSQL source systems (HR, Records Management, Service Desk) into a central warehouse consumed by Metabase.

* Pull-based DAG sync model: a cron job on the worker pulls from a separate analyst-facing repository, isolating analyst workflows from infrastructure changes.

* Automated nightly Postgres dumps shipped off-site to Backblaze B2 via a Nomad periodic job, covering every production database.

**Stack:** *Apache Airflow, Nomad, PostgreSQL, Vault, Metabase, Backblaze B2, Bash*

**3\. Multi-Region Disaster Recovery Orchestration Platform on AWS**

**Roles demonstrated:** Solutions Architect · Cloud Engineer · DevOps Engineer   |   *Personal lab project — designed and built independently*

A multi-region disaster-recovery platform on AWS with a control plane, primary region, and warm-standby region, fronted by an operator dashboard supporting one-click failover and weekly automated DR drills.

* Control Plane (us-east-2): AWS Step Functions orchestrate failover workflows; EventBridge schedules weekly DR drills; Lambda functions emit DR-test metrics to CloudWatch.

* Primary Region (us-east-1): ECS-hosted reference e-commerce application with RDS and S3, fully provisioned via Terraform modules.

* DR Region (us-west-2): Warm-standby ECS service with cross-region replicated RDS and S3.

* Operator Dashboard: React UI surfacing replication lag, DR-test outcomes, and a one-click failover trigger, served via API Gateway \+ Lambda.

* IaC: Terraform with reusable modules (networking, compute, database, storage, monitoring, control-plane, bastion) and a remote-state backend.

* Live endpoints: app.my-projects-aws.site, dashboard.my-projects-aws.site.

**Stack:** *AWS ECS, RDS, S3, Step Functions, EventBridge, Lambda, API Gateway, Route 53, CloudWatch, VPC, Terraform*

**4\. Enterprise-Grade Cloud Governance & Auto-Remediation Platform on AWS**

**Roles demonstrated:** Cloud Engineer · Solutions Architect · DevOps Engineer   |   *Personal lab project — designed and built independently*

Organization-wide AWS governance platform across a five-account structure (Management, Governance, Dev, Staging, Prod) implementing centralized configuration tracking, compliance evaluation, and event-driven auto-remediation.

* AWS Organizations \+ Identity Center: Five-account org structure with the Governance account registered as delegated admin for AWS Config and Config multi-account setup.

* AWS Config (multi-account): Configuration recorder, delivery channel, and Config Rules deployed into every member account via Terraform; compliance data centralized into an org-wide Config Aggregator.

* Compliance rules: Required tagging (Owner, Environment, CostCenter, Project); public-S3 detection; SSH (22) and RDP (3389) open-to-world detection; detect-only cost rules for idle dev / staging EC2.

* Event pipeline: EventBridge → Policy Engine Lambda → DynamoDB compliance state store; severity-based routing (LOW → auto-remediate, MEDIUM → notify, HIGH → log-only).

* Remediation engine: Lambda assumes a least-privilege cross-account CloudGovernanceRemediationRole to apply safe fixes; production protected by an explicit allowlist; every remediation logged.

* IaC: Reusable Terraform modules across governance, dev, staging, prod stacks with dedicated CI/CD stack and Terraform bootstrap.

**Stack:** *AWS Organizations, IAM Identity Center, AWS Config, EventBridge, Lambda, DynamoDB, S3, SNS, CloudWatch, API Gateway, KMS, Terraform*

**CERTIFICATION**

* AWS Solutions Architect Practitioner

* AWS Solutions Architect Associate

**ADDITIONAL**

**Languages:** English (fluent)

**Open to:** Solutions Architect, DevOps Engineer, Platform Engineer, Cloud Engineer roles