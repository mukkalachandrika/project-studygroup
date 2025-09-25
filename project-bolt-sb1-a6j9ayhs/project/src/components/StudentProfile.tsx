import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { User, BookOpen, Clock, Star, Save, CreditCard as Edit3 } from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { student, updateStudent } = useStudent();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    major: student?.major || '',
    year: student?.year || '',
    gpa: student?.gpa || '',
    studyPreferences: student?.studyPreferences || [],
    availableHours: student?.availableHours || [],
    courses: student?.courses || [],
  });

  const handleSave = () => {
    updateStudent(formData);
    setIsEditing(false);
  };

  const studyPreferenceOptions = [
    'Visual Learning', 'Auditory Learning', 'Kinesthetic Learning',
    'Group Discussion', 'Silent Study', 'Problem-Solving',
    'Note Sharing', 'Quiz Practice', 'Project Collaboration'
  ];

  const timeSlots = [
    'Early Morning (6-9 AM)', 'Morning (9-12 PM)', 'Afternoon (12-3 PM)',
    'Late Afternoon (3-6 PM)', 'Evening (6-9 PM)', 'Night (9-12 AM)'
  ];

  const courses = [
    'Calculus III', 'Physics II', 'Data Structures', 'Organic Chemistry',
    'Linear Algebra', 'Statistics', 'Computer Networks', 'Biochemistry'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Profile</h1>
          <p className="text-gray-600">Manage your academic information and study preferences.</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
        >
          {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.name || 'Not specified'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.email || 'Not specified'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{formData.major || 'Not specified'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                {isEditing ? (
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select year</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                ) : (
                  <p className="text-gray-800 font-medium">{formData.year || 'Not specified'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Study Preferences */}
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Star className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Study Preferences</h2>
            </div>
            
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {studyPreferenceOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.studyPreferences.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            studyPreferences: [...formData.studyPreferences, option]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            studyPreferences: formData.studyPreferences.filter(p => p !== option)
                          });
                        }
                      }}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.studyPreferences.map((preference, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {preference}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Available Hours */}
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Available Study Hours</h2>
            </div>
            
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <label key={slot} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.availableHours.includes(slot)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            availableHours: [...formData.availableHours, slot]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            availableHours: formData.availableHours.filter(h => h !== slot)
                          });
                        }
                      }}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{slot}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.availableHours.map((hour, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-medium"
                  >
                    {hour}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Academic Stats */}
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Stats</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current GPA</label>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-2xl font-bold text-blue-600">{formData.gpa || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Current Courses */}
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">Current Courses</h3>
            </div>
            
            {isEditing ? (
              <div className="space-y-2">
                {courses.map((course) => (
                  <label key={course} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.courses.includes(course)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            courses: [...formData.courses, course]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            courses: formData.courses.filter(c => c !== course)
                          });
                        }
                      }}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">{course}</span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {formData.courses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-800">{course}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};