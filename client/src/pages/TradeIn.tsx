import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  LoadingButton, 
  GolfTeeLoader,
  SubmitSuccessAnimation 
} from "@/components/ui/loading-animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

// Enhanced form schema with conditional fields
const tradeInFormSchema = z.object({
  // Contact information
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  
  // Club information
  clubType: z.string().min(1, { message: "Please select a club type." }),
  brand: z.string().min(1, { message: "Please enter the club brand." }),
  model: z.string().min(1, { message: "Please enter the club model." }),
  condition: z.string().min(1, { message: "Please select the condition." }),
  year: z.string().optional(),
  description: z.string().optional(),
  
  // Shaft information
  includeShaft: z.boolean().default(false),
  shaftBrand: z.string().optional(),
  shaftModel: z.string().optional(),
  shaftFlex: z.string().optional(),
  
  // Grip information
  hasCustomGrips: z.boolean().default(false),
  gripDetails: z.string().optional(),
  lastRegrippedDate: z.date().optional(),
  
  // For iron sets
  isIronSet: z.boolean().default(false),
  setComposition: z.string().optional(),
  
  // For putter
  hasPutterHeadcover: z.boolean().default(false),
  
  // Budget and value
  estimatedValue: z.string().optional(),
  replacementBudget: z.string().optional(),
  
  // Contact preferences
  preferredContact: z.enum(["email", "phone", "either"], {
    required_error: "Please select your preferred contact method.",
  }),
  
  // Hidden honeypot field for spam protection
  website: z.string().refine(val => val === "", {
    message: "This field should be empty",
  }),
});

type TradeInFormValues = z.infer<typeof tradeInFormSchema>;

export default function TradeIn() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionTime, setSubmissionTime] = useState<number>(Date.now());
  
  const form = useForm<TradeInFormValues>({
    resolver: zodResolver(tradeInFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      clubType: "",
      brand: "",
      model: "",
      condition: "",
      year: "",
      description: "",
      includeShaft: false,
      shaftBrand: "",
      shaftModel: "",
      shaftFlex: "",
      hasCustomGrips: false,
      gripDetails: "",
      isIronSet: false,
      setComposition: "",
      hasPutterHeadcover: false,
      estimatedValue: "",
      replacementBudget: "",
      preferredContact: "either",
      website: "", // Honeypot field
    },
  });
  
  // Watch form values for conditional fields
  const clubType = form.watch("clubType");
  const includeShaft = form.watch("includeShaft");
  const hasCustomGrips = form.watch("hasCustomGrips");
  const isIronSet = form.watch("isIronSet");
  
  // When club type changes, set relevant defaults
  useEffect(() => {
    if (clubType === "iron_set") {
      form.setValue("isIronSet", true);
    } else {
      form.setValue("isIronSet", false);
      form.setValue("setComposition", "");
    }
    
    if (clubType === "putter") {
      form.setValue("includeShaft", false);
    }
  }, [clubType, form]);
  
  // Set submission time on component mount
  useEffect(() => {
    setSubmissionTime(Date.now());
  }, []);

  async function onSubmit(data: TradeInFormValues) {
    setIsSubmitting(true);
    
    try {
      // Time-based spam detection
      const timeElapsed = Date.now() - submissionTime;
      if (timeElapsed < 3000) {
        console.log("Form submitted too quickly, likely a bot");
        // Add a delay to simulate processing and show the loading animation
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast({
          title: "Trade-in Request Submitted",
          description: "We'll review your information and contact you shortly.",
        });
        
        form.reset();
        setIsSubmitting(false);
        return;
      }
      
      // Honeypot check
      if (data.website !== "") {
        console.log("Honeypot triggered, likely a bot");
        // Add a delay to simulate processing and show the loading animation
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast({
          title: "Trade-in Request Submitted",
          description: "We'll review your information and contact you shortly.",
        });
        
        form.reset();
        setIsSubmitting(false);
        return;
      }
      
      // Remove honeypot field before submission
      const { website, ...cleanData } = data;
      
      // Simulate API call with a bit longer delay to showcase the animation
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      console.log("Trade-in form submitted:", cleanData);
      
      toast({
        title: "Trade-in Request Submitted",
        description: "We'll review your information and contact you shortly.",
      });
      
      form.reset();
      // Reset the submission time after successful submission
      setSubmissionTime(Date.now());
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Trade-In Your Clubs - Boppa Golf</title>
        <meta name="description" content="Trade in your old golf clubs for credit toward new equipment or repairs. Boppa Golf offers fair appraisals and top value for your used golf gear." />
        <meta property="og:title" content="Trade-In Your Clubs - Boppa Golf" />
        <meta property="og:description" content="Trade in your old golf clubs for credit toward new equipment or repairs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/trade-in" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Trade-In Your Clubs - Boppa Golf" />
        <meta property="twitter:description" content="Trade in your old golf clubs for credit toward new equipment or repairs." />
      </Helmet>
      
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Trade-In Your Golf Clubs</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get credit for your used golf equipment. Fill out the form below to start the trade-in process.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Contact Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="email" id="contact-email" />
                            <FormLabel htmlFor="contact-email" className="cursor-pointer">Email</FormLabel>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="phone" id="contact-phone" />
                            <FormLabel htmlFor="contact-phone" className="cursor-pointer">Phone</FormLabel>
                          </div>
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value="either" id="contact-either" />
                            <FormLabel htmlFor="contact-either" className="cursor-pointer">Either</FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-medium mb-4">Club Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="clubType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Club Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select club type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="driver">Driver</SelectItem>
                            <SelectItem value="fairway_wood">Fairway Wood</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="iron_set">Iron Set</SelectItem>
                            <SelectItem value="wedge">Wedge</SelectItem>
                            <SelectItem value="putter">Putter</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Titleist, Callaway" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. AP2, Rogue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 2022" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="like_new">Like New (9-10)</SelectItem>
                            <SelectItem value="very_good">Very Good (7-8)</SelectItem>
                            <SelectItem value="good">Good (5-6)</SelectItem>
                            <SelectItem value="fair">Fair (3-4)</SelectItem>
                            <SelectItem value="poor">Poor (1-2)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Only show iron set options if iron_set is selected */}
                  {clubType === "iron_set" && (
                    <FormField
                      control={form.control}
                      name="setComposition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Set Composition</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 4-PW, 5-SW" {...field} />
                          </FormControl>
                          <FormDescription>
                            List which irons are included in the set
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {/* Only show headcover option if putter is selected */}
                  {clubType === "putter" && (
                    <FormField
                      control={form.control}
                      name="hasPutterHeadcover"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Includes original headcover</FormLabel>
                            <FormDescription>
                              Original headcovers can increase trade-in value
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Details</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe any unique features, modifications, or damage"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Shaft Information Section (conditionally shown if not a putter) */}
                {clubType !== "putter" && (
                  <div className="mt-6">
                    <FormField
                      control={form.control}
                      name="includeShaft"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Include shaft information</FormLabel>
                            <FormDescription>
                              Provide details about the shaft for a more accurate valuation
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                {/* Shaft details section - conditional */}
                {includeShaft && clubType !== "putter" && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium mb-4">Shaft Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="shaftBrand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shaft Brand</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Project X, Fujikura" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="shaftModel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shaft Model</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. HZRDUS Smoke, Ventus" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="shaftFlex"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shaft Flex</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select shaft flex" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="extra_stiff">Extra Stiff (X)</SelectItem>
                                <SelectItem value="stiff">Stiff (S)</SelectItem>
                                <SelectItem value="regular">Regular (R)</SelectItem>
                                <SelectItem value="senior">Senior (A)</SelectItem>
                                <SelectItem value="ladies">Ladies (L)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                
                {/* Grip Information Section */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-4">Grip Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="hasCustomGrips"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-6">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Custom/aftermarket grips installed</FormLabel>
                          <FormDescription>
                            Check if the club has custom grips different from the stock options
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {hasCustomGrips && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="gripDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Grip Details</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Golf Pride MCC Plus4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastRegrippedDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Last Regrip Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date > new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Approximate date when grips were last replaced
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                
                {/* Budget and Value Section */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-4">Value & Replacement</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="estimatedValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Value (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your estimation of the club's value" {...field} />
                          </FormControl>
                          <FormDescription>
                            If you have an idea of what your club is worth, let us know
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="replacementBudget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Replacement Budget (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your budget for a replacement" {...field} />
                          </FormControl>
                          <FormDescription>
                            If you're looking to replace this club, what's your budget?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              {/* Honeypot field - hidden from real users, visible to bots */}
              <div className="sr-only" aria-hidden="true">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormLabel htmlFor="website">Website</FormLabel>
                      <FormControl>
                        <Input
                          id="website"
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
              
              <LoadingButton 
                type="submit" 
                className="w-full" 
                isLoading={isSubmitting}
                loadingText="Submitting..."
              >
                Submit Trade-In Request
              </LoadingButton>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
}