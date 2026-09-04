import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Budgetly" },
      {
        name: "description",
        content:
          "Sign up for Budgetly and start tracking income, expenses and savings goals in minutes.",
      },
      { property: "og:title", content: "Create your account — Budgetly" },
      {
        property: "og:description",
        content: "Free personal finance tracking with clean charts and goal progress.",
      },
    ],
  }),
  component: SignupPage,
});

const steps = ["Your details", "Monthly budget", "First goal"];

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Three quick steps and your dashboard is live."
    >
      <div className="mb-8 flex gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex-1">
            <div
              className={`h-1.5 rounded-full transition-colors duration-500 ${i <= step ? "bg-accent" : "bg-muted"}`}
            />
            <p className="mt-2 text-[11px] text-muted-foreground">{s}</p>
          </div>
        ))}
      </div>

      <form
        key={step}
        className="animate-fade-up space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 2) return setStep(step + 1);
          toast.success("Account created — welcome to Budgetly!");
          navigate({ to: "/dashboard" });
        }}
      >
        {step === 0 && (
          <>
            <Field label="Full name" defaultValue="Jamie Davis" />
            <Field label="Email" type="email" defaultValue="jamie.davis@example.com" />
            <Field label="Password" type="password" defaultValue="budgetly" />
          </>
        )}
        {step === 1 && (
          <>
            <Field label="Monthly income (₹)" type="number" defaultValue="120000" />
            <Field label="Monthly spending limit (₹)" type="number" defaultValue="85000" />
            <p className="text-xs text-muted-foreground">
              You can fine-tune per-category budgets later from the Budgets page.
            </p>
          </>
        )}
        {step === 2 && (
          <>
            <Field label="Goal name" defaultValue="Emergency fund" />
            <Field label="Target amount (₹)" type="number" defaultValue="250000" />
            <Field label="Target date" type="month" defaultValue="2027-02" />
          </>
        )}

        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="rounded-full border border-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="hover-lift flex-1 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
          >
            {step < 2 ? "Continue" : "Create account"}
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-foreground hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

function Field({
  label,
  type = "text",
  defaultValue,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        required
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
