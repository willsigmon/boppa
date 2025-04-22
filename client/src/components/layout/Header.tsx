import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Mail } from "lucide-react";
import { Instagram, Facebook } from "@/components/ui/social-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Header component that provides site navigation and branding
 * Implements responsive design, accessibility features, and keyboard navigation
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Navigation link data structure
  const mainNavLinks = [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" }
  ];
  
  const shopDropdownLinks = [
    { name: "Trade-In", path: "/trade-in" },
    { name: "Sell Your Clubs", path: "/sell" },
  ];
  
  const resourcesDropdownLinks = [
    { name: "FAQs", path: "/faqs" },
    { name: "Gallery", path: "/gallery" },
  ];
  
  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
  ];
  
  const allMobileLinks = [
    ...mainNavLinks,
    { name: "divider-1", path: "divider" },
    ...shopDropdownLinks,
    { name: "divider-2", path: "divider" },
    ...resourcesDropdownLinks,
  ];

  // Toggle mobile menu and trap focus for accessibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };

    // Add scroll detection for sticky header styling
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    // Add event listeners
    window.addEventListener('keydown', handleEscKey);
    window.addEventListener('scroll', handleScroll);

    // Handle outside clicks
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Clean up
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Add body class to prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  // Create dynamic classes for header based on scroll state
  const headerClasses = `sticky top-0 z-[var(--z-sticky)] transition-shadow duration-300 ${
    isScrolled ? 'shadow-md bg-white/95 backdrop-blur-sm' : 'shadow-sm bg-white'
  }`;

  return (
    <header className={headerClasses} role="banner">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Boppa Golf Home">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            <span className="text-primary font-heading font-bold text-base sm:text-xl text-center">
              boppa<br/>golf
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" role="navigation" aria-label="Main Navigation">
          {mainNavLinks.map((link) => (
            <Link 
              key={link.path}
              href={link.path}
              className={`font-heading font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1 ${
                location === link.path ? "text-primary" : "text-gray-700 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Shop Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="font-heading font-medium text-gray-700 hover:text-primary flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1">
              Shop
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {shopDropdownLinks.map((link) => (
                <Link 
                  key={link.path}
                  href={link.path}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenuItem className="cursor-pointer">
                    {link.name}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="font-heading font-medium text-gray-700 hover:text-primary flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1">
              Resources
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {resourcesDropdownLinks.map((link) => (
                <Link 
                  key={link.path}
                  href={link.path}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenuItem className="cursor-pointer">
                    {link.name}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        {/* Contact and Social Media Links */}
        <div className="hidden lg:flex items-center space-x-5">
          <a 
            href="mailto:info@boppagolf.com" 
            className="flex items-center text-gray-700 hover:text-primary transition-colors"
            aria-label="Email us at info@boppagolf.com"
          >
            <Mail className="w-5 h-5 mr-1" aria-hidden="true" />
            <span className="font-medium hidden xl:inline">info@boppagolf.com</span>
          </a>
          <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram" 
              className="text-gray-700 hover:text-primary transition-colors p-1"
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook" 
              className="text-gray-700 hover:text-primary transition-colors p-1"
            >
              <Facebook className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
        
        {/* Mobile Elements */}
        <div className="flex items-center space-x-2 lg:hidden">
          {/* Mobile Email Button */}
          <a 
            href="mailto:info@boppagolf.com" 
            className="md:flex items-center justify-center w-10 h-10 text-gray-700 hover:text-primary transition-colors hidden"
            aria-label="Email us"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
          </a>
          
          {/* Mobile Menu Button */}
          <button 
            ref={mobileMenuButtonRef}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} 
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? 
              <X className="w-6 h-6" aria-hidden="true" /> : 
              <Menu className="w-6 h-6" aria-hidden="true" />
            }
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          ref={mobileMenuRef}
          className="lg:hidden bg-white border-t border-gray-200 fixed inset-0 top-[57px] z-50 overflow-y-auto"
          role="dialog" 
          aria-modal="true"
          aria-label="Main Menu"
        >
          <nav className="container mx-auto px-4 py-5 space-y-4" role="navigation">
            {allMobileLinks.map((link, index) => (
              link.path === "divider" ? (
                <div key={link.name} className="border-t border-gray-200 my-3"></div>
              ) : (
                <Link 
                  key={link.path}
                  href={link.path}
                  className={`block font-heading py-3 px-2 transition-colors rounded-md ${
                    location === link.path 
                      ? "text-primary bg-primary/5 font-medium" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            
            {/* Mobile Social Links */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 mt-4">
              <span className="text-sm text-gray-500 font-medium">Follow us:</span>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram" 
                className="text-gray-700 hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook" 
                className="text-gray-700 hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
            
            {/* Mobile Contact */}
            <div className="mt-8 bg-gray-50 rounded-lg p-4">
              <h3 className="font-heading font-medium text-gray-800 mb-2">Need help?</h3>
              <a 
                href="mailto:info@boppagolf.com" 
                className="flex items-center text-primary font-medium mb-2"
              >
                <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                info@boppagolf.com
              </a>
              <p className="text-sm text-gray-600">We'll get back to you as soon as possible!</p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
