import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/useAppContext';
import ShiftCard from './ShiftCard';
import Modal from './Modal';
import ShiftForm from './ShiftForm';
import DayCell from './DayCell'; // Importar DayCell
import { getStartOfWeek, getWeekDays, formatDate } from '../utils/dateUtils'; // Importar funciones de fecha

// --- Constantes ---

const SHIFT_TYPE_COLORS = {
  'Mañana': { bg: 'bg-sky-200', text: 'text-sky-800' },
  'Tarde': { bg: 'bg-amber-200', text: 'text-amber-800' },
  'Noche': { bg: 'bg-indigo-300', text: 'text-indigo-800' },
  default: { bg: 'bg-gray-200', text: 'text-gray-800' },
};

const calculateHours = (startTime, endTime) => {
  try {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    let diff = end - start;
    if (diff < 0) { // Maneja turnos que cruzan la medianoche
      diff += 24 * 60 * 60 * 1000;
    }
    return diff / (60 * 60 * 1000);
  } catch {
    return 0; // Devuelve 0 si las horas no son válidas
  }
};

// --- Componente Principal ---

const ScheduleView = () => {
  const { employees, shifts, setShifts, currentDate, goToPreviousWeek, goToNextWeek } = useAppContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingShift, setEditingShift] = useState(null);

  const startOfWeek = useMemo(() => getStartOfWeek(currentDate), [currentDate]);
  const weekDays = useMemo(() => getWeekDays(startOfWeek), [startOfWeek]);
  const weekDaysFormatted = useMemo(() => weekDays.map(formatDate), [weekDays]);

  const filteredShifts = useMemo(() => {
    return shifts.filter(shift => weekDaysFormatted.includes(shift.day));
  }, [shifts, weekDaysFormatted]);

  const employeeMap = useMemo(() => {
    return new Map(employees.map(emp => [emp.id, { name: emp.name, color: emp.color }]));
  }, [employees]);

  const openModal = (shift) => {
    setSelectedShift(shift);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedShift(null);
  };

  const openForm = (shift = null) => {
    setEditingShift(shift);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingShift(null);
  };

  const handleDrop = (shiftId, newEmployeeId, newDay) => {
    const updatedShifts = shifts.map((shift) =>
      shift.id === shiftId ? { ...shift, employeeId: newEmployeeId, day: newDay } : shift
    );
    setShifts(updatedShifts);
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousWeek} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          &larr; Semana Anterior
        </button>
        <h3 className="text-xl font-semibold text-gray-700">
          Semana del {startOfWeek.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} de {startOfWeek.toLocaleDateString('es-ES', { year: 'numeric' })}
        </h3>
        <button onClick={goToNextWeek} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Siguiente Semana &rarr;
        </button>
      </div>

      <button
        onClick={() => openForm()}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Añadir Nuevo Turno
      </button>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-9 gap-4">
          <div className="col-span-1"></div>
          {weekDays.map(day => (
            <div key={day.toISOString()} className="font-bold text-center p-2 bg-gray-200 text-gray-700 rounded-md">
              {day.toLocaleDateString('es-ES', { weekday: 'long' })} <br/>
              <span className="font-normal text-sm">{day.toLocaleDateString('es-ES', { day: 'numeric', month: 'numeric' })}</span>
            </div>
          ))}
           <div className="font-bold text-center p-2 bg-green-200 text-green-800 rounded-md">Total Horas</div>


          {employees.map(employee => {
            const employeeShifts = filteredShifts.filter(shift => shift.employeeId === employee.id);
            const totalHours = employeeShifts.reduce((acc, shift) => acc + calculateHours(shift.startTime, shift.endTime), 0);

            return (
              <React.Fragment key={employee.id}>
                <div className="font-semibold p-2 bg-gray-100 text-gray-700 rounded-md flex items-center justify-center">
                  {employee.name}
                </div>
                {weekDays.map(day => {
                  const dayFormatted = formatDate(day);
                  return (
                    <DayCell
                      key={`${employee.id}-${dayFormatted}`}
                      employee={employee}
                      day={day}
                      handleDrop={handleDrop}
                    >
                      {employeeShifts
                        .filter(shift => shift.day === dayFormatted)
                        .map(shift => {
                          const employeeDetails = employeeMap.get(shift.employeeId);
                          const colorTheme = SHIFT_TYPE_COLORS[shift.type] || SHIFT_TYPE_COLORS.default;
                          return (
                            <ShiftCard
                              key={shift.id}
                              shift={shift}
                              employeeName={employeeDetails?.name || ''}
                              onClick={() => openModal(shift)}
                              bgColorClass={colorTheme.bg}
                              textColorClass={colorTheme.text}
                            />
                          );
                        })}
                    </DayCell>
                  );
                })}
                <div className="font-bold text-center p-2 bg-green-100 text-green-800 rounded-md flex items-center justify-center">
                  {totalHours.toFixed(2)}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {isModalOpen && selectedShift && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          shift={selectedShift}
          employeeName={employeeMap.get(selectedShift.employeeId)?.name || ''}
          onEdit={() => openForm(selectedShift)}
          onDelete={() => { /* Lógica de borrado */ }}
        />
      )}

      {isFormOpen && (
        <ShiftForm
          onClose={closeForm}
          existingShift={editingShift}
          employees={employees}
          weekDays={weekDays}
        />
      )}
    </div>
  );
};

export default ScheduleView;