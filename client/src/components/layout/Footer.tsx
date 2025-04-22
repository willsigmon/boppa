import React, { useState } from "react";
import { Link } from "wouter";
import { Instagram, Facebook } from "@/components/ui/social-icons";
import { Phone, Mail, MapPin, Clock, Download, Camera } from "lucide-react";
import { QRCodeGenerator } from "@/components/ui/qr-code";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Footer component providing site-wide navigation, contact information,
 * and QR code functionality.
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showQRFullsize, setShowQRFullsize] = useState(false);
  
  // Create URLs for contact QR code
  const siteUrl = window.location.origin;
  const contactUrl = `${siteUrl}/contact`;
  
  // Handle download of QR code as PNG
  const handleDownloadQR = () => {
    const canvas = document.querySelector('#contact-qr-code canvas') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'boppa-golf-contact.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Information */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <span className="text-primary font-heading font-bold text-xl text-center">
                  boppa<br/>golf
                </span>
              </div>
            </Link>
            <div className="space-y-4">
              <address className="not-italic">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
                  <span>123 Golf Club Ave, Suite 100<br/>Fairway, GA 30000</span>
                </div>
              </address>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                <a 
                  href="tel:+15551234567" 
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                  aria-label="Call us at (555) 123-4567"
                >
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                <a 
                  href="mailto:info@boppagolf.com" 
                  className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                  aria-label="Email us at info@boppagolf.com"
                >
                  info@boppagolf.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" aria-hidden="true" />
                <div>
                  <p>Mon-Fri: 9am-6pm</p>
                  <p>Sat: 10am-4pm</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services & Products */}
          <nav aria-label="Services and Products Links">
            <h3 className="text-lg font-heading font-semibold mb-4">Services & Products</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/services" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/trade-in" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  Trade-In
                </Link>
              </li>
              <li>
                <Link 
                  href="/sell" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  Sell Your Clubs
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Resources */}
          <nav aria-label="Resource Links">
            <h3 className="text-lg font-heading font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/reviews" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link 
                  href="/gallery" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  href="/faqs" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Connect with Us & QR Code */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Follow us on Instagram" 
                      className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded p-1"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Follow us on Facebook" 
                      className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded p-1"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* QR Code Section */}
            <div className="mb-6">
              <h3 className="text-lg font-heading font-semibold mb-4">Scan for Contact</h3>
              <div className="bg-white p-3 rounded-md inline-block" id="contact-qr-code">
                <QRCodeGenerator 
                  value={contactUrl} 
                  size={120} 
                  alt="QR code to contact Boppa Golf"
                  title="Scan to contact us"
                  printable={true}
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 flex items-center gap-1"
                  onClick={handleDownloadQR}
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 flex items-center gap-1"
                  onClick={() => setShowQRFullsize(true)}
                >
                  <Camera className="w-4 h-4" />
                  <span>View Full Size</span>
                </Button>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                For quick access to our contact page, save or scan this code
              </p>
            </div>
            
            {/* Legal Links */}
            <h3 className="text-lg font-heading font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <Separator className="bg-gray-700" />
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© {currentYear} Boppa Golf. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/contact" 
              className="inline-block px-3 py-1.5 bg-primary/10 rounded text-primary hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
      
      {/* Fullsize QR Code Modal */}
      {showQRFullsize && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowQRFullsize(false)}
        >
          <div 
            className="bg-white p-8 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4 text-center">
              Boppa Golf Contact QR Code
            </h3>
            <div className="flex items-center justify-center mb-6">
              <QRCodeGenerator 
                value={contactUrl} 
                size={250} 
                alt="QR code to contact Boppa Golf" 
                title="Contact Boppa Golf"
                printable={true}
              />
            </div>
            <p className="text-gray-700 text-center mb-6">
              Scan this QR code with your smartphone to visit our contact page.
              <br />
              Print size should be at least 2cm².
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleDownloadQR}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </Button>
              <Button 
                onClick={() => setShowQRFullsize(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;