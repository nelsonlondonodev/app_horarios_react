import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import ScheduleView from './components/ScheduleView';
import UserManagement from './components/UserManagement';

function App() {
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
