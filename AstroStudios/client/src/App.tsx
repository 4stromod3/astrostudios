import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import BlogPage from "@/pages/blog";
import GameDetailPage from "@/pages/game-detail";
import BlogPostPage from "@/pages/blog-post";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScroll } from "@/hooks/use-scroll";

function Router() {
  const [location] = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/games/:slug" component={GameDetailPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const scrolled = useScroll(50);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Navbar scrolled={scrolled} />
          <Router />
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
