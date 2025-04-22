import { useState, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  LoadingButton,
  SubmitSuccessAnimation 
} from "@/components/ui/loading-animations";

// Extended schema with honeypot field
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  serviceType: z.string().optional(),
  message: z.string().min(5, "Message is required and must be at least 5 characters"),
  // Honeypot field - should remain empty
  phone: z.string().refine(val => val === "", {
    message: "This field should be empty", // This message won't be shown to users
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const submissionTimeRef = useRef(Date.now());
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      serviceType: "",
      message: "",
      phone: "", // Honeypot field starts empty
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Time-based bot detection - if form is submitted too quickly (< 3 seconds), likely a bot
      const timeElapsed = Date.now() - submissionTimeRef.current;
      if (timeElapsed < 3000) {
        console.log("Form submitted too quickly, likely a bot");
        // Add artificial delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitted(true);
        return;
      }
      
      // If honeypot field has a value, silently reject the submission
      if (data.phone !== "") {
        console.log("Honeypot triggered, likely a bot");
        // Add artificial delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitted(true);
        return;
      }
      
      // Remove honeypot field before submission
      const { phone, ...submissionData } = data;
      
      // Add artificial delay to make the animation more noticeable for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await apiRequest("POST", "/api/contact", submissionData);
      setIsSubmitted(true);
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible!",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <SubmitSuccessAnimation text="Thank You!" />
          <p className="text-gray-600 mt-2">Your message has been sent successfully. We'll get back to you shortly.</p>
        </div>
      </div>
    );
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4">Send Us a Message</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your first name" 
                    {...field} 
                    aria-required="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your last name" 
                    {...field} 
                    aria-required="true"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  {...field} 
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Honeypot field - hidden from users but visible to bots */}
        <div className="sr-only" aria-hidden="true">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel htmlFor="phone">Phone</FormLabel>
                <FormControl>
                  <Input
                    id="phone"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Service Needed</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="regripping">Regripping</SelectItem>
                  <SelectItem value="custom-build">Custom Club Build</SelectItem>
                  <SelectItem value="shaft-replacement">Shaft Replacement</SelectItem>
                  <SelectItem value="rust-removal">Rust Removal & Polishing</SelectItem>
                  <SelectItem value="other">Other Services</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Message <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your service needs..." 
                  rows={4} 
                  {...field} 
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <LoadingButton 
          type="submit" 
          className="w-full"
          isLoading={isSubmitting}
          loadingText="Sending..."
        >
          Send
        </LoadingButton>
      </form>
    </Form>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-800 mb-6">
                Have Questions or Ready to Transform Your Clubs?
              </h2>
              <p className="text-gray-700 mb-6">
                Get in touch with Boppa Golf today! Whether you're looking for a quick regrip, a custom club build, or advice on improving your game, we're here to help.
              </p>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">info@boppagolf.com</p>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-gray-800">Visit Our Workshop</h3>
                  <p className="text-gray-600">123 Golf Club Ave, Suite 100<br/>Fairway, GA 30000</p>
                </div>
              </div>
            </div>
            
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;