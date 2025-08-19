import { createContext, useContext, useState, useEffect } from 'react';
import { shifts as mockShifts, employees as mockEmployees } from '../data/mockData';

// 1. Crear el Contexto
const AppContext = createContext();

// 2. Crear el Hook personalizado para consumir el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un un AppProvider');
  }
  return context;
};

// 3. Crear el Proveedor del Contexto
export const AppProvider = ({ children }) => {
  const [shifts, setShifts] = useState(() => {
    const savedShifts = localStorage.getItem('app_horarios_shifts');
    return savedShifts ? JSON.parse(savedShifts) : mockShifts;
  });

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('app_horarios_employees');
    return savedEmployees ? JSON.parse(savedEmployees) : mockEmployees;
  });

  useEffect(() => {
    localStorage.setItem('app_horarios_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('app_horarios_shifts', JSON.stringify(shifts));
  }, [shifts]);

  // Funciones para manipular los turnos
  const addShift = (newShift) => {
    setShifts((prevShifts) => [...prevShifts, newShift]);
  };
  const updateShift = (updatedShift) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) => (shift.id === updatedShift.id ? updatedShift : shift))
    );
  };
  const deleteShift = (shiftId) => {
    setShifts((prevShifts) => prevShifts.filter((shift) => shift.id !== shiftId));
  };

  // Funciones para manipular los empleados
  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };
  const updateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee))
    );
  };
  const deleteEmployee = (employeeId) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== employeeId));
    // Also delete shifts associated with this employee
    setShifts((prevShifts) => prevShifts.filter((shift) => shift.employeeId !== employeeId));
  };

  const value = {
    shifts,
    setShifts, // Expose setShifts for direct updates like handleUpdateShifts
    employees,
    setEmployees, // Expose setEmployees for direct updates
    addShift,
    updateShift,
    deleteShift,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};