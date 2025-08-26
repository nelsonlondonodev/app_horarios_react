import React, { useState, useMemo } from 'react';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const startOfWeek = useMemo(() => getStartOfWeek(currentDate), [currentDate]);
  const weekDays = useMemo(() => getWeekDays(startOfWeek), [startOfWeek]);
  const weekDaysFormatted = useMemo(() => weekDays.map(formatDate), [weekDays]);

  const filteredShifts = useMemo(() => {
    return shifts.filter(shift => weekDaysFormatted.includes(shift.day));
  }, [shifts, weekDaysFormatted]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const nameMatch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const roleMatch = roleFilter === 'all' || emp.role === roleFilter;
      return nameMatch && roleMatch;
    });
  }, [employees, searchTerm, roleFilter]);

  const employeeMap = useMemo(() => {
    if (!employees) return new Map();
    return new Map(employees.map(emp => [emp.id, { name: emp.name, color: emp.color }]));
  }, [employees]);

  // --- Renderizado Condicional ---
  // Si los datos principales no están listos, no renderizar el calendario
  if (!employees || !shifts) {
    return <div className="text-center p-8">Cargando empleados y turnos...</div>;
  }

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

  const getCsvData = () => {
    const headers = ['Empleado', ...weekDays.map(d => d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })), 'Total Horas'];
    const data = filteredEmployees.map(employee => {
      const row = { Empleado: employee.name };
      let totalHours = 0;
      weekDays.forEach(day => {
        const dayFormatted = formatDate(day);
        const shift = filteredShifts.find(s => s.employeeId === employee.id && s.day === dayFormatted);
        if (shift) {
          row[day.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })] = `${shift.startTime} - ${shift.endTime}`;
          totalHours += calculateHours(shift.startTime, shift.endTime);
        } else {
          row[day.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })] = '-';
        }
      });
      row['Total Horas'] = totalHours.toFixed(2);
      return row;
    });
    return [headers, ...data.map(Object.values)];
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text(`Horarios para la semana del ${startOfWeek.toLocaleDateString('es-ES')}`, 14, 16);
    autoTable(doc, {
      head: [['Empleado', ...weekDays.map(d => d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })), 'Total Horas']],
      body: filteredEmployees.map(employee => {
        let totalHours = 0;
        const row = [employee.name];
        weekDays.forEach(day => {
          const dayFormatted = formatDate(day);
          const shift = filteredShifts.find(s => s.employeeId === employee.id && s.day === dayFormatted);
          if (shift) {
            row.push(`${shift.startTime} - ${shift.endTime}`);
            totalHours += calculateHours(shift.startTime, shift.endTime);
          } else {
            row.push('-');
          }
        });
        row.push(totalHours.toFixed(2));
        return row;
      }),
      startY: 20,
    });
    doc.save(`horarios-semana-${formatDate(startOfWeek)}.pdf`);
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

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar empleado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">Todos los roles</option>
            <option value="admin">Admin</option>
            <option value="employee">Empleado</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => openForm()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Añadir Nuevo Turno
          </button>
          <CSVLink
            data={getCsvData()}
            filename={`horarios-semana-${formatDate(startOfWeek)}.csv`}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Exportar a CSV
          </CSVLink>
          <button
            onClick={exportToPdf}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Exportar a PDF
          </button>
        </div>
      </div>

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


          {filteredEmployees.map(employee => {
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