"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "./WaitlistForm";


/* ─── Feature Row ─── */
function FeatureRow({
  label,
  title,
  description,
  visual,
  align,
}: {
  label: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col ${
        align === "right" ? "md:flex-row" : "md:flex-row-reverse"
      } gap-12 items-center mb-24`}
    >
      <div className="flex-1">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600">
          {label}
        </span>
        <h3 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
          {title}
        </h3>
        <p className="mt-4 text-[15px] text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
      <div className="flex-1 flex justify-center">{visual}</div>
    </motion.div>
  );
}

/* ─── Booking Animation ─── */
function BookingAnimation() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % 5), 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow-lg p-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-4">
        Book Appointment
      </p>
      <div
        className={`mb-3 rounded-lg border p-3 transition-all duration-500 ${
          step >= 1 ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
        }`}
      >
        <p className="text-[11px] text-gray-400">Treatment</p>
        <p className="text-[13px] font-medium text-gray-900">
          {step >= 1 ? "Scaling & Polishing" : "—"}
        </p>
      </div>
      <div
        className={`mb-3 rounded-lg border p-3 transition-all duration-500 ${
          step >= 2 ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
        }`}
      >
        <p className="text-[11px] text-gray-400">Date</p>
        <p className="text-[13px] font-medium text-gray-900">
          {step >= 2 ? "Monday, 28 Apr" : "—"}
        </p>
      </div>
      <div
        className={`mb-4 rounded-lg border p-3 transition-all duration-500 ${
          step >= 3 ? "border-emerald-500 bg-emerald-50" : "border-gray-200"
        }`}
      >
        <p className="text-[11px] text-gray-400">Time</p>
        <p className="text-[13px] font-medium text-gray-900">
          {step >= 3 ? "10:00 AM" : "—"}
        </p>
      </div>
      {step >= 4 ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-lg bg-emerald-600 text-white text-center py-3 text-[13px] font-semibold"
        >
          ✓ Appointment Confirmed
        </motion.div>
      ) : (
        <div className="rounded-lg bg-gray-100 text-center py-3 text-[13px] text-gray-400">
          Confirm Booking →
        </div>
      )}
    </div>
  );
}

/* ─── Patient Animation ─── */
function PatientAnimation() {
  const [tab, setTab] = useState<"overview" | "messages">("overview");
  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-semibold text-emerald-700">
          ST
        </div>
        <div>
          <p className="text-[13px] font-semibold text-gray-900">Sarah Tan</p>
          <p className="text-[11px] text-gray-500">
            +65 9123 4567 · Shuang Dentistry
          </p>
        </div>
        <span className="ml-auto inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
          WhatsApp ✓
        </span>
      </div>
      <div className="flex border-b border-gray-100">
        {(["overview", "messages"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-[12px] font-medium transition-colors ${
              tab === t
                ? "text-emerald-700 border-b-2 border-emerald-600"
                : "text-gray-500"
            }`}
          >
            {t === "overview" ? "Overview" : "Messages"}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tab === "overview" ? (
          <div className="space-y-2">
            {[
              {
                label: "Last visit",
                value: "15 Mar 2026 · Scaling & Polishing",
              },
              { label: "Recall due", value: "15 Sep 2026" },
              { label: "Appointments", value: "4 total" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between py-1.5 border-b border-gray-50"
              >
                <span className="text-[12px] text-gray-500">{item.label}</span>
                <span className="text-[12px] font-medium text-gray-800">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {[
              { msg: "Booking Confirmation", time: "15 Mar", status: "READ" },
              { msg: "24h Reminder", time: "14 Mar", status: "DELIVERED" },
              { msg: "Recall Reminder", time: "15 Sep", status: "QUEUED" },
            ].map((m) => (
              <div
                key={m.msg}
                className="flex items-center justify-between py-1.5 border-b border-gray-50"
              >
                <span className="text-[12px] text-gray-700">{m.msg}</span>
                <span
                  className={`text-[10px] font-medium rounded-full border px-1.5 py-0.5 ${
                    m.status === "READ"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : m.status === "DELIVERED"
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Messaging Animation ─── */
function MessagingAnimation() {
  const messages = [
    {
      text: "Hi Sarah! Your appointment at Shuang Dentistry is confirmed for Monday, 28 Apr at 10:00 AM ✓",
    },
    {
      text: "Reminder: Your appointment is tomorrow at 10:00 AM. See you then! 🦷",
    },
    {
      text: "Your appointment is in 2 hours. Reply STOP to cancel.",
    },
  ];
  const [visible, setVisible] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setVisible(0);
    const timers = messages.map((_, i) =>
      setTimeout(() => setVisible((v) => Math.max(v, i + 1)), i * 2000 + 500)
    );
    const reset = setTimeout(() => setCycle((c) => c + 1), 7000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(reset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycle]);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-gray-200 bg-[#ECE5DD] p-4 space-y-3 min-h-[200px]">
        <p className="text-[11px] text-center text-gray-500 font-medium">
          Shuang Dentistry · WhatsApp
        </p>
        {messages.slice(0, visible).map((msg, i) => (
          <motion.div
            key={`${cycle}-${i}`}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm"
          >
            <p className="text-[12px] text-gray-800 leading-relaxed">
              {msg.text}
            </p>
            <p className="text-[10px] text-gray-400 mt-1 text-right">
              {i === 0 ? "Sent" : i === 1 ? "24h before" : "2h before"} ✓✓
            </p>
          </motion.div>
        ))}
      </div>
      <p className="text-[11px] text-center text-gray-400 mt-2">
        Sent automatically. Zero manual work.
      </p>
    </div>
  );
}

/* ─── Recall Animation ─── */
function RecallAnimation() {
  const [sent, setSent] = useState(false);
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setSent(false);
    setCount(0);
    let n = 0;
    const tick = setInterval(() => {
      n = Math.min(n + 7, 243);
      setCount(n);
      if (n >= 243) {
        clearInterval(tick);
        const sendTimer = setTimeout(() => setSent(true), 2000);
        const resetTimer = setTimeout(() => setCycle((c) => c + 1), 6000);
        return () => {
          clearTimeout(sendTimer);
          clearTimeout(resetTimer);
        };
      }
    }, 30);
    return () => clearInterval(tick);
  }, [cycle]);

  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          Recall Queue
        </p>
        <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-medium text-amber-700">
          {count} DUE
        </span>
      </div>
      <div className="space-y-2 mb-4">
        {[
          "Sarah Tan · Last visit 8 months ago",
          "Ranjit Singh · Last visit 9 months ago",
          "Teo Siew Eng · Last visit 7 months ago",
        ].map((p) => (
          <motion.div
            key={p}
            className={`flex items-center gap-3 rounded-lg border p-2.5 transition-all duration-500 ${
              sent ? "border-emerald-200 bg-emerald-50" : "border-gray-100"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                sent ? "bg-emerald-500" : "bg-amber-400"
              }`}
            />
            <span className="text-[12px] text-gray-700 flex-1">{p}</span>
            {sent && (
              <span className="text-[11px] text-emerald-600">Sent ✓</span>
            )}
          </motion.div>
        ))}
        <p className="text-[11px] text-gray-400 text-center">
          + {Math.max(0, count - 3)} more patients
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full rounded-lg py-2.5 text-[13px] font-semibold transition-colors duration-300 ${
          sent
            ? "bg-emerald-100 text-emerald-700"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
      >
        {sent
          ? `✓ Sent to ${count} patients`
          : `Send recall to ${count} patients →`}
      </motion.button>
    </div>
  );
}

/* ─── Landing Page ─── */
export function LandingPage() {
  // scrolled state removed — nav is always light

  return (
    <div className="min-h-screen bg-white">
      {/* Nav — always light */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-[15px] text-gray-900">
              DentaFlow
            </span>
          </div>
          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</a>
            <a href="/about" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#waitlist" className="hover:text-gray-900 transition-colors">Early Access</a>
          </div>
          <a href="#waitlist">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] h-9 px-4 active:scale-[0.98]">
              Request early access
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero — full light */}
      <section className="relative pt-28 pb-0 px-6 overflow-hidden bg-white">
        {/* Subtle background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(#059669 1px, transparent 1px), linear-gradient(to right, #059669 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Soft radial highlight — light, centred */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(5,150,105,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[12px] text-emerald-700 font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Now accepting Singapore clinics · Early access
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6 text-gray-900">
              Stop managing dental<br />
              <span className="text-emerald-600">bookings on WhatsApp.</span>
            </h1>

            <p className="text-[17px] text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
              DentaFlow gives Singapore dental clinics online booking, automated reminders, and recall campaigns — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#waitlist">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 rounded-lg text-[15px] font-semibold active:scale-[0.98] transition-all duration-150">
                  Request early access →
                </button>
              </a>
              <a
                href="https://dentaflow-three.vercel.app/book/shuang-dentistry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="h-12 px-8 rounded-lg text-[15px] font-medium text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900 bg-white hover:bg-gray-50 transition-all duration-150">
                  See live demo ↗
                </button>
              </a>
            </div>
          </motion.div>

          {/* Product screenshot with floating cards */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-16 relative mx-auto max-w-3xl"
          >
            {/* Floating card — top right */}
            <motion.div
              initial={{ opacity: 0, y: 16, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 3 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -top-5 -right-4 md:-right-10 z-10 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-100/80 p-3 w-44 hidden sm:block"
            >
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Today</p>
              <p className="text-2xl font-bold text-gray-900 leading-none">12</p>
              <p className="text-[11px] text-gray-500 mt-0.5">appointments booked</p>
              <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">↑ 3 vs yesterday</p>
            </motion.div>

            {/* Floating card — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 16, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -bottom-4 -left-4 md:-left-10 z-10 bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-100/80 p-3 w-52 hidden sm:block"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center text-[11px] font-semibold text-emerald-700">WJ</div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-900 leading-tight">Wong Wei Jie booked</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Scaling · 10:00 AM · Yishun</p>
                </div>
              </div>
              <div className="mt-2 text-[10px] text-gray-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                WhatsApp confirmation sent
              </div>
            </motion.div>

            {/* Browser chrome — light */}
            <div className="rounded-xl border border-gray-200 shadow-2xl shadow-gray-200/60 overflow-hidden">
              <div className="h-9 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded border border-gray-200 h-5 flex items-center px-3">
                    <span className="text-[11px] text-gray-400">
                      dentaflow.com/book/shuang-dentistry
                    </span>
                  </div>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/screenshots/booking-page.png"
                alt="DentaFlow booking page"
                className="w-full"
              />
            </div>

            {/* Fade bottom into social proof */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </motion.div>

          <div className="h-16" />
        </div>
      </section>

      {/* Social proof bar */}
      <section className="py-12 border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Trusted by Singapore dental clinics
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[
              "Shuang Dentistry · Yishun",
              "Smile Dental · Orchard",
              "Smile Dental · Tampines",
            ].map((name) => (
              <span
                key={name}
                className="text-[14px] font-medium text-gray-600"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-gray-500">
            Joining{" "}
            <span className="font-semibold text-gray-900">40+ clinics</span> on
            the early access waitlist
          </p>
        </div>
      </section>

      {/* Problem section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Your WhatsApp is not
              <br />a booking system.
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              But that&apos;s what most Singapore clinics use. And it&apos;s
              costing you more than you think.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stat: "45 min",
                label: "Spent daily on WhatsApp confirmations",
                description:
                  "Your receptionist's morning is spent chasing patients one by one. That's time she could spend with patients in front of her.",
              },
              {
                stat: "1 in 8",
                label: "Appointments end in a no-show",
                description:
                  "No automated reminder. No way to follow up. Your 90-minute root canal slot sits empty with no warning.",
              },
              {
                stat: "40%",
                label: "Of patients don't come back after 12 months",
                description:
                  "They're not gone — they just forgot. No recall system means no one's asking them to come back.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {item.stat}
                </p>
                <p className="text-[13px] font-semibold text-gray-700 mb-2">
                  {item.label}
                </p>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-white section-glow-top">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 mb-3">Setup in minutes</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              From zero to fully automated<br />in under 10 minutes.
            </h2>
            <p className="mt-4 text-gray-500 text-[15px] max-w-xl mx-auto">
              No IT team. No training week. No migration project. Most clinics are live before lunch.
            </p>
          </motion.div>

          {/* Steps — connected with a line */}
          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-emerald-100" />

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  time: "2 min",
                  title: "Set up your clinic",
                  description: "Enter your clinic name, add your outlets, and select which treatments patients can book online. That\u2019s it \u2014 your profile is ready.",
                  icon: "\uD83C\uDFE5",
                },
                {
                  step: "02",
                  time: "1 min",
                  title: "Share your booking link",
                  description: "Paste one line of code on your website \u2014 or skip the website entirely. Your DentaFlow link works everywhere: WhatsApp bio, Google My Business, Instagram.",
                  icon: "\uD83D\uDD17",
                },
                {
                  step: "03",
                  time: "Ongoing",
                  title: "Run on autopilot",
                  description: "Patients book. Reminders send automatically. Recalls queue up. You manage from one dashboard \u2014 instead of 14 WhatsApp chats.",
                  icon: "\u26A1",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="relative text-center"
                >
                  {/* Step circle */}
                  <div className="mx-auto mb-6 relative">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto relative z-10">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center z-20">
                      {i + 1}
                    </span>
                  </div>
                  {/* Time badge */}
                  <span className="inline-block mb-3 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-0.5">
                    {step.time}
                  </span>
                  <h3 className="text-[17px] font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed max-w-[260px] mx-auto">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA under steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 text-center"
          >
            <a href="#waitlist">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 text-[15px] active:scale-[0.98] rounded-lg font-semibold transition-all duration-150">
                Get started in 10 minutes →
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Feature pillars */}
      <section id="features" className="py-24 bg-gray-50 px-6 dot-grid">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything your clinic needs.
              <br />
              Nothing it doesn&apos;t.
            </h2>
          </div>

          <FeatureRow
            label="BOOKINGS"
            title="Online booking that works without a website."
            description="Every clinic gets a hosted booking page, ready to share anywhere — Google Business Profile, SGDentistry, WhatsApp bio. Each outlet has its own URL. Patients book in under 90 seconds. No calls, no back-and-forth."
            visual={<BookingAnimation />}
            align="right"
          />
          <FeatureRow
            label="PATIENTS"
            title="One record per patient. Always up to date."
            description="Patient profiles build automatically from every booking. Import your existing list from Dental4Windows or any CSV. Appointment history, WhatsApp status, and recall schedule — in one place, not scattered across chats."
            visual={<PatientAnimation />}
            align="left"
          />
          <FeatureRow
            label="MESSAGING"
            title="The confirmation was sent before you looked up."
            description="The moment a patient books, a WhatsApp confirmation goes out. A 24-hour reminder follows. Then a 2-hour reminder. No-shows fall by 65%. Your receptionist sends zero manual messages."
            visual={<MessagingAnimation />}
            align="right"
          />
          <FeatureRow
            label="RECALL"
            title="Patients who haven't returned in 6 months are revenue waiting."
            description="DentaFlow surfaces every overdue patient and queues their recall message automatically. One review, one click to send. Your chairs fill without anyone making a single phone call."
            visual={<RecallAnimation />}
            align="left"
          />
        </div>
      </section>

      {/* Integration section — expandable */}
      <IntegrationSection />

      {/* Mid-page CTA band */}
      <section className="py-14 px-6 bg-emerald-600">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white text-xl font-semibold">Ready to stop managing bookings on WhatsApp?</p>
            <p className="text-emerald-100 text-[14px] mt-1">Join 40+ Singapore clinics on the early access waitlist.</p>
          </div>
          <a href="#waitlist">
            <button className="flex-shrink-0 bg-white hover:bg-gray-50 text-emerald-700 font-semibold px-8 h-12 rounded-lg text-[15px] active:scale-[0.98] transition-all duration-150 whitespace-nowrap">
              Request early access →
            </button>
          </a>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24 px-6 bg-gray-50 dot-grid">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 mb-3">Why switch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              WhatsApp isn&apos;t a booking system.<br />It&apos;s just the one you&apos;re used to.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm"
          >
            {/* Table header */}
            <div className="grid grid-cols-3">
              <div className="px-6 py-5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                Capability
              </div>
              <div className="px-6 py-5 text-center border-b border-gray-100 border-l border-gray-100">
                <span className="text-[13px] font-semibold text-gray-400">WhatsApp + Phone</span>
              </div>
              <div className="px-6 py-5 text-center border-b border-gray-100 border-l border-gray-100 bg-emerald-50/60">
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  DentaFlow
                </span>
              </div>
            </div>

            {/* Rows */}
            {[
              {
                feature: "Online booking",
                wa: { text: "Not available", negative: true },
                df: { text: "24/7, instant confirmation", positive: true },
              },
              {
                feature: "Appointment reminders",
                wa: { text: "Typed manually each time", negative: true },
                df: { text: "Sent automatically", positive: true },
              },
              {
                feature: "No-show rate",
                wa: { text: "~12% industry average", neutral: true },
                df: { text: "~4% with reminders", positive: true },
              },
              {
                feature: "Recall campaigns",
                wa: { text: "Post-its and memory", negative: true },
                df: { text: "Automated queue", positive: true },
              },
              {
                feature: "Patient history",
                wa: { text: "Scattered across chats", negative: true },
                df: { text: "Unified profiles", positive: true },
              },
              {
                feature: "Multi-outlet management",
                wa: { text: "Separate group chats", negative: true },
                df: { text: "One dashboard", positive: true },
              },
              {
                feature: "Admin time per day",
                wa: { text: "45+ minutes on messages", neutral: true },
                df: { text: "Under 5 minutes", positive: true },
              },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-b border-gray-100 last:border-0 group"
              >
                <div className="px-6 py-4 text-[13px] font-medium text-gray-700 flex items-center">
                  {row.feature}
                </div>
                <div className="px-6 py-4 text-center border-l border-gray-100 flex items-center justify-center">
                  <span className={`inline-flex items-center gap-1.5 text-[13px] ${row.wa.negative ? "text-gray-400" : "text-gray-500"}`}>
                    {row.wa.negative && (
                      <svg className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                    {row.wa.text}
                  </span>
                </div>
                <div className="px-6 py-4 text-center border-l border-gray-100 bg-emerald-50/40 flex items-center justify-center">
                  <span className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${row.df.positive ? "text-gray-800" : "text-gray-600"}`}>
                    {row.df.positive && (
                      <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" viewBox="0 0 14 11" fill="none">
                        <path d="M1 5.5l4 4L13 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {row.df.text}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA under table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10 text-center"
          >
            <a href="#waitlist">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 text-[15px] active:scale-[0.98] rounded-lg font-semibold transition-all duration-150">
                Make the switch →
              </button>
            </a>
            <p className="text-[12px] text-gray-400 mt-3">No commitment. No credit card. Singapore-based support.</p>
          </motion.div>
        </div>
      </section>

      {/* Numbers section */}
      <section className="py-20 bg-emerald-600 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-12">
            Clinics using DentaFlow report:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "↓ 65%", label: "Reduction in no-shows" },
              { stat: "45 min", label: "Saved per day on confirmations" },
              {
                stat: "$800+",
                label: "Recovered monthly from recall campaigns",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-white">{item.stat}</p>
                <p className="mt-2 text-emerald-100 text-[14px]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Waitlist form section */}
      <section id="waitlist" className="py-24 px-6 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            We&apos;re onboarding Singapore clinics in batches.
          </h2>
          <p className="mt-4 text-gray-500 text-[15px]">
            Leave your details. We&apos;ll reach out when your slot opens —
            usually within 2 weeks.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="text-[13px] font-semibold text-gray-700">DentaFlow</span>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-gray-400">
            <a href="/about" className="hover:text-gray-600 transition-colors">About</a>
            <a href="https://sgdentistry.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">SGDentistry</a>
            <a href="#waitlist" className="hover:text-gray-600 transition-colors">Early Access</a>
            <a href="https://dentaflow-three.vercel.app/sign-in" className="hover:text-gray-600 transition-colors">Clinic login →</a>
          </div>
          <p className="text-[11px] text-gray-400">© 2026 DentaFlow · Built for Singapore</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── Integration Section ─── */
function IntegrationSection() {
  const options = [
    {
      label: "No website",
      description: "Hosted booking page included. Share the link anywhere.",
    },
    {
      label: "Any website",
      description: "One script tag. Works on any platform, no developer needed.",
    },
    {
      label: "WordPress / Wix",
      description: "Drop the inline form into any page with a single HTML block.",
    },
    {
      label: "Existing button",
      description: "Attach the booking popup to any button on your site.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Flexible setup</p>
          <h2 className="text-2xl font-bold text-gray-900">
            Works however you work.
          </h2>
          <p className="text-[14px] text-gray-500 mt-2 max-w-lg mx-auto">
            No website, existing site, or anything in between — DentaFlow installs in minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {options.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center mb-3">
                <svg className="w-3 h-3 text-white" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[13px] font-semibold text-gray-900 mb-1">{item.label}</p>
              <p className="text-[12px] text-gray-500 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ Section ─── */
function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "Do my patients need to download an app?",
      a: "No. Patients book through a regular web page in their browser \u2014 no app, no account, no friction. They pick a time, enter their name and mobile, and they\u2019re done. Most patients complete the booking in under 90 seconds.",
    },
    {
      q: "Do I need a website to use DentaFlow?",
      a: "No. Every clinic gets a hosted booking page at dentaflow.com/book/your-clinic. You can share this link directly in your WhatsApp bio, Google My Business listing, Instagram profile, or anywhere else. If you do have a website, we have a one-line embed that drops a floating booking button on every page.",
    },
    {
      q: "What happens to my existing clinic WhatsApp number?",
      a: "Nothing changes for your personal clinic WhatsApp. DentaFlow uses a dedicated clinic number (via WhatsApp Business API) for automated messages \u2014 booking confirmations, reminders, and recalls. Patients can reply to those messages and you\u2019ll see the thread in DentaFlow. Your personal number stays separate.",
    },
    {
      q: "Is DentaFlow compliant with PDPA?",
      a: "Yes. The booking form includes explicit consent checkboxes for data collection and WhatsApp communications, aligned with Singapore\u2019s Personal Data Protection Act. Patient data is stored in Singapore-region servers and you retain full control of your data.",
    },
    {
      q: "How long does setup take?",
      a: "Under 10 minutes for a single-outlet clinic. You\u2019ll create your account, add your treatments, and have a live booking link ready to share. For multi-outlet groups, allow 20\u201330 minutes to configure each outlet\u2019s operating hours and treatment menu.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white section-glow-top">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Got questions?</p>
          <h2 className="text-3xl font-bold text-gray-900">Common questions</h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-[14px] font-medium text-gray-900 pr-4">{faq.q}</span>
                <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-[12px] transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`}>
                  ↓
                </span>
              </button>
              {openIdx === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                  className="px-5 pb-4"
                >
                  <p className="text-[14px] text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-[13px] text-gray-500">Still have questions?</p>
          <a href="mailto:hello@dentaflow.com" className="text-[13px] text-emerald-600 hover:underline mt-1 inline-block">
            hello@dentaflow.com →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
