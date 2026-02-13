"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, Variants, Transition } from 'framer-motion';

interface RepeatInViewProps {
  children: React.ReactNode;
  variants: Variants;
  transition?: Transition;
  delay?: number;
  className?: string;
  once?: boolean; // allow disabling repeat if needed later
  amount?: number; // intersection threshold
}

// Re-usable wrapper that re-triggers the same entrance animation
// each time the element re-enters the viewport while scrolling up or down.
export default function RepeatInView({
  children,
  variants,
  transition,
  delay = 0,
  className,
  once = false,
  amount = 0.35,
}: RepeatInViewProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount });

  useEffect(() => {
    if (inView) {
      controls.start('show');
    } else if (!once) {
      // Reset to hidden so animation plays again on next entry
      controls.start('hidden');
    }
  }, [inView, once, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={controls}
      transition={{ ...(transition || {}), delay }}
    >
      {children}
    </motion.div>
  );
}
