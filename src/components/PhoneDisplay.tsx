
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type PhoneDisplayProps = {
  activeSection: string;
  className?: string;
};

const PhoneDisplay: React.FC<PhoneDisplayProps> = ({ activeSection, className }) => {
  const [screenContent, setScreenContent] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const updateScreen = async () => {
      if (screenContent !== activeSection) {
        setIsTransitioning(true);
        
        // Small timeout to allow animation to finish
        setTimeout(() => {
          setScreenContent(activeSection);
          setIsTransitioning(false);
        }, 300);
      }
    };
    
    updateScreen();
  }, [activeSection, screenContent]);

  const getScreenContent = () => {
    switch (screenContent) {
      case 'home':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/1.png" 
              alt="Digital solutions home" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'services':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/2.png" 
              alt="Digital services" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'realestate':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/3.png" 
              alt="Real estate solutions" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'retail':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/4.png" 
              alt="Retail technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'fintech':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/5.png" 
              alt="Financial technology visualization" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'healthcare':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/5.png" 
              alt="Healthcare technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'education':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/6.png" 
              alt="Educational technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'logistics':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/7.png" 
              alt="Logistics technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'entertainment':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/8.png" 
              alt="Entertainment technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'automotive':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/9.png" 
              alt="Automotive technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'sustainability':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/10.png" 
              alt="Sustainability technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'cybersecurity':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/11.png" 
              alt="Cybersecurity technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'manufacturing':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/12.png" 
              alt="Manufacturing technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );

      default:
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="public/13.png" 
              alt="Digital solutions" 
              className="w-full h-full object-cover"
            />
          </div>
        );
    }
  };

  return (
    <div className={cn("phone-container shadow-2xl transform transition-all duration-500 ease-in-out", className)}>
      <div className="phone-screen-content">
        <div className={cn("w-full h-full relative", {
          "animate-fade-out": isTransitioning,
          "animate-phone-screen-change": !isTransitioning && screenContent,
        })}>
          {getScreenContent()}
        </div>
      </div>
    </div>
  );
};

export default PhoneDisplay;

