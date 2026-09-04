import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HeartPulse, PiggyBank, TrendingUp, AlertCircle } from "lucide-react";
import { ProgressBar } from "@/components/Charts";
import { categories, goals, inr, summary } from "@/lib/mock-data";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "Financial health score — Budgetly" },
      {
        name: "description",
        content: "Your overall money health: savings rate, budget adherence, and goal progress.",
      },
      { property: "og:title", content: "Financial health score — Budgetly" },
      {
        property: "og:description",
        content: "See how healthy your finances are and what to improve next.",
      },
    ],
  }),
  component: Health,
});

function Health() {
  const savingsRate =
    summary.income > 0 ? Math.round(((summary.income - summary.spent) / summary.income) * 100) : 0;
  const budgetAdherence = Math.max(
    0,
    Math.round(((summary.budget - summary.spent) / summary.budget) * 100),
  );
  const goalProgress =
    Math.round(goals.reduce((s, g) => s + g.saved / g.target, 0) / goals.length) || 0;
  const score = Math.round(savingsRate * 0.4 + budgetAdherence * 0.35 + goalProgress * 0.25);

  const getStatus = () => {
    if (score >= 75) return { label: "Strong", color: "text-success" };
    if (score >= 50) return { label: "Moderate", color: "text-accent" };
    return { label: "Needs attention", color: "text-destructive" };
  };

  const status = getStatus();

  return (
    <AppShell title="Financial health">
      <div className="animate-fade-up">
        <h1 className="text-4xl font-extrabold">Financial health score</h1>
        <p className="mt-2 text-muted-foreground">
          A simple view of how your money habits are stacking up.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="surface p-6 md:col-span-1">
            <div className="flex flex-col items-center">
              <span className={`text-5xl font-extrabold ${status.color}`}>{score}</span>
              <span className="mt-2 text-sm font-medium text-muted-foreground">{status.label}</span>
              <div className="mt-6 w-full">
                <ProgressBar className="mt-2" value={score} delay={0} />
              </div>
            </div>
          </div>
          <div className="surface p-6 md:col-span-2">
            <h2 className="text-xl font-bold">Score breakdown</h2>
            <div className="mt-6 grid gap-6">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Savings rate</span>
                  <span className="tabular text-muted-foreground">{savingsRate}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="animate-grow h-full origin-left rounded-full bg-accent"
                    style={{ width: `${savingsRate}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Weight: 40% · Based on income vs spent this month
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Budget adherence</span>
                  <span className="tabular text-muted-foreground">{budgetAdherence}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="animate-grow h-full origin-left rounded-full bg-accent"
                    style={{ width: `${budgetAdherence}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Weight: 35% · How closely you stay within budget
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Goal progress</span>
                  <span className="tabular text-muted-foreground">{goalProgress}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="animate-grow h-full origin-left rounded-full bg-accent"
                    style={{ width: `${goalProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Weight: 25% · Average completion across goals
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 surface p-8">
          <h2 className="text-2xl font-bold">Recommendations</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <PiggyBank className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Increase emergency buffer</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Aim for 3-6 months of expenses in liquid savings.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <TrendingUp className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Automate one contribution</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Set up a small auto-transfer to a goal this week.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <AlertCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Review subscriptions</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Cancel or pause unused services to free up cash.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
