import React from 'react';

interface SkipToContentProps {
  target?: string;
  className?: string;
}

/**
 * SkipToContent component provides keyboard accessibility, allowing users
 * to skip navigation and go directly to the main content.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.target] - The ID of the element to skip to (default: "#main")
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The SkipToContent component
 */
const SkipToContent: React.FC<SkipToContentProps> = ({ 
  target = "#main", 
  className = ""
}) => {
  return (
    <a 
      href={target} 
      className={`skip-to-content ${className}`}
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;