import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBank,
  HelpCircle,
  ArrowDownRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { DonutChart, FlowChart, ProgressBar } from "@/components/Charts";
import { categories, goals, inr, monthlyFlow, summary, transactions, user } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Budgetly" },
      {
        name: "description",
        content:
          "Your monthly financial snapshot: balance, income, spending by category and savings goal progress.",
      },
      { property: "og:title", content: "Dashboard — Budgetly" },
      {
        property: "og:description",
        content: "A clear snapshot of balance, budget usage and goal progress.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const used = Math.round((summary.spent / summary.budget) * 100);
  const left = summary.budget - summary.spent;

  const stats = [
    {
      label: "Total balance",
      value: inr(summary.totalBalance),
      note: `↗ +${summary.balanceChange}% from last month`,
      icon: Wallet,
    },
    {
      label: "Income this month",
      value: inr(summary.income),
      note: "↗ On track with your average",
      icon: ArrowDownLeft,
    },
    {
      label: "Spent this month",
      value: inr(summary.spent),
      note: `${inr(left)} left in your budget`,
      icon: ArrowUpRight,
    },
  ];

  return (
    <AppShell>
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-semibold text-muted-foreground">Good morning, {user.firstName}</p>
          <h1 className="mt-2 text-4xl font-extrabold lg:text-5xl">Your money, clearly.</h1>
          <p className="mt-2 text-muted-foreground">
            Here's your financial snapshot for September.
          </p>
        </div>
        <Link
          to="/transactions"
          className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> Add transaction
        </Link>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="surface hover-lift animate-fade-up p-6"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between">
              <p className="text-muted-foreground">{s.label}</p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <s.icon className="h-5 w-5" />
              </span>
            </div>
            <p className="tabular mt-6 text-3xl font-bold">{s.value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="surface animate-fade-up mt-5 p-7" style={{ animationDelay: "100ms" }}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">Cash flow rhythm</h2>
            <p className="text-sm text-muted-foreground">Income vs spending, last six months</p>
          </div>
        </div>
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

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <div className="surface animate-fade-up p-7" style={{ animationDelay: "120ms" }}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Spending overview</h2>
              <p className="text-sm text-muted-foreground">Your expenses by category</p>
            </div>
            <span className="rounded-full border border-border px-4 py-2 text-sm font-medium">
              This month
            </span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-10">
            <DonutChart />
            <div className="min-w-[220px] flex-1 space-y-5">
              {categories.map((c) => (
                <div key={c.name} className="flex items-center gap-3 text-sm">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="flex-1 font-medium">{c.name}</span>
                  <span className="tabular font-semibold">{inr(c.amount)}</span>
                  <span className="tabular w-10 text-right text-muted-foreground">{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ink-panel animate-fade-up p-7" style={{ animationDelay: "180ms" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-ink-foreground/70">September budget</p>
              <p className="tabular mt-2 text-4xl font-bold">{inr(summary.spent)}</p>
              <p className="mt-1 text-sm text-ink-foreground/60">
                of {inr(summary.budget)} monthly limit
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-foreground/10">
              <PiggyBank className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-10 flex justify-between text-sm font-medium">
            <span>{used}% used</span>
            <span>{inr(left)} left</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-ink-foreground/15">
            <div
              className="animate-grow h-full origin-left rounded-full bg-accent"
              style={{ width: `${used}%` }}
            />
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-ink-foreground/10 p-5 text-sm">
            <HelpCircle className="mt-0.5 h-4 w-4 shrink-0" />
            You're spending 12% less than you did last month. Keep it up!
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
        <div className="surface animate-fade-up p-7" style={{ animationDelay: "220ms" }}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">Recent transactions</h2>
              <p className="text-sm text-muted-foreground">Your latest activity</p>
            </div>
            <Link to="/transactions" className="text-sm font-semibold hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-6 divide-y divide-border">
            {transactions.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-4 py-4 transition-colors hover:bg-secondary/50"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                    t.amount > 0 ? "bg-teal/20 text-foreground" : "bg-secondary text-primary"
                  }`}
                >
                  {t.merchant[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{t.merchant}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {t.category} · {t.date}
                  </p>
                </div>
                <span
                  className={`tabular font-semibold ${t.amount > 0 ? "text-success" : "text-foreground"}`}
                >
                  {t.amount > 0 ? "+" : "-"}
                  {inr(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface animate-fade-up p-7" style={{ animationDelay: "260ms" }}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">Savings goals</h2>
              <p className="text-sm text-muted-foreground">Small steps, big wins</p>
            </div>
            <Link
              to="/goals"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-accent/40"
            >
              <Plus className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 space-y-7">
            {goals.slice(0, 3).map((g, i) => {
              const pct = Math.round((g.saved / g.target) * 100);
              return (
                <div key={g.id}>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">{g.name}</span>
                    <span className="tabular text-muted-foreground">
                      {inr(g.saved)} of {inr(g.target)}
                    </span>
                  </div>
                  <ProgressBar className="mt-3" value={pct} delay={i * 140} />
                  <p className="mt-2 text-xs text-muted-foreground">{pct}% complete</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="surface animate-fade-up mt-5 p-7" style={{ animationDelay: "280ms" }}>
        <h2 className="text-xl font-bold">History</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Past six months at a glance, with month-over-month comparison
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="pb-3 font-medium">Month</th>
                <th className="pb-3 font-medium">Income</th>
                <th className="pb-3 font-medium">Spent</th>
                <th className="pb-3 font-medium">Budget</th>
                <th className="pb-3 font-medium">Savings</th>
                <th className="pb-3 text-right font-medium">MoM spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {monthlyFlow.map((m, i) => {
                const prev = i > 0 ? monthlyFlow[i - 1].spent : m.spent;
                const delta = m.spent - prev;
                const savings = m.income - m.spent;
                const budget = summary.budget;
                const over = m.spent > budget;
                return (
                  <tr key={m.month} className="transition-colors hover:bg-secondary/50">
                    <td className="py-3 font-semibold">{m.month}</td>
                    <td className="py-3 tabular">{inr(m.income)}</td>
                    <td className={`py-3 tabular ${over ? "text-destructive" : ""}`}>
                      {inr(m.spent)}
                    </td>
                    <td className="py-3 tabular text-muted-foreground">{inr(budget)}</td>
                    <td
                      className={`py-3 tabular ${savings >= 0 ? "text-success" : "text-destructive"}`}
                    >
                      {inr(savings)}
                    </td>
                    <td className="py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-xs">
                        {i === 0 ? (
                          <span className="text-muted-foreground">—</span>
                        ) : delta > 0 ? (
                          <span className="text-destructive">
                            <ArrowUpRight className="inline h-3.5 w-3.5" /> {inr(delta)}
                          </span>
                        ) : (
                          <span className="text-success">
                            <ArrowDownRight className="inline h-3.5 w-3.5" /> {inr(Math.abs(delta))}
                          </span>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
