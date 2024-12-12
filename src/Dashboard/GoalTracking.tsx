import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { cardVariants } from "./constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "./client";
import { FaPiggyBank, FaHome, FaGraduationCap, FaCar, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface Goal {
    id: string;
    name: string;
    current: number;
    target: number;
    percentage: number;
    category: string;
    targetDate: string;
}

export const GoalTracking = () => {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

    const defaultGoals = [
        {
            id: "1",
            name: "Retirement Fund",
            current: 250000,
            target: 500000,
            percentage: 50,
            category: "retirement",
            targetDate: "2050-01-01"
        },
        {
            id: "2",
            name: "Emergency Fund",
            current: 15000,
            target: 20000,
            percentage: 75,
            category: "emergency",
            targetDate: "2024-12-31"
        },
        {
            id: "3",
            name: "House Down Payment",
            current: 40000,
            target: 100000,
            percentage: 40,
            category: "housing",
            targetDate: "2025-06-01"
        }
    ];

    const getGoalIcon = (category: string) => {
        switch (category) {
            case "retirement":
                return <FaPiggyBank />;
            case "housing":
                return <FaHome />;
            case "education":
                return <FaGraduationCap />;
            case "vehicle":
                return <FaCar />;
            default:
                return <FaPiggyBank />;
        }
    };

    const projectionData = {
        labels: ['2024', '2025', '2026', '2027', '2028'],
        datasets: [{
            label: 'Projected Growth',
            data: [250000, 300000, 360000, 432000, 518400],
            borderColor: '#10B981',
            tension: 0.4,
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    color: '#10B981',
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 12
                    }
                }
            }
        },
        scales: {
            y: {
                grid: {
                    color: "rgba(16, 185, 129, 0.05)",
                    drawBorder: false
                },
                ticks: {
                    color: "#10B981",
                    font: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 12
                    }
                }
            },
            x: {
                grid: { display: false },
                ticks: {
                    color: "#10B981",
                    font: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 12
                    }
                }
            }
        }
    };

    useEffect(() => {
        const fetchGoals = async () => {
            if (!currentUser?._id) return;

            try {
                setLoading(true);
                const data = await client.getGoals(currentUser._id);
                if (!data.goals || data.goals.length === 0) {
                    await client.updateGoals(currentUser._id, defaultGoals);
                    setGoals(defaultGoals);
                } else {
                    setGoals(data.goals);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch goals");
            } finally {
                setLoading(false);
            }
        };

        fetchGoals();
    }, [currentUser]);

    const handleAddGoal = async (newGoal: Omit<Goal, "id" | "percentage">) => {
        try {
            const goalToAdd = {
                ...newGoal,
                id: Date.now().toString(),
                percentage: (newGoal.current / newGoal.target) * 100
            };

            const updatedGoals = [...goals, goalToAdd];
            await client.updateGoals(currentUser._id, updatedGoals);
            setGoals(updatedGoals);
            setShowAddModal(false);
        } catch (err) {
            setError("Failed to add goal");
        }
    };

    const handleUpdateGoal = async (updatedGoal: Goal) => {
        try {
            const updatedGoals = goals.map(g => 
                g.id === updatedGoal.id ? {
                    ...updatedGoal,
                    percentage: (updatedGoal.current / updatedGoal.target) * 100
                } : g
            );
            await client.updateGoals(currentUser._id, updatedGoals);
            setGoals(updatedGoals);
            setEditingGoal(null);
        } catch (err) {
            setError("Failed to update goal");
        }
    };

    const handleDeleteGoal = async (goalId: string) => {
        try {
            const updatedGoals = goals.filter(g => g.id !== goalId);
            await client.updateGoals(currentUser._id, updatedGoals);
            setGoals(updatedGoals);
        } catch (err) {
            setError("Failed to delete goal");
        }
    };

    if (loading) {
        return (
            <motion.div variants={cardVariants} className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20">
                <div className="text-[#10B981] text-center">Loading goals...</div>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div variants={cardVariants} className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20">
                <div className="text-red-500 text-center">{error}</div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={cardVariants}
            className="bg-[#141414] rounded-xl p-6 border border-[#10B981]/20 shadow-lg shadow-[#10B981]/5 hover:shadow-xl hover:shadow-[#10B981]/10 transition-shadow duration-300"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#FFB800]">Goal Tracking</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn btn-sm bg-[#10B981] hover:bg-[#0D9668] text-white"
                >
                    <FaPlus className="mr-2" /> Add Goal
                </button>
            </div>

            <div className="space-y-6 mb-8">
                {goals.map((goal) => (
                    <div key={goal.id} className="bg-[#1A1A1A] p-4 rounded-lg border border-[#10B981]/20">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-3">
                                <span className="text-[#10B981] text-xl">
                                    {getGoalIcon(goal.category)}
                                </span>
                                <div>
                                    <span className="text-[#10B981] font-medium">{goal.name}</span>
                                    <div className="text-sm text-[#10B981]/60">
                                        Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditingGoal(goal)}
                                    className="btn btn-sm btn-ghost text-[#10B981]"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDeleteGoal(goal.id)}
                                    className="btn btn-sm btn-ghost text-red-500"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-white">
                                ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                            </span>
                            <span className="text-[#10B981]">
                                {goal.percentage.toFixed(1)}%
                            </span>
                        </div>
                        <div className="h-2 bg-[#0D1F17] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#10B981] transition-all duration-500"
                                style={{ width: `${goal.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-[#10B981] font-bold mb-1">Retirement Fund Projection</h3>
                <div className="h-[200px]">
                    <Line data={projectionData} options={options} />
                </div>
            </div>

            {/* Add Goal Modal */}
            {showAddModal && (
                <GoalModal
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddGoal}
                />
            )}

            {/* Edit Goal Modal */}
            {editingGoal && (
                <GoalModal
                    onClose={() => setEditingGoal(null)}
                    onSubmit={handleUpdateGoal}
                    goal={editingGoal}
                />
            )}
        </motion.div>
    );
};

interface GoalModalProps {
    onClose: () => void;
    onSubmit: (goal: any) => void;
    goal?: Goal;
}

const GoalModal = ({ onClose, onSubmit, goal }: GoalModalProps) => {
    const [formData, setFormData] = useState({
        name: goal?.name || "",
        current: goal?.current || 0,
        target: goal?.target || 0,
        category: goal?.category || "retirement",
        targetDate: goal?.targetDate || new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            id: goal?.id || undefined
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1A1A1A] rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold text-[#FFB800] mb-4">
                    {goal ? "Edit Goal" : "Add New Goal"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-[#10B981] mb-1 block">Goal Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input input-bordered w-full bg-[#141414] text-white"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[#10B981] mb-1 block">Current Amount</label>
                            <input
                                type="number"
                                value={formData.current}
                                onChange={(e) => setFormData({ ...formData, current: Number(e.target.value) })}
                                className="input input-bordered w-full bg-[#141414] text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-[#10B981] mb-1 block">Target Amount</label>
                            <input
                                type="number"
                                value={formData.target}
                                onChange={(e) => setFormData({ ...formData, target: Number(e.target.value) })}
                                className="input input-bordered w-full bg-[#141414] text-white"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[#10B981] mb-1 block">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="select select-bordered w-full bg-[#141414] text-white"
                        >
                            <option value="retirement">Retirement</option>
                            <option value="housing">Housing</option>
                            <option value="education">Education</option>
                            <option value="vehicle">Vehicle</option>
                            <option value="emergency">Emergency Fund</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[#10B981] mb-1 block">Target Date</label>
                        <input
                            type="date"
                            value={formData.targetDate}
                            onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                            className="input input-bordered w-full bg-[#141414] text-white"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-outline text-[#10B981]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn bg-[#10B981] hover:bg-[#0D9668] text-white"
                        >
                            {goal ? "Update Goal" : "Add Goal"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
