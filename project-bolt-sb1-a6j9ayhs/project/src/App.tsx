import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { StudentProfile } from './components/StudentProfile';
import { StudyGroups } from './components/StudyGroups';
import { Matching } from './components/Matching';
import { PeerTutoring } from './components/PeerTutoring';
import { StudentProvider } from './context/StudentContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <StudentProfile />;
      case 'groups':
        return <StudyGroups />;
      case 'matching':
        return <Matching />;
      case 'tutoring':
        return <PeerTutoring />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <StudentProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {renderContent()}
        </main>
      </div>
    </StudentProvider>
  );
}

export default App;