export const employees = [
  { id: 'emp1', name: 'Lucía García', role: 'Camarero', color: '#FF6B6B' },
  { id: 'emp2', name: 'Pedro Sánchez', role: 'Cocinero', color: '#4ECDC4' },
  { id: 'emp3', name: 'Ana López', role: 'Jefe de Sala', color: '#45B7D1' },
  { id: 'emp4', name: 'Carlos Ruiz', role: 'Barman', color: '#FED766' },
  { id: 'emp5', name: 'Elena Martín', role: 'Ayudante de Cocina', color: '#28B463' },
];

export const shifts = [
  // Lunes
  { id: 'sh1', employeeId: 'emp1', day: 'Lunes', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Camarero' },
  { id: 'sh2', employeeId: 'emp2', day: 'Lunes', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Cocinero' },
  { id: 'sh3', employeeId: 'emp3', day: 'Lunes', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Jefe de Sala' },
  { id: 'sh4', employeeId: 'emp4', day: 'Lunes', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Barman' },

  // Martes
  { id: 'sh5', employeeId: 'emp1', day: 'Martes', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Camarero' },
  { id: 'sh6', employeeId: 'emp5', day: 'Martes', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Ayudante de Cocina' },
  { id: 'sh7', employeeId: 'emp2', day: 'Martes', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Cocinero' },
  { id: 'sh8', employeeId: 'emp3', day: 'Martes', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Jefe de Sala' },

  // Miércoles
  { id: 'sh9', employeeId: 'emp4', day: 'Miércoles', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Barman' },
  { id: 'sh10', employeeId: 'emp1', day: 'Miércoles', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Camarero' },
  { id: 'sh11', employeeId: 'emp5', day: 'Miércoles', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Ayudante de Cocina' },
  { id: 'sh12', employeeId: 'emp2', day: 'Miércoles', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Cocinero' },

  // Jueves
  { id: 'sh13', employeeId: 'emp3', day: 'Jueves', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Jefe de Sala' },
  { id: 'sh14', employeeId: 'emp4', day: 'Jueves', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Barman' },
  { id: 'sh15', employeeId: 'emp1', day: 'Jueves', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Camarero' },
  { id: 'sh16', employeeId: 'emp5', day: 'Jueves', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Ayudante de Cocina' },

  // Viernes
  { id: 'sh17', employeeId: 'emp2', day: 'Viernes', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Cocinero' },
  { id: 'sh18', employeeId: 'emp3', day: 'Viernes', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Jefe de Sala' },
  { id: 'sh19', employeeId: 'emp4', day: 'Viernes', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Barman' },
  { id: 'sh20', employeeId: 'emp1', day: 'Viernes', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Camarero' },

  // Sábado
  { id: 'sh21', employeeId: 'emp5', day: 'Sábado', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Ayudante de Cocina' },
  { id: 'sh22', employeeId: 'emp2', day: 'Sábado', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Cocinero' },
  { id: 'sh23', employeeId: 'emp3', day: 'Sábado', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Jefe de Sala' },
  { id: 'sh24', employeeId: 'emp4', day: 'Sábado', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Barman' },

  // Domingo
  { id: 'sh25', employeeId: 'emp1', day: 'Domingo', startTime: '09:00', endTime: '17:00', type: 'Mañana', role: 'Camarero' },
  { id: 'sh26', employeeId: 'emp5', day: 'Domingo', startTime: '10:00', endTime: '18:00', type: 'Mañana', role: 'Ayudante de Cocina' },
  { id: 'sh27', employeeId: 'emp2', day: 'Domingo', startTime: '17:00', endTime: '01:00', type: 'Tarde', role: 'Cocinero' },
  { id: 'sh28', employeeId: 'emp3', day: 'Domingo', startTime: '18:00', endTime: '02:00', type: 'Tarde', role: 'Jefe de Sala' },
];
