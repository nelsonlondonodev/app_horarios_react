import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/useAppContext';

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

const ShiftForm = ({ onClose, employees, existingShift, weekDays = [] }) => {
  const { addShift, updateShift } = useAppContext();
  const isEditing = !!existingShift;

  const [formData, setFormData] = useState({
    employeeId: '',
    day: '',
    startTime: '',
    endTime: '',
    type: '',
    role: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      setFormData({
        employeeId: existingShift.employeeId,
        day: existingShift.day,
        startTime: existingShift.startTime,
        endTime: existingShift.endTime,
        type: existingShift.type,
        role: existingShift.role,
      });
    } else if (weekDays.length > 0) {
      setFormData(prev => ({ ...prev, day: formatDate(weekDays[0]) }));
    }
  }, [isEditing, existingShift, weekDays]);

  const roles = ['Camarero', 'Cocinero', 'Jefe de Sala', 'Barman', 'Ayudante de Cocina', 'Administrador'];
  const shiftTypes = ['Mañana', 'Tarde', 'Noche'];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.employeeId) newErrors.employeeId = 'Seleccione un empleado.';
    if (!formData.day) newErrors.day = 'Seleccione un día.';
    if (!formData.startTime) newErrors.startTime = 'La hora de inicio es requerida.';
    if (!formData.endTime) newErrors.endTime = 'La hora de fin es requerida.';
    if (!formData.type) newErrors.type = 'Seleccione un tipo de turno.';
    if (!formData.role) newErrors.role = 'Seleccione un rol.';
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
      updateShift({ ...existingShift, ...formData });
    } else {
      addShift({ ...formData, id: `sh${Date.now()}` });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{isEditing ? 'Editar Turno' : 'Añadir Nuevo Turno'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Employee */}
          <div>
            <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Empleado:</label>
            <select id="employeeId" value={formData.employeeId} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">Seleccione un empleado</option>
              {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
            </select>
            {errors.employeeId && <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>}
          </div>

          {/* Day */}
          <div>
            <label htmlFor="day" className="block text-sm font-medium text-gray-700">Día:</label>
            <select id="day" value={formData.day} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">Seleccione un día</option>
              {weekDays.map(d => <option key={formatDate(d)} value={formatDate(d)}>{new Date(d).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'numeric' })}</option>)}
            </select>
            {errors.day && <p className="text-red-500 text-xs mt-1">{errors.day}</p>}
          </div>

          {/* Start Time */}
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Hora de Inicio:</label>
            <input type="time" id="startTime" value={formData.startTime} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
            {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
          </div>

          {/* End Time */}
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Hora de Fin:</label>
            <input type="time" id="endTime" value={formData.endTime} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
            {errors.endTime && <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>}
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Turno:</label>
            <select id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">Seleccione un tipo</option>
              {shiftTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
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

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancelar</button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{isEditing ? 'Guardar Cambios' : 'Añadir Turno'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShiftForm;
