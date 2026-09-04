import { Link } from "@tanstack/react-router";
import { PiggyBank } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <PiggyBank className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">budgetly</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/pricing" className="transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link to="/insights" className="transition-colors hover:text-foreground">
            Insights
          </Link>
          <Link to="/dashboard" className="transition-colors hover:text-foreground">
            Live demo
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="hover-lift rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-lg font-bold">budgetly</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Money, made legible. Track income, expenses, and savings goals with clarity.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">© 2026 Budgetly.</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Product</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/pricing" className="hover:text-foreground">
                Pricing
              </Link>
              <Link to="/insights" className="hover:text-foreground">
                Insights
              </Link>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
              <Link to="/blog" className="hover:text-foreground">
                Blog
              </Link>
              <Link to="/help" className="hover:text-foreground">
                Help
              </Link>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Legal</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground">
                Privacy policy
              </Link>
              <Link to="/terms" className="hover:text-foreground">
                Terms of service
              </Link>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
