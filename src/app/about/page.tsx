import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-32 px-12 max-md:px-5 max-md:py-20 text-center">
          <div className="max-w-[900px] mx-auto">
            <h1 className="font-heading text-[3.5rem] max-md:text-[2.2rem] font-bold leading-[1.1] mb-6">
              Building AI Solutions That{" "}
              <span className="gradient-text">Actually Work</span>
            </h1>
            <p className="text-text-dim text-xl max-md:text-lg leading-[1.7] max-w-[700px] mx-auto">
              Launchpad develops specialized AI platforms that solve real business
              problems with measurable outcomes.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-24 px-12 max-md:px-5 max-md:py-16">
          <div className="max-w-[900px] mx-auto">
            <h2 className="font-heading text-[2.5rem] max-md:text-[1.8rem] font-bold mb-8">
              Our Mission
            </h2>
            <p className="text-text-dim text-lg leading-[1.8] max-w-[750px]">
              We believe AI should deliver concrete business value — not just
              impressive demos. Our mission is to build specialized platforms that
              transform how businesses operate, driving revenue growth, reducing
              costs, and creating competitive advantages that compound over time.
              Every product we ship is measured by the outcomes it creates for our
              customers.
            </p>
          </div>
        </section>

        {/* Why We're Different */}
        <section className="py-24 px-12 max-md:px-5 max-md:py-16 border-t border-border">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="font-heading text-[2.5rem] max-md:text-[1.8rem] font-bold mb-16 text-center">
              Why We&apos;re Different
            </h2>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8">
              {[
                {
                  title: "Vertical Focus",
                  description:
                    "We don't build generic tools. Every platform is purpose-built for a specific industry, tuned to the workflows, data structures, and success metrics that matter most in that space.",
                },
                {
                  title: "Outcome-Driven Development",
                  description:
                    "We tie every feature to a measurable business outcome. If it doesn't move the needle on revenue, efficiency, or customer satisfaction, it doesn't ship.",
                },
                {
                  title: "Enterprise Scale",
                  description:
                    "Our platforms are engineered for reliability at scale — handling thousands of concurrent operations with the uptime and security that enterprise customers demand.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl border border-border bg-dark-surface hover:border-accent/50 transition-all duration-300"
                >
                  <h3 className="font-heading text-xl font-semibold mb-4">
                    {item.title}
                  </h3>
                  <p className="text-text-dim leading-[1.7] text-[0.95rem]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-24 px-12 max-md:px-5 max-md:py-16 border-t border-border">
          <div className="max-w-[900px] mx-auto">
            <h2 className="font-heading text-[2.5rem] max-md:text-[1.8rem] font-bold mb-8">
              When Failure Isn&apos;t an Option
            </h2>
            <p className="text-text-dim text-lg leading-[1.8] max-w-[750px]">
              Our clients depend on our platforms to run critical business
              operations every single day. That responsibility shapes everything we
              do — from how we architect systems to how we test, deploy, and
              monitor. We build with the assumption that downtime costs real money
              and missed insights mean lost opportunities. This mindset drives us
              to over-engineer reliability, invest heavily in automated testing,
              and maintain the kind of operational rigor that earns long-term
              trust.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-12 max-md:px-5 max-md:py-16 border-t border-border text-center">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-heading text-[2.5rem] max-md:text-[1.8rem] font-bold mb-6">
              Work With Us
            </h2>
            <p className="text-text-dim text-lg leading-[1.7] mb-10">
              Whether you need a proven platform or a custom AI solution, we&apos;d
              love to hear about your challenges.
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
