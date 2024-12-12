// Details.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaRobot, FaExchangeAlt } from "react-icons/fa";
import { Chart } from "../Stocks/Chart";
import * as client from "../Stocks/client"; // Changed from stocksClient to client
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { IoMdLock } from "react-icons/io";

interface StockDetails {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
  high: number;
  low: number;
  volume?: number;
  marketCap?: number;
  name?: string;
  currency?: string;
}

interface OptionsChainData {
  calls: OptionContract[];
  puts: OptionContract[];
  underlying_price: number;
}

interface OptionContract {
  strike: number;
  premium: number;
  expiration: string;
  type: "CALL" | "PUT";
}

export default function Details() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isRegular = currentUser?.membership === 'REGULAR';
  const { symbol } = useParams<{ symbol: string }>();
  const [stockData, setStockData] = useState<StockDetails | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [optionsChain, setOptionsChain] = useState<OptionsChainData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lorem: any = `Lorem ipsum odor amet, consectetuer adipiscing elit. Orci diam efficitur semper fermentum mi est quisque torquent. Dictumst nisl aptent euismod habitant tincidunt tellus auctor neque. Lobortis dolor diam fringilla mi proin. Mi cras aliquet iaculis semper dignissim penatibus! Luctus eget ut arcu quam donec pharetra. Platea vestibulum cubilia lacus nibh ridiculus metus donec pellentesque. Justo vel placerat nascetur sagittis euismod.

Posuere urna dictumst vehicula eros aliquet nam interdum semper. Fermentum sagittis felis tempus nascetur nisl dolor sed. Arcu consequat lorem convallis; at viverra nisl blandit. Sem ut adipiscing porta pharetra ullamcorper consectetur, mi viverra. Tempus nullam class gravida pharetra proin fusce; conubia efficitur. Velit lobortis tristique commodo eleifend viverra viverra gravida? Aptent arcu maecenas quisque cras, volutpat imperdiet cursus. Per adipiscing ligula erat conubia mus sit hendrerit fusce. Nibh eleifend convallis consectetur integer hac potenti.

Curabitur mauris nullam congue aliquet donec porta. Morbi fames amet primis fermentum proin vel maecenas torquent scelerisque. Massa class per etiam a ante. Dis ut et ad malesuada mattis vel fames. Cursus fames dapibus tincidunt pellentesque tempor sem facilisi augue. Dis ullamcorper rhoncus pretium; non proin consectetur. Malesuada volutpat praesent fringilla ac elementum faucibus donec. Nam potenti praesent magnis nisl; elementum quam porttitor nunc. Erat ante ultrices feugiat platea id conubia.

Proin arcu ridiculus class nulla maecenas rutrum lectus. Diam metus neque quisque class ultricies quisque lectus. Donec ullamcorper sed habitasse, sagittis massa fames turpis. Dui hac class ut nascetur rutrum enim ridiculus ex quisque. Elit vehicula vivamus auctor sollicitudin magnis metus elit. Rhoncus maecenas blandit posuere ac fermentum quis taciti. Aptent lacus tristique inceptos pharetra consectetur scelerisque.

Fames penatibus eros magnis platea ultrices nascetur, quam nibh integer. Pretium ullamcorper sagittis posuere, dolor felis proin taciti blandit. Nascetur at sollicitudin quam elit est malesuada proin. Quisque vulputate vitae ac aenean cras scelerisque himenaeos facilisis. Taciti maximus laoreet id venenatis quisque tincidunt. Venenatis nisi auctor accumsan quis adipiscing sem himenaeos. Facilisi pulvinar scelerisque adipiscing finibus dolor efficitur congue?`

  const fetchData = async () => {
    if (!symbol) {
      setError("No symbol provided");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [quote, options] = await Promise.all([
        client.getQuote(symbol),
        client.getOptionsChain(symbol),
      ]);

      setStockData(quote);
      setOptionsChain(options);

      try {
        const analysisPrompt = `
          Provide a comprehensive analysis of ${symbol} stock including:
          1. Company Overview: Brief description of the company and its business model
          2. Market Position: Industry standing and competitive advantages
          3. Financial Health: Key financial metrics and recent performance
          4. Technical Analysis: Current price trends and key levels
          5. Investment Outlook: Potential opportunities and risks
          
          Current stock price: $${quote.price}
          Today's change: ${quote.change} (${quote.percentChange}%)
        `;

        const analysis = !isRegular ? await client.getChatAnalysis(analysisPrompt) : lorem;
        setAiAnalysis(analysis);
      } catch (analysisError) {
        console.error("AI Analysis error:", analysisError);
        setAiAnalysis(
          "AI Analysis temporarily unavailable. Please try again later."
        );
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  // Options Chain Summary Component
  const OptionsChainSummary = ({ data }: { data: OptionsChainData }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20"
    >
      <h3 className="text-xl font-bold text-[#FFB800] mb-4 flex items-center gap-2">
        <FaExchangeAlt /> Options Overview
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-[#10B981] mb-2">Calls</h4>
          <div className="space-y-2">
            {data.calls.slice(0, 5).map((call, index) => (
              <div key={index} className="bg-[#0D1F17] p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-[#10B981]">Strike ${call.strike}</span>
                  <span className="text-white">${call.premium}</span>
                </div>
                <div className="text-xs text-[#10B981]/60">
                  {call.expiration}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-[#10B981] mb-2">Puts</h4>
          <div className="space-y-2">
            {data.puts.slice(0, 5).map((put, index) => (
              <div key={index} className="bg-[#0D1F17] p-3 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-[#EF4444]">Strike ${put.strike}</span>
                  <span className="text-white">${put.premium}</span>
                </div>
                <div className="text-xs text-[#10B981]/60">
                  {put.expiration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] p-8 flex items-center justify-center">
        <div className="text-[#10B981]">Loading...</div>
      </div>
    );
  }

  if (error || !stockData) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] p-8 flex items-center justify-center">
        <div className="text-red-500">
          {error || "Failed to load stock details"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      <div className="max-w-[1920px] mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-[#FFB800] mb-2">
                {symbol}
              </h1>
              <div className="text-6xl font-bold text-white mb-4">
                ${stockData.price.toFixed(2)}
              </div>
              <div
                className={`text-xl ${stockData.change >= 0 ? "text-[#10B981]" : "text-[#EF4444]"
                  }`}
              >
                {stockData.change >= 0 ? "↑" : "↓"}
                {Math.abs(stockData.change).toFixed(2)} (
                {stockData.percentChange.toFixed(2)}%)
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-outline btn-lg text-[#10B981] border-[#10B981]"
            >
              <FaStar className="mr-2" /> Add to Watchlist
            </motion.button>
          </div>
        </motion.div>

        {/* Chart Section */}
        <Chart selectedStock={symbol} />

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "24h High", value: `$${stockData.high.toFixed(2)}` },
            { label: "24h Low", value: `$${stockData.low.toFixed(2)}` },
            {
              label: "Volume",
              value: stockData.volume?.toLocaleString() ?? "N/A",
            },
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] p-6 rounded-xl border border-[#10B981]/20"
            >
              <div className="text-[#10B981] mb-2">{metric.label}</div>
              <div className="text-2xl font-bold text-white">
                {metric.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Options Chain Summary */}
        {optionsChain && <OptionsChainSummary data={optionsChain} />}
        {/* AI Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1A1A] rounded-xl p-6 border border-[#10B981]/20 hover:border-[#10B981]/40 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-[#0D1F17] p-3 rounded-full">
                <FaRobot className="text-2xl text-[#FFB800] animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-[#FFB800]">AI Analysis</h3>
            </div><motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fetchData()}
              className="btn btn-sm bg-[#0D1F17] hover:bg-[#0D1F17]/80 text-[#10B981] border border-[#10B981]/20 hover:border-[#10B981] transition-all duration-300 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Analysis
            </motion.button>
          </div>

          <div className="space-y-6">
            <div className="relative">
              {isRegular && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <IoMdLock className="text-[100px]" />
                </div>
              )}
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10B981]"></div>
                  <span className="ml-3 text-[#10B981]">
                    Generating analysis...
                  </span>
                </div>
              ) : aiAnalysis ? (
                <div className="grid gap-6 blur-sm">

                  {aiAnalysis.split("\n\n").map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#0D1F17] rounded-xl p-6 border border-[#10B981]/10 hover:border-[#10B981]/30 transition-all duration-300"
                    >
                      {section.split("\n").map((paragraph, pIndex) => {
                        // Check if the paragraph is a header (starts with a number followed by a dot)
                        const isHeader = /^\d+\./.test(paragraph);

                        return (
                          <div key={pIndex} className={pIndex > 0 ? "mt-4" : ""}>
                            {isHeader ? (
                              <h4 className="text-[#FFB800] font-bold text-lg mb-3">
                                {paragraph}
                              </h4>
                            ) : (
                              <p className="text-[#10B981]/90 leading-relaxed">
                                {paragraph.startsWith("•") ? (
                                  <span className="flex items-start">
                                    <span className="text-[#FFB800] mr-2">•</span>
                                    {paragraph.substring(1)}
                                  </span>
                                ) : (
                                  paragraph
                                )}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-[#0D1F17] rounded-xl border border-[#10B981]/10">
                  <FaRobot className="text-4xl text-[#10B981]/40 mx-auto mb-4" />
                  <p className="text-[#10B981]/80">
                    No analysis available at this time. Click refresh to generate
                    new insights.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
