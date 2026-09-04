import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { blogPosts } from "@/lib/mock-data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Budgetly" },
      {
        name: "description",
        content: "Guides, tips, and stories to help you build better money habits.",
      },
      { property: "og:title", content: "Blog — Budgetly" },
      { property: "og:description", content: "Personal finance insights from the Budgetly team." },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <div className="min-w-0">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="text-4xl font-extrabold">Blog</h1>
        <p className="mt-2 text-muted-foreground">Guides, tips, and stories to help you build better money habits.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="surface hover-lift animate-fade-up p-6"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {post.read}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-bold">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                Read more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
