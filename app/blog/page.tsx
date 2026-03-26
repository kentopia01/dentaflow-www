import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — DentaFlow",
  description: "Practice management insights, growth strategies, and guides for Singapore dental clinics.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-[15px] text-gray-900">DentaFlow</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-500">
            <Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/blog" className="text-emerald-700 font-medium">Blog</Link>
            <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
          </div>
          <Link href="/#waitlist">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] h-9 px-4 rounded-lg font-semibold active:scale-[0.98] transition-all">
              Request early access
            </button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 pb-12 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 mb-3">Resources</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">The DentaFlow Blog</h1>
          <p className="mt-3 text-[16px] text-gray-500 max-w-xl">
            Practice management guides, growth strategies, and insights for Singapore dental clinics.
          </p>
        </div>
      </section>

      {/* Post list */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-[15px]">No posts yet.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {posts.map((post) => (
                <article key={post.slug} className="py-8 group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                      {post.category}
                    </span>
                    <span className="text-[12px] text-gray-400">
                      {new Date(post.date).toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" })} · {post.readingTime} min read
                    </span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-[14px] text-gray-500 leading-relaxed max-w-2xl">{post.excerpt}</p>
                  </Link>
                  <Link href={`/blog/${post.slug}`} className="inline-block mt-3 text-[13px] font-medium text-emerald-600 hover:text-emerald-700">
                    Read article →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100 px-6 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">D</span>
            </div>
            <span className="text-[13px] font-semibold text-gray-700">DentaFlow</span>
          </Link>
          <div className="flex items-center gap-6 text-[12px] text-gray-400">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <Link href="/blog" className="hover:text-gray-600">Blog</Link>
            <Link href="/about" className="hover:text-gray-600">About</Link>
          </div>
          <p className="text-[11px] text-gray-400">© 2026 DentaFlow · Built for Singapore</p>
        </div>
      </footer>
    </div>
  );
}
