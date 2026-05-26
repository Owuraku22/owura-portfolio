"use client";

import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface RoleCard {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  accentColor: string;
  icon: React.ReactNode;
  tags: string[];
}

const AnimatedDevOpsIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
    {/* Outer ring - rotates on hover */}
    <circle
      cx="32" cy="32" r="28"
      stroke="#ff8800" strokeWidth="2" strokeDasharray="8 4"
      className="origin-center"
      style={{
        transformOrigin: "32px 32px",
        animation: isHovered ? "spin 3s linear infinite" : "spin 8s linear infinite",
        transition: "animation-duration 0.4s",
      }}
    />
    {/* CI arrows - infinite loop */}
    <path d="M20 20 Q32 10 44 20" stroke="#ff8800" strokeWidth="2.5" strokeLinecap="round" fill="none"
      style={{ strokeDasharray: isHovered ? "0" : "100", strokeDashoffset: isHovered ? "0" : "0", transition: "all 0.4s" }} />
    <path d="M44 44 Q32 54 20 44" stroke="#ff8800" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Arrow heads */}
    <polyline points="42,14 44,20 38,21" stroke="#ff8800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <polyline points="22,50 20,44 26,43" stroke="#ff8800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Center gear */}
    <circle cx="32" cy="32" r="7" stroke="#ff8800" strokeWidth="2" fill="none" />
    <circle cx="32" cy="32" r="3" fill="#ff8800"
      style={{ transform: isHovered ? "scale(1.3)" : "scale(1)", transformOrigin: "32px 32px", transition: "transform 0.3s" }} />
    {/* Gear teeth */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
      <rect key={i} x="30.5" y="22" width="3" height="4" fill="#ff8800" rx="1"
        style={{ transformOrigin: "32px 32px", transform: `rotate(${deg}deg)` }} />
    ))}
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </svg>
);

const AnimatedCloudIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
    {/* Cloud body */}
    <path d="M14 40 Q10 40 10 35 Q10 28 17 27 Q18 20 26 20 Q30 20 33 23 Q36 18 42 19 Q50 19 50 28 Q54 29 54 35 Q54 40 48 40 Z"
      stroke="#ff8800" strokeWidth="2" fill="none"
      style={{ strokeDasharray: isHovered ? "200" : "0", strokeDashoffset: isHovered ? "0" : "200", transition: "all 0.6s ease" }} />
    <path d="M14 40 Q10 40 10 35 Q10 28 17 27 Q18 20 26 20 Q30 20 33 23 Q36 18 42 19 Q50 19 50 28 Q54 29 54 35 Q54 40 48 40 Z"
      fill="#ff8800" opacity={isHovered ? "0.08" : "0.04"} style={{ transition: "opacity 0.4s" }} />
    {/* Data streams falling */}
    {[22, 30, 38].map((x, i) => (
      <line key={i} x1={x} y1="43" x2={x} y2={isHovered ? "54" : "48"} stroke="#ff8800" strokeWidth="2" strokeLinecap="round"
        style={{ transition: `all 0.3s ease ${i * 0.1}s` }} />
    ))}
    {/* Dots at bottom of streams */}
    {[22, 30, 38].map((x, i) => (
      <circle key={i} cx={x} cy={isHovered ? "56" : "50"} r="2" fill="#ff8800"
        style={{ transition: `all 0.3s ease ${i * 0.1}s`, opacity: isHovered ? 1 : 0.5 }} />
    ))}
    {/* Upload arrow */}
    <path d="M32 10 L32 4 M29 7 L32 4 L35 7" stroke="#ff8800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s" }} />
  </svg>
);

const AnimatedPlatformIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
    {/* Server racks */}
    {[12, 24, 36].map((y, i) => (
      <g key={i}>
        <rect x="10" y={y} width="44" height="9" rx="2" stroke="#ff8800" strokeWidth="1.8" fill="none" />
        <circle cx="17" cy={y + 4.5} r="2"
          fill="#ff8800"
          style={{ opacity: isHovered ? 1 : 0.4, transition: `opacity 0.2s ease ${i * 0.15}s` }} />
        <circle cx="24" cy={y + 4.5} r="1.5"
          fill="#ff8800"
          style={{ opacity: isHovered ? 0.7 : 0.3, transition: `opacity 0.2s ease ${i * 0.15 + 0.1}s` }} />
        <line x1="32" y1={y + 4.5} x2="48" y2={y + 4.5} stroke="#ff8800" strokeWidth="1.5" strokeLinecap="round"
          style={{ strokeDasharray: isHovered ? "0" : "4 2", transition: "stroke-dasharray 0.3s" }} />
      </g>
    ))}
    {/* Connecting lines between layers */}
    <line x1="32" y1="21" x2="32" y2="24" stroke="#ff8800" strokeWidth="1.5" strokeDasharray="2 1" />
    <line x1="32" y1="33" x2="32" y2="36" stroke="#ff8800" strokeWidth="1.5" strokeDasharray="2 1" />
    {/* Bottom network */}
    <path d="M20 48 L32 55 L44 48" stroke="#ff8800" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
      style={{ opacity: isHovered ? 1 : 0.5, transition: "opacity 0.3s" }} />
    <circle cx="20" cy="48" r="2.5" fill="#ff8800" style={{ opacity: isHovered ? 1 : 0.5, transition: "opacity 0.3s" }} />
    <circle cx="32" cy="55" r="2.5" fill="#ff8800" style={{ opacity: isHovered ? 1 : 0.5, transition: "opacity 0.3s" }} />
    <circle cx="44" cy="48" r="2.5" fill="#ff8800" style={{ opacity: isHovered ? 1 : 0.5, transition: "opacity 0.3s" }} />
  </svg>
);

const AnimatedArchitectIcon = ({ isHovered }: { isHovered: boolean }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
    {/* Blueprint grid lines */}
    {[16, 32, 48].map((x, i) => (
      <line key={`v${i}`} x1={x} y1="8" x2={x} y2="56" stroke="#ff8800" strokeWidth="0.5" strokeDasharray="3 3"
        style={{ opacity: isHovered ? 0.3 : 0.15, transition: "opacity 0.3s" }} />
    ))}
    {[16, 32, 48].map((y, i) => (
      <line key={`h${i}`} x1="8" y1={y} x2="56" y2={y} stroke="#ff8800" strokeWidth="0.5" strokeDasharray="3 3"
        style={{ opacity: isHovered ? 0.3 : 0.15, transition: "opacity 0.3s" }} />
    ))}
    {/* Architecture nodes */}
    <rect x="24" y="10" width="16" height="10" rx="2" stroke="#ff8800" strokeWidth="2" fill={isHovered ? "#ff880015" : "none"}
      style={{ transition: "fill 0.3s" }} />
    <rect x="8" y="34" width="16" height="10" rx="2" stroke="#ff8800" strokeWidth="2" fill={isHovered ? "#ff880015" : "none"}
      style={{ transition: "fill 0.3s" }} />
    <rect x="40" y="34" width="16" height="10" rx="2" stroke="#ff8800" strokeWidth="2" fill={isHovered ? "#ff880015" : "none"}
      style={{ transition: "fill 0.3s" }} />
    <rect x="24" y="48" width="16" height="10" rx="2" stroke="#ff8800" strokeWidth="2" fill={isHovered ? "#ff880015" : "none"}
      style={{ transition: "fill 0.3s" }} />
    {/* Connecting lines — drawn on hover */}
    <line x1="32" y1="20" x2="16" y2="34" stroke="#ff8800" strokeWidth="1.8" strokeLinecap="round"
      style={{ strokeDasharray: 24, strokeDashoffset: isHovered ? 0 : 24, transition: "stroke-dashoffset 0.4s ease 0.1s" }} />
    <line x1="32" y1="20" x2="48" y2="34" stroke="#ff8800" strokeWidth="1.8" strokeLinecap="round"
      style={{ strokeDasharray: 24, strokeDashoffset: isHovered ? 0 : 24, transition: "stroke-dashoffset 0.4s ease 0.2s" }} />
    <line x1="16" y1="44" x2="32" y2="48" stroke="#ff8800" strokeWidth="1.8" strokeLinecap="round"
      style={{ strokeDasharray: 20, strokeDashoffset: isHovered ? 0 : 20, transition: "stroke-dashoffset 0.4s ease 0.3s" }} />
    <line x1="48" y1="44" x2="32" y2="48" stroke="#ff8800" strokeWidth="1.8" strokeLinecap="round"
      style={{ strokeDasharray: 20, strokeDashoffset: isHovered ? 0 : 20, transition: "stroke-dashoffset 0.4s ease 0.4s" }} />
  </svg>
);

const rolesData: RoleCard[] = [
  {
    title: "DevOps Engineer",
    subtitle: "Ship fast. Ship safe.",
    description:
      "I build CI/CD pipelines that go from commit to production in minutes — GitHub Actions, container registries, GitOps-style deploy flows, and zero-downtime rollouts.",
    color: "#ff8800",
    accentColor: "#ffe9d0",
    icon: null,
    tags: ["CI/CD", "GitHub Actions", "Docker", "GitOps"],
  },
  {
    title: "Cloud Engineer",
    subtitle: "Multi-account. Multi-region.",
    description:
      "I design and operate AWS architectures — ECS clusters, RDS, Lambda event pipelines, VPC networking, IAM least-privilege, and Terraform-provisioned everything.",
    color: "#ff8800",
    accentColor: "#ffe9d0",
    icon: null,
    tags: ["AWS", "Terraform", "IaC", "Multi-region"],
  },
  {
    title: "Platform Engineer",
    subtitle: "The foundation teams build on.",
    description:
      "I run production orchestration platforms — Nomad + Consul clusters spanning bare-metal and cloud, Vault-backed secrets, Traefik ingress, and Cloudflare Zero Trust.",
    color: "#ff8800",
    accentColor: "#ffe9d0",
    icon: null,
    tags: ["Nomad", "Consul", "Vault", "Observability"],
  },
  {
    title: "Solutions Architect",
    subtitle: "Design first. Build right.",
    description:
      "I translate business requirements into technical blueprints — multi-region DR platforms, governance automation, event-driven pipelines, and cost-conscious cloud design.",
    color: "#ff8800",
    accentColor: "#ffe9d0",
    icon: null,
    tags: ["Architecture", "DR", "Governance", "Cost Optimization"],
  },
];

const iconMap = [AnimatedDevOpsIcon, AnimatedCloudIcon, AnimatedPlatformIcon, AnimatedArchitectIcon];

const RoleCard = ({ role, index }: { role: RoleCard; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const IconComponent = iconMap[index];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center text-center p-6 md:p-8 rounded-2xl border border-gray-200 cursor-default transition-all duration-300"
      style={{
        background: hovered ? "#fff9f0" : "transparent",
        borderColor: hovered ? "#ff8800" : "#e5e7eb",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px -12px rgba(255,136,0,0.2)" : "none",
      }}
    >
      {/* Subtle number tag */}
      <span className="absolute top-4 right-4 text-xs font-mono text-gray-300 group-hover:text-brand-400 transition-colors">
        0{index + 1}
      </span>

      {/* Animated Icon */}
      <div className="mb-5 md:mb-6">
        <IconComponent isHovered={hovered} />
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-1 transition-colors duration-200"
        style={{ color: hovered ? "#ff8800" : "#111827" }}>
        {role.title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm font-medium text-gray-400 mb-3 font-shantell italic">
        {role.subtitle}
      </p>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-5">
        {role.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-auto">
        {role.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full font-medium transition-all duration-200"
            style={{
              background: hovered ? "#ff880018" : "#f3f4f6",
              color: hovered ? "#e67a00" : "#6b7280",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const PhilosophySection = () => {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 border-y border-gray-200">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-14">
            <h2 className="text-xl text-gray-900 md:text-2xl font-semibold mb-2 md:mb-3 font-shantell">
              My Engineering Disciplines
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-normal mx-auto">
              Four roles. One engineer. End-to-end ownership of the stack.
            </p>
          </div>
        </ScrollReveal>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {rolesData.map((role, index) => (
            <ScrollReveal key={index} variant="fade-up" delay={index * 80}>
              <RoleCard role={role} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
