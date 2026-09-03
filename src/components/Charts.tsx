import { categories, inr, monthlyFlow } from "@/lib/mock-data";

export function DonutChart({ size = 220, stroke = 30 }: { size?: number; stroke?: number }) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const total = categories.reduce((s, c) => s + c.amount, 0);
  let offset = 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {categories.map((c) => {
          const len = (c.amount / total) * circ;
          const dash = `${len - 3} ${circ - len + 3}`;
          const el = (
            <circle
              key={c.name}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={c.color}
              strokeWidth={stroke}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              className="animate-fade-in origin-center transition-[stroke-width] duration-300 hover:stroke-[34]"
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="tabular text-2xl font-bold">{inr(total)}</span>
        <span className="text-xs text-muted-foreground">total spent</span>
      </div>
    </div>
  );
}

export function FlowChart() {
  const max = Math.max(...monthlyFlow.map((m) => m.income));
  return (
    <div className="flex h-[220px] items-end gap-4">
      {monthlyFlow.map((m, i) => (
        <div key={m.month} className="flex flex-1 flex-col items-center gap-3">
          <div className="flex h-full w-full items-end justify-center gap-1.5">
            <div
              className="animate-fade-up w-1/3 rounded-t-lg bg-accent/70 transition-all duration-300 hover:bg-accent"
              style={{ height: `${(m.income / max) * 100}%`, animationDelay: `${i * 70}ms` }}
              title={`Income ${inr(m.income)}`}
            />
            <div
              className="animate-fade-up w-1/3 rounded-t-lg bg-primary transition-all duration-300 hover:opacity-80"
              style={{ height: `${(m.spent / max) * 100}%`, animationDelay: `${i * 70 + 40}ms` }}
              title={`Spent ${inr(m.spent)}`}
            />
          </div>
          <span className="text-xs text-muted-foreground">{m.month}</span>
        </div>
      ))}
    </div>
  );
}

export function ProgressBar({
  value,
  className = "",
  tone = "accent",
  delay = 0,
}: {
  value: number;
  className?: string;
  tone?: "accent" | "primary" | "success" | "destructive";
  delay?: number;
}) {
  const bg = {
    accent: "bg-accent",
    primary: "bg-primary",
    success: "bg-success",
    destructive: "bg-destructive",
  }[tone];
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-muted ${className}`}>
      <div
        className={`animate-grow h-full origin-left rounded-full ${bg}`}
        style={{ width: `${Math.min(value, 100)}%`, animationDelay: `${delay}ms` }}
      />
    </div>
  );
}
