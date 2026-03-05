"use client";

import { motion, useSpring, useMotionValue, useInView } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";

/* ─── FadeIn ─── spring-based fade with optional blur reveal ─── */

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
  blur?: boolean;
  duration?: number;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  once = true,
  blur = false,
  duration = 0.7,
}: FadeInProps) {
  const directionMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: directionMap[direction].y,
        x: directionMap[direction].x,
        filter: blur ? "blur(10px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── ScaleIn ─── elegant scale entrance ─── */

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function ScaleIn({
  children,
  delay = 0,
  className = "",
  once = true,
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── BlurReveal ─── cinematic blur-to-sharp reveal ─── */

interface BlurRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function BlurReveal({
  children,
  delay = 0,
  className = "",
}: BlurRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(16px)", scale: 0.96 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── TextReveal ─── word-by-word text entrance ─── */

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-40px" }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.4,
                delay: delay + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ─── CountUp ─── animated counter ─── */

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
    duration: duration * 1000,
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(Math.round(latest).toLocaleString());
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ─── SlideIn ─── horizontal/vertical slide with spring physics ─── */

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
  once?: boolean;
}

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className = "",
  once = true,
}: SlideInProps) {
  const offsets = {
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    up: { x: 0, y: 60 },
    down: { x: 0, y: -60 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 18,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerContainer & StaggerItem ─── ─── */

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── HoverLift ─── micro-interaction wrapper for cards ─── */

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  lift?: number;
}

export function HoverLift({
  children,
  className = "",
  lift = -4,
}: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y: lift, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── ParallaxScroll ─── simple parallax wrapper ─── */

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxScroll({
  children,
  className = "",
  speed = 0.3,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = (windowH - rect.top) / (windowH + rect.height);
      setOffset((progress - 0.5) * speed * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y: offset }}>
        {children}
      </motion.div>
    </div>
  );
}
