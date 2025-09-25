import React, { useState } from 'react';
import { GraduationCap, Star, Clock, DollarSign, Calendar, BookOpen, Filter } from 'lucide-react';

export const PeerTutoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState('find-tutors');

  const tutors = [
    {
      id: 1,
      name: 'Alex Rodriguez',
      major: 'Mathematics',
      year: 'Senior',
      subjects: ['Calculus III', 'Linear Algebra', 'Statistics'],
      rating: 4.9,
      reviews: 47,
      hourlyRate: 25,
      availability: ['Mon-Wed 2-6 PM', 'Fri 10 AM-2 PM'],
      experience: '3 years tutoring experience, Math TA',
      bio: 'Passionate about making complex math concepts accessible and understandable.'
    },
    {
      id: 2,
      name: 'Jennifer Liu',
      major: 'Chemistry',
      year: 'Graduate',
      subjects: ['Organic Chemistry', 'General Chemistry', 'Biochemistry'],
      rating: 4.8,
      reviews: 32,
      hourlyRate: 30,
      availability: ['Tue-Thu 1-5 PM', 'Sat 9 AM-1 PM'],
      experience: 'Graduate TA, published research',
      bio: 'Chemistry graduate student with expertise in organic synthesis and reaction mechanisms.'
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      major: 'Computer Science',
      year: 'Senior',
      subjects: ['Data Structures', 'Algorithms', 'Programming'],
      rating: 4.9,
      reviews: 38,
      hourlyRate: 28,
      availability: ['Mon, Wed, Fri 3-7 PM'],
      experience: 'Software engineering intern, competitive programmer',
      bio: 'Computer science senior with industry experience and strong problem-solving skills.'
    }
  ];

  const myTutoringRequests = [
    {
      id: 1,
      subject: 'Organic Chemistry',
      tutor: 'Jennifer Liu',
      date: 'Today, 3:00 PM',
      duration: '2 hours',
      status: 'confirmed',
      location: 'Chemistry Library',
      topics: ['Reaction mechanisms', 'Stereochemistry']
    },
    {
      id: 2,
      subject: 'Calculus III',
      tutor: 'Alex Rodriguez',
      date: 'Tomorrow, 4:00 PM',
      duration: '1.5 hours',
      status: 'pending',
      location: 'Math Study Room',
      topics: ['Multiple integrals', 'Vector calculus']
    }
  ];

  const becomeTutorForm = {
    subjects: [''],
    experience: '',
    rate: '',
    availability: [],
    bio: ''
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Peer Tutoring</h1>
        <p className="text-gray-600">Connect with peer tutors or share your expertise by becoming a tutor.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'find-tutors', label: 'Find Tutors' },
          { id: 'my-sessions', label: 'My Sessions' },
          { id: 'become-tutor', label: 'Become a Tutor' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Find Tutors Tab */}
      {activeTab === 'find-tutors' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1 relative">
                <BookOpen className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by subject or tutor name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Subjects</option>
                <option value="math">Mathematics</option>
                <option value="chemistry">Chemistry</option>
                <option value="physics">Physics</option>
                <option value="cs">Computer Science</option>
              </select>

              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Price Range</option>
                <option value="0-20">$0 - $20/hour</option>
                <option value="20-30">$20 - $30/hour</option>
                <option value="30+">$30+/hour</option>
              </select>

              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="evenings">Evenings</option>
              </select>
            </div>
          </div>

          {/* Tutor List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tutors.map((tutor) => (
              <div key={tutor.id} className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                      {tutor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{tutor.name}</h3>
                      <p className="text-gray-600">{tutor.major} • {tutor.year}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-700 ml-1">{tutor.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">({tutor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">${tutor.hourlyRate}/hr</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{tutor.bio}</p>

                <div className="space-y-3 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Subjects:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tutor.subjects.map((subject, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-700">Experience:</span>
                    <p className="text-sm text-gray-600 mt-1">{tutor.experience}</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-700">Availability:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tutor.availability.map((slot, index) => (
                        <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
                    Book Session
                  </button>
                  <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Sessions Tab */}
      {activeTab === 'my-sessions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">My Tutoring Sessions</h2>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
              Book New Session
            </button>
          </div>

          <div className="space-y-4">
            {myTutoringRequests.map((session) => (
              <div key={session.id} className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{session.subject}</h3>
                    <p className="text-gray-600">with {session.tutor}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    session.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {session.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{session.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">📍</span>
                    <span>{session.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span>{session.topics.join(', ')}</span>
                  </div>
                </div>

                <div className="flex space-x-3 mt-4 pt-4 border-t border-gray-100">
                  <button className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Become a Tutor Tab */}
      {activeTab === 'become-tutor' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Become a Peer Tutor</h2>
              <p className="text-gray-600">Share your knowledge and earn while helping fellow students succeed.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects You Can Tutor</label>
                <input
                  type="text"
                  placeholder="e.g., Calculus III, Organic Chemistry, Data Structures"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Experience</label>
                <textarea
                  rows={3}
                  placeholder="Describe your academic background, teaching experience, and qualifications..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Hours</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Monday 9-12 PM', 'Monday 1-5 PM', 'Tuesday 9-12 PM', 'Tuesday 1-5 PM',
                    'Wednesday 9-12 PM', 'Wednesday 1-5 PM', 'Thursday 9-12 PM', 'Thursday 1-5 PM'
                  ].map((slot) => (
                    <label key={slot} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={3}
                  placeholder="Tell students about your teaching style and what makes you a great tutor..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium">
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};