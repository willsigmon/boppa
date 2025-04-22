import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  srcSet?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

/**
 * ResponsiveImage Component
 * 
 * A component that renders images with responsive behavior, proper loading attributes, 
 * and accessibility features.
 * 
 * @param {Object} props - The component props
 * @param {string} props.src - The image source URL
 * @param {string} props.alt - Alternative text for the image
 * @param {string} [props.className] - Additional CSS classes
 * @param {number} [props.width] - The intrinsic width of the image
 * @param {number} [props.height] - The intrinsic height of the image
 * @param {string} [props.sizes] - Sizes attribute for responsive images
 * @param {string} [props.srcSet] - Source set for responsive images
 * @param {boolean} [props.priority] - If true, image will be eagerly loaded
 * @param {string} [props.loading] - Loading strategy ('lazy' or 'eager')
 * @returns {JSX.Element} The responsive image component
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes = '100vw',
  srcSet,
  priority = false,
  loading = 'lazy',
}) => {
  // If priority is true, we want to eagerly load the image
  const loadingAttribute = priority ? 'eager' : loading;

  // Generate default srcSet if not provided and the image is in a format that supports it
  // This is a simple implementation; in a production app, you might want to use a more
  // sophisticated approach with multiple sizes and formats
  const defaultSrcSet = !srcSet && (src.endsWith('.jpg') || src.endsWith('.png') || src.endsWith('.webp'))
    ? `${src} 1x, ${src.replace(/\.(jpg|png|webp)$/, '@2x.$1')} 2x`
    : srcSet;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      srcSet={defaultSrcSet}
      loading={loadingAttribute}
      // If the image is a priority image, we want to preload it
      {...(priority && { fetchPriority: 'high' } as any)}
      // For above-the-fold images, we may want to add a preconnect
      // This is only needed for images from external domains
      // {...(priority && src.startsWith('http') && { rel: 'preconnect' })}
    />
  );
};

export default ResponsiveImage;