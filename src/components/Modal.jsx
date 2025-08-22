import React from 'react';
import { useAppContext } from '../context/useAppContext'; // Import useAppContext

const Modal = ({ isOpen, onClose, shift, employeeName, employeeColor, onEdit }) => { // Added onEdit prop
  const { deleteShift } = useAppContext(); // Get deleteShift from context

  if (!isOpen) return null;

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este turno?')) {
      deleteShift(shift.id);
      onClose(); // Close modal after deletion
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Detalles del Turno</h3>
        <div className="space-y-2">
          <p className="flex items-center"><span className="font-semibold">Empleado:</span> {employeeName} <span className="ml-2 w-4 h-4 rounded-full" style={{ backgroundColor: employeeColor }}></span></p>
          <p><span className="font-semibold">Día:</span> {shift.day}</p>
          <p><span className="font-semibold">Hora de Inicio:</span> {shift.startTime}</p>
          <p><span className="font-semibold">Hora de Fin:</span> {shift.endTime}</p>
          <p><span className="font-semibold">Rol:</span> {shift.role}</p>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => { onEdit(shift); onClose(); }} // Call onEdit and close modal
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
