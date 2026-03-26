import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SiteNav } from "@/components/landing/SiteNav";
import { SiteFooter } from "@/components/landing/SiteFooter";

export const metadata = {
  title: "Blog — DentaFlow",
  description: "Practice management insights, growth strategies, and guides for Singapore dental clinics.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <SiteNav activePage="blog" />

      {/* Header */}
      <section className="pt-28 pb-12 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 mb-3">Resources</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">The DentaFlow Blog</h1>
          <p className="text-base text-gray-500 max-w-xl">
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

      <SiteFooter />
    </div>
  );
}
