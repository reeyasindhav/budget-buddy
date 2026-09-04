import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, CreditCard, Wallet, Plus } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { accounts as seed, inr, transactions } from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/accounts")({
  head: () => ({
    meta: [
      { title: "Accounts — Budgetly" },
      {
        name: "description",
        content:
          "All your bank accounts, cards and cash wallets consolidated into one running balance.",
      },
      { property: "og:title", content: "Accounts — Budgetly" },
      {
        property: "og:description",
        content: "Consolidated balances across banks, cards and cash.",
      },
    ],
  }),
  component: Accounts,
});

const iconFor = (type: string) =>
  type === "Bank account" ? Building2 : type === "Cash" ? Wallet : CreditCard;

function Accounts() {
  const [accountsList, setAccounts] = useState(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("Bank account");
  const [balance, setBalance] = useState("");

  const net = accountsList.reduce((s, a) => s + a.balance, 0);

  const linkAccount = () => {
    if (!name.trim() || !number.trim() || !balance.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    const numericBalance = Number(balance);
    if (Number.isNaN(numericBalance)) {
      toast.error("Balance must be a number");
      return;
    }
    setAccounts((prev) => [
      ...prev,
      {
        id: `a${Date.now()}`,
        name: name.trim(),
        type,
        number: number.trim(),
        balance: numericBalance,
      },
    ]);
    setName("");
    setNumber("");
    setBalance("");
    setType("Bank account");
    setOpen(false);
    toast.success("Account linked successfully");
  };

  return (
    <AppShell title="Accounts">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-extrabold">Accounts</h1>
          <p className="mt-2 text-muted-foreground">
            Net worth across {accountsList.length} connected sources:{" "}
            <span className="tabular font-semibold text-foreground">{inr(net)}</span>
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground">
              <Plus className="h-4 w-4" /> Link account
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Link new account</DialogTitle>
              <DialogDescription>
                Add a bank, card, or cash account to track its balance.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="account-name">Account name</Label>
                <Input
                  id="account-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. HDFC Savings"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account-type">Account type</Label>
                <select
                  id="account-type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Bank account">Bank account</option>
                  <option value="Credit card">Credit card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account-number">Account number / last 4 digits</Label>
                <Input
                  id="account-number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="e.g. 4829"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="account-balance">Current balance (₹)</Label>
                <Input
                  id="account-balance"
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  placeholder="e.g. 50000"
                />
              </div>
            </div>
            <DialogFooter>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                onClick={linkAccount}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Link account
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {accountsList.map((a, i) => {
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
