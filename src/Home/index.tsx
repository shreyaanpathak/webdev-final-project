import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
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

    const timelineEvents = [
        {
            year: "2021",
            title: "Platform Launch",
            description: "First release of our core analytics platform"
        },
        {
            year: "2022",
            title: "AI Integration",
            description: "Advanced ML-powered insights introduced"
        },
        {
            year: "2023",
            title: "Mobile App",
            description: "Seamless mobile experience launched"
        },
        {
            year: "2024",
            title: "Global Expansion",
            description: "Available in 30+ countries worldwide"
        }
    ];

    const { scrollYProgress } = useScroll();
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

    return (
        <main className="w-full overflow-x-hidden">
            <div className="relative bg-gradient-to-b from-base-950 via-base-900 to-base-800">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-yellow-900/10 animate-gradient-shift"></div>
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

                <div className="min-h-screen flex items-center justify-center relative">
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
                                className="text-2xl text-base-content/80 mb-12"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                            >
                                Empower your financial future with AI-driven insights, real-time portfolio tracking,
                                and expert analysis. Join thousands of investors making smarter decisions with our
                                cutting-edge platform.
                            </motion.p>
                            <div className="flex justify-center gap-6">
                                <Link to="/Account/Signup">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-lg bg-green-600 hover:bg-green-700 text-white border-0 px-8"
                                    >
                                        Get Started
                                    </motion.button>
                                </Link>
                                <Link to="/dashboard">
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

                <section className="py-20 px-6 bg-base-800/50">
                    <motion.div
                        className="container mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <div className="stats stats-vertical lg:stats-horizontal shadow w-full bg-base-900/50 text-white">
                            {stats.map((stat, index) => (
                                <motion.div
                                    className="stat"
                                    key={index}
                                    variants={itemVariants}
                                >
                                    <div className="stat-title text-base-content/60">{stat.title}</div>
                                    <div className="stat-value text-green-500">{stat.value}</div>
                                    <div className="stat-desc text-base-content/40">{stat.description}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                <section className="py-20 px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="container mx-auto"
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
                                        scale: 1.05,
                                        transition: { type: "spring", stiffness: 300 }
                                    }}
                                    className="card bg-base-800/50 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                                >
                                    <div className="card-body">
                                        <motion.div
                                            className="text-green-500 mb-4"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            {feature.icon}
                                        </motion.div>
                                        <h2 className="card-title text-white text-2xl">{feature.title}</h2>
                                        <p className="text-base-content/70">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>
                {/* Timeline */}
                <section className="py-20 px-6 bg-base-800/50">
                    <motion.div
                        className="container mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center mb-16">
                            Our <span className="text-yellow-500">Journey</span>
                        </motion.h2>
                        <ul className="timeline timeline-vertical lg:timeline-horizontal p-8">
                            {timelineEvents.map((event, index) => (
                                <li key={index} className="relative">
                                    <motion.div
                                        variants={itemVariants}
                                        className="timeline-start"
                                    >
                                        <div className="bg-base-900/90 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-base-700/50 hover:border-green-500/50 transition-all duration-300">
                                            <time className="font-mono text-green-500 text-sm tracking-wider block mb-2">{event.year}</time>
                                            <div className="text-xl font-bold text-white mb-3">{event.title}</div>
                                            <p className="text-base-content/70 text-sm">{event.description}</p>
                                        </div>
                                    </motion.div>
                                    <div className="timeline-middle">
                                        <motion.div
                                            className="w-4 h-4 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full shadow-lg border-4 border-base-900"
                                            whileHover={{ scale: 1.2 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        />
                                    </div>
                                    <div className="timeline-end md:hidden"></div>
                                    <hr className="bg-gradient-to-r from-green-500/20 to-yellow-500/20" />
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </section>
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