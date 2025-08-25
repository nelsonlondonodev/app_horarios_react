const employees = [
  { id: 'emp1', name: 'Lucía García', role: 'admin', color: '#FF6B6B' },
  { id: 'emp2', name: 'Pedro Sánchez', role: 'employee', color: '#4ECDC4' },
  { id: 'emp3', name: 'Ana López', role: 'employee', color: '#45B7D1' },
  { id: 'emp4', name: 'Carlos Ruiz', role: 'employee', color: '#FED766' },
  { id: 'emp5', name: 'Elena Martín', role: 'employee', color: '#28B463' },
];

const shifts = [
  // Lunes
  { id: 'sh1', employeeId: 'emp1', day: '2025-08-18', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Camarero' },
  { id: 'sh2', employeeId: 'emp2', day: '2025-08-18', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Cocinero' },
  { id: 'sh3', employeeId: 'emp3', day: '2025-08-18', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Jefe de Sala' },
  { id: 'sh4', employeeId: 'emp4', day: '2025-08-18', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Barman' },

  // Martes
  { id: 'sh5', employeeId: 'emp1', day: '2025-08-19', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Camarero' },
  { id: 'sh6', employeeId: 'emp5', day: '2025-08-19', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Ayudante de Cocina' },
  { id: 'sh7', employeeId: 'emp2', day: '2025-08-19', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Cocinero' },
  { id: 'sh8', employeeId: 'emp3', day: '2025-08-19', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Jefe de Sala' },

  // Miércoles
  { id: 'sh9', employeeId: 'emp4', day: '2025-08-20', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Barman' },
  { id: 'sh10', employeeId: 'emp1', day: '2025-08-20', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Camarero' },
  { id: 'sh11', employeeId: 'emp5', day: '2025-08-20', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Ayudante de Cocina' },
  { id: 'sh12', employeeId: 'emp2', day: '2025-08-20', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Cocinero' },

  // Jueves
  { id: 'sh13', employeeId: 'emp3', day: '2025-08-21', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Jefe de Sala' },
  { id: 'sh14', employeeId: 'emp4', day: '2025-08-21', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Barman' },
  { id: 'sh15', employeeId: 'emp1', day: '2025-08-21', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Camarero' },
  { id: 'sh16', employeeId: 'emp5', day: '2025-08-21', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Ayudante de Cocina' },

  // Viernes
  { id: 'sh17', employeeId: 'emp2', day: '2025-08-22', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Cocinero' },
  { id: 'sh18', employeeId: 'emp3', day: '2025-08-22', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Jefe de Sala' },
  { id: 'sh19', employeeId: 'emp4', day: '2025-08-22', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Barman' },
  { id: 'sh20', employeeId: 'emp1', day: '2025-08-22', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Camarero' },

  // Sábado
  { id: 'sh21', employeeId: 'emp5', day: '2025-08-23', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Ayudante de Cocina' },
  { id: 'sh22', employeeId: 'emp2', day: '2025-08-23', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Cocinero' },
  { id: 'sh23', employeeId: 'emp3', day: '2025-08-23', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Jefe de Sala' },
  { id: 'sh24', employeeId: 'emp4', day: '2025-08-23', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Barman' },

  // Domingo
  { id: 'sh25', employeeId: 'emp1', day: '2025-08-24', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Camarero' },
  { id: 'sh26', employeeId: 'emp5', day: '2025-08-24', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Ayudante de Cocina' },
  { id: 'sh27', employeeId: 'emp2', day: '2025-08-24', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Cocinero' },
  { id: 'sh28', employeeId: 'emp3', day: '2025-08-24', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Jefe de Sala' },
];

module.exports = { employees, shifts };
