import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layout from './components/Layout';
import Header from './components/Header';
import ScheduleView from './components/ScheduleView';
import UserManagement from './components/UserManagement';

function App() {
  const [currentView, setCurrentView] = useState('schedule'); // 'schedule' or 'users'

  const renderView = () => {
    if (currentView === 'schedule') {
      return <ScheduleView />;
    } else if (currentView === 'users') {
      return <UserManagement />;
    }
    return null;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <div className="px-4">
          <Header onChangeView={setCurrentView} />
          {renderView()}
        </div>
      </Layout>
    </DndProvider>
  );
}

export default App;