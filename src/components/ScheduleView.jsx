import React, { useState } from 'react';
import { employees, shifts } from '../data/mockData';
import ShiftCard from './ShiftCard';
import Modal from './Modal';

const ScheduleView = () => {
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState('');

  const openModal = (shift, employeeName) => {
    setSelectedShift(shift);
    setSelectedEmployeeName(employeeName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShift(null);
    setSelectedEmployeeName('');
  };

  // Create a map for quick employee lookup
  const employeeMap = new Map(employees.map(emp => [emp.id, emp.name]));

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">Vista Semanal de Horarios</h3>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 gap-4">
          {/* Header Row: Days of the week */}
          <div className="col-span-1"></div> {/* Empty corner for employee names */}
          {daysOfWeek.map(day => (
            <div key={day} className="font-bold text-center p-2 bg-gray-100 rounded-md">
              {day}
            </div>
          ))}

          {/* Schedule Grid */}
          {employees.map(employee => (
            <React.Fragment key={employee.id}>
              <div className="font-semibold p-2 bg-gray-50 rounded-md flex items-center justify-center">
                {employee.name}
              </div>
              {daysOfWeek.map(day => (
                <div key={`${employee.id}-${day}`} className="p-2 border border-gray-200 rounded-md min-h-[80px]">
                  {shifts
                    .filter(shift => shift.employeeId === employee.id && shift.day === day)
                    .map(shift => (
                      <ShiftCard
                        key={shift.id}
                        shift={shift}
                        employeeName={employee.name}
                        onClick={() => openModal(shift, employee.name)}
                      />
                    ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {selectedShift && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          shift={selectedShift}
          employeeName={selectedEmployeeName}
        />
      )}
    </div>
  );
};

export default ScheduleView;