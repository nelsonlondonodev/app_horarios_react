import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/useAppContext';

const Header = () => {
  const { currentUser, logout } = useAppContext();
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname.startsWith(path)
      ? 'bg-blue-500 text-white font-bold py-2 px-4 rounded'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded';
  };

  if (!currentUser) {
    return null; // O un encabezado de "cargando" o para el login
  }

  return (
    <header className="bg-white shadow p-4 mb-4 rounded-lg flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-gray-800">Gestión de Horarios</h1>
      <nav className="space-x-4">
        {currentUser.role === 'admin' && (
          <>
            <Link to="/admin/schedule" className={getLinkClass('/admin/schedule')}>
              Horarios
            </Link>
            <Link to="/admin/users" className={getLinkClass('/admin/users')}>
              Usuarios
            </Link>
          </>
        )}
        {currentUser.role === 'employee' && (
          <Link to="/employee/dashboard" className={getLinkClass('/employee/dashboard')}>
            Mi Horario
          </Link>
        )}
      </nav>
      <div>
        <span className="mr-4 text-gray-600">Hola, {currentUser.name}</span>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Salir
        </button>
      </div>
    </header>
  );
};

export default Header;
