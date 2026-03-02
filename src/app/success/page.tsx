"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SuccessPage() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [newsletterError, setNewsletterError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("currentUserPassword");
    if (stored) {
      setPassword(stored);
    }
  }, []);

  async function copyPassword() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = password;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setNewsletterStatus("sending");
    setNewsletterError("");

    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Subscription failed. Please try again.");
      }

      setNewsletterStatus("success");
    } catch (err) {
      setNewsletterStatus("error");
      setNewsletterError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
      {/* Header */}
      <header className="flex items-center px-8 py-5 border-b border-[#27272a]">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight text-white no-underline">
          Launchpad<span className="text-[#6366f1]">.</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex justify-center px-5 py-12">
        <div className="w-full max-w-[600px] flex flex-col gap-6">
          {/* Success Card */}
          <div className="bg-[#141414] border border-[#27272a] rounded-2xl p-8 max-sm:p-5 text-center">
            {/* Green Checkmark */}
            <div className="mx-auto w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#166534]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="font-heading text-3xl max-sm:text-2xl font-bold mb-3">
              Setup Complete!
            </h1>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-[480px] mx-auto">
              Your business profile has been created. Our automated engine has already started
              optimizing your Google Business Profile.
            </p>
          </div>

          {/* Password Display Box */}
          <div className="bg-[#141414] border-2 border-[#10B981] rounded-2xl p-8 max-sm:p-5">
            <div className="flex items-center gap-2 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#10B981]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              <h2 className="font-heading text-lg font-bold text-[#10B981]">
                Your Admin Password
              </h2>
            </div>
            <p className="text-[#a1a1aa] text-sm mb-4">Save this to access your dashboard:</p>

            {/* Password Display */}
            <div className="bg-[#0a0a0a] border border-[#27272a] rounded-lg p-4 mb-4 flex items-center justify-between gap-3">
              <code className="font-mono text-base text-[#e5e5e5] break-all">
                {password || "Loading..."}
              </code>
            </div>

            {/* Copy + Dashboard Buttons */}
            <div className="flex items-center gap-3 max-sm:flex-col">
              <button
                onClick={copyPassword}
                disabled={!password}
                className="flex-1 max-sm:w-full px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#10B981] hover:bg-[#0d9668] text-white transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy Password
                  </>
                )}
              </button>
              <Link
                href="/admin"
                className="flex-1 max-sm:w-full px-5 py-2.5 rounded-lg text-sm font-semibold border border-[#27272a] hover:border-[#3f3f46] text-[#e5e5e5] transition-all text-center no-underline"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>

          {/* Weekly Reports Box */}
          <div className="bg-[#141414] border border-[#6366f1]/20 rounded-2xl p-8 max-sm:p-5">
            <h2 className="font-heading text-lg font-bold mb-1 text-[#e5e5e5]">
              Get Your Weekly Rank Reports
            </h2>
            <p className="text-[#a1a1aa] text-sm mb-5">
              Receive ranking updates and optimization insights directly to your inbox.
            </p>

            {newsletterStatus === "success" ? (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#10B981] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-[#10B981]">
                  You&apos;re subscribed! Your first report will arrive soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-sm:flex-col">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="form-input flex-1"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "sending"}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#6366f1] hover:bg-[#5558e6] text-white transition-all disabled:opacity-40 cursor-pointer whitespace-nowrap"
                >
                  {newsletterStatus === "sending" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}

            {newsletterStatus === "error" && (
              <p className="mt-3 text-sm text-red-400">{newsletterError}</p>
            )}
          </div>

          {/* What Happens Next Box */}
          <div className="bg-[#141414] border border-[#27272a] rounded-2xl p-8 max-sm:p-5">
            <h2 className="font-heading text-lg font-bold mb-5 text-[#e5e5e5]">
              What happens next
            </h2>

            <div className="flex flex-col gap-5">
              {[
                {
                  num: 1,
                  text: "We will request manager access via email to your Google Profile.",
                },
                {
                  num: 2,
                  text: "Once approved, our system begins the optimization process.",
                },
                {
                  num: 3,
                  text: "You will receive your first ranking report in 24 hours.",
                },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-[#6366f1]">{item.num}</span>
                  </div>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed pt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Link */}
          <div className="text-center pb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-[#6366f1] hover:text-[#8b5cf6] text-sm font-medium transition-colors no-underline"
            >
              Access Admin Dashboard
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
