import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import ScheduleView from './components/ScheduleView';
import UserManagement from './components/UserManagement';
import LoginView from './components/LoginView';
import { useAppContext } from './context/useAppContext';

function App() {
  const { currentUser } = useAppContext();

  // Si no hay usuario, mostrar la pantalla de login
  if (!currentUser) {
    return <LoginView />;
  }

  // Si hay un usuario, mostrar la aplicación principal
  // (Más adelante, aquí diferenciaremos por rol)
  return (
    <Layout>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<ScheduleView />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </main>
    </Layout>
  );
}

export default App;