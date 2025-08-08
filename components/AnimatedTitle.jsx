"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04, 
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
};

const AnimatedTitle = ({ text, className }) => {
  const letters = Array.from(text);

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedTitle;