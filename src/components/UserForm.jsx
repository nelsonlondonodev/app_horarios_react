import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/useAppContext';

const UserForm = ({ onClose, existingUser }) => {
  const { addEmployee, updateEmployee } = useAppContext();
  const isEditing = !!existingUser;

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    color: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: existingUser.name,
        role: existingUser.role,
        color: existingUser.color || '',
      });
    }
  }, [isEditing, existingUser]);

  const roles = ['Camarero', 'Cocinero', 'Jefe de Sala', 'Barman', 'Ayudante de Cocina', 'Administrador'];
  const colorOptions = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#28B463', '#BB8FCE', '#F39C12', '#E74C3C'];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido.';
    if (!formData.role) newErrors.role = 'Seleccione un rol.';
    if (!formData.color) newErrors.color = 'Seleccione un color.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (isEditing) {
      updateEmployee({ ...existingUser, ...formData });
    } else {
      addEmployee({ ...formData, id: `emp${Date.now()}` });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{isEditing ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol:</label>
            <select id="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">Seleccione un rol</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          {/* Color */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color:</label>
            <select id="color" value={formData.color} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" style={{ backgroundColor: formData.color, color: formData.color ? 'white' : 'black' }}>
              <option value="" style={{ backgroundColor: 'white', color: 'black' }}>Seleccione un color</option>
              {colorOptions.map(c => <option key={c} value={c} style={{ backgroundColor: c, color: 'white' }}>{c}</option>)}
            </select>
            {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{isEditing ? 'Actualizar Usuario' : 'Añadir Usuario'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
