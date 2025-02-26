export const getDiasHoras = (date: Date) => {
  const hs = date.getHours();
  const min = date
    .getMinutes()
    .toString()
    .padStart(2, '0');
  const dia = date.toLocaleDateString();
  const nombreDia = (date: Date) => {
    const elDiaEs = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
    }).format(date);

    return elDiaEs.charAt(0).toUpperCase() + elDiaEs.slice(1);
  };

  const diaDeLaSemana = nombreDia(date);

  return {
    diaDeLaSemana,
    dia,
    hs,
    min,
  };
};
