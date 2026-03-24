"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

const COUNTRIES = [
  "Singapore",
  "Malaysia",
  "Indonesia",
  "Thailand",
  "Philippines",
  "Vietnam",
  "Australia",
  "New Zealand",
  "United Kingdom",
  "United States",
  "Canada",
  "India",
  "Hong Kong",
  "Taiwan",
  "South Korea",
  "Japan",
  "United Arab Emirates",
  "Saudi Arabia",
  "Other",
];

export function WaitlistForm() {
  const [form, setForm] = useState({
    clinicName: "",
    name: "",
    email: "",
    country: "",
    outlets: "",
    currentTool: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setDone(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600">
          <Check className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">You&apos;re on the list.</h3>
        <p className="mt-2 text-[13px] text-gray-500">
          We&apos;ll email you when your early access slot opens — usually within 2 weeks.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-4 h-11 text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent";
  const selectClass =
    "w-full rounded-lg border border-gray-200 px-4 h-11 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-3 text-left">
      <input
        className={inputClass}
        placeholder="Clinic name *"
        value={form.clinicName}
        required
        onChange={(e) => setForm((f) => ({ ...f, clinicName: e.target.value }))}
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          className={inputClass}
          placeholder="Your name *"
          value={form.name}
          required
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <select
          className={selectClass}
          value={form.country}
          required
          onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
        >
          <option value="">Country *</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <input
        type="email"
        className={inputClass}
        placeholder="Email address *"
        value={form.email}
        required
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
      />
      <div className="grid grid-cols-2 gap-3">
        <select
          className={selectClass}
          value={form.outlets}
          onChange={(e) => setForm((f) => ({ ...f, outlets: e.target.value }))}
        >
          <option value="">Number of outlets</option>
          <option value="1">1 outlet</option>
          <option value="2-5">2–5 outlets</option>
          <option value="6+">6+ outlets</option>
        </select>
        <select
          className={selectClass}
          value={form.currentTool}
          onChange={(e) => setForm((f) => ({ ...f, currentTool: e.target.value }))}
        >
          <option value="">Booking method</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Phone">Phone calls</option>
          <option value="Other software">Other software</option>
          <option value="Nothing">No system yet</option>
        </select>
      </div>

      {error && <p className="text-[12px] text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white h-12 text-[15px] font-semibold transition-all duration-150 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Request early access →
      </button>
      <p className="text-[11px] text-gray-400 text-center">
        No credit card. No commitment. We&apos;ll be in touch within 2 weeks.
      </p>
    </form>
  );
}
