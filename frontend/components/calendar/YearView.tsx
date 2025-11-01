'use client';

import { useMemo } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isToday, isSameDay, parseISO } from 'date-fns';
import { Event } from '@/types';
import { cn } from '@/lib/utils';

interface YearViewProps {
  currentDate: Date;
  events: Event[];
  onMonthClick: (date: Date) => void;
}

export default function YearView({ currentDate, events, onMonthClick }: YearViewProps) {
  const year = currentDate.getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventStart = parseISO(event.start);
      return isSameDay(eventStart, date);
    });
  };

  const MonthGrid = ({ month }: { month: Date }) => {
    const days = useMemo(() => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      const calendarStart = startOfWeek(monthStart);
      const calendarEnd = endOfWeek(monthEnd);
      return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    }, [month]);

    return (
      <div
        className="border rounded-lg p-3 hover:bg-accent/50 transition-colors cursor-pointer"
        onClick={() => onMonthClick(month)}
      >
        <h3 className="text-sm font-semibold mb-2 text-center">
          {format(month, 'MMMM')}
        </h3>
        <div className="grid grid-cols-7 gap-0.5">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div
              key={i}
              className="text-[10px] text-center text-muted-foreground font-medium"
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => {
            const isCurrentMonth = isSameMonth(day, month);
            const isDayToday = isToday(day);
            const dayEvents = getEventsForDate(day);
            const hasEvents = dayEvents.length > 0;

            return (
              <div
                key={index}
                className={cn(
                  "text-[10px] h-5 flex items-center justify-center rounded-sm relative",
                  !isCurrentMonth && "text-muted-foreground/40",
                  isDayToday && "bg-blue-600 text-white font-bold",
                  !isDayToday && hasEvents && "font-semibold"
                )}
              >
                {format(day, 'd')}
                {hasEvents && !isDayToday && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light mb-6 text-center">{year}</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {months.map((month, index) => (
            <MonthGrid key={index} month={month} />
          ))}
        </div>
      </div>
    </div>
  );
}