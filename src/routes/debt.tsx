import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { debts as seed, inr } from "@/lib/mock-data";
import { Plus, Trash2, TrendingDown, Calendar } from "lucide-react";
import { toast } from "sonner";
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

export const Route = createFileRoute("/debt")({
  head: () => ({
    meta: [
      { title: "Debt manager — Budgetly" },
      {
        name: "description",
        content: "Track loans, EMIs, and payoff progress with smart repayment estimates.",
      },
      { property: "og:title", content: "Debt manager — Budgetly" },
      {
        property: "og:description",
        content: "Stay on top of debt with payoff timelines and reminders.",
      },
    ],
  }),
  component: DebtManager,
});

function DebtManager() {
  const [debts, setDebts] = useState(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [total, setTotal] = useState("");
  const [remaining, setRemaining] = useState("");
  const [rate, setRate] = useState("");
  const [emi, setEmi] = useState("");

  const totalDebt = debts.reduce((s, d) => s + d.remaining, 0);
  const monthlyEmi = debts.reduce((s, d) => s + d.emi, 0);

  const addDebt = () => {
    if (!name.trim() || !total.trim() || !remaining.trim() || !rate.trim() || !emi.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setDebts((prev) => [
      ...prev,
      {
        id: `d${Date.now()}`,
        name: name.trim(),
        total: Number(total),
        remaining: Number(remaining),
        rate: Number(rate),
        emi: Number(emi),
      },
    ]);
    setName("");
    setTotal("");
    setRemaining("");
    setRate("");
    setEmi("");
    setOpen(false);
    toast.success("Debt added");
  };

  return (
    <AppShell title="Debt manager">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-extrabold">Debt manager</h1>
          <p className="mt-2 text-muted-foreground">
            Total remaining:{" "}
            <span className="tabular font-semibold text-foreground">{inr(totalDebt)}</span> ·
            Monthly EMI:{" "}
            <span className="tabular font-semibold text-foreground">{inr(monthlyEmi)}</span>
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground">
              <Plus className="h-4 w-4" /> Add debt
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new debt</DialogTitle>
              <DialogDescription>Track a loan, EMI, or credit balance.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="debt-name">Debt name</Label>
                <Input
                  id="debt-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Home loan"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="debt-total">Total amount (₹)</Label>
                <Input
                  id="debt-total"
                  type="number"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  placeholder="e.g. 500000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="debt-remaining">Remaining amount (₹)</Label>
                <Input
                  id="debt-remaining"
                  type="number"
                  value={remaining}
                  onChange={(e) => setRemaining(e.target.value)}
                  placeholder="e.g. 320000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="debt-rate">Interest rate (% p.a.)</Label>
                <Input
                  id="debt-rate"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g. 8.5"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="debt-emi">Monthly EMI (₹)</Label>
                <Input
                  id="debt-emi"
                  type="number"
                  value={emi}
                  onChange={(e) => setEmi(e.target.value)}
                  placeholder="e.g. 12500"
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
                onClick={addDebt}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Add debt
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {debts.map((d, i) => {
          const pct = Math.round(((d.total - d.remaining) / d.total) * 100);
          const monthsLeft = Math.round(d.remaining / d.emi);
          return (
            <div
              key={d.id}
              className="surface hover-lift animate-fade-up p-7"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.rate}% interest</p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  {pct}% paid
                </span>
              </div>
              <p className="tabular mt-6 text-3xl font-bold">{inr(d.remaining)}</p>
              <p className="text-xs text-muted-foreground">of {inr(d.total)} remaining</p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="animate-grow h-full origin-left rounded-full bg-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />~
                {monthsLeft > 0 ? `${monthsLeft} months left` : "Almost paid off"}
              </div>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => {
                    setDebts((prev) =>
                      prev.map((x) =>
                        x.id === d.id ? { ...x, remaining: Math.max(0, x.remaining - x.emi) } : x,
                      ),
                    );
                    toast.success("EMI marked as paid");
                  }}
                  className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Mark EMI paid
                </button>
                <button
                  onClick={() => {
                    setDebts((prev) => prev.filter((x) => x.id !== d.id));
                    toast.success("Debt removed");
                  }}
                  className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
