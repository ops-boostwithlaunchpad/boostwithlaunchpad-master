"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ───────────────────────────── types ───────────────────────────── */
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

/* ───────────────────────────── component ───────────────────────── */
export default function HomeClient() {
  /* refs */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  /* agent demo state */
  const [activeAgent, setActiveAgent] = useState<number>(0);
  const [agentStatuses, setAgentStatuses] = useState<string[]>([
    "working",
    "idle",
    "idle",
  ]);

  /* approach hover */
  const [activeApproach, setActiveApproach] = useState<number | null>(null);

  /* ─── canvas network animation ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    const NODE_COUNT = 50;
    const CONNECTION_DIST = 150;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initNodes = () => {
      nodes = [];
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      /* move nodes */
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      /* draw connections */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      /* draw nodes */
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${n.opacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    initNodes();
    draw();
    window.addEventListener("resize", () => {
      resize();
      initNodes();
    });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ─── agent demo cycle ─── */
  useEffect(() => {
    const agents = ["Lead Qualifier", "Proposal Generator", "Scheduler"];
    let step = 0;

    const cycle = () => {
      const idx = step % agents.length;
      setActiveAgent(idx);

      /* set current to working, previous to complete, rest idle */
      setAgentStatuses((prev) => {
        const next = [...prev];
        for (let i = 0; i < next.length; i++) {
          if (i < idx) next[i] = "complete";
          else if (i === idx) next[i] = "working";
          else next[i] = "idle";
        }
        return next;
      });

      /* after 2s mark current complete */
      setTimeout(() => {
        setAgentStatuses((prev) => {
          const next = [...prev];
          next[idx] = "complete";
          return next;
        });
      }, 2000);

      step++;
    };

    cycle();
    const interval = setInterval(cycle, 3500);
    return () => clearInterval(interval);
  }, []);

  /* ─── helpers ─── */
  const agentNames = ["Lead Qualifier", "Proposal Generator", "Scheduler"];
  const agentDescriptions = [
    "Analyzes incoming leads and scores them based on fit, intent, and engagement signals.",
    "Generates tailored proposals based on qualified lead data and service offerings.",
    "Books meetings and coordinates follow-ups based on proposal engagement.",
  ];
  const agentIcons = [
    /* magnifying glass */
    <svg key="a0" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>,
    /* document */
    <svg key="a1" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>,
    /* calendar */
    <svg key="a2" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>,
  ];

  const statusLabel = (s: string) => {
    if (s === "working") return "Processing…";
    if (s === "complete") return "Complete";
    return "Idle";
  };

  const statusClass = (s: string) => {
    if (s === "working") return "agent-status-working";
    if (s === "complete") return "agent-status-complete";
    return "";
  };

  /* ─── render ─── */
  return (
    <main className="bg-dark text-text font-body overflow-x-hidden">
      {/* ════════════ HERO ════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* canvas bg */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-12 max-md:px-5 text-center py-32 max-md:py-20">
          <h1 className="font-heading text-[4.5rem] max-md:text-[2.2rem] font-bold leading-[1.05] mb-8 tracking-tight">
            The infrastructure of{" "}
            <span className="gradient-text">business automation</span>
          </h1>
          <p className="text-text-dim text-xl max-md:text-base max-w-[700px] mx-auto mb-14 leading-relaxed">
            Specialized AI automation platforms driving measurable business
            outcomes across industries.
          </p>

          {/* stat cards */}
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 max-w-[900px] mx-auto">
            {[
              {
                value: "10,000+",
                label: "businesses powered by Launchpad Boost",
              },
              {
                value: "3",
                label: "specialized divisions serving enterprise",
              },
              {
                value: "99.9%",
                label: "uptime for automated systems",
              },
            ].map((stat, i) => (
              <div key={i} className="stat-card-animated text-center">
                <div className="gradient-text text-4xl max-md:text-3xl font-heading font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-text-dim text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ MOBILE APPROACH (< md) ════════════ */}
      <section className="md:hidden py-20 px-5">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-dim text-xs tracking-widest uppercase mb-6">
            Our Approach
          </span>
          <h2 className="font-heading text-[2rem] font-bold leading-tight">
            When Failure{" "}
            <span className="gradient-text">Isn&apos;t an Option</span>
          </h2>
        </div>

        <div className="space-y-6">
          {[
            {
              num: "01",
              title: "Vertical Focus",
              desc: "We go deep in specific industries rather than spreading thin. This means better data models, sharper automations, and faster ROI.",
            },
            {
              num: "02",
              title: "Outcome Driven",
              desc: "Every system we build ties directly to a measurable business outcome — revenue, efficiency, or scale.",
            },
            {
              num: "03",
              title: "Scale First",
              desc: "Architecture designed for growth. What works for 10 clients works for 10,000.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-border rounded-2xl p-6 bg-dark"
            >
              <div className="text-accent font-heading text-sm font-bold mb-2">
                {item.num}
              </div>
              <div className="font-heading text-lg font-semibold mb-2">
                {item.title}
              </div>
              <p className="text-text-dim text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ MOBILE PRODUCTS (< md) ════════════ */}
      <section className="md:hidden py-20 px-5">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-dim text-xs tracking-widest uppercase mb-6">
            Our Products
          </span>
          <h2 className="font-heading text-[2rem] font-bold leading-tight">
            Purpose-built{" "}
            <span className="gradient-text">AI platforms</span>
          </h2>
        </div>

        <div className="space-y-6">
          {/* Boost */}
          <div className="border border-border rounded-2xl p-6 bg-dark">
            <div className="font-heading text-xl font-semibold mb-3">
              Launchpad Boost
            </div>
            <p className="text-text-dim text-sm leading-relaxed mb-4">
              Automated local SEO platform serving 10,000+ businesses. Ranks on
              Google in 24 hours with 3.2x average traffic increase.
            </p>
            <div className="text-xs text-text-dim mb-4">
              $5K MRR&nbsp;&bull;&nbsp;24hr results
            </div>
            <a
              href="https://launchpadboost.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-accent text-sm font-semibold hover:underline"
            >
              Visit Launchpad Boost &rarr;
            </a>
          </div>

          {/* Automation */}
          <div className="border border-border rounded-2xl p-6 bg-dark">
            <div className="font-heading text-xl font-semibold mb-3">
              Launchpad Automation
            </div>
            <p className="text-text-dim text-sm leading-relaxed mb-4">
              Custom AI agent development for agencies. Discovery-first approach
              building scalable automation systems.
            </p>
            <div className="text-xs text-text-dim mb-4">
              $750-4K/mo&nbsp;&bull;&nbsp;4 week setup
            </div>
            <a
              href="https://launchpadautomation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-accent text-sm font-semibold hover:underline"
            >
              Visit Launchpad Automation &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* ════════════ DESKTOP PRODUCTS (>= md) ════════════ */}
      <section className="hidden md:block py-32 relative">
        <div className="max-w-[1400px] mx-auto px-12">
          <div className="grid grid-cols-2 gap-20 items-start">
            {/* left copy */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-dim text-xs tracking-widest uppercase mb-6">
                Our Products
              </span>
              <h2 className="font-heading text-[3.5rem] font-bold leading-[1.1] mb-6">
                Purpose-built{" "}
                <span className="gradient-text">AI platforms</span>
              </h2>
              <p className="text-text-dim text-lg leading-relaxed mb-12 max-w-[520px]">
                Two specialized divisions, one mission: automate and scale
                business operations with intelligent AI systems.
              </p>

              {/* product list */}
              <div className="space-y-8">
                {/* Boost */}
                <a
                  href="https://launchpadboost.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-border rounded-2xl p-8 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 no-underline"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-heading text-xl font-semibold text-text">
                      Launchpad Boost
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-text-dim"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                  <p className="text-text-dim text-[0.95rem] leading-relaxed mb-3">
                    Automated local SEO platform serving 10,000+ businesses.
                    Ranks on Google in 24 hours with 3.2x average traffic
                    increase.
                  </p>
                  <div className="text-xs text-text-dim">
                    $5K MRR&nbsp;&bull;&nbsp;24hr results
                  </div>
                </a>

                {/* Automation */}
                <a
                  href="https://launchpadautomation.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-border rounded-2xl p-8 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 no-underline"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-heading text-xl font-semibold text-text">
                      Launchpad Automation
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-text-dim"
                    >
                      <path d="M7 17 17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </div>
                  <p className="text-text-dim text-[0.95rem] leading-relaxed mb-3">
                    Custom AI agent development for agencies. Discovery-first
                    approach building scalable automation systems.
                  </p>
                  <div className="text-xs text-text-dim">
                    $750-4K/mo&nbsp;&bull;&nbsp;4 week setup
                  </div>
                </a>
              </div>
            </div>

            {/* right – floating cards */}
            <div className="relative min-h-[500px]">
              {/* card 1 – mini chart */}
              <div
                className="absolute top-0 right-0 w-[280px] border border-border rounded-2xl p-6 bg-dark"
                style={{ animation: "float1 6s ease-in-out infinite" }}
              >
                <div className="text-xs text-text-dim mb-3 uppercase tracking-wider">
                  Traffic Growth
                </div>
                <div className="flex items-end gap-2 h-16">
                  {[40, 55, 45, 65, 60, 80, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 6
                            ? "linear-gradient(180deg,#6366f1,#8b5cf6)"
                            : "rgba(99,102,241,0.2)",
                      }}
                    />
                  ))}
                </div>
                <div className="mt-3 text-right">
                  <span className="gradient-text text-2xl font-heading font-bold">
                    3.2x
                  </span>
                  <span className="text-text-dim text-xs ml-1">avg increase</span>
                </div>
              </div>

              {/* card 2 – progress */}
              <div
                className="absolute top-44 left-0 w-[260px] border border-border rounded-2xl p-6 bg-dark"
                style={{ animation: "float2 7s ease-in-out infinite" }}
              >
                <div className="text-xs text-text-dim mb-3 uppercase tracking-wider">
                  Automation Progress
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden mb-2">
                  <div className="progress-bar-fill" style={{ width: "78%" }} />
                </div>
                <div className="flex justify-between text-xs text-text-dim">
                  <span>Setup</span>
                  <span className="text-accent font-semibold">78%</span>
                </div>
              </div>

              {/* card 3 – metrics */}
              <div
                className="absolute bottom-0 right-10 w-[240px] border border-border rounded-2xl p-6 bg-dark"
                style={{ animation: "float3 8s ease-in-out infinite" }}
              >
                <div className="text-xs text-text-dim mb-4 uppercase tracking-wider">
                  Live Metrics
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-dim">Leads/day</span>
                    <span className="text-text font-semibold">142</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-dim">Conversion</span>
                    <span className="text-accent font-semibold">34%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-dim">Revenue</span>
                    <span className="font-semibold text-[#22c55e]">+27%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ PLATFORM DEMO ════════════ */}
      <section className="py-32 max-md:py-20">
        <div className="max-w-[1400px] mx-auto px-12 max-md:px-5">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-dim text-xs tracking-widest uppercase mb-6">
              Platform Demo
            </span>
            <h2 className="font-heading text-[3.5rem] max-md:text-[2rem] font-bold leading-[1.1] mb-6">
              AI agents working{" "}
              <span className="gradient-text">together</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                "Multi-agent coordination",
                "Custom-built for your workflow",
                "24/7 autonomous operation",
              ].map((feat, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 text-text-dim text-sm"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* agent cards */}
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 max-w-[900px] mx-auto">
            {agentNames.map((name, i) => (
              <div
                key={i}
                className={`border border-border rounded-2xl p-6 transition-all duration-500 ${
                  activeAgent === i ? "agent-card-active" : "bg-dark"
                }`}
              >
                {/* icon */}
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white mb-4">
                  {agentIcons[i]}
                </div>

                <div className="font-heading text-lg font-semibold mb-2">
                  {name}
                </div>
                <p className="text-text-dim text-sm leading-relaxed mb-4">
                  {agentDescriptions[i]}
                </p>

                {/* status */}
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusClass(
                    agentStatuses[i]
                  )} ${
                    agentStatuses[i] === "idle"
                      ? "bg-[rgba(255,255,255,0.05)] text-text-dim"
                      : ""
                  }`}
                >
                  {statusLabel(agentStatuses[i])}
                </div>

                {/* typing indicator when working */}
                {agentStatuses[i] === "working" && (
                  <div className="mt-4 flex items-center gap-1">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* flow arrows */}
          <div className="hidden md:flex justify-center items-center gap-4 mt-8">
            {agentNames.map((name, i) => (
              <div key={i} className="flex items-center gap-4">
                <span
                  className={`text-sm font-medium ${
                    agentStatuses[i] === "complete"
                      ? "text-[#22c55e]"
                      : agentStatuses[i] === "working"
                      ? "text-accent"
                      : "text-text-dim"
                  }`}
                >
                  {name}
                </span>
                {i < agentNames.length - 1 && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-border"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TECH SECTION ════════════ */}
      <section className="py-32 max-md:py-20 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-12 max-md:px-5">
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-20 items-center">
            {/* left */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-dim text-xs tracking-widest uppercase mb-6">
                Technology Stack
              </span>
              <h2 className="font-heading text-[3.5rem] max-md:text-[2rem] font-bold leading-[1.1] mb-8">
                Built on Enterprise-Grade{" "}
                <span className="gradient-text">Infrastructure</span>
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Claude AI Integration",
                    desc: "Advanced reasoning and natural language understanding for complex business logic.",
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 22" />
                        <path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93" />
                        <path d="M15 13h2a4 4 0 0 1 0 8h-1" />
                        <path d="M9 13H7a4 4 0 0 0 0 8h1" />
                      </svg>
                    ),
                  },
                  {
                    title: "Multi-Cloud Architecture",
                    desc: "Redundant infrastructure across multiple cloud providers for maximum reliability.",
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.5 19a4.5 4.5 0 1 0 0-9 1 1 0 0 0-.11 0A5.5 5.5 0 0 0 7 10.5 4 4 0 0 0 8 19Z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Real-Time Analytics",
                    desc: "Live dashboards and performance metrics for full operational visibility.",
                    icon: (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-accent shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-heading font-semibold mb-1">
                        {item.title}
                      </div>
                      <p className="text-text-dim text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right – SVG infrastructure diagram */}
            <div className="flex justify-center">
              <svg
                viewBox="0 0 400 400"
                className="w-full max-w-[400px]"
                fill="none"
              >
                {/* outer ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  stroke="#27272a"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                {/* inner ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="120"
                  stroke="#27272a"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* center node */}
                <circle cx="200" cy="200" r="30" fill="url(#grad1)" />
                <text
                  x="200"
                  y="205"
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="600"
                >
                  AI Core
                </text>

                {/* satellite nodes */}
                {[
                  { cx: 200, cy: 60, label: "API" },
                  { cx: 340, cy: 150, label: "Cloud" },
                  { cx: 340, cy: 280, label: "Data" },
                  { cx: 200, cy: 360, label: "Auth" },
                  { cx: 60, cy: 280, label: "Queue" },
                  { cx: 60, cy: 150, label: "Cache" },
                ].map((node, i) => (
                  <g key={i}>
                    {/* connector line */}
                    <line
                      x1="200"
                      y1="200"
                      x2={node.cx}
                      y2={node.cy}
                      stroke="#6366f1"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                    />
                    {/* node */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="22"
                      fill="#18181b"
                      stroke="#27272a"
                      strokeWidth="1"
                    />
                    <text
                      x={node.cx}
                      y={node.cy + 4}
                      textAnchor="middle"
                      fill="#a1a1aa"
                      fontSize="9"
                      fontWeight="500"
                    >
                      {node.label}
                    </text>
                    {/* animated pulse */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="22"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="1"
                      opacity="0"
                    >
                      <animate
                        attributeName="r"
                        from="22"
                        to="36"
                        dur="3s"
                        begin={`${i * 0.5}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.5"
                        to="0"
                        dur="3s"
                        begin={`${i * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}

                {/* gradient def */}
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ APPROACH (desktop) ════════════ */}
      <section className="hidden md:block py-32 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-12">
          <div className="grid grid-cols-2 gap-20 items-start">
            {/* left */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-dim text-xs tracking-widest uppercase mb-6">
                Our Approach
              </span>
              <h2 className="font-heading text-[3.5rem] font-bold leading-[1.1] mb-8">
                Focused solutions,{" "}
                <span className="gradient-text">not generic tools</span>
              </h2>

              <div className="space-y-4">
                {[
                  {
                    num: "01",
                    title: "Vertical Focus",
                    desc: "We go deep in specific industries rather than spreading thin. This means better data models, sharper automations, and faster ROI.",
                  },
                  {
                    num: "02",
                    title: "Outcome Driven",
                    desc: "Every system we build ties directly to a measurable business outcome — revenue, efficiency, or scale.",
                  },
                  {
                    num: "03",
                    title: "Scale First",
                    desc: "Architecture designed for growth. What works for 10 clients works for 10,000.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="approach-item-interactive border border-border rounded-2xl p-6 cursor-pointer hover:border-accent/50 transition-all duration-300"
                    onMouseEnter={() => setActiveApproach(i)}
                    onMouseLeave={() => setActiveApproach(null)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-accent font-heading text-sm font-bold">
                        {item.num}
                      </span>
                      <span className="font-heading text-lg font-semibold">
                        {item.title}
                      </span>
                    </div>
                    <div
                      className="approach-expanded overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: activeApproach === i ? "200px" : "0",
                        opacity: activeApproach === i ? 1 : 0,
                        marginTop: activeApproach === i ? "1.5rem" : "0",
                      }}
                    >
                      <p className="text-text-dim text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right – funnel SVG */}
            <div className="flex justify-center items-center">
              <svg
                viewBox="0 0 300 400"
                className="w-full max-w-[300px]"
                fill="none"
              >
                {/* funnel layers */}
                <path
                  d="M30 40 h240 l-40 100 H70 Z"
                  fill="rgba(99,102,241,0.08)"
                  stroke="#6366f1"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
                <text
                  x="150"
                  y="85"
                  textAnchor="middle"
                  fill="#a1a1aa"
                  fontSize="11"
                  fontWeight="500"
                >
                  Industry Data
                </text>

                <path
                  d="M70 150 h160 l-30 100 H100 Z"
                  fill="rgba(99,102,241,0.12)"
                  stroke="#6366f1"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <text
                  x="150"
                  y="200"
                  textAnchor="middle"
                  fill="#a1a1aa"
                  fontSize="11"
                  fontWeight="500"
                >
                  AI Processing
                </text>

                <path
                  d="M100 260 h100 l-20 100 H120 Z"
                  fill="rgba(99,102,241,0.18)"
                  stroke="#6366f1"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <text
                  x="150"
                  y="310"
                  textAnchor="middle"
                  fill="#e5e5e5"
                  fontSize="11"
                  fontWeight="600"
                >
                  Business Outcomes
                </text>

                {/* animated dots falling through funnel */}
                <circle r="3" fill="#6366f1">
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    path="M150,30 L150,370"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0.5;1"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="3" fill="#8b5cf6">
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    begin="1.3s"
                    path="M140,30 L145,370"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    dur="4s"
                    begin="1.3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="3" fill="#6366f1">
                  <animateMotion
                    dur="4s"
                    repeatCount="indefinite"
                    begin="2.6s"
                    path="M160,30 L155,370"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;0.3;0.8"
                    dur="4s"
                    begin="2.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section className="py-32 max-md:py-20 border-t border-border">
        <div className="max-w-[800px] mx-auto px-12 max-md:px-5 text-center">
          <h2 className="font-heading text-[3.5rem] max-md:text-[2rem] font-bold leading-[1.1] mb-6">
            Partner With{" "}
            <span className="gradient-text">Launchpad</span>
          </h2>
          <p className="text-text-dim text-lg max-md:text-base leading-relaxed mb-10 max-w-[600px] mx-auto">
            Interested in enterprise partnerships, investment opportunities, or
            exploring our technology?
          </p>
          <Link href="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
