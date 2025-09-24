export const EventContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-10 bg-gray-100'>
      {children}
    </div>
  );
};

export default EventContainer;
