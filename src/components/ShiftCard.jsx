import React from 'react';
import { useDrag } from 'react-dnd';

const ShiftCard = ({ shift, employeeName, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'shift',
    item: { id: shift.id, employeeId: shift.employeeId, day: shift.day },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getRoleColor = (role) => {
    switch (role) {
      case 'Camarera':
        return 'bg-yellow-200 text-yellow-800'; // Amarillo mostaza
      case 'Cocinero':
        return 'bg-red-200 text-red-800'; // Rojo vino
      case 'Jefa de Sala':
        return 'bg-blue-200 text-blue-800'; // Azul vibrante
      case 'Barman':
        return 'bg-green-200 text-green-800'; // Verde oliva
      case 'Ayudante de Cocina':
        return 'bg-orange-200 text-orange-800'; // Naranja terracota
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div
      ref={drag}
      onClick={onClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`p-3 rounded-lg shadow-sm mb-2 ${getRoleColor(shift.role)} cursor-pointer hover:opacity-80 transition-opacity`}
    >
      <p className="font-semibold text-sm">{employeeName}</p>
      <p className="text-xs">{shift.startTime} - {shift.endTime}</p>
      <p className="text-xs italic">{shift.role}</p>
    </div>
  );
};

export default ShiftCard;
