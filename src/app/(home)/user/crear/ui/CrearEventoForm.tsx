'use client';
import { Calendar } from '@/components/ui/calendar';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm, UseFormRegister, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import currencyFormat from '@/utils/currencyFormat';

import { es } from 'date-fns/locale';
import { createEvent } from '@/actions/events/createEvent';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

interface FormInputs {
  eventTitle: string;
  eventDescription: string;
  eventDate: Date;
  startTime: string;
  eventLocation: string;
  eventLocationName: string;
  eventlocationMap?: string;

  eventImage?: FileList;
  ticketPrice?: string;
  ticketLink?: string;
  eventType: 'concierto' | 'teatro' | 'fiesta' | 'feria' | 'otros';
}

export const CrearEventoForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const router = useRouter();

  const {
    register,

    handleSubmit,
    watch,

    setValue,
    control,
  } = useForm<FormInputs>();

  const date = watch('eventDate');

  const fileList = useWatch({
    control,
    name: 'eventImage',
  });

  const fileName = fileList?.[0]?.name;

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
    setIsCreatingEvent(true);

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
    formData.append('eventLocationMap', data.eventlocationMap || '');
    formData.append('eventType', data.eventType);
    formData.append('ticketPrice', data.ticketPrice || '0');
    formData.append('ticketLink', data.ticketLink || '');
    if (fileList) {
      formData.append('eventImage', fileList[0]);
    }

    const { ok, prismaTx, message } = await createEvent(formData);

    if (!ok) {
      setIsCreatingEvent(false);
      alert(
        'Error al crear el evento. Por favor, intenta nuevamente.'
      );
      console.log(message);
      return;
    }

    router.replace(`/${prismaTx?.eventCreated.eventSlug}`);
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
                    placeholder='Los Cadillacs tocando para vos en el Luna Park...'
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
                  placeholder={
                    'Vuelven los Cadillacs a tocar en el Luna Park después de 20 años! Todos los clásicos + invitados especiales + sorpresas!'
                  }
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
                <div className='flex flex-col h-auto text-center'>
                  <label
                    htmlFor='startTime'
                    className='block text-sm/6 font-medium text-gray-900'
                  >
                    Horario:
                  </label>
                  <span className='block text-sm font-light text-gray-400'>
                    Si comienza a la medianoche, poné 23:59
                  </span>
                  <TimeInput register={register} />
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
                    placeholder='$5000.00'
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
                    placeholder='https://www.tu-link-de-venta.com'
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
                      placeholder='Av. Eduardo Madero 470, CABA'
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
                      placeholder='Luna Park'
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
                    {...register('eventlocationMap')}
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
              <label className='p-2 my-2 m-4 text-center rounded-md bg-gray-200 cursor-pointer'>
                {fileName ? fileName : 'Subir imagen'}
                <input
                  id='eventImage'
                  type='file'
                  {...register('eventImage')}
                  className='hidden'
                  accept='image/png, image/jpeg, image/jpg, image/avif'
                />
              </label>
            </div>
            <div className='col-span-1 flex justify-center md:justify-end'>
              <button
                type='submit'
                className={clsx(
                  {
                    'btn-primary': !isCreatingEvent,
                    'btn-disabled': isCreatingEvent,
                  },
                  'place-self-end m-2 w-full md:w-auto'
                )}
              >
                Crear evento
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
}
function TimeInput({ register }: TimeInputProps) {
  const [time, setTime] = useState('');

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
      className='w-full text-center max-w-full m-1 h-10 p-1 block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
    />
  );
}
