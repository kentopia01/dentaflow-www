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
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-gray-900 text-[15px]">
              DentaFlow
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-600">
            <a href="#features">Features</a>
            <a href="#demo">Demo</a>
            <a href="#waitlist">Early Access</a>
          </div>
          <a href="#waitlist">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] h-9 px-4 active:scale-[0.98]">
              Request early access
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-medium text-emerald-700 mb-6">
              Now accepting early access applications · Singapore
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              More than just a<br />
              <span className="text-emerald-600">booking page.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              DentaFlow gives Singapore dental clinics the tools to fill chairs,
              reduce no-shows, and bring patients back — automatically.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#waitlist">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 text-[15px] active:scale-[0.98]"
                >
                  Request early access →
                </Button>
              </a>
              <a
                href="https://dentaflow-three.vercel.app/book/shuang-dentistry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-[15px] border-gray-200"
                >
                  See live demo ↗
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Browser frame with booking page screenshot */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
              <div className="h-9 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md border border-gray-200 h-5 flex items-center px-3">
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
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="py-12 border-y border-gray-100 bg-gray-50">
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

      {/* Feature pillars */}
      <section id="features" className="py-24 bg-gray-50 px-6">
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
            title="Your clinic's booking page, live in minutes."
            description="Patients book directly from your Google Business Profile, SGDentistry listing, or any link — without calling or messaging. Each outlet gets its own URL. You see every booking instantly."
            visual={<BookingAnimation />}
            align="right"
          />
          <FeatureRow
            label="PATIENTS"
            title="Every patient. Every visit. Every message."
            description="Full patient profiles built automatically from bookings. Import your existing list from Dental4Windows or any CSV. WhatsApp opt-in status, recall queue, and appointment history in one place."
            visual={<PatientAnimation />}
            align="left"
          />
          <FeatureRow
            label="MESSAGING"
            title="Confirmations and reminders on autopilot."
            description="The moment a patient books, DentaFlow sends a WhatsApp confirmation. Then a 24-hour reminder. Then a 2-hour reminder. No-shows drop. Zero manual work."
            visual={<MessagingAnimation />}
            align="right"
          />
          <FeatureRow
            label="RECALL"
            title="Your recall list is revenue you haven't collected yet."
            description="One click sends a WhatsApp recall message to every patient overdue for their 6-month check. That's not admin. That's booked appointments you were leaving on the table."
            visual={<RecallAnimation />}
            align="left"
          />
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
            <span className="text-[13px] font-semibold text-gray-700">
              DentaFlow
            </span>
          </div>
          <p className="text-[12px] text-gray-400">
            Built for Singapore dental clinics · © 2026 DentaFlow
          </p>
          <a
            href="/sign-in"
            className="text-[12px] text-gray-400 hover:text-gray-600"
          >
            Clinic login →
          </a>
        </div>
      </footer>
    </div>
  );
}
