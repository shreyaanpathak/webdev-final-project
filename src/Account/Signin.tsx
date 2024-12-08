import React from 'react';
import { motion } from 'framer-motion';
import { PiWaveSineFill } from "react-icons/pi";

export default function Signin() {
    // Animation variants for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen grid place-items-center overflow-hidden bg-gradient-to-br from-base-900 via-base-800 to-base-900 p-6 relative before:absolute before:inset-0 before:bg-[radial-gradient(circle_600px_at_50%_60%,rgba(34,197,94,0.08),transparent)] before:pointer-events-none">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
                {/* Decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-600/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-600/10 rounded-full blur-3xl"></div>
                
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="relative space-y-8"
                >
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotateZ: 360 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2 
                        }}
                        className="flex justify-center"
                    >
                        <div className="p-3 rounded-full bg-green-600/10">
                            <PiWaveSineFill className="text-6xl text-green-600" />
                        </div>
                    </motion.div>

                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl font-bold text-center text-white"
                    >
                        Sign In
                    </motion.h1>

                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="form-control">
                            <div className="relative">
                                <motion.div
                                    whileFocus={{ scale: 1.02 }}
                                    className="input input-bordered input-lg flex items-center gap-3 pr-4 focus-within:border-green-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-5 w-5 opacity-70"
                                    >
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                    </svg>
                                    <input 
                                        type="text" 
                                        className="grow focus:outline-none bg-transparent placeholder-base-content/50"
                                        placeholder="Username"
                                    />
                                </motion.div>
                            </div>
                        </div>

                        <div className="form-control">
                            <div className="relative">
                                <motion.div
                                    whileFocus={{ scale: 1.02 }}
                                    className="input input-bordered input-lg flex items-center gap-3 pr-4 focus-within:border-green-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="h-5 w-5 opacity-70"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <input 
                                        type="password" 
                                        className="grow focus:outline-none bg-transparent placeholder-base-content/50"
                                        placeholder="Password"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn btn-lg w-full bg-green-600 hover:bg-green-700 text-base-100"
                        >
                            Sign In
                        </motion.button>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="text-center text-sm opacity-60"
                    >
                        Don't have an account? 
                        <button className="ml-1 text-green-600 hover:underline">
                            Sign Up
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}