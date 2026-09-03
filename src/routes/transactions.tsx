import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { categories, inr, transactions as seed, type Txn } from "@/lib/mock-data";

export const Route = createFileRoute("/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions — Budgetly" },
      { name: "description", content: "Search, filter and add transactions across every connected account in Budgetly." },
      { property: "og:title", content: "Transactions — Budgetly" },
      { property: "og:description", content: "A searchable history of income and expenses." },
    ],
  }),
  component: Transactions,
});

const filters = ["All", "Income", "Expenses", ...categories.map((c) => c.name)];

function Transactions() {
  const [items, setItems] = useState<Txn[]>(seed);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);

  const list = useMemo(
    () =>
      items.filter((t) => {
        const q = t.merchant.toLowerCase().includes(query.toLowerCase());
        const f =
          filter === "All"
            ? true
            : filter === "Income"
              ? t.amount > 0
              : filter === "Expenses"
                ? t.amount < 0
                : t.category === filter;
        return q && f;
      }),
    [items, query, filter],
  );

  const inflow = list.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const outflow = list.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);

  return (
    <AppShell title="Transactions">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-extrabold">Transactions</h1>
          <p className="mt-2 text-muted-foreground">
            {list.length} entries · {inr(inflow)} in · {inr(outflow)} out
          </p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> Add transaction
        </button>
      </div>

      <div className="surface animate-fade-up mt-8 p-6" style={{ animationDelay: "80ms" }}>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex min-w-[240px] flex-1 items-center gap-3 rounded-full border border-input px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search merchants…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-accent/30"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {list.map((t, i) => (
            <div
              key={t.id}
              className="animate-fade-up flex items-center gap-4 rounded-2xl border border-border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${
                  t.amount > 0 ? "bg-teal/20" : "bg-secondary text-primary"
                }`}
              >
                {t.merchant[0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{t.merchant}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {t.category} · {t.date} · {t.account}
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
          {list.length === 0 && (
            <p className="py-14 text-center text-sm text-muted-foreground">
              No transactions match that search.
            </p>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/30 p-4">
          <div className="animate-pop surface w-full max-w-md p-7">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold">Add transaction</h2>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const amount = Number(fd.get("amount"));
                setItems([
                  {
                    id: crypto.randomUUID(),
                    merchant: String(fd.get("merchant")),
                    category: String(fd.get("category")),
                    date: "Today, just now",
                    account: "HDFC Debit",
                    amount: String(fd.get("type")) === "income" ? amount : -amount,
                  },
                  ...items,
                ]);
                setOpen(false);
                toast.success("Transaction added");
              }}
            >
              <input
                name="merchant"
                required
                placeholder="Merchant"
                className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                name="amount"
                type="number"
                required
                placeholder="Amount"
                className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <select
                name="category"
                className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.map((c) => (
                  <option key={c.name}>{c.name}</option>
                ))}
                <option>Income</option>
              </select>
              <select
                name="type"
                className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <button className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground">
                Save transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
