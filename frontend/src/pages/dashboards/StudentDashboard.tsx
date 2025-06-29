import { useNavigate } from 'react-router-dom';
import BaseDashboard from './BaseDashboard';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MentorChatbot from '@/components/mentor/MentorChatbot';

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <BaseDashboard role="student">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Student Dashboard</h1>
          <p className="text-gray-600 mb-8">
            Explore our marketplace to find textbooks, services, and more from your peers.
          </p>
          <Button 
            onClick={() => navigate('/marketplace')}
            className="inline-flex items-center gap-2"
          >
            Visit Marketplace <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <MentorChatbot />
    </BaseDashboard>
  );
};

export default StudentDashboard;
