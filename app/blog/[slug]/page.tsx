import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — DentaFlow Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const contentHtml = markdownToHtml(post.content);

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

      {/* Article */}
      <article className="pt-28 pb-20 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-[12px] text-gray-400">
            <Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link>
            <span>›</span>
            <span className="text-gray-500">{post.category}</span>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
              {post.category}
            </span>
            <span className="text-[12px] text-gray-400">
              {new Date(post.date).toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" })} · {post.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-[16px] text-gray-500 leading-relaxed border-l-4 border-emerald-200 pl-4 mb-10">
            {post.excerpt}
          </p>

          {/* Content */}
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* End CTA */}
          <div className="mt-14 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <p className="text-[15px] font-semibold text-gray-900 mb-2">Ready to automate your clinic?</p>
            <p className="text-[13px] text-gray-500 mb-4">Join Singapore clinics on the DentaFlow early access list.</p>
            <Link href="/#waitlist">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 h-10 rounded-lg text-[13px] font-semibold active:scale-[0.98] transition-all">
                Request early access →
              </button>
            </Link>
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link href="/blog" className="text-[13px] text-emerald-600 hover:text-emerald-700 font-medium">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100 px-6">
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
