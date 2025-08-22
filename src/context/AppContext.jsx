import { createContext, useState, useEffect } from 'react';
import { shifts as mockShifts, employees as mockEmployees } from '../data/mockData';

// 1. Crear el Contexto
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// 2. Crear el Proveedor del Contexto
const AppProvider = ({ children }) => {
  // --- ESTADO --- //
  const [shifts, setShifts] = useState(() => {
    const savedShifts = localStorage.getItem('app_horarios_shifts');
    return savedShifts ? JSON.parse(savedShifts) : mockShifts;
  });

  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('app_horarios_employees');
    return savedEmployees ? JSON.parse(savedEmployees) : mockEmployees;
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('app_horarios_currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // --- EFECTOS --- //
  useEffect(() => {
    localStorage.setItem('app_horarios_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('app_horarios_shifts', JSON.stringify(shifts));
  }, [shifts]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('app_horarios_currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('app_horarios_currentUser');
    }
  }, [currentUser]);


  // --- FUNCIONES DE AUTENTICACIÓN --- //
  const login = (userId) => {
    const user = employees.find((emp) => emp.id === userId);
    if (user) {
      setCurrentUser(user);
    } else {
      console.error("Intento de login con ID de usuario no válido:", userId);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };


  // --- FUNCIONES DE NEGOCIO --- //
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
    setShifts((prevShifts) => prevShifts.filter((shift) => shift.employeeId !== employeeId));
  };

  const goToPreviousWeek = () => {
    setCurrentDate((current) => {
      const newDate = new Date(current);
      newDate.setDate(current.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentDate((current) => {
      const newDate = new Date(current);
      newDate.setDate(current.getDate() + 7);
      return newDate;
    });
  };

  // --- VALOR DEL CONTEXTO --- //
  const value = {
    currentUser,
    login,
    logout,
    shifts,
    setShifts, 
    employees,
    setEmployees, 
    addShift,
    updateShift,
    deleteShift,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    currentDate,
    goToPreviousWeek,
    goToNextWeek,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
