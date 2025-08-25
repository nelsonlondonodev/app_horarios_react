import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Header from './components/Header';
import ScheduleView from './components/ScheduleView';
import UserManagement from './components/UserManagement';
import LoginView from './components/LoginView';
import EmployeeDashboard from './components/EmployeeDashboard';
import { useAppContext } from './context/useAppContext';

const AppRoutes = () => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        navigate('/admin/schedule');
      } else {
        navigate('/employee/dashboard');
      }
    } else {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route
        path="/admin/*"
        element={
          <AdminLayout>
            <Routes>
              <Route path="schedule" element={<ScheduleView />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="*" element={<Navigate to="schedule" />} />
            </Routes>
          </AdminLayout>
        }
      />
      <Route
        path="/employee/*"
        element={
          <EmployeeLayout>
            <Routes>
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="*" element={<Navigate to="dashboard" />} />
            </Routes>
          </EmployeeLayout>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const AdminLayout = ({ children }) => (
  <Layout>
    <Header />
    <main className="p-4">{children}</main>
  </Layout>
);

const EmployeeLayout = ({ children }) => (
  <Layout>
    <Header />
    <main className="p-4">{children}</main>
  </Layout>
);

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
