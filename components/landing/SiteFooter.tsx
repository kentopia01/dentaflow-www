import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="py-10 border-t border-gray-100 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">D</span>
          </div>
          <span className="text-[13px] font-semibold text-gray-700">DentaFlow</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-[12px] text-gray-400">
          <Link href="/about" className="hover:text-gray-600 transition-colors">About</Link>
          <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
          <a href="https://sgdentistry.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">SGDentistry</a>
          <Link href="/#waitlist" className="hover:text-gray-600 transition-colors">Early Access</Link>
        </div>

        {/* Copyright */}
        <p className="text-[11px] text-gray-400">© 2026 DentaFlow · Built for Singapore</p>
      </div>
    </footer>
  );
}
