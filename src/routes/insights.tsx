import { createFileRoute } from "@tanstack/react-router";
import { Activity, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { FlowChart, ProgressBar } from "@/components/Charts";
import { categories, inr, insights } from "@/lib/mock-data";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Budgetly" },
      {
        name: "description",
        content:
          "Personalised spending insights, category trends and habits worth changing this month.",
      },
      { property: "og:title", content: "Insights — Budgetly" },
      {
        property: "og:description",
        content: "Understand spending patterns and where to save next.",
      },
    ],
  }),
  component: Insights,
});

const toneIcon = { positive: TrendingDown, warning: TrendingUp, neutral: AlertCircle };

function Insights() {
  return (
    <AppShell title="Insights">
      <div className="animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold">
          <Activity className="h-3.5 w-3.5" /> UPDATED TODAY
        </span>
        <h1 className="mt-4 text-4xl font-extrabold">Make your money work</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Patterns we noticed in your September activity, ranked by how much they could save you.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {insights.map((n, i) => {
          const Icon = toneIcon[n.tone];
          return (
            <div
              key={n.title}
              className={`hover-lift animate-fade-up p-7 ${i === 0 ? "ink-panel" : "surface"}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  i === 0 ? "bg-ink-foreground/10" : "bg-secondary text-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-lg font-semibold">{n.title}</h2>
              <p
                className={`mt-2 text-sm ${i === 0 ? "text-ink-foreground/75" : "text-muted-foreground"}`}
              >
                {n.body}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <div className="surface animate-fade-up p-7">
          <h2 className="text-xl font-bold">Cash flow rhythm</h2>
          <p className="text-sm text-muted-foreground">Income vs spending, last six months</p>
          <div className="mt-6">
            <FlowChart />
          </div>
        </div>

        <div className="surface animate-fade-up p-7">
          <h2 className="text-xl font-bold">Where the money leaks</h2>
          <p className="text-sm text-muted-foreground">Share of total spend by category</p>
          <div className="mt-6 space-y-6">
            {categories.map((c, i) => (
              <div key={c.name}>
                <div className="flex justify-between text-sm font-medium">
                  <span>{c.name}</span>
                  <span className="tabular text-muted-foreground">
                    {inr(c.amount)} · {c.pct}%
                  </span>
                </div>
                <ProgressBar className="mt-3" value={c.pct * 2.6} delay={i * 110} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
