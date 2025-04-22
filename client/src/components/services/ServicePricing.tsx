import { Card, CardContent } from "@/components/ui/card";

type PricingCardProps = {
  title: string;
  items: {
    name: string;
    description?: string;
    price: string;
    popular?: boolean;
  }[];
  note?: string;
};

const PricingCard = ({ title, items, note }: PricingCardProps) => {
  return (
    <div className="w-full md:w-1/3 px-4 mb-8">
      <Card className="h-full">
        <div className="bg-primary p-4">
          <h3 className="text-xl font-heading font-semibold text-white text-center">{title}</h3>
        </div>
        <CardContent className="p-6">
          {items.map((item, i) => (
            <div 
              key={i} 
              className={`mb-4 ${i !== items.length - 1 ? "pb-4 border-b border-gray-200" : ""}`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{item.name}</span>
                {item.popular && (
                  <span className="bg-primary text-white text-sm px-2 py-1 rounded">Popular</span>
                )}
              </div>
              {item.description && (
                <div className="flex justify-between">
                  <span className="text-gray-600">{item.description}</span>
                  <span className="font-semibold">{item.price}</span>
                </div>
              )}
              {!item.description && (
                <div className="flex justify-end">
                  <span className="font-semibold">{item.price}</span>
                </div>
              )}
            </div>
          ))}
          
          {note && (
            <div className="text-sm text-gray-600 italic mb-6">
              * {note}
            </div>
          )}
          
          <a href="/contact" className="block text-center border border-primary text-primary font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            Request Service
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

const ServicePricing = () => {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Service Pricing</h2>
        
        <div className="flex flex-wrap -mx-4">
          <PricingCard 
            title="Lie Angle Adjustments"
            items={[
              {
                name: "Irons & Wedges",
                description: "Per club adjustment",
                price: "$5.00",
                popular: true
              }
            ]}
            note="Inquire about multi-club pricing"
          />
          
          <PricingCard 
            title="Shaft Replacements"
            items={[
              {
                name: "Steel Shaft",
                description: "Irons and Wedges",
                price: "$35.00"
              },
              {
                name: "Graphite Shaft",
                description: "Driver, Fairway Woods, Hybrids",
                price: "$37.00"
              }
            ]}
            note="Shaft cost not included"
          />
          
          <PricingCard 
            title="Custom Grip Installation"
            items={[
              {
                name: "Driver, Fairway Woods",
                description: "Wood, graphite",
                price: "$8.00"
              },
              {
                name: "Putter",
                description: "Standard grip",
                price: "$6.00"
              }
            ]}
            note="Old or brittle grips may incur an additional $2.00 per club charge for removal"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicePricing;
