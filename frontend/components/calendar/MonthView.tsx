'use client';

import { useMemo } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isToday, isSameDay, parseISO } from 'date-fns';
import { Event } from '@/types';
import { cn } from '@/lib/utils';

interface MonthViewProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

export default function MonthView({ currentDate, events, onDateClick, onEventClick }: MonthViewProps) {
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventStart = parseISO(event.start);
      const eventEnd = parseISO(event.end);
      return isSameDay(eventStart, date) || 
             (eventStart <= date && eventEnd >= date);
    }).sort((a, b) => {
      const aStart = parseISO(a.start);
      const bStart = parseISO(b.start);
      return aStart.getTime() - bStart.getTime();
    });
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Week day headers */}
      <div className="grid grid-cols-7 border-b">
        {weekDays.map(day => (
          <div
            key={day}
            className="py-3 text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 grid grid-cols-7 auto-rows-fr">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isDayToday = isToday(day);
          const displayedEvents = dayEvents.slice(0, 3);
          const moreCount = dayEvents.length - 3;

          return (
            <div
              key={index}
              className={cn(
                "border-r border-b p-2 min-h-[120px] cursor-pointer hover:bg-gray-50 transition-colors",
                !isCurrentMonth && "bg-gray-50/50",
                index % 7 === 6 && "border-r-0"
              )}
              onClick={() => onDateClick(day)}
            >
              <div className="flex flex-col h-full">
                <span
                  className={cn(
                    "text-sm font-medium mb-1 w-7 h-7 flex items-center justify-center rounded-full",
                    !isCurrentMonth && "text-gray-400",
                    isDayToday && "bg-blue-600 text-white font-semibold"
                  )}
                >
                  {format(day, 'd')}
                </span>

                <div className="flex-1 space-y-1 overflow-hidden">
                  {displayedEvents.map((event) => {
                    const eventStart = parseISO(event.start);
                    const showTime = !event.allDay;
                    
                    return (
                      <div
                        key={event._id}
                        className={cn(
                          "text-xs px-2 py-1 rounded truncate cursor-pointer transition-all hover:opacity-80",
                          "text-white font-medium"
                        )}
                        style={{ backgroundColor: event.color }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                      >
                        {showTime && format(eventStart, 'h:mm a') + ' '}
                        {event.title}
                      </div>
                    );
                  })}
                  
                  {moreCount > 0 && (
                    <div className="text-xs text-gray-600 font-medium px-2">
                      +{moreCount} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}