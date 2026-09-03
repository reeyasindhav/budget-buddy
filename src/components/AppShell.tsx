import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  Target,
  CreditCard,
  Settings,
  Sparkles,
  Bell,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { user } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const workspace = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/budgets", label: "Budgets", icon: PiggyBank },
  { to: "/goals", label: "Savings goals", icon: Target },
] as const;

const manage = [
  { to: "/accounts", label: "Accounts", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavList({
  items,
  label,
  onNavigate,
}: {
  items: readonly { to: string; label: string; icon: React.ElementType }[];
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mb-8">
      <p className="mb-3 px-4 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300",
                active
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AppShell({
  children,
  title,
  date = "Wednesday, September 3, 2026",
}: {
  children: ReactNode;
  title?: string;
  date?: string;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar px-4 py-6">
      <Link to="/" className="mb-10 flex items-center gap-3 px-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <PiggyBank className="h-5 w-5" />
        </span>
        <span className="text-lg font-extrabold tracking-tight">budgetly</span>
      </Link>

      <NavList items={workspace} label="WORKSPACE" onNavigate={() => setOpen(false)} />
      <NavList items={manage} label="MANAGE" onNavigate={() => setOpen(false)} />

      <Link
        to="/insights"
        onClick={() => setOpen(false)}
        className="hover-lift rounded-2xl bg-sidebar-accent p-5"
      >
        <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-card text-accent">
          <Sparkles className="h-5 w-5" />
        </span>
        <p className="font-semibold">Make your money work</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Set a goal and build better habits, one month at a time.
        </p>
        <p className="mt-4 text-sm font-medium text-accent-foreground">Explore insights →</p>
      </Link>

      <div className="mt-auto flex items-center gap-3 border-t border-sidebar-border pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {user.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.plan}</p>
        </div>
        <button
          aria-label="Sign out"
          onClick={() => navigate({ to: "/login" })}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full">
      <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 border-r border-sidebar-border lg:block">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-primary/30" onClick={() => setOpen(false)} />
          <div className="animate-fade-in absolute inset-y-0 left-0 w-[280px] border-r border-sidebar-border">
            {sidebar}
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              className="rounded-full p-2 hover:bg-secondary lg:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <p className="text-sm text-muted-foreground">{title ?? date}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="relative rounded-full p-2 text-primary transition-colors hover:bg-secondary"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
            </button>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {user.initials}
            </span>
          </div>
        </header>
        <main className="px-5 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
