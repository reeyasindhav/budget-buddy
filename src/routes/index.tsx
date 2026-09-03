import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PieChart, Target, Wallet, LineChart, Bell, ShieldCheck } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { DonutChart, ProgressBar } from "@/components/Charts";
import { categories, inr, summary } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Budgetly — Personal Finance & Budget Tracker" },
      {
        name: "description",
        content:
          "Budgetly consolidates income and expenses, visualises spending by category and turns savings targets into progress you can see.",
      },
      { property: "og:title", content: "Budgetly — Personal Finance & Budget Tracker" },
      {
        property: "og:description",
        content: "Track cash flow, budgets and savings goals in one clean, minimal dashboard.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: PieChart,
    title: "Category clarity",
    body: "A live donut of where every rupee goes, refreshed as transactions land.",
  },
  {
    icon: Wallet,
    title: "One cash-flow view",
    body: "Bank, card and cash balances consolidated into a single running number.",
  },
  {
    icon: Target,
    title: "Goals with dates",
    body: "Set a target, see the month you'll reach it based on your real pace.",
  },
  {
    icon: LineChart,
    title: "Monthly trends",
    body: "Six-month income vs spend comparison so patterns surface early.",
  },
  {
    icon: Bell,
    title: "Gentle nudges",
    body: "Alerts before a category tips over budget, not after the damage.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body: "Read-only connections and encryption on everything you sync.",
  },
];

function Landing() {
  const used = Math.round((summary.spent / summary.budget) * 100);
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="animate-float absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground">
              PERSONAL FINANCE, SIMPLIFIED
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] lg:text-6xl">
              Your money,
              <br />
              clearly.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Budgetly brings income, expenses and savings goals into one calm dashboard — so you
              always know what you can spend today without hurting tomorrow.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground"
              >
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center rounded-full border border-border bg-card px-7 py-3.5 font-semibold transition-colors hover:bg-secondary"
              >
                See the dashboard
              </Link>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                ["4.9★", "average rating"],
                ["38k", "budgets tracked"],
                ["₹1.2Cr", "saved by users"],
              ].map(([a, b]) => (
                <div key={b}>
                  <p className="text-2xl font-bold">{a}</p>
                  <p className="text-xs text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up space-y-4" style={{ animationDelay: "160ms" }}>
            <div className="surface hover-lift p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Spending overview</p>
                  <p className="text-xs text-muted-foreground/80">Your expenses by category</p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                  This month
                </span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-8">
                <DonutChart size={180} stroke={26} />
                <div className="min-w-[180px] flex-1 space-y-3">
                  {categories.slice(0, 4).map((c) => (
                    <div key={c.name} className="flex items-center gap-3 text-sm">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="flex-1">{c.name}</span>
                      <span className="tabular font-semibold">{inr(c.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ink-panel p-6">
              <p className="text-sm text-ink-foreground/70">September budget</p>
              <p className="tabular mt-1 text-3xl font-bold">{inr(summary.spent)}</p>
              <p className="text-sm text-ink-foreground/60">
                of {inr(summary.budget)} monthly limit
              </p>
              <div className="mt-5 flex justify-between text-xs font-medium">
                <span>{used}% used</span>
                <span>{inr(summary.budget - summary.spent)} left</span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-ink-foreground/15">
                <div
                  className="animate-grow h-full origin-left rounded-full bg-accent"
                  style={{ width: `${used}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="max-w-lg text-3xl font-bold lg:text-4xl">
          Everything you need to stay ahead of your month.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="surface hover-lift animate-fade-up p-7"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="surface grid gap-10 p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <h2 className="text-3xl font-bold">Three steps to a calmer month</h2>
            <p className="mt-3 text-muted-foreground">
              No spreadsheets, no manual reconciliation — just a rhythm you can keep.
            </p>
            <div className="mt-8 space-y-6">
              {[
                ["Connect", "Add your accounts and cards once. Balances stay in sync."],
                ["Categorise", "Budgetly sorts transactions; you tweak only the odd one."],
                ["Compound", "Set goals and watch progress bars fill every payday."],
              ].map(([t, d], i) => (
                <div key={t} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {categories.slice(0, 4).map((c, i) => (
              <div key={c.name} className="rounded-2xl border border-border p-5">
                <div className="flex justify-between text-sm font-medium">
                  <span>{c.name}</span>
                  <span className="tabular text-muted-foreground">
                    {inr(c.amount)} / {inr(c.budget)}
                  </span>
                </div>
                <ProgressBar
                  className="mt-3"
                  value={(c.amount / c.budget) * 100}
                  delay={i * 120}
                  tone={c.amount / c.budget > 0.9 ? "destructive" : "accent"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="ink-panel relative overflow-hidden px-8 py-16 text-center lg:px-16">
          <div className="animate-float absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
          <h2 className="relative text-3xl font-bold lg:text-4xl">
            Start the next month already ahead.
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-ink-foreground/70">
            Free for your first three budgets. No card required.
          </p>
          <Link
            to="/signup"
            className="hover-lift relative mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-semibold text-accent-foreground"
          >
            Create your account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
