import React from 'react';
import { useDrag } from 'react-dnd';

const ShiftCard = ({ shift, employeeName, employeeColor, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'shift',
    item: { id: shift.id, employeeId: shift.employeeId, day: shift.day },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={onClick}
      style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: employeeColor, color: 'white' }} // Apply employeeColor
      className="p-3 rounded-lg shadow-sm mb-2 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <p className="font-semibold text-sm">{employeeName}</p>
      <p className="text-xs">{shift.startTime} - {shift.endTime}</p>
      <p className="text-xs italic">{shift.role}</p>
    </div>
  );
};

export default ShiftCard;
