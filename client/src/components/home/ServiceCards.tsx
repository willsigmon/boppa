import { CheckIcon } from "lucide-react";
import { Link } from "wouter";

type ServiceCardProps = {
  title: string;
  description: string;
  features: string[];
};

const ServiceCard = ({ title, description, features }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform duration-300 hover:scale-[1.02]">
      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-5">{description}</p>
        <ul className="text-gray-700 mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
        <Link href="/contact" className="btn-primary inline-block">
          Learn More
        </Link>
      </div>
    </div>
  );
};

const ServiceCards = () => {
  const services = [
    {
      title: "Regripping",
      description: "Restore your clubs' grip and feel like new. Starting at $4.00 per club.",
      features: [
        "Multiple grip options available",
        "Professional installation",
        "Quick turnaround time"
      ]
    },
    {
      title: "Custom Builds",
      description: "Tailored to your game, built to your exact specifications. Perfect for precision.",
      features: [
        "Full club fitting consultation",
        "Premium component options",
        "Expert craftsmanship"
      ]
    },
    {
      title: "Rust Removal & Polishing",
      description: "Bring your old clubs back to life with our rust removal and finishing services.",
      features: [
        "Professional rust removal",
        "High-quality polishing",
        "Protective finish application"
      ]
    }
  ];

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              features={service.features}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services" className="inline-block bg-primary text-white font-medium py-3 px-8 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 shadow-md">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
