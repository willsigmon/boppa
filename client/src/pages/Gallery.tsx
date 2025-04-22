import { Helmet } from "react-helmet";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GalleryImage {
  id: number;
  src: string; // In a real app, we'd use actual image paths
  alt: string;
  category: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  // Placeholder gallery data - would be replaced with actual images
  const galleryImages: GalleryImage[] = [
    // Repairs
    { id: 1, src: "repair1.jpg", alt: "Club head repair", category: "repairs" },
    { id: 2, src: "repair2.jpg", alt: "Shaft replacement", category: "repairs" },
    { id: 3, src: "repair3.jpg", alt: "Re-gripping process", category: "repairs" },
    { id: 4, src: "repair4.jpg", alt: "Lie angle adjustment", category: "repairs" },
    { id: 5, src: "repair5.jpg", alt: "Loft adjustment", category: "repairs" },
    { id: 6, src: "repair6.jpg", alt: "Grip installation", category: "repairs" },
    
    // Customizations
    { id: 7, src: "custom1.jpg", alt: "Custom painted putter", category: "customizations" },
    { id: 8, src: "custom2.jpg", alt: "Personalized club stamping", category: "customizations" },
    { id: 9, src: "custom3.jpg", alt: "Custom ferrules", category: "customizations" },
    { id: 10, src: "custom4.jpg", alt: "Weight port customization", category: "customizations" },
    { id: 11, src: "custom5.jpg", alt: "Custom club builds", category: "customizations" },
    
    // Before & After
    { id: 12, src: "before-after1.jpg", alt: "Before and after restoration", category: "before-after" },
    { id: 13, src: "before-after2.jpg", alt: "Club face before and after", category: "before-after" },
    { id: 14, src: "before-after3.jpg", alt: "Putter restoration", category: "before-after" },
    { id: 15, src: "before-after4.jpg", alt: "Driver face restoration", category: "before-after" },
    { id: 16, src: "before-after5.jpg", alt: "Wedge grooves before and after", category: "before-after" },
  ];

  return (
    <>
      <Helmet>
        <title>Gallery - Boppa Golf</title>
        <meta name="description" content="Browse our gallery of golf club repairs, customizations, and restorations. See our craftsmanship and attention to detail at Boppa Golf." />
        <meta property="og:title" content="Gallery - Boppa Golf" />
        <meta property="og:description" content="Browse our gallery of golf club repairs, customizations, and restorations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/gallery" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Gallery - Boppa Golf" />
        <meta property="twitter:description" content="Browse our gallery of golf club repairs, customizations, and restorations." />
      </Helmet>
      
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Work Gallery</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse through our portfolio of golf club repairs, customizations, and transformations.
            See the quality of our craftsmanship and attention to detail.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All Work</TabsTrigger>
              <TabsTrigger value="repairs">Repairs</TabsTrigger>
              <TabsTrigger value="customizations">Customizations</TabsTrigger>
              <TabsTrigger value="before-after">Before & After</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image) => (
                <GalleryItem 
                  key={image.id} 
                  image={image} 
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="repairs" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages
                .filter(image => image.category === "repairs")
                .map((image) => (
                  <GalleryItem 
                    key={image.id} 
                    image={image} 
                    onClick={() => setSelectedImage(image)}
                  />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="customizations" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages
                .filter(image => image.category === "customizations")
                .map((image) => (
                  <GalleryItem 
                    key={image.id} 
                    image={image} 
                    onClick={() => setSelectedImage(image)}
                  />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="before-after" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages
                .filter(image => image.category === "before-after")
                .map((image) => (
                  <GalleryItem 
                    key={image.id} 
                    image={image} 
                    onClick={() => setSelectedImage(image)}
                  />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
        
        <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
          {selectedImage && (
            <DialogContent className="sm:max-w-3xl">
              <div className="aspect-w-16 aspect-h-9">
                <div className="bg-gray-200 w-full h-96 flex items-center justify-center">
                  {/* In a real app, this would be an actual image */}
                  <span className="text-gray-500">{selectedImage.alt}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{selectedImage.alt}</h3>
                <p className="text-gray-600 capitalize mt-1">Category: {selectedImage.category.replace('-', ' ')}</p>
              </div>
            </DialogContent>
          )}
        </Dialog>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Share Your Story</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Have we worked on your clubs? We'd love to feature your before and after photos in our gallery.
          </p>
          <a 
            href="/contact" 
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/80 transition-colors inline-block"
          >
            Submit Your Photos
          </a>
        </div>
      </section>
    </>
  );
}

function GalleryItem({ image, onClick }: { image: GalleryImage; onClick: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div 
          className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transform transition hover:scale-105"
          onClick={onClick}
        >
          <div className="aspect-w-1 aspect-h-1">
            {/* In a real app, this would be an actual image with src={image.src} */}
            <div className="bg-gray-200 w-full h-64 flex items-center justify-center">
              <span className="text-gray-500">{image.alt}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 truncate">{image.alt}</h3>
            <p className="text-gray-600 text-sm capitalize">{image.category.replace('-', ' ')}</p>
          </div>
        </div>
      </DialogTrigger>
    </Dialog>
  );
}