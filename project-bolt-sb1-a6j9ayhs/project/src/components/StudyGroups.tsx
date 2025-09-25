import React, { useState } from 'react';
import { Users, Calendar, Clock, MapPin, Plus, MessageCircle } from 'lucide-react';

export const StudyGroups: React.FC = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  const myGroups = [
    {
      id: 1,
      name: 'Advanced Calculus Study Group',
      subject: 'Calculus III',
      members: 5,
      nextSession: 'Today, 3:00 PM',
      location: 'Library Room 204',
      description: 'Weekly calculus problem-solving sessions',
      memberAvatars: ['JD', 'SM', 'AL', 'KR', 'MJ']
    },
    {
      id: 2,
      name: 'Physics Problem Solvers',
      subject: 'Physics II',
      members: 4,
      nextSession: 'Tomorrow, 2:00 PM',
      location: 'Physics Lab B',
      description: 'Collaborative physics homework and exam prep',
      memberAvatars: ['JD', 'TW', 'LK', 'RP']
    },
    {
      id: 3,
      name: 'Chemistry Lab Partners',
      subject: 'Organic Chemistry',
      members: 6,
      nextSession: 'Friday, 10:00 AM',
      location: 'Chemistry Building',
      description: 'Lab report collaboration and concept review',
      memberAvatars: ['JD', 'NH', 'BT', 'MK', 'JL', 'ST']
    }
  ];

  const suggestedGroups = [
    {
      id: 4,
      name: 'Data Structures Deep Dive',
      subject: 'Data Structures',
      members: 3,
      compatibility: 92,
      description: 'Algorithm implementation and interview prep',
      openSpots: 2
    },
    {
      id: 5,
      name: 'Linear Algebra Study Circle',
      subject: 'Linear Algebra',
      members: 4,
      compatibility: 88,
      description: 'Matrix operations and vector space concepts',
      openSpots: 1
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Study Groups</h1>
          <p className="text-gray-600">Collaborate with peers and enhance your learning experience.</p>
        </div>
        <button
          onClick={() => setShowCreateGroup(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Create Group</span>
        </button>
      </div>

      {/* My Study Groups */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Study Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{group.name}</h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {group.subject}
                  </span>
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{group.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{group.members} members</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{group.nextSession}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{group.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {group.memberAvatars.slice(0, 4).map((avatar, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                    >
                      {avatar}
                    </div>
                  ))}
                  {group.memberAvatars.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                      +{group.memberAvatars.length - 4}
                    </div>
                  )}
                </div>
                
                <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Groups */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Suggested Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestedGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{group.name}</h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {group.subject}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{group.compatibility}%</div>
                  <div className="text-xs text-gray-500">compatibility</div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{group.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="text-green-600 font-medium">
                    {group.openSpots} spots available
                  </div>
                </div>
                
                <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:shadow-lg transition-all duration-200">
                  Join Group
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Create Study Group</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter group name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select subject</option>
                  <option value="calculus">Calculus III</option>
                  <option value="physics">Physics II</option>
                  <option value="chemistry">Organic Chemistry</option>
                  <option value="data-structures">Data Structures</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the group's purpose and goals"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Members</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="6"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateGroup(false)}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateGroup(false)}
                className="flex-1 px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};