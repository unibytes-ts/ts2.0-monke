import { Button } from '@/components/ui/button';
import React from 'react';
import { Search } from 'lucide-react';

interface CTABannerProps {
  className?: string;
}

const CTABanner: React.FC<CTABannerProps> = ({ className = '' }) => {
  return (
    <section className={`bg-white ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Find the Perfect Mentor for Your Journey
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Connect with experienced professionals who can guide you through your career path
          </p>
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search mentors by skill, company, or role"
            className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button 
              variant="primary"
              className="h-9 px-4 text-sm font-medium"
            >
              Search
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Software Engineering
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Product Management
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Data Science
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            UX/UI Design
          </span>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
