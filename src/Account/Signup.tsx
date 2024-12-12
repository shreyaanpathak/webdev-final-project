import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import CreditCardModal from "./CreditCardModal";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import * as client from "./client";
import { setLoading, setError } from "./reducer";
import { FormData, FormErrors } from "./client";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

// Validation functions
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateSSN = (ssn: string): boolean => {
  const re = /^\d{3}-?\d{2}-?\d{4}$/;
  return re.test(ssn);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

const validateCardNumber = (cardNumber: string): boolean => {
  const re = /^\d{16}$/;
  return re.test(cardNumber.replace(/\s/g, ""));
};

const validateCardExpiry = (expiry: string): boolean => {
  const re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  return re.test(expiry);
};

const validateCardCVC = (cvc: string): boolean => {
  const re = /^\d{3,4}$/;
  return re.test(cvc);
};

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    ssn: "",
    password: "",
    membership: "REGULAR",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "username":
        if (!value) newErrors.username = "Username is required";
        else if (value.length < 3)
          newErrors.username = "Username must be at least 3 characters";
        else delete newErrors.username;
        break;

      case "email":
        if (!value) newErrors.email = "Email is required";
        else if (!validateEmail(value))
          newErrors.email = "Invalid email format";
        else delete newErrors.email;
        break;

      case "firstName":
        if (!value) newErrors.firstName = "First name is required";
        else delete newErrors.firstName;
        break;

      case "lastName":
        if (!value) newErrors.lastName = "Last name is required";
        else delete newErrors.lastName;
        break;

      case "dob":
        if (!value) newErrors.dob = "Date of birth is required";
        else delete newErrors.dob;
        break;

      case "ssn":
        if (!value) newErrors.ssn = "SSN is required";
        else if (!validateSSN(value)) newErrors.ssn = "Invalid SSN format";
        else delete newErrors.ssn;
        break;

      case "password":
        if (!value) newErrors.password = "Password is required";
        else if (!validatePassword(value))
          newErrors.password = "Password must be at least 8 characters";
        else delete newErrors.password;
        break;

      case "cardNumber":
        if (formData.membership === "GOLD") {
          if (!value) newErrors.cardNumber = "Card number is required";
          else if (!validateCardNumber(value))
            newErrors.cardNumber = "Invalid card number";
          else delete newErrors.cardNumber;
        }
        break;

      case "cardExpiry":
        if (formData.membership === "GOLD") {
          if (!value) newErrors.cardExpiry = "Expiry date is required";
          else if (!validateCardExpiry(value))
            newErrors.cardExpiry = "Invalid expiry date (MM/YY)";
          else delete newErrors.cardExpiry;
        }
        break;

      case "cardCVC":
        if (formData.membership === "GOLD") {
          if (!value) newErrors.cardCVC = "CVC is required";
          else if (!validateCardCVC(value)) newErrors.cardCVC = "Invalid CVC";
          else delete newErrors.cardCVC;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep = (stepNumber: number): boolean => {
    let isValid = true;
    const fieldsToValidate: { [key: number]: string[] } = {
      1: ["username", "email"],
      2: ["firstName", "lastName", "dob"],
      3: [], // Membership selection
      4: ["ssn", "password"],
      5:
        formData.membership === "GOLD"
          ? ["cardNumber", "cardExpiry", "cardCVC"]
          : [],
    };

    fieldsToValidate[stepNumber].forEach((field) => {
      const fieldIsValid = validateField(
        field,
        formData[field as keyof FormData]
      );
      isValid = isValid && fieldIsValid;
    });

    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleMembershipSelect = (type: "REGULAR" | "GOLD") => {
    setFormData((prev) => ({ ...prev, membership: type }));
    if (type === "GOLD") {
      setShowPaymentModal(true);
    }
  };

  const nextStep = () => {
    const isValid = validateStep(step);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    try {
      dispatch(setLoading(true));
      await client.signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
        socialsecurity: formData.ssn,
        membership: formData.membership,
        cardDetails:
          formData.membership === "GOLD"
            ? {
                number: formData.cardNumber,
                expiry: formData.cardExpiry,
                cvc: formData.cardCVC,
              }
            : undefined,
      });
      navigate("/Account/Signin");
    } catch (err: any) {
      dispatch(setError(err.response?.data?.detail || "Signup failed"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ... Previous code remains the same ...

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4"
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
              delay: 0.2,
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

          {/* Progress Steps */}
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.div
                key={s}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: s === step ? 1.2 : 1,
                  opacity: 1,
                  backgroundColor: s === step ? "#10B981" : "#374151",
                }}
                className={`h-2 w-2 rounded-full`}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Step 1: Username & Email */}
          {step === 1 && (
            <motion.div
              variants={itemVariants}
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="form-control">
                <label className="text-sm text-gray-400 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className={`input input-bordered input-lg flex items-center gap-3 pr-4 
                  ${
                    errors.username
                      ? "border-red-500"
                      : "focus-within:border-green-500"
                  }`}
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
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.username}
                  </motion.p>
                )}
              </div>

              <div className="form-control">
                <label className="text-sm text-gray-400 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className={`input input-bordered input-lg flex items-center gap-3 pr-4 
                  ${
                    errors.email
                      ? "border-red-500"
                      : "focus-within:border-green-500"
                  }`}
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
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
          {/* Step 2: Personal Info */}
          {step === 2 && (
            <motion.div
              variants={itemVariants}
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="form-control">
                <label className="text-sm text-gray-400 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`input input-bordered input-lg w-full bg-transparent placeholder-base-content/50 
          ${errors.firstName ? "border-red-500" : "focus:border-green-500"}`}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.firstName}
                  </motion.p>
                )}
              </div>

              <div className="form-control">
                <label className="text-sm text-gray-400 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`input input-bordered input-lg w-full bg-transparent placeholder-base-content/50 
          ${errors.lastName ? "border-red-500" : "focus:border-green-500"}`}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.lastName}
                  </motion.p>
                )}
              </div>

              <div className="form-control">
                <label className="text-sm text-gray-400 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`input input-bordered input-lg w-full bg-transparent placeholder-base-content/50 
          ${errors.dob ? "border-red-500" : "focus:border-green-500"}`}
                />
                {errors.dob && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.dob}
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Membership Selection */}
          {step === 3 && (
            <motion.div
              variants={itemVariants}
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Choose Your Membership
              </h2>

              <div className="space-y-4">
                <div
                  className={`border rounded-lg p-6 transition-all duration-300 cursor-pointer ${
                    formData.membership === "REGULAR"
                      ? "border-green-500 bg-black/40"
                      : "border-gray-600 hover:border-green-500"
                  }`}
                  onClick={() => handleMembershipSelect("REGULAR")}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Regular</h3>
                    <span className="text-green-500">Free</span>
                  </div>
                  <ul className="space-y-2 text-gray-400">
                    <li>Basic portfolio tracking</li>
                    <li>Limited market data</li>
                    <li>Standard charts</li>
                  </ul>
                </div>

                <div
                  className={`border rounded-lg p-6 transition-all duration-300 cursor-pointer ${
                    formData.membership === "GOLD"
                      ? "border-yellow-500 bg-black/40"
                      : "border-gray-600 hover:border-yellow-500"
                  }`}
                  onClick={() => handleMembershipSelect("GOLD")}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-yellow-500">Gold</h3>
                    <span className="text-yellow-500">$29.99/month</span>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li>Advanced portfolio analytics</li>
                    <li>Real-time market data</li>
                    <li>AI-powered insights</li>
                    <li>Premium support</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
          {/* Step 4: SSN & Password */}
          {step === 4 && (
            <motion.div
              variants={itemVariants}
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="form-control">
                <label className="text-sm text-gray-400 mb-1">
                  Social Security Number <span className="text-red-500">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleChange}
                  className={`input input-bordered input-lg w-full bg-transparent placeholder-base-content/50 
          ${errors.ssn ? "border-red-500" : "focus:border-green-500"}`}
                  placeholder="Social Security Number"
                />
                {errors.ssn && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.ssn}
                  </motion.p>
                )}
              </div>

              <div className="form-control">
                <label className="text-sm text-gray-400 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input input-bordered input-lg w-full bg-transparent placeholder-base-content/50 
          ${errors.password ? "border-red-500" : "focus:border-green-500"}`}
                  placeholder="Password"
                />
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 5: Review */}
          {step === 5 && (
            <motion.div
              variants={itemVariants}
              className="space-y-4 text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h2 className="text-2xl font-bold mb-4">Review your details</h2>

              <div className="space-y-4 bg-black/20 p-4 rounded-lg">
                <p>
                  <span className="text-gray-400">Username:</span>{" "}
                  {formData.username}
                </p>
                <p>
                  <span className="text-gray-400">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="text-gray-400">Full Name:</span>{" "}
                  {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <span className="text-gray-400">Date of Birth:</span>{" "}
                  {formData.dob}
                </p>
                <p>
                  <span className="text-gray-400">SSN:</span>{" "}
                  {formData.ssn.replace(/./g, "*")}
                </p>
                <p>
                  <span className="text-gray-400">Membership:</span>
                  <span
                    className={
                      formData.membership === "GOLD"
                        ? "text-yellow-500 ml-2"
                        : "ml-2"
                    }
                  >
                    {formData.membership}
                  </span>
                </p>
              </div>

              {formData.membership === "GOLD" && (
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-500 font-medium">
                    Gold Membership Benefits:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-yellow-500/80">
                    <li>• Advanced portfolio analytics</li>
                    <li>• Real-time market data</li>
                    <li>• AI-powered insights</li>
                    <li>• Premium support</li>
                  </ul>
                  <p className="mt-3 text-yellow-500">
                    $29.99/month will be charged to your card
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <div className="flex justify-between">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-outline text-white border-white"
                  onClick={prevStep}
                >
                  Back
                </motion.button>
              )}

              {step < 5 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`btn ${step === 1 ? "btn-lg w-full" : ""} 
      bg-green-600 hover:bg-green-700 text-white`}
                  onClick={nextStep}
                >
                  Next
                </motion.button>
              )}
              {step === 5 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleSubmit}
                >
                  Complete Signup
                </motion.button>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center text-sm opacity-60"
          >
            Already have an account?{" "}
            <Link
              to="/Account/Signin"
              className="ml-1 text-green-600 hover:underline"
            >
              Sign In
            </Link>
          </motion.div>

          {/* Credit Card Modal */}
          <CreditCardModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            validateField={validateField}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
