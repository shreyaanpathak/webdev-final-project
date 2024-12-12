// CreditCardModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface CreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    cardNumber: string;
    cardExpiry: string;
    cardCVC: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    cardNumber?: string;
    cardExpiry?: string;
    cardCVC?: string;
  };
  validateField: (name: string, value: string) => void;
}

function CreditCardModal({
  isOpen,
  onClose,
  formData,
  handleChange,
  errors,
  validateField,
}: CreditCardModalProps) {
  const inputClasses = (error?: string) => `
    w-full px-4 py-3 
    bg-transparent 
    border border-gray-700 
    rounded-lg 
    text-white 
    placeholder-gray-500
    transition-all
    focus:outline-none 
    focus:border-yellow-500 
    ${error ? 'border-red-500' : 'hover:border-gray-600'}
  `;

  const errorClasses = "text-red-500 text-sm mt-1 ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.25 }}
            className="relative w-full max-w-md mx-4 bg-[#1A1A1A] rounded-xl p-8 border border-yellow-500/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-yellow-500 mb-8">
              Payment Details
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    handleChange(e);
                    validateField("cardNumber", e.target.value);
                  }}
                  placeholder="Card Number"
                  className={inputClasses(errors.cardNumber)}
                />
                {errors.cardNumber && (
                  <p className={errorClasses}>{errors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={(e) => {
                      handleChange(e);
                      validateField("cardExpiry", e.target.value);
                    }}
                    placeholder="MM/YY"
                    className={inputClasses(errors.cardExpiry)}
                  />
                  {errors.cardExpiry && (
                    <p className={errorClasses}>{errors.cardExpiry}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    name="cardCVC"
                    value={formData.cardCVC}
                    onChange={(e) => {
                      handleChange(e);
                      validateField("cardCVC", e.target.value);
                    }}
                    placeholder="CVC"
                    className={inputClasses(errors.cardCVC)}
                  />
                  {errors.cardCVC && (
                    <p className={errorClasses}>{errors.cardCVC}</p>
                  )}
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full px-6 py-3 mt-4
                  bg-yellow-500 hover:bg-yellow-600
                  text-black font-medium
                  rounded-lg
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
              >
                Confirm Payment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CreditCardModal;
