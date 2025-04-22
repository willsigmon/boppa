import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";

type ServiceItem = {
  name: string;
  description?: string;
  price: string;
  popular?: boolean;
};

type ServiceCategory = {
  id: string;
  name: string;
  items: ServiceItem[];
};

const ServiceTab = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const serviceCategories: ServiceCategory[] = [
    {
      id: "lie-angle",
      name: "Lie Angle Adjustments",
      items: [
        {
          name: "Irons & Wedges",
          description: "Per club adjustment",
          price: "$5.00",
          popular: true
        }
      ]
    },
    {
      id: "club-sizing",
      name: "Club Sizing",
      items: [
        {
          name: "Steel Shaft",
          description: "Irons and Wedges",
          price: "$5.00"
        },
        {
          name: "Graphite Shaft",
          description: "Drivers, Fairway Woods, Hybrids",
          price: "$7.00"
        }
      ]
    },
    {
      id: "grip-installation",
      name: "Custom Grip Installation",
      items: [
        {
          name: "Driver/Fairway",
          description: "Wood, graphite",
          price: "$8.00",
          popular: true
        },
        {
          name: "Putter",
          description: "",
          price: "$6.00"
        }
      ]
    },
    {
      id: "additional",
      name: "Additional Services",
      items: [
        {
          name: "Additional Tape Wrap",
          description: "Up to two wraps",
          price: "$3.00"
        },
        {
          name: "Broken Shaft Extraction",
          description: "",
          price: "$10.00 - $15.00"
        }
      ]
    },
    {
      id: "resetting",
      name: "Resetting Club Heads",
      items: [
        {
          name: "Driver",
          description: "",
          price: "$20.00"
        },
        {
          name: "Fairway Wood/Hybrid",
          description: "",
          price: "$15.00"
        },
        {
          name: "Irons and Wedges",
          description: "",
          price: "$10.00",
          popular: true
        }
      ]
    },
    {
      id: "shaft-replacement",
      name: "New Shaft Replacement",
      items: [
        {
          name: "Driver",
          description: "",
          price: "$40.00"
        },
        {
          name: "Fairway Wood",
          description: "",
          price: "$30.00"
        }
      ]
    }
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl font-heading font-bold text-center mb-8">Our Services</h2>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="iron">Iron</TabsTrigger>
          <TabsTrigger value="wood">Wood</TabsTrigger>
          <TabsTrigger value="putter">Putter</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceCategories.map(category => (
              <Card key={category.id} className="overflow-hidden">
                <div className="bg-primary p-4">
                  <h3 className="text-xl font-heading font-semibold text-white text-center">{category.name}</h3>
                </div>
                <CardContent className="p-6">
                  {category.items.map((item, i) => (
                    <div key={i} className={`${i !== 0 ? "mt-4 pt-4 border-t border-gray-200" : ""}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{item.name}</span>
                        {item.popular && (
                          <Badge variant="default" className="bg-primary">Popular</Badge>
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
                  
                  {category.id === "grip-installation" && (
                    <div className="mt-4 flex items-start text-sm text-gray-600 italic">
                      <InfoIcon className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                      <span>Old or brittle grips may incur an additional $2.00 per club charge for removal</span>
                    </div>
                  )}
                  
                  {category.id === "club-sizing" && (
                    <div className="mt-4 flex items-start text-sm text-gray-600 italic">
                      <InfoIcon className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                      <span>Inquire about your grip or new grip replacement when sizing clubs</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="iron" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceCategories
              .filter(cat => ["lie-angle", "club-sizing", "resetting"].includes(cat.id))
              .map(category => (
                <Card key={category.id} className="overflow-hidden">
                  <div className="bg-primary p-4">
                    <h3 className="text-xl font-heading font-semibold text-white text-center">{category.name}</h3>
                  </div>
                  <CardContent className="p-6">
                    {category.items
                      .filter(item => item.name.includes("Iron") || item.description?.includes("Iron"))
                      .map((item, i) => (
                        <div key={i} className={`${i !== 0 ? "mt-4 pt-4 border-t border-gray-200" : ""}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{item.name}</span>
                            {item.popular && (
                              <Badge variant="default" className="bg-primary">Popular</Badge>
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
                  </CardContent>
                </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="wood" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceCategories
              .filter(cat => ["grip-installation", "shaft-replacement", "resetting"].includes(cat.id))
              .map(category => (
                <Card key={category.id} className="overflow-hidden">
                  <div className="bg-primary p-4">
                    <h3 className="text-xl font-heading font-semibold text-white text-center">{category.name}</h3>
                  </div>
                  <CardContent className="p-6">
                    {category.items
                      .filter(item => 
                        item.name.includes("Driver") || 
                        item.name.includes("Wood") || 
                        item.description?.includes("Wood")
                      )
                      .map((item, i) => (
                        <div key={i} className={`${i !== 0 ? "mt-4 pt-4 border-t border-gray-200" : ""}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{item.name}</span>
                            {item.popular && (
                              <Badge variant="default" className="bg-primary">Popular</Badge>
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
                  </CardContent>
                </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="putter" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceCategories
              .filter(cat => ["grip-installation"].includes(cat.id))
              .map(category => (
                <Card key={category.id} className="overflow-hidden">
                  <div className="bg-primary p-4">
                    <h3 className="text-xl font-heading font-semibold text-white text-center">{category.name}</h3>
                  </div>
                  <CardContent className="p-6">
                    {category.items
                      .filter(item => item.name.includes("Putter"))
                      .map((item, i) => (
                        <div key={i} className={`${i !== 0 ? "mt-4 pt-4 border-t border-gray-200" : ""}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{item.name}</span>
                            {item.popular && (
                              <Badge variant="default" className="bg-primary">Popular</Badge>
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
                  </CardContent>
                </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceTab;
