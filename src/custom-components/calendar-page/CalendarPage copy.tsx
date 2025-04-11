// 'use client';
// import { Calendar } from '@/components/ui/calendar';
// import { useState } from 'react';

// import { es } from 'date-fns/locale';
// import { initialData } from '@/seed/seed';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';

// export const CalendarPage = () => {
//   const [date, setDate] = useState<Date | undefined>(undefined);
//   const [openPopover, setOpenPopover] = useState(false);
//   const allEventDates = initialData.events.map((event) => {
//     return { event };
//   });

//   const modifiersClassNames = {
//     event: 'bg-gray-500 text-white',
//     selected:
//       'bg-blue-600 text-white hover:bg-blue-500 hover:text-red-500',
//     today: 'bg-blue-400 text-white ',
//   };

//   const handleSelectDate = (date: Date | undefined) => {
//     setDate(date);
//     const isEvent = allEventDates.some(
//       (eventDate) =>
//         eventDate.event.initialDate.toDateString() ===
//         date?.toDateString()
//     );
//     if (isEvent) {
//       // Acción especial
//       console.log('Fecha con evento:', date);
//     } else {
//       console.log('Fecha sin evento:', date);
//     }
//   };

//   return (
//     <div className='flex flex-col items-center m-4'>
//       <div className='mb-2'>Calendario</div>
//       {/* <div className='flex flex-row justify-center'> */}
//       <Popover open={openPopover} onOpenChange={setOpenPopover}>
//         <PopoverTrigger asChild>
//           <div className='grid grid-cols-1 2xl:grid-cols-3 gap-3 2xl:gap-2 justify-center'>
//             <Calendar
//               locale={es}
//               disableNavigation
//               fromDate={new Date()}
//               mode='single'
//               selected={date}
//               onSelect={(date) => {
//                 handleSelectDate(date);
//               }}
//               className='rounded-md border'
//               modifiers={{
//                 event: allEventDates.map(
//                   (ev) => ev.event.initialDate
//                 ),
//               }}
//               modifiersClassNames={modifiersClassNames}
//             />
//             <Calendar
//               locale={es}
//               defaultMonth={
//                 new Date(
//                   new Date().getFullYear(),
//                   new Date().getMonth() + 1
//                 )
//               }
//               disableNavigation
//               mode='single'
//               selected={date}
//               onSelect={(date) => {
//                 handleSelectDate(date);
//               }}
//               className='rounded-md border'
//               modifiers={{
//                 event: allEventDates.map(
//                   (ev) => ev.event.initialDate
//                 ),
//               }}
//               modifiersClassNames={{
//                 event: 'bg-red-500 text-white',
//                 selected:
//                   'bg-blue-600 text-white hover:bg-blue-500 hover:text-red-500',
//                 today: 'bg-blue-400 text-white ',
//               }}
//             />
//             <Calendar
//               locale={es}
//               fromMonth={
//                 new Date(
//                   new Date().getFullYear(),
//                   new Date().getMonth() + 2
//                 )
//               }
//               defaultMonth={
//                 new Date(
//                   new Date().getFullYear(),
//                   new Date().getMonth() + 2
//                 )
//               }
//               mode='single'
//               selected={date}
//               onSelect={(date) => {
//                 handleSelectDate(date);
//               }}
//               className='rounded-md border'
//               modifiers={{
//                 event: allEventDates.map(
//                   (ev) => ev.event.initialDate
//                 ),
//               }}
//               modifiersClassNames={{
//                 event: 'bg-red-500 text-white',
//                 selected:
//                   'bg-blue-600 text-white hover:bg-blue-500 hover:text-red-500',
//                 today: 'bg-blue-400 text-white ',
//               }}
//             />
//           </div>
//         </PopoverTrigger>

//         <PopoverContent>
//           <div>
//             <h3 className='text-sm font-semibold mb-2'>
//               {date
//                 ? date.toLocaleString('es-AR')
//                 : 'Seleccioná una fecha'}
//             </h3>

//             {allEventDates.length > 0 ? (
//               <ul className='list-disc list-inside space-y-1'>
//                 {allEventDates.map((ev, i) => (
//                   <li key={i}>{ev.event.title}</li>
//                 ))}
//               </ul>
//             ) : (
//               <p className='text-gray-500 text-sm'>No hay eventos</p>
//             )}
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };
