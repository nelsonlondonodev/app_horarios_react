import React from 'react';
import { useDrop } from 'react-dnd';
import { formatDate } from '../utils/dateUtils';

const DayCell = ({ employee, day, handleDrop, children }) => {
  const dayFormatted = formatDate(day);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'shift',
    drop: (item) => handleDrop(item.id, employee.id, dayFormatted),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));

  return (
    <div
      ref={drop}
      className={`p-2 border border-gray-200 rounded-md min-h-[80px] ${isOver ? 'bg-green-100' : ''}`}
    >
      {children}
    </div>
  );
};

export default DayCell;
