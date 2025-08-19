import React, { useState } from 'react'; // Removed useEffect
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Layout from './components/Layout';
import Header from './components/Header';
import ScheduleView from './components/ScheduleView';
import UserManagement from './components/UserManagement';
import { useAppContext } from './context/AppContext'; // Import useAppContext

function App() {
  const [currentView, setCurrentView] = useState('schedule'); // 'schedule' or 'users'
  const { shifts, employees, setShifts, setEmployees, deleteEmployee } = useAppContext(); // Get state and functions from context

  const renderView = () => {
    if (currentView === 'schedule') {
      return (
        <ScheduleView
          employees={employees}
          currentShifts={shifts} // Use shifts from context
          onUpdateShifts={setShifts} // Use setShifts from context
        />
      );
    } else if (currentView === 'users') {
      return (
        <UserManagement
          employees={employees}
          setEmployees={setEmployees} // Use setEmployees from context
          onDeleteEmployee={deleteEmployee} // Use deleteEmployee from context
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