import React from 'react';
import { useStudent } from '../context/StudentContext';
import { Users, BookOpen, Clock, TrendingUp, Star, Calendar } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { student } = useStudent();

  const stats = [
    { label: 'Active Groups', value: '4', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Courses Enrolled', value: '6', icon: BookOpen, color: 'from-purple-500 to-purple-600' },
    { label: 'Study Hours/Week', value: '28', icon: Clock, color: 'from-green-500 to-green-600' },
    { label: 'Compatibility Score', value: '94%', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
  ];

  const recentActivity = [
    { type: 'group', title: 'Joined "Advanced Calculus Study Group"', time: '2 hours ago', icon: Users },
    { type: 'match', title: 'New study partner matched for Physics', time: '4 hours ago', icon: Star },
    { type: 'session', title: 'Completed study session: Data Structures', time: '1 day ago', icon: BookOpen },
    { type: 'tutoring', title: 'Tutoring session scheduled for Chemistry', time: '2 days ago', icon: Calendar },
  ];

  const upcomingSessions = [
    { subject: 'Calculus III', time: 'Today, 3:00 PM', members: 5, type: 'Group Study' },
    { subject: 'Organic Chemistry', time: 'Tomorrow, 10:00 AM', members: 1, type: 'Peer Tutoring' },
    { subject: 'Data Structures', time: 'Friday, 2:00 PM', members: 4, type: 'Project Work' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {student?.name || 'Student'}!
        </h1>
        <p className="text-gray-600">Here's your collaboration overview and upcoming activities.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 mb-1">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 mb-1">{session.subject}</h3>
                  <p className="text-sm text-gray-600 mb-2">{session.time}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {session.type}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{session.members}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};