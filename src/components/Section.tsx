
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SectionProps = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
  position: 'left' | 'right';
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
  return (
    <section 
      id={id} 
      className={cn(
        "section-wrapper",
        position === 'left' ? 'justify-start' : 'justify-end',
      )}
    >
      <div className={cn(
        "max-w-md p-6 rounded-lg",
        {
          "animate-fade-in": isActive,
          "opacity-100": isActive,
          "opacity-70": !isActive,
        },
        position === 'left' ? 'ml-6 md:ml-20' : 'mr-6 md:mr-20'
      )}>
        <h3 className="text-sm font-semibold text-theme-indigo uppercase tracking-wider mb-2">
          {subtitle}
        </h3>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-theme-blue to-theme-purple bg-clip-text text-transparent">
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
    </section>
  );
};

export default Section;
