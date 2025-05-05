
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import PhoneDisplay from './PhoneDisplay';

type SectionProps = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
  position: 'left' | 'right' | 'center';
  ctaText?: string;
  onCTAClick?: () => void;
  children?: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  subtitle, 
  description, 
  isActive, 
  position,
  ctaText,
  onCTAClick,
  children 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <section 
      id={id} 
      className={cn(
        "section-wrapper",
        {
          "justify-start": position === 'left',
          "justify-end": position === 'right',
          "justify-center": position === 'center'
        }
      )}
    >
      <div className={cn(
        "w-full max-w-md p-6 rounded-lg",
        {
          "animate-fade-in": isActive,
          "opacity-100": isActive,
          "opacity-70": !isActive,
        },
        isMobile
          ? "mx-auto px-4 text-center" 
          : position === 'left' ? 'ml-6 md:ml-20' : 'mr-6 md:mr-20'
      )}>
        <h3 className="text-sm font-semibold text-theme-indigo uppercase tracking-wider mb-2">
          {subtitle}
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-theme-blue to-theme-purple bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        {children}
        {ctaText && (
          <Button 
            onClick={onCTAClick} 
            className={cn(
              "bg-gradient-to-r from-theme-blue to-theme-purple hover:opacity-90 transition-opacity",
            )}
          >
            {ctaText}
          </Button>
        )}
      </div>

      {/* Show phone on desktop in the appropriate position */}
      {!isMobile && isActive && (
        <div className={cn(
          "hidden md:block",
          position === 'left' ? 'absolute right-6 md:right-20 top-1/2 -translate-y-1/2' : 
          position === 'right' ? 'absolute left-6 md:left-20 top-1/2 -translate-y-1/2' : 
          'mx-auto'
        )}>
          <PhoneDisplay activeSection={id.replace('-section', '')} />
        </div>
      )}
    </section>
  );
};

export default Section;
