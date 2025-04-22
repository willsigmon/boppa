import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  jsonLd?: Record<string, any>;
}

/**
 * SEO Component
 * 
 * Provides consistent SEO metadata and structured data across the site
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description (120-155 characters)
 * @param {string} [props.canonicalUrl] - Canonical URL for the page
 * @param {string} [props.ogType] - Open Graph type (default: 'website')
 * @param {string} [props.ogImage] - Open Graph image URL
 * @param {Object} [props.jsonLd] - JSON-LD structured data
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage,
  jsonLd,
}) => {
  // Base site metadata
  const siteName = 'Boppa Golf';
  const siteUrl = 'https://boppagolf.com';
  const defaultOgImage = '/og-image.jpg'; // Default image for social sharing
  
  // Form full title with site name
  const fullTitle = `${title} - ${siteName}`;
  
  // URL for Open Graph and canonical links
  const url = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  
  // Image for Open Graph
  const ogImageUrl = ogImage || `${siteUrl}${defaultOgImage}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={url} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImageUrl} />
      
      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

/**
 * JSON-LD Helper Functions
 * Generate properly formatted JSON-LD data structures for various types
 */

/**
 * Creates a LocalBusiness schema for the golf shop
 */
export const createLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://boppagolf.com/#business',
    name: 'Boppa Golf',
    image: 'https://boppagolf.com/images/shop.jpg',
    description: 'Professional golf club repair and customization services including regripping, custom builds, shaft replacement, and more.',
    url: 'https://boppagolf.com',
    telephone: '+15551234567',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Golf Club Ave, Suite 100',
      addressLocality: 'Fairway',
      addressRegion: 'GA',
      postalCode: '30000',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.7490, // Replace with actual coordinates
      longitude: -84.3880 // Replace with actual coordinates
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '16:00'
      }
    ],
    priceRange: '$$',
    sameAs: [
      'https://www.facebook.com/boppagolf',
      'https://www.instagram.com/boppagolf'
    ]
  };
};

/**
 * Creates a schema for a golf service
 */
export const createServiceSchema = (
  name: string,
  description: string,
  url: string,
  price?: string,
  image?: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://boppagolf.com/#business',
      name: 'Boppa Golf'
    },
    serviceType: 'Golf Club Services',
    url,
    ...(price && { offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD'
    }}),
    ...(image && { image })
  };
};

/**
 * Creates a schema for a golf product
 */
export const createProductSchema = (
  name: string,
  description: string,
  url: string,
  image: string,
  price?: string,
  availability?: string, // "InStock", "OutOfStock", etc.
  brand?: string,
  sku?: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url,
    ...(brand && { brand: {
      '@type': 'Brand',
      name: brand
    }}),
    ...(sku && { sku }),
    ...(price && { offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      ...(availability && { availability: `https://schema.org/${availability}` }),
      seller: {
        '@type': 'LocalBusiness',
        '@id': 'https://boppagolf.com/#business',
        name: 'Boppa Golf'
      }
    }})
  };
};

/**
 * Creates breadcrumb list schema for easy navigation
 */
export const createBreadcrumbSchema = (items: {name: string, url: string}[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://boppagolf.com${item.url}`
    }))
  };
};