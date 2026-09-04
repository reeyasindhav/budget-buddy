import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ShieldCheck, Lock, Eye, Trash2, Mail } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Budgetly" },
      {
        name: "description",
        content: "Budgetly privacy policy: how we collect, use, and protect your data.",
      },
      { property: "og:title", content: "Privacy policy — Budgetly" },
      { property: "og:description", content: "Transparent data practices for Budgetly users." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-w-0">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="surface p-8 md:p-12">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-4xl font-extrabold">Privacy policy</h1>
              <p className="mt-2 text-muted-foreground">
                Last updated: September 2026 · This policy explains what we collect, why we collect
                it, and how we keep it safe.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="surface p-6">
            <Lock className="h-5 w-5" />
            <h2 className="mt-4 text-lg font-bold">Data collection</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We only collect what is necessary to run the app: account details, financial inputs,
              and basic usage signals.
            </p>
          </div>
          <div className="surface p-6">
            <Eye className="h-5 w-5" />
            <h2 className="mt-4 text-lg font-bold">How we use data</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Data is used to provide core functionality, improve performance, and send optional
              product updates only if you opt in.
            </p>
          </div>
          <div className="surface p-6">
            <Trash2 className="h-5 w-5" />
            <h2 className="mt-4 text-lg font-bold">Your controls</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You can update or delete your account data at any time. For privacy questions, reach
              out via the contact form.
            </p>
          </div>
        </div>

        <div className="mt-10 surface p-8 md:p-10">
          <h2 className="text-2xl font-bold">Full policy</h2>
          <div className="mt-8 space-y-8 text-sm text-muted-foreground">
            <section>
              <h3 className="text-lg font-bold text-foreground">1. Information we collect</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Account information such as name and email</li>
                <li>Financial inputs you enter for budgeting, transactions, and goals</li>
                <li>Usage data to improve reliability and experience</li>
                <li>Device and browser info for security and debugging</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">2. How we use information</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>To provide core app functionality and sync across devices</li>
                <li>To improve reliability, performance, and feature design</li>
                <li>To communicate product updates if you opt in</li>
                <li>To detect and prevent abuse or security issues</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">3. Data sharing</h3>
              <p>
                We do not sell your personal data. We may share limited data with trusted service
                providers only to operate the app, and only under strict confidentiality agreements.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">4. Security</h3>
              <p>
                We use industry-standard encryption and access controls. No system is perfectly
                secure, but we work continuously to protect your data.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">5. Your rights</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Request a copy of your data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your account and related data</li>
                <li>Withdraw consent for optional communications</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">6. Contact</h3>
              <p>
                For privacy questions or requests, use the contact form or email us at
                hello@budgetly.app.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Questions about your data?</h2>
            <p className="mt-1 text-sm text-muted-foreground">We are happy to help.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Mail className="h-4 w-4" /> Contact us
            </Link>
            <Link
              to="/terms"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Terms of service
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
