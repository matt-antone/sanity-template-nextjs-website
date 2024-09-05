"use client";
import * as React from 'react';
import { motion } from "framer-motion";

interface IPageTransitionProps {
  children: React.ReactNode
}

const PageTransition: React.FunctionComponent<IPageTransitionProps> = ({children}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y:20, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
