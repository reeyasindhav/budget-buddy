import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  Target,
  CreditCard,
  Settings,
  TrendingUp,
  Bell,
  Menu,
  X,
  LogOut,
  Wallet,
  HeartPulse,
  TrendingUp as TrendingUpIcon,
  BarChart3,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { user } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/SiteHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications as notificationsSeed } from "@/lib/mock-data";

const workspace = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/budgets", label: "Budgets", icon: PiggyBank },
  { to: "/goals", label: "Savings goals", icon: Target },
] as const;

const manage = [
  { to: "/accounts", label: "Accounts", icon: CreditCard },
  { to: "/debt", label: "Debt manager", icon: Wallet },
  { to: "/investments", label: "Investments", icon: TrendingUpIcon },
  { to: "/health", label: "Financial health", icon: HeartPulse },
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
  const [notifications, setNotifications] = useState(notificationsSeed);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const sidebarInner = (
    <div className="flex flex-col bg-sidebar px-4 py-6">
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
          <TrendingUp className="h-5 w-5" />
        </span>
        <p className="font-semibold">Make your money work</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Set a goal and build better habits, one month at a time.
        </p>
        <p className="mt-4 text-sm font-medium text-accent-foreground">Explore insights →</p>
      </Link>

      <div className="mt-auto flex items-center gap-3 border-t border-sidebar-border pt-5">
        <Link
          to="/settings"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          {user.initials}
        </Link>
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
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] shrink-0 border-r border-sidebar-border lg:block">
        <div className="flex h-full flex-col overflow-y-auto bg-sidebar px-4 py-6">
          {sidebarInner}
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-primary/30" onClick={() => setOpen(false)} />
          <div className="animate-fade-in absolute inset-y-0 left-0 w-[280px] border-r border-sidebar-border">
            <div className="flex h-full flex-col overflow-y-auto bg-sidebar px-4 py-6">
              {sidebarInner}
            </div>
          </div>
        </div>
      )}

      <div className="min-w-0 flex-1 lg:ml-[280px]">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Notifications"
                  className="relative rounded-full p-2 text-primary transition-colors hover:bg-secondary"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Mark all read
                    </button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notifications.slice(0, 5).map((n) => (
                    <DropdownMenuItem key={n.id} asChild>
                      <Link to="/notifications" className="flex flex-col gap-1">
                        <span
                          className={`text-sm ${n.read ? "text-muted-foreground" : "font-semibold"}`}
                        >
                          {n.title}
                        </span>
                        <span className="text-xs text-muted-foreground">{n.body}</span>
                        <span className="text-xs text-muted-foreground">{n.time}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/notifications" className="text-sm font-semibold">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              {user.initials}
            </Link>
          </div>
        </header>
        <main className="px-5 py-8 lg:px-10">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
