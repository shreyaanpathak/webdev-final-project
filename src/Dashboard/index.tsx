// Modified index.tsx
import { useState } from "react";
import "./chartSetup";
import { DashboardHeader } from "./DashboardHeader";
import { PortfolioOverview } from "./PortfolioOverview";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { InsightsPanel } from "./InsightsPanel";
import { TransactionsPanel } from "./TransactionsPanel";
import { GoalTracking } from "./GoalTracking";
import { AnalyticsAndAI } from "./AnalyticsAndAI";
import { RealEstateWidget } from "./RealEstateWidget";
import { MarketResearch } from "./MarketResearch";
import { Tab } from '@headlessui/react';
import { motion } from "framer-motion";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
            <DashboardHeader />

            <div className="flex-1 relative">
                <div className="max-w-[1920px] mx-auto p-8">
                    <Tab.Group>
                        <Tab.List className="flex space-x-4 p-1 bg-[#141414] rounded-xl mb-8">
                            <Tab className={({ selected }) =>
                                `px-4 py-2 rounded-lg font-medium transition-all duration-200
                                ${selected 
                                    ? 'bg-[#10B981] text-white'
                                    : 'text-[#10B981] hover:bg-[#10B981]/10'
                                }`
                            }>
                                Overview
                            </Tab>
                            <Tab className={({ selected }) =>
                                `px-4 py-2 rounded-lg font-medium transition-all duration-200
                                ${selected 
                                    ? 'bg-[#10B981] text-white'
                                    : 'text-[#10B981] hover:bg-[#10B981]/10'
                                }`
                            }>
                                Transactions & Analytics
                            </Tab>
                            <Tab className={({ selected }) =>
                                `px-4 py-2 rounded-lg font-medium transition-all duration-200
                                ${selected 
                                    ? 'bg-[#10B981] text-white'
                                    : 'text-[#10B981] hover:bg-[#10B981]/10'
                                }`
                            }>
                                Market & Real Estate
                            </Tab>
                        </Tab.List>

                        <Tab.Panels>
                            <Tab.Panel>
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.1
                                            }
                                        }
                                    }}
                                >
                                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                                        <div className="xl:col-span-3">
                                            <div className="space-y-8">
                                                <PortfolioOverview />
                                                <PerformanceMetrics />
                                            </div>
                                        </div>
                                        <div className="xl:col-span-1">
                                            <div className="space-y-8">
                                                <InsightsPanel />
                                                <GoalTracking />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Tab.Panel>

                            <Tab.Panel>
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.1
                                            }
                                        }
                                    }}
                                >
                                    <div className="space-y-8">
                                        <TransactionsPanel />
                                        <AnalyticsAndAI />
                                    </div>
                                </motion.div>
                            </Tab.Panel>

                            <Tab.Panel>
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.1
                                            }
                                        }
                                    }}
                                >
                                    <div className="space-y-8">
                                        <MarketResearch />
                                        <RealEstateWidget />
                                    </div>
                                </motion.div>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        </div>
    );
}