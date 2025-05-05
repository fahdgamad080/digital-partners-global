
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
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
              alt="Digital solutions home" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'services':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742" 
              alt="Digital services" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'realestate':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa" 
              alt="Real estate solutions" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'retail':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" 
              alt="Retail technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'fintech':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1460574283810-2aab119d8511" 
              alt="Financial technology visualization" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'healthcare':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef" 
              alt="Healthcare technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'education':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b" 
              alt="Educational technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'logistics':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088" 
              alt="Logistics technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'entertainment':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09" 
              alt="Entertainment technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'automotive':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341" 
              alt="Automotive technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'sustainability':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c" 
              alt="Sustainability technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'cybersecurity':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" 
              alt="Cybersecurity technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );
        
      case 'manufacturing':
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1565462905102-140e712045aa" 
              alt="Manufacturing technology" 
              className="w-full h-full object-cover"
            />
          </div>
        );

      default:
        return (
          <div className="h-full w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
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

