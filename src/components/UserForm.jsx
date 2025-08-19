import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext'; // Import useAppContext

const UserForm = ({ onClose, existingUser }) => { // Removed onAddUser, onUpdateUser from props
  const { addEmployee, updateEmployee } = useAppContext(); // Get from context
  const isEditing = !!existingUser;

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [color, setColor] = useState(''); // New state for color

  useEffect(() => {
    if (isEditing) {
      setName(existingUser.name);
      setRole(existingUser.role);
      setColor(existingUser.color || ''); // Initialize color for editing
    }
  }, [isEditing, existingUser]);

  const roles = ['Camarero', 'Cocinero', 'Jefe de Sala', 'Barman', 'Ayudante de Cocina', 'Administrador'];
  const colorOptions = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#28B463', '#BB8FCE', '#F39C12', '#E74C3C']; // Predefined colors

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role || !color) { // Validate color as well
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (isEditing) {
      updateEmployee({ ...existingUser, name, role, color }); // Use updateEmployee from context
    } else {
      const newUser = {
        id: `emp${Date.now()}`,
        name,
        role,
        color, // Include color in new user
      };
      addEmployee(newUser);
    }
    onClose(); // Close form after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{isEditing ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}</h3>
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

          {/* New Color Selection Field */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color:</label>
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              style={{ backgroundColor: color }} // Only background color
            >
              <option value="" style={{ color: 'black' }}>Seleccione un color</option> {/* Ensure default text is black */}
              {colorOptions.map(c => (
                <option key={c} value={c} style={{ backgroundColor: c, color: 'white' }}>{c}</option>
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
              {isEditing ? 'Actualizar Usuario' : 'Añadir Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
