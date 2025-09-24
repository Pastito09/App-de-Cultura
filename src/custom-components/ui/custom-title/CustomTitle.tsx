interface Props {
  children: React.ReactNode;
}

export const CustomTitle = ({ children }: Props) => {
  return (
    <>
      <div className='flex flex-row ms-5 me-auto'>
        <h2 className='text-3xl font-semibold tracking-tight text-pretty text-start text-gray-900 md:text-5xl'>
          {children}
        </h2>
      </div>
      <div className='h-0.5 bg-gray-400 w-[80%] mt-2 self-start ms-3' />
    </>
  );
};
