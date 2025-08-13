import React from 'react';

const Modal = ({ isOpen, onClose, shift, employeeName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Detalles del Turno</h3>
        <div className="space-y-2">
          <p><span className="font-semibold">Empleado:</span> {employeeName}</p>
          <p><span className="font-semibold">Día:</span> {shift.day}</p>
          <p><span className="font-semibold">Hora de Inicio:</span> {shift.startTime}</p>
          <p><span className="font-semibold">Hora de Fin:</span> {shift.endTime}</p>
          <p><span className="font-semibold">Rol:</span> {shift.role}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
