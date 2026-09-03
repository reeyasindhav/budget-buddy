import { createFileRoute } from "@tanstack/react-router";
import { Building2, CreditCard, Wallet, Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { accounts, inr, transactions } from "@/lib/mock-data";

export const Route = createFileRoute("/accounts")({
  head: () => ({
    meta: [
      { title: "Accounts — Budgetly" },
      { name: "description", content: "All your bank accounts, cards and cash wallets consolidated into one running balance." },
      { property: "og:title", content: "Accounts — Budgetly" },
      { property: "og:description", content: "Consolidated balances across banks, cards and cash." },
    ],
  }),
  component: Accounts,
});

const iconFor = (type: string) =>
  type === "Bank account" ? Building2 : type === "Cash" ? Wallet : CreditCard;

function Accounts() {
  const net = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <AppShell title="Accounts">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-extrabold">Accounts</h1>
          <p className="mt-2 text-muted-foreground">
            Net worth across {accounts.length} connected sources:{" "}
            <span className="tabular font-semibold text-foreground">{inr(net)}</span>
          </p>
        </div>
        <button
          onClick={() => toast("Bank connection flow is a demo")}
          className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> Link account
        </button>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {accounts.map((a, i) => {
          const Icon = iconFor(a.type);
          const negative = a.balance < 0;
          return (
            <div
              key={a.id}
              className="surface hover-lift animate-fade-up p-7"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  {a.type}
                </span>
              </div>
              <p className="mt-6 font-semibold">{a.name}</p>
              <p className="text-xs text-muted-foreground">{a.number}</p>
              <p
                className={`tabular mt-4 text-3xl font-bold ${negative ? "text-destructive" : ""}`}
              >
                {negative ? "−" : ""}
                {inr(a.balance)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {negative ? "Outstanding balance" : "Available balance"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="surface animate-fade-up mt-5 p-7">
        <h2 className="text-xl font-bold">Activity by account</h2>
        <p className="text-sm text-muted-foreground">Most recent movement on each source</p>
        <div className="mt-6 divide-y divide-border">
          {transactions.slice(0, 6).map((t) => (
            <div key={t.id} className="flex items-center gap-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{t.merchant}</p>
                <p className="text-xs text-muted-foreground">{t.account}</p>
              </div>
              <span className="text-xs text-muted-foreground">{t.date}</span>
              <span
                className={`tabular w-28 text-right font-semibold ${t.amount > 0 ? "text-success" : ""}`}
              >
                {t.amount > 0 ? "+" : "-"}
                {inr(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
