import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Budgetly" },
      {
        name: "description",
        content: "Get in touch with the Budgetly team for support, feedback, or partnerships.",
      },
      { property: "og:title", content: "Contact — Budgetly" },
      { property: "og:description", content: "We are here to help with questions about Budgetly." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Message sent. We will get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-w-0">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="text-4xl font-extrabold">Contact us</h1>
        <p className="mt-2 text-muted-foreground">
          Have a question or feedback? Send us a message.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="surface p-6">
            <Mail className="h-5 w-5" />
            <p className="mt-3 text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">hello@budgetly.app</p>
          </div>
          <div className="surface p-6">
            <div className="grid gap-4">
              <input
                className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className="min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={submit}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Send message
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Back to home
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
