
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import PhoneDisplay from '../components/PhoneDisplay';
import Section from '../components/Section';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [phoneFixed, setPhoneFixed] = useState(false);
  const [phonePosition, setPhonePosition] = useState('center'); // 'center', 'left', 'right'
  const phoneRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const lastSectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    realestate: useRef<HTMLDivElement>(null),
    retail: useRef<HTMLDivElement>(null),
    fintech: useRef<HTMLDivElement>(null),
    healthcare: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    logistics: useRef<HTMLDivElement>(null),
    entertainment: useRef<HTMLDivElement>(null),
    automotive: useRef<HTMLDivElement>(null),
    sustainability: useRef<HTMLDivElement>(null),
    cybersecurity: useRef<HTMLDivElement>(null),
    manufacturing: useRef<HTMLDivElement>(null),
  };
  
  // Function to check which section is currently visible
  const handleScroll = () => {
    // On mobile, we don't need to fix the phone position
    if (isMobile) {
      // Just determine active section for mobile
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section in sectionRefs) {
        const currentRef = sectionRefs[section as keyof typeof sectionRefs].current;
        
        if (currentRef) {
          const offsetTop = currentRef.offsetTop;
          const offsetBottom = offsetTop + currentRef.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
          }
        }
      }
      return;
    }
    
    // Desktop behavior
    if (phoneRef.current && heroRef.current) {
      const phonePosition = phoneRef.current.getBoundingClientRect().top;
      const shouldBeFixed = phonePosition <= 100; // Add some buffer for smooth transition

      // Check if we've reached the last section
      if (lastSectionRef.current) {
        const lastSectionBottom = lastSectionRef.current.getBoundingClientRect().bottom;
        // If we've scrolled past the bottom of the last section, unfix the phone
        if (lastSectionBottom < 750) {  // Adjust this value based on when you want to unfix the phone
          setPhoneFixed(false);
          return;
        }
      }
      
      if (shouldBeFixed !== phoneFixed) {
        setPhoneFixed(shouldBeFixed);
      }
    }
    
    // Determine active section
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (const section in sectionRefs) {
      const currentRef = sectionRefs[section as keyof typeof sectionRefs].current;
      
      if (currentRef) {
        const offsetTop = currentRef.offsetTop;
        const offsetBottom = offsetTop + currentRef.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
          
          // Update phone position based on section
          if (section === 'home') {
            setPhonePosition('center');
          } else if (section === 'services' || section === 'retail' || section === 'healthcare' || section === 'logistics' || section === 'automotive' || section === 'cybersecurity') {
            setPhonePosition('right');
          } else if (section === 'realestate' || section === 'fintech' || section === 'education' || section === 'entertainment' || section === 'sustainability' || section === 'manufacturing') {
            setPhonePosition('left');
          }
        }
      }
    }
  };
  
  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [phoneFixed, isMobile]);
  
  return (
    <div className="relative">
      <Header />
      
      {/* Fixed Position Phone Display (when scrolled on desktop) */}
      {!isMobile && phoneFixed && (
        <div className={cn(
          "fixed top-1/2 transform -translate-y-1/2 z-40 transition-all duration-500 ease-in-out",
          {
            "left-1/2 -translate-x-1/2": phonePosition === 'center',
            "left-1/4 -translate-x-1/2": phonePosition === 'left',
            "left-3/4 -translate-x-1/2": phonePosition === 'right',
          }
        )}>
          <PhoneDisplay activeSection={activeSection} />
        </div>
      )}
      
      {/* Hero Section */}
      <div 
        ref={sectionRefs.home} 
        id="home" 
        className="min-h-screen flex flex-col items-center justify-start pt-24 bg-gradient-to-r from-gray-50 to-blue-50"
      >
        <div className="container mx-auto px-4 text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-theme-blue to-theme-purple bg-clip-text text-transparent">
            Digital Solutions <br />For Modern Businesses
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your business with our innovative digital solutions that help you stay ahead in today's rapidly evolving market.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-theme-blue to-theme-purple hover:opacity-90 transition-opacity"
            >
              Get Started
            </Button>
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Initial Phone Display Position (below hero text) */}
        <div ref={heroRef} className="mb-16 relative">
          <div ref={phoneRef} className={cn(
            "transition-opacity duration-300",
            phoneFixed && !isMobile ? "opacity-0" : "opacity-100"
          )}>
            <PhoneDisplay activeSection={activeSection} />
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div ref={sectionRefs.services} id="services" className="relative">
        <Section 
          id="services-section"
          title="Comprehensive Digital Services"
          subtitle="Our Services"
          description="We deliver end-to-end digital solutions that transform businesses across industries. Our expertise spans app development, web solutions, and digital strategy."
          isActive={activeSection === 'services'}
          position={isMobile ? 'center' : 'left'}
          ctaText="View All Services"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">App Development</h3>
              <p className="text-sm text-gray-600">Native & cross-platform mobile applications</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Web Development</h3>
              <p className="text-sm text-gray-600">Responsive websites & web applications</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-indigo" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">Data Analytics</h3>
              <p className="text-sm text-gray-600">Insights & visualization solutions</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-teal" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 7H7v6h6V7z" />
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 012 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium mb-1">UI/UX Design</h3>
              <p className="text-sm text-gray-600">User-centered design solutions</p>
            </div>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>
      
      {/* Real Estate Section */}
      <div ref={sectionRefs.realestate} id="realestate" className="relative bg-gray-50">
        <Section 
          id="realestate-section"
          title="Revolutionary Real Estate Solutions"
          subtitle="Real Estate"
          description="Transform the property buying, selling, and management experience with our cutting-edge real estate technology solutions that streamline operations and enhance customer engagement."
          isActive={activeSection === 'realestate'}
          position={isMobile ? 'center' : 'right'}
          ctaText="Explore Real Estate Solutions"
        >
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 011.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Property Management</h3>
                <p className="text-sm text-gray-600">Streamlined solutions for property managers</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Virtual Tours</h3>
                <p className="text-sm text-gray-600">Immersive property viewing experience</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-indigo" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Market Analytics</h3>
                <p className="text-sm text-gray-600">Data-driven property insights</p>
              </div>
            </div>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>
      
      {/* Retail Section */}
      <div ref={sectionRefs.retail} id="retail" className="relative">
        <Section 
          id="retail-section"
          title="Retail Technology Solutions"
          subtitle="Retail"
          description="Enhance your retail operations with our innovative technology solutions that connect online and offline shopping experiences, optimize inventory, and deliver personalized customer experiences."
          isActive={activeSection === 'retail'}
          position={isMobile ? 'center' : 'left'}
          ctaText="Discover Retail Solutions"
        >
          <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
            <h3 className="font-medium mb-3">Key Benefits</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Omnichannel Shopping Experience</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Inventory Management Optimization</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Customer Analytics & Insights</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Personalized Shopping Experience</span>
              </li>
            </ul>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>
      
      {/* Fintech Section */}
      <div ref={sectionRefs.fintech} id="fintech" className="relative bg-gray-50">
        <Section 
          id="fintech-section"
          title="Financial Technology Solutions"
          subtitle="Fintech"
          description="Transform your financial services with our secure, user-friendly fintech solutions that streamline payments, investments, and financial management for businesses and individuals."
          isActive={activeSection === 'fintech'}
          position={isMobile ? 'center' : 'right'}
          ctaText="Explore Fintech Solutions"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Payment Processing</h3>
              <p className="text-xs text-gray-600">Secure, fast transactions</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 001.414 1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Investment Platforms</h3>
              <p className="text-xs text-gray-600">Accessible investing tools</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-indigo" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Banking APIs</h3>
              <p className="text-xs text-gray-600">Secure integrations</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-teal" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Security Solutions</h3>
              <p className="text-xs text-gray-600">Advanced fraud protection</p>
            </div>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>

      {/* Healthcare Section */}
      <div ref={sectionRefs.healthcare} id="healthcare" className="relative">
        <Section 
          id="healthcare-section"
          title="Healthcare Technology Solutions"
          subtitle="Healthcare"
          description="Revolutionize patient care and medical operations with our innovative healthcare technology solutions designed to improve efficiency, accuracy, and patient outcomes."
          isActive={activeSection === 'healthcare'}
          position={isMobile ? 'center' : 'left'}
          ctaText="Explore Healthcare Solutions"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Telemedicine</h3>
              <p className="text-xs text-gray-600">Virtual care platforms</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Electronic Records</h3>
              <p className="text-xs text-gray-600">Seamless medical data</p>
            </div>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>

      {/* Education Section */}
      <div ref={sectionRefs.education} id="education" className="relative bg-gray-50">
        <Section 
          id="education-section"
          title="Educational Technology Solutions"
          subtitle="Education"
          description="Transform learning experiences with our innovative edtech solutions that enhance engagement, personalization, and accessibility for students of all ages."
          isActive={activeSection === 'education'}
          position={isMobile ? 'center' : 'right'}
          ctaText="Discover EdTech Solutions"
        >
          <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
            <h3 className="font-medium mb-3">Key Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Interactive Learning Platforms</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Virtual Classrooms</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Adaptive Learning Systems</span>
              </li>
            </ul>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>

      {/* Logistics Section */}
      <div ref={sectionRefs.logistics} id="logistics" className="relative">
        <Section 
          id="logistics-section"
          title="Logistics & Supply Chain Solutions"
          subtitle="Logistics"
          description="Optimize your supply chain with our cutting-edge logistics technology that provides real-time tracking, predictive analytics, and end-to-end visibility."
          isActive={activeSection === 'logistics'}
          position={isMobile ? 'center' : 'left'}
          ctaText="Explore Logistics Solutions"
        >
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Fleet Management</h3>
                <p className="text-sm text-gray-600">Optimize delivery routes and tracking</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Inventory Optimization</h3>
                <p className="text-sm text-gray-600">Smart warehouse management</p>
              </div>
            </div>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>

      {/* Entertainment Section */}
      <div ref={sectionRefs.entertainment} id="entertainment" className="relative bg-gray-50">
        <Section 
          id="entertainment-section"
          title="Digital Entertainment Solutions"
          subtitle="Entertainment"
          description="Create immersive digital experiences with our entertainment technology solutions that engage audiences through virtual reality, augmented reality, and interactive content."
          isActive={activeSection === 'entertainment'}
          position={isMobile ? 'center' : 'right'}
          ctaText="Discover Entertainment Tech"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-indigo" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Virtual Reality</h3>
              <p className="text-xs text-gray-600">Immersive experiences</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-teal" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.667 1.952a.5.5 0 00-.833 0l-6.667 11.5a.5.5 0 00.416.775h13.332a.5.5 0 00.417-.775l-6.667-11.5z" />
                </svg>
              </div>
              <h3 className="font-medium">Augmented Reality</h3>
              <p className="text-xs text-gray-600">Enhanced digital overlays</p>
            </div>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>

      {/* Automotive Section */}
      <div ref={sectionRefs.automotive} id="automotive" className="relative">
        <Section 
          id="automotive-section"
          title="Automotive Technology Solutions"
          subtitle="Automotive"
          description="Drive innovation in the automotive industry with our smart mobility solutions, connected vehicle systems, and advanced diagnostic tools."
          isActive={activeSection === 'automotive'}
          position={isMobile ? 'center' : 'left'}
          ctaText="Explore Automotive Tech"
        >
          <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
            <h3 className="font-medium mb-3">Key Solutions</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Connected Vehicle Systems</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Advanced Driver Assistance</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Vehicle Diagnostics</span>
              </li>
            </ul>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>

      {/* Sustainability Section */}
      <div ref={sectionRefs.sustainability} id="sustainability" className="relative bg-gray-50">
        <Section 
          id="sustainability-section"
          title="Sustainable Technology Solutions"
          subtitle="Sustainability"
          description="Empower your organization's environmental initiatives with our sustainable technology solutions that optimize resource usage, reduce waste, and track environmental impact."
          isActive={activeSection === 'sustainability'}
          position={isMobile ? 'center' : 'right'}
          ctaText="Explore Green Tech"
        >
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Carbon Footprint Tracking</h3>
                <p className="text-sm text-gray-600">Monitor and reduce emissions</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Energy Efficiency</h3>
                <p className="text-sm text-gray-600">Smart resource optimization</p>
              </div>
            </div>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>

      {/* Cybersecurity Section */}
      <div ref={sectionRefs.cybersecurity} id="cybersecurity" className="relative">
        <Section 
          id="cybersecurity-section"
          title="Advanced Cybersecurity Solutions"
          subtitle="Cybersecurity"
          description="Protect your digital assets with our comprehensive cybersecurity solutions that safeguard against threats, vulnerabilities, and data breaches."
          isActive={activeSection === 'cybersecurity'}
          position={isMobile ? 'center' : 'left'}
          ctaText="Strengthen Your Security"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Threat Detection</h3>
              <p className="text-xs text-gray-600">Proactive monitoring</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-medium">Data Encryption</h3>
              <p className="text-xs text-gray-600">Enterprise-grade security</p>
            </div>
          </div>
          {isMobile && (
            <div className="mt-8 flex justify-center">
              <PhoneDisplay activeSection={activeSection} className="scale-75" />
            </div>
          )}
        </Section>
      </div>

      {/* Manufacturing Section */}
      <div ref={sectionRefs.manufacturing} id="manufacturing" className="relative bg-gray-50">
        <div ref={lastSectionRef}>
          <Section 
            id="manufacturing-section"
            title="Smart Manufacturing Solutions"
            subtitle="Manufacturing"
            description="Transform your production processes with our Industry 4.0 solutions that integrate IoT, AI, and automation to enhance efficiency, quality, and flexibility."
            isActive={activeSection === 'manufacturing'}
            position={isMobile ? 'center' : 'right'}
            ctaText="Explore Manufacturing Tech"
          >
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
              <h3 className="font-medium mb-3">Industry 4.0 Technologies</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Industrial IoT Solutions</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Predictive Maintenance</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Digital Twins</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Smart Factory Automation</span>
                </li>
              </ul>
            </div>
            {isMobile && (
              <div className="mt-8 flex justify-center">
                <PhoneDisplay activeSection={activeSection} className="scale-75" />
              </div>
            )}
          </Section>
        </div>
      </div>
      
      {/* CTA Section */}
      <div ref={footerRef} className="py-20 bg-gradient-to-r from-theme-blue to-theme-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Let's work together to create innovative digital solutions that drive growth and success.
          </p>
          <Button className="bg-white text-theme-blue hover:bg-gray-100">
            Contact Us Today
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

