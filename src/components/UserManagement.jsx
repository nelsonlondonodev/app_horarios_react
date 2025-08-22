import React, { useState } from 'react';
import UserForm from './UserForm';
import { useAppContext } from '../context/useAppContext'; // Import useAppContext

const UserManagement = () => { // Removed props
  const { employees, deleteEmployee } = useAppContext(); // Get from context
  const [isFormOpen, setIsFormOpen] = useState(false); // Fixed typo
  const [editingUser, setEditingUser] = useState(null);

  const openForm = (user = null) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  // handleAddUser and handleUpdateUser are no longer needed here,
  // as UserForm will directly use addEmployee and updateEmployee from context.

  const handleDeleteUser = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción también eliminará sus turnos asignados.')) {
      deleteEmployee(userId); // Use deleteEmployee from context
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Gestión de Usuarios</h2>
      <button
        onClick={() => openForm()} // Open form for new user
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Añadir Nuevo Usuario
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => openForm(user)} className="text-indigo-600 hover:text-indigo-900 mr-4">Editar</button>
                  <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <UserForm
          onClose={closeForm}
          existingUser={editingUser}
        />
      )}
    </div>
  );
};

export default UserManagement;
