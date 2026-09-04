import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Budgetly" },
      {
        name: "description",
        content:
          "Simple Budgetly plans: free budgeting, Plus for goals and Family for shared money.",
      },
      { property: "og:title", content: "Pricing — Budgetly" },
      {
        property: "og:description",
        content: "Free, Plus and Family plans for tracking income, expenses and savings goals.",
      },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Starter",
    price: "₹0",
    note: "forever",
    perks: ["3 budgets", "2 connected accounts", "Category charts", "Monthly summary"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Plus",
    price: "₹199",
    note: "per month",
    perks: [
      "Unlimited budgets & goals",
      "All accounts & cards",
      "Smart insights and nudges",
      "Recurring bill detection",
      "CSV & PDF exports",
    ],
    cta: "Go Plus",
    featured: true,
  },
  {
    name: "Family",
    price: "₹349",
    note: "per month",
    perks: ["Everything in Plus", "Up to 5 members", "Shared household budgets", "Role controls"],
    cta: "Choose Family",
    featured: false,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="animate-fade-up max-w-xl">
          <h1 className="text-4xl font-extrabold lg:text-5xl">Pricing that stays out of the way</h1>
          <p className="mt-4 text-muted-foreground">
            Start free. Upgrade only when your money deserves more attention.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`animate-fade-up hover-lift p-8 ${p.featured ? "ink-panel" : "surface"}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {p.featured && (
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  Most popular
                </span>
              )}
              <h2 className="mt-4 text-lg font-semibold">{p.name}</h2>
              <p className="mt-3 text-4xl font-bold">{p.price}</p>
              <p
                className={`text-sm ${p.featured ? "text-ink-foreground/60" : "text-muted-foreground"}`}
              >
                {p.note}
              </p>
              <ul className="mt-7 space-y-3 text-sm">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className={p.featured ? "text-ink-foreground/85" : ""}>{perk}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors ${
                  p.featured
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="surface mt-16 divide-y divide-border">
          {[
            [
              "Can I switch plans later?",
              "Yes — upgrade or downgrade anytime, prorated instantly.",
            ],
            ["Do you store my bank credentials?", "No. Connections are read-only and tokenised."],
            ["Is there a student discount?", "Plus is 50% off with a valid student email."],
          ].map(([q, a]) => (
            <div key={q} className="p-6">
              <p className="font-semibold">{q}</p>
              <p className="mt-1 text-sm text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
