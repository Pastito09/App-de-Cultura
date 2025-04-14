export const EventContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className='flex flex-col items-center justify-center h-[50vh] bg-gray-100'>
      {children}
    </div>
  );
};

export default EventContainer;
