import React from 'react';
import { useAppContext } from '../context/useAppContext';

const LoginView = () => {
  const { employees, login } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">¿Quién está iniciando sesión?</h2>
        <div className="space-y-4">
          {employees.map((employee) => (
            <button
              key={employee.id}
              onClick={() => login(employee.id)}
              className="w-full flex items-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              <span 
                className="w-8 h-8 rounded-full mr-4"
                style={{ backgroundColor: employee.color, border: '2px solid white' }}
              ></span>
              <span className="text-lg font-medium text-gray-700">{employee.name}</span>
              <span className="ml-auto text-sm font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">{employee.access}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginView;
