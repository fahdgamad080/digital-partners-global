
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full backdrop-blur-md z-50 border-b transition-colors duration-200",
      scrolled ? "bg-background/80" : "bg-transparent border-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-theme-blue to-theme-purple bg-clip-text text-transparent">
            DigitalSync
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-foreground hover:text-theme-blue transition-colors">Home</a>
          <a href="#services" className="text-foreground hover:text-theme-blue transition-colors">Services</a>
          <a href="#realestate" className="text-foreground hover:text-theme-blue transition-colors">Real Estate</a>
          <a href="#retail" className="text-foreground hover:text-theme-blue transition-colors">Retail</a>
          <a href="#fintech" className="text-foreground hover:text-theme-blue transition-colors">Fintech</a>
        </nav>
        
        <div>
          <Button className={cn(
            "bg-gradient-to-r from-theme-blue to-theme-purple hover:opacity-90 transition-opacity",
          )}>
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
