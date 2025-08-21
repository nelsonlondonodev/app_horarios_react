import React from 'react';
import { useDrag } from 'react-dnd';

const ShiftCard = ({ shift, employeeName, onClick, bgColorClass = 'bg-gray-400', textColorClass = 'text-black' }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'shift',
    item: { id: shift.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={onClick}
      className={`p-3 rounded-lg shadow-sm mb-2 cursor-pointer hover:opacity-80 transition-opacity ${bgColorClass} ${textColorClass}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <p className="font-semibold text-sm">{employeeName}</p>
      <p className="text-xs">{shift.startTime} - {shift.endTime}</p>
      <p className="text-xs italic">{shift.role}</p>
    </div>
  );
};

export default ShiftCard;
