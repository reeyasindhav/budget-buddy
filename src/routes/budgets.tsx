import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { FlowChart, ProgressBar } from "@/components/Charts";
import { categories, inr, summary } from "@/lib/mock-data";

export const Route = createFileRoute("/budgets")({
  head: () => ({
    meta: [
      { title: "Budgets — Budgetly" },
      { name: "description", content: "Set category budgets, watch progress bars fill and compare six months of income against spending." },
      { property: "og:title", content: "Budgets — Budgetly" },
      { property: "og:description", content: "Category budgets and monthly cash-flow trends." },
    ],
  }),
  component: Budgets,
});

function Budgets() {
  const [limit, setLimit] = useState(summary.budget);
  const used = Math.round((summary.spent / limit) * 100);

  return (
    <AppShell title="Budgets">
      <div className="animate-fade-up">
        <h1 className="text-4xl font-extrabold">Budgets</h1>
        <p className="mt-2 text-muted-foreground">
          Give every category a ceiling — Budgetly warns you before you touch it.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <div className="ink-panel animate-fade-up p-7">
          <p className="text-sm text-ink-foreground/70">Monthly spending limit</p>
          <p className="tabular mt-2 text-4xl font-bold">{inr(limit)}</p>
          <input
            type="range"
            min={50000}
            max={150000}
            step={5000}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="mt-6 w-full accent-[oklch(0.78_0.13_220)]"
          />
          <div className="mt-6 flex justify-between text-sm">
            <span>{used}% used</span>
            <span>{inr(Math.max(limit - summary.spent, 0))} left</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-foreground/15">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${Math.min(used, 100)}%` }}
            />
          </div>
        </div>

        <div className="surface animate-fade-up p-7" style={{ animationDelay: "90ms" }}>
          <h2 className="text-xl font-bold">Income vs spending</h2>
          <p className="text-sm text-muted-foreground">Last six months</p>
          <div className="mt-6">
            <FlowChart />
          </div>
          <div className="mt-4 flex gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent/70" /> Income
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Spent
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {categories.map((c, i) => {
          const pct = Math.round((c.amount / c.budget) * 100);
          const over = pct > 90;
          return (
            <div
              key={c.name}
              className="surface hover-lift animate-fade-up p-6"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} />
                <p className="flex-1 font-semibold">{c.name}</p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    over ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {over ? "Near limit" : "On track"}
                </span>
              </div>
              <p className="tabular mt-5 text-2xl font-bold">{inr(c.amount)}</p>
              <p className="text-xs text-muted-foreground">of {inr(c.budget)} budgeted</p>
              <ProgressBar
                className="mt-4"
                value={pct}
                delay={i * 100}
                tone={over ? "destructive" : "accent"}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {pct}% used · {inr(c.budget - c.amount)} remaining
              </p>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
