import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-32 px-12 max-md:px-5 max-md:py-20 text-center">
          <div className="max-w-[900px] mx-auto">
            <h1 className="font-heading text-[3.5rem] max-md:text-[2.2rem] font-bold leading-[1.1] mb-6">
              <span className="gradient-text">Our Product Suite</span>
            </h1>
            <p className="text-text-dim text-xl max-md:text-lg leading-[1.7] max-w-[700px] mx-auto">
              Specialized AI platforms built for specific industries and use cases.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="px-12 max-md:px-5 pb-24">
          <div className="max-w-[1100px] mx-auto flex flex-col gap-16">
            {/* Launchpad Boost — Featured */}
            <a
              href="https://launchpadboost.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-accent/40 bg-dark-surface p-10 max-md:p-6 hover:border-accent transition-all duration-300 no-underline group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[0.75rem] font-semibold uppercase tracking-widest text-accent">
                  Featured
                </span>
              </div>
              <h2 className="font-heading text-[2rem] max-md:text-[1.5rem] font-bold mb-1 text-text group-hover:text-accent transition-colors">
                Launchpad Boost
              </h2>
              <p className="text-text-dim text-lg mb-6">
                Automated Local SEO Platform
              </p>
              <p className="text-text-dim leading-[1.7] max-w-[750px] mb-10">
                Enterprise-grade local SEO automation that helps businesses
                dominate local search results. From Google Business Profile
                optimization to review generation and rank monitoring, Boost
                delivers measurable traffic growth on autopilot.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-4 max-md:grid-cols-2 gap-6 mb-10">
                {[
                  { value: "10,000+", label: "Active Businesses" },
                  { value: "$5,000", label: "Monthly Subscription" },
                  { value: "24 hrs", label: "Time to Results" },
                  { value: "3.2x", label: "Avg Traffic Increase" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-xl border border-border text-center"
                  >
                    <div className="font-heading text-2xl max-md:text-xl font-bold text-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-text-dim text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Key Features */}
              <div>
                <h3 className="font-heading text-lg font-semibold mb-4 text-text">
                  Key Features
                </h3>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                  {[
                    "Automated GBP Optimization",
                    "Review Generation Campaigns",
                    "24/7 Rank Monitoring",
                    "Weekly Progress Reports",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-text-dim text-[0.95rem]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </a>

            {/* Launchpad Automation */}
            <a
              href="https://launchpadautomation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-border bg-dark-surface p-10 max-md:p-6 hover:border-accent/50 transition-all duration-300 no-underline group"
            >
              <h2 className="font-heading text-[2rem] max-md:text-[1.5rem] font-bold mb-1 text-text group-hover:text-accent transition-colors">
                Launchpad Automation
              </h2>
              <p className="text-text-dim text-lg mb-6">
                Custom AI Agent Development
              </p>
              <p className="text-text-dim leading-[1.7] max-w-[750px] mb-10">
                Tailored AI automation solutions designed specifically for
                marketing agencies. We build custom AI agents that handle
                repetitive workflows, generate content, manage campaigns, and
                deliver real-time analytics — freeing your team to focus on
                strategy and growth.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-4 max-md:grid-cols-2 gap-6 mb-10">
                {[
                  { value: "$5K-20K", label: "Monthly Retainer" },
                  { value: "4 weeks", label: "Implementation" },
                  { value: "Custom", label: "Portal & Analytics" },
                  { value: "30-60d", label: "ROI Timeline" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-xl border border-border text-center"
                  >
                    <div className="font-heading text-2xl max-md:text-xl font-bold text-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-text-dim text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Deliverables */}
              <div>
                <h3 className="font-heading text-lg font-semibold mb-4 text-text">
                  Deliverables
                </h3>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                  {[
                    "Custom AI Agent",
                    "Real-Time Analytics Portal",
                    "Complete Documentation",
                    "Team Training & Support",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-text-dim text-[0.95rem]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-purple shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-12 max-md:px-5 max-md:py-16 border-t border-border text-center">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-heading text-[2.5rem] max-md:text-[1.8rem] font-bold mb-6">
              Explore Our Solutions
            </h2>
            <p className="text-text-dim text-lg leading-[1.7] mb-10">
              Ready to see how our platforms can drive results for your business?
              Let&apos;s talk.
            </p>
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
