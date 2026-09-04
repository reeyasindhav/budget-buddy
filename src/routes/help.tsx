import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Search, BookOpen, MessageCircle, Mail, Video } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help center — Budgetly" },
      { name: "description", content: "FAQs, guides, and support options for Budgetly." },
      { property: "og:title", content: "Help center — Budgetly" },
      { property: "og:description", content: "Find answers and get support for Budgetly." },
    ],
  }),
  component: HelpCenter,
});

const faqs = [
  {
    q: "How do I add my first transaction?",
    a: "Go to Transactions and tap Add transaction. Enter the merchant, amount, category, and date.",
  },
  {
    q: "Can I connect my bank account?",
    a: "Bank connection is coming soon. Right now you can manually enter income and expenses.",
  },
  {
    q: "How are budgets calculated?",
    a: "Budgets are set per month. We compare your spending by category against the limit you set.",
  },
  {
    q: "Where is my data stored?",
    a: "Your data stays private. We use secure storage and do not sell personal information.",
  },
  {
    q: "How do I reset my password?",
    a: "Use the forgot password flow on the login page to receive a reset link.",
  },
  {
    q: "How can I export my data?",
    a: "Export options are on the roadmap. For now, you can copy data from the Transactions page.",
  },
];

function HelpCenter() {
  return (
    <AppShell title="Help center">
      <div className="animate-fade-up">
        <h1 className="text-4xl font-extrabold">Help center</h1>
        <p className="mt-2 text-muted-foreground">Find answers, guides, and ways to get support.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Link to="/blog" className="surface hover-lift p-6">
            <BookOpen className="h-5 w-5" />
            <p className="mt-3 text-sm font-semibold">Guides and articles</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Step-by-step guides for common tasks.
            </p>
          </Link>
          <Link to="/contact" className="surface hover-lift p-6">
            <MessageCircle className="h-5 w-5" />
            <p className="mt-3 text-sm font-semibold">Contact support</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Send us a message and we will reply soon.
            </p>
          </Link>
          <div className="surface p-6">
            <Mail className="h-5 w-5" />
            <p className="mt-3 text-sm font-semibold">Email us</p>
            <p className="mt-1 text-xs text-muted-foreground">support@budgetly.app</p>
          </div>
        </div>

        <div className="mt-10 surface p-8">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-border">
            {faqs.map((item, i) => (
              <div key={i} className="py-5">
                <p className="font-semibold">{item.q}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
