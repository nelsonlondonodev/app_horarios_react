import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layout from './components/Layout';
import Header from './components/Header';
import ScheduleView from './components/ScheduleView';
import UserManagement from './components/UserManagement';
import { employees as initialEmployees } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('schedule'); // 'schedule' or 'users'

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('app_horarios_employees');
    return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
  });

  useEffect(() => {
    localStorage.setItem('app_horarios_employees', JSON.stringify(employees));
  }, [employees]);

  const renderView = () => {
    if (currentView === 'schedule') {
      return <ScheduleView employees={employees} />;
    } else if (currentView === 'users') {
      return <UserManagement employees={employees} setEmployees={setEmployees} />;
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