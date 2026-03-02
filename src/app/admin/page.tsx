"use client";

import { useEffect, useState, useCallback } from "react";

/* ───────────────────────────── types ───────────────────────────── */
interface Business {
  id?: string;
  businessName: string;
  category: string;
  email: string;
  city: string;
  status?: string;
  keywords?: string[];
}

type View = "overview" | "newsletter" | "analytics";

/* ───────────────────────────── icons ───────────────────────────── */
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

/* ───────────────────────────── component ───────────────────────── */
export default function AdminDashboard() {
  /* ─── auth state ─── */
  const [isAuthed, setIsAuthed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  /* ─── dashboard state ─── */
  const [activeView, setActiveView] = useState<View>("overview");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loadingBusinesses, setLoadingBusinesses] = useState(false);

  /* ─── add business form ─── */
  const [newBusiness, setNewBusiness] = useState<Business>({
    businessName: "",
    category: "",
    email: "",
    city: "",
  });
  const [addLoading, setAddLoading] = useState(false);

  /* ─── newsletter state ─── */
  const [emailSubject, setEmailSubject] = useState("Your Weekly Rank Report");
  const [emailBody, setEmailBody] = useState(
    `Hi {{businessName}},\n\nHere is your weekly ranking report for {{city}}.\n\nYour business continues to perform well in local search results. Below are the key highlights from this week:\n\n- Overall visibility improved\n- New keyword rankings detected\n- Local map pack presence maintained\n\nKeep up the great work!\n\nBest,\nThe Launchpad Team`
  );

  /* ─── mobile sidebar toggle ─── */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ─── check auth on mount ─── */
  useEffect(() => {
    const stored = localStorage.getItem("adminAuth");
    if (stored === "true") {
      setIsAuthed(true);
    }
    setAuthChecked(true);
  }, []);

  /* ─── fetch businesses ─── */
  const fetchBusinesses = useCallback(async () => {
    setLoadingBusinesses(true);
    try {
      const res = await fetch("/api/admin/businesses");
      if (res.ok) {
        const data = await res.json();
        setBusinesses(Array.isArray(data) ? data : data.businesses || []);
      }
    } catch {
      // silently handle – empty state will show
    } finally {
      setLoadingBusinesses(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthed) {
      fetchBusinesses();
    }
  }, [isAuthed, fetchBusinesses]);

  /* ─── login handler ─── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.setItem("adminAuth", "true");
        setIsAuthed(true);
        setPassword("");
      } else {
        const data = await res.json().catch(() => ({}));
        setLoginError(data.message || "Invalid password. Please try again.");
      }
    } catch {
      setLoginError("Unable to connect. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  /* ─── logout handler ─── */
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthed(false);
    setBusinesses([]);
    setActiveView("overview");
  };

  /* ─── add business handler ─── */
  const handleAddBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);

    try {
      const res = await fetch("/api/admin/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBusiness),
      });

      if (res.ok) {
        setShowAddModal(false);
        setNewBusiness({ businessName: "", category: "", email: "", city: "" });
        fetchBusinesses();
      }
    } catch {
      // handle error silently
    } finally {
      setAddLoading(false);
    }
  };

  /* ─── filtered businesses ─── */
  const filteredBusinesses = businesses.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.businessName?.toLowerCase().includes(q) ||
      b.category?.toLowerCase().includes(q) ||
      b.city?.toLowerCase().includes(q)
    );
  });

  /* ─── computed stats ─── */
  const activeCount = businesses.filter(
    (b) => b.status === "active" || !b.status
  ).length;
  const keywordsCount = businesses.reduce(
    (acc, b) => acc + (b.keywords?.length || 0),
    0
  );

  /* ─── don't render until auth check completes ─── */
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /* ═══════════════════════════ LOGIN OVERLAY ═══════════════════════ */
  if (!isAuthed) {
    return (
      <div className="fixed inset-0 bg-[#0F172A] z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#1E293B] rounded-2xl p-8 shadow-2xl border border-[#334155]">
            {/* Logo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Launchpad<span className="text-indigo-500">.</span>
              </h1>
              <h2 className="text-lg text-slate-400 mt-2 font-medium">
                Admin Access
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {loginError && (
                <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loginLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════ SIDEBAR NAV ITEMS ══════════════════ */
  const navItems: { key: View; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Profiles", icon: <UsersIcon /> },
    { key: "newsletter", label: "Newsletter", icon: <MailIcon /> },
    { key: "analytics", label: "Analytics", icon: <ChartIcon /> },
  ];

  /* ═══════════════════════════ DASHBOARD ══════════════════════════ */
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900" style={{ fontFamily: "var(--font-body)" }}>
      {/* ─── Mobile top bar ─── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0F172A] px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
          Launchpad<span className="text-indigo-500">.</span>
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white p-1"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <CloseIcon />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* ─── Mobile nav dropdown ─── */}
      {sidebarOpen && (
        <div className="md:hidden fixed top-[52px] left-0 right-0 z-30 bg-[#0F172A] border-t border-[#1E293B] shadow-lg">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveView(item.key);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeView === item.key
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-[#1E293B] hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors mt-4"
            >
              <LogoutIcon />
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden md:flex admin-sidebar flex-col">
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            Launchpad<span className="text-indigo-500">.</span>
          </h1>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeView === item.key
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-[#1E293B] hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogoutIcon />
          Logout
        </button>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="admin-main pt-[68px] md:pt-0">
        {/* ═════════ VIEW 1: OVERVIEW ═════════ */}
        {activeView === "overview" && (
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                Overview
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative flex-1 sm:flex-none">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Search businesses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  <PlusIcon />
                  Add
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <UsersIcon />
                  </div>
                  <span className="text-sm font-medium text-gray-500">Active Profiles</span>
                </div>
                <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                  {activeCount}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="9" x2="20" y2="9" />
                      <line x1="4" y1="15" x2="20" y2="15" />
                      <line x1="10" y1="3" x2="8" y2="21" />
                      <line x1="16" y1="3" x2="14" y2="21" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-500">Total Keywords</span>
                </div>
                <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                  {keywordsCount}
                </div>
              </div>
            </div>

            {/* Business Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">
                  Businesses ({filteredBusinesses.length})
                </h3>
              </div>

              {loadingBusinesses ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filteredBusinesses.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <UsersIcon />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    No businesses found
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {searchQuery
                      ? "No results match your search. Try adjusting your query."
                      : "Get started by adding your first business profile."}
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-sm"
                    >
                      <PlusIcon />
                      Add Business
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Business
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredBusinesses.map((biz, i) => (
                        <tr
                          key={biz.id || i}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold">
                                {biz.businessName?.charAt(0)?.toUpperCase() || "B"}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {biz.businessName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {biz.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              {biz.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {biz.city}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                                biz.status === "active" || !biz.status
                                  ? "bg-green-50 text-green-700"
                                  : "bg-yellow-50 text-yellow-700"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  biz.status === "active" || !biz.status
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                }`}
                              />
                              {biz.status || "Active"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═════════ VIEW 2: NEWSLETTER ═════════ */}
        {activeView === "newsletter" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                Weekly Newsletter
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Compose and send weekly ranking reports to your businesses.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl">
              <div className="space-y-5">
                {/* Subject */}
                <div>
                  <label
                    htmlFor="email-subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject Line
                  </label>
                  <input
                    id="email-subject"
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Body */}
                <div>
                  <label
                    htmlFor="email-body"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Body
                  </label>
                  <textarea
                    id="email-body"
                    rows={14}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-mono resize-y"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Available variables:{" "}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-600">
                      {"{{businessName}}"}
                    </code>{" "}
                    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-600">
                      {"{{city}}"}
                    </code>
                  </p>
                </div>

                {/* Send */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() =>
                      alert(
                        `Newsletter queued!\n\nSubject: ${emailSubject}\nRecipients: ${businesses.length} businesses`
                      )
                    }
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    <MailIcon />
                    Send Now
                  </button>
                  <span className="text-xs text-gray-400">
                    Will be sent to {businesses.length} recipient{businesses.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════ VIEW 3: ANALYTICS ═════════ */}
        {activeView === "analytics" && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
                Platform Analytics
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Key performance metrics for the Launchpad platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Retention */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    Retention Rate
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  98%
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "98%" }} />
                </div>
              </div>

              {/* Revenue */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    Monthly Revenue
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  $15k
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="text-gray-400">vs last month</span>
                </div>
              </div>

              {/* Conversion */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    Conversion Rate
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  12.5%
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                  <span className="text-green-600 font-medium">+3.2%</span>
                  <span className="text-gray-400">vs last month</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ═══════════════════════ ADD BUSINESS MODAL ════════════════ */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />

          {/* Modal card */}
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            {/* Close button */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>

            <h3
              className="text-xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Add Business
            </h3>

            <form onSubmit={handleAddBusiness} className="space-y-4">
              <div>
                <label
                  htmlFor="add-name"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Business Name
                </label>
                <input
                  id="add-name"
                  type="text"
                  required
                  value={newBusiness.businessName}
                  onChange={(e) =>
                    setNewBusiness({ ...newBusiness, businessName: e.target.value })
                  }
                  placeholder="e.g. Acme Corp"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="add-category"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Category
                </label>
                <input
                  id="add-category"
                  type="text"
                  required
                  value={newBusiness.category}
                  onChange={(e) =>
                    setNewBusiness({ ...newBusiness, category: e.target.value })
                  }
                  placeholder="e.g. Plumbing, HVAC, Dental"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="add-email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="add-email"
                  type="email"
                  required
                  value={newBusiness.email}
                  onChange={(e) =>
                    setNewBusiness({ ...newBusiness, email: e.target.value })
                  }
                  placeholder="contact@business.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="add-city"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  City
                </label>
                <input
                  id="add-city"
                  type="text"
                  required
                  value={newBusiness.city}
                  onChange={(e) =>
                    setNewBusiness({ ...newBusiness, city: e.target.value })
                  }
                  placeholder="e.g. Austin, TX"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={addLoading}
                className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {addLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </span>
                ) : (
                  "Add Business"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
