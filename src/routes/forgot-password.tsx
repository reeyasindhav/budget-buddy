import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MailCheck } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Budgetly" },
      { name: "description", content: "Request a Budgetly password reset link and get back to your dashboard." },
      { property: "og:title", content: "Reset your password — Budgetly" },
      { property: "og:description", content: "Recover access to your Budgetly account." },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout
      title={sent ? "Check your inbox" : "Reset your password"}
      subtitle={
        sent
          ? "We've sent a secure reset link. It expires in 30 minutes."
          : "Enter your email and we'll send you a reset link."
      }
    >
      {sent ? (
        <div className="animate-pop surface p-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-accent-foreground">
            <MailCheck className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm text-muted-foreground">
            Sent to <span className="font-medium text-foreground">jamie.davis@example.com</span>
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Back to log in
          </Link>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              defaultValue="jamie.davis@example.com"
              className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="hover-lift w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground">
            Send reset link
          </button>
          <Link
            to="/login"
            className="block text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Back to log in
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
