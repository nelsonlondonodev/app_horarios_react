import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layout from './components/Layout';
import Header from './components/Header';
import ScheduleView from './components/ScheduleView';
import UserManagement from './components/UserManagement';
import { employees as initialEmployees, shifts as initialShifts } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('schedule'); // 'schedule' or 'users'

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('app_horarios_employees');
    return savedEmployees ? JSON.parse(savedEmployees) : initialEmployees;
  });

  const [currentShifts, setCurrentShifts] = useState(() => {
    const savedShifts = localStorage.getItem('app_horarios_shifts');
    return savedShifts ? JSON.parse(savedShifts) : initialShifts;
  });

  useEffect(() => {
    localStorage.setItem('app_horarios_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('app_horarios_shifts', JSON.stringify(currentShifts));
  }, [currentShifts]);

  const handleDeleteEmployeeAndShifts = (employeeId) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== employeeId));
    setCurrentShifts((prevShifts) => prevShifts.filter((shift) => shift.employeeId !== employeeId));
  };

  const handleUpdateShifts = (newShifts) => {
    setCurrentShifts(newShifts);
  };

  const renderView = () => {
    if (currentView === 'schedule') {
      return (
        <ScheduleView
          employees={employees}
          currentShifts={currentShifts}
          onUpdateShifts={handleUpdateShifts}
        />
      );
    } else if (currentView === 'users') {
      return (
        <UserManagement
          employees={employees}
          setEmployees={setEmployees}
          onDeleteEmployee={handleDeleteEmployeeAndShifts}
        />
      );
    }
    return null;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <div className="px-4 w-full">
          <Header onChangeView={setCurrentView} />
          {renderView()}
        </div>
      </Layout>
    </DndProvider>
  );
}

export default App;