import React, { useState } from 'react';
import { useAppContext } from '../context/useAppContext';

const LoginView = () => {
  const { employees, login } = useAppContext();
  const [selectedUserId, setSelectedUserId] = useState('');

  const handleLogin = () => {
    if (selectedUserId) {
      login(selectedUserId);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>
        <div className="mb-4">
          <label htmlFor="user-select" className="block mb-2 text-sm font-medium text-gray-600">
            Selecciona tu usuario
          </label>
          <select
            id="user-select"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Elige un empleado
            </option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleLogin}
          disabled={!selectedUserId}
          className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default LoginView;