import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { blogPosts } from "@/lib/mock-data";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Blog — Budgetly" },
      { name: "description", content: "Read our latest personal finance insights and guides." },
      { property: "og:title", content: "Blog — Budgetly" },
      { property: "og:description", content: "Personal finance insights from the Budgetly team." },
    ],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-w-0">
        <SiteHeader />
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h1 className="text-4xl font-extrabold">Post not found</h1>
          <p className="mt-2 text-muted-foreground">The article you are looking for does not exist.</p>
          <Link to="/blog" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-16">
        <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        <article className="animate-fade-up">
          <h1 className="text-4xl font-extrabold">{post.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.read}
            </span>
          </div>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{post.content}</p>

          <div className="mt-10 surface p-8">
            <h2 className="text-xl font-bold">Key takeaways</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Start small and build consistency over time.</li>
              <li>Track real behavior before setting rigid goals.</li>
              <li>Automate wherever possible to reduce decision fatigue.</li>
            </ul>
          </div>

          <div className="mt-8">
            <Link to="/blog" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary">
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
          </div>
        </article>
      </div>
      <SiteFooter />
    </div>
  );
}
