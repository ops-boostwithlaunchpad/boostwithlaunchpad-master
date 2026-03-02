"use client";

import Link from "next/link";

export default function SubscribePage() {
  const features = [
    "Automated GBP Optimization",
    "Review Generation Campaigns",
    "Weekly Progress Reports",
    "24/7 Rank Monitoring",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
      {/* Header */}
      <header className="flex items-center justify-between px-12 max-md:px-5 py-5 border-b border-[#27272a]">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight"
        >
          Launchpad
        </Link>
        <nav className="flex items-center gap-8 max-md:hidden">
          <Link
            href="/"
            className="text-[#a1a1aa] hover:text-[#e5e5e5] transition-colors text-sm"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-[#a1a1aa] hover:text-[#e5e5e5] transition-colors text-sm"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-[#a1a1aa] hover:text-[#e5e5e5] transition-colors text-sm"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-[#a1a1aa] hover:text-[#e5e5e5] transition-colors text-sm"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Hero / Subscription Card */}
      <main className="flex items-center justify-center px-12 max-md:px-5 py-32 max-md:py-20">
        <div className="w-full max-w-[480px]">
          <div className="bg-[#1a1a1a] border border-[#27272a] rounded-2xl p-10 max-md:p-6 text-center">
            {/* Badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-[#6366f1] text-sm font-medium mb-8">
              Launchpad Boost Pro
            </span>

            {/* Price */}
            <div className="mb-2">
              <span className="font-heading text-[3.5rem] max-md:text-[2.5rem] font-bold leading-none">
                $5,000
              </span>
              <span className="text-[#a1a1aa] text-lg">/mo</span>
            </div>
            <p className="text-[#a1a1aa] text-sm mb-10">
              No contract. Cancel anytime.
            </p>

            {/* Features */}
            <ul className="text-left space-y-4 mb-10">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#6366f1] shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-[#e5e5e5]">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href="https://buy.stripe.com/dRm00b6lNfYwfUW5dCcMM0f"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 rounded-xl bg-[#6366f1] hover:bg-[#5558e6] text-white font-semibold text-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
            >
              Subscribe Now
            </a>

            {/* Secure payment note */}
            <p className="text-[#a1a1aa] text-xs mt-6 flex items-center justify-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure payment via Stripe
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
