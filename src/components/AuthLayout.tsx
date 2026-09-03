import { Link } from "@tanstack/react-router";
import { PiggyBank, ShieldCheck, TrendingUp, Target } from "lucide-react";
import type { ReactNode } from "react";

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-14">
        <div className="animate-fade-up mx-auto w-full max-w-sm">
          <Link to="/" className="mb-10 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <PiggyBank className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">budgetly</span>
          </Link>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>

      <div className="ink-panel relative m-3 hidden overflow-hidden rounded-3xl p-12 lg:flex lg:flex-col lg:justify-center">
        <div className="animate-float absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-2xl" />
        <p className="text-sm tracking-[0.14em] text-ink-foreground/60">YOUR MONEY, CLEARLY</p>
        <h2 className="mt-4 max-w-md text-4xl font-bold leading-tight">
          Every rupee accounted for, without the spreadsheet.
        </h2>
        <div className="mt-10 space-y-5">
          {[
            { icon: TrendingUp, text: "Category-wise spending charts updated in real time" },
            { icon: Target, text: "Savings goals that show exactly when you'll get there" },
            { icon: ShieldCheck, text: "Bank-grade encryption on every connected account" },
          ].map((f, i) => (
            <div
              key={f.text}
              className="animate-fade-up flex items-start gap-4"
              style={{ animationDelay: `${150 + i * 120}ms` }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-foreground/10">
                <f.icon className="h-5 w-5" />
              </span>
              <p className="pt-2 text-sm text-ink-foreground/80">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
