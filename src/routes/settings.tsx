import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { user } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Budgetly" },
      {
        name: "description",
        content: "Manage your Budgetly profile, currency, alert preferences and account security.",
      },
      { property: "og:title", content: "Settings — Budgetly" },
      { property: "og:description", content: "Profile, preferences and notification controls." },
    ],
  }),
  component: Settings,
});

const tabs = ["Profile", "Preferences", "Notifications"] as const;

function Toggle({ label, hint, on }: { label: string; hint: string; on?: boolean }) {
  const [checked, setChecked] = useState(!!on);
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border py-5 last:border-0">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        aria-pressed={checked}
        className={`h-7 w-12 shrink-0 rounded-full p-1 transition-colors duration-300 ${checked ? "bg-accent" : "bg-muted"}`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-card transition-transform duration-300 ${checked ? "translate-x-5" : ""}`}
        />
      </button>
    </div>
  );
}

function Settings() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Profile");

  return (
    <AppShell title="Settings">
      <div className="animate-fade-up">
        <h1 className="text-4xl font-extrabold">Settings</h1>
        <p className="mt-2 text-muted-foreground">Tune Budgetly to the way you handle money.</p>
      </div>

      <div className="mt-8 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              tab === t
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div key={tab} className="surface animate-fade-up mt-5 p-8">
        {tab === "Profile" && (
          <form
            className="max-w-lg space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Profile updated");
            }}
          >
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
                {user.initials}
              </span>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.plan}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Full name</label>
              <input
                defaultValue={user.name}
                className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                defaultValue={user.email}
                className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground">
              Save changes
            </button>
          </form>
        )}

        {tab === "Preferences" && (
          <div className="max-w-lg">
            <div>
              <label className="text-sm font-medium">Currency</label>
              <select className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring">
                <option>₹ Indian Rupee (INR)</option>
                <option>$ US Dollar (USD)</option>
                <option>€ Euro (EUR)</option>
              </select>
            </div>
            <div className="mt-5">
              <label className="text-sm font-medium">Budget cycle starts on</label>
              <select className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring">
                <option>1st of the month</option>
                <option>Salary credit date</option>
              </select>
            </div>
            <div className="mt-4">
              <Toggle
                label="Round up savings"
                hint="Round each expense up and save the difference."
                on
              />
              <Toggle
                label="Auto-categorise"
                hint="Let Budgetly sort new transactions for you."
                on
              />
            </div>
          </div>
        )}

        {tab === "Notifications" && (
          <div className="max-w-lg">
            <Toggle label="Budget warnings" hint="Alert me at 80% of any category budget." on />
            <Toggle label="Weekly digest" hint="A Sunday summary of the week's money." on />
            <Toggle label="Bill reminders" hint="Nudge me two days before a subscription renews." />
            <Toggle label="Goal milestones" hint="Celebrate every 25% of a savings goal." on />
          </div>
        )}
      </div>
    </AppShell>
  );
}
