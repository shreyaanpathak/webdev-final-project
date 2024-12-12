// Modified index.tsx
import { useSelector } from "react-redux";
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
import type { RootState } from "../store";
import { IoMdLock } from "react-icons/io";


export default function Dashboard() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isRegular = currentUser?.membership === 'REGULAR';
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
            <DashboardHeader />

            <div className="flex-1 relative">
                <div className="max-w-[1920px] mx-auto p-8">
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 border border-[#2A2A2A] bg-[#141414] rounded-lg p-1 mb-8 w-fit">
                            <Tab className={({ selected }) =>
                                `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
        ${selected
                                    ? 'bg-[#2A2A2A] text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
                                }`
                            }>
                                Overview
                            </Tab>
                            <Tab disabled={isRegular} className={({ selected }) =>
                                `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5
        ${selected
                                    ? 'bg-[#2A2A2A] text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
                                }
        ${isRegular && 'opacity-50 cursor-not-allowed'}`
                            }>
                                {isRegular && <IoMdLock className="text-lg" />}
                                Transactions & Analytics
                            </Tab>
                            <Tab disabled={isRegular} className={({ selected }) =>
                                `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5
        ${selected
                                    ? 'bg-[#2A2A2A] text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
                                }
        ${isRegular && 'opacity-50 cursor-not-allowed'}`
                            }>
                                {isRegular && <IoMdLock className="text-lg" />}
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
