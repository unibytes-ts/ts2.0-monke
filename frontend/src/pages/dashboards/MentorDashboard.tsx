import { useState } from 'react';
import { format, addDays, isToday, isSameDay } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import BaseDashboard from './BaseDashboard';
import { Clock, Users, Calendar as CalendarIcon, Clock3, User, Clock4 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type MentorshipSession = {
  id: string;
  studentName: string;
  date: Date;
  duration: number; // in minutes
  status: 'upcoming' | 'completed' | 'cancelled';
  topic: string;
};

const MentorDashboard = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  // Mock data for mentorship sessions
  const [sessions, setSessions] = useState<MentorshipSession[]>([
    {
      id: '1',
      studentName: 'Alex Johnson',
      date: new Date(),
      duration: 60,
      status: 'upcoming',
      topic: 'Business Model Development'
    },
    {
      id: '2',
      studentName: 'Sarah Williams',
      date: addDays(new Date(), 1),
      duration: 45,
      status: 'upcoming',
      topic: 'Pitch Deck Review'
    },
    {
      id: '3',
      studentName: 'Michael Chen',
      date: addDays(new Date(), 2),
      duration: 30,
      status: 'upcoming',
      topic: 'Market Research Strategies'
    },
    {
      id: '4',
      studentName: 'Emma Davis',
      date: addDays(new Date(), -1),
      duration: 60,
      status: 'completed',
      topic: 'Funding Options Discussion'
    },
  ]);

  // Calculate total mentorship hours
  const totalHours = sessions
    .filter(session => session.status === 'completed')
    .reduce((total, session) => total + (session.duration / 60), 0);

  // Get upcoming sessions
  const upcomingSessions = sessions
    .filter(session => session.status === 'upcoming' && session.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Get sessions for the selected date
  const sessionsOnSelectedDate = sessions.filter(session => 
    isSameDay(session.date, date)
  );

  // Handle session completion
  const completeSession = (sessionId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'completed' as const } 
        : session
    ));
  };

  // Handle session cancellation
  const cancelSession = (sessionId: string) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'cancelled' as const } 
        : session
    ));
  };

  return (
    <BaseDashboard role="mentor">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Mentor Dashboard</h2>
          <p className="text-gray-600">
            Guide the next generation of student entrepreneurs.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Clock4 className="w-5 h-5 text-blue-600" />
                Total Mentorship
              </CardDescription>
              <CardTitle className="text-3xl">{totalHours.toFixed(1)} hrs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {sessions.filter(s => s.status === 'completed').length} completed sessions
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-green-600" />
                Upcoming Sessions
              </CardDescription>
              <CardTitle className="text-3xl">{upcomingSessions.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Next: {upcomingSessions[0] ? format(upcomingSessions[0].date, 'MMM d, h:mm a') : 'No upcoming'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Active Students
              </CardDescription>
              <CardTitle className="text-3xl">
                {new Set(sessions.map(s => s.studentName)).size}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {sessions.length} total sessions
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  onChange={(value) => setDate(value as Date)}
                  value={date}
                  className="rounded-md border w-full"
                  tileClassName={({ date, view }) => {
                    const hasSession = sessions.some(session => 
                      isSameDay(session.date, date) && session.status === 'upcoming'
                    );
                    return hasSession ? 'bg-blue-50' : '';
                  }}
                />
                
                {/* Sessions on selected date */}
                <div className="mt-4 space-y-2">
                  <h3 className="font-medium">
                    {isToday(date) ? 'Today' : format(date, 'MMMM d, yyyy')}
                  </h3>
                  {sessionsOnSelectedDate.length > 0 ? (
                    <div className="space-y-2">
                      {sessionsOnSelectedDate.map(session => (
                        <div key={session.id} className="p-3 border rounded-md text-sm">
                          <div className="font-medium">{session.studentName}</div>
                          <div className="text-muted-foreground">{session.topic}</div>
                          <div className="flex justify-between items-center mt-1 text-sm">
                            <span className="flex items-center gap-1">
                              <Clock3 className="w-3.5 h-3.5" />
                              {format(session.date, 'h:mm a')} ({session.duration} min)
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                              session.status === 'upcoming' 
                                ? 'bg-blue-100 text-blue-800' 
                                : session.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {session.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No sessions scheduled for this day.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Upcoming Sessions
                </CardTitle>
                <CardDescription>
                  Your upcoming mentorship sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map(session => (
                      <div key={session.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{session.topic}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <User className="w-4 h-4 mr-1.5" />
                              {session.studentName}
                              <span className="mx-2">•</span>
                              <Clock3 className="w-4 h-4 mr-1.5" />
                              {format(session.date, 'MMM d, yyyy • h:mm a')}
                              <span className="mx-2">•</span>
                              <span>{session.duration} minutes</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => completeSession(session.id)}
                            >
                              Complete
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => cancelSession(session.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      You don't have any upcoming sessions scheduled.
                    </p>
                    <Button className="mt-4">
                      View Availability
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent mentorship interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions
                    .filter(s => s.status === 'completed' || s.status === 'cancelled')
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .slice(0, 3)
                    .map(session => (
                      <div key={session.id} className="flex items-start pb-4 last:pb-0 last:border-0">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          session.status === 'completed' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                        <div className="ml-3">
                          <div className="font-medium">
                            {session.status === 'completed' ? 'Completed' : 'Cancelled'} session with {session.studentName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(session.date, 'MMM d, yyyy')} • {session.topic}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseDashboard>
  );
};

export default MentorDashboard;
