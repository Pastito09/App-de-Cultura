export const Footer = () => {
  return (
    <>
      <footer className='p-10 2xl:mt-80 mt-8 w-full text-gray-800 border-t border-t-slate-300 rounded-md text-center'>
        <span>Agenda Cutural - {new Date().getUTCFullYear()}</span>
      </footer>
    </>
  );
};
