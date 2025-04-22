import React, { useEffect, useState } from "react";
import { PageSpinner } from "@/components/ui/loading-animations";
import { motion, AnimatePresence } from "framer-motion";

/**
 * PageLoader Component
 * 
 * Displays a full-page loading spinner with custom text
 * Animates in/out smoothly and optionally has a minimum display time
 * 
 * @param {boolean} isLoading - Whether the loader should be shown
 * @param {string} text - The text to display with the loader
 * @param {number} minDisplayTime - Minimum time in ms to show the loader
 */
const PageLoader: React.FC<{
  isLoading: boolean;
  text?: string;
  minDisplayTime?: number;
}> = ({ isLoading, text = "Loading...", minDisplayTime = 500 }) => {
  const [shouldDisplay, setShouldDisplay] = useState(isLoading);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    // When loading starts, record the start time
    if (isLoading && !startTime) {
      setStartTime(Date.now());
      setShouldDisplay(true);
    }
    
    // When loading finishes, check if minimum time has passed
    if (!isLoading && startTime) {
      const elapsedTime = Date.now() - startTime;
      
      if (elapsedTime < minDisplayTime) {
        // If minimum time hasn't passed, wait until it does
        const timeoutId = setTimeout(() => {
          setShouldDisplay(false);
          setStartTime(null);
        }, minDisplayTime - elapsedTime);
        
        return () => clearTimeout(timeoutId);
      } else {
        // If minimum time has passed, hide loader immediately
        setShouldDisplay(false);
        setStartTime(null);
      }
    }
  }, [isLoading, minDisplayTime, startTime]);

  return (
    <AnimatePresence>
      {shouldDisplay && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50"
        >
          <PageSpinner text={text} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;