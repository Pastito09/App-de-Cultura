export const getDiasHoras = (date: Date) => {
  const hs = date.getHours();
  const min = date
    .getMinutes()
    .toString()
    .padStart(2, '0');
  const dia = date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
  const nombreDia = String(
    new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
    }).format(date)
  ).replace(/^./, (letra) => letra.toUpperCase());

  return {
    diaDeLaSemana: nombreDia,
    dia,
    hs,
    min,
  };
};
