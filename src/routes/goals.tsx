import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Target } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { ProgressBar } from "@/components/Charts";
import { goals as seed, inr } from "@/lib/mock-data";
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

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "Savings goals — Budgetly" },
      {
        name: "description",
        content: "Track savings goals with progress rings, target dates and one-tap contributions.",
      },
      { property: "og:title", content: "Savings goals — Budgetly" },
      {
        property: "og:description",
        content: "Set targets and watch your savings progress in real time.",
      },
    ],
  }),
  component: Goals,
});

function Ring({ pct }: { pct: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg width="86" height="86" className="-rotate-90">
      <circle cx="43" cy="43" r={r} fill="none" strokeWidth="8" className="stroke-muted" />
      <circle
        cx="43"
        cy="43"
        r={r}
        fill="none"
        strokeWidth="8"
        strokeLinecap="round"
        stroke="var(--brand-cyan)"
        strokeDasharray={`${(pct / 100) * c} ${c}`}
        className="transition-all duration-700"
      />
    </svg>
  );
}

function Goals() {
  const [goals, setGoals] = useState(seed);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [eta, setEta] = useState("");

  const totalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);

  const contribute = (id: string) => {
    setGoals((gs) =>
      gs.map((g) => (g.id === id ? { ...g, saved: Math.min(g.saved + 5000, g.target) } : g)),
    );
    toast.success("₹5,000 added to your goal");
  };

  const addGoal = () => {
    if (!name.trim() || !target.trim() || !eta.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    const numericTarget = Number(target);
    if (Number.isNaN(numericTarget) || numericTarget <= 0) {
      toast.error("Target must be a valid positive number");
      return;
    }
    setGoals((gs) => [
      ...gs,
      {
        id: `g${Date.now()}`,
        name: name.trim(),
        saved: 0,
        target: numericTarget,
        eta: eta.trim(),
      },
    ]);
    setName("");
    setTarget("");
    setEta("");
    setOpen(false);
    toast.success("New goal created");
  };

  return (
    <AppShell title="Savings goals">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-extrabold">Savings goals</h1>
          <p className="mt-2 text-muted-foreground">Small steps, big wins.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground">
              <Plus className="h-4 w-4" /> New goal
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new goal</DialogTitle>
              <DialogDescription>Set a target and deadline to stay on track.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="goal-name">Goal name</Label>
                <Input
                  id="goal-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. New laptop"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal-target">Target amount (₹)</Label>
                <Input
                  id="goal-target"
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="e.g. 90000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal-eta">Target date / ETA</Label>
                <Input
                  id="goal-eta"
                  value={eta}
                  onChange={(e) => setEta(e.target.value)}
                  placeholder="e.g. Dec 2026"
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
                onClick={addGoal}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Create goal
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="ink-panel animate-fade-up mt-8 flex flex-wrap items-center justify-between gap-8 p-8">
        <div>
          <p className="text-sm text-ink-foreground/70">Total saved across goals</p>
          <p className="tabular mt-2 text-4xl font-bold">{inr(totalSaved)}</p>
          <p className="mt-1 text-sm text-ink-foreground/60">
            of {inr(totalTarget)} combined targets
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-foreground/10">
            <Target className="h-6 w-6" />
          </span>
          <div>
            <p className="text-3xl font-bold">{Math.round((totalSaved / totalTarget) * 100)}%</p>
            <p className="text-xs text-ink-foreground/60">of the way there</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {goals.map((g, i) => {
          const pct = Math.round((g.saved / g.target) * 100);
          return (
            <div
              key={g.id}
              className="surface hover-lift animate-fade-up p-7"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Ring pct={pct} />
                  <span className="tabular absolute inset-0 flex items-center justify-center text-sm font-bold">
                    {pct}%
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold">{g.name}</p>
                  <p className="tabular text-sm text-muted-foreground">
                    {inr(g.saved)} of {inr(g.target)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">On pace for {g.eta}</p>
                </div>
              </div>
              <ProgressBar className="mt-6" value={pct} delay={i * 100} />
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => contribute(g.id)}
                  className="flex-1 rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Add ₹5,000
                </button>
                <button className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
