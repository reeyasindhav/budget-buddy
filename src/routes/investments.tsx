import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TrendingUp, PieChart, Wallet, ArrowRight, Plus } from "lucide-react";
import { ProgressBar } from "@/components/Charts";
import { investments as seed, inr } from "@/lib/mock-data";

export const Route = createFileRoute("/investments")({
  head: () => ({
    meta: [
      { title: "Investments — Budgetly" },
      {
        name: "description",
        content: "Track holdings, returns, and allocation across your investments.",
      },
      { property: "og:title", content: "Investments — Budgetly" },
      { property: "og:description", content: "Monitor your portfolio performance and allocation." },
    ],
  }),
  component: Investments,
});

function Investments() {
  const totalValue = seed.reduce((s, i) => s + i.value, 0);
  const totalGain = seed.reduce((s, i) => s + i.gain, 0);

  return (
    <AppShell title="Investments">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-extrabold">Investments</h1>
          <p className="mt-2 text-muted-foreground">
            Total value:{" "}
            <span className="tabular font-semibold text-foreground">{inr(totalValue)}</span> · Total
            gain:{" "}
            <span
              className={`tabular font-semibold ${totalGain >= 0 ? "text-success" : "text-destructive"}`}
            >
              {inr(totalGain)}
            </span>
          </p>
        </div>
        <button className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Add investment
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {seed.map((item, i) => {
          const pct = Math.round((item.value / totalValue) * 100);
          return (
            <div
              key={item.id}
              className="surface hover-lift animate-fade-up p-7"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  {pct}%
                </span>
              </div>
              <p className="tabular mt-6 text-3xl font-bold">{inr(item.value)}</p>
              <p className={`text-xs ${item.gain >= 0 ? "text-success" : "text-destructive"}`}>
                {item.gain >= 0 ? "+" : "-"}
                {inr(Math.abs(item.gain))} {item.gain >= 0 ? "gain" : "loss"}
              </p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="animate-grow h-full origin-left rounded-full bg-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 surface p-8">
        <h2 className="text-2xl font-bold">Allocation</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <PieChart className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Diversify across asset types</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Mix equities, debt, and cash based on your risk profile.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <TrendingUp className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Rebalance periodically</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Review allocation every quarter and trim overweight positions.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <Wallet className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Keep an emergency buffer</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Avoid liquidating investments for short-term needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
