"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

const spendData: Record<string, { name: string; range: string; context: string }> = {
  pi_law: { name: 'Personal Injury Law', range: '$5,000 – $50,000+/mo per location', context: 'PI law has the highest cost-per-click in Google Ads — competitive metros like Miami, Houston, and LA often require $20k–$50k+/mo to dominate.' },
  criminal_law: { name: 'Criminal Defense Law', range: '$2,000 – $15,000/mo per location', context: 'Highly competitive in major metros. Budget scales with market size and how aggressively you want to own your city.' },
  family_law: { name: 'Family Law', range: '$1,500 – $8,000/mo per location', context: 'Competitive but more affordable than PI. Divorce and custody keywords carry moderate-to-high CPCs.' },
  healthcare: { name: 'Healthcare / Medical', range: '$2,000 – $20,000/mo per location', context: 'Varies by specialty. Specialized clinics in competitive markets scale much higher.' },
  dental: { name: 'Dental', range: '$1,500 – $8,000/mo per location', context: 'Implants and cosmetic dentistry keywords are highly competitive.' },
  construction: { name: 'Construction / Contracting', range: '$1,000 – $5,000/mo per location', context: 'Roofing and restoration spikes. General contracting is more moderate.' },
  home_services: { name: 'Home Services', range: '$1,000 – $6,000/mo per location', context: 'HVAC, plumbing, and electrical are highly competitive.' },
  real_estate: { name: 'Real Estate', range: '$1,500 – $10,000/mo per location', context: 'Luxury markets require significantly higher spend.' },
  insurance: { name: 'Insurance', range: '$3,000 – $25,000/mo per location', context: 'Insurance keywords are among the most expensive in Google Ads.' },
  ecommerce: { name: 'E-Commerce', range: '$2,000 – $50,000+/mo', context: 'E-commerce budgets scale with catalog size and revenue targets.' },
  other: { name: 'your industry', range: '$1,000 – $10,000+/mo', context: 'Your rep will provide a recommendation based on your market.' }
};

export default function ClientOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [agreementNotSigned, setAgreementNotSigned] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<any>({
    companyName: "", websiteUrl: "", industry: "", businessType: "", primaryCity: "", state: "", serviceRadius: "", extraMarkets: "",
    contactName: "", contactRole: "", contactEmail: "", contactPhone: "", bestTimeToReach: "", communicationPreference: "Email", billingEmail: "",
    primaryGoal: "", targetKeywords: "", goal90Days: "", goal12Months: "", deadlines: "", leadSources: [], monthlyLeadGoal: "", avgClientValue: "",
    cms: "", hosting: "", registrar: "", domainAge: "", existingTools: [], prevAgency: "", hasPenalty: "no", penaltyDetail: "",
    currentTraffic: "", currentLeadsFromSite: "", reviewCount: "", reviewRating: "", gbpCategory: "", hasDuplicateGbp: "no",
    aiPresence: "no", hasRegularContent: "no", lsaLicensed: "no", bgCheckOnFile: "no", runningAds: [], currentAdSpend: "",
    hasGoogleAdsAccount: "no", hasMetaBusinessManager: "no", adsHistory: "",
    comp1: "", comp1Strength: "", comp2: "", comp3: "", competitiveAdvantage: "", priorityCompetitor: "", gapKeywords: "", yourReviewsCount: "", yourRatingValue: "",
    hasGoogleAccount: "", googleEmail: "", bizEmailForGoogle: "", accessGranted: [], metaAccessType: "", devContact: "", crmSystem: "", callTracking: "", otherToolsToConnect: "",
    adSpendBudget: "", customSpendAmount: "", numLocationsRunningAds: "1", preferredStartDate: "asap", specificStartDate: "", finalNotes: "",
    autoBizDesc: "", autoRepetitiveTasks: [], autoPrimaryWorkflow: "", autoPeopleCount: "", autoTimeCostPerWeek: "", autoPainPoints: "",
    autoTriggers: [], autoImmediateAction: "", autoHasBranches: "no", autoBranchLogic: "", autoDesiredOutcome: "", autoFailMode: "notify",
    autoCompliance: [], autoCrmName: "", autoCrmOther: "", autoCommsTools: [], autoSchedTools: [], autoDocTools: [], autoOtherTechTools: "",
    autoDataStorage: [], autoWorkEmail: "", autoApiAdminRights: "no", autoItContact: "", autoHeadcountToReplace: "", autoRolesToReplace: [],
    autoTimelineExpectation: "asap", autoFinalNotes: "",
  });

  const titles = ["Services", "Business", "Goals", "Presence", "Competition", "Access", "Budget"];

  const showSpendRec = useMemo(() => {
    const paid = selectedServices.some(s => ["google_ads", "meta_ads", "lsa"].includes(s));
    return paid && formData.industry && spendData[formData.industry];
  }, [selectedServices, formData.industry]);

  const autoPrice = useMemo(() => {
    if (!formData.autoHeadcountToReplace) return null;
    const count = parseInt(formData.autoHeadcountToReplace);
    const rate = 1800; // Monthly savings per head
    const monthly = count * rate;
    return {
      amount: n(monthly * 12),
      monthly: n(monthly),
      roi: (count * 40).toLocaleString() + " hours/week"
    };
  }, [formData.autoHeadcountToReplace]);

  function n(num: number) { return num >= 1000 ? '$' + (num / 1000).toFixed(0) + 'k' : '$' + num.toLocaleString(); }

  const handleSvcToggle = (svc: string) => {
    setSelectedServices(prev => prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]);
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && Array.isArray(formData[name])) {
      const currentArr = [...formData[name]];
      if (checked) {
        setFormData({ ...formData, [name]: [...currentArr, value] });
      } else {
        setFormData({ ...formData, [name]: currentArr.filter(i => i !== value) });
      }
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const validateStep = (step: number): Record<string, string> => {
    const errors: Record<string, string> = {};
    const f = formData;
    switch (step) {
      case 1:
        if (selectedServices.length === 0) errors.services = "Select at least one service";
        break;
      case 2:
        if (!f.companyName.trim()) errors.companyName = "Company Name is required";
        if (!f.websiteUrl.trim()) errors.websiteUrl = "Website URL is required";
        if (!f.industry) errors.industry = "Industry is required";
        if (!f.primaryCity.trim()) errors.primaryCity = "City is required";
        if (!f.state.trim()) errors.state = "State is required";
        if (!f.contactName.trim()) errors.contactName = "Contact Name is required";
        if (!f.contactEmail.trim()) errors.contactEmail = "Contact Email is required";
        if (!f.contactPhone.trim()) errors.contactPhone = "Contact Phone is required";
        break;
      case 3:
        if (!f.primaryGoal) errors.primaryGoal = "Select a primary objective";
        break;
      case 4:
        if (!f.cms) errors.cms = "Website Platform is required";
        break;
      case 5:
        if (!f.comp1.trim()) errors.comp1 = "Primary Competitor is required";
        break;
      case 6:
        if (!f.hasGoogleAccount) errors.hasGoogleAccount = "Select an option";
        if (f.hasGoogleAccount === "yes" && !f.googleEmail.trim()) errors.googleEmail = "Google Email is required";
        break;
      case 7:
        if (!f.adSpendBudget) errors.adSpendBudget = "Monthly Ad Budget is required";
        if (!confirmChecked) errors.confirmChecked = "You must confirm the brief is accurate";
        break;
    }
    return errors;
  };

  const handleNext = () => {
    const errors = validateStep(currentStep);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setFieldErrors({});
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateStep(7);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData, services: selectedServices.join(", "),
        leadSources: formData.leadSources.join(", "), existingTools: formData.existingTools.join(", "),
        runningAds: formData.runningAds.join(", "), accessGranted: formData.accessGranted.join(", "),
        autoRepetitiveTasks: formData.autoRepetitiveTasks.join(", "), autoTriggers: formData.autoTriggers.join(", "),
        autoCompliance: formData.autoCompliance.join(", "), autoCommsTools: formData.autoCommsTools.join(", "),
        autoSchedTools: formData.autoSchedTools.join(", "), autoDocTools: formData.autoDocTools.join(", "),
        autoDataStorage: formData.autoDataStorage.join(", "), autoRolesToReplace: formData.autoRolesToReplace.join(", "),
      };
      const res = await fetch("/api/client-onboarding", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        const data = await res.json();
        if (data.agreementSigned === false) {
          setAgreementNotSigned(true);
        } else {
          setIsSuccess(true);
        }
        window.scrollTo(0, 0);
      }
      else alert("Submission failed.");
    } catch (err) { alert("Error occurred."); }
    finally { setIsSubmitting(false); }
  };

  if (agreementNotSigned) return (
    <div className="min-h-screen bg-[#f9f9f7] py-20 px-6 text-center font-sans">
      <div className="max-w-[600px] mx-auto">
        <div className="w-16 h-16 bg-[#fef3c7] border border-[#f59e0b] rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 stroke-[#92400e] stroke-[3] fill-none" viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h1 className="font-serif text-4xl mb-6 font-medium tracking-tight">Agreement Not Signed Yet</h1>
        <div className="bg-[#fffbeb] border border-[#f59e0b] rounded-xl p-6 mb-8 text-left">
          <p className="text-[#92400e] text-base leading-relaxed">
            Your onboarding information has been saved, but you have not signed your agreement yet.
          </p>
          <p className="text-[#92400e] text-base leading-relaxed mt-3">
            Please sign the document from the email sent by <strong>DocuSign</strong> after payment. Once signed, your account will be activated and services will begin.
          </p>
        </div>
        <div className="space-y-4 text-left mb-12">
          {[
            "Check your email for the DocuSign agreement.",
            "Complete the payment if you haven\u2019t already.",
            "Sign the document to activate your services.",
            "Once signed, our team will begin your onboarding."
          ].map((t, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white border border-[#ededea] rounded-xl items-center shadow-sm">
              <div className="w-6 h-6 bg-[#f59e0b] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <span className="text-sm font-medium text-gray-700">{t}</span>
            </div>
          ))}
        </div>
        <button onClick={() => router.push("/")} className="px-10 py-4 bg-[#1a1a17] text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-black/5 uppercase tracking-widest text-xs">Return Home</button>
      </div>
    </div>
  );

  if (isSuccess) return (
    <div className="min-h-screen bg-[#f9f9f7] py-20 px-6 text-center font-sans">
      <div className="max-w-[600px] mx-auto">
        <div className="w-16 h-16 bg-[#eef4e8] border border-[#b8d49a] rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 stroke-[#2a4f0e] stroke-[3] fill-none" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h1 className="font-serif text-5xl mb-6 font-medium tracking-tight">You&apos;re all set.</h1>
        <p className="text-gray-600 mb-10 text-lg leading-relaxed">Your onboarding is complete and your agreement is signed. You will receive an email with portal access shortly. Here&apos;s what happens next:</p>
        <div className="space-y-4 text-left mb-12">
          {[
            "You\u2019ll receive portal access via email.",
            "Kickoff call scheduled within 1 business day.",
            "Google & Meta access requests arriving within 24 hours.",
            "Full campaign audit ready for our first strategy session."
          ].map((t, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white border border-[#ededea] rounded-xl items-center shadow-sm">
              <div className="w-6 h-6 bg-[#2a4f0e] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
              <span className="text-sm font-medium text-gray-700">{t}</span>
            </div>
          ))}
        </div>
        <button onClick={() => router.push("/")} className="px-10 py-4 bg-[#1a1a17] text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-black/5 uppercase tracking-widest text-xs">Return Home</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f9f9f7] py-12 pb-32 font-sans text-[#1a1a17]">
      <div className="max-w-[680px] mx-auto px-6">
        <header className="text-center mb-16">
          <div className="font-serif text-2xl font-medium tracking-[0.1em]">LAUNCHPAD</div>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mt-2">Client Strategic Onboarding</div>
          <div className="w-8 h-[1px] bg-[#e5e4df] mx-auto mt-6"></div>
        </header>

        {/* Progress */}
        <div className="flex justify-between items-start mb-16 relative px-2">
          <div className="absolute top-[13.5px] left-8 right-8 h-[1.5px] bg-[#ededea] z-0"></div>
          {titles.map((title, i) => (
            <div key={i} className="flex flex-col items-center gap-2.5 z-10 w-12 sm:w-16">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-500
                        ${currentStep === i + 1 ? 'bg-[#1a1a17] border-[#1a1a17] text-white scale-110 shadow-lg shadow-black/10' :
                  currentStep > i + 1 ? 'bg-[#2a4f0e] border-[#2a4f0e] text-white' :
                    'bg-white border-[#e5e4df] text-gray-400'}`}>
                {currentStep > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`text-[9px] font-bold tracking-widest uppercase hidden lg:block
                        ${currentStep === i + 1 ? 'text-[#1a1a17]' : currentStep > i + 1 ? 'text-[#2a4f0e]' : 'text-gray-400'}`}>
                {title}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="bg-white/50 p-1 sm:p-0 rounded-3xl">
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#2a4f0e] mb-3">Foundation</div>
              <h2 className="font-serif text-4xl mb-3 font-medium tracking-tight">Select Your Services</h2>
              <p className="text-gray-500 text-sm mb-10 leading-relaxed max-w-lg">Choose the pillars of your growth campaign. We will tailor the following steps based on your selection.</p>
              {fieldErrors.services && <p className="text-red-500 text-xs font-semibold mb-4">{fieldErrors.services}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "local_seo", name: "Local SEO", desc: "Maps, GBP, citations & reviews" },
                  { id: "ai_seo", name: "AI SEO", desc: "ChatGPT & AI Recommendations" },
                  { id: "lsa", name: "Local Service Ads", desc: "Google Guaranteed PPL" },
                  { id: "google_ads", name: "Google Ads", desc: "Search & Display PPC" },
                  { id: "meta_ads", name: "Meta Ads", desc: "FB/IG Social Funnels" },
                  { id: "automation", name: "Automation", desc: "AI Agents & Workflows" }
                ].map(s => (
                  <div key={s.id} onClick={() => handleSvcToggle(s.id)}
                    className={`p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 group flex items-start gap-5
                                    ${selectedServices.includes(s.id) ? 'border-[#2a4f0e] bg-[#eef4e8]' : 'border-[#e5e4df] bg-white hover:border-[#b8d49a]'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all
                                    ${selectedServices.includes(s.id) ? 'bg-[#2a4f0e] border-[#2a4f0e] scale-110' : 'bg-white border-[#e5e4df]'}`}>
                      {selectedServices.includes(s.id) && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <div>
                      <div className="text-sm font-bold mb-1">{s.name}</div>
                      <div className="text-[11px] text-gray-500 leading-[1.4] font-medium">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#2a4f0e]">Step 2</div>
              <h2 className="font-serif text-4xl font-medium tracking-tight">Your Business</h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-lg">Used to coordinate your identity across all search networks.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required error={fieldErrors.companyName} />
                <Input label="Website URL" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} placeholder="https://..." required error={fieldErrors.websiteUrl} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Select label="Industry" name="industry" value={formData.industry} onChange={handleChange} required error={fieldErrors.industry}>
                  <option value="">Select...</option>
                  {Object.keys(spendData).map(k => <option key={k} value={k}>{spendData[k].name}</option>)}
                </Select>
                <Select label="Business Type" name="businessType" value={formData.businessType} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option>Local (Single)</option><option>Local (Multi)</option><option>Regional</option><option>National</option>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <Input label="City" name="primaryCity" value={formData.primaryCity} onChange={handleChange} required error={fieldErrors.primaryCity} />
                <Input label="State" name="state" value={formData.state} onChange={handleChange} required error={fieldErrors.state} />
                <Input label="Radius" name="serviceRadius" value={formData.serviceRadius} onChange={handleChange} placeholder="30 mi" />
              </div>
              <div className="pt-6 border-t border-[#e5e4df]">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Contact & Communications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input label="Primary Name" name="contactName" value={formData.contactName} onChange={handleChange} required error={fieldErrors.contactName} />
                  <Input label="Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} type="email" required error={fieldErrors.contactEmail} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <Input label="Phone" name="contactPhone" value={formData.contactPhone} onChange={handleChange} type="tel" required error={fieldErrors.contactPhone} />
                  <Input label="Role / Title" name="contactRole" value={formData.contactRole} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#2a4f0e]">Step 3</div>
              <h2 className="font-serif text-4xl font-medium tracking-tight">Goals &amp; Results</h2>
              <p className="text-gray-500 text-sm leading-relaxed">What does a &ldquo;win&rdquo; look like for you this year?</p>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Primary Objective <span className="text-red-500">*</span></label>
                {fieldErrors.primaryGoal && <p className="text-red-500 text-xs font-semibold -mt-1">{fieldErrors.primaryGoal}</p>}
                {[
                  { id: "rank_keywords", t: "Rank for specific keywords", d: "First page dominance for core services" },
                  { id: "local_leads", t: "Generate more local phone calls", d: "Focus on bottom-of-funnel conversions" },
                  { id: "beat_competitors", t: "Beat specific competitors", d: "Displace the market leaders" }
                ].map(o => (
                  <label key={o.id} className={`flex items-start gap-5 p-5 border-2 rounded-2xl cursor-pointer transition-all
                                ${formData.primaryGoal === o.id ? 'border-[#2a4f0e] bg-[#eef4e8]' : 'border-[#e5e4df] bg-white hover:border-[#b8d49a]'}`}>
                    <input type="radio" name="primaryGoal" value={o.id} checked={formData.primaryGoal === o.id} onChange={handleChange} className="w-5 h-5 accent-[#2a4f0e] shrink-0 mt-0.5" required />
                    <div>
                      <div className="text-sm font-bold mb-0.5">{o.t}</div>
                      <div className="text-[11px] text-gray-500 font-medium">{o.d}</div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Target Keywords</label>
                <textarea name="targetKeywords" value={formData.targetKeywords} onChange={handleChange} placeholder="One per line..." className="w-full p-4 border-2 border-[#e5e4df] rounded-2xl text-sm focus:border-[#2a4f0e] outline-none min-h-[120px] transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Input label="Budget per Lead ($)" name="monthlyLeadGoal" value={formData.monthlyLeadGoal} onChange={handleChange} type="number" />
                <Input label="Avg Client Value ($)" name="avgClientValue" value={formData.avgClientValue} onChange={handleChange} type="number" />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#2a4f0e]">Step 4</div>
              <h2 className="font-serif text-4xl font-medium tracking-tight">Digital Footprint</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Select label="Website Platform" name="cms" value={formData.cms} onChange={handleChange} required error={fieldErrors.cms}>
                    <option value="">Select...</option><option>WordPress</option><option>Webflow</option><option>Custom</option>
                  </Select>
                  <Select label="Domain Age" name="domainAge" value={formData.domainAge} onChange={handleChange}>
                    <option value="">Select...</option><option>0-1 yr</option><option>1-3 yrs</option><option>3-7 yrs</option><option>7+ yrs</option>
                  </Select>
                </div>

                {selectedServices.includes("local_seo") && (
                  <div className="p-8 bg-[#eef4e8]/50 border-2 border-[#b8d49a] rounded-3xl space-y-8">
                    <h3 className="font-serif text-2xl font-medium tracking-tight text-[#2a4f0e]">Local SEO Specifics</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <Input label="Google Reviews count" name="reviewCount" value={formData.reviewCount} onChange={handleChange} type="number" />
                      <Input label="Avg Star Rating" name="reviewRating" value={formData.reviewRating} onChange={handleChange} placeholder="4.8" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-[#2a4f0e]/60 ml-1">Duplicate Map Profiles?</label>
                      <div className="flex gap-4">
                        {['no', 'yes', 'unsure'].map(v => (
                          <label key={v} className={`flex-1 flex items-center justify-center p-3 border-2 rounded-xl text-sm font-bold capitalize cursor-pointer transition-all
                                                ${formData.hasDuplicateGbp === v ? 'bg-[#2a4f0e] border-[#2a4f0e] text-white shadow-md shadow-[#2a4f0e]/20' : 'bg-white border-[#b8d49a]/40 text-[#2a4f0e]'}`}>
                            <input type="radio" name="hasDuplicateGbp" value={v} checked={formData.hasDuplicateGbp === v} onChange={handleChange} className="hidden" />
                            {v}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {(selectedServices.includes("google_ads") || selectedServices.includes("meta_ads")) && (
                  <div className="p-8 bg-black/5 border-2 border-black/10 rounded-3xl space-y-8">
                    <h3 className="font-serif text-2xl font-medium tracking-tight">Ads History</h3>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/50 ml-1">Currently running ads on:</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Google', 'Meta', 'TikTok', 'None'].map(v => (
                          <label key={v} className={`p-4 border-2 rounded-xl text-sm font-bold flex items-center gap-3 cursor-pointer transition-all ${formData.runningAds.includes(v) ? 'bg-[#1a1a17] border-[#1a1a17] text-white' : 'bg-white border-black/10'}`}>
                            <input type="checkbox" name="runningAds" value={v} checked={formData.runningAds.includes(v)} onChange={handleChange} className="w-4 h-4 accent-amber-500" />
                            {v}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#2a4f0e]">Step 5</div>
              <h2 className="font-serif text-4xl font-medium tracking-tight">The Competition</h2>
              <div className="space-y-6">
                <Input label="Primary Competitor" name="comp1" value={formData.comp1} onChange={handleChange} placeholder="Their website URL" required error={fieldErrors.comp1} />
                <Input label="Second Competitor" name="comp2" value={formData.comp2} onChange={handleChange} />
                <div className="pt-6">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Your Competitive Edge</label>
                  <textarea name="competitiveAdvantage" value={formData.competitiveAdvantage} onChange={handleChange} placeholder="What makes you the better choice?" className="w-full mt-3 p-4 border-2 border-[#e5e4df] rounded-2xl text-sm focus:border-[#2a4f0e] outline-none min-h-[120px]" />
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#2a4f0e]">Step 6</div>
              <h2 className="font-serif text-4xl font-medium tracking-tight">Asset Access</h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold">Do you have a managed Google Account for your business? <span className="text-red-500">*</span></label>
                  {fieldErrors.hasGoogleAccount && <p className="text-red-500 text-xs font-semibold -mt-2">{fieldErrors.hasGoogleAccount}</p>}
                  <div className="grid grid-cols-2 gap-4">
                    {['yes', 'no'].map(v => (
                      <label key={v} className={`p-5 border-2 rounded-2xl text-center cursor-pointer transition-all ${formData.hasGoogleAccount === v ? 'border-[#2a4f0e] bg-[#eef4e8] font-bold' : fieldErrors.hasGoogleAccount ? 'border-red-300 bg-red-50/30' : 'border-[#e5e4df]'}`}>
                        <input type="radio" name="hasGoogleAccount" value={v} checked={formData.hasGoogleAccount === v} onChange={handleChange} className="hidden" required />
                        {v === 'yes' ? 'Yes, I have it' : 'No, set it up'}
                      </label>
                    ))}
                  </div>
                </div>
                {formData.hasGoogleAccount === 'yes' && (
                  <Input label="Main Google Email" name="googleEmail" value={formData.googleEmail} onChange={handleChange} type="email" placeholder="account@gmail.com" required error={fieldErrors.googleEmail} />
                )}
                <Input label="CRM System" name="crmSystem" value={formData.crmSystem} onChange={handleChange} placeholder="HubSpot, Salesforce, etc." />
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-[#2a4f0e]">Final Step</div>
              <h2 className="font-serif text-4xl font-medium tracking-tight">Budget &amp; Start</h2>

              {showSpendRec && (
                <div className="p-8 bg-[#faf4e0] border-2 border-[#e0c97a] rounded-3xl animate-in zoom-in-95">
                  <div className="text-[10px] font-extrabold tracking-widest text-[#8a6910] uppercase mb-3">Industry Standard for {spendData[formData.industry].name}</div>
                  <div className="font-serif text-3xl font-medium text-[#5a4710] mb-2">{spendData[formData.industry].range}</div>
                  <p className="text-xs text-[#8a6910]/80 leading-relaxed font-medium">{spendData[formData.industry].context}</p>
                </div>
              )}

              <div className="space-y-8">
                <Select label="Monthly Ad Budget" name="adSpendBudget" value={formData.adSpendBudget} onChange={handleChange} required error={fieldErrors.adSpendBudget}>
                  <option value="">Select...</option>
                  <option>Under $1,000</option><option>$1,000 - $2,500</option><option>$2,500 - $5,000</option>
                  <option>$5,000 - $10,000</option><option>$10k - $25k</option><option>$25k+</option>
                </Select>

                {selectedServices.includes("automation") && (
                  <div className="p-8 bg-black/5 border-2 border-black/10 rounded-3xl space-y-10">
                    <h3 className="font-serif text-2xl font-medium tracking-tight">Automation ROI Assessment</h3>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/50">Replaceable Headcount (FTE)</label>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 5, 10, 20].map(v => (
                          <button key={v} type="button" onClick={() => setFormData({ ...formData, autoHeadcountToReplace: v.toString() })}
                            className={`px-5 py-3 rounded-xl border-2 text-sm font-bold transition-all
                                                ${formData.autoHeadcountToReplace === v.toString() ? 'bg-black border-black text-white' : 'bg-white border-black/10 text-black/60 hover:border-black/30'}`}>
                            {v} {v === 1 ? 'Person' : 'People'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {autoPrice && (
                      <div className="p-6 bg-white border-2 border-black/5 rounded-2xl animate-in fade-in slide-in-from-top-2">
                        <div className="text-[10px] font-extrabold tracking-widest uppercase text-black/40 mb-3">Projected Annual Savings</div>
                        <div className="font-serif text-4xl font-medium mb-1">{autoPrice.amount}</div>
                        <div className="text-sm font-bold text-emerald-600 mb-5">{autoPrice.roi} of labor recovered / week</div>
                        <div className="w-full h-[1px] bg-black/5 mb-5"></div>
                        <div className="text-xs text-black/50 font-medium">Ballpark monthly maintenance: <span className="text-black font-bold">{autoPrice.monthly}</span></div>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-10 border-t-2 border-[#e5e4df]">
                  <label className={`flex items-start gap-5 p-7 border-2 rounded-2xl cursor-pointer transition-all duration-500 group
                                ${confirmChecked ? 'border-[#2a4f0e] bg-[#eef4e8] shadow-lg shadow-[#2a4f0e]/5' : fieldErrors.confirmChecked ? 'border-red-300 bg-red-50/30' : 'border-[#e0c97a] bg-[#faf4e0]'}`}>
                    <input type="checkbox" checked={confirmChecked} onChange={(e) => setConfirmChecked(e.target.checked)} className="w-6 h-6 accent-[#2a4f0e] mt-1 shrink-0" required />
                    <span className={`text-sm font-bold leading-relaxed transition-colors ${confirmChecked ? 'text-[#2a4f0e]' : fieldErrors.confirmChecked ? 'text-red-500' : 'text-[#8a6910]'}`}>
                      I confirm that this strategic brief is accurate. I am ready for the Launchpad team to begin work in my account immediately upon kickoff.
                    </span>
                  </label>
                  {fieldErrors.confirmChecked && <p className="text-red-500 text-xs font-semibold mt-2 ml-1">{fieldErrors.confirmChecked}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="mt-16 pt-10 border-t-2 border-[#ededea] flex justify-between items-center bg-transparent">
            <div className="text-[10px] font-extrabold text-[#1a1a17]/30 uppercase tracking-[0.2em]">Brief {currentStep} of 7</div>
            <div className="flex gap-4">
              {currentStep > 1 && (
                <button type="button" onClick={() => { setFieldErrors({}); setCurrentStep(currentStep - 1); }} className="px-8 py-3.5 border-2 border-[#e5e4df] rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all">Back</button>
              )}
              {currentStep < 7 ? (
                <button type="button" onClick={handleNext}
                  className="px-10 py-3.5 bg-[#1a1a17] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-black transition-all disabled:opacity-20 shadow-lg shadow-black/10">Continue &rarr;</button>
              ) : (
                <button type="submit" disabled={isSubmitting || !confirmChecked}
                  className="px-10 py-3.5 bg-[#2a4f0e] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#1c3a08] transition-all disabled:opacity-30 shadow-lg shadow-[#2a4f0e]/20 flex items-center gap-3">
                  {isSubmitting ? <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> : null}
                  Secure &amp; Start &rarr;
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Geist:wght@300;400;500;600;700;800&display=swap');
        body { font-family: 'Geist', sans-serif; }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        input, select, textarea { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>
    </div>
  );
}

function Input({ label, error, ...props }: any) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{label} {props.required && <span className="text-red-500">*</span>}</label>
      <input className={`p-4 border-2 rounded-2xl text-sm outline-none shadow-sm shadow-black/[0.02] bg-white transition-all ${error ? 'border-red-400 focus:border-red-500' : 'border-[#e5e4df] focus:border-[#2a4f0e]'}`} {...props} />
      {error && <p className="text-red-500 text-xs font-semibold -mt-1 ml-1">{error}</p>}
    </div>
  );
}

function Select({ label, error, children, ...props }: any) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{label} {props.required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        <select className={`w-full p-4 border-2 rounded-2xl text-sm outline-none appearance-none bg-white shadow-sm shadow-black/[0.02] transition-all ${error ? 'border-red-400 focus:border-red-500' : 'border-[#e5e4df] focus:border-[#2a4f0e]'}`} {...props}>{children}</select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs font-semibold -mt-1 ml-1">{error}</p>}
    </div>
  );
}
