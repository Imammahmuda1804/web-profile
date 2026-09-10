"use client";

import { motion } from "framer-motion";

// ponytail: replaced brittle GSAP ScrollTrigger (which killed all triggers on unmount) with Framer Motion whileInView
const AnimatedContent = ({
  children,
  distance = 60,
  direction = "vertical",
  reverse = false,
  duration = 0.6,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = "",
}) => {
  const axis = direction === "horizontal" ? "x" : "y";
  const offset = reverse ? -distance : distance;

  return (
    <motion.div
      initial={{
        [axis]: offset,
        scale,
        opacity: animateOpacity ? initialOpacity : 1,
      }}
      whileInView={{
        [axis]: 0,
        scale: 1,
        opacity: 1,
      }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContent;
