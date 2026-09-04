import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { FileText, ShieldCheck, AlertTriangle, Mail } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Budgetly" },
      {
        name: "description",
        content: "Budgetly terms of service: acceptable use, responsibilities, and limitations.",
      },
      { property: "og:title", content: "Terms of service — Budgetly" },
      { property: "og:description", content: "Please review these terms before using Budgetly." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-w-0">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="surface p-8 md:p-12">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-4xl font-extrabold">Terms of service</h1>
              <p className="mt-2 text-muted-foreground">
                Last updated: September 2026 · By using Budgetly, you agree to these terms.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="surface p-6">
            <ShieldCheck className="h-5 w-5" />
            <h2 className="mt-4 text-lg font-bold">Acceptable use</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Use Budgetly only for lawful personal finance management. Do not misuse, disrupt, or
              attempt to reverse engineer the service.
            </p>
          </div>
          <div className="surface p-6">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="mt-4 text-lg font-bold">Your responsibility</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              You are responsible for keeping your account secure and for the accuracy of the data
              you enter into the app.
            </p>
          </div>
          <div className="surface p-6">
            <FileText className="h-5 w-5" />
            <h2 className="mt-4 text-lg font-bold">Limitations</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Budgetly is provided as-is. We do not guarantee uninterrupted availability and may
              update features without prior notice.
            </p>
          </div>
        </div>

        <div className="mt-10 surface p-8 md:p-10">
          <h2 className="text-2xl font-bold">Full terms</h2>
          <div className="mt-8 space-y-8 text-sm text-muted-foreground">
            <section>
              <h3 className="text-lg font-bold text-foreground">1. Agreement to terms</h3>
              <p>
                By accessing or using Budgetly, you agree to be bound by these terms. If you
                disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">2. Acceptable use</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Use Budgetly only for lawful purposes</li>
                <li>Do not attempt to reverse engineer, decompile, or extract source code</li>
                <li>Do not misuse, disrupt, or overload the service</li>
                <li>Do not use the app to store or process illegal content</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">3. Accounts and security</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials
                and for all activities under your account. Notify us immediately of any unauthorized
                use.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">4. Intellectual property</h3>
              <p>
                Budgetly’s design, code, and branding are owned by the Budgetly team. You retain
                ownership of the data you create in the app.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">5. Limitation of liability</h3>
              <p>
                Budgetly is provided as-is without warranties of any kind. We are not liable for any
                indirect, incidental, or consequential damages arising from use of the service.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">6. Changes</h3>
              <p>
                We may update these terms from time to time. Continued use of the app after changes
                constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-foreground">7. Contact</h3>
              <p>
                For questions about these terms, use the contact form or email us at
                hello@budgetly.app.
              </p>
            </section>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Still have questions?</h2>
            <p className="mt-1 text-sm text-muted-foreground">We are here to clarify anything.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/contact"
              className="hover-lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Mail className="h-4 w-4" /> Contact us
            </Link>
            <Link
              to="/privacy"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
