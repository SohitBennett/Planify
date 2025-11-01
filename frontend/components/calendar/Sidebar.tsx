'use client';

import { Button } from '@/components/ui/button';
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface SidebarProps {
  isOpen: boolean;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onCreateEvent: () => void;
  onCreateTask: () => void;
}

export default function Sidebar({ isOpen, currentDate, onDateChange, onCreateEvent, onCreateTask }: SidebarProps) {
  const [miniCalendarDate, setMiniCalendarDate] = useState(new Date());
  const [showMyCalendar, setShowMyCalendar] = useState(true);
  const [showHolidays, setShowHolidays] = useState(true);
  const [showTasks, setShowTasks] = useState(true);

  const miniCalendarDays = (() => {
    const monthStart = startOfMonth(miniCalendarDate);
    const monthEnd = endOfMonth(miniCalendarDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  })();

  const goToPreviousMonth = () => {
    const newDate = new Date(miniCalendarDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setMiniCalendarDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(miniCalendarDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setMiniCalendarDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    onDateChange(date);
  };

  if (!isOpen) return null;

  return (
    <aside className="w-64 border-r bg-background flex-shrink-0 overflow-y-auto">
      <div className="p-3 space-y-4">
        {/* Create Button */}
        <Button onClick={onCreateEvent} className="w-full justify-start gap-2 shadow-md">
          <Plus className="h-4 w-4" />
          Create
        </Button>

        {/* Mini Calendar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-semibold">
              {format(miniCalendarDate, 'MMMM yyyy')}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={goToPreviousMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={goToNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mini Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-center text-xs text-muted-foreground font-medium py-1">
                {day}
              </div>
            ))}
            {miniCalendarDays.map((day, index) => {
              const isCurrentMonth = isSameMonth(day, miniCalendarDate);
              const isDayToday = isToday(day);
              const isSelected = isSameDay(day, currentDate);

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={cn(
                    "text-xs h-7 w-7 rounded-full hover:bg-accent transition-colors flex items-center justify-center",
                    !isCurrentMonth && "text-muted-foreground",
                    isDayToday && "bg-blue-600 text-white hover:bg-blue-700",
                    isSelected && !isDayToday && "bg-accent font-semibold"
                  )}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>
        </div>

        {/* My Calendars Section */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold px-2">My calendars</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer">
              <Checkbox
                checked={showMyCalendar}
                onCheckedChange={(checked) => setShowMyCalendar(checked as boolean)}
              />
              <div className="flex items-center gap-2 flex-1">
                <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                <span className="text-sm">Events</span>
              </div>
            </div>

            {/* <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer">
              <Checkbox
                checked={showTasks}
                onCheckedChange={(checked) => setShowTasks(checked as boolean)}
              />
              <div className="flex items-center gap-2 flex-1">
                <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                <span className="text-sm">Tasks</span>
              </div>
            </div> */}

            <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer">
              <Checkbox
                checked={showHolidays}
                onCheckedChange={(checked) => setShowHolidays(checked as boolean)}
              />
              <div className="flex items-center gap-2 flex-1">
                <CalendarIcon className="w-3 h-3 text-red-500" />
                <span className="text-sm">Holidays</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}