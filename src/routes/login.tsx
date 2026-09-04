import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Budgetly" },
      {
        name: "description",
        content: "Log in to your Budgetly dashboard to track spending, budgets and savings goals.",
      },
      { property: "og:title", content: "Log in — Budgetly" },
      { property: "og:description", content: "Access your Budgetly financial dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <AuthLayout title="Welcome back" subtitle="Pick up right where your money left off.">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            toast.success("Welcome back, Jamie");
            navigate({ to: "/dashboard" });
          }, 600);
        }}
      >
        <div>
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            defaultValue="jamie.davis@example.com"
            className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            defaultValue="budgetly"
            className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded" /> Remember me
          </label>
          <Link
            to="/forgot-password"
            className="font-medium text-accent-foreground hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="hover-lift w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-70"
        >
          {loading ? "Signing you in…" : "Log in"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to Budgetly?{" "}
        <Link to="/signup" className="font-semibold text-foreground hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
