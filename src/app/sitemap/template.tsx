"use client";
import * as React from 'react';
import { motion } from "framer-motion";

interface ITemplateProps {
  children: React.ReactNode
}

const Template: React.FunctionComponent<ITemplateProps> = (props) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      {props.children}
    </motion.div>
  );
};

export default Template;
