"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-32 px-12 max-md:px-5 max-md:py-20 text-center">
          <div className="max-w-[900px] mx-auto">
            <h1 className="font-heading text-[3.5rem] max-md:text-[2.2rem] font-bold leading-[1.1] mb-6">
              <span className="gradient-text">Let&apos;s Work Together</span>
            </h1>
            <p className="text-text-dim text-xl max-md:text-lg leading-[1.7] max-w-[700px] mx-auto">
              Reach out for partnerships, demos, or general inquiries.
            </p>
          </div>
        </section>

        {/* Info Cards */}
        <section className="px-12 max-md:px-5 pb-16">
          <div className="max-w-[900px] mx-auto grid grid-cols-3 max-md:grid-cols-1 gap-6">
            {[
              { label: "Email", value: "hello@boostwithlaunchpad.com" },
              { label: "Response Time", value: "Within 24 hours" },
              { label: "Location", value: "Palm Beach, USA" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-2xl border border-border bg-dark-surface text-center"
              >
                <div className="text-text-dim text-sm mb-2">{item.label}</div>
                <div className="font-heading font-semibold text-text">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="px-12 max-md:px-5 pb-24">
          <div className="max-w-[700px] mx-auto p-10 max-md:p-6 rounded-2xl border border-border bg-dark-surface">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="font-heading text-2xl font-bold mb-4 text-text">
                  Message Sent
                </div>
                <p className="text-text-dim leading-[1.7] mb-8">
                  Thank you for reaching out. We&apos;ll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-dim mb-2"
                  >
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="form-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-dim mb-2"
                  >
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@company.com"
                    className="form-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-text-dim mb-2"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    placeholder="Your company (optional)"
                    className="form-input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-dim mb-2"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="Tell us about your project or question..."
                    className="form-textarea"
                  />
                </div>

                {status === "error" && (
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary text-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
