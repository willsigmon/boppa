import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SkipToContent from "@/components/ui/skip-to-content";
import { usePageLoading, useGlobalPageLoading } from "@/hooks/use-page-loading";
import PageLoader from "@/components/layout/PageLoader";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Products from "@/pages/Products";
import TradeIn from "@/pages/TradeIn";
import SellClubs from "@/pages/SellClubs";
import Faqs from "@/pages/Faqs";
import Gallery from "@/pages/Gallery";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/not-found";

/**
 * Router component handling the application's routing and layout structure.
 * Wraps all routes in the main application layout with header and footer.
 */
function Router() {
  // Use the page loading hook to track route changes
  const { isLoading } = usePageLoading();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page loading animation */}
      <PageLoader isLoading={isLoading} text="Loading..." minDisplayTime={800} />
      
      <SkipToContent target="#main-content" />
      <Header />
      <main id="main-content" className="flex-grow" role="main">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/reviews" component={Reviews} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
          <Route path="/trade-in" component={TradeIn} />
          <Route path="/sell" component={SellClubs} />
          <Route path="/faqs" component={Faqs} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Main Application component that wraps the entire application with necessary providers
 * such as QueryClientProvider for data fetching and TooltipProvider for UI tooltips.
 */
function App() {
  // Initialize global loading state hook
  const { isLoading } = useGlobalPageLoading();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
