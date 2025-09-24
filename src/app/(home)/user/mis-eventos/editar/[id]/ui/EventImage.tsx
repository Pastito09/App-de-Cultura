import Image from 'next/image';

export const EventImage = ({ url }: { url: string }) => {
  return (
    <div className='flex justify-center items-center my-4'>
      <Image
        src={url}
        alt='Imagen del evento'
        width={350}
        height={130}
        quality={100}
        className='rounded-md'
      />
    </div>
  );
};
