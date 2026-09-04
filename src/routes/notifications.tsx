import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { notifications as seed } from "@/lib/mock-data";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Budgetly" },
      {
        name: "description",
        content: "Your notifications: budget alerts, goal milestones, and account updates.",
      },
      { property: "og:title", content: "Notifications — Budgetly" },
      { property: "og:description", content: "Stay on top of Budgetly alerts and updates." },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  const [items, setItems] = useState(seed);

  const markAll = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const clearAll = () => {
    setItems([]);
    toast.success("Notifications cleared");
  };

  return (
    <AppShell title="Notifications">
      <div className="animate-fade-up flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-4xl font-extrabold">Notifications</h1>
          <p className="mt-2 text-muted-foreground">
            {items.filter((n) => !n.read).length} unread alerts
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={markAll}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <CheckCheck className="h-4 w-4" /> Mark all read
          </button>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <Trash2 className="h-4 w-4" /> Clear all
          </button>
        </div>
      </div>

      <div className="mt-8 surface divide-y divide-border">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">No notifications</p>
            <p className="mt-1 text-sm text-muted-foreground">You are all caught up.</p>
          </div>
        ) : (
          items.map((n) => (
            <div
              key={n.id}
              className={`flex flex-col gap-1 p-5 transition-colors hover:bg-secondary/50 ${n.read ? "opacity-70" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{n.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                </div>
                <span className="whitespace-nowrap text-xs text-muted-foreground">{n.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
