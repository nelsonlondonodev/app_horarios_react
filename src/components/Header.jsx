import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'bg-blue-500 text-white font-bold py-2 px-4 rounded'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded';
  };

  return (
    <header className="bg-white shadow p-4 mb-4 rounded-lg flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-gray-800">Gestión de Horarios</h1>
      <nav className="space-x-4">
        <Link to="/" className={getLinkClass('/')}>
          Horarios
        </Link>
        <Link to="/users" className={getLinkClass('/users')}>
          Usuarios
        </Link>
      </nav>
    </header>
  );
};

export default Header;
