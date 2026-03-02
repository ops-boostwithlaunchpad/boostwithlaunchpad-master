"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  website: string;
  category: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  goals: string;
  budget: string;
  timeline: string;
  notes: string;
}

export default function OnboardingFormPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    website: "",
    category: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    goals: "",
    budget: "",
    timeline: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const password =
        "LP-" +
        Math.random().toString(36).substring(2, 8).toUpperCase() +
        Math.random().toString(36).substring(2, 4);

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          password,
          authorized: true,
        }),
      });

      if (res.ok) {
        localStorage.setItem("currentUserPassword", password);
        router.push("/success");
      }
    } catch {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-[#1a1a17]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="text-center pt-10 mb-12">
        <Link
          href="/"
          className="text-[19px] font-medium tracking-wider text-[#1a1a17] no-underline"
          style={{ fontFamily: "Georgia, serif" }}
        >
          LAUNCHPAD
        </Link>
        <div className="text-[9px] font-semibold tracking-[0.18em] uppercase text-[#ababA2] mt-1">
          Client Onboarding
        </div>
        <div className="w-7 h-px bg-[#e5e4df] mx-auto mt-3.5" />
      </div>

      {/* Hero */}
      <div className="text-center mb-11 px-5">
        <h1
          className="text-4xl font-medium leading-tight tracking-tight mb-3"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Welcome to Launchpad
        </h1>
        <p className="text-[13.5px] text-[#6b6b64] max-w-[440px] mx-auto leading-relaxed">
          Complete the form below to begin your onboarding process. All information is securely handled.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-[660px] mx-auto px-5 pb-24">
        <form onSubmit={handleSubmit}>
          {/* Business Information */}
          <div className="mb-8">
            <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#6b6b64] mb-4">
              Business Information
            </h2>
            <div className="bg-white rounded-lg border border-[#e5e4df] p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Owner / Contact Name *</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://"
                    className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Plumber, Dentist"
                    className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#6b6b64] mb-4">
              Location
            </h2>
            <div className="bg-white rounded-lg border border-[#e5e4df] p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                <div>
                  <label className="block text-sm font-medium mb-1.5">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="mb-8">
            <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#6b6b64] mb-4">
              Project Details
            </h2>
            <div className="bg-white rounded-lg border border-[#e5e4df] p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Goals & Objectives</label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  rows={3}
                  placeholder="What are you hoping to achieve?"
                  className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17] resize-vertical"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                  >
                    <option value="">Select...</option>
                    <option value="under-5k">Under $5,000/mo</option>
                    <option value="5k-10k">$5,000 - $10,000/mo</option>
                    <option value="10k-20k">$10,000 - $20,000/mo</option>
                    <option value="20k+">$20,000+/mo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17]"
                  >
                    <option value="">Select...</option>
                    <option value="asap">ASAP</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="1-month">1 month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Anything else we should know?"
                  className="w-full px-3.5 py-2.5 border border-[#e5e4df] rounded-lg text-sm focus:outline-none focus:border-[#2a4f0e] bg-white text-[#1a1a17] resize-vertical"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-[#2a4f0e] text-white rounded-lg font-semibold text-sm hover:bg-[#1e3a0a] transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Onboarding Form"}
          </button>
        </form>
      </div>
    </div>
  );
}
