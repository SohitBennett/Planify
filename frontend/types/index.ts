export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Event {
  _id: string;
  user: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  allDay: boolean;
  color: string;
  location?: string;
  recurring?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
  };
  reminders?: {
    minutes: number;
    method: 'popup' | 'email';
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface Task {
  _id: string;
  user: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  completedAt?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export type ViewType = 'month' | 'week' | 'day' | 'year';

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}