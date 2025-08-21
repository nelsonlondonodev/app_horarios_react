import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toISOString().split('T')[0];
};

const ShiftForm = ({ onClose, employees, existingShift, weekDays = [] }) => {
  const { addShift, updateShift } = useAppContext();
  const isEditing = !!existingShift;

  const [employeeId, setEmployeeId] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [type, setType] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (isEditing) {
      setEmployeeId(existingShift.employeeId);
      setDay(existingShift.day);
      setStartTime(existingShift.startTime);
      setEndTime(existingShift.endTime);
      setType(existingShift.type);
      setRole(existingShift.role);
    } else if (weekDays.length > 0) {
      // Set default day to the first day of the current week
      setDay(formatDate(weekDays[0]));
    }
  }, [isEditing, existingShift, weekDays]);

  const roles = ['Camarero', 'Cocinero', 'Jefe de Sala', 'Barman', 'Ayudante de Cocina', 'Administrador'];
  const shiftTypes = ['Mañana', 'Tarde', 'Noche'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeId || !day || !startTime || !endTime || !type || !role) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const shiftData = {
      employeeId,
      day,
      startTime,
      endTime,
      type,
      role,
    };

    if (isEditing) {
      updateShift({ ...existingShift, ...shiftData });
    } else {
      addShift({ ...shiftData, id: `sh${Date.now()}` });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{isEditing ? 'Editar Turno' : 'Añadir Nuevo Turno'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Empleado:</label>
            <select
              id="employee"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Seleccione un empleado</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="day" className="block text-sm font-medium text-gray-700">Día:</label>
            <select
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Seleccione un día</option>
              {weekDays.map(d => (
                <option key={formatDate(d)} value={formatDate(d)}>
                  {new Date(d).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'numeric' })}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Hora de Inicio:</label>
            <input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Hora de Fin:</label>
            <input
              type="time"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipo de Turno:</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Seleccione un tipo</option>
              {shiftTypes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
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
              {isEditing ? 'Guardar Cambios' : 'Añadir Turno'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShiftForm;
