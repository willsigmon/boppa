import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Props for all loading animations
 */
interface LoadingAnimationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
}

/**
 * GolfBallLoader - A bouncing golf ball loading animation
 */
export const GolfBallLoader: React.FC<LoadingAnimationProps> = ({ 
  className, 
  size = 'md',
  color = 'primary' 
}) => {
  // Determine dimensions based on size prop
  const dimensions = {
    sm: { ball: 12, container: 50 },
    md: { ball: 16, container: 70 },
    lg: { ball: 20, container: 100 },
  }[size];

  // Determine color classes
  const colorClasses = {
    primary: 'bg-primary',
    white: 'bg-white',
    gray: 'bg-gray-400',
  }[color];
  
  // Animation variants for the bounce effect
  const ballVariants = {
    bounce: {
      y: [0, -30, 0],
      transition: {
        y: {
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };
  
  // Animation variants for the shadow
  const shadowVariants = {
    bounce: {
      scale: [1, 0.5, 1],
      opacity: [0.4, 0.2, 0.4],
      transition: {
        scale: {
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)} style={{ height: dimensions.container }}>
      <motion.div
        className={cn("rounded-full", colorClasses)}
        style={{ 
          width: dimensions.ball, 
          height: dimensions.ball,
          // Golf ball texture - subtle
          backgroundImage: color === 'white' ? 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 1), rgba(245, 245, 245, 1))' : undefined
        }}
        variants={ballVariants}
        animate="bounce"
      />
      <motion.div
        className="rounded-full bg-black/20 mt-1"
        style={{ 
          width: dimensions.ball * 1.5, 
          height: dimensions.ball / 4,
        }}
        variants={shadowVariants}
        animate="bounce"
      />
    </div>
  );
};

/**
 * GolfSwingLoader - A golf club swing animation
 */
export const GolfSwingLoader: React.FC<LoadingAnimationProps> = ({ 
  className, 
  size = 'md',
  color = 'primary' 
}) => {
  // Determine dimensions based on size prop
  const dimensions = {
    sm: { clubHead: 8, clubShaft: 30, container: 50 },
    md: { clubHead: 12, clubShaft: 40, container: 70 },
    lg: { clubHead: 16, clubShaft: 60, container: 100 },
  }[size];

  // Determine color classes
  const colorClasses = {
    primary: 'bg-primary',
    white: 'bg-white',
    gray: 'bg-gray-600',
  }[color];

  // Animation variants for the club swing
  const clubVariants = {
    swing: {
      rotate: [-45, 90, -45],
      transition: {
        rotate: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 1] // Speed up the backswing
        }
      }
    }
  };

  return (
    <div className={cn("flex items-center justify-center", className)} style={{ height: dimensions.container, width: dimensions.container }}>
      <motion.div 
        className="relative origin-bottom"
        variants={clubVariants}
        animate="swing"
        style={{ height: dimensions.clubShaft }}
      >
        {/* Club shaft */}
        <div 
          className="absolute bottom-0 left-1/2 -ml-0.5 bg-gray-800" 
          style={{ width: 2, height: dimensions.clubShaft }}
        />
        
        {/* Club head */}
        <div 
          className={cn("absolute -right-2 top-0 rounded-sm", colorClasses)}
          style={{ width: dimensions.clubHead, height: dimensions.clubHead / 2 }}
        />
      </motion.div>
    </div>
  );
};

/**
 * GolfHoleLoader - A golf ball rolling into a hole animation
 */
export const GolfHoleLoader: React.FC<LoadingAnimationProps> = ({ 
  className, 
  size = 'md',
  color = 'primary' 
}) => {
  // Determine dimensions based on size prop
  const dimensions = {
    sm: { ball: 10, hole: 16, container: 60 },
    md: { ball: 14, hole: 22, container: 80 },
    lg: { ball: 18, hole: 28, container: 120 },
  }[size];

  // Determine color classes
  const colorClasses = {
    primary: 'bg-primary',
    white: 'bg-white',
    gray: 'bg-gray-400',
  }[color];

  // Animation variants for the ball
  const ballVariants = {
    roll: {
      x: [-dimensions.container/2 + dimensions.ball, dimensions.container/2 - dimensions.ball * 2],
      y: [0, 0, dimensions.ball],
      scale: [1, 1, 0],
      transition: {
        x: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeIn",
          times: [0, 0.8, 1]
        },
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: "easeIn",
          times: [0, 0.8, 1]
        }
      }
    }
  };

  return (
    <div 
      className={cn("relative flex items-center justify-center", className)} 
      style={{ height: dimensions.container/2, width: dimensions.container }}
    >
      {/* The green */}
      <div className="absolute top-0 left-0 w-full h-full bg-green-100 rounded-full" />
      
      {/* The hole */}
      <div 
        className="absolute bg-gray-900 rounded-full" 
        style={{ 
          width: dimensions.hole, 
          height: dimensions.hole/2,
          right: dimensions.ball * 1.5,
          top: '50%',
          transform: 'translateY(-30%)',
        }} 
      />
      
      {/* Flag */}
      <div 
        className="absolute bg-gray-700" 
        style={{ 
          width: 2, 
          height: dimensions.hole * 1.2,
          right: dimensions.ball * 1.5,
          bottom: '45%',
        }} 
      >
        <div 
          className="absolute top-0 right-0 border-t-[8px] border-r-[12px] border-b-[8px] border-t-transparent border-r-red-500 border-b-transparent" 
          style={{ 
            height: dimensions.ball,
            transform: 'translateY(-50%)'
          }} 
        />
      </div>
      
      {/* The ball */}
      <motion.div
        className={cn("absolute rounded-full", colorClasses)}
        style={{ 
          width: dimensions.ball, 
          height: dimensions.ball,
          bottom: 0,
        }}
        variants={ballVariants}
        animate="roll"
      />
    </div>
  );
};

/**
 * GolfTeeLoader - A loading state with a ball on a tee
 */
export const GolfTeeLoader: React.FC<LoadingAnimationProps & { text?: string }> = ({ 
  className, 
  size = 'md',
  color = 'primary',
  text
}) => {
  // Determine dimensions based on size prop
  const dimensions = {
    sm: { ball: 12, container: 50 },
    md: { ball: 16, container: 80 },
    lg: { ball: 24, container: 120 },
  }[size];

  // Determine color classes
  const colorClasses = {
    primary: 'bg-primary',
    white: 'bg-white',
    gray: 'bg-gray-400',
  }[color];
  
  // Pulsating animation for the ball
  const ballVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      y: [0, -2, 0],
      transition: {
        scale: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        },
        y: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative" style={{ height: dimensions.container }}>
        {/* Golf ball */}
        <motion.div
          className={cn("rounded-full shadow-md", colorClasses)}
          style={{ 
            width: dimensions.ball, 
            height: dimensions.ball,
            zIndex: 10
          }}
          variants={ballVariants}
          animate="pulse"
        />
        
        {/* Tee */}
        <div 
          className="absolute bg-red-400 rounded-b-full w-1.5"
          style={{ 
            height: dimensions.ball * 1.5,
            top: dimensions.ball * 0.8,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 5
          }} 
        />
      </div>
      
      {/* Optional loading text */}
      {text && (
        <p className="mt-4 text-sm text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
};

/**
 * LoadingButton - A button with a golf-themed loading animation
 */
export const LoadingButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}> = ({ 
  isLoading, 
  loadingText = 'Loading...', 
  variant = 'primary',
  children,
  className,
  disabled,
  ...props
}) => {
  // Get the appropriate button style based on the variant
  const getButtonClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary/90';
      case 'secondary':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      case 'outline':
        return 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100';
      default:
        return 'bg-primary text-white hover:bg-primary/90';
    }
  };

  return (
    <button
      className={cn(
        "relative flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors duration-200",
        getButtonClass(),
        (isLoading || disabled) && "opacity-80 cursor-not-allowed",
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="opacity-0">{children}</span>
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <GolfBallLoader 
              size="sm" 
              color={variant === 'primary' ? 'white' : 'primary'} 
            />
            {loadingText && <span>{loadingText}</span>}
          </div>
        </>
      ) : (
        children
      )}
    </button>
  );
};

/**
 * PageSpinner - Full page loading spinner with a golf theme
 */
export const PageSpinner: React.FC<{ text?: string }> = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <GolfTeeLoader size="lg" text={text} />
    </div>
  );
};

/**
 * SectionLoader - Loading spinner for a specific section of a page
 */
export const SectionLoader: React.FC<{ text?: string; className?: string }> = ({ 
  text, 
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-12 px-4", 
      className
    )}>
      <GolfSwingLoader size="md" />
      {text && <p className="mt-4 text-sm text-gray-500">{text}</p>}
    </div>
  );
};

/**
 * SubmitSuccessAnimation - Animation to show when a form submits successfully
 */
export const SubmitSuccessAnimation: React.FC<{ text?: string }> = ({ 
  text = "Success!" 
}) => {
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  const circleVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        scale: { duration: 0.4, ease: "easeOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <motion.div
        className="relative w-20 h-20"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-green-100"
          variants={circleVariants}
        />
        <motion.svg
          className="absolute inset-0"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M5 13L9 17L19 7"
            stroke="green"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={pathVariants}
          />
        </motion.svg>
      </motion.div>
      <motion.p
        className="mt-4 text-lg font-medium text-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {text}
      </motion.p>
    </div>
  );
};