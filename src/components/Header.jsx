import React from 'react';

const Header = ({ onChangeView }) => {
  return (
    <div className="bg-white shadow p-4 mb-4 rounded-lg flex justify-between items-center">
      <h2 className="text-3xl font-semibold text-gray-800">Gestión de Horarios</h2>
      <div className="space-x-4">
        <button
          onClick={() => onChangeView('schedule')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Horarios
        </button>
        <button
          onClick={() => onChangeView('users')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Usuarios
        </button>
      </div>
    </div>
  );
};

export default Header;
