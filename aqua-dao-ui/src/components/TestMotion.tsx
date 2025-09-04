import React from "react";
import { motion } from "framer-motion";

export const TestMotion = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-red-500 p-4 text-white"
    >
      Test Motion Component
    </motion.div>
  );
};
