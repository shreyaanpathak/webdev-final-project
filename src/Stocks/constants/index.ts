export const COLORS = {
  primary: "#FFB800",
  primaryHover: "#E6A500",
  background: "#111111",
  cardBg: "#1A1A1A",
  success: "#10B981",
  danger: "#EF4444",
  border: "rgba(255, 184, 0, 0.2)",
  green: "#10B981",
  greenDark: "#064E3B",
  greenLight: "#34D399",
  greenBg: "rgba(16, 185, 129, 0.1)",
};

export const mockNews = [
  {
    id: 1,
    title: "Tesla Announces New Factory in Texas",
    source: "Financial Times",
    time: "2h ago",
    summary:
      "Tesla plans to open a new gigafactory in Austin, Texas, expanding its manufacturing capacity.",
    impact: "positive",
  },
  {
    id: 2,
    title: "Apple Reports Record Q1 Earnings",
    source: "Bloomberg",
    time: "4h ago",
    summary:
      "Apple Inc. beats market expectations with strong iPhone sales and services growth.",
    impact: "positive",
  },
  {
    id: 3,
    title: "Market Volatility Increases Amid Fed Decisions",
    source: "Reuters",
    time: "6h ago",
    summary:
      "Global markets show increased volatility as Federal Reserve maintains hawkish stance.",
    impact: "neutral",
  },
];

export const popularStocks = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "TSLA", name: "Tesla, Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "AMZN", name: "Amazon.com, Inc." },
];

export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
