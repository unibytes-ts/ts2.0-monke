import React from 'react';
import { Button } from '@/components/ui/button';

// local illustration
import GlobeStudent from '@/assets/globe-student.svg.svg';

const avatarUrls = [
  'https://randomuser.me/api/portraits/women/81.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/76.jpg'
];

interface Props {
  className?: string;
}

/**
 * CTABannerExact replicates the exact layout shown in the reference image:
 * ┌──────────────────────────────────────────────┐
 * │ avatars  Already joined …                   🖼 │
 * │                                            │
 * │             Join us in this mission         │
 * │    Body copy …                              │
 * │  [Marketplace]   [Startups]                 │
 * └──────────────────────────────────────────────┘
 */
const CTABannerExact: React.FC<Props> = ({ className = '' }) => {
  return (
    <section
      className={`relative rounded-3xl overflow-hidden bg-purple-50 p-6 md:p-10 ${className}`}
    >
      {/* subtle grid background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 text-purple-200 pointer-events-none"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="grid-cta" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-cta)" />
      </svg>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        {/* left column */}
        <div>
          {/* avatars */}
          <div className="flex items-center mb-3">
            <div className="flex -space-x-2 mr-3">
              {avatarUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="avatar"
                  className="w-9 h-9 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              Already joined the movement
            </span>
          </div>

          {/* heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Join us in this mission
          </h2>

          {/* body copy */}
          <p className="text-gray-700 text-base md:text-lg max-w-md mb-6">
            Fueled by AI and tailored to your ambitions — we support startups and
            college entrepreneurs at every stage of their global adventure.
          </p>

          {/* buttons */}
          <div className="flex gap-3 flex-wrap">
            <Button variant="primary" size="lg" to="/student-marketplace">
              Marketplace
            </Button>
            <Button variant="outline" size="lg" to="/startups">
              Startups
            </Button>
          </div>
        </div>

        {/* illustration */}
        <div className="flex justify-center md:justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GlobeStudent}
            alt="Student with globe illustration"
            className="w-56 md:w-72 lg:w-80 h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default CTABannerExact;
