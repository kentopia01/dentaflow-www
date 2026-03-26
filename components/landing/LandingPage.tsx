"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "./WaitlistForm";
import { NumberTicker } from "./NumberTicker";


/* ─── Feature Row ─── */
function FeatureRow({
  number,
  label,
  icon,
  title,
  description,
  bullets,
  visual,
  align,
  bg,
}: {
  number?: string;
  label: string;
  icon?: React.ReactNode;
  title: string;
  description?: string | React.ReactNode;
  bullets?: { icon: React.ReactNode; text: string }[];
  visual: React.ReactNode;
  align: "left" | "right";
  bg?: "white" | "gray" | "dark";
}) {
  const bgClass = "bg-white";
  const labelColor = "text-emerald-600";
  const titleColor = "text-gray-900";
  const descColor = "text-gray-500";

  return (
    <div className={`${bgClass} px-6 py-20 border-b border-gray-100`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className={`flex flex-col ${align === "right" ? "md:flex-row" : "md:flex-row-reverse"} gap-16 items-center`}
        >
          {/* Copy side */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {number && (
                <span className="text-[11px] font-bold text-gray-300 tabular-nums font-mono">{number}</span>
              )}
              {icon && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50">
                  {icon}
                </div>
              )}
              <span className={`text-[10px] font-semibold uppercase tracking-widest ${labelColor}`}>
                {label}
              </span>
            </div>
            <h3 className={`text-3xl md:text-4xl font-bold leading-snug mb-4 ${titleColor}`}>
              {title}
            </h3>
            {description && (
              <div className={`text-base leading-relaxed mb-6 ${descColor}`}>
                {description}
              </div>
            )}
            {bullets && bullets.length > 0 && (
              <ul className="space-y-3">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 flex items-center justify-center text-emerald-600">
                      {b.icon}
                    </span>
                    <span className="text-sm leading-snug text-gray-700">
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Visual side */}
          <div className="flex-1 flex items-center justify-center min-h-[400px]">
            {visual}
          </div>
        </motion.div>
      </div>
    </div>
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
    <div style={{ width: 320 }}>
      <div className="rounded-xl border border-gray-200 bg-[#ECE5DD] overflow-hidden" style={{ height: 220, width: 320 }}>
        {/* Header bar */}
        <div className="bg-[#075E54] px-4 py-2.5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-white text-[11px] font-semibold">SD</div>
          <div>
            <p className="text-white text-[12px] font-semibold leading-tight">Shuang Dentistry</p>
            <p className="text-[#B2DFDB] text-[10px]">WhatsApp Business</p>
          </div>
        </div>
        {/* Chat area — fixed height, messages appear from top */}
        <div className="p-3 space-y-2 h-[164px] overflow-hidden">
          {messages.slice(0, visible).map((msg, i) => (
            <motion.div
              key={`${cycle}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-[#DCF8C6] rounded-lg rounded-tl-none px-3 py-2 max-w-[88%] shadow-sm"
            >
              <p className="text-[11px] text-gray-800 leading-relaxed">{msg.text}</p>
              <p className="text-[9px] text-gray-400 mt-0.5 text-right">
                {i === 0 ? "Sent" : i === 1 ? "24h before" : "2h before"} ✓✓
              </p>
            </motion.div>
          ))}
        </div>
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
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow-lg p-5" style={{ minWidth: 280 }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
          Recall Queue
        </p>
        <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-medium text-amber-700 tabular-nums" style={{ minWidth: 60, justifyContent: 'center' }}>
          {String(count).padStart(3, '\u2007')} DUE
        </span>
      </div>
      <div className="space-y-2 mb-4">
        {[
          "Sarah Tan · Last visit 8 months ago",
          "Ranjit Singh · Last visit 9 months ago",
          "Teo Siew Eng · Last visit 7 months ago",
        ].map((p) => (
          <div
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
              <span className="text-[11px] text-emerald-600 shrink-0">Sent ✓</span>
            )}
          </div>
        ))}
        <p className="text-[11px] text-gray-400 text-center tabular-nums">
          + {Math.max(0, count - 3)} more patients
        </p>
      </div>
      {/* Fixed-size button so text change doesn't reflow */}
      <button
        className={`w-full rounded-lg py-2.5 text-[13px] font-semibold transition-colors duration-300 ${
          sent
            ? "bg-emerald-100 text-emerald-700"
            : "bg-emerald-600 text-white"
        }`}
        style={{ minHeight: 40 }}
      >
        {sent ? `✓ Sent to ${count} patients` : `Send recall to ${count} patients →`}
      </button>
    </div>
  );
}

/* ─── Analytics Dashboard Animation ─── */
function AnalyticsDashboardAnim() {
  const [phase, setPhase] = useState(0); // 0=loading, 1=numbers, 2=sparkline, 3=deltas
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setPhase(0);
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3600),
      setTimeout(() => { setPhase(0); setCycle(c => c + 1); }, 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  const bars = [62, 78, 55, 90, 83, 71, 95]; // relative heights %
  const stats = [
    { label: "Appointments", value: "147", delta: "+12 this month", color: "emerald" },
    { label: "No-show rate", value: "3.4%", delta: "↓ from 11.2%", color: "emerald" },
    { label: "WhatsApp sent", value: "312", delta: "This month", color: "gray" },
  ];

  // Convert % heights to pixel values (chart container is h-16 = 64px)
  const CHART_H = 64;
  const barPx = bars.map(h => Math.round((h / 100) * CHART_H));

  return (
    <div style={{ width: 320 }} className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
      {/* Dashboard header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">This Month</p>
        <span className="text-[10px] text-gray-400">March 2026</span>
      </div>

      {/* Stat cards — fixed-height cells to prevent layout shift */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        {stats.map((stat, i) => (
          <div key={stat.label} className="px-3 py-3" style={{ height: 72 }}>
            <p className="text-[10px] text-gray-400 mb-1">{stat.label}</p>
            {/* Value — always same height, skeleton fades to number */}
            <div className="h-[18px] flex items-center">
              <motion.p
                key={`${cycle}-val-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 1 ? 1 : 0 }}
                transition={{ delay: i * 0.12, duration: 0.3 }}
                className="text-[15px] font-bold text-gray-900 leading-none"
              >
                {stat.value}
              </motion.p>
              {phase < 1 && (
                <div className="absolute h-4 w-10 rounded bg-gray-100 animate-pulse" />
              )}
            </div>
            {/* Delta — always same height */}
            <div className="h-[14px] mt-0.5 flex items-center">
              <motion.p
                key={`${cycle}-delta-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 3 ? 1 : 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className={`text-[10px] font-medium ${stat.color === "emerald" ? "text-emerald-600" : "text-gray-400"}`}
              >
                {stat.delta}
              </motion.p>
            </div>
          </div>
        ))}
      </div>

      {/* Sparkline chart — fixed pixel heights so bars animate correctly */}
      <div className="px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Weekly appointments</p>
        <div className="flex items-end gap-1.5" style={{ height: CHART_H }}>
          {barPx.map((px, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <motion.div
                key={`${cycle}-bar-${i}`}
                initial={{ height: 0 }}
                animate={{ height: phase >= 2 ? px : 0 }}
                transition={{ delay: phase >= 2 ? i * 0.06 : 0, duration: 0.4, ease: "easeOut" }}
                className={`w-full rounded-t-sm ${i === 6 ? "bg-emerald-600" : "bg-emerald-200"}`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
            <span key={d} className="text-[9px] text-gray-300 flex-1 text-center">{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Analytics Teaser ─── */
function AnalyticsTeaser() {
  return (
    <FeatureRow
      number="05"
      label="ANALYTICS"
      icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>}
      title="Know your numbers without digging."
      bullets={[
        { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Appointments, no-show rate, and WhatsApp metrics — updated in real time" },
        { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Weekly trends in a bar chart — no spreadsheet required" },
        { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Month-over-month deltas so you can see what's improving" },
      ]}
      visual={<AnalyticsDashboardAnim />}
      align="right"
      bg="white"
    />
  );
}

/* ─── Multi-Outlet Animation ─── */
function MultiOutletAnim() {
  const [visibleOutlets, setVisibleOutlets] = useState(0);
  const [showNotif, setShowNotif] = useState(false);
  const [flashIdx, setFlashIdx] = useState<number | null>(null);
  const [tampinesCount, setTampinesCount] = useState(3);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setVisibleOutlets(0);
    setShowNotif(false);
    setFlashIdx(null);
    setTampinesCount(3);

    const timers = [
      setTimeout(() => setVisibleOutlets(1), 400),
      setTimeout(() => setVisibleOutlets(2), 1200),
      setTimeout(() => setVisibleOutlets(3), 2000),
      setTimeout(() => setShowNotif(true), 3200),
      setTimeout(() => {
        setShowNotif(false);
        setFlashIdx(2);
        setTampinesCount(4);
      }, 4800),
      setTimeout(() => setFlashIdx(null), 5600),
      setTimeout(() => setCycle(c => c + 1), 7200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  const outlets = [
    { name: "Yishun Branch", slug: "yishun", count: 8 },
    { name: "Orchard Branch", slug: "orchard", count: 5 },
    { name: "Tampines Branch", slug: "tampines", count: tampinesCount },
  ];

  return (
    <div className="w-full max-w-sm relative" style={{ minHeight: 260 }}>
      {/* Outlet list */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Your outlets</p>
        {outlets.map((outlet, i) => (
          visibleOutlets > i ? (
            <motion.div
              key={`${cycle}-${outlet.name}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`rounded-xl border p-4 flex items-center gap-3 transition-colors duration-300 ${
                flashIdx === i
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-900">{outlet.name}</p>
                <p className="text-[10px] text-gray-400 truncate">dentaflow.com/book/{outlet.slug}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <motion.p
                  key={`${cycle}-count-${i}-${outlet.count}`}
                  initial={{ scale: flashIdx === i ? 1.2 : 1 }}
                  animate={{ scale: 1 }}
                  className={`text-[14px] font-bold ${flashIdx === i ? "text-emerald-600" : "text-gray-900"}`}
                >
                  {outlet.count}
                </motion.p>
                <p className="text-[10px] text-gray-400">today</p>
              </div>
            </motion.div>
          ) : (
            <div key={outlet.name} className="h-[68px] rounded-xl border border-dashed border-gray-150 bg-gray-50/50" />
          )
        ))}
      </div>

      {/* Floating notification */}
      <AnimatePresence>
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, x: 24, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute -right-2 sm:-right-2 right-0 top-16 bg-white rounded-xl border border-gray-100 shadow-xl p-3 w-52 z-10"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-emerald-700">WJ</div>
              <div>
                <p className="text-[11px] font-semibold text-gray-900 leading-tight">Wong Wei Jie booked</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Scaling · Tampines · 2:00 PM</p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              WhatsApp confirmation sent
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Multi-Outlet Section ─── */
function MultiOutletSection() {
  return (
    <FeatureRow
      number="06"
      label="MULTI-OUTLET"
      icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>}
      title="One dashboard. All your outlets."
      bullets={[
        { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Each outlet gets its own booking URL, treatment menu, and operating hours" },
        { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Shared patient records — a patient at Yishun is the same record at Orchard" },
        { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Today view filters by outlet with one tap — see any location at a glance" },
      ]}
      visual={<MultiOutletAnim />}
      align="left"
      bg="white"
    />
  );
}

/* ─── Landing Page ─── */
export function LandingPage() {
  // scrolled state removed — nav is always light
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav — always light */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo — scrolls to top */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-base text-gray-900">
              DentaFlow
            </span>
          </a>
          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
            <a href="/about" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#waitlist" className="hover:text-gray-900 transition-colors">Early Access</a>
          </div>
          <a href="#waitlist" className="hidden md:block">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm h-9 px-4 active:scale-[0.98]">
              Get early access
            </Button>
          </a>
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? (
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
        {/* Mobile menu */}
        {mobileNavOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
            {[
              { href: "#features", label: "Features" },
              { href: "#pricing", label: "Pricing" },
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "About" },
              { href: "#waitlist", label: "Early Access" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="block py-2.5 text-base text-gray-700 hover:text-emerald-700 transition-colors border-b border-gray-50 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a href="#waitlist" onClick={() => setMobileNavOpen(false)}>
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11 rounded-lg text-base font-semibold transition-all active:scale-[0.98]">
                  Get early access →
                </button>
              </a>
            </div>
          </div>
        )}
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
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs text-emerald-700 font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Now in early access · Singapore clinics
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6 text-gray-900">
              Stop managing<br />
              <span className="text-emerald-600">bookings on WhatsApp.</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
              DentaFlow gives Singapore dental clinics online booking, automated reminders, and recall campaigns — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#waitlist">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 rounded-lg text-base font-semibold active:scale-[0.98] transition-all duration-150">
                  Get early access →
                </button>
              </a>
              <a
                href="https://dentaflow-three.vercel.app/book/shuang-dentistry"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="h-12 px-8 rounded-lg text-base font-medium text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900 bg-white hover:bg-gray-50 transition-all duration-150">
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

          </motion.div>

          <div className="h-16" />
        </div>
      </section>

      {/* Social proof bar */}
      <section className="py-12 border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-3">
            {/* Avatar strip */}
            <div className="flex items-center">
              {[
                { initials: "SD", bg: "bg-emerald-600" },
                { initials: "SM", bg: "bg-emerald-500" },
                { initials: "TD", bg: "bg-emerald-700" },
                { initials: "TC", bg: "bg-emerald-400" },
                { initials: "AD", bg: "bg-emerald-800" },
              ].map((avatar, i) => (
                <motion.div
                  key={avatar.initials}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  viewport={{ once: true }}
                  className={`w-9 h-9 rounded-full ${avatar.bg} border-2 border-white flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0 ${i !== 0 ? "-ml-3" : ""}`}
                >
                  {avatar.initials}
                </motion.div>
              ))}
              <span className="ml-3 text-sm text-gray-600">+40 clinics on early access</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Trusted by Singapore dental clinics
            </p>
          </div>
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
                label: "Per day on manual WhatsApp confirmations",
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
                label: "of patients don't return after 12 months",
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
                <p className="text-5xl font-bold text-emerald-700 mb-2 leading-none">
                  {item.stat}
                </p>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  {item.label}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration section moved — now part of unified SetupSection after Pricing */}

      {/* Feature pillars — each row is its own full-width section */}
      <div id="features">
        <div className="text-center py-16 px-6 bg-gray-50 border-b border-gray-100">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything your clinic needs.<br />Nothing it doesn&apos;t.
            </h2>
          </motion.div>
        </div>

        <FeatureRow
          number="01"
          label="ONLINE BOOKING"
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>}
          title="Works with or without a website."
          description="Every clinic gets a hosted booking page, ready to share anywhere patients might find you."
          bullets={[
            { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Live booking link in under 5 minutes — no developer needed" },
            { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Each outlet gets its own URL — /book/yishun, /book/orchard" },
            { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Patients book in under 90 seconds, 24/7 — no calls, no back-and-forth" },
          ]}
          visual={
            <div className="w-full max-w-lg">
              <BookingAnimation />
              <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
                {["Google Business", "SGDentistry", "WhatsApp Bio", "Instagram", "Any website"].map((s) => (
                  <span key={s} className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-500 shadow-sm">{s}</span>
                ))}
              </div>
            </div>
          }
          align="right"
          bg="white"
        />

        <FeatureRow
          number="02"
          label="PATIENT RECORDS"
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>}
          title="Patient records. Real time, always updated."
          description="Every booking builds a profile automatically — full history in one place, not scattered across chats and spreadsheets."
          bullets={[
            { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Profiles built automatically from every booking — zero manual entry" },
            { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Import from Dental4Windows or any CSV — migration handled for you" },
            { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Full history: visits, treatments, WhatsApp status, recall schedule" },
          ]}
          visual={<PatientAnimation />}
          align="left"
          bg="white"
        />

        <FeatureRow
          number="03"
          label="WHATSAPP AUTOMATION"
          icon={<svg viewBox="0 0 24 24" fill="#25D366" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>}
          title="WhatsApp automations built in. Zero setup."
          description="The moment a patient books, a confirmation goes out. Your receptionist sends zero manual messages."
          bullets={[
            { icon: <svg viewBox="0 0 24 24" fill="#25D366" className="w-4 h-4 flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>, text: "Booking confirmation sent instantly — before the patient closes the tab" },
            { icon: <svg viewBox="0 0 24 24" fill="#25D366" className="w-4 h-4 flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>, text: "24-hour and 2-hour reminders fire automatically — no staff involvement" },
            { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-400"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "No-shows drop by up to 65% — clinics report this within the first month" },
          ]}
          visual={<MessagingAnimation />}
          align="right"
          bg="white"
        />

        <FeatureRow
          number="04"
          label="RECALL CAMPAIGNS"
          icon={<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-600"><path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/></svg>}
          title="Patients who haven&apos;t returned in 6 months are revenue waiting."
          description="DentaFlow surfaces every overdue patient and queues their recall message automatically."
          bullets={[
            { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "DentaFlow flags every patient overdue for their 6-month check-up — automatically" },
            { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "One click to queue their recall message — no list-building, no manual outreach" },
            { icon: <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>, text: "Chairs fill from patients who already trust you — highest conversion rate of any channel" },
          ]}
          visual={<RecallAnimation />}
          align="left"
          bg="white"
        />
      </div>

      {/* Analytics teaser */}
      <AnalyticsTeaser />

      {/* Multi-outlet callout */}
      <MultiOutletSection />

      {/* Mid-page CTA band */}
      <section className="py-16 px-6 bg-emerald-600">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white text-xl font-semibold">Seamless bookings. Automatic reminders. Patients that keep coming back.</p>
            <p className="text-emerald-100 text-sm mt-1">Starter plan is free. No credit card, no commitment.</p>
          </div>
          <a href="#waitlist">
            <button className="flex-shrink-0 bg-white hover:bg-gray-50 text-emerald-700 font-semibold px-8 h-12 rounded-lg text-base active:scale-[0.98] transition-all duration-150 whitespace-nowrap">
              Start for free →
            </button>
          </a>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24 px-6 bg-gray-50">
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
            className="rounded-2xl border border-gray-200 bg-white overflow-x-auto shadow-sm"
          >
            {/* Table header */}
            <div className="grid grid-cols-3 min-w-[520px]">
              <div className="px-6 py-5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                Capability
              </div>
              <div className="px-6 py-5 text-center border-b border-gray-100 border-l border-gray-100">
                <span className="text-[13px] font-semibold text-gray-400">WhatsApp + Phone</span>
              </div>
              <div className="px-6 py-5 text-center border-b border-gray-100 border-l border-emerald-200 bg-emerald-50/60">
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
                className="grid grid-cols-3 min-w-[520px] border-b border-gray-100 last:border-0 group"
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
                <div className="px-6 py-4 text-center border-l border-emerald-100 bg-emerald-50/40 flex items-center justify-center">
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
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 text-base active:scale-[0.98] rounded-lg font-semibold transition-all duration-150">
                Get early access →
              </button>
            </a>
            <p className="text-xs text-gray-400 mt-3">No commitment. No credit card. Singapore-based support.</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* Setup section — How it works + Integration unified */}
      <SetupSection />

      {/* Numbers section */}
      <section className="py-24 bg-emerald-600 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-12">
            Clinics using DentaFlow report:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                ticker: <NumberTicker value={65} prefix="↓ " suffix="%" className="text-4xl font-bold text-white" />,
                label: "Reduction in no-shows",
              },
              {
                ticker: <NumberTicker value={45} suffix=" min" className="text-4xl font-bold text-white" />,
                label: "Saved per day on confirmations",
              },
              {
                ticker: <NumberTicker value={800} prefix="$" suffix="+" className="text-4xl font-bold text-white" />,
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
                {item.ticker}
                <p className="mt-2 text-emerald-100 text-sm">
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
      <section id="waitlist" className="py-24 px-6 bg-gray-50">
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Emerald accent top bar */}
            <div className="h-1 bg-emerald-600" />
            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Built in Singapore. Open worldwide.
              </h2>
              <p className="mt-4 text-gray-500 text-base">
                Leave your details and we&apos;ll be in touch within 3–5 business days to get you set up.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="text-sm font-semibold text-gray-700">DentaFlow</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href="/about" className="hover:text-gray-600 transition-colors">About</a>
            <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <a href="https://sgdentistry.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">SGDentistry</a>
            <a href="#waitlist" className="hover:text-gray-600 transition-colors">Early Access</a>
            <a href="https://dentaflow-three.vercel.app/sign-in" className="hover:text-gray-600 transition-colors">Clinic login →</a>
          </div>
          <p className="text-[11px] text-gray-400">© 2026 DentaFlow · Built in Singapore</p>
        </div>
      </footer>
    </div>
  );
}

/* ─── Pricing Section ─── */
function PricingSection() {
  const [outlets, setOutlets] = useState(1);
  const [yearly, setYearly] = useState(false);

  const coreMonthly = 120;
  const proMonthly = 480;
  const coreYearlyPerMonth = 100; // $1200/year = $100/month
  const proYearlyPerMonth = 400;  // $4800/year = $400/month

  const corePrice = yearly ? coreYearlyPerMonth * outlets : coreMonthly * outlets;
  const proPrice = yearly ? proYearlyPerMonth * outlets : proMonthly * outlets;
  const coreBilling = yearly ? "/ month, billed annually" : "/ month";
  const proBilling = yearly ? "/ month, billed annually" : "/ month";

  const plans = [
    {
      name: "Starter",
      tagline: "Get started with online booking",
      price: "Free",
      priceNote: "forever",
      description: "For solo dentists testing online booking.",
      features: [
        { label: "Booking widget (website embed)", included: true },
        { label: "Hosted booking page", included: true },
        { label: "Patient dashboard", included: true },
        { label: "Appointment management", included: true },
        { label: "Patient CSV import", included: true },
        { label: "Up to 2 active outlets", included: true },
        { label: "WhatsApp automation", included: false },
        { label: "Automated reminders", included: false },
        { label: "Recall campaigns", included: false },
        { label: "Custom booking URL slug", included: false },
      ],
      cta: "Start free",
      ctaHref: "#waitlist",
      highlight: false,
      order: "order-2 md:order-1",
    },
    {
      name: "Core",
      tagline: "Full automation for growing clinics",
      price: `$${corePrice}`,
      priceNote: coreBilling,
      description: "Everything in Starter, plus WhatsApp automation and recall.",
      features: [
        { label: "Booking widget (website embed)", included: true },
        { label: "Hosted booking page", included: true },
        { label: "Patient dashboard", included: true },
        { label: "Appointment management", included: true },
        { label: "Patient CSV import", included: true },
        { label: "Unlimited active outlets", included: true },
        { label: "WhatsApp automation", included: true, note: "Confirmations, reminders, recalls" },
        { label: "Automated 24h + 2h reminders", included: true },
        { label: "6-month recall queue", included: true },
        { label: "Custom booking URL slug", included: true },
      ],
      cta: "Get early access",
      ctaHref: "#waitlist",
      highlight: true,
      order: "order-1 md:order-2",
    },
    {
      name: "Pro",
      tagline: "Marketing automation for high-volume clinics",
      price: `$${proPrice}`,
      priceNote: proBilling,
      description: "Everything in Core, plus branding and campaign tools.",
      features: [
        { label: "Everything in Core", included: true },
        { label: "Unlimited active outlets", included: true },
        { label: "Custom brand colour on widget", included: true },
        { label: "WhatsApp marketing campaigns", included: true, note: "Send promos to opted-in patients" },
        { label: "Patient segmentation by treatment", included: true },
        { label: "Dedicated WhatsApp Business number", included: true },
        { label: "Analytics by outlet", included: true },
        { label: "Priority support + onboarding call", included: true },
      ],
      cta: "Talk to us",
      ctaHref: "#waitlist",
      highlight: false,
      order: "order-3 md:order-3",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 mb-3">Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simple pricing. No surprises.</h2>
          <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto">
            Start free. Upgrade when you&apos;re ready. No setup fees, no contracts, no per-booking charges.
          </p>
        </motion.div>

        {/* Controls: outlet selector + billing toggle — stacked, fixed-width to prevent layout shift */}
        <div className="flex flex-col items-center gap-3 mb-10">
          {/* Outlet selector */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3">
            <span className="text-sm text-gray-600 font-medium">Outlets:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOutlets(Math.max(1, outlets - 1))}
                className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-colors"
              >−</button>
              <span className="w-8 text-center font-bold text-gray-900 text-lg tabular-nums">{outlets}</span>
              <button
                onClick={() => setOutlets(Math.min(20, outlets + 1))}
                className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-colors"
              >+</button>
            </div>
            <span className="w-16 text-xs text-gray-400">{outlets === 1 ? "location" : "locations"}</span>
          </div>

          {/* Billing toggle — no container, own row, badge always rendered to prevent layout shift */}
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium transition-colors ${!yearly ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-10 h-5 rounded-full transition-colors ${yearly ? "bg-emerald-600" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${yearly ? "translate-x-5" : "translate-x-0"}`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${yearly ? "text-gray-900" : "text-gray-400"}`}>Annual</span>
            {/* Always rendered — invisible when monthly to prevent layout shift */}
            <span className={`inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 transition-opacity ${yearly ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              2 months free
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-6 relative ${plan.order} ${
                plan.highlight
                  ? "border-emerald-500 bg-emerald-50/40 shadow-lg shadow-emerald-100"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-0.5 text-[11px] font-semibold text-white">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-500 mb-0.5">{plan.name}</p>
                <p className="text-[11px] text-gray-400 mb-3">{plan.tagline}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold text-gray-900 tabular-nums">{plan.price}</span>
                  {plan.priceNote && <span className="text-xs text-gray-400 leading-tight w-20 shrink-0">{plan.priceNote}</span>}
                </div>
                {/* Always rendered to prevent card height shift — invisible for Starter or 1 outlet */}
                <p className={`text-[11px] text-gray-400 mt-1 ${plan.name !== "Starter" && outlets > 1 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                  ${plan.name === "Core" ? (yearly ? coreYearlyPerMonth : coreMonthly) : plan.name === "Pro" ? (yearly ? proYearlyPerMonth : proMonthly) : 0} × {outlets} outlets
                </p>
                <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2.5">
                    {f.included ? (
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" viewBox="0 0 14 11" fill="none">
                        <path d="M1 5.5l4 4L13 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                    <span className={`text-sm leading-snug ${f.included ? "text-gray-600" : "text-gray-400"}`}>
                      {f.label}
                      {f.note && <span className="text-xs text-gray-400 ml-1">— {f.note}</span>}
                    </span>
                  </li>
                ))}
              </ul>

              <a href={plan.ctaHref} className="block">
                <button className={`w-full h-10 rounded-lg text-sm font-semibold transition-all active:scale-[0.98] ${
                  plan.highlight
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                }`}>
                  {plan.cta} →
                </button>
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Pricing is per outlet per month. All plans include: PDPA-compliant data storage · Singapore-based servers · Cancel anytime
        </p>
      </div>
    </section>
  );
}

/* ─── Unified Setup Section — How it works + Integration ─── */
function SetupSection() {
  const steps = [
    {
      time: "2 min",
      title: "Set up your clinic",
      description: "Enter your clinic name, add your outlets, and select which treatments patients can book online. Your profile is ready.",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-600">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      ),
    },
    {
      time: "1 min",
      title: "Share your booking link",
      description: "Paste one line of code on your site — or skip the website. Your DentaFlow link works everywhere: WhatsApp bio, Google Business, Instagram.",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-600">
          <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"/>
        </svg>
      ),
    },
    {
      time: "Ongoing",
      title: "Manage everything from one place.",
      description: "Patients book, reminders send, recalls queue — and you stay on top of it all from one clean dashboard. No more chasing confirmations across 14 WhatsApp chats.",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-emerald-600">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </svg>
      ),
    },
  ];

  const platforms = [
    { name: "WordPress", logo: "/icons/wordpress.svg" },
    { name: "Wix", logo: "/icons/wix.svg" },
    { name: "Squarespace", logo: "/icons/squarespace.svg" },
    { name: "Webflow", logo: "/icons/webflow.svg" },
  ];

  const embedOptions = [
    {
      label: "No website",
      description: "Hosted booking page included. Share the link anywhere.",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 17.93V18c0-.55-.45-1-1-1H6v-2c0-1.1.9-2 2-2h1c1.1 0 2-.9 2-2v-1H8c-.55 0-1-.45-1-1v-2.07C9.06 6.35 11.03 5.5 12 5.5c2.49 0 4.5 2.01 4.5 4.5 0 .69-.16 1.35-.43 1.93H14c-1.1 0-2 .9-2 2v.5c0 1.1.9 2 2 2h1.93A7.98 7.98 0 0 1 11 19.93z"/></svg>,
    },
    {
      label: "Any website",
      description: "One script tag. Works on any platform.",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>,
    },
    {
      label: "WordPress / Wix",
      description: "Drop the inline form in with a single HTML block.",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.542c1.473 0 2.852.398 4.037 1.087L4.629 16.037A8.434 8.434 0 0 1 3.542 12c0-4.666 3.792-8.458 8.458-8.458zm0 16.916a8.414 8.414 0 0 1-4.037-1.087l11.408-11.408A8.414 8.414 0 0 1 20.458 12c0 4.666-3.792 8.458-8.458 8.458z"/></svg>,
    },
    {
      label: "Existing button",
      description: "Attach the booking popup to any button on your site.",
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600"><path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"/></svg>,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 mb-3">Get started</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            From zero to live in under 10 minutes.
          </h2>
          <p className="mt-4 text-base text-gray-500 max-w-xl mx-auto">
            No IT team. No training week. No migration project. Most clinics are live before lunch.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mb-16">
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-px bg-emerald-100" />
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-6 relative w-16 h-16">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center relative z-10">
                    {step.icon}
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center z-20">
                    {i + 1}
                  </span>
                </div>
                <span className="inline-block mb-3 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-0.5">
                  {step.time}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[260px] mx-auto">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider between steps and embed options */}
        <div className="border-t border-gray-200 mb-14" />

        {/* Embed / integration options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Flexible setup</p>
            <h3 className="text-2xl font-bold text-gray-900">One line of code. Works everywhere.</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              Add a booking button to your existing site in 2 minutes — or share your DentaFlow link directly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {embedOptions.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="mb-2.5">{item.icon}</div>
                <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.label}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Platform logos */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mr-2">Works with</span>
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.logo} alt={p.name} className="w-4 h-4 opacity-50" />
                <span className="text-[11px] text-gray-500 font-medium">{p.name}</span>
              </motion.div>
            ))}
            <span className="text-[11px] text-gray-400 ml-1">+ any HTML site</span>
          </div>
        </motion.div>

        {/* CTA at the bottom of the unified section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a href="#waitlist">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 h-12 text-base active:scale-[0.98] rounded-lg font-semibold transition-all duration-150">
              Get early access →
            </button>
          </a>
          <p className="text-sm text-gray-400 mt-3">No credit card. No commitment.</p>
        </motion.div>

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
      q: "What happens to my existing patients?",
      a: "You can import your full patient list before you go live. DentaFlow accepts CSV exports from Dental4Windows and any spreadsheet with Name and Mobile columns. Once imported, recall reminders activate automatically for patients with a past visit date \u2014 so your existing base is working for you from day one.",
    },
    {
      q: "Do I need a website to use DentaFlow?",
      a: "No. Every clinic gets a hosted booking page at dentaflow.com/book/your-clinic. You can share this link directly in your WhatsApp bio, Google My Business listing, Instagram profile, or anywhere else. If you do have a website, we have a one-line embed that drops a floating booking button on every page.",
    },
    {
      q: "How does WhatsApp automation work?",
      a: "DentaFlow uses a dedicated clinic number via WhatsApp Business API — separate from your personal or existing clinic WhatsApp. Automated confirmations and reminders are sent from this number, and patients can reply directly. You see all conversations in the DentaFlow inbox. WhatsApp automation is launching in the next update — you can configure it now and it activates automatically when it goes live.",
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
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Support</p>
          <h2 className="text-3xl font-bold text-gray-900">Frequently asked questions</h2>
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
                <span className="text-sm font-medium text-gray-900 pr-4">{faq.q}</span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`}>
                  <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {openIdx === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.2 }}
                  className="px-5 pb-4"
                >
                  <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-3">{faq.a}</p>
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
          <p className="text-sm text-gray-500">Still have questions?</p>
          <a href="mailto:hello@dentaflow.com" className="text-sm text-emerald-600 hover:underline mt-1 inline-block">
            hello@dentaflow.com →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
