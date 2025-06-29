
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedStartups from '@/components/FeaturedStartups';
import MentorshipSection from '@/components/MentorshipSection';
import SustainabilitySection from '@/components/SustainabilitySection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeaturedStartups />
      <MentorshipSection />
      <SustainabilitySection />
      <Footer />
    </div>
  );
};

export default Index;
