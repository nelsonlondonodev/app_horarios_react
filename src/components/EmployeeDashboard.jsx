import React from 'react';
import { useAppContext } from '../context/useAppContext';
import { getWeekDays, getWeekRange } from '../utils/dateUtils';

const EmployeeDashboard = () => {
  const { currentUser, shifts, currentDate, goToPreviousWeek, goToNextWeek } = useAppContext();

  // Si no hay usuario, no renderizar nada (o un mensaje de carga)
  if (!currentUser) {
    return null;
  }

  const weekDays = getWeekDays(currentDate);
  const { weekStart, weekEnd } = getWeekRange(currentDate);

  const userShifts = shifts.filter((shift) => shift.employeeId === currentUser.id);

  const getShiftsForDay = (day) => {
    return userShifts
      .filter((shift) => shift.day === day.toISOString().split('T')[0])
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousWeek} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          &larr; Semana Anterior
        </button>
        <h2 className="text-xl font-bold">
          Semana del {weekStart} al {weekEnd}
        </h2>
        <button onClick={goToNextWeek} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Siguiente Semana &rarr;
        </button>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">Mis Horarios - {currentUser.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="bg-gray-100 p-3 rounded-lg">
            <h3 className="font-bold text-center">{day.toLocaleDateString('es-ES', { weekday: 'long' })}</h3>
            <p className="text-sm text-gray-600 text-center mb-2">{day.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}</p>
            <div className="space-y-2">
              {getShiftsForDay(day).map((shift) => (
                <div key={shift.id} className="bg-white p-2 rounded-lg shadow">
                  <p className="font-semibold">{shift.startTime} - {shift.endTime}</p>
                  <p className="text-sm text-gray-700">{shift.role}</p>
                </div>
              ))}
              {getShiftsForDay(day).length === 0 && (
                <p className="text-sm text-gray-500 text-center mt-4">No hay turnos asignados.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
