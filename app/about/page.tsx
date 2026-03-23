import Link from "next/link";

export const metadata = {
  title: "About — DentaFlow",
  description: "Why we built DentaFlow, and how SGDentistry is part of the ecosystem.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav — reuse same nav pattern */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-gray-900 text-[15px]">DentaFlow</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-600">
            <Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/#how-it-works" className="hover:text-gray-900 transition-colors">How it works</Link>
            <Link href="/about" className="text-emerald-700 font-medium">About</Link>
            <Link href="/#waitlist" className="hover:text-gray-900 transition-colors">Early Access</Link>
          </div>
          <Link href="/#waitlist">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] h-9 px-4 rounded-lg font-semibold active:scale-[0.98] transition-all">
              Request early access
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-medium text-emerald-700 mb-6">
            Our story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Built by people who know<br />
            <span className="text-emerald-600">Singapore dental.</span>
          </h1>
          <p className="text-[17px] text-gray-500 leading-relaxed">
            DentaFlow was born out of a simple observation: Singapore&apos;s dental clinics are run by excellent clinicians who are being held back by terrible tools. WhatsApp groups, Excel sheets, and phone tag — that&apos;s the operational reality for most practices in 2026.
          </p>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 mb-4">Our mission</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Give every Singapore dental clinic the operational backbone of a large group — at solo-practice price.
              </h2>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                A 3-outlet group in Orchard can afford dedicated practice management software, a full-time receptionist, and a marketing team. A solo dentist in Yishun can&apos;t. DentaFlow levels that playing field.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Patient booking", text: "Online, 24/7, without a receptionist on call." },
                { label: "WhatsApp automation", text: "Confirmations and reminders sent automatically — not typed manually." },
                { label: "Recall management", text: "Dormant patients reactivated without manual outreach." },
                { label: "Patient intelligence", text: "Every patient builds a profile with every visit." },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-[12px] font-semibold text-emerald-700 mb-1">{item.label}</p>
                  <p className="text-[14px] text-gray-500">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SGDentistry ecosystem section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-4">Part of a bigger ecosystem</p>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                SGDentistry × DentaFlow
              </h2>
              <p className="text-[15px] text-gray-500 leading-relaxed mb-4">
                DentaFlow is built by the same team behind <a href="https://sgdentistry.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">SGDentistry</a> — Singapore&apos;s dental directory and information platform used by thousands of patients monthly to find, research, and compare dental clinics.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed mb-4">
                SGDentistry gives us a unique position: we understand both sides of the transaction. We know what patients search for before they book. We know which clinics patients choose — and why they don&apos;t choose others. That research goes directly into how DentaFlow is built.
              </p>
              <p className="text-[15px] text-gray-500 leading-relaxed">
                Clinics on DentaFlow will get an enhanced SGDentistry listing with a direct online booking integration — connecting them to patients already searching for dental services in Singapore.
              </p>
            </div>
            <div className="md:w-64 flex-shrink-0">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SG</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-gray-900">SGDentistry</p>
                    <p className="text-[12px] text-gray-500">Singapore dental directory</p>
                  </div>
                </div>
                <div className="space-y-2 text-[13px] text-gray-500 mb-4">
                  <p>✓ Clinic listings & reviews</p>
                  <p>✓ Dental condition guides</p>
                  <p>✓ Treatment cost guides</p>
                  <p>✓ CHAS & Medisave info</p>
                  <p>✓ Direct booking integration</p>
                </div>
                <a
                  href="https://sgdentistry.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-emerald-600 hover:underline font-medium"
                >
                  Visit SGDentistry →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why we built this — personal note */}
      <section className="py-16 px-6 bg-emerald-600">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-emerald-100 text-[13px] uppercase tracking-wider font-semibold mb-4">Why this matters</p>
          <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
            &ldquo;Singapore has world-class dental training and genuinely skilled clinicians. They shouldn&apos;t be spending their day typing appointment confirmations on a phone. We built DentaFlow so they don&apos;t have to.&rdquo;
          </p>
          <p className="text-emerald-200 text-[14px] mt-6">The DentaFlow team</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to join the early access cohort?</h2>
          <p className="text-[15px] text-gray-500 mb-8">
            We&apos;re onboarding Singapore clinics in small batches so we can provide hands-on support for each one.
          </p>
          <Link href="/#waitlist">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 h-12 rounded-lg text-[15px] font-semibold active:scale-[0.98] transition-all duration-150">
              Request early access →
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="text-[13px] font-semibold text-gray-700">DentaFlow</span>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-gray-400">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <a href="https://sgdentistry.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">SGDentistry</a>
            <Link href="/#waitlist" className="hover:text-gray-600 transition-colors">Early Access</Link>
          </div>
          <p className="text-[11px] text-gray-400">© 2026 DentaFlow · Built for Singapore</p>
        </div>
      </footer>
    </div>
  );
}
