export const Referencias = () => {
  return (
    <>
      <span className='text-sm'>Referencias:</span>
      <div className='flex flex-col md:flex-row justify-around items-center gap-1 w-full h-auto my-1 md:my-6 '>
        <div className='flex'>
          <div className='h-2 w-2 mt-1.5 bg-blue-300 border-none' />{' '}
          <small className='ms-1 text-center'>Dia de hoy</small>
        </div>
        <div className='flex'>
          <div className='h-2 w-2 mt-1.5 bg-emerald-800 border-none' />{' '}
          <small className='ms-1 text-center'>
            Eventos en el calendario
          </small>
        </div>
        <div className='flex'>
          <div className='h-2 w-2 mt-1.5 bg-blue-500 border-none' />{' '}
          <small className='ms-1 text-center'>
            Fecha seleccionada
          </small>
        </div>
      </div>
    </>
  );
};
export default Referencias;
