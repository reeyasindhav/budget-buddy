import { createFileRoute, Link } from "@tanstack/react-router";
import { PiggyBank, TrendingUp, ShieldCheck, BarChart3 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Budgetly" },
      {
        name: "description",
        content:
          "Learn more about Budgetly and our mission to make personal finance legible for everyone.",
      },
      { property: "og:title", content: "About — Budgetly" },
      {
        property: "og:description",
        content: "Budgetly helps you track income, expenses and savings goals with clarity.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-w-0">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="surface p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <div className="flex-1">
              <p className="text-sm font-semibold text-muted-foreground">Our mission</p>
              <h1 className="mt-2 text-4xl font-extrabold">Make your money legible.</h1>
              <p className="mt-4 text-base text-muted-foreground">
                Budgetly is built around a simple belief: good financial decisions start with clear
                information. We combine clean design with practical tools so you can see where your
                money goes, set goals, and build better habits month after month.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/signup"
                  className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Get started
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  View pricing
                </Link>
              </div>
            </div>
            <div className="grid w-full max-w-xs grid-cols-2 gap-4">
              <div className="surface flex flex-col items-center gap-2 p-5 text-center">
                <span className="text-3xl font-bold">12K+</span>
                <span className="text-xs text-muted-foreground">Active users</span>
              </div>
              <div className="surface flex flex-col items-center gap-2 p-5 text-center">
                <span className="text-3xl font-bold">₹4Cr+</span>
                <span className="text-xs text-muted-foreground">Tracked spend</span>
              </div>
              <div className="surface flex flex-col items-center gap-2 p-5 text-center">
                <span className="text-3xl font-bold">18%</span>
                <span className="text-xs text-muted-foreground">Avg. savings increase</span>
              </div>
              <div className="surface flex flex-col items-center gap-2 p-5 text-center">
                <span className="text-3xl font-bold">4.8/5</span>
                <span className="text-xs text-muted-foreground">App store rating</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
              <BarChart3 className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-xl font-bold">Clarity first</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Dashboards, charts and summaries are designed to reduce friction, not add it. Open the
              app and understand your money in seconds.
            </p>
          </div>
          <div className="surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
              <TrendingUp className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-xl font-bold">Actionable insights</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Spot trends, compare months, and know exactly what to adjust next. Budgetly turns raw
              data into simple next actions.
            </p>
          </div>
          <div className="surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-xl font-bold">Privacy mindful</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your data stays yours. We prioritize secure, local-first experiences and transparent
              data practices.
            </p>
          </div>
        </div>

        <div className="mt-10 surface p-8 md:p-10">
          <h2 className="text-2xl font-bold">How Budgetly works</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From setup to insight, the flow is built to be fast and human-readable.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">01</p>
              <h3 className="mt-2 text-lg font-bold">Connect or enter</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Link accounts or manually track income, expenses, and goals.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">02</p>
              <h3 className="mt-2 text-lg font-bold">Review your rhythm</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Use cash flow, category breakdowns, and history to see real patterns.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">03</p>
              <h3 className="mt-2 text-lg font-bold">Adjust and grow</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Update budgets, add to goals, and repeat. Small improvements compound.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Ready to try Budgetly?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start free and upgrade when you want more.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/signup"
              className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Create free account
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
