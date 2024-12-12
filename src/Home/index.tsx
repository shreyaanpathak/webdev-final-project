import React from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPortfolioSummary, getTransactions, type PortfolioSummary, type Transaction } from '../Dashboard/client';
import { getMarketOverview } from '../Stocks/client';


const PortfolioSummarySection = () => {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [summary, setSummary] = useState<PortfolioSummary | null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            if (!currentUser?._id) return;
            try {
                const data = await getPortfolioSummary(currentUser._id);
                setSummary(data);
            } catch (error) {
                console.error('Failed to fetch portfolio summary:', error);
            }
        };
        fetchSummary();
    }, [currentUser?._id]);

    if (!summary) return <div className="text-gray-400">Loading summary...</div>;

    return (
        <>
            <div className="stat-group grid grid-cols-2 gap-4">
                <div className="stat bg-black/20 col-span-1 rounded-lg p-4">
                    <div className="stat-title text-gray-400">Total Value</div>
                    <div className="stat-value text-sm text-green-500">
                        ${summary.total_value.toLocaleString()}
                    </div>
                </div>
                <div className="stat bg-black/20 col-span-1 rounded-lg p-4">
                    <div className="stat-title text-gray-400">Total Gain/Loss</div>
                    <div className={`stat-value text-sm ${summary.total_gain_loss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {summary.total_gain_loss_percentage.toFixed(2)}%
                    </div>
                </div>
            </div>
        </>
    );
};

const MarketOverview = () => {
    const [marketData, setMarketData] = useState({
        market_open: false,
        sp500: 0,
        tradingVolume: 0
    });

    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const data = await getMarketOverview();
                setMarketData({
                    market_open: data.market_open,
                    sp500: data.sp500.value,
                    tradingVolume: data.tradingVolume
                });
            } catch (error) {
                console.error('Failed to fetch market overview:', error);
            }
        };
        
        fetchMarketData();
        // Refresh every minute
        const interval = setInterval(fetchMarketData, 60000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-green-500">Market Overview</h3>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-black/20 rounded-lg p-2">
                    <div className="text-gray-400 text-sm">Market Status</div>
                    <div className={`font-medium ${marketData.market_open ? 'text-green-500' : 'text-red-500'}`}>
                        {marketData.market_open ? 'Open' : 'Closed'}
                    </div>
                </div>
                <div className="bg-black/20 rounded-lg p-2">
                    <div className="text-gray-400 text-sm">S&P 500</div>
                    <div className="text-white font-medium">
                        {marketData.sp500.toLocaleString()}
                    </div>
                </div>
                <div className="bg-black/20 rounded-lg p-2 col-span-2">
                    <div className="text-gray-400 text-sm">Trading Volume</div>
                    <div className="text-white font-medium">
                        {(marketData.tradingVolume / 1000000).toFixed(1)}M
                    </div>
                </div>
            </div>
        </div>
    );
};

const CollapsiblePortfolioCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div className="absolute top-8 right-8 z-20">
            <AnimatePresence>
                {isExpanded ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 40 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 40 }}
                        className="card bg-black/40 shadow-xl backdrop-blur-sm w-80"
                    >
                        <div className="card-body p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-yellow-500">
                                    Market Stats
                                </h3>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <MarketOverview />
                                
                                {currentUser && (
                                    <>
                                        <div className="border-t border-gray-700 my-4" />
                                        <PortfolioSummarySection />
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        onClick={() => setIsExpanded(true)}
                        className="rounded-full p-3 bg-black/40 hover:bg-green-600 shadow-lg backdrop-blur-sm transition-colors duration-200"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-white" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                        </svg>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Home() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.4
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const stats = [
        { value: "50K+", title: "Active Users", description: "Trusted by thousands" },
        { value: "$2.5M", title: "Assets Tracked", description: "Real-time monitoring" },
        { value: "98%", title: "Satisfaction Rate", description: "From our users" },
        { value: "24/7", title: "Support", description: "Always here to help" }
    ];

    const { scrollYProgress } = useScroll({
        offset: ["start start", "end end"]
    });
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

    return (
        <main className="w-full overflow-x-hidden">
            <div className="page-wrapper">
                <div className="relative bg-[#0a0a0a]">
                    <motion.div
                        className="fixed top-0 left-0 right-0 h-[6px] bg-gradient-to-r from-green-600 to-yellow-500 origin-left z-50"
                        style={{ scaleX: scrollYProgress }}
                    />

                    <motion.div
                        style={{
                            opacity: opacityProgress,
                            scale: scaleProgress,
                        }}
                        className="fixed top-40 right-20 w-96 h-96 bg-green-600/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        style={{
                            opacity: opacityProgress,
                            scale: scaleProgress,
                        }}
                        className="fixed bottom-40 left-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
                    />

                    {/* Hero Section with Parallax */}
                    <Parallax
                        blur={0}
                        bgImageAlt="hero background"
                        strength={200}
                        className="relative"
                    >
                        <div className="min-h-screen flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

                            {/* User Profile Panel */}
                            <CollapsiblePortfolioCard />
                            <motion.div
                                className="text-center px-6 relative z-10"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <div className="max-w-4xl mx-auto">
                                    <motion.h1
                                        className="text-8xl font-bold mb-8 leading-tight"
                                        initial={{ scale: 0.95 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <motion.span
                                            className="text-green-500 inline-block"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Financial
                                        </motion.span>{' '}
                                        <motion.span
                                            className="text-yellow-500 inline-block"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Intelligence
                                        </motion.span>{' '}
                                        <motion.span
                                            className="text-white inline-block"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Hub
                                        </motion.span>
                                    </motion.h1>
                                    <motion.p
                                        className="text-2xl text-gray-400 mb-12"
                                        variants={fadeInUp}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        Empower your financial future with AI-driven insights, real-time portfolio tracking,
                                        and expert analysis. Join thousands of investors making smarter decisions with our
                                        cutting-edge platform.
                                    </motion.p>
                                    <div className="flex justify-center gap-6">
                                        <Link to={currentUser ? "/Dashboard" : "/Account/Signup"}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="btn btn-lg bg-green-600 hover:bg-green-700 text-white border-0 px-8"
                                            >
                                                Get Started
                                            </motion.button>
                                        </Link>
                                        <Link to="/Dashboard">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="btn btn-lg btn-outline text-yellow-500 hover:bg-yellow-500 hover:text-base-100 px-8"
                                            >
                                                Explore Dashboard
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </Parallax>

                    <Parallax blur={0} strength={300} className="relative">
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                        <section className="py-20 px-6 relative">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                className="container mx-auto relative z-10"
                            >
                                <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center mb-16">
                                    <span className="text-green-500">Powerful</span> Features
                                </motion.h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            whileHover={{
                                                scale: 1.05
                                            }}
                                            className="card bg-black/30 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <div className="card-body">
                                                <motion.div
                                                    className="text-green-500 mb-4"
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    {feature.icon}
                                                </motion.div>
                                                <h2 className="card-title text-white text-2xl">{feature.title}</h2>
                                                <p className="text-gray-400">{feature.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </section>
                    </Parallax>

                    {/* Stats Section */}
                    <section className="py-20 px-6 relative bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
                        <motion.div
                            className="container mx-auto relative z-10 max-w-[95%]"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-black/30 backdrop-blur-lg text-white">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        className="stat"
                                        key={index}
                                        variants={itemVariants}
                                    >
                                        <div className="stat-title text-gray-400">{stat.title}</div>
                                        <div className="stat-value text-green-500">{stat.value}</div>
                                        <div className="stat-desc text-gray-500">{stat.description}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>
                </div>
            </div>
        </main>
    );
}

const features = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        title: "AI-Powered Analytics",
        description: "Get personalized investment recommendations and portfolio insights powered by advanced machine learning algorithms"
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
        title: "Real-Time Tracking",
        description: "Monitor your investments and market trends in real-time with our advanced portfolio tracking system"
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        title: "Financial Education",
        description: "Access personalized learning modules and expert insights to enhance your financial knowledge"
    }
];
