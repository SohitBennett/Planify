'use client';

import { useMemo } from 'react';
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, isToday, parseISO, differenceInMinutes, addMinutes } from 'date-fns';
import { Event } from '@/types';
import { cn } from '@/lib/utils';

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: Event) => void;
}

export default function WeekView({ currentDate, events, onTimeSlotClick, onEventClick }: WeekViewProps) {
  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  }, [currentDate]);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDayAndHour = (day: Date, hour: number) => {
    return events.filter(event => {
      const eventStart = parseISO(event.start);
      const eventEnd = parseISO(event.end);
      const slotStart = new Date(day);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(day);
      slotEnd.setHours(hour + 1, 0, 0, 0);

      return isSameDay(eventStart, day) && 
             eventStart < slotEnd && 
             eventEnd > slotStart;
    });
  };

  const getEventPosition = (event: Event, day: Date, hour: number) => {
    const eventStart = parseISO(event.start);
    const eventEnd = parseISO(event.end);
    const slotStart = new Date(day);
    slotStart.setHours(hour, 0, 0, 0);

    const startMinutes = differenceInMinutes(eventStart, slotStart);
    const duration = differenceInMinutes(eventEnd, eventStart);
    
    return {
      top: `${(startMinutes / 60) * 100}%`,
      height: `${(duration / 60) * 100}%`,
    };
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Week header */}
      <div className="grid grid-cols-8 border-b sticky top-0 bg-white z-10">
        <div className="w-16 border-r"></div>
        {weekDays.map((day) => {
          const isDayToday = isToday(day);
          return (
            <div
              key={day.toString()}
              className="flex flex-col items-center py-3 border-r last:border-r-0"
            >
              <span className="text-sm text-gray-600 uppercase">
                {format(day, 'EEE')}
              </span>
              <span
                className={cn(
                  "text-2xl font-normal mt-1 w-10 h-10 flex items-center justify-center rounded-full",
                  isDayToday && "bg-blue-600 text-white"
                )}
              >
                {format(day, 'd')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-auto">
        <div className="relative">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b" style={{ height: '60px' }}>
              <div className="w-16 border-r pr-2 pt-1 text-right">
                <span className="text-xs text-gray-500">
                  {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
                </span>
              </div>
              {weekDays.map((day) => {
                const dayEvents = getEventsForDayAndHour(day, hour);
                
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="border-r last:border-r-0 relative hover:bg-blue-50 cursor-pointer transition-colors"
                    onClick={() => onTimeSlotClick(day, hour)}
                  >
                    {hour === new Date().getHours() && isSameDay(day, new Date()) && (
                      <div className="absolute left-0 right-0 h-0.5 bg-red-500 z-20"
                           style={{ top: `${(new Date().getMinutes() / 60) * 100}%` }}>
                        <div className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-red-500"></div>
                      </div>
                    )}
                    
                    {dayEvents.map((event) => {
                      const position = getEventPosition(event, day, hour);
                      const eventStart = parseISO(event.start);
                      const slotStart = new Date(day);
                      slotStart.setHours(hour, 0, 0, 0);
                      
                      if (eventStart >= slotStart && eventStart < addMinutes(slotStart, 60)) {
                        return (
                          <div
                            key={event._id}
                            className="absolute left-0 right-0 mx-0.5 rounded px-1 py-0.5 text-xs text-white font-medium cursor-pointer overflow-hidden hover:opacity-90 transition-opacity z-10"
                            style={{
                              backgroundColor: event.color,
                              top: position.top,
                              height: position.height,
                              minHeight: '20px',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEventClick(event);
                            }}
                          >
                            <div className="font-semibold truncate">{event.title}</div>
                            <div className="text-[10px] opacity-90">
                              {format(eventStart, 'h:mm a')}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}