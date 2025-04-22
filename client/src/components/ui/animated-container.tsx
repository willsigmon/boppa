import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Types of animations available for elements
 */
export type AnimationType = 
  | "fade" 
  | "slide-up" 
  | "slide-down" 
  | "slide-left" 
  | "slide-right" 
  | "scale-up" 
  | "bounce" 
  | "rotate" 
  | "swing"
  | "golf-bounce"
  | "golf-swing";

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  whileInView?: boolean;
  id?: string;
  onClick?: () => void;
}

/**
 * AnimatedContainer - Wrapper component that adds animations to any element
 * 
 * @example
 * <AnimatedContainer animation="fade" delay={0.2}>
 *   <h1>This content will fade in</h1>
 * </AnimatedContainer>
 */
export function AnimatedContainer({
  children,
  animation = "fade",
  duration = 0.5,
  delay = 0,
  className,
  once = true,
  whileInView = true,
  id,
  onClick,
}: AnimatedContainerProps) {
  // Determine which animation variant to use
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    "slide-up": {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    "slide-down": {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 }
    },
    "slide-left": {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    "slide-right": {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    "scale-up": {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    bounce: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.5
        }
      }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -15 },
      visible: { opacity: 1, rotate: 0 }
    },
    swing: {
      hidden: { opacity: 0, rotate: -5 },
      visible: { 
        opacity: 1,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 100
        }
      }
    }
  };

  // Golf-themed variants - special animations
  const golfVariants = {
    "golf-swing": {
      hidden: { opacity: 0, x: -50, rotate: -45 },
      visible: { 
        opacity: 1, 
        x: 0, 
        rotate: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100
        }
      }
    },
    "golf-putt": {
      hidden: { opacity: 0, x: -20 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          ease: "easeInOut",
          duration: 0.5
        }
      }
    },
    "golf-bounce": {
      hidden: { opacity: 0, y: -20 },
      visible: { 
        opacity: 1, 
        y: [0, -15, -5, -10, 0],
        transition: {
          y: {
            times: [0, 0.2, 0.4, 0.6, 1],
            duration: 0.8,
          },
          opacity: {
            duration: 0.3,
          }
        }
      }
    }
  };

  // Combine standard and golf variants
  const allVariants = { ...variants, ...golfVariants };
  
  // Get the selected variant
  const selectedVariant = allVariants[animation as keyof typeof allVariants] || variants.fade;

  return (
    <motion.div
      id={id}
      className={cn(className)}
      initial="hidden"
      animate={!whileInView ? "visible" : undefined}
      whileInView={whileInView ? "visible" : undefined}
      viewport={{ once }}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedList - Animate a list of items with staggered delays
 */
interface AnimatedListProps {
  children: React.ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number;
  initialDelay?: number;
  duration?: number;
  className?: string;
  itemClassName?: string;
  once?: boolean;
}

export function AnimatedList({
  children,
  animation = "fade",
  staggerDelay = 0.1,
  initialDelay = 0,
  duration = 0.5,
  className,
  itemClassName,
  once = true
}: AnimatedListProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimatedContainer
          animation={animation}
          delay={initialDelay + index * staggerDelay}
          duration={duration}
          className={itemClassName}
          once={once}
        >
          {child}
        </AnimatedContainer>
      ))}
    </div>
  );
}

/**
 * AnimatedPresenceContainer - Container with enter/exit animations using AnimatePresence
 */
interface AnimatedPresenceContainerProps {
  children: React.ReactNode;
  isVisible: boolean;
  animation?: AnimationType;
  duration?: number;
  exitDuration?: number;
  className?: string;
}

export function AnimatedPresenceContainer({
  children,
  isVisible,
  animation = "fade",
  duration = 0.3,
  exitDuration = 0.2,
  className
}: AnimatedPresenceContainerProps) {
  // Define animation variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    "slide-up": {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 }
    },
    "slide-down": {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    },
    "scale-up": {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 }
    }
  };

  const selectedVariant = variants[animation as keyof typeof variants] || variants.fade;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={className}
          initial={selectedVariant.initial}
          animate={selectedVariant.animate}
          exit={selectedVariant.exit}
          transition={{
            enter: { duration },
            exit: { duration: exitDuration }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}