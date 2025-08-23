export const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const getWeekDays = (startDate) => {
  const days = [];
  const startOfWeek = getStartOfWeek(startDate);
  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    days.push(d);
  }
  return days;
};

export const getWeekRange = (date) => {
  const startOfWeek = getStartOfWeek(date);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const format = (d) => {
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long' });
  };

  return {
    weekStart: format(startOfWeek),
    weekEnd: format(endOfWeek),
  };
};
