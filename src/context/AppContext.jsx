import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// 1. Crear el Contexto
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// 2. Crear el Proveedor del Contexto
const AppProvider = ({ children }) => {
  // --- ESTADO --- //
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('app_horarios_currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // --- EFECTOS --- //
  useEffect(() => {
    fetch('http://localhost:3001/employees')
      .then(res => res.json())
      .then(data => setEmployees(data));

    fetch('http://localhost:3001/shifts')
      .then(res => res.json())
      .then(data => setShifts(data));
  }, []);

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
      toast.success(`¡Bienvenido, ${user.name}!`);
    } else {
      toast.error("Error: Usuario no encontrado.");
      console.error("Intento de login con ID de usuario no válido:", userId);
    }
  };

  const logout = () => {
    toast.info("Has cerrado sesión.");
    setCurrentUser(null);
  };


  // --- FUNCIONES DE NEGOCIO --- //
  const addShift = (newShift) => {
    setShifts((prevShifts) => [...prevShifts, newShift]);
    toast.success("Turno añadido correctamente.");
  };
  const updateShift = (updatedShift) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) => (shift.id === updatedShift.id ? updatedShift : shift))
    );
    toast.success("Turno actualizado correctamente.");
  };
  const deleteShift = (shiftId) => {
    setShifts((prevShifts) => prevShifts.filter((shift) => shift.id !== shiftId));
    toast.info("Turno eliminado.");
  };

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    toast.success("Empleado añadido correctamente.");
  };
  const updateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) => (employee.id === updatedEmployee.id ? updatedEmployee : employee))
    );
    toast.success("Empleado actualizado correctamente.");
  };
  const deleteEmployee = (employeeId) => {
    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== employeeId));
    setShifts((prevShifts) => prevShifts.filter((shift) => shift.employeeId !== employeeId));
    toast.info("Empleado eliminado.");
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
