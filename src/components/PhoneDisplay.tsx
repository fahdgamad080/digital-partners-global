
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type PhoneDisplayProps = {
  activeSection: string;
};

const PhoneDisplay: React.FC<PhoneDisplayProps> = ({ activeSection }) => {
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
          <div className="bg-gradient-to-b from-theme-blue/20 to-theme-purple/20 h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-theme-blue rounded-full mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">DigitalSync App</h3>
            <p className="text-sm">Transform your digital experience with our innovative solutions</p>
            <div className="mt-6 w-full">
              <div className="bg-white/70 p-3 rounded-lg mb-3 text-left shadow">
                <p className="text-xs font-medium">Latest Update</p>
                <p className="text-xs">New features available now!</p>
              </div>
              <div className="bg-white/70 p-3 rounded-lg text-left shadow">
                <p className="text-xs font-medium">Business Solutions</p>
                <p className="text-xs">Explore our solutions</p>
              </div>
            </div>
          </div>
        );
        
      case 'services':
        return (
          <div className="bg-gradient-to-br from-theme-indigo/10 to-theme-teal/10 h-full flex flex-col items-center justify-start p-6">
            <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
              <h3 className="font-bold text-theme-indigo mb-2">Digital Services</h3>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-theme-indigo/20 rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-theme-indigo" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium">App Development</p>
                  <p className="text-xs text-gray-500">iOS, Android, Web</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-theme-purple/20 rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-theme-purple" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium">Web Development</p>
                  <p className="text-xs text-gray-500">Custom websites & apps</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-theme-teal/20 rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-theme-teal" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium">Analytics & Data</p>
                  <p className="text-xs text-gray-500">Insights that matter</p>
                </div>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg shadow-md p-4">
              <p className="text-xs font-medium mb-2">Upcoming Project</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-theme-indigo h-1.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">70% Complete</p>
            </div>
          </div>
        );
        
      case 'realestate':
        return (
          <div className="h-full">
            <div className="h-40 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHw%3D&w=1000&q=80')] bg-cover bg-center"></div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Luxury Apartment</h3>
              <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-xs ml-1">5.0 (48 reviews)</p>
              </div>
              <div className="flex mb-4">
                <div className="flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs">3 bed</p>
                </div>
                <div className="flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs">2 bath</p>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs">Manhattan</p>
                </div>
              </div>
              <hr className="mb-4" />
              <div className="mb-4">
                <p className="text-lg font-bold">$3,200<span className="text-sm font-normal text-gray-500">/month</span></p>
              </div>
              <button className="w-full bg-theme-blue text-white py-2 rounded-lg text-sm">Schedule a Visit</button>
            </div>
          </div>
        );
        
      case 'retail':
        return (
          <div className="h-full bg-gray-50">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Retail App</h3>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-theme-purple text-white text-xs rounded-full">3</span>
                </div>
              </div>
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm focus:outline-none"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
                <div className="flex-shrink-0 px-3 py-1 bg-theme-purple text-white rounded-full text-xs">All</div>
                <div className="flex-shrink-0 px-3 py-1 bg-white border border-gray-300 rounded-full text-xs">Electronics</div>
                <div className="flex-shrink-0 px-3 py-1 bg-white border border-gray-300 rounded-full text-xs">Clothing</div>
                <div className="flex-shrink-0 px-3 py-1 bg-white border border-gray-300 rounded-full text-xs">Home</div>
                <div className="flex-shrink-0 px-3 py-1 bg-white border border-gray-300 rounded-full text-xs">Beauty</div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <h4 className="font-medium text-sm mb-3">Featured Products</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-24 bg-gray-200"></div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">Wireless Headphones</p>
                    <p className="text-xs text-theme-purple">$89.99</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-24 bg-gray-200"></div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">Smart Watch</p>
                    <p className="text-xs text-theme-purple">$129.99</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-24 bg-gray-200"></div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">Bluetooth Speaker</p>
                    <p className="text-xs text-theme-purple">$59.99</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-24 bg-gray-200"></div>
                  <div className="p-2">
                    <p className="text-xs font-medium truncate">Fitness Tracker</p>
                    <p className="text-xs text-theme-purple">$49.99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'fintech':
        return (
          <div className="h-full bg-gradient-to-br from-theme-blue/10 to-theme-indigo/10">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-xs text-gray-500">Good morning,</p>
                  <h3 className="font-bold">Alex Morgan</h3>
                </div>
                <div className="w-8 h-8 bg-theme-indigo rounded-full"></div>
              </div>
              <div className="bg-gradient-to-r from-theme-blue to-theme-indigo rounded-lg p-4 text-white mb-6">
                <p className="text-xs mb-1">Total Balance</p>
                <p className="text-xl font-bold mb-3">$24,156.00</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs opacity-80">Income</p>
                    <p className="text-sm">+$2,450</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Expenses</p>
                    <p className="text-sm">-$1,280</p>
                  </div>
                  <div className="bg-white/20 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                    </svg>
                  </div>
                </div>
              </div>
              <h4 className="font-medium text-sm mb-3">Quick Actions</h4>
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-theme-purple/20 rounded-full flex items-center justify-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-purple" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                  </div>
                  <p className="text-xs">Send</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-theme-blue/20 rounded-full flex items-center justify-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-blue" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                    </svg>
                  </div>
                  <p className="text-xs">Request</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-theme-indigo/20 rounded-full flex items-center justify-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-indigo" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xs">Cards</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-theme-teal/20 rounded-full flex items-center justify-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-theme-teal" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xs">Settings</p>
                </div>
              </div>
              <h4 className="font-medium text-sm mb-3">Recent Transactions</h4>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-theme-blue" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Spotify Subscription</p>
                      <p className="text-xs text-gray-500">25 Apr 2023</p>
                    </div>
                  </div>
                  <p className="text-xs font-medium">-$9.99</p>
                </div>
                <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Salary Deposit</p>
                      <p className="text-xs text-gray-500">24 Apr 2023</p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-green-600">+$2,450.00</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-gradient-to-b from-theme-blue/20 to-theme-purple/20 h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">DigitalSync</h3>
              <p className="text-sm">Scroll to explore our solutions</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="phone-container shadow-2xl transform transition-all duration-500 ease-in-out">
      <div className="phone-notch"></div>
      <div className="phone-screen-content">
        <div className={cn("w-full h-full", {
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
