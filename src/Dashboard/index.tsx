import { useState } from "react";
import "./chartSetup";
import { DashboardHeader } from "./DashboardHeader";
import { PortfolioOverview } from "./PortfolioOverview";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { InsightsPanel } from "./InsightsPanel";
import { TransactionsPanel } from "./TransactionsPanel";
import { GoalTracking } from "./GoalTracking";
import { motion } from "framer-motion";

// index.tsx
export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
            <DashboardHeader />

            <div className="flex-1 relative">
                <div className="max-w-[1920px] mx-auto p-8">
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        <div className="xl:col-span-3 space-y-8">
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
                                    <PortfolioOverview />
                                    <PerformanceMetrics />
                                    <TransactionsPanel />
                                </div>

                            </motion.div>
                        </div>

                        <div className="space-y-8">
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
                                    <InsightsPanel />
                                    <GoalTracking />
                                </div>

                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}