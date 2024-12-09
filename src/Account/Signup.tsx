import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function SignUp() {
    // Steps: 1 = Basic Info (Username/Email), 2 = Personal Info (Name/DOB), 3 = SSN/Password, 4 = Review/Submit
    const [step, setStep] = useState(1);

    // Form values
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        dob: '',
        ssn: '',
        password: '',
    });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        // Add validation checks if needed before moving forward
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = () => {
        // Final submission logic goes here
        console.log("Submitting:", formData);
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] relative">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-md"
            >
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
                            <RiMoneyDollarCircleFill className="text-6xl text-green-600" />
                        </div>
                    </motion.div>

                    <motion.h1 
                        variants={itemVariants}
                        className="text-4xl font-bold text-center text-white"
                    >
                        Sign Up
                    </motion.h1>

                    {/* Step 1: Username & Email */}
                    {step === 1 && (
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="form-control">
                                <div className="relative">
                                    <motion.div
                                        whileFocus={{ scale: 1.02 }}
                                        className="input input-bordered input-lg flex items-center gap-3 pr-4 focus-within:border-green-500"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            className="h-5 w-5 opacity-70"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                        </svg>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
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
                                            fill="currentColor"
                                            className="h-5 w-5 opacity-70"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                        </svg>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="grow focus:outline-none bg-transparent placeholder-base-content/50"
                                            placeholder="Email"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Personal Info */}
                    {step === 2 && (
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="form-control">
                                <div className="relative">
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="input input-bordered input-lg w-full bg-transparent placeholder-base-content/50 focus:border-green-500"
                                        placeholder="First Name"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="relative">
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="input input-bordered input-lg w-full bg-transparent placeholder-base-content/50 focus:border-green-500"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="relative">
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="input input-bordered input-lg w-full bg-transparent placeholder-base-content/50 focus:border-green-500"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: SSN & Password */}
                    {step === 3 && (
                        <motion.div variants={itemVariants} className="space-y-4">
                            <div className="form-control">
                                <div className="relative">
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="text"
                                        name="ssn"
                                        value={formData.ssn}
                                        onChange={handleChange}
                                        className="input input-bordered input-lg w-full bg-transparent placeholder-base-content/50 focus:border-green-500"
                                        placeholder="Social Security Number"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <div className="input-group">
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="input input-bordered input-lg w-full bg-transparent placeholder-base-content/50 focus:border-green-500"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Review */}
                    {step === 4 && (
                        <motion.div variants={itemVariants} className="space-y-4 text-white">
                            <h2 className="text-2xl font-bold mb-4">Review your details</h2>
                            <p><strong>Username:</strong> {formData.username}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Full Name:</strong> {formData.firstName} {formData.lastName}</p>
                            <p><strong>DOB:</strong> {formData.dob}</p>
                            <p><strong>SSN:</strong> {formData.ssn}</p>
                            <p><strong>Password:</strong> ******</p>
                        </motion.div>
                    )}

                    {/* Navigation Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            {step > 1 && step <= 4 && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn btn-outline text-white border-white"
                                    onClick={prevStep}
                                >
                                    Back
                                </motion.button>
                            )}
                            
                            {step < 4 && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={
                                      step === 1 
                                          ? "btn btn-lg w-full bg-green-600 hover:bg-green-700 text-base-100" 
                                          : "btn bg-green-600 hover:bg-green-700 text-white"
                                  }
                                    onClick={nextStep}
                                >
                                    Next
                                </motion.button>
                            )}

                            {step === 4 && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn bg-green-600 hover:bg-green-700 text-white"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </motion.button>
                            )}
                        </div>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="text-center text-sm opacity-60"
                    >
                        Already have an account? 
                        <Link to={"/Account/Signin"} className="ml-1 text-green-600 hover:underline">Sign In</Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
