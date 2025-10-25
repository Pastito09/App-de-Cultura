'use client';

import currencyFormat from '@/utils/currencyFormat';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, useWatch, UseFormRegister } from 'react-hook-form';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn, titleTransform } from '@/utils';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { EventImage } from './EventImage';
import { updateEvent } from '@/actions/events/updateEvent';

interface FormInputs {
  id: string;
  userId: string;
  eventTitle: string;
  eventSlug: string;
  eventDescription: string;
  eventDate: Date;
  startTime: string;
  eventLocation: string;
  eventLocationName: string;
  eventLocationMap?: string | null;

  image?: {
    id: string;
    url: string;
    eventId: string;
  } | null;
  ticketPrice?: string | null;
  ticketLink?: string | null;
  eventType: 'concierto' | 'teatro' | 'fiesta' | 'feria' | 'otros';
}

interface UpdateEventoFormProps {
  evento: FormInputs;
}
export const UpdateEventoForm = ({
  evento,
}: UpdateEventoFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const router = useRouter();

  const {
    register,

    handleSubmit,
    watch,

    setValue,
    control,
  } = useForm<FormInputs>({
    defaultValues: {
      eventTitle: evento.eventTitle,
      eventDescription: evento.eventDescription,
      eventDate: new Date(evento.eventDate),
      startTime: evento.startTime,
      eventLocation: evento.eventLocation,
      eventLocationName: evento.eventLocationName,
      eventLocationMap: evento.eventLocationMap || '',
      image: evento.image || undefined,
      ticketPrice: evento.ticketPrice || '',
      ticketLink: evento.ticketLink || '',
      eventType: evento.eventType as
        | 'concierto'
        | 'teatro'
        | 'fiesta'
        | 'feria'
        | 'otros',
    },
  });

  const date = watch('eventDate');

  const imageFiles = useWatch({
    control,
    name: 'image',
  });

  const imageUrl = newImageFile
    ? '/placeholder.jpg'
    : evento.image?.url ?? '/placeholder.jpg';

  const uploadedFile = imageFiles ? [0] : null;

  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;

    // Limpiamos todo lo que no sea número
    const numeric = input.replace(/[^\d]/g, '');
    const numberValue = parseFloat(numeric) / 100;

    setValue('ticketPrice', numberValue.toString(), {
      shouldValidate: true,
      shouldDirty: true,
    });

    event.target.value = isNaN(numberValue)
      ? ''
      : currencyFormat(numberValue);
  };

  useEffect(() => {
    register('eventDate', { required: true, valueAsDate: true });
  }, [register]);

  const onSubmitEventForm = async (data: FormInputs) => {
    const formData = new FormData();

    formData.append('eventTitle', data.eventTitle);
    formData.append('eventDescription', data.eventDescription);
    formData.append(
      'eventDate',
      watch('eventDate')?.toISOString() || ''
    );
    formData.append('startTime', data.startTime);
    formData.append('eventLocation', data.eventLocation);
    formData.append('eventLocationName', data.eventLocationName);
    formData.append('eventLocationMap', data.eventLocationMap || '');
    formData.append('eventType', data.eventType);
    formData.append('ticketPrice', data.ticketPrice || '0');
    formData.append('ticketLink', data.ticketLink || '');
    if (uploadedFile instanceof File) {
      formData.append('image', uploadedFile);
    } else if (evento.image) {
      formData.append('image', evento.image.id);
    }
    formData.append('id', evento.id);
    formData.append('userId', evento.userId);
    formData.append('eventSlug', titleTransform(data.eventTitle));
    const { ok, prismaTx: eventUpdated } = await updateEvent(
      formData
    );

    if (!ok) {
      console.error('Error al actualizar el evento');
      return;
    }
    router.refresh();
    router.replace(`/${eventUpdated?.eventUpdated?.eventSlug}`);
  };

  return (
    <div className='flex flex-col mt-4 mx-auto w-full'>
      <form onSubmit={handleSubmit(onSubmitEventForm)}>
        <div className='border-b mx-4 border-gray-900/10 pb-12'>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2'>
            <div className='flex flex-col col-span-1 mt-1'>
              <label
                htmlFor='title'
                className='block text-sm/6 ms-3 font-medium text-gray-900'
              >
                Título
              </label>
              <div className='mt-2'>
                <div className='flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600'>
                  <input
                    required
                    minLength={5}
                    max={60}
                    id='title'
                    {...register('eventTitle', {
                      required: true,
                    })}
                    type='text'
                    className='block min-w-0 h-10  w-full max-w-full rounded-md p-1.5 bg-white text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>
              <label
                htmlFor='description'
                className='block text-sm/6 font-medium text-gray-900 mt-20 ms-2'
              >
                Descripción del evento
              </label>
              <div className='mt-2'>
                <textarea
                  id='description'
                  {...register('eventDescription', {
                    required: true,
                  })}
                  rows={3}
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  minLength={5}
                  maxLength={200}
                />
                <p className='mt-2 ms-2 text-sm/6 text-gray-600'>
                  Escribe una breve descripción del evento.
                </p>
              </div>
            </div>
            {/* Lado derecho */}
            <div className='flex flex-col col-span-1'>
              <div className='flex flex-row flex-wrap items-center justify-evenly min-w-0 gap-2'>
                <div className='flex flex-col text-center'>
                  <label
                    htmlFor='eventDate'
                    className='block text-sm/6 font-medium text-gray-900 mt-2'
                  >
                    Fecha del evento
                  </label>
                  <input
                    type='hidden'
                    id='eventDate'
                    {...register('eventDate')}
                  />
                  <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        onClick={() => setIsOpen(true)}
                        variant={'outline'}
                        className={cn(
                          'w-full text-center flex max-w-full m-1 h-10 p-1 rounded-md bg-white px-3 py-1.5 text-base text-gray-600 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
                          !date && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon />
                        {date ? (
                          format(date, 'PPP', { locale: es })
                        ) : (
                          <span>Elegí una fecha</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-auto p-0'
                      align='start'
                    >
                      <Calendar
                        mode='single'
                        fromDate={new Date()}
                        selected={date}
                        defaultMonth={date}
                        locale={es}
                        weekStartsOn={0}
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            setValue('eventDate', selectedDate, {
                              shouldValidate: true,
                            });
                            setIsOpen(false);
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='flex flex-col text-center'>
                  <label
                    htmlFor='startTime'
                    className='block text-sm/6 font-medium text-gray-900 mt-2'
                  >
                    Horario:
                  </label>
                  <TimeInput
                    register={register}
                    startTime={evento.startTime}
                  />
                </div>
                <div className='flex flex-col text-center'>
                  <label
                    htmlFor='eventType'
                    className='block text-sm/6 font-medium text-gray-900 mt-2'
                  >
                    Tipo de evento:
                  </label>
                  <select
                    required
                    id='eventType'
                    {...register('eventType', {
                      required: 'El tipo de evento es requerido',
                    })}
                    className='w-auto max-w-full m-1 h-10 p-1 block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  >
                    <option value=''>[Seleccione]</option>
                    <option value='concierto'>Concierto</option>
                    <option value='teatro'>Teatro</option>
                    <option value='fiesta'>Fiesta</option>
                    <option value='feria'>Feria</option>
                    <option value='otros'>Otros</option>
                  </select>
                </div>
                <div className='flex flex-col items-center text-center'>
                  <label
                    htmlFor='eventTicketPrice'
                    className='block text-sm/6 font-medium text-gray-900 mt-2'
                  >
                    Precio de la entrada:
                  </label>
                  <input
                    type='text'
                    inputMode='numeric'
                    id='eventTicketPrice'
                    {...register('ticketPrice', {
                      min: 0,
                    })}
                    onInput={handlePriceChange}
                    className='w-32 text-center max-w-full m-1 h-10 p-1 block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>
              <div className='flex justify-center text-center'>
                <div className='flex flex-col w-full text-center'>
                  <div className='text-sm text-gray-400'>
                    Si tenes link de pago para las entradas pegálo acá
                  </div>
                  <input
                    id='eventTicketLink'
                    {...register('ticketLink')}
                    type='text'
                    className='w-[90%] max-w-full p-1 h-10 m-auto  block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 xl:grid-cols-2  justify-center mt-3 gap-2'>
                <div className='flex flex-col text-center'>
                  <label
                    htmlFor='eventLocation'
                    className='block text-sm/6 font-medium text-gray-900 mt-2 ms-2'
                  >
                    Dirección:
                  </label>
                  <div className=''>
                    <input
                      id='eventLocation'
                      {...register('eventLocation', {
                        required: true,
                      })}
                      type='text'
                      className='w-full max-w-full m-1 h-10 p-1 block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                    />
                  </div>
                </div>
                <div className='flex flex-col text-center'>
                  <label
                    htmlFor='eventLocationName'
                    className='block text-sm/6 font-medium text-gray-900 mt-2 ms-2'
                  >
                    Nombre del lugar:
                  </label>
                  <div>
                    <input
                      id='eventLocationName'
                      {...register('eventLocationName', {
                        required: true,
                      })}
                      type='text'
                      className='w-full max-w-full m-1 h-10 p-1 block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                    />
                  </div>
                </div>
              </div>
              <div className='flex justify-center text-center'>
                <div className='flex flex-col w-full mt-1 text-center'>
                  <div className='text-sm text-gray-400'>
                    Aunque no es necesario, para mejor ubicación del
                    evento, pegá el link de Google Maps acá
                  </div>
                  <input
                    placeholder='https://maps.app.goo.gl/JfM1Z5MbWRu7aDoj8'
                    id='eventLocationMap'
                    {...register('eventLocationMap')}
                    type='url'
                    className='w-[90%] max-w-full p-1 h-10 m-auto block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:mt-24 sm:grid-cols-2 gap-4'>
            <div className='col-span-1 justify-center flex flex-col'>
              <span className='ms-2 text-gray-500 mb-2'>
                Podes subir un flyer o imagen del evento
              </span>

              <EventImage url={imageUrl} />

              <label className='p-2 my-2 m-4 text-center rounded-md bg-gray-200 cursor-pointer'>
                {newImageFile
                  ? newImageFile.name
                  : !evento.image
                  ? 'Subir imagen'
                  : 'Cambiar imagen'}
                <input
                  id='image'
                  type='file'
                  {...register('image')}
                  className='hidden'
                  accept='image/png, image/jpeg'
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    setNewImageFile(file);
                  }}
                />
              </label>
            </div>
            <div className='col-span-1 flex justify-center md:justify-end'>
              <button
                type='submit'
                className='btn-primary place-self-end m-2 w-full md:w-auto'
              >
                Actualizar evento
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

interface TimeInputProps {
  register: UseFormRegister<FormInputs>;
  startTime: string;
}
function TimeInput({ register, startTime }: TimeInputProps) {
  const [time, setTime] = useState(startTime);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // quitar no-números
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length > 2) {
      value = `${value.slice(0, 2)}:${value.slice(2)}`;
    }

    setTime(value);
  };

  return (
    <input
      {...register('startTime', { required: true })}
      id='startTime'
      type='text'
      value={time}
      onChange={handleChange}
      placeholder='HH:MM'
      className='w-32 text-center max-w-full m-1 h-10 p-1 block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
    />
  );
}
