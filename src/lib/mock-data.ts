export const user = {
  name: "Jamie Davis",
  firstName: "Jamie",
  initials: "JD",
  email: "jamie.davis@example.com",
  plan: "Personal account",
};

export const inr = (n: number) =>
  "₹" + Math.abs(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const summary = {
  totalBalance: 284680,
  balanceChange: 8.4,
  income: 120000,
  spent: 68400,
  budget: 85000,
};

export type Category = {
  name: string;
  amount: number;
  pct: number;
  color: string;
  budget: number;
};

export const categories: Category[] = [
  { name: "Housing", amount: 32000, pct: 34, color: "var(--chart-1)", budget: 35000 },
  { name: "Food & dining", amount: 16400, pct: 24, color: "var(--chart-2)", budget: 18000 },
  { name: "Transport", amount: 10900, pct: 16, color: "var(--chart-3)", budget: 12000 },
  { name: "Entertainment", amount: 4300, pct: 8, color: "var(--chart-4)", budget: 6000 },
  { name: "Other", amount: 8100, pct: 12, color: "var(--chart-5)", budget: 14000 },
];

export type Txn = {
  id: string;
  merchant: string;
  category: string;
  date: string;
  amount: number;
  account: string;
};

export const transactions: Txn[] = [
  {
    id: "t1",
    merchant: "Nature's Basket",
    category: "Food & dining",
    date: "Today, 10:42 AM",
    amount: -2840,
    account: "HDFC Debit",
  },
  {
    id: "t2",
    merchant: "Salary deposit",
    category: "Income",
    date: "Sep 01, 9:00 AM",
    amount: 120000,
    account: "HDFC Savings",
  },
  {
    id: "t3",
    merchant: "Netflix",
    category: "Entertainment",
    date: "Aug 30, 8:15 PM",
    amount: -649,
    account: "ICICI Credit",
  },
  {
    id: "t4",
    merchant: "Uber",
    category: "Transport",
    date: "Aug 30, 6:02 PM",
    amount: -412,
    account: "HDFC Debit",
  },
  {
    id: "t5",
    merchant: "Apartment rent",
    category: "Housing",
    date: "Aug 28, 11:00 AM",
    amount: -32000,
    account: "HDFC Savings",
  },
  {
    id: "t6",
    merchant: "Blue Tokai Coffee",
    category: "Food & dining",
    date: "Aug 27, 9:20 AM",
    amount: -520,
    account: "ICICI Credit",
  },
  {
    id: "t7",
    merchant: "Freelance payout",
    category: "Income",
    date: "Aug 25, 4:30 PM",
    amount: 18500,
    account: "HDFC Savings",
  },
  {
    id: "t8",
    merchant: "Indigo Airlines",
    category: "Transport",
    date: "Aug 22, 1:12 PM",
    amount: -8460,
    account: "ICICI Credit",
  },
  {
    id: "t9",
    merchant: "Amazon",
    category: "Other",
    date: "Aug 20, 7:45 PM",
    amount: -3120,
    account: "ICICI Credit",
  },
  {
    id: "t10",
    merchant: "Cult.fit membership",
    category: "Other",
    date: "Aug 18, 8:00 AM",
    amount: -1999,
    account: "HDFC Debit",
  },
];

export const goals = [
  { id: "g1", name: "Emergency fund", saved: 162000, target: 250000, eta: "Feb 2027" },
  { id: "g2", name: "Japan trip", saved: 59000, target: 125000, eta: "Jun 2027" },
  { id: "g3", name: "New laptop", saved: 42000, target: 90000, eta: "Dec 2026" },
  { id: "g4", name: "Home down payment", saved: 310000, target: 1500000, eta: "2029" },
];

export const accounts = [
  { id: "a1", name: "HDFC Savings", type: "Bank account", number: "•••• 4821", balance: 214300 },
  { id: "a2", name: "HDFC Debit", type: "Debit card", number: "•••• 7719", balance: 38200 },
  { id: "a3", name: "ICICI Credit", type: "Credit card", number: "•••• 2043", balance: -12480 },
  { id: "a4", name: "Cash wallet", type: "Cash", number: "—", balance: 6600 },
];

export const monthlyFlow = [
  { month: "Apr", income: 118000, spent: 71200 },
  { month: "May", income: 121000, spent: 66400 },
  { month: "Jun", income: 119500, spent: 74100 },
  { month: "Jul", income: 126000, spent: 69800 },
  { month: "Aug", income: 138500, spent: 77600 },
  { month: "Sep", income: 120000, spent: 68400 },
];

export const insights = [
  {
    title: "You're spending 12% less than last month",
    body: "Food & dining dropped by ₹2,240. Keep the streak going and you'll hit your Japan trip goal a month early.",
    tone: "positive" as const,
  },
  {
    title: "Transport is trending up",
    body: "Three ride bookings above ₹400 this week. A weekly metro pass would save roughly ₹1,100 a month.",
    tone: "warning" as const,
  },
  {
    title: "Two subscriptions renew this week",
    body: "Netflix (₹649) and Cult.fit (₹1,999) renew before Sep 10. Pause one to free up budget headroom.",
    tone: "neutral" as const,
  },
];
