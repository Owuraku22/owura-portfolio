"use client";

import React, { useState } from "react";
import {
  SiAmazonwebservices,
  SiTerraform,
  SiDocker,
  SiGithubactions,
  SiHashicorp,
  SiCloudflare,
  SiApacheairflow,
  SiPostgresql,
  SiGrafana,
  SiPython,
  SiGit,
  SiLinux,
  SiNomad ,
  SiProxmox ,
  SiPrometheus,
  SiKubernetes,
  SiJenkins,
  SiClaude,
} from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";
import ScrollReveal from "./ScrollReveal";

interface Tool {
  name: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  bg: string;
}

const ring1Tools: Tool[] = [
  { name: "Terraform", Icon: SiTerraform, color: "#7b42bc", bg: "#f3ebff" },
  { name: "Docker", Icon: SiDocker, color: "#2496ed", bg: "#e8f4fd" },
  { name: "Nomad", Icon: SiNomad, color: "#7b42bc", bg: "#f3ebff" },
  { name: "GitHub Actions", Icon: SiGithubactions, color: "#2088ff", bg: "#e8f1ff" },
  { name: "Proxmox VE", Icon: SiProxmox, color: "#e66f00", bg: "#f3ebff" },
  { name: "Jenkins", Icon: SiJenkins, color: "#DD691D", bg: "#f3ebff" },
];

const ring2Tools: Tool[] = [
  { name: "HashiCorp", Icon: SiHashicorp, color: "#000000", bg: "#f5f5f5" },
  { name: "Cloudflare", Icon: SiCloudflare, color: "#f38020", bg: "#fff4ec" },
  { name: "Airflow", Icon: SiApacheairflow, color: "#017cee", bg: "#e6f2ff" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791", bg: "#eaf0f7" },
  { name: "Grafana", Icon: SiGrafana, color: "#f46800", bg: "#fff3e8" },
  { name: "Kubernetes", Icon: SiKubernetes, color: "#017cee", bg: "#fff3e8" },
];

const ring3Tools: Tool[] = [
  { name: "Python", Icon: SiPython, color: "#3776ab", bg: "#eef4fb" },
  { name: "Bash", Icon: VscTerminalBash, color: "#4eaa25", bg: "#edf7ea" },
  { name: "Git", Icon: SiGit, color: "#f05032", bg: "#fff0ed" },
  { name: "Linux", Icon: SiLinux, color: "#fcc624", bg: "#fffbe8" },
  { name: "Prometheus", Icon: SiPrometheus, color: "#fcc624", bg: "#fffbe8" },
  { name: "Claude", Icon: SiClaude, color: "#ff8800", bg: "#fffbe8" },
];

interface OrbitItemProps {
  tool: Tool;
  index: number;
  total: number;
  radius: number;
  duration: number;
  reverse?: boolean;
  offsetAngle?: number;
}

const OrbitItem = ({
  tool,
  index,
  total,
  radius,
  duration,
  reverse = false,
  offsetAngle = 0,
}: OrbitItemProps) => {
  const [hovered, setHovered] = useState(false);

  const initialAngle = (360 / total) * index + offsetAngle;
  // Negative delay = animation is already `initialAngle/360 * duration` seconds in at mount
  const delay = -((initialAngle / 360) * duration);

  const iconSize = radius > 130 ? 26 : radius > 90 ? 24 : 22;
  const containerSize = radius > 130 ? 52 : radius > 90 ? 46 : 42;
  const half = containerSize / 2;

  const spin    = reverse ? "o-ccw" : "o-cw";
  const counter = reverse ? "o-cw"  : "o-ccw";

  return (
    /*
     * Zero-size anchor at orbit center (50%, 50%).
     * CSS animation rotates it around (0,0) = the orbit center.
     * The icon child is offset `radius` px from that origin,
     * so it traces the orbit ring as the anchor spins.
     */
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        width: 0,
        height: 0,
        transformOrigin: "0px 0px",
        animation: `${spin} ${duration}s linear ${delay}s infinite`,
      }}
    >
      {/* Offset to the ring + counter-rotate so icon stays upright */}
      <div
        style={{
          position: "absolute",
          left: `${radius - half}px`,
          top: `${-half}px`,
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          animation: `${counter} ${duration}s linear ${delay}s infinite`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Scale wrapper — own div so it never fights the animation's transform */}
        <div
          style={{
            width: "100%",
            height: "100%",
            transform: `scale(${hovered ? 1.2 : 1})`,
            transition: "transform 0.3s",
          }}
        >
          {/* Visual pill — identical styles to original */}
          <div
            className="w-full h-full flex items-center justify-center rounded-full border-2 cursor-default relative"
            style={{
              background: hovered ? tool.bg : "#ffffff",
              borderColor: hovered ? tool.color : "#e5e7eb",
              boxShadow: hovered ? `0 4px 20px -4px ${tool.color}55` : "0 2px 8px rgba(0,0,0,0.06)",
              transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
            }}
          >
            <tool.Icon
              style={{ color: tool.color, fontSize: `${iconSize}px` }}
            />
            {hovered && (
              <div
                className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2.5 py-1 rounded-full whitespace-nowrap pointer-events-none z-20"
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
              >
                {tool.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TechStackOrbit = () => {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Inline keyframes guarantee they load regardless of CSS bundle order */}
      <style>{`
        @keyframes o-cw  { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
        @keyframes o-ccw { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }
      `}</style>
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-xl text-gray-900 md:text-2xl font-semibold mb-2 md:mb-3 font-shantell">
              My Tech Arsenal
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-normal mx-auto">
              The tools I reach for daily to build, ship, and operate production systems.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={100}>
          {/* Orbit stage — responsive via CSS scale */}
          <div className="flex items-center justify-center">
            <div
              className="relative"
              style={{ width: "560px", height: "560px" }}
            >
              {/* Ring 3 — outermost (r=260, inset=280-260=20) */}
              <div
                className="absolute rounded-full border border-dashed border-gray-200"
                style={{ inset: "20px" }}
              />
              {/* Ring 2 (r=185, inset=280-185=95) */}
              <div
                className="absolute rounded-full border border-dashed border-gray-200"
                style={{ inset: "95px" }}
              />
              {/* Ring 1 (r=105, inset=280-105=175) */}
              <div
                className="absolute rounded-full border border-dashed border-gray-200"
                style={{ inset: "175px" }}
              />

              {/* Center — AWS */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <CenterAWS />
              </div>

              {/* Ring 1 items — r≈80 */}
              {ring1Tools.map((tool, i) => (
                <OrbitItem
                  key={tool.name}
                  tool={tool}
                  index={i}
                  total={ring1Tools.length}
                  radius={105}
                  duration={14}
                  offsetAngle={30}
                />
              ))}

              {/* Ring 2 items — r≈145, counter-clockwise */}
              {ring2Tools.map((tool, i) => (
                <OrbitItem
                  key={tool.name}
                  tool={tool}
                  index={i}
                  total={ring2Tools.length}
                  radius={185}
                  duration={22}
                  reverse
                  offsetAngle={10}
                />
              ))}

              {/* Ring 3 items — r≈205 */}
              {ring3Tools.map((tool, i) => (
                <OrbitItem
                  key={tool.name}
                  tool={tool}
                  index={i}
                  total={ring3Tools.length}
                  radius={260}
                  duration={32}
                  offsetAngle={50}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tool labels legend */}
        <ScrollReveal variant="fade-up" delay={200}>
          <div
              className="mt-12 mx-auto"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.75rem",
                maxWidth: "42rem",
              }}
            >
            {[...ring1Tools, ...ring2Tools, ...ring3Tools].map((tool) => (
              <span
                key={tool.name}
                className="text-sm text-gray-500 bg-gray-50 rounded-full border border-gray-100 hover:border-brand-400 hover:text-gray-700 transition-colors cursor-default"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.25rem 0.75rem",
                }}
              >
                <tool.Icon style={{ color: tool.color, fontSize: "13px" }} />
                {tool.name}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
};

const CenterAWS = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 cursor-default transition-all duration-300 z-10"
      style={{
        background: hovered ? "#fff4ec" : "#fff",
        borderColor: hovered ? "#ff8800" : "#e5e7eb",
        boxShadow: hovered
          ? "0 0 0 8px rgba(255,136,0,0.08), 0 8px 32px -8px rgba(255,136,0,0.3)"
          : "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
      <SiAmazonwebservices
        style={{ fontSize: "36px", color: "#ff8800" }}
      />
      <span className="text-[9px] font-semibold tracking-wide mt-0.5"
        style={{ color: "#ff8800" }}>
        AWS
      </span>
    </div>
  );
};

export default TechStackOrbit;
