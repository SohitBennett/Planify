// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import api from '@/lib/api';
// import { Event, ViewType, User } from '@/types';
// import CalendarHeader from '@/components/calendar/CalendarHeader';
// import MonthView from '@/components/calendar/MonthView';
// import WeekView from '@/components/calendar/WeekView';
// import DayView from '@/components/calendar/DayView';
// import EventModal from '@/components/calendar/EventModal';
// import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format } from 'date-fns';

// export default function CalendarPage() {
//   const router = useRouter();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [viewType, setViewType] = useState<ViewType>('month');
//   const [events, setEvents] = useState<Event[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check authentication
//     const token = localStorage.getItem('token');
//     const userStr = localStorage.getItem('user');
    
//     if (!token || !userStr) {
//       router.push('/login');
//       return;
//     }

//     setUser(JSON.parse(userStr));
//     fetchEvents();
//   }, [currentDate, viewType, router]);

//   const fetchEvents = async () => {
//     try {
//       let start, end;

//       if (viewType === 'month') {
//         const monthStart = startOfMonth(currentDate);
//         const monthEnd = endOfMonth(currentDate);
//         start = startOfWeek(monthStart);
//         end = endOfWeek(monthEnd);
//       } else if (viewType === 'week') {
//         start = startOfWeek(currentDate);
//         end = endOfWeek(currentDate);
//       } else {
//         start = new Date(currentDate);
//         start.setHours(0, 0, 0, 0);
//         end = new Date(currentDate);
//         end.setHours(23, 59, 59, 999);
//       }

//       const response = await api.get('/events', {
//         params: {
//           start: start.toISOString(),
//           end: end.toISOString(),
//         },
//       });

//       setEvents(response.data);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateEvent = () => {
//     setSelectedEvent(null);
//     setSelectedDate(new Date());
//     setIsModalOpen(true);
//   };

//   const handleDateClick = (date: Date) => {
//     setSelectedDate(date);
//     setSelectedEvent(null);
//     setIsModalOpen(true);
//   };

//   const handleTimeSlotClick = (date: Date, hour: number) => {
//     const newDate = new Date(date);
//     newDate.setHours(hour, 0, 0, 0);
//     setSelectedDate(newDate);
//     setSelectedEvent(null);
//     setIsModalOpen(true);
//   };

//   const handleDayTimeSlotClick = (hour: number) => {
//     const newDate = new Date(currentDate);
//     newDate.setHours(hour, 0, 0, 0);
//     setSelectedDate(newDate);
//     setSelectedEvent(null);
//     setIsModalOpen(true);
//   };

//   const handleEventClick = (event: Event) => {
//     setSelectedEvent(event);
//     setSelectedDate(undefined);
//     setIsModalOpen(true);
//   };

//   const handleSaveEvent = async (eventData: Partial<Event>) => {
//     try {
//       if (selectedEvent) {
//         // Update existing event
//         await api.put(`/events/${selectedEvent._id}`, eventData);
//       } else {
//         // Create new event
//         await api.post('/events', eventData);
//       }
      
//       fetchEvents();
//       setIsModalOpen(false);
//       setSelectedEvent(null);
//       setSelectedDate(undefined);
//     } catch (error) {
//       console.error('Error saving event:', error);
//       alert('Failed to save event. Please try again.');
//     }
//   };

//   const handleDeleteEvent = async (eventId: string) => {
//     try {
//       await api.delete(`/events/${eventId}`);
//       fetchEvents();
//       setIsModalOpen(false);
//       setSelectedEvent(null);
//     } catch (error) {
//       console.error('Error deleting event:', error);
//       alert('Failed to delete event. Please try again.');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   if (loading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col overflow-hidden">
//       <CalendarHeader
//         currentDate={currentDate}
//         viewType={viewType}
//         onDateChange={setCurrentDate}
//         onViewChange={setViewType}
//         onCreateEvent={handleCreateEvent}
//         onLogout={handleLogout}
//         userName={user.name}
//       />

//       {viewType === 'month' && (
//         <MonthView
//           currentDate={currentDate}
//           events={events}
//           onDateClick={handleDateClick}
//           onEventClick={handleEventClick}
//         />
//       )}

//       {viewType === 'week' && (
//         <WeekView
//           currentDate={currentDate}
//           events={events}
//           onTimeSlotClick={handleTimeSlotClick}
//           onEventClick={handleEventClick}
//         />
//       )}

//       {viewType === 'day' && (
//         <DayView
//           currentDate={currentDate}
//           events={events}
//           onTimeSlotClick={handleDayTimeSlotClick}
//           onEventClick={handleEventClick}
//         />
//       )}

//       <EventModal
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedEvent(null);
//           setSelectedDate(undefined);
//         }}
//         onSave={handleSaveEvent}
//         onDelete={handleDeleteEvent}
//         event={selectedEvent}
//         initialDate={selectedDate}
//       />
//     </div>
//   );
// }



'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Event, ViewType, User, Task } from '@/types';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import Sidebar from '@/components/calendar/Sidebar';
import MonthView from '@/components/calendar/MonthView';
import WeekView from '@/components/calendar/WeekView';
import DayView from '@/components/calendar/DayView';
import YearView from '@/components/calendar/YearView';
import EventModal from '@/components/calendar/EventModal';
import TaskModal from '@/components/calendar/TaskModal';
import SearchDialog from '@/components/calendar/SearchDialog';
import SettingsDialog from '@/components/SettingsDialog';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear } from 'date-fns';

export default function CalendarPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>('month');
  const [events, setEvents] = useState<Event[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState<any[]>([]);

//   const allCalendarItems = useMemo(() => {
//     // 1. Transform holidays into the Event format
//     const formattedHolidays: Event[] = holidays.map(holiday => ({
//       _id: `holiday-${holiday.date}`, // Create a simple unique ID
//       title: holiday.name,            // ASSUMPTION: holiday object has 'name'
//       start: new Date(holiday.date),  // ASSUMPTION: holiday object has 'date'
//       end: new Date(holiday.date),
//       allDay: true, // Holidays are all-day events
//       // Add any other properties your 'Event' type might require
//       // e.g., color: 'green', type: 'holiday'
//     }));

//     // 2. Return the combined list of events and formatted holidays
//     return [...events, ...formattedHolidays];

//   }, [events, holidays]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userStr));
    fetchEvents();
    fetchTasks();
    fetchHolidays();
  }, [currentDate, viewType, router]);

  const fetchEvents = async () => {
    try {
      let start, end;

      if (viewType === 'year') {
        start = startOfYear(currentDate);
        end = endOfYear(currentDate);
      } else if (viewType === 'month') {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        start = startOfWeek(monthStart);
        end = endOfWeek(monthEnd);
      } else if (viewType === 'week') {
        start = startOfWeek(currentDate);
        end = endOfWeek(currentDate);
      } else {
        start = new Date(currentDate);
        start.setHours(0, 0, 0, 0);
        end = new Date(currentDate);
        end.setHours(23, 59, 59, 999);
      }

      const response = await api.get('/events', {
        params: {
          start: start.toISOString(),
          end: end.toISOString(),
        },
      });

      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchHolidays = async () => {
    try {
      const year = currentDate.getFullYear();
      const response = await api.get(`/holidays/${year}`);
      console.log("fetched holidays", response.data)
      setHolidays(response.data);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setSelectedDate(new Date());
    setIsEventModalOpen(true);
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    const newDate = new Date(date);
    newDate.setHours(hour, 0, 0, 0);
    setSelectedDate(newDate);
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleDayTimeSlotClick = (hour: number) => {
    const newDate = new Date(currentDate);
    newDate.setHours(hour, 0, 0, 0);
    setSelectedDate(newDate);
    setSelectedEvent(null);
    setIsEventModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setSelectedDate(undefined);
    setIsEventModalOpen(true);
  };

  const handleMonthClick = (date: Date) => {
    setCurrentDate(date);
    setViewType('month');
  };

  const handleSaveEvent = async (eventData: Partial<Event>) => {
    try {
      if (selectedEvent) {
        await api.put(`/events/${selectedEvent._id}`, eventData);
      } else {
        await api.post('/events', eventData);
      }
      
      fetchEvents();
      setIsEventModalOpen(false);
      setSelectedEvent(null);
      setSelectedDate(undefined);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await api.delete(`/events/${eventId}`);
      fetchEvents();
      setIsEventModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  const handleSaveTask = async (taskData: Partial<Task>) => {
    try {
      if (selectedTask) {
        await api.put(`/tasks/${selectedTask._id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      
      fetchTasks();
      setIsTaskModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
      setIsTaskModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <CalendarHeader
        currentDate={currentDate}
        viewType={viewType}
        onDateChange={setCurrentDate}
        onViewChange={setViewType}
        onCreateEvent={handleCreateEvent}
        onLogout={handleLogout}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        userName={user.name}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onCreateEvent={handleCreateEvent}
          onCreateTask={handleCreateTask}
        />

        {viewType === 'month' && (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        )}

        {viewType === 'week' && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onTimeSlotClick={handleTimeSlotClick}
            onEventClick={handleEventClick}
          />
        )}

        {viewType === 'day' && (
          <DayView
            currentDate={currentDate}
            events={events}
            onTimeSlotClick={handleDayTimeSlotClick}
            onEventClick={handleEventClick}
          />
        )}

        {viewType === 'year' && (
          <YearView
            currentDate={currentDate}
            events={events}
            onMonthClick={handleMonthClick}
          />
        )}
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setSelectedEvent(null);
          setSelectedDate(undefined);
        }}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
        initialDate={selectedDate}
      />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        task={selectedTask}
      />

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        events={events}
        onEventClick={handleEventClick}
      />

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}