import React, { useState } from 'react';

const UserForm = ({ onAddUser, onClose }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const roles = ['Camarera', 'Cocinero', 'Jefa de Sala', 'Barman', 'Ayudante de Cocina', 'Administrador'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const newUser = {
      id: `emp${Date.now()}`, // Simple unique ID
      name,
      role,
    };
    onAddUser(newUser);
    onClose(); // Close form after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Añadir Nuevo Usuario</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Seleccione un rol</option>
              {roles.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Añadir Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
