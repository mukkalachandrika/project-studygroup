import React, { useState } from 'react';
import { Search, Filter, Star, Clock, BookOpen, Users, MessageCircle } from 'lucide-react';

export const Matching: React.FC = () => {
  const [filters, setFilters] = useState({
    subject: '',
    studyStyle: '',
    availability: '',
    gpaRange: ''
  });

  const potentialMatches = [
    {
      id: 1,
      name: 'Sarah Martinez',
      major: 'Computer Science',
      year: 'Junior',
      gpa: 3.8,
      compatibility: 95,
      sharedCourses: ['Data Structures', 'Calculus III'],
      studyPreferences: ['Group Discussion', 'Problem-Solving', 'Visual Learning'],
      availableHours: ['Morning (9-12 PM)', 'Evening (6-9 PM)'],
      bio: 'Love collaborative problem-solving and explaining concepts to peers.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      major: 'Physics',
      year: 'Senior',
      gpa: 3.9,
      compatibility: 92,
      sharedCourses: ['Physics II', 'Linear Algebra'],
      studyPreferences: ['Silent Study', 'Note Sharing', 'Quiz Practice'],
      availableHours: ['Afternoon (12-3 PM)', 'Evening (6-9 PM)'],
      bio: 'Experienced in physics concepts, enjoy helping others understand complex topics.'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      major: 'Chemistry',
      year: 'Sophomore',
      gpa: 3.7,
      compatibility: 89,
      sharedCourses: ['Organic Chemistry', 'Statistics'],
      studyPreferences: ['Visual Learning', 'Group Discussion', 'Project Collaboration'],
      availableHours: ['Morning (9-12 PM)', 'Late Afternoon (3-6 PM)'],
      bio: 'Chemistry enthusiast with strong lab skills and collaborative mindset.'
    },
    {
      id: 4,
      name: 'David Kim',
      major: 'Mathematics',
      year: 'Junior',
      gpa: 3.8,
      compatibility: 87,
      sharedCourses: ['Calculus III', 'Linear Algebra', 'Statistics'],
      studyPreferences: ['Problem-Solving', 'Silent Study', 'Quiz Practice'],
      availableHours: ['Early Morning (6-9 AM)', 'Evening (6-9 PM)'],
      bio: 'Math tutor with passion for breaking down complex problems step by step.'
    }
  ];

  const subjects = ['All Subjects', 'Calculus III', 'Physics II', 'Data Structures', 'Organic Chemistry', 'Linear Algebra', 'Statistics'];
  const studyStyles = ['All Styles', 'Group Discussion', 'Silent Study', 'Visual Learning', 'Problem-Solving'];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Study Partners</h1>
        <p className="text-gray-600">Discover compatible study partners based on your academic needs and preferences.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, major, or courses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filters.subject}
            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <select
            value={filters.studyStyle}
            onChange={(e) => setFilters({ ...filters, studyStyle: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {studyStyles.map((style) => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>

          <select
            value={filters.availability}
            onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>

          <select
            value={filters.gpaRange}
            onChange={(e) => setFilters({ ...filters, gpaRange: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any GPA</option>
            <option value="3.5+">3.5+</option>
            <option value="3.0-3.5">3.0 - 3.5</option>
            <option value="2.5-3.0">2.5 - 3.0</option>
          </select>
        </div>
      </div>

      {/* Potential Matches */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Potential Study Partners</h2>
          <div className="text-sm text-gray-600">
            Showing {potentialMatches.length} matches based on your profile
          </div>
        </div>

        <div className="space-y-6">
          {potentialMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                    {match.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{match.name}</h3>
                    <p className="text-gray-600">{match.major} • {match.year}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">GPA: {match.gpa}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{match.compatibility}%</div>
                  <div className="text-sm text-gray-500">compatibility</div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{match.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">Shared Courses</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {match.sharedCourses.map((course, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Study Preferences</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {match.studyPreferences.slice(0, 2).map((pref, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {pref}
                      </span>
                    ))}
                    {match.studyPreferences.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        +{match.studyPreferences.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Available Hours</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {match.availableHours.map((hour, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {hour.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect</span>
                </button>
                <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  View Profile
                </button>
                <button className="px-4 py-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  Invite to Group
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};