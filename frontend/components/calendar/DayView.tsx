// 'use client';

// import { useMemo } from 'react';
// import { format, isSameDay, parseISO, differenceInMinutes, addMinutes, isToday } from 'date-fns';
// import { Event } from '@/types';
// import { cn } from '@/lib/utils';

// interface DayViewProps {
//   currentDate: Date;
//   events: Event[];
//   onTimeSlotClick: (hour: number) => void;
//   onEventClick: (event: Event) => void;
// }

// export default function DayView({ currentDate, events, onTimeSlotClick, onEventClick }: DayViewProps) {
//   const hours = Array.from({ length: 24 }, (_, i) => i);

//   const dayEvents = useMemo(() => {
//     return events.filter(event => {
//       const eventStart = parseISO(event.start);
//       return isSameDay(eventStart, currentDate);
//     }).sort((a, b) => {
//       const aStart = parseISO(a.start);
//       const bStart = parseISO(b.start);
//       return aStart.getTime() - bStart.getTime();
//     });
//   }, [events, currentDate]);

//   const getEventsForHour = (hour: number) => {
//     return dayEvents.filter(event => {
//       const eventStart = parseISO(event.start);
//       const eventEnd = parseISO(event.end);
//       const slotStart = new Date(currentDate);
//       slotStart.setHours(hour, 0, 0, 0);
//       const slotEnd = new Date(currentDate);
//       slotEnd.setHours(hour + 1, 0, 0, 0);

//       return eventStart < slotEnd && eventEnd > slotStart;
//     });
//   };

//   const getEventPosition = (event: Event, hour: number) => {
//     const eventStart = parseISO(event.start);
//     const eventEnd = parseISO(event.end);
//     const slotStart = new Date(currentDate);
//     slotStart.setHours(hour, 0, 0, 0);

//     const startMinutes = differenceInMinutes(eventStart, slotStart);
//     const duration = differenceInMinutes(eventEnd, eventStart);
    
//     return {
//       top: `${(startMinutes / 60) * 100}%`,
//       height: `${(duration / 60) * 100}%`,
//     };
//   };

//   const isDayToday = isToday(currentDate);

//   return (
//     <div className="flex-1 flex flex-col bg-white overflow-hidden">
//       {/* Day header */}
//       <div className="border-b py-4 px-6 bg-white sticky top-0 z-10">
//         <div className="flex items-center gap-4">
//           <span className="text-sm text-gray-600 uppercase">
//             {format(currentDate, 'EEEE')}
//           </span>
//           <span
//             className={cn(
//               "text-4xl font-light w-14 h-14 flex items-center justify-center rounded-full",
//               isDayToday && "bg-blue-600 text-white"
//             )}
//           >
//             {format(currentDate, 'd')}
//           </span>
//           <span className="text-sm text-gray-600">
//             {format(currentDate, 'MMMM yyyy')}
//           </span>
//         </div>
//       </div>

//       {/* All day events section */}
//       {dayEvents.filter(e => e.allDay).length > 0 && (
//         <div className="border-b bg-gray-50 p-4">
//           <div className="text-xs text-gray-500 uppercase mb-2">All Day</div>
//           <div className="space-y-2">
//             {dayEvents.filter(e => e.allDay).map(event => (
//               <div
//                 key={event._id}
//                 className="px-3 py-2 rounded text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity"
//                 style={{ backgroundColor: event.color }}
//                 onClick={() => onEventClick(event)}
//               >
//                 {event.title}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Time grid */}
//       <div className="flex-1 overflow-auto">
//         <div className="relative">
//           {hours.map((hour) => {
//             const hourEvents = getEventsForHour(hour);
            
//             return (
//               <div key={hour} className="flex border-b" style={{ height: '80px' }}>
//                 <div className="w-20 flex-shrink-0 pr-4 pt-1 text-right border-r">
//                   <span className="text-sm text-gray-500">
//                     {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
//                   </span>
//                 </div>
//                 <div
//                   className="flex-1 relative hover:bg-blue-50 cursor-pointer transition-colors"
//                   onClick={() => onTimeSlotClick(hour)}
//                 >
//                   {/* Current time indicator */}
//                   {hour === new Date().getHours() && isDayToday && (
//                     <div 
//                       className="absolute left-0 right-0 h-0.5 bg-red-500 z-20"
//                       style={{ top: `${(new Date().getMinutes() / 60) * 100}%` }}
//                     >
//                       <div className="absolute -left-2 -top-1 w-3 h-3 rounded-full bg-red-500"></div>
//                     </div>
//                   )}

//                   {/* Events */}
//                   {hourEvents.map((event) => {
//                     const position = getEventPosition(event, hour);
//                     const eventStart = parseISO(event.start);
//                     const slotStart = new Date(currentDate);
//                     slotStart.setHours(hour, 0, 0, 0);
                    
//                     if (eventStart >= slotStart && eventStart < addMinutes(slotStart, 60)) {
//                       return (
//                         <div
//                           key={event._id}
//                           className="absolute left-2 right-2 rounded-md px-3 py-2 text-white font-medium cursor-pointer overflow-hidden hover:opacity-90 transition-opacity shadow-sm z-10"
//                           style={{
//                             backgroundColor: event.color,
//                             top: position.top,
//                             height: position.height,
//                             minHeight: '40px',
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             onEventClick(event);
//                           }}
//                         >
//                           <div className="font-semibold text-sm">{event.title}</div>
//                           <div className="text-xs opacity-90 mt-0.5">
//                             {format(eventStart, 'h:mm a')} - {format(parseISO(event.end), 'h:mm a')}
//                           </div>
//                           {event.location && (
//                             <div className="text-xs opacity-80 mt-1 truncate">
//                               📍 {event.location}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     }
//                     return null;
//                   })}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useMemo } from 'react';
import { format, isSameDay, parseISO, differenceInMinutes, addMinutes, isToday } from 'date-fns';
import { Event } from '@/types';
import { cn } from '@/lib/utils';

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (hour: number) => void;
  onEventClick: (event: Event) => void;
}

export default function DayView({ currentDate, events, onTimeSlotClick, onEventClick }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayEvents = useMemo(() => {
    return events.filter(event => {
      const eventStart = parseISO(event.start);
      return isSameDay(eventStart, currentDate);
    }).sort((a, b) => {
      const aStart = parseISO(a.start);
      const bStart = parseISO(b.start);
      return aStart.getTime() - bStart.getTime();
    });
  }, [events, currentDate]);

  const getEventsForHour = (hour: number) => {
    return dayEvents.filter(event => {
      const eventStart = parseISO(event.start);
      const eventEnd = parseISO(event.end);
      const slotStart = new Date(currentDate);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(currentDate);
      slotEnd.setHours(hour + 1, 0, 0, 0);

      return eventStart < slotEnd && eventEnd > slotStart;
    });
  };

  const getEventPosition = (event: Event, hour: number) => {
    const eventStart = parseISO(event.start);
    const eventEnd = parseISO(event.end);
    const slotStart = new Date(currentDate);
    slotStart.setHours(hour, 0, 0, 0);

    const startMinutes = differenceInMinutes(eventStart, slotStart);
    const duration = differenceInMinutes(eventEnd, eventStart);
    
    return {
      top: `${(startMinutes / 60) * 100}%`,
      height: `${(duration / 60) * 100}%`,
    };
  };

  const isDayToday = isToday(currentDate);

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Day header */}
      <div className="border-b py-4 px-6 bg-background sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 uppercase">
            {format(currentDate, 'EEEE')}
          </span>
          <span
            className={cn(
              "text-4xl font-light w-14 h-14 flex items-center justify-center rounded-full",
              isDayToday && "bg-blue-600 text-white"
            )}
          >
            {format(currentDate, 'd')}
          </span>
          <span className="text-sm text-gray-600">
            {format(currentDate, 'MMMM yyyy')}
          </span>
        </div>
      </div>

      {/* All day events section */}
      {dayEvents.filter(e => e.allDay).length > 0 && (
        <div className="border-b bg-gray-50 p-4">
          <div className="text-xs text-gray-500 uppercase mb-2">All Day</div>
          <div className="space-y-2">
            {dayEvents.filter(e => e.allDay).map(event => (
              <div
                key={event._id}
                className="px-3 py-2 rounded text-sm font-medium text-white cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: event.color }}
                onClick={() => onEventClick(event)}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="relative">
          {hours.map((hour) => {
            const hourEvents = getEventsForHour(hour);
            
            return (
              <div key={hour} className="flex border-b" style={{ height: '80px' }}>
                <div className="w-20 flex-shrink-0 pr-4 pt-1 text-right border-r">
                  <span className="text-sm text-gray-500">
                    {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
                  </span>
                </div>
                <div
                  className="flex-1 relative hover:bg-blue-50 cursor-pointer transition-colors"
                  onClick={() => onTimeSlotClick(hour)}
                >
                  {/* Current time indicator */}
                  {hour === new Date().getHours() && isDayToday && (
                    <div 
                      className="absolute left-0 right-0 h-0.5 bg-red-500 z-20"
                      style={{ top: `${(new Date().getMinutes() / 60) * 100}%` }}
                    >
                      <div className="absolute -left-2 -top-1 w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                  )}

                  {/* Events */}
                  {hourEvents.map((event) => {
                    const position = getEventPosition(event, hour);
                    const eventStart = parseISO(event.start);
                    const slotStart = new Date(currentDate);
                    slotStart.setHours(hour, 0, 0, 0);
                    
                    if (eventStart >= slotStart && eventStart < addMinutes(slotStart, 60)) {
                      return (
                        <div
                          key={event._id}
                          className="absolute left-2 right-2 rounded-md px-3 py-2 text-white font-medium cursor-pointer overflow-hidden hover:opacity-90 transition-opacity shadow-sm z-10"
                          style={{
                            backgroundColor: event.color,
                            top: position.top,
                            height: position.height,
                            minHeight: '40px',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick(event);
                          }}
                        >
                          <div className="font-semibold text-sm">{event.title}</div>
                          <div className="text-xs opacity-90 mt-0.5">
                            {format(eventStart, 'h:mm a')} - {format(parseISO(event.end), 'h:mm a')}
                          </div>
                          {event.location && (
                            <div className="text-xs opacity-80 mt-1 truncate">
                              📍 {event.location}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}