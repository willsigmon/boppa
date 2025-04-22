import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';

/**
 * Custom hook to manage page loading states
 * 
 * This hook handles:
 * 1. Route change loading
 * 2. Manual loading states (e.g., for API calls)
 * 3. Provides a clean API to control loading from anywhere
 * 
 * @returns Object with loading state and control functions
 */
export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [manualLoading, setManualLoading] = useState(false);
  const [location] = useLocation();
  
  // Track previous location for route changes
  const [prevLocation, setPrevLocation] = useState(location);
  
  // Update location change tracking
  useEffect(() => {
    if (location !== prevLocation) {
      setIsLoading(true);
      
      // Simulate network delay for smoother transitions
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setPrevLocation(location);
      }, 800); // adjust timing as needed
      
      return () => clearTimeout(timeout);
    }
  }, [location, prevLocation]);
  
  // Start loading manually
  const startLoading = useCallback(() => {
    setManualLoading(true);
  }, []);
  
  // Stop loading manually
  const stopLoading = useCallback(() => {
    setManualLoading(false);
  }, []);
  
  // Combine route-based and manual loading states
  const combinedLoading = isLoading || manualLoading;
  
  return {
    isLoading: combinedLoading,
    startLoading,
    stopLoading
  };
}

// Create a singleton instance for global usage
let globalLoadingState = {
  isLoading: false,
  setIsLoading: (value: boolean) => {}
};

/**
 * Global access to page loading state
 * Can be called outside of React components
 */
export const globalLoading = {
  start: () => globalLoadingState.setIsLoading(true),
  stop: () => globalLoadingState.setIsLoading(false),
  isLoading: () => globalLoadingState.isLoading
};

/**
 * Hook to connect component to global loading state
 * Use this in your root component to enable the global API
 */
export function useGlobalPageLoading() {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    globalLoadingState = {
      isLoading,
      setIsLoading
    };
  }, [isLoading]);
  
  return {
    isLoading,
    setIsLoading
  };
}